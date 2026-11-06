import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { prisma } from '@/lib/prisma'
import { OrderStatus } from '@prisma/client'
import { sendOrderConfirmation } from '@/lib/email'

/**
 * Verify a Razorpay checkout callback.
 *
 * The browser handler is not trustworthy on its own — anyone can POST here — so
 * the signature is recomputed from the secret. The webhook remains the source of
 * truth; this endpoint exists so the success page only shows after a real payment.
 */
export async function POST(req: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      await req.json()

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: 'Missing payment fields' }, { status: 400 })
    }

    const secret = process.env.RAZORPAY_KEY_SECRET
    if (!secret) {
      console.error('[verify] RAZORPAY_KEY_SECRET is not set')
      return NextResponse.json({ error: 'Payments are not configured' }, { status: 500 })
    }

    const expected = crypto
      .createHmac('sha256', secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex')

    const received = Buffer.from(String(razorpay_signature))
    const computed = Buffer.from(expected)

    if (
      received.length !== computed.length ||
      !crypto.timingSafeEqual(received, computed)
    ) {
      return NextResponse.json({ error: 'Payment verification failed' }, { status: 400 })
    }

    const order = await prisma.order.findUnique({
      where: { razorpayOrderId: razorpay_order_id },
      include: { items: true },
    })
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    // Allow transition from PENDING or FAILED (in case customer retried after a failure).
    if (order.status === OrderStatus.PENDING || order.status === OrderStatus.FAILED) {
      await prisma.order.update({
        where: { id: order.id },
        data: { status: OrderStatus.PAID, razorpayPaymentId: razorpay_payment_id },
      })
      await sendOrderConfirmation(order)
    }

    return NextResponse.json({ success: true, orderId: order.id })
  } catch (error) {
    console.error('[verify]', error)
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { prisma } from '@/lib/prisma'
import { OrderStatus } from '@prisma/client'
import { sendOrderConfirmation } from '@/lib/email'

/**
 * Razorpay webhook — the authoritative record of payment.
 *
 * Configure at dashboard.razorpay.com → Settings → Webhooks, subscribing to
 * `order.paid` and `payment.failed`, with the same secret as
 * RAZORPAY_WEBHOOK_SECRET.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET
  if (!secret) {
    console.error('[webhook] RAZORPAY_WEBHOOK_SECRET is not set — rejecting.')
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 })
  }

  try {
    const body = await req.text()
    const signature = req.headers.get('x-razorpay-signature')

    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
    }

    const expected = crypto.createHmac('sha256', secret).update(body).digest('hex')
    const received = Buffer.from(signature)
    const computed = Buffer.from(expected)

    // Constant-time compare: `!==` leaks the signature one byte at a time.
    if (
      received.length !== computed.length ||
      !crypto.timingSafeEqual(received, computed)
    ) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    const event = JSON.parse(body)

    if (event.event === 'order.paid') {
      const payment = event.payload.payment.entity
      const order = await prisma.order.findUnique({
        where: { razorpayOrderId: payment.order_id },
        include: { items: true },
      })

      // Idempotent: Razorpay retries, and /verify may have run first.
      // Allow transition from PENDING or FAILED (customer retried after initial failure).
      if (order && (order.status === OrderStatus.PENDING || order.status === OrderStatus.FAILED)) {
        await prisma.order.update({
          where: { id: order.id },
          data: { status: OrderStatus.PAID, razorpayPaymentId: payment.id },
        })
        await sendOrderConfirmation(order)
      }
    }

    if (event.event === 'payment.failed') {
      const payment = event.payload.payment.entity
      await prisma.order.updateMany({
        where: { razorpayOrderId: payment.order_id, status: OrderStatus.PENDING },
        data: { status: OrderStatus.FAILED },
      })
    }

    return NextResponse.json({ status: 'ok' })
  } catch (error) {
    console.error('[webhook]', error)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}

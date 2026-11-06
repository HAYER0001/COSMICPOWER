import { NextRequest, NextResponse } from 'next/server'
import { generateForwardAWB, isMockMode } from '@/lib/delhivery'
import { prisma } from '@/lib/prisma'
import { requireAdmin, audit } from '@/lib/admin-guard'
import { OrderStatus } from '@prisma/client'
import { sendShippingNotification } from '@/lib/email'

export async function POST(req: NextRequest) {
  const guard = await requireAdmin()
  if (!guard.ok) return guard.response

  try {
    const { orderId } = await req.json()
    const order = await prisma.order.findUnique({ where: { id: orderId } })

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }
    if (order.status !== OrderStatus.PAID) {
      return NextResponse.json(
        { error: `Cannot ship an order with status ${order.status}` },
        { status: 409 }
      )
    }
    if (order.awbNumber) {
      return NextResponse.json(
        { error: `Already manifested as ${order.awbNumber}` },
        { status: 409 }
      )
    }

    // A real payment must never receive a fake tracking number. If Razorpay is
    // live but Delhivery is not configured, refuse rather than emailing a
    // paying customer an AWB that tracks nothing.
    const isLivePayments = process.env.RAZORPAY_KEY_ID?.startsWith('rzp_live_')
    if (isMockMode && isLivePayments) {
      return NextResponse.json(
        {
          error:
            'Delhivery is not configured, so this would generate a fake tracking number for a real order. Set DELHIVERY_API_KEY and DELHIVERY_PICKUP_NAME first.',
        },
        { status: 503 }
      )
    }

    const awb = await generateForwardAWB(order)

    const updated = await prisma.order.update({
      where: { id: orderId },
      data: { awbNumber: awb, status: OrderStatus.SHIPPED, shippedAt: new Date() },
    })

    await audit(guard.actor, 'SHIP', orderId, `AWB ${awb}${isMockMode ? ' (MOCK)' : ''}`)

    // Fire-and-forget: a mail failure must not undo a real shipment.
    await sendShippingNotification(order, awb)

    return NextResponse.json({ success: true, awb, mock: isMockMode, order: updated })
  } catch (error) {
    console.error('[manifest]', error)
    const message = error instanceof Error ? error.message : 'Failed to manifest order'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

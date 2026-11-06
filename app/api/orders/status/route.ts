import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin, audit } from '@/lib/admin-guard'
import { OrderStatus } from '@prisma/client'
import { sendShippingNotification } from '@/lib/email'

/** Manual status transitions the admin is allowed to make by hand. */
const ALLOWED: Partial<Record<OrderStatus, OrderStatus[]>> = {
  [OrderStatus.PAID]: [OrderStatus.SHIPPED],
  [OrderStatus.SHIPPED]: [OrderStatus.DELIVERED],
  [OrderStatus.PENDING]: [OrderStatus.CANCELLED],
}

export async function POST(req: NextRequest) {
  const guard = await requireAdmin()
  if (!guard.ok) return guard.response

  try {
    const { orderId, status, awbNumber } = await req.json()

    if (!Object.values(OrderStatus).includes(status)) {
      return NextResponse.json({ error: 'Unknown status' }, { status: 400 })
    }

    const order = await prisma.order.findUnique({ where: { id: orderId } })
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    if (!ALLOWED[order.status]?.includes(status)) {
      return NextResponse.json(
        { error: `Cannot move an order from ${order.status} to ${status}` },
        { status: 409 }
      )
    }

    const trackingNumber = awbNumber?.trim() || order.awbNumber || `AMZN-${Date.now()}`

    const updated = await prisma.order.update({
      where: { id: orderId },
      data: {
        status,
        ...(status === OrderStatus.SHIPPED
          ? { shippedAt: new Date(), awbNumber: trackingNumber }
          : {}),
        ...(status === OrderStatus.DELIVERED ? { deliveredAt: new Date() } : {}),
      },
    })

    if (status === OrderStatus.SHIPPED) {
      await sendShippingNotification(updated, trackingNumber)
    }

    await audit(
      guard.actor,
      'STATUS',
      orderId,
      `${order.status} → ${status}${status === OrderStatus.SHIPPED ? ` (AWB: ${trackingNumber})` : ''}`
    )

    return NextResponse.json({ success: true, order: updated })
  } catch (error) {
    console.error('[status]', error)
    return NextResponse.json({ error: 'Failed to update status' }, { status: 500 })
  }
}

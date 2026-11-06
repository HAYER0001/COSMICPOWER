import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin, audit } from '@/lib/admin-guard'
import { OrderStatus } from '@prisma/client'

export async function POST(req: NextRequest) {
  const guard = await requireAdmin()
  if (!guard.ok) return guard.response

  try {
    const { orderIds, action, customAwbPrefix } = await req.json()

    if (!Array.isArray(orderIds) || orderIds.length === 0) {
      return NextResponse.json({ error: 'No orders selected' }, { status: 400 })
    }

    if (action === 'MARK_SHIPPED') {
      const now = new Date()
      await prisma.$transaction(
        orderIds.map((id: string, index: number) =>
          prisma.order.update({
            where: { id },
            data: {
              status: OrderStatus.SHIPPED,
              shippedAt: now,
              awbNumber: customAwbPrefix ? `${customAwbPrefix}-${Date.now()}-${index + 1}` : undefined,
            },
          })
        )
      )
      await audit(guard.actor, 'BATCH_SHIP', undefined, `Shipped ${orderIds.length} orders`)
      return NextResponse.json({ success: true, count: orderIds.length })
    }

    if (action === 'MARK_DELIVERED') {
      const now = new Date()
      await prisma.order.updateMany({
        where: { id: { in: orderIds } },
        data: { status: OrderStatus.DELIVERED, deliveredAt: now },
      })
      await audit(guard.actor, 'BATCH_DELIVER', undefined, `Marked ${orderIds.length} orders as delivered`)
      return NextResponse.json({ success: true, count: orderIds.length })
    }

    if (action === 'CANCEL') {
      await prisma.order.updateMany({
        where: { id: { in: orderIds }, status: { in: [OrderStatus.PENDING, OrderStatus.PAID] } },
        data: { status: OrderStatus.CANCELLED },
      })
      await audit(guard.actor, 'BATCH_CANCEL', undefined, `Cancelled ${orderIds.length} orders`)
      return NextResponse.json({ success: true, count: orderIds.length })
    }

    return NextResponse.json({ error: 'Unsupported batch action' }, { status: 400 })
  } catch (error) {
    console.error('[admin/batch]', error)
    return NextResponse.json({ error: 'Batch operation failed' }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { createReversePickup, isMockMode } from '@/lib/delhivery'
import { prisma } from '@/lib/prisma'
import { requireAdmin, audit } from '@/lib/admin-guard'
import { OrderStatus, ReturnStatus } from '@prisma/client'

export async function POST(req: NextRequest) {
  const guard = await requireAdmin()
  if (!guard.ok) return guard.response

  try {
    const { orderId, reason } = await req.json()

    if (typeof reason !== 'string' || reason.trim().length < 3) {
      return NextResponse.json({ error: 'A return reason is required' }, { status: 400 })
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { returnTicket: true },
    })

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }
    if (order.returnTicket) {
      return NextResponse.json({ error: 'A return already exists' }, { status: 409 })
    }
    if (!([OrderStatus.PAID, OrderStatus.SHIPPED, OrderStatus.DELIVERED] as OrderStatus[]).includes(order.status)) {
      return NextResponse.json(
        { error: `Cannot return an order with status ${order.status}` },
        { status: 409 }
      )
    }

    const returnAwb = await createReversePickup(order, reason.trim())

    const [returnTicket] = await prisma.$transaction([
      prisma.returnTicket.create({
        data: {
          orderId,
          reason: reason.trim(),
          returnAwb,
          status: ReturnStatus.APPROVED,
        },
      }),
      prisma.order.update({
        where: { id: orderId },
        data: { status: OrderStatus.RETURNED },
      }),
    ])

    await audit(guard.actor, 'RETURN', orderId, `${reason.trim()} — AWB ${returnAwb}`)

    return NextResponse.json({ success: true, returnTicket, mock: isMockMode })
  } catch (error) {
    console.error('[returns]', error)
    const message = error instanceof Error ? error.message : 'Failed to create return'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

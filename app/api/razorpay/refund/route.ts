import { NextRequest, NextResponse } from 'next/server'
import { razorpay } from '@/lib/razorpay'
import { prisma } from '@/lib/prisma'
import { requireAdmin, audit } from '@/lib/admin-guard'
import { toPaise } from '@/lib/pricing'
import { ReturnStatus } from '@prisma/client'

export async function POST(req: NextRequest) {
  const guard = await requireAdmin()
  if (!guard.ok) return guard.response

  try {
    const { orderId } = await req.json()
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { returnTicket: true },
    })

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }
    if (!order.razorpayPaymentId) {
      return NextResponse.json(
        { error: 'This order has no captured payment to refund' },
        { status: 409 }
      )
    }
    if (
      order.status === 'CANCELLED' ||
      order.returnTicket?.status === ReturnStatus.REFUNDED
    ) {
      return NextResponse.json(
        { error: 'Order is already cancelled or refunded' },
        { status: 409 }
      )
    }

    const refund = await razorpay.payments.refund(order.razorpayPaymentId, {
      amount: toPaise(order.totalAmount),
      speed: 'normal',
      notes: {
        reason: 'Refund initiated via Cosmic Power admin dashboard',
      },
    })

    if (order.returnTicket) {
      await prisma.returnTicket.update({
        where: { orderId: order.id },
        data: { status: ReturnStatus.REFUNDED, refundId: refund.id },
      })
    }

    await prisma.order.update({
      where: { id: order.id },
      data: { status: 'CANCELLED' },
    })

    await audit(guard.actor, 'REFUND', orderId, `₹${order.totalAmount} — ${refund.id}`)

    return NextResponse.json({ success: true, refund })
  } catch (error) {
    console.error('[refund]', error)
    const message = error instanceof Error ? error.message : 'Failed to process refund'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

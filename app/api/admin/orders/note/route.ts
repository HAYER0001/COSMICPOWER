import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin, audit } from '@/lib/admin-guard'

export async function POST(req: NextRequest) {
  const guard = await requireAdmin()
  if (!guard.ok) return guard.response

  try {
    const { orderId, note } = await req.json()

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 })
    }

    const updated = await prisma.order.update({
      where: { id: orderId },
      data: { adminNote: typeof note === 'string' ? note.trim() : null },
    })

    await audit(guard.actor, 'NOTE_UPDATE', orderId, `Note: "${note?.slice(0, 80)}"`)

    return NextResponse.json({ success: true, order: updated })
  } catch (error) {
    console.error('[admin/note]', error)
    return NextResponse.json({ error: 'Failed to save note' }, { status: 500 })
  }
}

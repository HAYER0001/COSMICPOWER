import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin, audit } from '@/lib/admin-guard'

function escapeCsv(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return '""'
  const str = String(value).replace(/"/g, '""')
  return `"${str}"`
}

export async function GET() {
  const guard = await requireAdmin()
  if (!guard.ok) return guard.response

  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: { items: true },
    })

    const headers = [
      'Order Ref',
      'Order ID (Full)',
      'Date (IST)',
      'Status',
      'Customer Name',
      'Customer Email',
      'Customer Phone',
      'Shipping Address',
      'City',
      'State',
      'PIN Code',
      'Items',
      'Total Items Qty',
      'Subtotal (INR)',
      'Shipping Charge (INR)',
      'Total Paid (INR)',
      'Taxable Value (INR)',
      'GST Rate (%)',
      'GST Amount (INR)',
      'Razorpay Order ID',
      'Razorpay Payment ID',
      'Courier AWB',
      'Admin Notes',
    ]

    const rows = orders.map((o) => {
      const itemsList = o.items
        .map((i) => `${i.quantity}x ${i.name} (${i.variant})`)
        .join('; ')
      const totalQty = o.items.reduce((acc, i) => acc + i.quantity, 0)
      const dateStr = o.createdAt.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })

      return [
        escapeCsv(o.id.slice(-8)),
        escapeCsv(o.id),
        escapeCsv(dateStr),
        escapeCsv(o.status),
        escapeCsv(o.customerName),
        escapeCsv(o.customerEmail),
        escapeCsv(o.customerPhone),
        escapeCsv(o.shippingAddress),
        escapeCsv(o.shippingCity),
        escapeCsv(o.shippingState),
        escapeCsv(o.shippingPinCode),
        escapeCsv(itemsList),
        escapeCsv(totalQty),
        escapeCsv(o.subtotal.toFixed(2)),
        escapeCsv(o.shippingCharge.toFixed(2)),
        escapeCsv(o.totalAmount.toFixed(2)),
        escapeCsv(o.taxableValue.toFixed(2)),
        escapeCsv(o.gstRate),
        escapeCsv(o.gstAmount.toFixed(2)),
        escapeCsv(o.razorpayOrderId ?? ''),
        escapeCsv(o.razorpayPaymentId ?? ''),
        escapeCsv(o.awbNumber ?? ''),
        escapeCsv(o.adminNote ?? ''),
      ].join(',')
    })

    const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n')

    await audit(guard.actor, 'EXPORT_CSV', undefined, `Exported ${orders.length} orders`)

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="golden-deer-orders-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    })
  } catch (error) {
    console.error('[admin/export]', error)
    return NextResponse.json({ error: 'Failed to export CSV' }, { status: 500 })
  }
}

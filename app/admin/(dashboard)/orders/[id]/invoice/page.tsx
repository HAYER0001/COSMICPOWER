import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { site } from '@/content/site'
import { ArrowLeft } from 'lucide-react'
import PrintInvoiceButton from '@/components/admin/PrintInvoiceButton'

export const dynamic = 'force-dynamic'

function inr(n: number) {
  return `₹${n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export default async function OrderInvoicePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: true },
  })

  if (!order) notFound()

  const isInterState = order.shippingState.toLowerCase().trim() !== 'bihar'
  const cgstRate = isInterState ? 0 : order.gstRate / 2
  const sgstRate = isInterState ? 0 : order.gstRate / 2
  const igstRate = isInterState ? order.gstRate : 0

  const cgstAmount = isInterState ? 0 : order.gstAmount / 2
  const sgstAmount = isInterState ? 0 : order.gstAmount / 2
  const igstAmount = isInterState ? order.gstAmount : 0

  return (
    <div className="mx-auto max-w-4xl p-4 sm:p-8">
      {/* Screen toolbar (hidden in print) */}
      <div className="mb-6 flex items-center justify-between print:hidden">
        <Link
          href={`/admin/orders/${order.id}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Order
        </Link>
        <PrintInvoiceButton />
      </div>

      {/* Printable Invoice Sheet */}
      <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm print:border-none print:p-0 print:shadow-none text-gray-900 font-sans">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-gray-300 pb-6">
          <div>
            <h1 className="font-serif text-2xl font-bold tracking-tight text-[#0F2E1E]">
              Golden Deer
            </h1>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mt-0.5">
              by {site.legal.company}
            </p>
            <p className="mt-2 text-xs text-gray-600 max-w-xs leading-relaxed">
              {site.legal.address}
            </p>
            <div className="mt-2 text-xs text-gray-700 space-y-0.5">
              <p><strong>GSTIN:</strong> {site.legal.gstin}</p>
              <p><strong>FSSAI Lic:</strong> {site.legal.fssaiLicense}</p>
              <p><strong>Email:</strong> {site.contact.email}</p>
            </div>
          </div>

          <div className="text-right">
            <span className="inline-block bg-[#0F2E1E] px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#E8C97A] rounded">
              Tax Invoice
            </span>
            <p className="mt-3 font-mono text-sm font-semibold">
              INV-{order.id.slice(-8).toUpperCase()}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              Date: {order.createdAt.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </p>
            {order.razorpayPaymentId && (
              <p className="mt-2 font-mono text-[11px] text-gray-500">
                Payment Ref: {order.razorpayPaymentId}
              </p>
            )}
            {order.awbNumber && (
              <p className="mt-0.5 font-mono text-[11px] text-gray-500">
                AWB / Tracking: {order.awbNumber}
              </p>
            )}
          </div>
        </div>

        {/* Bill To & Ship To */}
        <div className="grid grid-cols-2 gap-6 border-b border-gray-300 py-6 text-xs">
          <div>
            <h3 className="font-bold text-gray-500 uppercase tracking-wider mb-1">
              Customer Details
            </h3>
            <p className="font-semibold text-gray-900 text-sm">{order.customerName}</p>
            <p className="text-gray-600">{order.customerPhone}</p>
            <p className="text-gray-600">{order.customerEmail}</p>
          </div>
          <div>
            <h3 className="font-bold text-gray-500 uppercase tracking-wider mb-1">
              Shipping Address
            </h3>
            <p className="text-gray-800 leading-relaxed">
              {order.shippingAddress}<br />
              {order.shippingCity}, {order.shippingState} — <strong>{order.shippingPinCode}</strong><br />
              Place of Supply: <strong>{order.shippingState}</strong>
            </p>
          </div>
        </div>

        {/* Line Items Table */}
        <div className="py-6">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-gray-300 text-gray-600 font-semibold uppercase tracking-wider">
                <th className="py-2">#</th>
                <th className="py-2">Item Description</th>
                <th className="py-2 text-center">HSN</th>
                <th className="py-2 text-center">Qty</th>
                <th className="py-2 text-right">Unit Price</th>
                <th className="py-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {order.items.map((item, idx) => (
                <tr key={item.id}>
                  <td className="py-3 text-gray-400">{idx + 1}</td>
                  <td className="py-3">
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-gray-500 text-[11px]">Variant: {item.variant}</p>
                  </td>
                  <td className="py-3 text-center font-mono text-gray-600">2106</td>
                  <td className="py-3 text-center font-semibold">{item.quantity}</td>
                  <td className="py-3 text-right">{inr(item.price)}</td>
                  <td className="py-3 text-right font-medium">{inr(item.price * item.quantity)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Calculation Summary */}
        <div className="border-t border-gray-300 pt-4 flex justify-end text-xs">
          <div className="w-64 space-y-1.5">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal:</span>
              <span>{inr(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping Charge:</span>
              <span>{order.shippingCharge === 0 ? 'Free' : inr(order.shippingCharge)}</span>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-1 text-gray-600">
              <span>Taxable Value:</span>
              <span>{inr(order.taxableValue)}</span>
            </div>
            {isInterState ? (
              <div className="flex justify-between text-gray-600">
                <span>IGST ({igstRate}%):</span>
                <span>{inr(igstAmount)}</span>
              </div>
            ) : (
              <>
                <div className="flex justify-between text-gray-600">
                  <span>CGST ({cgstRate}%):</span>
                  <span>{inr(cgstAmount)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>SGST ({sgstRate}%):</span>
                  <span>{inr(sgstAmount)}</span>
                </div>
              </>
            )}
            <div className="flex justify-between border-t-2 border-gray-900 pt-2 text-sm font-bold text-gray-900">
              <span>Total Invoice Amount:</span>
              <span>{inr(order.totalAmount)}</span>
            </div>
            <p className="text-[10px] text-gray-500 text-right mt-0.5">
              (All product prices are inclusive of GST)
            </p>
          </div>
        </div>

        {/* Signatory & Terms */}
        <div className="mt-12 border-t border-gray-200 pt-6 flex items-end justify-between text-[11px] text-gray-500">
          <div>
            <p className="font-semibold text-gray-700">Terms &amp; Conditions:</p>
            <p>1. Certified that all particulars are true and correct.</p>
            <p>2. Computer generated invoice; requires no physical signature.</p>
          </div>
          <div className="text-right">
            <div className="h-10"></div>
            <p className="font-semibold text-gray-800">For {site.legal.company}</p>
            <p className="text-gray-500 text-[10px]">Authorized Signatory</p>
          </div>
        </div>
      </div>
    </div>
  )
}

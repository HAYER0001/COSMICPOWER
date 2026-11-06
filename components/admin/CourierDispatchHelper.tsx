'use client'

import { useState, useCallback } from 'react'
import { Copy, Check, ExternalLink, Truck } from 'lucide-react'

interface CourierDispatchHelperProps {
  order: {
    id: string
    customerName: string
    customerPhone?: string | null
    customerEmail: string
    shippingAddress: string
    shippingCity: string
    shippingState: string
    shippingPinCode: string
    totalAmount: number
    items: { name: string; variant: string; quantity: number }[]
    razorpayPaymentId?: string | null
  }
  compact?: boolean
}

export default function CourierDispatchHelper({
  order,
  compact = false,
}: CourierDispatchHelperProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(() => {
    const itemsSummary = order.items
      .map((i) => `${i.quantity}x ${i.name} (${i.variant})`)
      .join(', ')

    const text = `Customer: ${order.customerName}
Phone: ${order.customerPhone || ''}
Address: ${order.shippingAddress}
City: ${order.shippingCity}
State: ${order.shippingState}
Pincode: ${order.shippingPinCode}
Items: ${itemsSummary}
Payment Type: Prepaid (Razorpay ${order.razorpayPaymentId || order.id})
Order Value: ₹${order.totalAmount}`

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }, [order])

  if (compact) {
    return (
      <button
        onClick={(e) => {
          e.stopPropagation()
          handleCopy()
        }}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium border border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors"
        title="Copy customer name, address, phone & contents for Shiprocket or courier"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-emerald-600" />
            <span className="text-emerald-700 font-semibold">Copied!</span>
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" />
            <span>Copy for Shiprocket</span>
          </>
        )}
      </button>
    )
  }

  return (
    <div className="rounded-lg border border-purple-200 bg-gradient-to-br from-purple-50/60 to-white p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Truck className="h-4 w-4 text-purple-700" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-purple-900">
            Courier &amp; Shiprocket Dispatch Hub
          </h3>
        </div>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-purple-600 hover:bg-purple-700 text-white transition-colors shadow-sm"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-white" />
              <span>Copied for Courier!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy Dispatch Details</span>
            </>
          )}
        </button>
      </div>

      <p className="text-xs text-purple-950/70 leading-relaxed">
        1-click copy pre-formatted for Shiprocket, Amazon Shipping, or Delhivery to schedule pickup without typing errors.
      </p>

      <div className="pt-2 border-t border-purple-100 flex flex-wrap gap-2">
        <a
          href="https://app.shiprocket.in/seller/orders"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-[#7B2CBF] text-white hover:bg-[#6A24A6] transition-colors"
        >
          <span>Open Shiprocket</span>
          <ExternalLink className="h-3 w-3" />
        </a>
        <a
          href="https://ship.amazon.in"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-[#FF9900] text-gray-950 hover:bg-[#E68A00] transition-colors"
        >
          <span>Open Amazon Shipping</span>
          <ExternalLink className="h-3 w-3" />
        </a>
        <a
          href="https://one.delhivery.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-[#E63946] text-white hover:bg-[#D62839] transition-colors"
        >
          <span>Open Delhivery One</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  )
}

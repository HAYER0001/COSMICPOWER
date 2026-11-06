'use client'

import { useState } from 'react'
import Link from 'next/link'
import { X, MessageCircle, ExternalLink, Printer, ShieldCheck, ShieldAlert, Save, Loader2, CheckCircle2 } from 'lucide-react'
import TrackingLink from '@/app/admin/(dashboard)/TrackingLink'
import CourierDispatchHelper from './CourierDispatchHelper'

export interface OrderDetailType {
  id: string
  createdAt: string | Date
  customerName: string
  customerEmail: string
  customerPhone: string
  shippingAddress: string
  shippingCity: string
  shippingState: string
  shippingPinCode: string
  subtotal: number
  shippingCharge: number
  totalAmount: number
  gstAmount: number
  gstRate: number
  status: string
  awbNumber?: string | null
  adminNote?: string | null
  razorpayOrderId?: string | null
  razorpayPaymentId?: string | null
  items: { id: string; name: string; variant: string; price: number; quantity: number }[]
}

function inr(n: number) {
  return `₹${n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export default function OrderSlideOver({
  order,
  onClose,
  onNoteUpdated,
}: {
  order: OrderDetailType | null
  onClose: () => void
  onNoteUpdated?: (orderId: string, note: string) => void
}) {
  const [note, setNote] = useState(order?.adminNote ?? '')
  const [isSavingNote, setIsSavingNote] = useState(false)
  const [noteSaved, setNoteSaved] = useState(false)

  if (!order) return null

  const handleSaveNote = async () => {
    setIsSavingNote(true)
    setNoteSaved(false)
    try {
      const res = await fetch('/api/admin/orders/note', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: order.id, note }),
      })
      if (res.ok) {
        setNoteSaved(true)
        onNoteUpdated?.(order.id, note)
        setTimeout(() => setNoteSaved(false), 2000)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsSavingNote(false)
    }
  }

  // Risk & Fraud Assessment (Feature #11)
  const isHighValue = order.totalAmount > 3000
  const isPaid = order.status === 'PAID' || order.status === 'SHIPPED' || order.status === 'DELIVERED'
  const isCleanPhone = /^[6-9]\d{9}$/.test(order.customerPhone.replace(/\D/g, '').slice(-10))
  const riskScore = !isPaid ? 'Medium' : isCleanPhone ? 'Low' : 'Review'

  const phoneDigits = order.customerPhone.replace(/\D/g, '').slice(-10)
  const whatsappUrl = `https://wa.me/91${phoneDigits}?text=${encodeURIComponent(
    `Hi ${order.customerName.split(' ')[0]}! This is Golden Deer Customer Support regarding your order #${order.id.slice(-8)}. How can we assist you today?`
  )}`

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-xl bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 bg-[#0F2E1E] text-[#E8C97A]">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-base font-bold text-white">
                  #{order.id.slice(-8)}
                </span>
                <span className="text-xs px-2 py-0.5 rounded font-medium uppercase tracking-wider bg-[#E8C97A] text-[#0F2E1E]">
                  {order.status}
                </span>
              </div>
              <p className="text-xs text-[#E8C97A]/60 mt-0.5">
                {new Date(order.createdAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href={`/admin/orders/${order.id}/invoice`}
                target="_blank"
                className="p-1.5 rounded text-[#E8C97A] hover:bg-white/10 transition-colors"
                title="Print GST Invoice"
              >
                <Printer className="h-5 w-5" />
              </Link>
              <Link
                href={`/admin/orders/${order.id}`}
                className="p-1.5 rounded text-[#E8C97A] hover:bg-white/10 transition-colors"
                title="Full Page View"
              >
                <ExternalLink className="h-5 w-5" />
              </Link>
              <button
                onClick={onClose}
                className="p-1.5 rounded text-[#E8C97A] hover:bg-white/10 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-gray-700">
            {/* Risk & Fraud Assessment Badge */}
            <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200 bg-gray-50">
              <div className="flex items-center gap-2">
                {riskScore === 'Low' ? (
                  <ShieldCheck className="h-5 w-5 text-emerald-600" />
                ) : (
                  <ShieldAlert className="h-5 w-5 text-amber-600" />
                )}
                <div>
                  <p className="text-xs font-semibold text-gray-900">
                    Risk Assessment: <span className={riskScore === 'Low' ? 'text-emerald-700 font-bold' : 'text-amber-700 font-bold'}>{riskScore} Risk</span>
                  </p>
                  <p className="text-[11px] text-gray-500">
                    {order.razorpayPaymentId ? 'Verified Razorpay online payment captured' : 'Awaiting payment verification'}
                  </p>
                </div>
              </div>
              {isHighValue && (
                <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded">
                  High Value Basket
                </span>
              )}
            </div>

            {/* Customer Details & 1-Click WhatsApp Support */}
            <div className="rounded-lg border border-gray-200 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Customer &amp; Contact
                </h3>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 text-xs font-medium transition-colors"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  WhatsApp Buyer
                </a>
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-base">{order.customerName}</p>
                <p className="text-gray-600">{order.customerEmail}</p>
                <p className="text-gray-600 font-mono text-xs">{order.customerPhone}</p>
              </div>
              <div className="border-t border-gray-100 pt-2 text-xs text-gray-600">
                <span className="font-medium text-gray-700">Delivery Address:</span>
                <p className="mt-0.5 leading-relaxed">
                  {order.shippingAddress}, {order.shippingCity}, {order.shippingState} — <strong>{order.shippingPinCode}</strong>
                </p>
              </div>
            </div>

            {/* Courier Dispatch & Shiprocket Hub */}
            <CourierDispatchHelper order={order} />

            {/* Courier & Tracking */}
            <div className="rounded-lg border border-gray-200 p-4 space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Fulfillment &amp; Courier Tracking
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Tracking (AWB):</span>
                <span className="font-mono text-xs font-semibold">
                  {order.awbNumber ? <TrackingLink awb={order.awbNumber} /> : 'Not manifested yet'}
                </span>
              </div>
              {order.razorpayPaymentId && (
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Razorpay Payment ID:</span>
                  <span className="font-mono text-[11px]">{order.razorpayPaymentId}</span>
                </div>
              )}
            </div>

            {/* Items Ordered */}
            <div className="rounded-lg border border-gray-200 p-4 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Items ({order.items.reduce((acc, i) => acc + i.quantity, 0)})
              </h3>
              <ul className="divide-y divide-gray-100">
                {order.items.map((item) => (
                  <li key={item.id} className="py-2.5 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.variant} &times; {item.quantity}</p>
                    </div>
                    <p className="font-medium text-gray-900">{inr(item.price * item.quantity)}</p>
                  </li>
                ))}
              </ul>
              <div className="border-t border-gray-200 pt-3 space-y-1 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{inr(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{order.shippingCharge === 0 ? 'Free' : inr(order.shippingCharge)}</span>
                </div>
                <div className="flex justify-between font-bold text-gray-900 text-sm pt-1 border-t border-gray-100">
                  <span>Total Paid</span>
                  <span>{inr(order.totalAmount)}</span>
                </div>
                <p className="text-[11px] text-gray-400 text-right">
                  Incl. {inr(order.gstAmount)} GST ({order.gstRate}%)
                </p>
              </div>
            </div>

            {/* Internal Staff Notes (Feature #19) */}
            <div className="rounded-lg border border-gray-200 p-4 space-y-2 bg-amber-50/40">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                  Internal Staff Notes
                </h3>
                {noteSaved && (
                  <span className="inline-flex items-center gap-1 text-xs text-emerald-700 font-medium">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Saved
                  </span>
                )}
              </div>
              <textarea
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add private staff note (e.g. Masaurhi pickup confirmed, gift message, customer call back)..."
                className="w-full text-xs p-2.5 rounded border border-gray-300 bg-white text-gray-900 focus:outline-none focus:border-[#C9A24B] placeholder-gray-400"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleSaveNote}
                  disabled={isSavingNote}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-gray-900 hover:bg-gray-800 text-white text-xs font-medium disabled:opacity-50"
                >
                  {isSavingNote ? <Loader2 className="h-3 w-3 animate-spin" /> : <Save className="h-3 w-3" />}
                  Save Note
                </button>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex items-center justify-between">
            <Link
              href={`/admin/orders/${order.id}/invoice`}
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-700 hover:text-black border border-gray-300 rounded px-3 py-2 bg-white"
            >
              <Printer className="h-3.5 w-3.5" />
              Tax Invoice (PDF)
            </Link>
            <Link
              href={`/admin/orders/${order.id}`}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#E8C97A] rounded px-4 py-2 bg-[#0F2E1E] hover:bg-black"
            >
              Open Full Order Page
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

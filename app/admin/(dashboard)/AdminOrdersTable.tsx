'use client'

import { useState, useEffect, useCallback, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import TrackingLink from './TrackingLink'
import AdminActions from './AdminActions'
import OrderSlideOver, { OrderDetailType } from '@/components/admin/OrderSlideOver'
import CourierDispatchHelper from '@/components/admin/CourierDispatchHelper'
import { CheckSquare, Square, Truck, CheckCircle, Download, Eye, Printer } from 'lucide-react'

const STATUS_STYLES: Record<string, string> = {
  PENDING: 'bg-gray-100 text-gray-700',
  PAID: 'bg-green-100 text-green-800',
  SHIPPED: 'bg-blue-100 text-blue-800',
  DELIVERED: 'bg-emerald-100 text-emerald-800',
  RETURNED: 'bg-orange-100 text-orange-800',
  CANCELLED: 'bg-red-100 text-red-700',
  FAILED: 'bg-red-100 text-red-700',
}

function inr(n: number) {
  return `₹${n.toLocaleString('en-IN')}`
}

export default function AdminOrdersTable({
  orders: initialOrders,
}: {
  orders: (OrderDetailType & {
    returnTicket?: { id: string; status: string } | null
  })[]
}) {
  const router = useRouter()
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [activeOrder, setActiveOrder] = useState<OrderDetailType | null>(null)
  const [focusedIndex, setFocusedIndex] = useState<number>(-1)
  const [isBulkBusy, setIsBulkBusy] = useState(false)
  const [, startTransition] = useTransition()
  const [noteOverrides, setNoteOverrides] = useState<Record<string, string>>({})

  const orders = initialOrders.map((o) =>
    noteOverrides[o.id] !== undefined ? { ...o, adminNote: noteOverrides[o.id] } : o
  )

  const allSelected = orders.length > 0 && selectedIds.length === orders.length

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds([])
    } else {
      setSelectedIds(orders.map((o) => o.id))
    }
  }

  const toggleSelectOrder = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const handleBulkAction = async (action: 'MARK_SHIPPED' | 'MARK_DELIVERED' | 'CANCEL') => {
    if (selectedIds.length === 0) return

    let customAwbPrefix = ''
    if (action === 'MARK_SHIPPED') {
      const carrier = window.prompt(
        `Batch Ship ${selectedIds.length} orders.\nEnter tracking prefix (e.g. AMZN, DLV, BLUEDART) or leave empty:`,
        'AMZN'
      )
      if (carrier === null) return
      customAwbPrefix = carrier.trim()
    }

    if (!window.confirm(`Are you sure you want to apply ${action} to ${selectedIds.length} selected orders?`)) {
      return
    }

    setIsBulkBusy(true)
    try {
      const res = await fetch('/api/admin/orders/batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderIds: selectedIds, action, customAwbPrefix }),
      })
      if (res.ok) {
        startTransition(() => {
          router.refresh()
        })
      } else {
        const data = await res.json().catch(() => ({}))
        alert(data?.error ?? 'Batch action failed')
      }
    } catch {
      alert('Network error during batch action')
    } finally {
      setIsBulkBusy(false)
    }
  }

  // Keyboard navigation for power users (J/K)
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return
      }

      if (e.key === 'j' || e.key === 'ArrowDown') {
        e.preventDefault()
        setFocusedIndex((prev) => Math.min(prev + 1, orders.length - 1))
      } else if (e.key === 'k' || e.key === 'ArrowUp') {
        e.preventDefault()
        setFocusedIndex((prev) => Math.max(prev - 1, 0))
      } else if (e.key === ' ' || e.key === 'Enter') {
        if (focusedIndex >= 0 && orders[focusedIndex]) {
          e.preventDefault()
          setActiveOrder(orders[focusedIndex])
        }
      } else if (e.key === 'Escape') {
        setActiveOrder(null)
      }
    },
    [orders, focusedIndex]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <>
      {/* Sticky Bulk Action Toolbar (Feature #2) */}
      {selectedIds.length > 0 && (
        <div className="sticky top-20 z-30 mb-4 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-gray-900 px-5 py-3 text-white shadow-xl animate-in slide-in-from-top-2 duration-150">
          <div className="flex items-center gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E8C97A] text-xs font-bold text-[#0F2E1E]">
              {selectedIds.length}
            </span>
            <span className="text-sm font-medium">orders selected</span>
            <button
              onClick={() => setSelectedIds([])}
              className="text-xs text-gray-400 hover:text-white underline ml-2"
            >
              Clear selection
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleBulkAction('MARK_SHIPPED')}
              disabled={isBulkBusy}
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium hover:bg-blue-500 disabled:opacity-50 transition-colors"
            >
              <Truck className="h-3.5 w-3.5" />
              Batch Ship
            </button>
            <button
              onClick={() => handleBulkAction('MARK_DELIVERED')}
              disabled={isBulkBusy}
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-medium hover:bg-emerald-500 disabled:opacity-50 transition-colors"
            >
              <CheckCircle className="h-3.5 w-3.5" />
              Batch Mark Delivered
            </button>
            <button
              onClick={() => {
                window.open('/api/admin/export', '_blank')
              }}
              className="inline-flex items-center gap-1.5 rounded-lg bg-gray-700 px-3 py-1.5 text-xs font-medium hover:bg-gray-600 transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              Export CSV
            </button>
          </div>
        </div>
      )}

      {/* Orders Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="border-b border-gray-200 bg-gray-50 text-gray-900">
              <tr>
                <th className="w-10 px-4 py-3">
                  <button
                    onClick={toggleSelectAll}
                    className="flex items-center text-gray-500 hover:text-gray-900"
                    title={allSelected ? 'Deselect all' : 'Select all'}
                  >
                    {allSelected ? (
                      <CheckSquare className="h-4 w-4 text-[#0F2E1E]" />
                    ) : (
                      <Square className="h-4 w-4" />
                    )}
                  </button>
                </th>
                <th className="px-4 py-3 font-semibold">Order</th>
                <th className="px-4 py-3 font-semibold">Customer</th>
                <th className="px-4 py-3 font-semibold">Items</th>
                <th className="px-4 py-3 font-semibold">Amount</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Tracking / AWB</th>
                <th className="px-4 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order, index) => {
                const isSelected = selectedIds.includes(order.id)
                const isFocused = index === focusedIndex

                return (
                  <tr
                    key={order.id}
                    onClick={() => setActiveOrder(order)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-amber-50/70 hover:bg-amber-50'
                        : isFocused
                        ? 'bg-blue-50/60 hover:bg-blue-50'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <td
                      className="px-4 py-3"
                      onClick={(e) => toggleSelectOrder(order.id, e)}
                    >
                      <button className="flex items-center text-gray-400 hover:text-gray-900">
                        {isSelected ? (
                          <CheckSquare className="h-4 w-4 text-[#0F2E1E]" />
                        ) : (
                          <Square className="h-4 w-4" />
                        )}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-mono text-xs font-bold text-gray-900">
                        #{order.id.slice(-8)}
                      </p>
                      <p className="mt-0.5 text-xs text-gray-400">
                        {new Date(order.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                      {order.adminNote && (
                        <p className="mt-1 line-clamp-1 text-[11px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                          {order.adminNote}
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900">{order.customerName}</p>
                      <p className="text-xs text-gray-400">{order.customerEmail}</p>
                      <p className="text-xs text-gray-400 font-mono">{order.customerPhone}</p>
                      <p className="mt-1 max-w-[16rem] text-xs text-gray-500 truncate">
                        {order.shippingCity}, {order.shippingState} — {order.shippingPinCode}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <ul className="space-y-0.5 text-xs">
                        {order.items.map((item) => (
                          <li key={item.id} className="text-gray-800">
                            <strong>{item.quantity}&times;</strong> {item.name}{' '}
                            <span className="text-gray-400">({item.variant})</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-bold text-gray-900">{inr(order.totalAmount)}</p>
                      {order.shippingCharge > 0 ? (
                        <p className="text-[11px] text-gray-500">
                          incl. {inr(order.shippingCharge)} shipping
                        </p>
                      ) : (
                        <p className="text-[11px] text-emerald-600 font-medium">Free delivery</p>
                      )}
                      <p className="text-[10px] text-gray-400">
                        GST {inr(order.gstAmount)} ({order.gstRate}%)
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          STATUS_STYLES[order.status] ?? 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {order.status}
                      </span>
                      {order.returnTicket && (
                        <p className="mt-1 text-xs text-orange-600 font-medium">
                          Return: {order.returnTicket.status}
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs">
                      {order.awbNumber ? (
                        <div onClick={(e) => e.stopPropagation()}>
                          <TrackingLink awb={order.awbNumber} />
                        </div>
                      ) : (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>
                    <td
                      className="px-4 py-3 text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-end gap-1.5">
                        <CourierDispatchHelper order={order} compact />
                        <button
                          onClick={() => setActiveOrder(order)}
                          className="p-1 rounded text-gray-400 hover:text-gray-900 hover:bg-gray-100"
                          title="Quick View Drawer"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <a
                          href={`/admin/orders/${order.id}/invoice`}
                          target="_blank"
                          className="p-1 rounded text-gray-400 hover:text-gray-900 hover:bg-gray-100"
                          title="Print GST Invoice"
                        >
                          <Printer className="h-4 w-4" />
                        </a>
                        <AdminActions
                          orderId={order.id}
                          status={order.status}
                          returnStatus={order.returnTicket?.status}
                        />
                      </div>
                    </td>
                  </tr>
                )
              })}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-16 text-center text-gray-500">
                    No orders found matching the filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-Over Contextual Drawer (Feature #5) */}
      <OrderSlideOver
        order={activeOrder}
        onClose={() => setActiveOrder(null)}
        onNoteUpdated={(orderId, newNote) => {
          setNoteOverrides((prev) => ({ ...prev, [orderId]: newNote }))
        }}
      />
    </>
  )
}

'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

type Props = {
  orderId: string
  status: string
  returnStatus?: string
}

export default function AdminActions({ orderId, status, returnStatus }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [busy, setBusy] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const call = async (
    label: string,
    url: string,
    body: Record<string, unknown>,
    confirmMessage?: string
  ) => {
    if (confirmMessage && !window.confirm(confirmMessage)) return

    setBusy(label)
    setError(null)
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        setError(data?.error ?? `${label} failed`)
        return
      }
      startTransition(() => router.refresh())
    } catch {
      setError('Network error — please retry')
    } finally {
      setBusy(null)
    }
  }

  const disabled = busy !== null || isPending
  const btn =
    'rounded-md px-3 py-1.5 text-xs font-medium text-white transition-colors disabled:opacity-50'

  return (
    <div className="flex flex-col items-end gap-1.5">
      <div className="flex flex-wrap justify-end gap-2">
        {status === 'PAID' && (
          <>
            <button
              onClick={() => call('ship', '/api/delhivery/manifest', { orderId })}
              disabled={disabled}
              className={`${btn} bg-blue-600 hover:bg-blue-700`}
            >
              {busy === 'ship' ? <Loader2 className="h-3 w-3 animate-spin" /> : 'Delhivery Label'}
            </button>
            <button
              onClick={() => {
                const awb = window.prompt('Enter Amazon Shipping / Carrier Tracking Number (AWB):')
                if (!awb) return
                call('mark_shipped', '/api/orders/status', {
                  orderId,
                  status: 'SHIPPED',
                  awbNumber: awb.trim(),
                })
              }}
              disabled={disabled}
              className={`${btn} bg-amber-600 hover:bg-amber-700`}
            >
              {busy === 'mark_shipped' ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                'Ship (Amazon / Carrier)'
              )}
            </button>
            <button
              onClick={() =>
                call(
                  'refund',
                  '/api/razorpay/refund',
                  { orderId },
                  'Cancel this order and issue a full Razorpay refund? This cannot be undone.'
                )
              }
              disabled={disabled}
              className={`${btn} bg-rose-600 hover:bg-rose-700`}
            >
              {busy === 'refund' ? <Loader2 className="h-3 w-3 animate-spin" /> : 'Cancel & Refund'}
            </button>
          </>
        )}

        {status === 'SHIPPED' && (
          <button
            onClick={() =>
              call('deliver', '/api/orders/status', {
                orderId,
                status: 'DELIVERED',
              })
            }
            disabled={disabled}
            className={`${btn} bg-emerald-600 hover:bg-emerald-700`}
          >
            {busy === 'deliver' ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              'Mark delivered'
            )}
          </button>
        )}

        {['PAID', 'SHIPPED', 'DELIVERED'].includes(status) && !returnStatus && (
          <button
            onClick={() => {
              const reason = window.prompt('Reason for return?')
              if (!reason) return
              call('return', '/api/delhivery/returns', { orderId, reason })
            }}
            disabled={disabled}
            className={`${btn} bg-orange-500 hover:bg-orange-600`}
          >
            {busy === 'return' ? <Loader2 className="h-3 w-3 animate-spin" /> : 'Start return'}
          </button>
        )}

        {returnStatus && returnStatus !== 'REFUNDED' && (
          <button
            onClick={() =>
              call(
                'refund',
                '/api/razorpay/refund',
                { orderId },
                'Issue a full refund for this order? This cannot be undone.'
              )
            }
            disabled={disabled}
            className={`${btn} bg-red-600 hover:bg-red-700`}
          >
            {busy === 'refund' ? <Loader2 className="h-3 w-3 animate-spin" /> : 'Refund'}
          </button>
        )}

        {status === 'PENDING' && (
          <span className="text-xs text-gray-400">Awaiting payment</span>
        )}
      </div>

      {error && (
        <p role="alert" className="max-w-[14rem] text-right text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}

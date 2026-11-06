'use client'

import { useState } from 'react'
import { lookupOrder, type TrackedOrder } from '@/app/actions/track'
import { Button } from '@/components/shared/primitives'
import { Loader2, Check, Package, Truck, Home, CreditCard } from 'lucide-react'

const STEP_ICONS = [Package, CreditCard, Truck, Home]

function inr(n: number) {
  return `₹${n.toLocaleString('en-IN')}`
}

function when(iso: string | null) {
  if (!iso) return null
  return new Date(iso).toLocaleString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

export default function TrackClient() {
  const [reference, setReference] = useState('')
  const [email, setEmail] = useState('')
  const [order, setOrder] = useState<TrackedOrder | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setOrder(null)

    const result = await lookupOrder(reference, email)
    setIsLoading(false)

    if (result.ok) setOrder(result.order)
    else setError(result.message)
  }

  return (
    <div className="mx-auto max-w-2xl">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-xl border border-forest/10 bg-white p-6 shadow-sm"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-forest-deep">
              Order reference
            </span>
            <input
              required
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="e.g. fkzbfq5b"
              className="w-full rounded-lg border border-forest/20 px-4 py-3 font-mono outline-none focus:border-gold"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-forest-deep">
              Email used at checkout
            </span>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-forest/20 px-4 py-3 outline-none focus:border-gold"
            />
          </label>
        </div>

        <Button type="submit" disabled={isLoading} variant="gold-solid" className="w-full">
          {isLoading ? (
            <><Loader2 className="h-4 w-4 animate-spin" /> Looking up…</>
          ) : (
            'Track my order'
          )}
        </Button>

        <p className="text-center text-xs text-forest-deep/50">
          Your reference is the 8-character code in your confirmation email.
        </p>
      </form>

      {error && (
        <p
          role="alert"
          className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </p>
      )}

      {order && (
        <div className="mt-8 space-y-6">
          <div className="rounded-xl bg-forest-deep p-6 text-cream">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <p className="text-xs uppercase tracking-wider text-cream/50">Order</p>
                <p className="font-mono text-xl text-gold">{order.reference}</p>
              </div>
              <span className="rounded-full bg-gold/15 px-3 py-1 text-sm text-gold">
                {order.status}
              </span>
            </div>
            {order.returnStatus && (
              <p className="mt-3 text-sm text-cream/70">
                Return in progress — {order.returnStatus.toLowerCase().replace('_', ' ')}
              </p>
            )}
          </div>

          {/* Progress */}
          <ol className="rounded-xl border border-forest/10 bg-white p-6">
            {order.timeline.map((step, i) => {
              const Icon = STEP_ICONS[i] ?? Package
              return (
                <li key={step.label} className="flex gap-4 pb-6 last:pb-0">
                  <div className="flex flex-col items-center">
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                        step.done ? 'bg-gold text-forest-deep' : 'bg-cream-dark text-forest-deep/30'
                      }`}
                    >
                      {step.done ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                    </span>
                    {i < order.timeline.length - 1 && (
                      <span
                        className={`mt-1 w-px flex-1 ${step.done ? 'bg-gold/40' : 'bg-cream-dark'}`}
                      />
                    )}
                  </div>
                  <div className="pt-1.5">
                    <p
                      className={
                        step.done ? 'font-medium text-forest-deep' : 'text-forest-deep/40'
                      }
                    >
                      {step.label}
                    </p>
                    {step.at && (
                      <p className="text-xs text-forest-deep/50">{when(step.at)}</p>
                    )}
                  </div>
                </li>
              )
            })}
          </ol>

          {/* Courier */}
          {order.awbNumber && (
            <div className="rounded-xl border border-forest/10 bg-white p-6">
              <p className="mb-2 text-xs uppercase tracking-wider text-forest-deep/50">
                Courier
              </p>
              {order.trackingUrl ? (
                <>
                  <p className="font-mono text-sm text-forest-deep">{order.awbNumber}</p>
                  <a
                    href={order.trackingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm text-gold-deep underline underline-offset-2"
                  >
                    {order.awbNumber.startsWith('AMZN') ? 'Track on Amazon Shipping →' : 'Track on Courier Portal →'}
                  </a>
                </>
              ) : (
                <p className="text-sm text-forest-deep/60">
                  Your parcel is being prepared. A tracking number will appear here once it is
                  handed to the courier.
                </p>
              )}
            </div>
          )}

          {/* Items */}
          <div className="rounded-xl border border-forest/10 bg-white p-6">
            <p className="mb-3 text-xs uppercase tracking-wider text-forest-deep/50">Items</p>
            <ul className="divide-y divide-forest/5">
              {order.items.map((item, i) => (
                <li key={i} className="flex justify-between py-2.5 text-sm">
                  <span className="text-forest-deep">
                    {item.quantity}× {item.name}{' '}
                    <span className="text-forest-deep/40">({item.variant})</span>
                  </span>
                  <span className="text-forest-deep">{inr(item.lineTotal)}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-3 space-y-1 border-t border-forest/10 pt-3 text-sm">
              <div className="flex justify-between text-forest-deep/60">
                <dt>Subtotal</dt><dd>{inr(order.subtotal)}</dd>
              </div>
              <div className="flex justify-between text-forest-deep/60">
                <dt>Shipping</dt>
                <dd>{order.shipping === 0 ? 'Free' : inr(order.shipping)}</dd>
              </div>
              <div className="flex justify-between pt-1 font-medium text-forest-deep">
                <dt>Total</dt><dd>{inr(order.total)}</dd>
              </div>
            </dl>
            <p className="mt-1 text-right text-xs text-forest-deep/40">
              Inclusive of ₹{order.gstAmount.toFixed(2)} GST ({order.gstRate}%)
            </p>
            <p className="mt-4 border-t border-forest/10 pt-3 text-xs text-forest-deep/50">
              Shipping to {order.city}, {order.state} — {order.pinCode}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

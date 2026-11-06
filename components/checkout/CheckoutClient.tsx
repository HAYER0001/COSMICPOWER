'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/lib/store/useCartStore'
import { Button } from '@/components/shared/primitives'
import { createOrder, quoteCart } from '@/app/actions/checkout'
import { Loader2 } from 'lucide-react'

interface RazorpayResponse {
  razorpay_order_id: string
  razorpay_payment_id: string
  razorpay_signature: string
}

const FIELDS = [
  { name: 'name', placeholder: 'Full Name', span: true, type: 'text', autoComplete: 'name' },
  { name: 'email', placeholder: 'Email Address', span: true, type: 'email', autoComplete: 'email' },
  { name: 'phone', placeholder: '10-digit Mobile Number', span: true, type: 'tel', autoComplete: 'tel' },
  { name: 'address', placeholder: 'Street Address', span: true, type: 'text', autoComplete: 'street-address' },
  { name: 'city', placeholder: 'City', span: false, type: 'text', autoComplete: 'address-level2' },
  { name: 'state', placeholder: 'State', span: false, type: 'text', autoComplete: 'address-level1' },
  { name: 'pincode', placeholder: 'PIN Code', span: true, type: 'text', autoComplete: 'postal-code' },
] as const

export default function CheckoutClient() {
  const router = useRouter()
  const { items, clearCart } = useCartStore()

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', address: '', city: '', state: '', pincode: '',
  })
  const [quote, setQuote] = useState<{
    subtotal: number; shipping: number; total: number; gstAmount: number; gstRate: number
  } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Totals come from the server so the customer sees exactly what will be charged.
  useEffect(() => {
    // An empty cart renders the early-return branch below, so there is nothing
    // to quote and no state to clear.
    if (items.length === 0) return

    let cancelled = false
    quoteCart(
      items.map((i) => ({
        productSlug: i.productSlug,
        variant: i.variant,
        quantity: i.quantity,
      }))
    ).then((result) => {
      if (cancelled) return
      if (result.ok) {
        setQuote({
          subtotal: result.subtotal,
          shipping: result.shipping,
          total: result.total,
          gstAmount: result.gstAmount,
          gstRate: result.gstRate,
        })
      } else {
        setError(result.message)
      }
    })
    return () => {
      cancelled = true
    }
  }, [items])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const verifyAndFinish = useCallback(
    async (response: RazorpayResponse) => {
      const res = await fetch('/api/razorpay/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(response),
      })

      if (!res.ok) {
        // Money may still have been captured — the webhook is authoritative.
        setError(
          'We could not confirm your payment. If you were charged, contact us on WhatsApp and we will sort it out immediately.'
        )
        setIsLoading(false)
        return
      }

      clearCart()
      router.push('/checkout/success')
    },
    [clearCart, router]
  )

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      // Only identifiers cross the wire. The server re-prices everything.
      const orderData = await createOrder({
        items: items.map((i) => ({
          productSlug: i.productSlug,
          variant: i.variant,
          quantity: i.quantity,
        })),
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        shippingAddress: formData.address,
        shippingCity: formData.city,
        shippingState: formData.state,
        shippingPinCode: formData.pincode,
      })

      if (!orderData.ok) {
        setError(orderData.error)
        setIsLoading(false)
        return
      }

      let Razorpay = (window as unknown as { Razorpay?: new (o: unknown) => { open: () => void; on: (e: string, cb: (r: unknown) => void) => void } }).Razorpay
      if (!Razorpay) {
        const loaded = await new Promise<boolean>((resolve) => {
          const s = document.createElement('script')
          s.src = 'https://checkout.razorpay.com/v1/checkout.js'
          s.onload = () => resolve(true)
          s.onerror = () => resolve(false)
          document.body.appendChild(s)
        })
        if (loaded) {
          Razorpay = (window as unknown as { Razorpay?: new (o: unknown) => { open: () => void; on: (e: string, cb: (r: unknown) => void) => void } }).Razorpay
        }
      }

      if (!Razorpay) {
        setError('Payment gateway library could not be loaded. Please check your connection and try again.')
        setIsLoading(false)
        return
      }

      const rzp = new Razorpay({
        key: orderData.keyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Golden Deer',
        description: `Order ${orderData.orderId.slice(-8)}`,
        order_id: orderData.razorpayOrderId,
        handler: (response: RazorpayResponse) => {
          void verifyAndFinish(response)
        },
        modal: {
          ondismiss: () => setIsLoading(false),
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: { color: '#0F2E1E' },
      })

      rzp.on('payment.failed', () => {
        setError('Payment failed. No money was taken — please try again.')
        setIsLoading(false)
      })

      rzp.open()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not start checkout. Please try again.')
      setIsLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-forest-deep/60">Your cart is empty.</p>
        <div className="mt-6">
          <Button href="/products" variant="gold-solid">Browse Products</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-12 lg:grid-cols-2">
      <form
        onSubmit={handlePayment}
        className="space-y-6 rounded-xl border border-forest/10 bg-white p-6 shadow-sm"
      >
        <h3 className="mb-4 font-display text-2xl text-forest-deep">Shipping Information</h3>

        {error && (
          <p role="alert" className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        <div className="grid grid-cols-2 gap-4">
          {FIELDS.map((field) => (
            <input
              key={field.name}
              required
              type={field.type}
              name={field.name}
              autoComplete={field.autoComplete}
              value={formData[field.name]}
              onChange={handleInputChange}
              placeholder={field.placeholder}
              className={`${field.span ? 'col-span-2' : ''} rounded-lg border border-forest/20 px-4 py-3 outline-none focus:border-gold`}
            />
          ))}
        </div>

        <Button type="submit" disabled={isLoading || !quote} className="mt-4 w-full text-lg" variant="gold-solid">
          {isLoading ? (
            <><Loader2 className="h-5 w-5 animate-spin" /> Processing…</>
          ) : (
            `Pay ₹${quote?.total ?? '—'}`
          )}
        </Button>

        <p className="text-center text-xs text-forest-deep/50">
          All prices include GST. Free shipping on orders over ₹999.
          <br />Secure payment via Razorpay — we never see your card details.
        </p>
      </form>

      <div className="space-y-6 rounded-xl bg-forest-deep p-6 text-cream">
        <h3 className="mb-4 font-display text-2xl text-gold">Order Summary</h3>
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item.id} className="flex items-center justify-between border-b border-gold/10 pb-4">
              <div>
                <p className="text-lg font-medium">{item.name}</p>
                <p className="text-sm text-cream/60">{item.variant} &times; {item.quantity}</p>
              </div>
              <p className="font-medium">₹{item.price * item.quantity}</p>
            </li>
          ))}
        </ul>

        {quote && (
          <div className="space-y-2 pt-2 text-sm">
            <div className="flex justify-between text-cream/70">
              <p>Subtotal</p><p>₹{quote.subtotal}</p>
            </div>
            <div className="flex justify-between text-cream/70">
              <p>Shipping</p>
              <p>{quote.shipping === 0 ? 'Free' : `₹${quote.shipping}`}</p>
            </div>
            <div className="flex items-center justify-between border-t border-gold/20 pt-3 font-display text-xl text-gold">
              <p>Total</p><p>₹{quote.total}</p>
            </div>
            <p className="text-right text-xs text-cream/50">
              Inclusive of ₹{quote.gstAmount.toFixed(2)} GST ({quote.gstRate}%)
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

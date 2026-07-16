'use client'

import { useState, type FormEvent } from 'react'
import { Button } from '@/components/shared/primitives'
import { Send, CheckCircle, Loader2 } from 'lucide-react'

interface FormData {
  name: string
  company: string
  email: string
  phone: string
  buyerType: string
  quantity: string
  message: string
  website: string
}

const initial: FormData = {
  name: '',
  company: '',
  email: '',
  phone: '',
  buyerType: '',
  quantity: '',
  message: '',
  website: '',
}

const buyerTypes = [
  'Distributor / Wholesaler',
  'Retailer',
  'HoReCa / Restaurant / Hotel',
  'Corporate Gifting Buyer',
  'Exporter',
  'Food Processor / Brand',
  'Individual / Small Batch',
  'Other',
]

const quantities = [
  'Less than 10 kg',
  '10–50 kg',
  '50–200 kg',
  '200–500 kg',
  '500 kg – 1 tonne',
  '1–5 tonnes',
  '5+ tonnes (container load)',
]

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function InquiryForm() {
  const [data, setData] = useState<FormData>(initial)
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function validate(): string | null {
    if (!data.name.trim()) return 'Please enter your name'
    if (!data.email.trim()) return 'Please enter your email'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      return 'Please enter a valid email address'
    if (!data.phone.trim()) return 'Please enter your phone number'
    if (!data.phone.match(/^[\d\s+\-()]{7,15}$/))
      return 'Please enter a valid phone number'
    if (!data.message.trim()) return 'Please enter your message'
    if (data.message.trim().length < 10)
      return 'Message must be at least 10 characters'
    return null
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const error = validate()
    if (error) {
      setErrorMsg(error)
      return
    }
    setErrorMsg('')
    setStatus('loading')

    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed to submit')
      setStatus('success')
      setData(initial)
    } catch {
      setStatus('error')
      setErrorMsg('Something went wrong. Please try again or WhatsApp us directly.')
    }
  }

  function update(field: keyof FormData, value: string) {
    setData((prev) => ({ ...prev, [field]: value }))
  }

  if (status === 'success') {
    return (
      <div className="rounded-xl border border-gold/20 bg-gold/5 p-8 text-center">
        <CheckCircle className="w-12 h-12 text-gold mx-auto mb-4" />
        <h3 className="font-display text-xl text-forest-deep mb-2">
          Inquiry Submitted
        </h3>
        <p className="text-sm text-forest-deep/60 mb-6">
          We&apos;ll respond within 1 business day.
        </p>
        <Button
          variant="gold-outline"
          onClick={() => setStatus('idle')}
        >
          Submit Another
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot */}
      <div className="absolute opacity-0 pointer-events-none" aria-hidden>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          value={data.website}
          onChange={(e) => update('website', e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="name"
            className="block text-xs font-medium text-forest-deep/60 mb-1.5 tracking-wide uppercase"
          >
            Name <span className="text-gold">*</span>
          </label>
          <input
            id="name"
            type="text"
            value={data.name}
            onChange={(e) => update('name', e.target.value)}
            required
            className="w-full px-4 py-2.5 bg-cream border border-forest/10 rounded-lg text-sm text-forest-deep placeholder-forest/30 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-colors"
            placeholder="Your name"
          />
        </div>
        <div>
          <label
            htmlFor="company"
            className="block text-xs font-medium text-forest-deep/60 mb-1.5 tracking-wide uppercase"
          >
            Company
          </label>
          <input
            id="company"
            type="text"
            value={data.company}
            onChange={(e) => update('company', e.target.value)}
            className="w-full px-4 py-2.5 bg-cream border border-forest/10 rounded-lg text-sm text-forest-deep placeholder-forest/30 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-colors"
            placeholder="Company name (optional)"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="email"
            className="block text-xs font-medium text-forest-deep/60 mb-1.5 tracking-wide uppercase"
          >
            Email <span className="text-gold">*</span>
          </label>
          <input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => update('email', e.target.value)}
            required
            className="w-full px-4 py-2.5 bg-cream border border-forest/10 rounded-lg text-sm text-forest-deep placeholder-forest/30 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-colors"
            placeholder="you@company.com"
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-xs font-medium text-forest-deep/60 mb-1.5 tracking-wide uppercase"
          >
            Phone <span className="text-gold">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            value={data.phone}
            onChange={(e) => update('phone', e.target.value)}
            required
            className="w-full px-4 py-2.5 bg-cream border border-forest/10 rounded-lg text-sm text-forest-deep placeholder-forest/30 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-colors"
            placeholder="+91 98765 43210"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="buyerType"
            className="block text-xs font-medium text-forest-deep/60 mb-1.5 tracking-wide uppercase"
          >
            I am a…
          </label>
          <select
            id="buyerType"
            value={data.buyerType}
            onChange={(e) => update('buyerType', e.target.value)}
            className="w-full px-4 py-2.5 bg-cream border border-forest/10 rounded-lg text-sm text-forest-deep focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-colors appearance-none"
          >
            <option value="">Select type</option>
            {buyerTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="quantity"
            className="block text-xs font-medium text-forest-deep/60 mb-1.5 tracking-wide uppercase"
          >
            Estimated Quantity
          </label>
          <select
            id="quantity"
            value={data.quantity}
            onChange={(e) => update('quantity', e.target.value)}
            className="w-full px-4 py-2.5 bg-cream border border-forest/10 rounded-lg text-sm text-forest-deep focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-colors appearance-none"
          >
            <option value="">Select quantity</option>
            {quantities.map((q) => (
              <option key={q} value={q}>
                {q}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-xs font-medium text-forest-deep/60 mb-1.5 tracking-wide uppercase"
        >
          Message <span className="text-gold">*</span>
        </label>
        <textarea
          id="message"
          rows={4}
          value={data.message}
          onChange={(e) => update('message', e.target.value)}
          required
          className="w-full px-4 py-2.5 bg-cream border border-forest/10 rounded-lg text-sm text-forest-deep placeholder-forest/30 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-colors resize-y"
          placeholder="Tell us about your requirement — grade, quantity, packaging, destination..."
        />
      </div>

      {errorMsg && (
        <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-2.5">
          {errorMsg}
        </p>
      )}

      <Button
        type="submit"
        variant="gold-solid"
        disabled={status === 'loading'}
        className="w-full"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Send Inquiry
          </>
        )}
      </Button>
    </form>
  )
}

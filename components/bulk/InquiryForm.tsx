'use client'

import { useState, type FormEvent, useRef } from 'react'
import { Button } from '@/components/shared/primitives'
import { Send, Loader2 } from 'lucide-react'

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

const FIELD_KEYS: (keyof FormData)[] = ['name', 'email', 'phone', 'message']

function validateField(field: keyof FormData, value: string): string | null {
  switch (field) {
    case 'name':
      return value.trim() ? null : 'Please enter your name'
    case 'email':
      if (!value.trim()) return 'Please enter your email'
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : 'Please enter a valid email address'
    case 'phone':
      if (!value.trim()) return 'Please enter your phone number'
      return /^[\d\s+\-()]{7,15}$/.test(value) ? null : 'Please enter a valid phone number'
    case 'message':
      if (!value.trim()) return 'Please enter your message'
      return value.trim().length >= 10 ? null : 'Message must be at least 10 characters'
    default:
      return null
  }
}

function AnimatedCheckmark() {
  return (
    <svg className="w-12 h-12 mx-auto mb-4" viewBox="0 0 48 48" aria-hidden>
      <circle
        cx="24" cy="24" r="22"
        fill="none" stroke="currentColor" strokeWidth="2"
        className="text-gold"
        strokeDasharray={138.23}
        strokeDashoffset={138.23}
        style={{ animation: 'gd-draw-circle 0.4s ease-out 0.1s forwards' }}
      />
      <path
        d="M14 24l7 7 13-13"
        fill="none" stroke="currentColor" strokeWidth="2.5"
        className="text-gold"
        strokeLinecap="round" strokeLinejoin="round"
        strokeDasharray={34}
        strokeDashoffset={34}
        style={{ animation: 'gd-draw-check 0.4s ease-out 0.5s forwards, gd-elastic-settle 0.5s ease-out 0.9s' }}
      />
    </svg>
  )
}

function FieldValidIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-gold" viewBox="0 0 16 16" aria-hidden>
      <circle cx="8" cy="8" r="8" fill="var(--color-gold, #C9A24B)" opacity="0.15" />
      <path d="M4.5 8.5l2.5 2.5 5-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function InquiryForm() {
  const [data, setData] = useState<FormData>(initial)
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [touched, setTouched] = useState<Set<string>>(new Set())
  const [shakingField, setShakingField] = useState<string | null>(null)
  const shakeTimers = useRef<ReturnType<typeof setTimeout>[]>([])

  function fieldError(field: keyof FormData): string | null {
    if (!touched.has(field)) return null
    return validateField(field, data[field])
  }

  function validate(): string | null {
    for (const key of FIELD_KEYS) {
      const err = validateField(key, data[key])
      if (err) return err
    }
    return null
  }

  function triggerShake(field: string) {
    setShakingField(null)
    requestAnimationFrame(() => {
      setShakingField(field)
      const tid = setTimeout(() => {
        setShakingField(null)
      }, 500)
      shakeTimers.current.push(tid)
    })
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const error = validate()
    if (error) {
      setErrorMsg(error)
      const first = FIELD_KEYS.find(k => validateField(k, data[k]) !== null)
      if (first) triggerShake(first)
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
      setTouched(new Set())
    } catch {
      setStatus('error')
      setErrorMsg('Something went wrong. Please try again or WhatsApp us directly.')
    }
  }

  function handleBlur(field: keyof FormData) {
    const next = new Set(touched)
    next.add(field)
    setTouched(next)
    const err = validateField(field, data[field])
    if (err) {
      triggerShake(field)
      setErrorMsg(err)
    } else if (errorMsg && errorMsg === validateField(field, data[field])) {
      setErrorMsg('')
    }
  }

  function update(field: keyof FormData, value: string) {
    setData((prev) => ({ ...prev, [field]: value }))
  }

  if (status === 'success') {
    return (
      <div className="rounded-xl border border-gold/20 bg-gold/5 p-8 text-center reduced-motion-static">
        <AnimatedCheckmark />
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
    <>
      <style>{`
        @keyframes gd-draw-circle { to { stroke-dashoffset: 0; } }
        @keyframes gd-draw-check { to { stroke-dashoffset: 0; } }
        @keyframes gd-elastic-settle {
          0% { transform: scale(1); }
          70% { transform: scale(1.08); }
          100% { transform: scale(1); }
        }
        @keyframes gd-shake {
          0%, 100% { transform: translateX(0); }
          15% { transform: translateX(-6px); }
          30% { transform: translateX(6px); }
          45% { transform: translateX(-4px); }
          60% { transform: translateX(4px); }
          75% { transform: translateX(-2px); }
          90% { transform: translateX(2px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .reduced-motion-static * {
            animation: none !important;
            transition: none !important;
          }
          @keyframes gd-shake { 0%, 100% { transform: translateX(0); } }
        }
      `}</style>
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
          <FieldWrapper error={fieldError('name')} shaking={shakingField === 'name'} valid={touched.has('name') && !fieldError('name')}>
            <FieldLabel htmlFor="name" required>Name</FieldLabel>
            <input
              id="name"
              type="text"
              value={data.name}
              onChange={(e) => update('name', e.target.value)}
              onBlur={() => handleBlur('name')}
              required
              className="w-full px-4 py-2.5 bg-cream border border-forest/10 rounded-lg text-sm text-forest-deep placeholder-forest/30 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-colors"
              placeholder="Your name"
            />
          </FieldWrapper>
          <FieldWrapper error={fieldError('company')} valid={touched.has('company') && data.company.length > 0}>
            <FieldLabel htmlFor="company">Company</FieldLabel>
            <input
              id="company"
              type="text"
              value={data.company}
              onChange={(e) => update('company', e.target.value)}
              onBlur={() => { const n = new Set(touched); n.add('company'); setTouched(n) }}
              className="w-full px-4 py-2.5 bg-cream border border-forest/10 rounded-lg text-sm text-forest-deep placeholder-forest/30 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-colors"
              placeholder="Company name (optional)"
            />
          </FieldWrapper>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <FieldWrapper error={fieldError('email')} shaking={shakingField === 'email'} valid={touched.has('email') && !fieldError('email')}>
            <FieldLabel htmlFor="email" required>Email</FieldLabel>
            <input
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => update('email', e.target.value)}
              onBlur={() => handleBlur('email')}
              required
              className="w-full px-4 py-2.5 bg-cream border border-forest/10 rounded-lg text-sm text-forest-deep placeholder-forest/30 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-colors"
              placeholder="you@company.com"
            />
          </FieldWrapper>
          <FieldWrapper error={fieldError('phone')} shaking={shakingField === 'phone'} valid={touched.has('phone') && !fieldError('phone')}>
            <FieldLabel htmlFor="phone" required>Phone</FieldLabel>
            <input
              id="phone"
              type="tel"
              value={data.phone}
              onChange={(e) => update('phone', e.target.value)}
              onBlur={() => handleBlur('phone')}
              required
              className="w-full px-4 py-2.5 bg-cream border border-forest/10 rounded-lg text-sm text-forest-deep placeholder-forest/30 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-colors"
              placeholder="+91 98765 43210"
            />
          </FieldWrapper>
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

        <FieldWrapper error={fieldError('message')} shaking={shakingField === 'message'} valid={touched.has('message') && !fieldError('message')}>
          <FieldLabel htmlFor="message" required>Message</FieldLabel>
          <textarea
            id="message"
            rows={4}
            value={data.message}
            onChange={(e) => update('message', e.target.value)}
            onBlur={() => handleBlur('message')}
            required
            className="w-full px-4 py-2.5 bg-cream border border-forest/10 rounded-lg text-sm text-forest-deep placeholder-forest/30 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-colors resize-y"
            placeholder="Tell us about your requirement — grade, quantity, packaging, destination..."
          />
        </FieldWrapper>

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
    </>
  )
}

function FieldWrapper({
  children,
  error,
  shaking,
  valid,
}: {
  children: React.ReactNode
  error?: string | null
  shaking?: boolean
  valid?: boolean
}) {
  return (
    <div className={`relative ${shaking ? 'animate-gd-shake' : ''}`}>
      {children}
      {valid && !shaking && (
        <span className="absolute right-3 top-[calc(50%+2px)] -translate-y-1/2">
          <FieldValidIcon />
        </span>
      )}
      {error && (
        <p className="text-xs text-red-400 mt-1 ml-1">{error}</p>
      )}
    </div>
  )
}

function FieldLabel({
  htmlFor,
  required,
  children,
}: {
  htmlFor: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-xs font-medium text-forest-deep/60 mb-1.5 tracking-wide uppercase"
    >
      {children} {required && <span className="text-gold">*</span>}
    </label>
  )
}

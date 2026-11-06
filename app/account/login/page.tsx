'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Container } from '@/components/shared/primitives'
import { registerCustomer } from '@/app/actions/customer'
import { Loader2, Lock, Mail, User as UserIcon, ArrowRight, Package } from 'lucide-react'

export default function AccountLoginPage() {
  const router = useRouter()
  const [mode, setMode] = useState<'signin' | 'register'>('signin')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setIsLoading(true)

    if (mode === 'register') {
      const reg = await registerCustomer({ name, email, password })
      if (!reg.ok) {
        setError(reg.error)
        setIsLoading(false)
        return
      }

      // Automatically sign in after registration
      setSuccess('Account created successfully! Logging you in…')
    }

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    setIsLoading(false)

    if (!res?.ok) {
      setError(
        mode === 'register'
          ? 'Account created, but could not log in automatically. Please sign in.'
          : 'Invalid email or password. Please try again.'
      )
      return
    }

    // Refresh and navigate to customer account
    router.push('/account')
    router.refresh()
  }

  return (
    <div className="py-16 sm:py-24 bg-cream min-h-[75vh] flex items-center">
      <Container className="max-w-md w-full mx-auto">
        <div className="rounded-2xl border border-forest/15 bg-white p-6 sm:p-8 shadow-sm">
          {/* Header */}
          <div className="text-center mb-6">
            <span className="inline-block p-2.5 rounded-full bg-forest-deep text-gold mb-3">
              <Lock className="h-5 w-5" />
            </span>
            <h1 className="font-display text-2xl sm:text-3xl text-forest-deep">
              {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-xs sm:text-sm text-forest-deep/60 mt-1">
              {mode === 'signin'
                ? 'Sign in to access your order history & live tracking'
                : 'Join Golden Deer for faster checkout and order tracking'}
            </p>
          </div>

          {/* Mode Tabs */}
          <div className="flex rounded-lg bg-cream/70 p-1 mb-6 border border-forest/10">
            <button
              type="button"
              onClick={() => {
                setMode('signin')
                setError(null)
                setSuccess(null)
              }}
              className={`flex-1 py-2 text-xs font-semibold rounded-md transition-all ${
                mode === 'signin'
                  ? 'bg-forest-deep text-gold shadow-sm'
                  : 'text-forest-deep/60 hover:text-forest-deep'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('register')
                setError(null)
                setSuccess(null)
              }}
              className={`flex-1 py-2 text-xs font-semibold rounded-md transition-all ${
                mode === 'register'
                  ? 'bg-forest-deep text-gold shadow-sm'
                  : 'text-forest-deep/60 hover:text-forest-deep'
              }`}
            >
              New Customer
            </button>
          </div>

          {error && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-800">
              {success}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-medium text-forest-deep mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3.5 top-3 h-4 w-4 text-forest-deep/40" />
                  <input
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-forest/20 text-sm outline-none focus:border-gold"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-forest-deep mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 h-4 w-4 text-forest-deep/40" />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-forest/20 text-sm outline-none focus:border-gold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-forest-deep mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 h-4 w-4 text-forest-deep/40" />
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={mode === 'register' ? 'Min 6 characters' : 'Enter password'}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-forest/20 text-sm outline-none focus:border-gold"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 rounded-lg bg-gold hover:bg-gold-deep text-forest-deep font-semibold text-sm transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {mode === 'signin' ? 'Signing in…' : 'Creating account…'}
                </>
              ) : (
                <>
                  {mode === 'signin' ? 'Sign In to Account' : 'Create Customer Account'}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Track link */}
          <div className="mt-6 pt-5 border-t border-forest/10 text-center">
            <Link
              href="/track"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-gold-deep hover:underline"
            >
              <Package className="h-3.5 w-3.5" />
              Want to track without signing in? Click here &rarr;
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}

'use client'

import { useState, Suspense } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Container } from '@/components/shared/primitives'
import { registerCustomer } from '@/app/actions/customer'
import { Loader2, Lock, Mail, User as UserIcon, ArrowRight, Package } from 'lucide-react'

const ERROR_MESSAGES: Record<string, string> = {
  OAuthSignin: 'Could not connect to Google. Please try again.',
  OAuthCallback: 'Google sign-in was interrupted. Please try again.',
  OAuthCreateAccount: 'Could not create your account with Google. Please try again.',
  EmailCreateAccount: 'Could not create account with this email.',
  Callback: 'Sign in was cancelled or timed out. Please try again.',
  OAuthAccountNotLinked: 'This email is already associated with password login. Please sign in with your email and password.',
  AccessDenied: 'Google access was denied. If your Google Cloud app is in "Testing" mode, please click "Publish App" in Google Cloud Console or add your email to Test Users.',
  Configuration: 'Authentication configuration issue. Please contact support.',
}

function AccountLoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const errorParam = searchParams.get('error')

  const [mode, setMode] = useState<'signin' | 'register'>('signin')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [error, setError] = useState<string | null>(
    errorParam ? ERROR_MESSAGES[errorParam] || `Sign in failed: ${errorParam}` : null
  )
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

  const handleGoogleSignIn = async () => {
    setError(null)
    setIsGoogleLoading(true)
    try {
      await signIn('google', { callbackUrl: '/account' })
    } catch {
      setError('Could not start Google sign in.')
      setIsGoogleLoading(false)
    }
  }

  return (
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
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700 leading-relaxed">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-800">
          {success}
        </div>
      )}

      {/* 1-Click Google Sign In */}
      <button
        type="button"
        disabled={isGoogleLoading || isLoading}
        onClick={handleGoogleSignIn}
        className="w-full mb-5 py-2.5 px-4 rounded-lg border border-forest/20 bg-white hover:bg-cream/40 text-forest-deep text-xs font-semibold flex items-center justify-center gap-2.5 shadow-xs transition-colors disabled:opacity-60"
      >
        {isGoogleLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-forest-deep" />
            Connecting to Google…
          </>
        ) : (
          <>
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Continue with Google
          </>
        )}
      </button>

      <div className="relative flex items-center justify-center mb-5">
        <div className="border-t border-forest/15 w-full"></div>
        <span className="bg-white px-2.5 text-[10px] uppercase font-bold text-forest-deep/40 tracking-wider">
          or with email
        </span>
        <div className="border-t border-forest/15 w-full"></div>
      </div>

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
          disabled={isLoading || isGoogleLoading}
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
  )
}

export default function AccountLoginPage() {
  return (
    <div className="py-16 sm:py-24 bg-cream min-h-[75vh] flex items-center">
      <Container className="max-w-md w-full mx-auto">
        <Suspense fallback={<div className="p-8 text-center text-xs text-forest-deep/50">Loading sign in…</div>}>
          <AccountLoginForm />
        </Suspense>
      </Container>
    </div>
  )
}

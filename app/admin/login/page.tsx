'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { Lock, Loader2 } from 'lucide-react'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/admin'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    setIsLoading(false)

    if (result?.error) {
      // Deliberately vague: do not reveal whether the email or the password was wrong.
      setError('Incorrect email or password.')
      return
    }

    router.push(callbackUrl)
    router.refresh()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm space-y-5 rounded-xl border border-gray-200 bg-white p-8 shadow-sm"
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <span className="rounded-full bg-[#0F2E1E] p-3 text-[#C9A24B]">
          <Lock className="h-5 w-5" />
        </span>
        <h1 className="font-display text-2xl text-[#0F2E1E]">Golden Deer Admin</h1>
        <p className="text-sm text-gray-500">Sign in to manage orders</p>
      </div>

      {error && (
        <p
          role="alert"
          className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
        >
          {error}
        </p>
      )}

      <div className="space-y-3">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Email</span>
          <input
            required
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-[#C9A24B] focus:ring-1 focus:ring-[#C9A24B]"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Password</span>
          <input
            required
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-[#C9A24B] focus:ring-1 focus:ring-[#C9A24B]"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0F2E1E] px-4 py-2.5 font-medium text-[#E8C97A] transition-colors hover:bg-[#081A10] disabled:opacity-60"
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        {isLoading ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  )
}

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  )
}

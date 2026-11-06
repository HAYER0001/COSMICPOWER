'use client'

import { signOut } from 'next-auth/react'
import { LogOut } from 'lucide-react'

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/admin/login' })}
      className="flex items-center gap-2 rounded-md border border-[#C9A24B]/30 px-3 py-1.5 text-sm transition-colors hover:bg-white/10"
    >
      <LogOut className="h-4 w-4" />
      Sign out
    </button>
  )
}

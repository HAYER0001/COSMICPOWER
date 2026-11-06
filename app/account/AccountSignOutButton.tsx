'use client'

import { signOut } from 'next-auth/react'
import { LogOut } from 'lucide-react'

export default function AccountSignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/' })}
      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border border-forest/20 text-forest-deep hover:bg-forest/5 transition-colors"
      title="Sign out of your customer account"
    >
      <LogOut className="h-3.5 w-3.5" />
      Sign Out
    </button>
  )
}

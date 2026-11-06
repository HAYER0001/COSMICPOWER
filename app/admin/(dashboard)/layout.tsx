import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { authOptions, isAdmin } from '@/lib/auth'
import SignOutButton from './SignOutButton'
import CommandPalette from '@/components/admin/CommandPalette'
import KeyboardShortcutsHelp from '@/components/admin/KeyboardShortcutsHelp'
import { Download, ExternalLink } from 'lucide-react'

/**
 * Chrome + defence-in-depth guard for the dashboard.
 */
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!isAdmin(session)) {
    redirect('/admin/login')
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 text-gray-900 font-sans">
      <CommandPalette />
      <KeyboardShortcutsHelp />

      <header className="flex flex-wrap items-center justify-between gap-4 bg-[#0F2E1E] px-6 py-3.5 text-[#C9A24B] shadow-md border-b border-[#C9A24B]/20">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="font-serif text-xl font-bold tracking-wide text-white">
              Golden Deer
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-[#C9A24B]/20 border border-[#C9A24B]/30 text-[#E8C97A] font-mono uppercase font-semibold">
              Admin
            </span>
          </Link>
          <span className="hidden sm:inline text-xs text-[#E8C97A]/50">|</span>
          <p className="hidden sm:inline text-xs text-[#E8C97A]/70">
            {session?.user?.email}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href="/api/admin/export"
            download
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#C9A24B]/30 bg-[#0F2E1E] text-xs font-medium text-[#E8C97A] hover:bg-black/30 transition-colors shadow-sm"
            title="Download GST & Financial CSV Report"
          >
            <Download className="h-3.5 w-3.5" />
            GST Export
          </a>

          <a
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#C9A24B]/30 bg-[#0F2E1E] text-xs font-medium text-[#E8C97A] hover:bg-black/30 transition-colors shadow-sm"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Storefront
          </a>

          <SignOutButton />
        </div>
      </header>
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">{children}</main>
    </div>
  )
}

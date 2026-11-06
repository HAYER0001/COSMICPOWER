import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin — Golden Deer',
  robots: { index: false, follow: false },
}

/**
 * Bare shell for everything under /admin.
 *
 * Deliberately does NOT check the session: /admin/login lives under this path
 * and must stay reachable while signed out. Access control for the dashboard
 * lives in middleware.ts and in the (dashboard) layout.
 */
export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen bg-gray-100 text-gray-900">{children}</div>
}

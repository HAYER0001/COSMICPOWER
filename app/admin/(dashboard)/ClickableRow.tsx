'use client'

import { useRouter } from 'next/navigation'

/**
 * Table row that navigates on click.
 *
 * The actions cell contains buttons, so it stops propagation — otherwise
 * "Refund" would also navigate away mid-request. Keyboard users get the same
 * behaviour via Enter/Space on the focused row.
 */
export default function ClickableRow({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  const router = useRouter()

  return (
    <tr
      onClick={() => router.push(href)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          router.push(href)
        }
      }}
      tabIndex={0}
      role="link"
      className="cursor-pointer align-top transition-colors hover:bg-gray-50 focus:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#C9A24B]"
    >
      {children}
    </tr>
  )
}

/** Wrapper for the actions cell so its buttons do not trigger row navigation. */
export function StopPropagation({ children }: { children: React.ReactNode }) {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  )
}

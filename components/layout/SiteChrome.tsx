'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import SmoothScroll from '@/components/shared/SmoothScroll'
import PageTransition from '@/components/shared/PageTransition'
import ScrollProgress from '@/components/shared/ScrollProgress'
import CustomCursor from '@/components/layout/CustomCursor'
import QuickOrderFab from '@/components/shared/QuickOrderFab'
import CartDrawer from '@/components/layout/CartDrawer'

/**
 * Storefront chrome — header, footer, smooth scroll, cart drawer, custom cursor.
 *
 * /admin is an internal tool, not part of the shop: it must not inherit the
 * marketing header, the cart, the custom cursor or Lenis smooth scrolling,
 * which fight a dense data table. It renders bare.
 */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin') ?? false

  if (isAdmin) return <>{children}</>

  return (
    <>
      <ScrollProgress />
      <CustomCursor />
      <SmoothScroll>
        <Header />
        <main className="flex-1 pt-16">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </SmoothScroll>
      <QuickOrderFab />
      <CartDrawer />
    </>
  )
}

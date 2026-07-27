'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useState, useEffect, type ReactNode, useRef } from 'react'

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [useDirect, setUseDirect] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const vtUsed = sessionStorage.getItem('vt-product-slug')
    const hasVT = 'startViewTransition' in document
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    clearTimeout(timerRef.current)

    if (vtUsed && hasVT && !rm) {
      sessionStorage.removeItem('vt-product-slug')
      timerRef.current = setTimeout(() => {
        setUseDirect(true)
        requestAnimationFrame(() => {
          timerRef.current = setTimeout(() => setUseDirect(false), 80)
        })
      }, 0)
    } else {
      timerRef.current = setTimeout(() => setUseDirect(false), 0)
    }
  }, [pathname])

  if (useDirect) {
    return <>{children}</>
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

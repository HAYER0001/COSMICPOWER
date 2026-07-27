'use client'

import { useState, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, MessageCircle, Zap, X } from 'lucide-react'
import { site } from '@/content/site'

interface Action {
  label: string
  url: string
  icon: typeof ShoppingBag
  color: string
}

export default function QuickOrderFab() {
  const pathname = usePathname()
  const isBrowser = typeof window !== 'undefined'
  const [isOpen, setIsOpen] = useState(false)

  const isProductDetail = pathname?.startsWith('/products/') && pathname !== '/products'
  const isVisible = isBrowser && !isProductDetail && (pathname === '/' || pathname === '/products')

  const close = useCallback(() => setIsOpen(false), [])

  const actions: Action[] = [
    ...(site.commerce.blinkit !== 'ADD_URL'
      ? [{ label: 'Blinkit', url: site.commerce.blinkit, icon: Zap, color: 'bg-amber-600' }]
      : []),
    ...(site.commerce.zepto !== 'ADD_URL'
      ? [{ label: 'Zepto', url: site.commerce.zepto, icon: ShoppingBag, color: 'bg-purple-600' }]
      : []),
    {
      label: 'WhatsApp',
      url: `https://wa.me/${site.contact.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent('Hi, I\'d like to order Golden Deer makhana.')}`,
      icon: MessageCircle,
      color: 'bg-emerald-600',
    },
  ]

  if (!isVisible || actions.length === 0) return null

  return (
    <div className="fixed bottom-6 right-5 z-50 lg:hidden" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
      {/* Scrim */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/30"
            onClick={close}
            aria-hidden
          />
        )}
      </AnimatePresence>

      {/* Action buttons — fan outward */}
      <AnimatePresence>
        {isOpen && actions.map((action, i) => {
          const angle = -90 + (i / (actions.length - 1 || 1)) * 180
          const rad = (angle * Math.PI) / 180
          const r = 76
          const x = Math.cos(rad) * r
          const y = Math.sin(rad) * r

          return (
            <motion.a
              key={action.label}
              href={action.url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
              animate={{ opacity: 1, x, y, scale: 1 }}
              exit={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
              transition={{ delay: i * 0.04, type: 'spring', stiffness: 400, damping: 22 }}
              className={`absolute bottom-0 right-0 flex items-center gap-2 pl-3 pr-4 py-2.5 rounded-full shadow-lg text-white text-xs font-medium ${action.color} hover:brightness-110 active:scale-95 transition-all`}
              style={{ zIndex: 60 }}
              aria-label={`Order via ${action.label}`}
            >
              <action.icon className="w-4 h-4 shrink-0" />
              <span className="whitespace-nowrap">{action.label}</span>
            </motion.a>
          )
        })}
      </AnimatePresence>

      {/* Main toggle button */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="relative z-50 flex items-center justify-center w-14 h-14 rounded-full bg-gold text-forest-deep shadow-[0_4px_16px_rgba(201,162,75,0.35)] hover:bg-gold-light active:scale-90 transition-all"
        aria-label={isOpen ? 'Close quick order' : 'Quick order'}
        aria-expanded={isOpen}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-6 h-6" />
            </motion.span>
          ) : (
            <motion.span
              key="cart"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <ShoppingBag className="w-6 h-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  )
}

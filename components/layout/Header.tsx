'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/shared/primitives'

const navLinks = [
  { label: 'Products', href: '/products' },
  { label: 'Recipes', href: '/recipes' },
  { label: 'Bulk & Wholesale', href: '/bulk' },
  { label: 'Our Story', href: '/our-story' },
  { label: 'Journal', href: '/journal' },
  { label: 'Contact', href: '/contact' },
]

const stagger = 0.05

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="glass px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
          <Link href="/" className="relative z-10 flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="Golden Deer"
              width={36}
              height={36}
              className="h-9 w-auto"
              priority
              onError={(e) => {
                const el = e.currentTarget
                el.style.display = 'none'
                el.nextElementSibling?.classList.remove('hidden')
              }}
            />
            <span
              className="hidden text-lg font-semibold tracking-wide text-forest-deep sm:inline font-display"
            >
              Golden Deer
            </span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <NavItem key={link.href} href={link.href}>
                {link.label}
              </NavItem>
            ))}
          </div>

          <div className="hidden lg:block">
            <Button variant="gold-solid" href="/products">
              Order Now
            </Button>
          </div>

          <button
            className="relative z-10 lg:hidden p-2 text-forest-deep"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-16 z-40 bg-cream/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col items-center justify-center gap-6 pt-12">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * stagger }}
                  onClick={() => setOpen(false)}
                  className="text-2xl font-display text-forest-deep/80 transition-colors hover:text-gold"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: navLinks.length * stagger }}
                className="mt-4"
              >
                <Button variant="gold-solid" href="/products">
                  Order Now
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function NavItem({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="relative px-3 py-2 text-sm font-medium text-forest-deep/70 transition-colors hover:text-forest-deep"
    >
      {children}
      <motion.span
        className="absolute bottom-0 left-3 right-3 h-[2px] bg-gold"
        layoutId="nav-underline"
        style={{ display: 'none' }}
      />
    </Link>
  )
}

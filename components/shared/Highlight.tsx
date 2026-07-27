'use client'

import { useRef, useEffect, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Highlight({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inited = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (inited.current) return
    const el = ref.current
    if (!el) return

    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (rm) {
      el.style.backgroundSize = '100% 100%'
      inited.current = true
      return
    }

    inited.current = true

    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { backgroundSize: '0% 100%' },
        {
          backgroundSize: '100% 100%',
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <span
      ref={ref}
      className="inline-block bg-gradient-to-r from-gold/30 via-gold/20 to-gold/30 bg-no-repeat rounded-sm leading-[1.4]"
      style={{
        backgroundSize: '0% 100%',
        backgroundPosition: '0 50%',
        padding: '0.05em 0.1em',
      }}
    >
      {children}
    </span>
  )
}

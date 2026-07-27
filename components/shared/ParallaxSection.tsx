'use client'

import { useEffect, useRef, type ReactNode } from 'react'

interface ParallaxSectionProps {
  children: ReactNode
  className?: string
  disabled?: boolean
}

export default function ParallaxSection({
  children,
  className = '',
  disabled = false,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (disabled) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(max-width: 767px)').matches) return

    const el = ref.current
    if (!el) return

    let killed = false

    const loadGsap = async () => {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (killed) return

      const mediaEls = el.querySelectorAll<HTMLElement>('[data-parallax-media]')
      const textEls = el.querySelectorAll<HTMLElement>('[data-parallax-text]')

      if (mediaEls.length) {
        gsap.to(mediaEls, {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        })
      }

      if (textEls.length) {
        gsap.to(textEls, {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        })
      }
    }

    loadGsap()

    return () => {
      killed = true
    }
  }, [disabled])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

'use client'

import { useEffect, useRef, type ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  stagger?: number
  y?: number
  duration?: number
}

export default function ScrollReveal({
  children,
  stagger = 0.1,
  y = 40,
  duration = 0.7,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inited = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (inited.current) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const el = ref.current
    if (!el) return

    inited.current = true

    const loadGsap = async () => {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const targets = el.querySelectorAll<HTMLElement>('[data-reveal]')
      if (targets.length) {
        gsap.set(targets, { opacity: 0, y })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true,
          },
        })

        tl.to(targets, {
          opacity: 1,
          y: 0,
          stagger,
          duration,
          ease: 'power3.out',
        })
      }

      const splitHeadings = el.querySelectorAll<HTMLElement>('[data-split-heading]')
      splitHeadings.forEach((heading) => {
        const text = heading.textContent || ''
        const words = text.split(/\s+/)
        heading.innerHTML = ''

        words.forEach((word, i) => {
          const span = document.createElement('span')
          span.textContent = word
          span.className = 'inline-block'
          span.style.opacity = '0'
          span.style.transform = 'translateY(0.5em)'
          heading.appendChild(span)
          if (i < words.length - 1) {
            heading.appendChild(document.createTextNode('\u00A0'))
          }
        })

        const spans = heading.querySelectorAll<HTMLSpanElement>('span')
        if (spans.length) {
          gsap.to(spans, {
            opacity: 1,
            y: 0,
            stagger: 0.04,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: heading,
              start: 'top 90%',
              once: true,
            },
          })
        }
      })
    }

    loadGsap()

    return () => {
      ;(async () => {
        ;(await import('gsap/ScrollTrigger')).ScrollTrigger.getAll().forEach(t => t.kill())
      })()
    }
  }, [stagger, y, duration])

  return <div ref={ref}>{children}</div>
}

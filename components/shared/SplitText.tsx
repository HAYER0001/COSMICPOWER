'use client'

import { useRef, useEffect, type ReactNode } from 'react'

interface SplitTextProps {
  children: ReactNode
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span'
  className?: string
  delay?: number
  stagger?: number
}

export default function SplitText({
  children,
  as: Tag = 'h2',
  className = '',
  delay = 0,
  stagger = 0.04,
}: SplitTextProps) {
  const Container = Tag
  const ref = useRef<HTMLElement>(null)
  const inited = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (inited.current) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const el = ref.current
    if (!el) return

    inited.current = true

    const text = el.textContent || ''
    const words = text.split(/\s+/)

    el.innerHTML = ''
    el.style.opacity = '1'

    words.forEach((word, i) => {
      const span = document.createElement('span')
      span.textContent = word
      span.className = 'inline-block'
      span.style.opacity = '0'
      span.style.transform = 'translateY(0.5em)'
      el.appendChild(span)
      if (i < words.length - 1) {
        el.appendChild(document.createTextNode('\u00A0'))
      }
    })

    const spans = el.querySelectorAll<HTMLSpanElement>('span')

    const loadGsap = async () => {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      gsap.to(spans, {
        opacity: 1,
        y: 0,
        stagger,
        delay,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          once: true,
        },
      })
    }

    loadGsap()
  }, [delay, stagger])

  return (
    <Container ref={ref as React.Ref<HTMLElement & HTMLHeadingElement>} className={className} style={{ opacity: 0 }}>
      {children}
    </Container>
  )
}

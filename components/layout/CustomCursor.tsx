'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const isDesktop = window.matchMedia('(pointer: fine)').matches
    if (!isDesktop) return

    const el = cursorRef.current
    if (!el) return

    let rafId: number
    let mx = 0
    let my = 0

    function onMove(e: PointerEvent) {
      mx = e.clientX
      my = e.clientY
    }

    function tick() {
      el!.style.transform = `translate(${mx - 12}px, ${my - 12}px)`
      rafId = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed z-[9999] h-6 w-6 rounded-full border border-gold/40 bg-gold/10 mix-blend-difference transition-opacity"
      style={{ willChange: 'transform' }}
      aria-hidden
    />
  )
}

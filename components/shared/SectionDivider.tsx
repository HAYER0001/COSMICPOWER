'use client'

import { useEffect, useRef } from 'react'

interface SectionDividerProps {
  disabled?: boolean
  className?: string
  variant?: 'wave' | 'crest'
}

export default function SectionDivider({
  disabled = false,
  className = '',
  variant = 'wave',
}: SectionDividerProps) {
  const waveRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const el = waveRef.current
    if (!el) return

    let gsapRef: typeof import('gsap')['default'] | null = null
    let ticker: (() => void) | null = null
    let time = 0

    import('gsap').then((mod) => {
      gsapRef = mod.default
      ticker = () => {
        time += 0.008
        const drift = Math.sin(time) * 2
        el.style.setProperty('--drift-x', `${drift}px`)
      }
      gsapRef.ticker.add(ticker)
    })

    return () => {
      if (gsapRef && ticker) gsapRef.ticker.remove(ticker)
    }
  }, [])

  if (disabled) return null

  return (
    <div
      ref={waveRef}
      className={`relative h-16 sm:h-20 overflow-hidden bg-forest-light/5 ${className}`}
      style={{ '--drift-x': '0px' } as React.CSSProperties}
    >
      {variant === 'crest' ? (
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
          style={{ transform: 'translateX(var(--drift-x))' }}
        >
          <path
            d="M0 40 C180 55 360 25 540 40 C720 55 900 25 1080 40 C1260 55 1440 25 1440 40 V80 H0 Z"
            fill="oklch(20% 0.03 170 / 0.025)"
          />
          <path
            d="M0 40 C180 55 360 25 540 40 C720 55 900 25 1080 40 C1260 55 1440 25 1440 40"
            fill="none"
            stroke="oklch(55% 0.08 100 / 0.08)"
            strokeWidth="1"
          />
          <circle
            cx="720"
            cy="40"
            r="2"
            fill="oklch(62% 0.12 95 / 0.15)"
          />
        </svg>
      ) : (
        <svg
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full opacity-30"
          style={{ transform: 'translateX(var(--drift-x))' }}
        >
          <path
            d="M0 30 C200 55 400 5 600 30 C800 55 1000 5 1200 30 C1400 55 1440 40 1440 40 V60 H0 Z"
            fill="oklch(20% 0.03 170 / 0.03)"
          />
          <path
            d="M0 30 C200 55 400 5 600 30 C800 55 1000 5 1200 30 C1400 55 1440 40"
            fill="none"
            stroke="oklch(55% 0.08 100 / 0.06)"
            strokeWidth="0.5"
          />
        </svg>
      )}
    </div>
  )
}

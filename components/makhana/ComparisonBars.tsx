'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface BarItem {
  label: string
  makhanaVal: number
  compVal: number
  compLabel: string
  makhanaDisplay: string
  compDisplay: string
  unit?: string
}

interface ComparisonBarsProps {
  items: BarItem[]
  className?: string
}

export default function ComparisonBars({ items, className = '' }: ComparisonBarsProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const barsRef = useRef<(HTMLDivElement | null)[]>([])
  const countersRef = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (rm) return

    const ctx = gsap.context(() => {
      const maxVal = Math.max(...items.flatMap((i) => [i.makhanaVal, i.compVal]))

      items.forEach((item, i) => {
        const bar = barsRef.current[i * 2]
        const compBar = barsRef.current[i * 2 + 1]
        const counter = countersRef.current[i]
        if (!bar || !compBar) return

        const mPct = (item.makhanaVal / maxVal) * 100
        const cPct = (item.compVal / maxVal) * 100

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 85%',
          onEnter: () => {
            gsap.to(bar, { width: `${mPct}%`, duration: 0.8, ease: 'power2.out' })
            gsap.to(compBar, { width: `${cPct}%`, duration: 0.8, ease: 'power2.out', delay: 0.1 })
            if (counter) {
              gsap.to(counter, {
                textContent: item.makhanaVal,
                duration: 0.8,
                ease: 'power2.out',
                snap: { textContent: 1 },
              })
            }
          },
          once: true,
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [items])

  if (!items.length) return null

  return (
    <div ref={sectionRef} className={`space-y-6 ${className}`}>
      {items.map((item, i) => (
          <div key={item.label}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-mono uppercase tracking-wider text-forest-deep/60">
                {item.label}
              </span>
              <div className="flex items-center gap-3 text-xs">
                <span ref={(el) => { countersRef.current[i] = el }}>
                  {item.makhanaDisplay}
                </span>
                <span className="font-mono tabular-nums text-forest-deep/40">
                  {item.compDisplay}
                </span>
              </div>
            </div>
            <div className="flex gap-1 h-5">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 w-full rounded-r bg-gold/10" />
                <div
                  ref={(el) => { barsRef.current[i * 2] = el }}
                  className="absolute inset-y-0 left-0 rounded-r bg-gold"
                  style={{ width: 0 }}
                />
              </div>
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 w-full rounded-r bg-cream-dark/60" />
                <div
                  ref={(el) => { barsRef.current[i * 2 + 1] = el }}
                  className="absolute inset-y-0 left-0 rounded-r bg-cream-dark"
                  style={{ width: 0 }}
                />
              </div>
            </div>
            <div className="flex justify-between text-[10px] text-forest-deep/40 font-mono">
              <span>Makhana</span>
              <span>{item.compLabel}</span>
            </div>
          </div>
      ))}
      <p className="text-[10px] text-forest-deep/30 italic mt-3">
        Approximate values. Bars scaled to maximum value for each comparison group.
      </p>
    </div>
  )
}

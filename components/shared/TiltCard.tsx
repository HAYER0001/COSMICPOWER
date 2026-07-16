'use client'

import { useRef, useCallback, useState, type ReactNode } from 'react'

interface TiltCardProps {
  children: ReactNode
  className?: string
  maxTilt?: number
}

export default function TiltCard({
  children,
  className = '',
  maxTilt = 6,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [sheenVisible, setSheenVisible] = useState(false)

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      if (typeof window === 'undefined') return
      const isDesktop = window.matchMedia('(pointer: fine)').matches
      if (!isDesktop) return

      const el = cardRef.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5

      el.style.transform = `perspective(800px) rotateY(${x * maxTilt}deg) rotateX(${-y * maxTilt}deg)`
      el.style.setProperty('--sheen-x', `${(x + 0.5) * 100}%`)
      el.style.setProperty('--sheen-y', `${(-y + 0.5) * 100}%`)
      setSheenVisible(true)
    },
    [maxTilt],
  )

  const onLeave = useCallback(() => {
    const el = cardRef.current
    if (!el) return
    el.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg)'
    setSheenVisible(false)
  }, [])

  return (
    <div
      ref={cardRef}
      className={`relative will-change-transform transition-transform duration-200 ease-out overflow-hidden ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          background:
            'radial-gradient(circle at var(--sheen-x, 50%) var(--sheen-y, 50%), rgba(255,255,255,0.12) 0%, transparent 60%)',
          opacity: sheenVisible ? 1 : 0,
        }}
        aria-hidden
      />
    </div>
  )
}

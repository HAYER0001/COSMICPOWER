'use client'

import { useRef, useCallback, type ReactNode } from 'react'

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
    },
    [maxTilt]
  )

  const onLeave = useCallback(() => {
    const el = cardRef.current
    if (!el) return
    el.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg)'
  }, [])

  return (
    <div
      ref={cardRef}
      className={`will-change-transform transition-transform duration-200 ease-out ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  )
}

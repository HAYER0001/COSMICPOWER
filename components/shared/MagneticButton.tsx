'use client'

import { useRef, useCallback, type ReactNode } from 'react'

interface MagneticButtonProps {
  children: ReactNode
  as?: 'a' | 'button'
  href?: string
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
}

export default function MagneticButton({
  children,
  as: Tag = 'a',
  href,
  className = '',
  onClick,
  type = 'button',
  disabled = false,
}: MagneticButtonProps) {
  const innerRef = useRef<HTMLSpanElement>(null)

  const onMove = useCallback((e: React.MouseEvent) => {
    if (typeof window === 'undefined') return
    const isDesktop = window.matchMedia('(pointer: fine)').matches
    if (!isDesktop) return

    const el = innerRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    const maxDist = 8
    const dist = Math.sqrt(x * x + y * y)
    const clamp = Math.min(dist, maxDist) / Math.max(dist, 1)

    el.style.transform = `translate(${x * clamp}px, ${y * clamp}px)`
  }, [])

  const onLeave = useCallback(() => {
    const el = innerRef.current
    if (!el) return
    el.style.transform = 'translate(0, 0)'
  }, [])

  const child = (
    <span
      ref={innerRef}
      className="inline-block transition-transform duration-200 ease-out will-change-transform"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </span>
  )

  if (Tag === 'a') {
    return (
      <a href={href} className={className} onClick={onClick}>
        {child}
      </a>
    )
  }

  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {child}
    </button>
  )
}

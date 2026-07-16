'use client'

import { type ReactNode, useEffect, useRef, useState } from 'react'

export function Container({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  )
}

interface ButtonProps {
  variant?: 'gold-solid' | 'gold-outline' | 'ghost'
  children: ReactNode
  className?: string
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
}

export function Button({
  variant = 'gold-solid',
  children,
  className = '',
  href,
  onClick,
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium tracking-wide transition-all duration-200 active:translate-y-px disabled:opacity-50 disabled:pointer-events-none'

  const variants: Record<string, string> = {
    'gold-solid':
      'bg-gold text-forest-deep shadow-[0_4px_6px_-1px_rgba(0,0,0,0.08),0_2px_4px_-2px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.25)] hover:bg-gold-light hover:shadow-[0_6px_10px_-2px_rgba(0,0,0,0.1),0_3px_6px_-2px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.35)] active:shadow-[0_1px_2px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.25)]',
    'gold-outline':
      'border border-gold text-gold shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] hover:bg-gold hover:text-forest-deep hover:shadow-gold-glow-sm active:shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]',
    ghost:
      'text-forest-deep/70 hover:text-forest-deep hover:bg-forest-deep/5',
  }

  const cls = `${base} ${variants[variant]} ${className}`

  if (href && !disabled) {
    return (
      <a href={href} className={cls} onClick={onClick}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={cls} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  lede?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = 'left',
  className = '',
}: SectionHeadingProps) {
  return (
    <div
      className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''} ${className}`}
    >
      {eyebrow && (
        <span className="inline-block text-xs font-semibold tracking-[0.15em] uppercase text-gold mb-3">
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-display text-3xl sm:text-4xl lg:text-5xl leading-tight text-forest-deep ${align === 'center' ? 'mx-auto' : ''}`}
        data-split-heading
      >
        {title}
      </h2>
      {lede && (
        <p className={`mt-4 text-base sm:text-lg text-forest-deep/60 leading-relaxed max-w-2xl ${align === 'center' ? 'mx-auto' : ''}`}>
          {lede}
        </p>
      )}
    </div>
  )
}

interface TagProps {
  children: ReactNode
  className?: string
  variant?: 'gold' | 'forest' | 'cream'
}

export function Tag({
  children,
  className = '',
  variant = 'gold',
}: TagProps) {
  const variants: Record<string, string> = {
    gold: 'bg-gold/15 text-gold-deep border-gold/20',
    forest: 'bg-cream-dark text-forest-deep/70 border-forest-light',
    cream: 'bg-cream/10 text-forest-deep border-forest/20',
  }

  return (
    <span
      className={`inline-block px-3 py-1 text-xs font-medium tracking-wide rounded-full border ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}

interface AnimatedCounterProps {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
}

export function AnimatedCounter({
  end,
  duration = 2000,
  suffix = '',
  prefix = '',
  className = '',
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (started.current) return

    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return
        started.current = true
        observer.disconnect()

        const startTime = performance.now()

        function tick(now: number) {
          const elapsed = now - startTime
          const progress = Math.min(elapsed / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setCount(Math.floor(eased * end))
          if (progress < 1) requestAnimationFrame(tick)
        }

        requestAnimationFrame(tick)
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [end, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  )
}

export function Divider({ className = '' }: { className?: string }) {
  return (
    <hr
      className={`border-t border-gold/15 w-full ${className}`}
      role="separator"
    />
  )
}

'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

type Aspect = '16/9' | '4/5' | '4/3' | '1/1'

const ASPECT_RATIOS: Record<Aspect, string> = {
  '16/9': '16 / 9',
  '4/5': '4 / 5',
  '4/3': '4 / 3',
  '1/1': '1 / 1',
}

const MAX_CONCURRENT = 3
let activeCount = 0
const pending: Array<() => void> = []

function acquireSlot(): Promise<void> {
  if (activeCount < MAX_CONCURRENT) {
    activeCount++
    return Promise.resolve()
  }
  return new Promise((resolve) => {
    pending.push(resolve)
  })
}

function releaseSlot() {
  activeCount = Math.max(0, activeCount - 1)
  const next = pending.shift()
  if (next) {
    activeCount++
    next()
  }
}

interface MotionLoopProps {
  src: string
  poster: string
  className?: string
  aspect?: Aspect
  priority?: boolean
  alt: string
}

interface NetworkInfo {
  saveData?: boolean
}

export default function MotionLoop({
  src,
  poster,
  className = '',
  aspect = '16/9',
  priority = false,
  alt,
}: MotionLoopProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [videoError, setVideoError] = useState(false)
  const slotAcquired = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const conn = (navigator as Navigator & { connection?: NetworkInfo }).connection
    const saveData = conn?.saveData === true

    if (prefersReduced || saveData) return

    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      async ([entry]) => {
        const vid = videoRef.current
        if (!vid) return

        if (entry.isIntersecting) {
          if (!slotAcquired.current) {
            await acquireSlot()
            slotAcquired.current = true
          }
          vid.play().catch(() => {})
        } else {
          vid.pause()
        }
      },
      { threshold: 0.4 }
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      if (slotAcquired.current) {
        slotAcquired.current = false
        releaseSlot()
      }
    }
  }, [])

  const handleError = useCallback(() => {
    setVideoError(true)
  }, [])

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio: ASPECT_RATIOS[aspect] }}
      role="img"
      aria-label={alt}
    >
      <Image
        src={poster}
        alt=""
        aria-hidden
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
        priority={priority}
      />

      {!videoError && (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          autoPlay
          loop
          playsInline
          aria-hidden
          preload={priority ? 'metadata' : 'none'}
          onError={handleError}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {videoError && (
        <div className="absolute inset-0 bg-gradient-to-br from-cream-dark to-cream flex items-center justify-center">
          {process.env.NODE_ENV === 'development' && (
            <span className="text-gold text-xs font-mono px-2 py-1 bg-cream-dark/80 rounded">
              {src}
            </span>
          )}
        </div>
      )}
    </div>
  )
}

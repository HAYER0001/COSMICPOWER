'use client'

import { useRef, useState, useEffect, Component, type ReactNode } from 'react'
import { Canvas } from '@react-three/fiber'
import dynamic from 'next/dynamic'

// ---- WebGL Error Boundary ----
interface GLErrorBoundaryProps {
  children: ReactNode
  onWebGLError: () => void
}

interface GLErrorBoundaryState {
  hasError: boolean
}

class GLErrorBoundary extends Component<GLErrorBoundaryProps, GLErrorBoundaryState> {
  constructor(props: GLErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch() {
    this.props.onWebGLError()
  }

  render() {
    if (this.state.hasError) return null
    return this.props.children
  }
}

// ---- Dynamic import helper ----
export function dynamicScene(
  importFn: () => Promise<{ default: React.ComponentType<unknown> }>,
  options?: Record<string, unknown>
) {
  return dynamic(importFn, { ssr: false, ...options })
}

// ---- Scene3D Gate ----
export interface Scene3DProps {
  children: ReactNode
  scene?: ReactNode
  className?: string
  canvasClassName?: string
}

interface NavigatorWithConnection extends Navigator {
  connection?: { saveData?: boolean }
}

export default function Scene3D({
  children,
  scene,
  className = '',
  canvasClassName = '',
}: Scene3DProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [permit, setPermit] = useState(false)
  const [inView, setInView] = useState(false)
  const [webglFailed, setWebglFailed] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    const finePointer = window.matchMedia('(pointer: fine)').matches
    const conn = (navigator as NavigatorWithConnection).connection
    const saveData = conn?.saveData === true

    if (reducedMotion || !finePointer || saveData) return

    const el = wrapperRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting && entry.intersectionRatio >= 0.3)
      },
      { threshold: [0, 0.3] }
    )

    observer.observe(el)
    setPermit(true)

    return () => observer.disconnect()
  }, [])

  const showCanvas = permit && inView && !webglFailed && !!scene

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      {children}
      {showCanvas && (
        <GLErrorBoundary onWebGLError={() => setWebglFailed(true)}>
          <Canvas
            dpr={[1, 1.75]}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: 'high-performance',
            }}
            className={`absolute inset-0 pointer-events-none ${canvasClassName}`}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          >
            {scene}
          </Canvas>
        </GLErrorBoundary>
      )}
    </div>
  )
}

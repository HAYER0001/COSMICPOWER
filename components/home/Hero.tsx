'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/shared/primitives'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'

function Hero3DObject() {
  const meshRef = useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    meshRef.current.rotation.x = Math.sin(t / 4) / 4
    meshRef.current.rotation.y = t / 2
    meshRef.current.position.y = Math.sin(t / 1.5) / 10
  })

  return (
    <Float floatIntensity={2} speed={2}>
      <mesh ref={meshRef} scale={1.2}>
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.5}
          chromaticAberration={0.05}
          anisotropy={0.1}
          distortion={0.2}
          distortionScale={0.5}
          temporalDistortion={0.1}
          iridescence={1}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1400]}
          color="#ffdbbb"
          metalness={0.1}
          roughness={0.1}
        />
      </mesh>
    </Float>
  )
}

interface NetworkInfo {
  saveData?: boolean
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const [videoError, setVideoError] = useState(false)
  const inited = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined' || inited.current) return
    inited.current = true

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    const conn = (navigator as Navigator & { connection?: NetworkInfo }).connection
    const saveData = conn?.saveData === true
    const videoDisabled = prefersReduced || saveData

    const el = containerRef.current
    const vid = videoRef.current
    if (!el || !vid) return

    if (!videoDisabled) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            vid.play().catch(() => {})
          } else {
            vid.pause()
          }
        },
        { threshold: 0.4 }
      )
      observer.observe(el)
      ;(async () => {
        const gsap = (await import('gsap')).default
        const { ScrollTrigger } = await import('gsap/ScrollTrigger')
        gsap.registerPlugin(ScrollTrigger)

        const overlay = overlayRef.current
        if (!overlay) return
        const children = overlay.querySelectorAll('[data-animate]')
        if (!children.length) return

        gsap.set(children, { opacity: 0, y: 32 })
        gsap.to(children, {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.5,
        })

        const bg = bgRef.current
        if (bg) {
          gsap.to(bg, {
            scale: 1.08,
            ease: 'none',
            scrollTrigger: {
              trigger: bg,
              start: 'top top',
              end: 'bottom top',
              scrub: 1.5,
            },
          })
        }
      })()

      return () => {
        observer.disconnect()
      }
    }
  }, [])

  const handleVideoError = useCallback(() => setVideoError(true), [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden bg-cream"
    >
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        <Image
          src="/videos/hero-poster.jpg"
          alt=""
          aria-hidden
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />

        {!videoError && (
          <video
            ref={videoRef}
            muted
            autoPlay
            loop
            playsInline
            preload="metadata"
            aria-hidden
            onError={handleVideoError}
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
        )}

        {videoError && (
          <div className="absolute inset-0 bg-gradient-to-br from-cream-dark to-cream flex items-center justify-center">
            {process.env.NODE_ENV === 'development' && (
              <span className="text-gold text-xs font-mono px-2 py-1 bg-forest/80 rounded">
                /videos/hero.mp4
              </span>
            )}
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-forest-deep/20 to-transparent mix-blend-multiply" />
        <div className="absolute inset-0 bg-grain opacity-50" />
      </div>

      <div
        ref={overlayRef}
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
      >
        <p
          data-animate
          className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-gold/80 mb-4 sm:mb-6"
        >
          Cosmic Power Pvt. Ltd. presents
        </p>

        <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-50 mix-blend-screen">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ alpha: true }}>
            <ambientLight intensity={1} />
            <directionalLight position={[10, 10, 10]} intensity={2} color="#ffdbbb" />
            <directionalLight position={[-10, -10, -10]} intensity={0.5} color="#c9a25e" />
            <Hero3DObject />
          </Canvas>
        </div>

        <h1
          data-animate
          className="relative z-10 font-display text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold leading-none mb-4 sm:mb-6"
        >
          <span className="text-gold-gradient">Golden Deer</span>
        </h1>

        <p
          data-animate
          className="text-base sm:text-lg lg:text-xl text-cream/90 max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-8"
        >
          Premium roasted makhana — the ancient superfood, elevated.
        </p>

        <div
          data-animate
          className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 text-xs sm:text-sm text-cream/70 mb-8 sm:mb-10"
        >
          <span>100% Natural</span>
          <span className="text-gold/30">&bull;</span>
          <span>High Protein</span>
          <span className="text-gold/30">&bull;</span>
          <span>Gluten Free</span>
          <span className="text-gold/30">&bull;</span>
          <span>Nitrogen-Flushed Freshness</span>
        </div>

        <div
          data-animate
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button variant="gold-solid" href="/products">
            Shop the Range
          </Button>
          <Button variant="gold-outline" href="/bulk">
            Bulk &amp; Wholesale
          </Button>
        </div>

        <div data-animate className="mt-16 sm:mt-20">
          <ChevronDown
            size={20}
            className="mx-auto text-gold/40 animate-bounce"
          />
        </div>
      </div>
    </section>
  )
}

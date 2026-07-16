'use client'

import { useRef, useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import { useFrame } from '@react-three/fiber'
import { OrthographicCamera } from '@react-three/drei'
import * as THREE from 'three'
import Scene3D from './Scene3D'
import { Container, SectionHeading } from '@/components/shared/primitives'

// ---- helpers ----

async function sampleLogoImage(dpr: number) {
  const img = document.createElement('img')
  img.src = '/images/logo.png'
  await img.decode()

  const baseSize = Math.floor(160 / Math.sqrt(dpr))
  const scale = baseSize / img.naturalWidth
  const w = baseSize
  const h = Math.floor(img.naturalHeight * scale)

  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')!
  ctx.drawImage(img, 0, 0, w, h)
  const data = ctx.getImageData(0, 0, w, h).data

  const cx = w / 2
  const cy = h / 2
  const maxDim = Math.max(w, h)
  const positions: number[] = []

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const alpha = data[(y * w + x) * 4 + 3]
      if (alpha > 128) {
        positions.push(
          ((x - cx) / maxDim) * 2.5,
          (-(y - cy) / maxDim) * 2.5,
          (Math.random() - 0.5) * 0.5
        )
      }
    }
  }
  return new Float32Array(positions)
}

function generateScatter(count: number, spread: number): Float32Array {
  const arr = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    const r = spread * Math.cbrt(Math.random())
    arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    arr[i * 3 + 2] = r * Math.cos(phi)
  }
  return arr
}

function generateDisperse(
  target: Float32Array,
  count: number,
  spread: number
): Float32Array {
  const arr = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    const r = spread * (0.3 + Math.random() * 0.7)
    arr[i * 3] = target[i * 3] + r * Math.sin(phi) * Math.cos(theta)
    arr[i * 3 + 1] = target[i * 3 + 1] + r * Math.sin(phi) * Math.sin(theta)
    arr[i * 3 + 2] = target[i * 3 + 2] + r * Math.cos(phi)
  }
  return arr
}

// ---- R3F Scene ----

function DeerParticles({
  target,
  scatter,
  disperse,
  count,
}: {
  target: Float32Array
  scatter: Float32Array
  disperse: Float32Array
  count: number
}) {
  const progress = useRef({ value: 0 })
  const geoRef = useRef<THREE.BufferGeometry>(null)
  const posRef = useRef(new Float32Array(scatter))

  const phases = useMemo(() => {
    const arr = new Float32Array(count)
    // eslint-disable-next-line react-hooks/purity
    for (let i = 0; i < count; i++) arr[i] = Math.random() * Math.PI * 2
    return arr
  }, [count])

  const gold = useMemo(() => new THREE.Color('#E8C97A'), [])

  const texture = useMemo(() => {
    const c = document.createElement('canvas')
    c.width = 64
    c.height = 64
    const ctx = c.getContext('2d')!
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
    g.addColorStop(0, 'rgba(255,255,255,1)')
    g.addColorStop(0.15, 'rgba(255,255,255,0.95)')
    g.addColorStop(0.5, 'rgba(255,255,255,0.5)')
    g.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, 64, 64)
    return new THREE.CanvasTexture(c)
  }, [])

  const colorAttr = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = gold.r
      arr[i * 3 + 1] = gold.g
      arr[i * 3 + 2] = gold.b
    }
    return arr
  }, [count, gold])

  useEffect(() => {
    if (typeof window === 'undefined') return
    let kill = false
    const init = async () => {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      if (kill) return
      const el = document.getElementById('particle-deer-section')
      if (!el) return
      gsap.to(progress.current, {
        value: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      })
    }
    init()
    return () => {
      kill = true
    }
  }, [])

  useFrame((state) => {
    const p = progress.current.value
    const geo = geoRef.current
    const pos = posRef.current
    if (!geo) return

    let morph: number
    let shimmer: number
    let breathing: number

    if (p < 0.35) {
      const t = p / 0.35
      morph = t * t * (3 - 2 * t)
      shimmer = 0
      breathing = 0
    } else if (p < 0.7) {
      morph = 1
      shimmer = (p - 0.35) / 0.35
      breathing = (p - 0.35) / 0.35
    } else {
      const d = (p - 0.7) / 0.3
      const disp = d < 0.5 ? 2 * d * d : 1 - (-2 * d + 2) ** 2 / 2
      morph = 1 - disp
      shimmer = 1 - disp
      breathing = 1 - disp
    }

    const time = state.clock.elapsedTime
    const breathScale =
      1 + Math.sin(time * 0.6) * 0.015 * breathing

    const colors = geo.attributes.color.array as Float32Array

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const sx = scatter[i3]
      const sy = scatter[i3 + 1]
      const sz = scatter[i3 + 2]
      const tx = target[i3]
      const ty = target[i3 + 1]
      const tz = target[i3 + 2]
      const dx = disperse[i3]
      const dy = disperse[i3 + 1]
      const dz = disperse[i3 + 2]

      if (p < 0.7) {
        pos[i3] = sx + (tx - sx) * morph
        pos[i3 + 1] = sy + (ty - sy) * morph
        pos[i3 + 2] = sz + (tz - sz) * morph
      } else {
        const d = (p - 0.7) / 0.3
        const eas =
          d < 0.5 ? 2 * d * d : 1 - (-2 * d + 2) ** 2 / 2
        pos[i3] = tx + (dx - tx) * eas
        pos[i3 + 1] = ty + (dy - ty) * eas
        pos[i3 + 2] = tz + (dz - tz) * eas
      }

      pos[i3] *= breathScale
      pos[i3 + 1] *= breathScale
      pos[i3 + 2] *= breathScale

      const sh =
        shimmer > 0
          ? 1 -
            shimmer *
              (1 -
                (0.55 +
                  0.45 *
                    (0.5 +
                      0.5 * Math.sin(time * 2.5 + phases[i]))))
          : 1
      colors[i3] = gold.r * sh
      colors[i3 + 1] = gold.g * sh
      colors[i3 + 2] = gold.b * sh
    }

    geo.attributes.position.needsUpdate = true
    geo.attributes.color.needsUpdate = true
  })

  return (
    <>
      <OrthographicCamera
        makeDefault
        args={[-8, 8, 8, -8, 0.1, 100]}
        position={[0, 0, 10]}
      />
      <points>
        <bufferGeometry ref={geoRef}>
          <bufferAttribute
            attach="attributes-position"
            /* eslint-disable-next-line react-hooks/refs */
            args={[posRef.current, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colorAttr, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.07}
          map={texture}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          vertexColors
          opacity={0.9}
          sizeAttenuation={false}
        />
      </points>
    </>
  )
}

// ---- Main Component ----

export default function ParticleDeer() {
  const [target, setTarget] = useState<Float32Array | null>(null)
  const [scatter, setScatter] = useState<Float32Array | null>(null)
  const [disperse, setDisperse] = useState<Float32Array | null>(null)
  const [count, setCount] = useState(0)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const dpr = Math.min(window.devicePixelRatio || 1, 2.5)
    sampleLogoImage(dpr).then((t) => {
      const n = t.length / 3
      setTarget(t)
      setScatter(generateScatter(n, 7))
      setDisperse(generateDisperse(t, n, 10))
      setCount(n)
      setReady(true)
    })
  }, [])

  const scene = useMemo(() => {
    if (!ready || !target || !scatter || !disperse) return null
    return (
      <DeerParticles
        target={target}
        scatter={scatter}
        disperse={disperse}
        count={count}
      />
    )
  }, [ready, target, scatter, disperse, count])

  return (
    <section
      id="particle-deer-section"
      className="relative py-20 sm:py-28 overflow-hidden bg-cream-dark/20 select-none"
      style={{ minHeight: '60vh' }}
    >
      <div className="absolute inset-0">
        <Scene3D scene={scene} className="w-full h-full">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-fade-in">
              <Image
                src="/images/logo.png"
                alt=""
                width={140}
                height={140}
                className="opacity-25"
                aria-hidden
              />
            </div>
          </div>
        </Scene3D>
      </div>

      <div className="relative z-10 pointer-events-none">
        <Container>
          <SectionHeading
            eyebrow="The mark of purity"
            title="Golden Deer"
            align="center"
            className="[&_h2]:text-5xl sm:[&_h2]:text-7xl lg:[&_h2]:text-8xl"
          />
        </Container>
      </div>
    </section>
  )
}

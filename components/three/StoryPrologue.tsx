'use client'

import { useRef, useEffect, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { PerspectiveCamera, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import Scene3D from './Scene3D'
import { Container } from '@/components/shared/primitives'

const PEARL_COUNT = 35

function PrologueScene({ progress }: { progress: { current: number } }) {
  const camRef = useRef<THREE.PerspectiveCamera>(null)
  const shaftRef = useRef<THREE.Mesh>(null)

  const [pearls] = useState(() => {
    const arr: { x: number; y: number; z: number; s: number; rx: number; ry: number; rz: number }[] = []
    for (let i = 0; i < PEARL_COUNT; i++) {
      arr.push({
        x: (Math.random() - 0.5) * 12,
        y: (Math.random() - 0.5) * 5,
        z: -(Math.random() * 15 + 3),
        s: 0.2 + Math.random() * 0.35,
        rx: Math.random() * Math.PI * 2,
        ry: Math.random() * Math.PI * 2,
        rz: Math.random() * Math.PI * 2,
      })
    }
    return arr
  })

  useFrame(() => {
    const p = progress.current
    if (!camRef.current) return
    const zT = 17 - p * 14
    const xD = Math.sin(p * Math.PI) * 1.2
    const yD = Math.sin(p * Math.PI * 0.8) * 0.3
    camRef.current.position.lerp(new THREE.Vector3(xD, yD, zT), 0.04)
    camRef.current.lookAt(0, 0, -6)

    if (shaftRef.current) {
      const t = Date.now() * 0.0004
      shaftRef.current.position.x = 3.5 + Math.sin(t) * 0.5
      shaftRef.current.position.y = 2 + Math.sin(t * 1.3) * 0.3
    }
  })

  return (
    <>
      <PerspectiveCamera ref={camRef} makeDefault position={[0, 0, 17]} fov={45} near={0.5} far={40} />
      <fogExp2 attach="fog" args={['#0F2E1E', 0.02]} />
      <ambientLight intensity={0.25} color="#FFE4C4" />
      <directionalLight position={[4, 6, 3]} intensity={1.5} color="#FFD699" />
      <directionalLight position={[-2, 1, -4]} intensity={0.3} color="#B8D4E8" />

      <mesh ref={shaftRef} position={[3.5, 2, -8]} rotation={[0.2, -0.3, 0.05]}>
        <planeGeometry args={[2.5, 7]} />
        <meshBasicMaterial color="#FFD699" transparent opacity={0.06} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[3, 1.5, -10]} rotation={[0.15, -0.2, 0.02]}>
        <planeGeometry args={[1.5, 5]} />
        <meshBasicMaterial color="#FFE4B5" transparent opacity={0.04} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} />
      </mesh>

      <group>
        {pearls.map((p, i) => (
          <mesh key={i} position={[p.x, p.y, p.z]} scale={p.s} rotation={[p.rx, p.ry, p.rz]}>
            <sphereGeometry args={[0.5, 16, 12]} />
            <meshPhysicalMaterial
              color="#F5F0E8"
              roughness={0.45}
              metalness={0.05}
              clearcoat={0.35}
              clearcoatRoughness={0.3}
              envMapIntensity={0.5}
            />
          </mesh>
        ))}
      </group>

      <ContactShadows position={[0, -3.5, 0]} opacity={0.4} scale={14} blur={3} far={5} color="#0F2E1E" />
    </>
  )
}

export default function StoryPrologue() {
  const progress = useRef(0)
  const l1 = useRef<HTMLParagraphElement>(null)
  const l2 = useRef<HTMLParagraphElement>(null)
  const l3 = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    let kill = false
    const init = async () => {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      if (kill) return

      const st = ScrollTrigger.create({
        trigger: '#story-prologue',
        start: 'top 85%',
        end: '+=150vh',
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
          const p = self.progress
          progress.current = p
          if (l1.current) l1.current.style.opacity = String(Math.min(1, Math.max(0, (p - 0.0) / 0.15)))
          if (l2.current) l2.current.style.opacity = String(Math.min(1, Math.max(0, (p - 0.3) / 0.15)))
          if (l3.current) l3.current.style.opacity = String(Math.min(1, Math.max(0, (p - 0.6) / 0.15)))
        },
      })

      return () => {
        kill = true
        st.kill()
      }
    }
    init()
  }, [])

  const scene = useMemo(() => <PrologueScene progress={progress} />, [])

  return (
    <section id="story-prologue" className="relative h-screen overflow-hidden bg-[#0a1a12]">
      <div className="absolute inset-0">
        <Scene3D scene={scene} className="w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1a12] via-[#0F2E1E] to-[#0a1a12]" />
        </Scene3D>
      </div>

      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none select-none">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-6 sm:space-y-8">
            <p ref={l1} className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-cream/90 leading-relaxed" style={{ opacity: 0 }}>
              Hand-picked from pristine wetlands.
            </p>
            <p ref={l2} className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-cream/90 leading-relaxed" style={{ opacity: 0 }}>
              Sorted for only the largest pops.
            </p>
            <p ref={l3} className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-cream/90 leading-relaxed" style={{ opacity: 0 }}>
              Sealed at peak crunch.
            </p>
          </div>
        </Container>
      </div>
    </section>
  )
}

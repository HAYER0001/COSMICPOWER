'use client'

import { useEffect, useRef, useMemo, useState } from 'react'
import { Canvas, useLoader, useFrame } from '@react-three/fiber'
import {
  OrbitControls, RoundedBox, ContactShadows,
  Float, Environment, Text,
  MeshTransmissionMaterial,
} from '@react-three/drei'
import { TextureLoader, type Mesh } from 'three'
import * as THREE from 'three'

// ----------------------------------------------------------------
// Pouch — foil-laminate pack textured with the product image
// ----------------------------------------------------------------
function PouchScene({ poster }: { poster: string }) {
  const texture = useLoader(TextureLoader, poster)

  return (
    <group>
      <Float speed={0.4} rotationIntensity={0.02} floatIntensity={0.2}>
        <RoundedBox args={[3, 4.2, 0.8]} radius={0.35} smoothness={4}>
          <meshPhysicalMaterial
            map={texture}
            metalness={0.45}
            roughness={0.3}
            clearcoat={0.6}
            clearcoatRoughness={0.25}
            envMapIntensity={1.2}
          />
        </RoundedBox>
      </Float>
    </group>
  )
}

// ----------------------------------------------------------------
// Glass jar + instanced raw makhana pearls
// ----------------------------------------------------------------
function MakhanaPearls({ count = 150 }: { count?: number }) {
  const [pearls] = useState(() => {
    const items: { pos: [number, number, number]; scale: number }[] = []
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const r = Math.random() * 0.55 + 0.15
      const h = (Math.random() - 0.5) * 1.6
      items.push({
        pos: [Math.cos(angle) * r, h, Math.sin(angle) * r],
        scale: 0.06 + Math.random() * 0.035,
      })
    }
    return items
  })

  return (
    <group>
      {pearls.map((p, i) => (
        <mesh key={i} position={p.pos}>
          <sphereGeometry args={[p.scale, 8, 8]} />
          <meshPhysicalMaterial color="#f5e6c8" roughness={0.4} metalness={0.05} />
        </mesh>
      ))}
    </group>
  )
}

function GlassJarScene() {
  const jarRef = useRef<Mesh>(null!)

  useFrame((_, delta) => {
    if (jarRef.current) {
      jarRef.current.rotation.y += Math.sin(Date.now() * 0.0008) * delta * 0.08
    }
  })

  return (
    <group>
      <Float speed={0.3} rotationIntensity={0.01} floatIntensity={0.12}>
        {/* Glass body */}
        <mesh ref={jarRef} position={[0, 0, 0]}>
          <cylinderGeometry args={[1.2, 1.0, 2.0, 48]} />
          <MeshTransmissionMaterial
            backside
            thickness={0.15}
            roughness={0.05}
            transmission={0.95}
            clearcoat={0.3}
            clearcoatRoughness={0.2}
            ior={1.5}
            color="#e8d5b0"
            envMapIntensity={1.5}
          />
        </mesh>

        {/* Gold lid */}
        <mesh position={[0, 1.05, 0]}>
          <cylinderGeometry args={[1.25, 1.25, 0.12, 32]} />
          <meshPhysicalMaterial
            color="#c9a25e"
            metalness={0.7}
            roughness={0.2}
          />
        </mesh>

        {/* Base rim */}
        <mesh position={[0, -1.05, 0]}>
          <cylinderGeometry args={[1.05, 1.15, 0.06, 32]} />
          <meshPhysicalMaterial
            color="#c9a25e"
            metalness={0.5}
            roughness={0.3}
          />
        </mesh>

        <MakhanaPearls count={150} />
      </Float>
    </group>
  )
}

// ----------------------------------------------------------------
// Controls
// ----------------------------------------------------------------
function SceneControls({ isRaw }: { isRaw: boolean }) {
  return (
    <OrbitControls
      enablePan={false}
      enableDamping
      dampingFactor={0.1}
      minDistance={3.5}
      maxDistance={9}
      minPolarAngle={isRaw ? 0 : Math.PI / 2 - 0.3}
      maxPolarAngle={isRaw ? Math.PI : Math.PI / 2 + 0.3}
      minAzimuthAngle={isRaw ? undefined : -Math.PI * 0.19}
      maxAzimuthAngle={isRaw ? undefined : Math.PI * 0.19}
    />
  )
}

// ----------------------------------------------------------------
// Lights shared by both scenes
// ----------------------------------------------------------------
function SceneLights() {
  return (
    <>
      <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffdbbb" />
      <directionalLight position={[-3, 1, 4]} intensity={0.8} color="#ffd700" />
      <ambientLight intensity={0.15} color="#0F2E1E" />
    </>
  )
}

// ----------------------------------------------------------------
// Public component
// ----------------------------------------------------------------
interface ProductInspectProps {
  slug: string
  poster: string
  name: string
}

export default function ProductInspect({
  slug,
  poster,
  name,
}: ProductInspectProps) {
  const [permit, setPermit] = useState(false)
  const [webglFailed, setWebglFailed] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    const finePointer = window.matchMedia('(pointer: fine)').matches
    const conn = (navigator as { connection?: { saveData?: boolean } }).connection
    const saveData = conn?.saveData === true
    if (reducedMotion || !finePointer || saveData) return
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPermit(true)
  }, [])

  const isRaw = slug === 'raw-makhana'

  // --- fallback: show poster when 3D can't mount ---
  if (!permit || webglFailed) {
    return (
      <div className="relative rounded-2xl overflow-hidden w-full h-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={poster}
          alt={name}
          className="object-cover w-full h-full"
          style={{ aspectRatio: '4/5' }}
        />
      </div>
    )
  }

  return (
    <div className="relative rounded-2xl overflow-hidden w-full h-full">
      <Canvas
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        camera={{ position: [0, 0.5, 4.5], fov: 30 }}
        onCreated={({ gl }) => {
          const handler = () => setWebglFailed(true)
          gl.domElement.addEventListener('webglcontextlost', handler)
          return () =>
            gl.domElement.removeEventListener('webglcontextlost', handler)
        }}
        style={{ width: '100%', height: '100%' }}
      >
        <color attach="background" args={['#0F2E1E']} />

        {isRaw ? <GlassJarScene /> : <PouchScene poster={poster} />}

        <SceneLights />

        <ContactShadows
          position={[0, isRaw ? -1.2 : -2.3, 0]}
          opacity={0.5}
          scale={8}
          blur={2.5}
          far={isRaw ? 3 : 5}
        />

        <SceneControls isRaw={isRaw} />
        <Environment preset="studio" />
      </Canvas>
    </div>
  )
}

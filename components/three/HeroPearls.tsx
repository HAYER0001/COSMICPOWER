'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import Scene3D from './Scene3D'
import {
  GoldenStudio,
  MakhanaIvoryMaterial,
  GoldDustMaterial,
} from '@/lib/three/golden-studio'

const PEARL_COUNT = 8
const DUST_COUNT = 250

function createPearlGeometry(size: number): THREE.BufferGeometry {
  const geo = new THREE.SphereGeometry(size, 20, 16)
  const pos = geo.attributes.position
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i)
    const y = pos.getY(i)
    const z = pos.getZ(i)
    const noise = 1 + (Math.random() - 0.5) * 0.14
    pos.setXYZ(i, x * noise, y * noise, z * noise)
  }
  pos.needsUpdate = true
  geo.computeVertexNormals()
  return geo
}

let dustPositionsCache: Float32Array | null = null

function getDustPositions(exclusionHalf: number): Float32Array {
  if (dustPositionsCache) return dustPositionsCache
  const pos = new Float32Array(DUST_COUNT * 3)
  for (let i = 0; i < DUST_COUNT; i++) {
    const side = Math.random() < 0.6 ? -1 : 1
    const dist = exclusionHalf + 0.6 + Math.random() * 5
    pos[i * 3] = side * dist + (Math.random() - 0.5) * 2
    pos[i * 3 + 1] = (Math.random() - 0.5) * 5.5
    pos[i * 3 + 2] = -(1 + Math.random() * 14)
  }
  dustPositionsCache = pos
  return pos
}

function HeroPearlsScene() {
  const groupRef = useRef<THREE.Group>(null)
  const dustRef = useRef<THREE.Points>(null)
  const { viewport } = useThree()
  const mouse = useRef({ x: 0, y: 0 })

  const exclusionHalf = 3.2

  const pearlColors = useMemo(() => [
    '#F3EAD8', '#F0E3CD', '#F5ECD4', '#EDDFC5', '#F2E6D0',
    '#EBE0C8', '#F4E9D6', '#EFE2CA', '#F1E6D2', '#EADCC4',
  ], [])

  const [pearls] = useState(() => {
    const arr: {
      baseX: number; baseY: number; baseZ: number
      geo: THREE.BufferGeometry; color: string
      phase: number; side: number
    }[] = []
    for (let i = 0; i < PEARL_COUNT; i++) {
      const side = Math.random() < 0.55 ? -1 : 1
      const dist = exclusionHalf + 0.4 + Math.random() * 3.2
      const baseX = side * dist + (Math.random() - 0.5) * 1.0
      const baseY = (Math.random() - 0.5) * 4
      const baseZ = -(3 + Math.random() * 8)
      const size = 0.14 + Math.random() * 0.22
      const geo = createPearlGeometry(size)
      arr.push({
        baseX, baseY, baseZ, geo,
        color: pearlColors[i % pearlColors.length],
        phase: i * 1.7, side,
      })
    }
    return arr
  })

  const dustPositions = useMemo(() => getDustPositions(exclusionHalf), [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!window.matchMedia('(pointer: fine)').matches) return
    const handler = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()
    const maxPx = 14
    const parallaxX = (mouse.current.x * maxPx) / viewport.width
    const parallaxY = (mouse.current.y * maxPx * 0.5) / viewport.height

    for (let i = 0; i < groupRef.current.children.length; i++) {
      const child = groupRef.current.children[i]
      const p = pearls[i]
      if (!child || !p) continue
      const dx = Math.sin(t * 0.25 + p.phase) * 0.12
      const dy = Math.sin(t * 0.18 + p.phase * 1.3) * 0.08
      const dz = Math.sin(t * 0.1 + p.phase * 0.7) * 0.05
      child.position.x = p.baseX + dx + parallaxX * (1 - p.baseZ / -12)
      child.position.y = p.baseY + dy + parallaxY * (1 - p.baseZ / -12)
      child.position.z = p.baseZ + dz
    }

    if (dustRef.current) {
      const d = dustRef.current
      d.rotation.y = Math.sin(t * 0.015) * 0.005
      d.position.y = Math.sin(t * 0.04) * 0.03
    }
  })

  return (
    <>
      <GoldenStudio fogIntensity={0.03} />

      <group ref={groupRef}>
        {pearls.map((p, idx) => (
          <mesh
            key={idx}
            geometry={p.geo}
            position={[p.baseX, p.baseY, p.baseZ]}
          >
            <MakhanaIvoryMaterial color={p.color} transparent opacity={0.4} />
          </mesh>
        ))}
      </group>

      <points ref={dustRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[dustPositions, 3]}
            count={DUST_COUNT}
          />
        </bufferGeometry>
        <GoldDustMaterial size={0.04} />
      </points>
    </>
  )
}

export default function HeroPearls() {
  const scene = useMemo(() => <HeroPearlsScene />, [])

  return (
    <Scene3D
      scene={scene}
      className="absolute inset-0 z-[5]"
      canvasClassName="pointer-events-none"
    >
      <div />
    </Scene3D>
  )
}

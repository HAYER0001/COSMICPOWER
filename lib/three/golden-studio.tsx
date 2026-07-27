'use client'

import { useMemo } from 'react'
import { Environment, Lightformer, ContactShadows, MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'

// ----------------------------------------------------------------
// GoldenStudio — shared environment + studio light rig
// Every 3D scene renders this so all surfaces share one
// photographic lighting universe: warm cream key, narrow gold
// rim, dim cool fill. No external HDRs.
// ----------------------------------------------------------------
export function GoldenStudio({ fogIntensity = 0.02 }: { fogIntensity?: number }) {
  return (
    <>
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={3} color="#FFE4B5" position={[-4, 4, -5]} scale={[5, 3.5, 1]} />
        <Lightformer form="rect" intensity={1.2} color="#FFD699" position={[4, 1, -4]} scale={[1.5, 5, 1]} />
        <Lightformer form="rect" intensity={0.5} color="#B0C8D8" position={[0, -4, -3]} scale={[4, 1.5, 1]} />
      </Environment>
      <ambientLight intensity={0.25} color="#FFE4C4" />
      <directionalLight position={[-3, 4, 2]} intensity={1.8} color="#FFE4B5" />
      <fogExp2 attach="fog" args={['#0F2E1E', fogIntensity]} />
    </>
  )
}

// ----------------------------------------------------------------
// StudioShadows — brand-tuned ContactShadows
// ----------------------------------------------------------------
export function StudioShadows(props: Record<string, unknown>) {
  return <ContactShadows opacity={0.4} blur={2.5} {...props} />
}

// ----------------------------------------------------------------
// Material presets — JSX components (<mesh> children)
// ----------------------------------------------------------------

export function MakhanaIvoryMaterial(props: Record<string, unknown>) {
  return (
    <meshPhysicalMaterial
      color="#F3EAD8"
      metalness={0}
      roughness={0.55}
      clearcoat={0.2}
      clearcoatRoughness={0.6}
      envMapIntensity={0.9}
      {...props}
    />
  )
}

export function GoldFoilMaterial(props: Record<string, unknown>) {
  return (
    <meshPhysicalMaterial
      color="#C9A24B"
      metalness={0.85}
      roughness={0.28}
      clearcoat={0.6}
      clearcoatRoughness={0.25}
      envMapIntensity={1.2}
      {...props}
    />
  )
}

export function AgedBrassMaterial(props: Record<string, unknown>) {
  return (
    <meshPhysicalMaterial
      color="#B8923E"
      metalness={0.6}
      roughness={0.4}
      clearcoat={0.3}
      clearcoatRoughness={0.4}
      envMapIntensity={1.0}
      {...props}
    />
  )
}

export function ClearGlassMaterial(props: Record<string, unknown>) {
  return (
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
      {...props}
    />
  )
}

// ----------------------------------------------------------------
// GoldDustMaterial — warm additive points for ambient particle effects
// ----------------------------------------------------------------
let _dustTexture: THREE.CanvasTexture | null = null

function getDustTexture() {
  if (_dustTexture) return _dustTexture
  if (typeof document === 'undefined') return _dustTexture
  const canvas = document.createElement('canvas')
  canvas.width = 64
  canvas.height = 64
  const ctx = canvas.getContext('2d')!
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
  g.addColorStop(0, 'rgba(255, 215, 153, 1)')
  g.addColorStop(0.2, 'rgba(255, 215, 153, 0.8)')
  g.addColorStop(0.6, 'rgba(232, 201, 122, 0.3)')
  g.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 64, 64)
  _dustTexture = new THREE.CanvasTexture(canvas)
  return _dustTexture
}

export function GoldDustMaterial(props: Record<string, unknown>) {
  const map = useMemo(() => {
    if (typeof document === 'undefined') return undefined
    return getDustTexture()
  }, [])

  return (
    <pointsMaterial
      map={map}
      size={0.04}
      transparent
      opacity={0.3}
      blending={THREE.AdditiveBlending}
      depthWrite={false}
      sizeAttenuation
      {...props}
    />
  )
}

// ----------------------------------------------------------------
// Material config objects (for imperative THREE.Mesh usage)
// ----------------------------------------------------------------
export const MAKHANA_IVORY = {
  color: '#F3EAD8',
  metalness: 0,
  roughness: 0.55,
  clearcoat: 0.2,
  clearcoatRoughness: 0.6,
  envMapIntensity: 0.9,
} as const

export const GOLD_FOIL = {
  color: '#C9A24B',
  metalness: 0.85,
  roughness: 0.28,
  clearcoat: 0.6,
  clearcoatRoughness: 0.25,
  envMapIntensity: 1.2,
} as const

export const AGED_BRASS = {
  color: '#B8923E',
  metalness: 0.6,
  roughness: 0.4,
  clearcoat: 0.3,
  clearcoatRoughness: 0.4,
  envMapIntensity: 1.0,
} as const

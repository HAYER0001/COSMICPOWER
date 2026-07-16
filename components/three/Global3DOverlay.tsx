'use client'

import { useRef, useEffect, useState, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

interface Particle {
  t: number
  factor: number
  speed: number
  x: number
  y: number
  z: number
}

function AmbientDust() {
  const count = 100
  const mesh = useRef<THREE.InstancedMesh>(null!)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const particles = useRef<Particle[]>([])
  const ready = useRef(false)

  useEffect(() => {
    if (ready.current) return
    const temp: Particle[] = []
    for (let i = 0; i < count; i++) {
      temp.push({
        t: Math.random() * 100,
        factor: 0.2 + Math.random() * 0.8,
        speed: 0.005 + Math.random() * 0.01,
        x: (Math.random() - 0.5) * 20,
        y: (Math.random() - 0.5) * 20,
        z: (Math.random() - 0.5) * 10,
      })
    }
    particles.current = temp
    ready.current = true
  }, [])

  useFrame(() => {
    if (!ready.current) return
    const p = particles.current
    for (let i = 0; i < p.length; i++) {
      p[i].t += p[i].speed
      p[i].y += p[i].speed * 2
      if (p[i].y > 10) p[i].y = -10

      dummy.position.set(
        p[i].x + Math.sin(p[i].t) * p[i].factor,
        p[i].y,
        p[i].z + Math.cos(p[i].t) * p[i].factor
      )
      dummy.scale.setScalar(p[i].factor * 0.02)
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    }
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#c9a25e" transparent opacity={0.3} />
    </instancedMesh>
  )
}

function CursorOrb() {
  const meshRef = useRef<THREE.Mesh>(null!)
  const lightRef = useRef<THREE.PointLight>(null!)
  const { viewport, size } = useThree()

  const target = useRef(new THREE.Vector3(0, 0, 0))
  const current = useRef(new THREE.Vector3(0, 0, 0))

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / size.width) * 2 - 1
      const y = -(e.clientY / size.height) * 2 + 1
      target.current.set((x * viewport.width) / 2, (y * viewport.height) / 2, 2)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [size, viewport])

  useFrame((_, delta) => {
    current.current.lerp(target.current, delta * 8)
    if (meshRef.current) {
      meshRef.current.position.copy(current.current)
    }
    if (lightRef.current) {
      lightRef.current.position.copy(current.current)
    }
  })

  return (
    <>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color="#ffdbbb" transparent opacity={0.8} />
      </mesh>
      <pointLight ref={lightRef} color="#ffdbbb" intensity={0.5} distance={5} />
    </>
  )
}

export default function Global3DOverlay() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const finePointer = window.matchMedia('(pointer: fine)').matches
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (finePointer && !reducedMotion) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShow(true)
    }
  }, [])

  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ alpha: true, antialias: false }}>
        <AmbientDust />
        <CursorOrb />
      </Canvas>
    </div>
  )
}

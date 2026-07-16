'use client'

import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const COUNT = 20
const RADIUS = 0.12
const MAX_SPEED = 0.5
const WALL_PAD = 0.5
const CURSOR_REPEL = 0.8
const CURSOR_RADIUS = 0.7

interface Ball {
  pos: THREE.Vector3
  vel: THREE.Vector3
  mesh: THREE.Mesh
}

export default function NotFoundSpheres() {
  const { viewport } = useThree()
  const groupRef = useRef<THREE.Group>(null)
  const ballsRef = useRef<Ball[]>([])
  const initialized = useRef(false)
  const cursor = useRef({ x: 0, y: 0 })
  const cursorSmoothed = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      cursor.current.x = (e.clientX / window.innerWidth) * 2 - 1
      cursor.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05)
    const group = groupRef.current
    if (!group) return

    cursorSmoothed.current.x += (cursor.current.x - cursorSmoothed.current.x) * 0.08
    cursorSmoothed.current.y += (cursor.current.y - cursorSmoothed.current.y) * 0.08

    const vw = viewport.width * 0.5 - WALL_PAD
    const vh = viewport.height * 0.5 - WALL_PAD
    const cx = cursorSmoothed.current.x * viewport.width * 0.5
    const cy = cursorSmoothed.current.y * viewport.height * 0.5
    const cursorVec = new THREE.Vector3(cx, cy, 0)

    if (!initialized.current) {
      initialized.current = true
      const geo = new THREE.SphereGeometry(RADIUS, 16, 16)
      const mat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#C9A24B'),
        metalness: 0.5,
        roughness: 0.3,
        clearcoat: 0.3,
        emissive: new THREE.Color('#C9A24B'),
        emissiveIntensity: 0.08,
      })
      for (let i = 0; i < COUNT; i++) {
        const mesh = new THREE.Mesh(geo, mat)
        mesh.userData = { phase: Math.random() * Math.PI * 2, drift: 0.1 + Math.random() * 0.2 }
        const pos = new THREE.Vector3(
          (Math.random() - 0.5) * vw * 0.8,
          (Math.random() - 0.5) * vh * 0.8,
          (Math.random() - 0.5) * 0.4,
        )
        mesh.position.copy(pos)
        const vel = new THREE.Vector3(
          (Math.random() - 0.5) * MAX_SPEED * 0.3,
          (Math.random() - 0.5) * MAX_SPEED * 0.3,
          (Math.random() - 0.5) * 0.05,
        )
        group.add(mesh)
        ballsRef.current.push({ pos, vel, mesh })
      }
      return
    }

    const balls = ballsRef.current
    const tmp = new THREE.Vector3()

    for (let i = 0; i < balls.length; i++) {
      const b = balls[i]

      b.vel.x += (0 - b.pos.x) * 0.08 * dt
      b.vel.y += (0 - b.pos.y) * 0.08 * dt
      b.vel.z += (0 - b.pos.z) * 0.15 * dt

      tmp.copy(b.pos).sub(cursorVec)
      const cDist = tmp.length()
      if (cDist < CURSOR_RADIUS) {
        const f = ((CURSOR_RADIUS - cDist) / CURSOR_RADIUS) * CURSOR_REPEL
        tmp.normalize().multiplyScalar(f)
        b.vel.add(tmp)
      }

      const speed = b.vel.length()
      if (speed > MAX_SPEED) b.vel.multiplyScalar(MAX_SPEED / speed)

      b.vel.multiplyScalar(1 - 0.4 * dt)
      b.pos.add(tmp.copy(b.vel).multiplyScalar(dt))

      if (b.pos.x > vw) { b.pos.x = vw; b.vel.x *= -0.8 }
      if (b.pos.x < -vw) { b.pos.x = -vw; b.vel.x *= -0.8 }
      if (b.pos.y > vh) { b.pos.y = vh; b.vel.y *= -0.8 }
      if (b.pos.y < -vh) { b.pos.y = -vh; b.vel.y *= -0.8 }
      if (b.pos.z > 0.4) { b.pos.z = 0.4; b.vel.z *= -0.8 }
      if (b.pos.z < -0.4) { b.pos.z = -0.4; b.vel.z *= -0.8 }

      for (let j = i + 1; j < balls.length; j++) {
        const o = balls[j]
        tmp.copy(b.pos).sub(o.pos)
        const d = tmp.length()
        const min = RADIUS * 2
        if (d < min && d > 0.001) {
          const overlap = (min - d) / 2
          const n = tmp.clone().normalize()
          b.pos.add(tmp.copy(n).multiplyScalar(overlap))
          o.pos.sub(tmp.copy(n).multiplyScalar(overlap))
          const relV = tmp.copy(b.vel).sub(o.vel)
          const vn = relV.dot(n)
          if (vn < 0) {
            const impulse = vn * 0.5
            b.vel.sub(tmp.copy(n).multiplyScalar(impulse))
            o.vel.add(tmp.copy(n).multiplyScalar(impulse))
          }
        }
      }

      b.mesh.position.copy(b.pos)
      b.mesh.rotation.x += Math.sin(state.clock.getElapsedTime() * 0.5 + b.mesh.userData.phase) * dt
      b.mesh.rotation.y += dt * 0.3
    }
  })

  return <group ref={groupRef} />
}

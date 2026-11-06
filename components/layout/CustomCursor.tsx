'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  // MUST start false on both server and client. Reading window.matchMedia in a
  // useState initialiser makes the server render null and the client render a
  // div, which is a hydration mismatch. Enable only after mount, in an effect.
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  // Show only for fine pointers, and keep up if the user plugs in a mouse.
  // prefers-reduced-motion opts out entirely, per the site's motion rules.
  useEffect(() => {
    const pointer = window.matchMedia('(pointer: fine)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')

    const sync = () => setIsVisible(pointer.matches && !reduced.matches)
    sync()

    pointer.addEventListener('change', sync)
    reduced.addEventListener('change', sync)
    return () => {
      pointer.removeEventListener('change', sync)
      reduced.removeEventListener('change', sync)
    }
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const moveCursor = (e: MouseEvent) => {
      // Offset by half width/height so it's centered
      const size = isHovering ? 40 : 20
      cursorX.set(e.clientX - size / 2)
      cursorY.set(e.clientY - size / 2)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      setIsHovering(Boolean(target.closest('a') || target.closest('button')))
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [cursorX, cursorY, isHovering, isVisible])

  if (!isVisible) return null

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full border border-gold/50"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        width: isHovering ? 40 : 20,
        height: isHovering ? 40 : 20,
        backgroundColor: 'transparent',
      }}
      animate={{
        scale: isHovering ? 1.3 : 1,
        borderColor: isHovering ? 'rgba(201, 162, 75, 0.8)' : 'rgba(201, 162, 75, 0.5)',
        boxShadow: isHovering ? '0 0 12px rgba(201, 162, 75, 0.2)' : '0 0 4px rgba(201, 162, 75, 0.1)',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      aria-hidden
    />
  )
}

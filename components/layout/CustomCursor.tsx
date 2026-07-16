'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isVisible] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(pointer: fine)').matches
  })
  const [isHovering, setIsHovering] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const moveCursor = (e: MouseEvent) => {
      // Offset by half width/height so it's centered
      const size = isHovering ? 48 : 24
      cursorX.set(e.clientX - size / 2)
      cursorY.set(e.clientY - size / 2)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a') || target.closest('button')) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [cursorX, cursorY, isHovering])

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

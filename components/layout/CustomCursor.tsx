'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const isDesktop = window.matchMedia('(pointer: fine)').matches
    if (!isDesktop) return
    setIsVisible(true)

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
      className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full border border-gold/40 bg-gold/10 mix-blend-difference"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        width: isHovering ? 48 : 24,
        height: isHovering ? 48 : 24,
      }}
      animate={{
        scale: isHovering ? 1.2 : 1,
        backgroundColor: isHovering ? 'rgba(232, 201, 122, 0.2)' : 'rgba(232, 201, 122, 0.1)'
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      aria-hidden
    />
  )
}

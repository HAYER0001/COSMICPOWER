'use client'

import dynamic from 'next/dynamic'
import type { ReactNode } from 'react'

const GoldFlowBackground = dynamic(() => import('@/components/three/GoldFlowBackground'), { ssr: false })

export default function BackgroundWrapper({ children }: { children: ReactNode }) {
  return <GoldFlowBackground>{children}</GoldFlowBackground>
}

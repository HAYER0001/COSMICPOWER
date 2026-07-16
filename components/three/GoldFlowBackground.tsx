'use client'

import { type ReactNode } from 'react'
import dynamic from 'next/dynamic'
import Scene3D from './Scene3D'

const GoldFlow = dynamic(() => import('./GoldFlow'), { ssr: false })

export default function GoldFlowBackground({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      <Scene3D scene={<GoldFlow />} className="absolute inset-0">
        <span />
      </Scene3D>
      <div className="relative z-10">{children}</div>
    </div>
  )
}

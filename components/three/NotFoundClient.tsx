'use client'

import { type ReactNode } from 'react'
import Scene3D from './Scene3D'
import NotFoundSpheres from './NotFoundSpheres'

export default function NotFoundClient({ children }: { children: ReactNode }) {
  return (
    <Scene3D scene={<NotFoundSpheres />} className="relative">
      {children}
    </Scene3D>
  )
}

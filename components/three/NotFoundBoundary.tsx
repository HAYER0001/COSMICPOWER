'use client'

import dynamic from 'next/dynamic'
import type { ReactNode } from 'react'

const NotFoundClient = dynamic(() => import('@/components/three/NotFoundClient'), { ssr: false })

export default function NotFoundBoundary({ children }: { children: ReactNode }) {
  return <NotFoundClient>{children}</NotFoundClient>
}

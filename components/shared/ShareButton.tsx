'use client'

import { useState } from 'react'
import { Check, Share2 } from 'lucide-react'

export default function ShareButton({ title, path, className = '' }: { title: string; path: string; className?: string }) {
  const [message, setMessage] = useState('')
  async function share() {
    const url = new URL(path, window.location.origin).href
    try {
      if (navigator.share) await navigator.share({ title, url })
      else {
        await navigator.clipboard.writeText(url)
        setMessage('Link copied')
      }
    } catch (error) {
      if ((error as Error).name !== 'AbortError') setMessage('Copy the page address to share')
    }
  }
  return (
    <button onClick={() => void share()} className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-forest/20 px-4 text-xs font-medium text-forest-deep transition-colors hover:border-gold ${className}`}>
      {message === 'Link copied' ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
      <span role="status">{message || 'Share'}</span>
    </button>
  )
}

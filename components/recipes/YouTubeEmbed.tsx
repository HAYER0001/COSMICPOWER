'use client'

import { useState } from 'react'

interface YouTubeEmbedProps {
  youtubeId: string
  title: string
}

export default function YouTubeEmbed({ youtubeId, title }: YouTubeEmbedProps) {
  const [loaded, setLoaded] = useState(false)

  if (youtubeId === 'REPLACE_WITH_REAL_VIDEO_ID') {
    return (
      <div className="relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-cream-dark to-cream border border-gold/20 flex items-center justify-center">
        <div className="text-center px-4">
          <svg
            className="w-10 h-10 mx-auto mb-2 text-gold/40"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
          <p className="text-xs text-gold/50 font-medium tracking-wide uppercase">
            Video coming soon
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
      {!loaded ? (
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="absolute inset-0 w-full h-full cursor-pointer group"
          aria-label={`Play ${title}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              viewBox="0 0 68 48"
              className="w-16 sm:w-20 h-auto opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-200"
            >
              <path
                d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z"
                fill="#c9a24b"
              />
              <path d="M45 24L27 14v20l18-10z" fill="#0F2E1E" />
            </svg>
          </div>
        </button>
      ) : (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      )}
    </div>
  )
}

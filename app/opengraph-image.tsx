import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const alt = 'Golden Deer — premium makhana from Bihar by Cosmic Power Pvt. Ltd.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpenGraphImage() {
  const [logo, product] = await Promise.all([
    readFile(join(process.cwd(), 'public/images/logo.png'), 'base64'),
    readFile(join(process.cwd(), 'public/videos/hero-poster.jpg'), 'base64'),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: '#0F2E1E',
          color: '#FAF7ED',
          position: 'relative',
        }}
      >
        {/* Local files keep the preview independent of image hosts and API keys. */}
        <img
          src={`data:image/jpeg;base64,${product}`}
          alt="Golden Deer makhana pouch"
          width={550}
          height={630}
          style={{ position: 'absolute', right: 0, top: 0, objectFit: 'cover', objectPosition: 'center' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            background: 'linear-gradient(90deg, #0F2E1E 0%, #0F2E1E 46%, rgba(15,46,30,0.6) 59%, rgba(15,46,30,0) 76%)',
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', padding: '42px 60px', width: 700, zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <img src={`data:image/png;base64,${logo}`} alt="Golden Deer" width={86} height={86} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              <span style={{ fontSize: 26, letterSpacing: 3, color: '#D8B762' }}>GOLDEN DEER</span>
              <span style={{ fontSize: 16, color: '#FAF7ED', opacity: 0.7 }}>BY COSMIC POWER PVT. LTD.</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: 55 }}>
            <span style={{ fontSize: 72, lineHeight: 1.07, letterSpacing: -2 }}>Nature’s</span>
            <span style={{ fontSize: 72, lineHeight: 1.07, letterSpacing: -2, color: '#D8B762' }}>golden crunch.</span>
            <span style={{ marginTop: 26, fontSize: 26, lineHeight: 1.4, color: '#FAF7ED', opacity: 0.85 }}>Premium makhana. Rooted in Bihar.</span>
          </div>
          <div style={{ display: 'flex', marginTop: 'auto', paddingTop: 24, borderTop: '1px solid rgba(216,183,98,0.35)', width: 520, alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 19, letterSpacing: 1, color: '#D8B762' }}>cosmicpower.ltd</span>
            <span style={{ fontSize: 16, color: '#FAF7ED', opacity: 0.7 }}>RETAIL · BULK · GIFTING</span>
          </div>
        </div>
      </div>
    ),
    size,
  )
}

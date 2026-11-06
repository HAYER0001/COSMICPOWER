'use client'

function resolveTrackingUrl(awb: string): string {
  if (!awb || awb.startsWith('MOCK-')) return '/track'
  if (awb.startsWith('AMZN')) return 'https://track.amazon.in/'
  if (awb.startsWith('SR') || awb.length === 12 || awb.length === 14) {
    return `https://shiprocket.co/tracking/${awb}`
  }
  return `https://www.delhivery.com/track/package/${awb}`
}

/**
 * Multi-carrier tracking link (Shiprocket / Amazon Shipping / Delhivery)
 */
export default function TrackingLink({ awb }: { awb: string }) {
  const url = resolveTrackingUrl(awb)
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className="text-blue-600 hover:underline"
      title={`Track parcel on ${url.includes('shiprocket') ? 'Shiprocket' : url.includes('amazon') ? 'Amazon' : 'Courier'}`}
    >
      {awb}
    </a>
  )
}

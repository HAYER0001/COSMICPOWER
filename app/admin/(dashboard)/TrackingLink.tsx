'use client'

/**
 * Delhivery tracking link inside a clickable row.
 *
 * Must be a client component: the row navigates on click, so this has to stop
 * propagation, and an event handler cannot be attached from a server component.
 */
export default function TrackingLink({ awb }: { awb: string }) {
  return (
    <a
      href={`https://www.delhivery.com/track/package/${awb}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className="text-blue-600 hover:underline"
    >
      {awb}
    </a>
  )
}

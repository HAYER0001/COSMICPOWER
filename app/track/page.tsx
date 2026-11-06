import type { Metadata } from 'next'
import { Container, SectionHeading } from '@/components/shared/primitives'
import TrackClient from '@/components/track/TrackClient'

export const metadata: Metadata = {
  title: 'Track Your Order',
  description:
    'Track your Golden Deer makhana order. Enter your order reference and the email you used at checkout.',
  robots: { index: false, follow: true },
}

export default function TrackPage() {
  return (
    <Container className="py-12 sm:py-20">
      <SectionHeading
        align="center"
        eyebrow="Order Status"
        title="Track Your Order"
        lede="Enter your order reference and the email you used at checkout."
        className="mb-10"
      />
      <TrackClient />
    </Container>
  )
}

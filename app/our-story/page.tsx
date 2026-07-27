import type { Metadata } from 'next'
import { site } from '@/content/site'
import OurStoryClient from '@/components/home/OurStoryClient'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Our Story — Golden Deer Premium Roasted Makhana',
    description:
      'From pristine wetlands to your table. Discover how Golden Deer sources, sorts, roasts, and packs the finest premium makhana through direct farmer partnerships.',
    openGraph: {
      title: 'Our Story — Golden Deer Premium Roasted Makhana',
      description:
        'Hand-harvested from pristine wetlands. Touchless slow-roasted. Nitrogen-flushed for freshness.',
    },
  }
}

export default function OurStoryPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'Our Story — Golden Deer',
    description:
      'The journey of Golden Deer premium roasted makhana — from pristine wetlands through farmer partnerships, touchless roasting, and nitrogen-flushed packaging.',
    brand: {
      '@type': 'Brand',
      name: 'Golden Deer',
    },
    manufacturer: {
      '@type': 'Organization',
      name: site.legal.company,
      identifiers: site.legal.cin,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <OurStoryClient />
    </>
  )
}

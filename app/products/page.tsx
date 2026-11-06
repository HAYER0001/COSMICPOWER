import Link from 'next/link'
import type { Metadata } from 'next'
import { products } from '@/content/products'
import ProductsGridClient from './products-grid-client'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.cosmicpower.ltd'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Makhana Collection — Roasted Flavours & Raw Jumbo Grade',
    description:
      'Explore Golden Deer makhana — Classic Plain, Salted, Peri Peri, Tangy Tomato, Pudina and Premium Raw Makhana. Find your flavour or enquire about bulk supply.',
    openGraph: {
      title: 'The Golden Deer Makhana Collection',
      description:
        'Five roasted flavours and Premium Raw Makhana from Bihar. Explore the collection and enquire about retail or wholesale supply.',
      url: `${BASE_URL}/products`,
      images: [{ url: `${BASE_URL}/opengraph-image`, width: 1200, height: 630, alt: 'Golden Deer makhana collection' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'The Golden Deer Makhana Collection',
      description: 'Five roasted flavours and Premium Raw Makhana from Bihar. Discover your next favourite crunch.',
      images: [`${BASE_URL}/twitter-image`],
    },
    alternates: {
      canonical: `${BASE_URL}/products`,
    },
  }
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: products.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Product',
      url: `${BASE_URL}/products/${p.slug}`,
      name: p.name,
      description: p.description.slice(0, 160),
      image: `${BASE_URL}${p.poster}`,
      brand: { '@type': 'Brand', name: 'Golden Deer' },
    },
  })),
}

export default function ProductsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="pt-24 pb-16">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8">
          <ol className="flex items-center gap-2 text-sm text-forest-deep/50">
            <li>
              <Link href="/" className="hover:text-gold transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-forest-deep/70" aria-current="page">
              Products
            </li>
          </ol>
        </nav>
        <ProductsGridClient />
      </section>
    </>
  )
}

import Link from 'next/link'
import type { Metadata } from 'next'
import { products } from '@/content/products'
import ProductsGridClient from './products-grid-client'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.cosmicpower.ltd'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Premium Roasted Makhana Collection — Flavours & Raw Jumbo Grade',
    description:
      'Explore Golden Deer\'s premium roasted makhana collection — Classic Roast, Himalayan Pink Salt & Pepper, Tangy Tomato, Creamy Cheese, Spicy Masala, and Jumbo Grade Raw Makhana for bulk buyers.',
    openGraph: {
      title: 'Premium Roasted Makhana Collection — Flavours & Raw Jumbo Grade',
      description:
        'Hand-picked jumbo seeds, slow-roasted to perfection. 5 clean-label flavours plus bulk raw makhana.',
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
      name: p.name,
      description: p.description.slice(0, 160),
      image: `${BASE_URL}${p.poster}`,
      brand: { '@type': 'Brand', name: 'Golden Deer' },
      offers: {
        '@type': 'Offer',
        price: p.mrp.replace('₹', ''),
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
      },
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

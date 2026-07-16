import Link from 'next/link'
import type { Metadata } from 'next'
import { products } from '@/content/products'
import { site } from '@/content/site'
import ProductDetailClient from '@/components/products/ProductDetailClient'

const BASE_URL = 'https://goldendeer.in'

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)
  if (!product) return { title: 'Product not found — Golden Deer' }

  const title = `${product.name} — Golden Deer Premium Roasted Makhana`
  const description = product.description.slice(0, 160)
  const posterUrl = `${BASE_URL}${product.poster}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: posterUrl, width: 1200, height: 1500, alt: product.name }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [posterUrl],
    },
    alternates: {
      canonical: `${BASE_URL}/products/${slug}`,
    },
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl text-forest-deep">Product not found</h1>
        <Link href="/products" className="mt-6 inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium tracking-wide border border-gold text-gold hover:bg-gold hover:text-forest-deep transition-all rounded-lg">
          Back to Products
        </Link>
      </div>
    )
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        name: product.name,
        description: product.description,
        brand: { '@type': 'Brand', name: 'Golden Deer' },
        manufacturer: { '@type': 'Organization', name: site.legal.company },
        image: `${BASE_URL}${product.poster}`,
        offers: {
          '@type': 'Offer',
          price: product.mrp.replace('₹', ''),
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
          url: `${BASE_URL}/products/${product.slug}`,
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
          { '@type': 'ListItem', position: 2, name: 'Products', item: `${BASE_URL}/products` },
          { '@type': 'ListItem', position: 3, name: product.name, item: `${BASE_URL}/products/${product.slug}` },
        ],
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProductDetailClient product={product} />
    </>
  )
}

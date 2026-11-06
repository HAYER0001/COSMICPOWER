import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { products } from '@/content/products'
import { site } from '@/content/site'
import ProductDetailClient from '@/components/products/ProductDetailClient'

const BASE_URL = 'https://www.cosmicpower.ltd'

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
  if (!product) notFound()

  const title = `${product.name}${product.isBulk ? '' : ' Makhana'}`
  const description = product.description.slice(0, 160)
  const posterUrl = `${BASE_URL}${product.poster}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/products/${slug}`,
      images: [{ url: posterUrl, alt: `${product.name} — Golden Deer makhana` }],
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

  if (!product) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        '@id': `${BASE_URL}/products/${product.slug}#product`,
        url: `${BASE_URL}/products/${product.slug}`,
        name: product.name,
        description: product.description,
        brand: { '@type': 'Brand', name: 'Golden Deer' },
        manufacturer: { '@type': 'Organization', name: site.legal.company },
        image: `${BASE_URL}${product.poster}`,
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

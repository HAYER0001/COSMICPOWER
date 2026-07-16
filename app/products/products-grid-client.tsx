'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { products } from '@/content/products'
import { Container, SectionHeading, Tag } from '@/components/shared/primitives'
import type { Product } from '@/content/products'

type FilterKey = 'all' | 'flavoured' | 'classic' | 'raw-bulk'

const filters: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'flavoured', label: 'Flavoured' },
  { key: 'classic', label: 'Classic' },
  { key: 'raw-bulk', label: 'Raw & Bulk' },
]

function categorize(product: Product): FilterKey {
  if (product.slug === 'raw-makhana') return 'raw-bulk'
  if (product.slug === 'plain') return 'classic'
  return 'flavoured'
}

export default function ProductsGridClient() {
  const [active, setActive] = useState<FilterKey>('all')

  const filtered = useMemo(
    () =>
      active === 'all'
        ? products
        : products.filter((p) => categorize(p) === active),
    [active],
  )

  return (
    <Container>
      <SectionHeading
        eyebrow="Our Range"
        title="Premium Roasted Makhana Collection"
        lede="Five clean-label flavours crafted from hand-picked jumbo seeds, plus premium raw makhana for bulk buyers."
        align="center"
        className="mb-10"
      />

      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setActive(f.key)}
            className={`px-5 py-2 text-sm font-medium rounded-full border transition-all duration-200 ${
              active === f.key
                ? 'bg-gold text-forest-deep border-gold'
                : 'border-forest/20 text-forest-deep/60 hover:text-forest-deep hover:border-forest/40'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </Container>
  )
}

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group relative flex flex-col rounded-2xl border border-forest/10 bg-cream-dark/50 overflow-hidden transition-all duration-300 hover:border-gold/30 hover:shadow-gold-glow-sm">
      <div className="relative aspect-[4/3] overflow-hidden bg-cream">
        <Image
          src={product.poster}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      <div className="flex flex-col flex-1 p-5">
        <div className="flex flex-wrap gap-2 mb-3">
          {product.tags.slice(0, 3).map((tag) => (
            <Tag key={tag} variant="gold">
              {tag}
            </Tag>
          ))}
        </div>

        <h3 className="font-display text-xl text-forest-deep mb-1">
          {product.name}
        </h3>
        <p className="text-sm text-forest-deep/60 leading-relaxed mb-3 line-clamp-2">
          {product.tagline}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-lg font-semibold text-gold">
            {product.mrp}
          </span>
          <Link
            href={`/products/${product.slug}`}
            className="text-sm font-medium text-gold hover:text-gold-light transition-colors"
          >
            View &rarr;
          </Link>
        </div>

        <div className="mt-4 pt-4 border-t border-forest/10">
          {product.isBulk ? (
            <Link
              href="/bulk"
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-gold/40 px-4 py-2.5 text-sm font-medium text-gold hover:bg-gold hover:text-forest-deep transition-all"
            >
              Bulk Inquiry
            </Link>
          ) : (
            <div className="flex gap-2 flex-wrap">
              {product.commerce.blinkit && product.commerce.blinkit !== 'ADD_URL' && (
                <a href={product.commerce.blinkit} target="_blank" rel="noopener noreferrer" className="flex-1 rounded-lg bg-gold/20 border border-gold/30 px-3 py-2 text-center text-xs font-medium text-forest-deep hover:bg-gold hover:border-gold transition-all">
                  Blinkit
                </a>
              )}
              {product.commerce.zepto && product.commerce.zepto !== 'ADD_URL' && (
                <a href={product.commerce.zepto} target="_blank" rel="noopener noreferrer" className="flex-1 rounded-lg bg-gold/20 border border-gold/30 px-3 py-2 text-center text-xs font-medium text-forest-deep hover:bg-gold hover:border-gold transition-all">
                  Zepto
                </a>
              )}
              {product.commerce.indiamart && product.commerce.indiamart !== 'ADD_URL' && (
                <a href={product.commerce.indiamart} target="_blank" rel="noopener noreferrer" className="flex-1 rounded-lg bg-gold/20 border border-gold/30 px-3 py-2 text-center text-xs font-medium text-forest-deep hover:bg-gold hover:border-gold transition-all">
                  IndiaMart
                </a>
              )}
              {(!product.commerce.blinkit || product.commerce.blinkit === 'ADD_URL') &&
               (!product.commerce.zepto || product.commerce.zepto === 'ADD_URL') &&
               (!product.commerce.indiamart || product.commerce.indiamart === 'ADD_URL') && (
                <p className="text-xs text-forest-deep/40 italic text-center w-full py-1">Ordering links coming soon.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

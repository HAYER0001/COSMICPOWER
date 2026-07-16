'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { products } from '@/content/products'
import { site } from '@/content/site'
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

      <div className="mt-12 p-5 rounded-xl border border-gold/20 bg-gradient-to-br from-gold/[0.03] to-transparent text-center">
        <p className="text-sm text-forest-deep/70 leading-relaxed">
          Learn about makhana varieties, suta grades, nutrition, and how to choose the best quality — explore our{' '}
          <Link href="/makhana" className="text-gold underline underline-offset-2 font-medium">complete makhana guide</Link>.
        </p>
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
              <span className={`flex-1 min-w-[70px] rounded-lg border px-2 py-1.5 text-center text-[10px] font-medium transition-all ${product.commerce.blinkit !== 'ADD_URL' ? 'bg-gold/20 border-gold/30 text-forest-deep hover:bg-gold hover:border-gold' : 'bg-transparent border-forest/10 text-forest-deep/40 cursor-not-allowed'}`}>
                {product.commerce.blinkit !== 'ADD_URL' ? <a href={product.commerce.blinkit} target="_blank" rel="noreferrer" className="block w-full">Blinkit</a> : 'Blinkit (Soon)'}
              </span>
              <span className={`flex-1 min-w-[70px] rounded-lg border px-2 py-1.5 text-center text-[10px] font-medium transition-all ${product.commerce.zepto !== 'ADD_URL' ? 'bg-gold/20 border-gold/30 text-forest-deep hover:bg-gold hover:border-gold' : 'bg-transparent border-forest/10 text-forest-deep/40 cursor-not-allowed'}`}>
                {product.commerce.zepto !== 'ADD_URL' ? <a href={product.commerce.zepto} target="_blank" rel="noreferrer" className="block w-full">Zepto</a> : 'Zepto (Soon)'}
              </span>
              <span className={`flex-1 min-w-[70px] rounded-lg border px-2 py-1.5 text-center text-[10px] font-medium transition-all ${product.commerce.instamart !== 'ADD_URL' ? 'bg-gold/20 border-gold/30 text-forest-deep hover:bg-gold hover:border-gold' : 'bg-transparent border-forest/10 text-forest-deep/40 cursor-not-allowed'}`}>
                {product.commerce.instamart !== 'ADD_URL' ? <a href={product.commerce.instamart} target="_blank" rel="noreferrer" className="block w-full">Instamart</a> : 'Instamart (Soon)'}
              </span>
              <span className={`flex-1 min-w-[70px] rounded-lg border px-2 py-1.5 text-center text-[10px] font-medium transition-all ${product.commerce.amazon !== 'ADD_URL' ? 'bg-gold/20 border-gold/30 text-forest-deep hover:bg-gold hover:border-gold' : 'bg-transparent border-forest/10 text-forest-deep/40 cursor-not-allowed'}`}>
                {product.commerce.amazon !== 'ADD_URL' ? <a href={product.commerce.amazon} target="_blank" rel="noreferrer" className="block w-full">Amazon</a> : 'Amazon (Soon)'}
              </span>
              <span className={`flex-1 min-w-[70px] rounded-lg border px-2 py-1.5 text-center text-[10px] font-medium transition-all ${product.commerce.indiamart !== 'ADD_URL' ? 'bg-gold/20 border-gold/30 text-forest-deep hover:bg-gold hover:border-gold' : 'bg-transparent border-forest/10 text-forest-deep/40 cursor-not-allowed'}`}>
                {product.commerce.indiamart !== 'ADD_URL' ? <a href={product.commerce.indiamart} target="_blank" rel="noreferrer" className="block w-full">IndiaMart</a> : 'IndiaMart (Soon)'}
              </span>
              <a 
                href={`https://wa.me/${site.contact.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(`Hi, I'd like to order Golden Deer ${product.name}. Here is the link: https://cosmicpower.ltd/products/${product.slug}`)}`}
                className="w-full mt-1 flex items-center justify-center gap-1.5 rounded-lg border border-gold px-3 py-2 text-center text-xs font-medium text-gold hover:bg-gold hover:text-forest-deep transition-all"
              >
                Order via WhatsApp
              </a>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}


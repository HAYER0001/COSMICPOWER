'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import type { Product } from '@/content/products'
import { site } from '@/content/site'
import { products } from '@/content/products'
import MotionLoop from '@/components/shared/MotionLoop'
import { Container, Button, Tag, Divider } from '@/components/shared/primitives'
import {
  ChevronRight,
  CheckCircle,
  ChevronDown,
  ShoppingBag,
  MessageCircle,
  Rotate3D,
} from 'lucide-react'

const ProductInspect = dynamic(
  () => import('@/components/three/ProductInspect'),
  { ssr: false }
)

function Breadcrumb({ product }: { product: Product }) {
  return (
    <nav className="flex items-center gap-1.5 text-xs sm:text-sm text-forest-deep/50 mb-6 flex-wrap" aria-label="Breadcrumb">
      <Link href="/" className="hover:text-gold transition-colors">Home</Link>
      <ChevronRight className="w-3 h-3" />
      <Link href="/products" className="hover:text-gold transition-colors">Products</Link>
      <ChevronRight className="w-3 h-3" />
      <span className="text-forest-deep/80 truncate max-w-[200px]">{product.name}</span>
    </nav>
  )
}

function ThumbnailRow({
  product,
  activeIndex,
  onSelect,
  show3D,
}: {
  product: Product
  activeIndex: number
  onSelect: (i: number) => void
  show3D?: boolean
}) {
  const thumbs: { type: string; label: string; poster?: string; src?: string }[] = [
    { type: 'loop', label: 'Turntable', poster: product.poster },
    { type: 'poster', label: 'Still', src: product.poster },
  ]
  if (show3D) thumbs.push({ type: '3d', label: 'View in 3D' })
  return (
    <div className="flex gap-2 mt-3">
      {thumbs.map((t, i) => (
        <button
          key={t.label}
          onClick={() => onSelect(i)}
          className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all flex items-center justify-center ${
            activeIndex === i
              ? 'border-gold shadow-gold-glow-sm'
              : 'border-forest/10 hover:border-white/30'
          }`}
          aria-label={t.label}
        >
          {t.type === '3d' ? (
            <div className="flex flex-col items-center gap-0.5">
              <Rotate3D className="w-5 h-5 text-forest-deep/60" />
              <span className="text-[9px] leading-tight text-forest-deep/50 font-medium">3D</span>
            </div>
          ) : (
            <Image
              src={t.type === 'poster' ? t.src! : t.poster!}
              alt=""
              fill
              className="object-cover"
              sizes="80px"
            />
          )}
        </button>
      ))}
    </div>
  )
}

function QuickAnswer({ product }: { product: Product }) {
  const answer = product.slug === 'raw-makhana'
    ? 'Hand-sorted jumbo grade (5–6 suta) raw makhana sourced directly from Bihar\'s Gangetic wetlands. Ideal for retail brands, HoReCa kitchens, and export buyers who demand the largest, brightest seeds for roasting or cooking.'
    : `${product.name} is Golden Deer's premium roasted makhana — ${product.tagline.toLowerCase()} Slow-roasted with no artificial preservatives, no MSG, and no trans fats. Perfect for everyday guilt-free snacking.`
  return (
    <div className="border border-gold/30 rounded-xl p-5 bg-gold/5">
      <p className="text-sm sm:text-base text-forest-deep/80 leading-relaxed">{answer}</p>
    </div>
  )
}

function NutritionTable({ product }: { product: Product }) {
  return (
    <div>
      <h3 className="font-display text-xl text-forest-deep mb-3">Nutritional Information</h3>
      <div className="border border-forest/10 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-cream/50">
              <th className="text-left px-4 py-2.5 text-forest-deep/70 font-medium">Per 100g</th>
              <th className="text-right px-4 py-2.5 text-forest-deep/70 font-medium">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <tr><td className="px-4 py-2.5 text-forest-deep/80">Energy</td><td className="px-4 py-2.5 text-right text-forest-deep font-mono tabular-nums">{product.nutrition.energyKcal} kcal</td></tr>
            <tr><td className="px-4 py-2.5 text-forest-deep/80">Protein</td><td className="px-4 py-2.5 text-right text-forest-deep font-mono tabular-nums">{product.nutrition.proteinG}g</td></tr>
            <tr><td className="px-4 py-2.5 text-forest-deep/80">Carbohydrates</td><td className="px-4 py-2.5 text-right text-forest-deep font-mono tabular-nums">{product.nutrition.carbsG}g</td></tr>
            <tr><td className="px-4 py-2.5 text-forest-deep/80">Fat</td><td className="px-4 py-2.5 text-right text-forest-deep font-mono tabular-nums">{product.nutrition.fatG}g</td></tr>
          </tbody>
        </table>
      </div>
      <p className="text-xs text-forest-deep/40 mt-2 italic">{product.nutrition.disclaimer}</p>
    </div>
  )
}

function Accordion({ items }: { items: { title: string; content: string }[] }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="divide-y divide-white/10 border border-forest/10 rounded-xl">
      {items.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex items-center justify-between w-full px-5 py-4 text-left text-sm font-medium text-forest-deep/80 hover:text-forest-deep transition-colors"
          >
            {item.title}
            <ChevronDown className={`w-4 h-4 transition-transform ${open === i ? 'rotate-180' : ''}`} />
          </button>
          {open === i && (
            <div className="px-5 pb-4 text-sm text-forest-deep/60 leading-relaxed">{item.content}</div>
          )}
        </div>
      ))}
    </div>
  )
}

function CtaButtons({ product }: { product: Product }) {
  const isBlinkit = product.commerce.blinkit !== 'ADD_URL'
  const isZepto = product.commerce.zepto !== 'ADD_URL'
  const isAmazon = product.commerce.amazon !== 'ADD_URL'
  const isIndiaMart = product.commerce.indiamart && product.commerce.indiamart !== 'ADD_URL'
  const isInstamart = product.commerce.instamart && product.commerce.instamart !== 'ADD_URL'

  const wpUrl = `https://cosmicpower.ltd/products/${product.slug}`

  if (product.isBulk) {
    return (
      <div className="flex flex-col gap-3">
        <Button variant="gold-solid" href="/bulk#inquiry" className="w-full">
          <MessageCircle className="w-4 h-4" />
          Request Bulk Quote
        </Button>
        <Button
          variant="gold-outline"
          href={`https://wa.me/${site.contact.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(`Hi, I'd like a wholesale quote for Golden Deer raw makhana — grade/quantity: (Link: ${wpUrl})`)}`}
          className="w-full"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp Inquiry
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2.5">
      <Button variant={isBlinkit ? "gold-solid" : "gold-outline"} href={product.commerce.blinkit} className="w-full" disabled={!isBlinkit}>
        <ShoppingBag className="w-4 h-4" />
        {isBlinkit ? 'Buy on Blinkit' : 'Blinkit (Coming Soon)'}
      </Button>
      <Button variant={isZepto ? "gold-solid" : "gold-outline"} href={product.commerce.zepto} className="w-full" disabled={!isZepto}>
        <ShoppingBag className="w-4 h-4" />
        {isZepto ? 'Buy on Zepto' : 'Zepto (Coming Soon)'}
      </Button>
      <Button variant={isInstamart ? "gold-solid" : "gold-outline"} href={product.commerce.instamart || '#'} className="w-full" disabled={!isInstamart}>
        <ShoppingBag className="w-4 h-4" />
        {isInstamart ? 'Buy on Instamart' : 'Instamart (Coming Soon)'}
      </Button>
      <Button variant="gold-outline" href={product.commerce.amazon} className="w-full" disabled={!isAmazon}>
        <ShoppingBag className="w-4 h-4" />
        {isAmazon ? 'Buy on Amazon' : 'Amazon (Coming Soon)'}
      </Button>
      <Button variant="gold-outline" href={product.commerce.indiamart || '#'} className="w-full" disabled={!isIndiaMart}>
        <ShoppingBag className="w-4 h-4" />
        {isIndiaMart ? 'Buy on IndiaMart' : 'IndiaMart (Coming Soon)'}
      </Button>
      <Button
        variant="ghost"
        href={`https://wa.me/${site.contact.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(`Hi, I'd like to order Golden Deer ${product.name}. Here is the link: ${wpUrl}`)}`}
        className="w-full text-xs mt-2"
      >
        <MessageCircle className="w-3.5 h-3.5" />
        Order via WhatsApp
      </Button>
    </div>
  )
}

function BulkSpecSection({ product }: { product: Product }) {
  if (!product.isBulk || !product.bulkSpec) return null
  const spec = product.bulkSpec
  return (
    <div className="space-y-6">
      <Divider />
      <h3 className="font-display text-xl text-forest-deep">Bulk Specification</h3>
      <div>
        <h4 className="text-sm font-medium text-gold uppercase tracking-wider mb-3">Grades Available</h4>
        <div className="divide-y divide-white/10 border border-forest/10 rounded-xl">
          {spec.grades.map((g, i) => (
            <div key={i} className="px-4 py-3.5 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-forest-deep">{g.name}</p>
                <p className="text-xs text-forest-deep/50 mt-0.5">{g.note}</p>
              </div>
              <span className="text-xs font-mono tabular-nums text-gold whitespace-nowrap">{g.size}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium text-gold uppercase tracking-wider mb-3">Packaging Options</h4>
        <div className="flex flex-wrap gap-2">
          {spec.packOptions.map((o, i) => (
            <span key={i} className="px-3 py-1.5 text-xs font-medium bg-cream/50 rounded-full text-forest-deep/70 border border-forest/10">{o}</span>
          ))}
        </div>
      </div>
      <p className="text-xs text-forest-deep/40 italic">{spec.moqNote}</p>
      <div>
        <h4 className="text-sm font-medium text-gold uppercase tracking-wider mb-3">Quality Assurance</h4>
        <ul className="space-y-2">
          {spec.qualityNotes.map((n, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-forest-deep/70">
              <CheckCircle className="w-4 h-4 text-gold mt-0.5 shrink-0" />
              <span>{n}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function RelatedProducts({ current }: { current: Product }) {
  const related = products.filter((p) => p.slug !== current.slug).slice(0, 3)
  return (
    <section className="mt-16 sm:mt-24">
      <Divider className="mb-8" />
      <h3 className="font-display text-2xl text-forest-deep mb-8">Explore More</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
        {related.map((p) => (
          <Link key={p.slug} href={`/products/${p.slug}`} className="group block">
            <div className="relative aspect-4/5 rounded-xl overflow-hidden border border-white/5 group-hover:border-gold/30 transition-all">
              <Image
                src={p.poster}
                alt={p.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 50vw, 33vw"
              />
            </div>
            <div className="mt-2.5">
              <p className="text-sm font-display text-forest-deep group-hover:text-gold transition-colors">{p.name}</p>
              <p className="text-xs text-forest-deep/50 mt-0.5 line-clamp-1">{p.tagline}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

function MobileStickyBar({ product }: { product: Product }) {
  const wpUrl = `https://cosmicpower.ltd/products/${product.slug}`

  if (product.isBulk) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-cream/95 backdrop-blur-lg border-t border-gold/15 px-4 py-3 flex items-center gap-3 sm:hidden">
        <a href="/bulk#inquiry" className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gold text-forest-deep text-sm font-medium rounded-lg active:scale-[0.97] transition-all">
          <MessageCircle className="w-4 h-4" />
          Bulk Quote
        </a>
        <a href={`https://wa.me/${site.contact.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(`Hi, I'd like a wholesale quote for Golden Deer raw makhana — grade/quantity: (Link: ${wpUrl})`)}`} className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-gold text-gold text-sm font-medium rounded-lg active:scale-[0.97] transition-all">
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </a>
      </div>
    )
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-cream/95 backdrop-blur-lg border-t border-gold/15 px-4 py-3 flex items-center gap-3 sm:hidden">
      <a href={`https://wa.me/${site.contact.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(`Hi, I'd like to order Golden Deer ${product.name}. Here is the link: ${wpUrl}`)}`} className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gold text-forest-deep text-sm font-medium rounded-lg active:scale-[0.97] transition-all">
        <MessageCircle className="w-4 h-4" />
        Order via WhatsApp
      </a>
    </div>
  )
}

export default function ProductDetailClient({ product }: { product: Product }) {
  const [activeMedia, setActiveMedia] = useState(0)
  const [can3D, setCan3D] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const finePointer = window.matchMedia('(pointer: fine)').matches
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCan3D(finePointer && !reducedMotion)
  }, [])

  const accordionItems = [
    {
      title: 'Storage Instructions',
      content: 'Store in a cool, dry place away from direct sunlight. Once opened, transfer to an airtight container and consume within 15–20 days for best crunch. Our nitrogen-flushed packaging preserves freshness for up to 8 months unopened. If makhana loses its crunch, dry-roast on low flame for 2–3 minutes — they will crisp right up.',
    },
    {
      title: 'Shipping & Delivery',
      content: 'Free shipping on orders above ₹249. Standard delivery: 3–7 business days across India. Express shipping available for metro cities (1–2 business days). Bulk orders shipped via trusted logistics partners with real-time tracking. International shipping available for export orders — contact us for a custom quote.',
    },
    {
      title: 'Why Clean Label',
      content: 'Clean label means every ingredient on our packet is real food you recognise — no artificial flavours, no colours, no MSG, no preservatives, no palm oil. Our touchless roasting process and nitrogen-flushed packaging preserve freshness naturally. You deserve to know exactly what is in your food, and we believe the ingredient list should read like a recipe, not a chemistry experiment.',
    },
  ]

  return (
    <>
      <Container className="py-8 sm:py-12 pb-24 sm:pb-16">
        <Breadcrumb product={product} />
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left — Media Stage */}
          <div>
            <div className="relative rounded-2xl overflow-hidden border border-white/5">
              {activeMedia === 2 ? (
                <ProductInspect slug={product.slug} poster={product.poster} name={product.name} />
              ) : activeMedia === 0 ? (
                <MotionLoop src={product.loop} poster={product.poster} aspect="4/5" alt={`${product.name} — Golden Deer premium roasted makhana`} className="w-full" priority />
              ) : (
                <div className="relative" style={{ aspectRatio: '4 / 5' }}>
                  <Image src={product.poster} alt={`${product.name} — still`} fill className="object-cover" sizes="50vw" />
                </div>
              )}
            </div>
            <ThumbnailRow product={product} activeIndex={activeMedia} onSelect={setActiveMedia} show3D={can3D} />
          </div>

          {/* Right — Product Info */}
          <div className="lg:sticky lg:top-24 lg:self-start space-y-6">
            <div className="flex flex-wrap gap-2">
              {product.tags.map((t) => (<Tag key={t} variant="gold">{t}</Tag>))}
            </div>
            <div>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight text-forest-deep">{product.name}</h1>
              <p className="mt-2 text-base sm:text-lg text-gold/80 font-medium">{product.tagline}</p>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="font-display text-2xl sm:text-3xl text-forest-deep">{product.mrp}</span>
              <span className="text-sm text-forest-deep/50">/ {product.netWeights.join(' · ')}</span>
            </div>
            <Divider />
            <p className="text-sm sm:text-base text-forest-deep/70 leading-relaxed">{product.description}</p>
            <Divider />
            <div>
              <h3 className="text-sm font-medium text-gold uppercase tracking-wider mb-3">Why You&apos;ll Love It</h3>
              <ul className="space-y-2">
                {product.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-forest-deep/70">
                    <CheckCircle className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Divider />
            <CtaButtons product={product} />
            <Divider />
            <QuickAnswer product={product} />
            <NutritionTable product={product} />
            <div className="text-xs text-forest-deep/50">
              <Link href="/makhana/nutrition" className="text-gold underline underline-offset-2">Full makhana nutrition reference &rarr;</Link>
              {' · '}
              <Link href="/makhana" className="text-gold underline underline-offset-2">Makhana guide</Link>
            </div>
            <div>
              <h3 className="font-display text-xl text-forest-deep mb-3">Ingredients</h3>
              <p className="text-sm text-forest-deep/70 leading-relaxed">{product.ingredients.join(', ')}.</p>
            </div>
            <Divider />
            <Accordion items={accordionItems} />
            <BulkSpecSection product={product} />
          </div>
        </div>
        <RelatedProducts current={product} />
      </Container>
      <MobileStickyBar product={product} />
    </>
  )
}

'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight, ArrowRight, MessageCircle } from 'lucide-react'
import { products } from '@/content/products'
import { recipes } from '@/content/recipes'
import { site } from '@/content/site'
import { Container, Button, SectionHeading, Tag, AnimatedCounter } from '@/components/shared/primitives'

export default function HomeClient() {
  return (
    <>
      <WhyMakhana />
      <SignatureRange />
      <FarmDirect />
      <GiftingAndBulk />
      <RecipesTeaser />
      <JournalTeaser />
      <MarqueeBand />
      <ClosingCTA />
    </>
  )
}

function WhyMakhana() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { observer.disconnect(); } 
    }, { threshold: 0.3 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cream-dark/80 to-cream" />
      <Container className="relative z-10">
        <SectionHeading eyebrow="Why Makhana" title="Nutrition That Speaks for Itself" lede="Ancient superfood, modern nutrition — packed into every golden puff." align="center" className="mb-12" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { label: 'Protein', value: 9.7, suffix: 'g', desc: 'per 100g' },
            { label: 'Fibre', value: 14.5, suffix: 'g', desc: 'per 100g' },
            { label: 'Gluten', value: 0, suffix: 'g', desc: 'naturally free' },
            { label: 'Natural', value: 100, suffix: '%', desc: 'clean label' },
          ].map((s) => (
            <div key={s.label} className="text-center p-6 rounded-xl border border-gold/10 bg-cream/50">
              <div className="text-3xl sm:text-4xl font-display font-bold text-gold-gradient">
                <AnimatedCounter end={s.value} suffix={s.suffix} />
              </div>
              <p className="text-xs text-forest-deep/50 mt-1 uppercase tracking-wider">{s.label}</p>
              <p className="text-xs text-forest-deep/40 mt-0.5">{s.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

function SignatureRange() {
  const retailProducts = products.filter(p => !p.isBulk).slice(0, 5)
  const rawProduct = products.find(p => p.isBulk)
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHeading eyebrow="Our Range" title="Signature Collection" lede="Five clean-label flavours crafted from hand-picked jumbo seeds." align="center" className="mb-12" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {retailProducts.map((p) => (
            <Link key={p.slug} href={`/products/${p.slug}`} className="group block rounded-xl border border-white/5 bg-cream-dark/40 overflow-hidden hover:border-gold/25 transition-all">
              <div className="relative aspect-[4/5] bg-cream overflow-hidden">
                <Image src={p.poster} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
              </div>
              <div className="p-4">
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {p.tags.slice(0, 2).map(t => <Tag key={t} variant="gold">{t}</Tag>)}
                </div>
                <h3 className="font-display text-lg text-forest-deep group-hover:text-gold transition-colors">{p.name}</h3>
                <p className="text-xs text-forest-deep/50 mt-1 line-clamp-1">{p.tagline}</p>
                <p className="text-gold text-sm font-semibold mt-2">{p.mrp}</p>
              </div>
            </Link>
          ))}
          {rawProduct && (
            <Link href={`/products/${rawProduct.slug}`} className="group block rounded-xl border border-gold/20 bg-gold/5 overflow-hidden hover:border-gold/40 transition-all">
              <div className="relative aspect-[4/5] bg-cream overflow-hidden">
                <Image src={rawProduct.poster} alt={rawProduct.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
              </div>
              <div className="p-4">
                <Tag variant="gold">Bulk &amp; Retail</Tag>
                <h3 className="font-display text-lg text-forest-deep group-hover:text-gold transition-colors mt-2">{rawProduct.name}</h3>
                <p className="text-xs text-forest-deep/50 mt-1 line-clamp-2">Hand-sorted jumbo grade for homes, brands &amp; kitchens.</p>
                <p className="text-gold text-xs font-medium mt-2">Bulk Inquiry &rarr;</p>
              </div>
            </Link>
          )}
        </div>
        <div className="text-center mt-10">
          <Button variant="gold-outline" href="/products">View Full Collection <ChevronRight className="w-4 h-4" /></Button>
        </div>
      </Container>
    </section>
  )
}

function FarmDirect() {
  return (
    <section className="py-16 sm:py-24 bg-cream-dark/30">
      <Container>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="aspect-[4/3] rounded-xl bg-cream flex items-center justify-center">
            <span className="text-forest-deep/20 font-display text-xl">Farm film</span>
          </div>
          <div>
            <Tag variant="gold" className="mb-4">Farm Direct</Tag>
            <h2 className="font-display text-3xl sm:text-4xl leading-tight text-forest-deep mb-4">From Our Farmers to Your Table</h2>
            <p className="text-sm sm:text-base text-forest-deep/60 leading-relaxed mb-4">
              We partner directly with farming communities in Bihar&apos;s pristine wetlands — fair-trade sourcing, no middlemen, and a commitment to the people who hand-harvest every seed.
            </p>
            <p className="text-sm sm:text-base text-forest-deep/60 leading-relaxed mb-6">
              This is how we ensure traceability from wetland to pouch, and why every pop of Golden Deer carries the story of its origin.
            </p>
            <Button variant="gold-outline" href="/our-story">Meet the Source <ArrowRight className="w-4 h-4" /></Button>
          </div>
        </div>
      </Container>
    </section>
  )
}

function GiftingAndBulk() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cream-dark to-cream" />
      <div className="absolute inset-0 bg-grain opacity-30" />
      <Container className="relative z-10 text-center">
        <Tag variant="gold" className="mb-4">For Business</Tag>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight text-forest-deep mb-3">Gifting &amp; Wholesale, Elevated</h2>
        <p className="text-sm sm:text-base text-forest-deep/60 max-w-xl mx-auto mb-8 leading-relaxed">
          Custom-branded corporate gift boxes, bulk supply for retailers and HoReCa, and export-grade raw makhana — whatever your business needs, we deliver at scale.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="gold-solid" href="/bulk">Explore Bulk &amp; Wholesale <ArrowRight className="w-4 h-4" /></Button>
          <Button variant="gold-outline" href={`https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent('Hi, I\'d like a bulk quote for Golden Deer makhana — grade/quantity: ')}`}>
            <MessageCircle className="w-4 h-4" /> WhatsApp Inquiry
          </Button>
        </div>
      </Container>
    </section>
  )
}

function RecipesTeaser() {
  const teasers = recipes.slice(0, 3)
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHeading eyebrow="From the Kitchen" title="Try These Makhana Recipes" lede="Quick, clean, and packed with flavour." align="center" className="mb-12" />
        <div className="grid sm:grid-cols-3 gap-6">
          {teasers.map((r) => (
            <Link key={r.slug} href={`/recipes/${r.slug}`} className="group block rounded-xl border border-white/5 bg-cream-dark/40 overflow-hidden hover:border-gold/25 transition-all">
              <div className="aspect-[4/3] bg-cream flex items-center justify-center">
                <span className="text-forest-deep/20 font-display text-sm text-center px-4">{r.title}</span>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-3 text-xs text-forest-deep/50 mb-2">
                  <span>{r.time}</span>
                  <span>&middot;</span>
                  <span>Serves {r.serves}</span>
                </div>
                <h3 className="font-display text-base text-forest-deep group-hover:text-gold transition-colors line-clamp-1">{r.title}</h3>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Button variant="gold-outline" href="/recipes">All Recipes <ChevronRight className="w-4 h-4" /></Button>
        </div>
      </Container>
    </section>
  )
}

function JournalTeaser() {
  return (
    <section className="py-16 sm:py-24 bg-cream-dark/30">
      <Container>
        <SectionHeading eyebrow="Journal" title="Stories from the Wetlands" lede="Articles, guides, and deep dives into the world of makhana." align="center" className="mb-12" />
        <div className="grid sm:grid-cols-3 gap-6">
          {['Makhana Konsa Lu? Sahi Makhana Chunne ki Poori Guide', 'Best Clean-Label Makhana Brand in India', 'Is Roasted Makhana Healthy?'].map((title, i) => (
            <div key={i} className="rounded-xl border border-white/5 bg-cream-dark/40 overflow-hidden">
              <div className="aspect-[4/3] bg-cream flex items-center justify-center">
                <span className="text-forest-deep/20 font-display text-sm text-center px-4">{title.split(' ').slice(0, 3).join(' ')}...</span>
              </div>
              <div className="p-4">
                <p className="text-xs text-forest-deep/50 mb-1">Journal</p>
                <h3 className="font-display text-sm text-forest-deep line-clamp-2">{title}</h3>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Button variant="gold-outline" href="/journal">Read the Journal <ChevronRight className="w-4 h-4" /></Button>
        </div>
      </Container>
    </section>
  )
}

function MarqueeBand() {
  return (
    <div className="py-4 border-y border-gold/10 overflow-hidden bg-cream/80">
      <div className="animate-marquee whitespace-nowrap flex gap-12 text-xs sm:text-sm font-medium tracking-[0.15em] uppercase text-gold/40">
        <span>Small-batch roasted</span>
        <span className="text-gold/20">&bull;</span>
        <span>Farm direct</span>
        <span className="text-gold/20">&bull;</span>
        <span>Nitrogen-flushed</span>
        <span className="text-gold/20">&bull;</span>
        <span>Naturally gluten-free</span>
        <span className="text-gold/20">&bull;</span>
        <span>Small-batch roasted</span>
        <span className="text-gold/20">&bull;</span>
        <span>Farm direct</span>
        <span className="text-gold/20">&bull;</span>
        <span>Nitrogen-flushed</span>
        <span className="text-gold/20">&bull;</span>
        <span>Naturally gluten-free</span>
      </div>
    </div>
  )
}

function ClosingCTA() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight text-forest-deep mb-4">
            Ready to Try <span className="text-gold-gradient">Golden Deer</span>?
          </h2>
          <p className="text-sm sm:text-base text-forest-deep/60 max-w-lg mx-auto leading-relaxed mb-8">
            Whether you&apos;re buying your first pouch or your first container-load — we&apos;re here to help.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="gold-solid" href="/products">Shop the Range</Button>
            <Button variant="gold-outline" href="/bulk">Bulk &amp; Wholesale</Button>
          </div>
        </div>
      </Container>
    </section>
  )
}

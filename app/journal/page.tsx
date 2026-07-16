import Link from 'next/link'
import type { Metadata } from 'next'
import Image from 'next/image'
import { journal } from '@/content/journal'
import { Container, Tag } from '@/components/shared/primitives'
import { ChevronRight } from 'lucide-react'

const BASE_URL = 'https://www.cosmicpower.ltd'

const categories: Record<string, string> = {
  'golden-grain-ancient-superfood': 'Wellness',
  'from-wetlands-to-your-bowl': 'Behind the Scenes',
  '5-reasons-switch-to-makhana': 'Health',
  'makhana-for-every-diet': 'Nutrition',
  'art-of-slow-roasting': 'Craft',
  'beyond-bhujia-reinventing-indian-snacking': 'Culture',
  'why-nitrogen-flushed-packaging-matters': 'Quality',
}

export const metadata: Metadata = {
  title: 'Journal — Golden Deer',
  description:
    'Stories, insights, and deep dives into makhana — from farm to bowl. Explore the craft behind Golden Deer premium roasted fox nuts.',
  openGraph: {
    title: 'Journal — Golden Deer',
    description:
      'Stories, insights, and deep dives into makhana — from farm to bowl.',
    url: `${BASE_URL}/journal`,
    images: [
      {
        url: `${BASE_URL}/images/og/og-journal.jpg`,
        width: 1200,
        height: 630,
        alt: 'Golden Deer Journal',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Journal — Golden Deer',
    description: 'Stories, insights, and deep dives into makhana.',
    images: [`${BASE_URL}/images/og/og-journal.jpg`],
  },
  alternates: { canonical: `${BASE_URL}/journal` },
}

export default function JournalPage() {
  return (
    <Container className="py-8 sm:py-12">
      <nav
        className="flex items-center gap-1.5 text-xs sm:text-sm text-forest-deep/50 mb-8 flex-wrap"
        aria-label="Breadcrumb"
      >
        <Link href="/" className="hover:text-gold transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-forest-deep/80">Journal</span>
      </nav>

      <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight text-forest-deep mb-3">
        Journal
      </h1>
      <p className="text-base sm:text-lg text-forest-deep/60 leading-relaxed max-w-2xl mb-10">
        Stories, insights, and deep dives into the world of makhana — from
        Bihar&apos;s wetlands to your bowl.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {journal.map((entry) => (
          <Link
            key={entry.slug}
            href={`/journal/${entry.slug}`}
            className="group block"
          >
            <div className="relative aspect-4/3 rounded-xl overflow-hidden border border-white/5 group-hover:border-gold/30 transition-all">
              <Image
                src={entry.cover}
                alt=""
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="mt-3 space-y-2">
              <Tag variant="forest">
                {categories[entry.slug] || 'Journal'}
              </Tag>
              <h3 className="font-display text-lg text-forest-deep group-hover:text-gold transition-colors leading-tight">
                {entry.title}
              </h3>
              <p className="text-sm text-forest-deep/60 leading-relaxed line-clamp-2">
                {entry.excerpt}
              </p>
              <div className="flex items-center gap-3 text-xs text-forest-deep/40">
                <time dateTime={entry.date}>
                  {new Date(entry.date).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                <span aria-hidden="true">·</span>
                <span>{entry.readTime}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { Container, Tag } from '@/components/shared/primitives'
import { comparisons } from '@/content/comparisons'

const BASE_URL = 'https://www.cosmicpower.ltd'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Makhana vs Other Snacks — Honest Side-by-Side Comparisons | Golden Deer',
    description:
      'See how makhana stacks up against potato chips, popcorn, almonds, and peanuts across calories, protein, fat, fibre, minerals, and price. Honest comparisons that concede where the other snack wins.',
    openGraph: {
      title: 'Makhana vs Other Snacks — Honest Comparisons',
      description:
        'Calorie-by-calorie, nutrient-by-nutrient comparisons of makhana vs chips, popcorn, almonds, and peanuts.',
      url: `${BASE_URL}/makhana/vs`,
    },
    alternates: { canonical: `${BASE_URL}/makhana/vs` },
    keywords: ['makhana vs chips', 'makhana vs popcorn', 'makhana vs almonds', 'makhana vs peanuts', 'makhana comparison', 'healthy snacks comparison', 'makhana nutrition'],
  }
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      headline: 'Makhana vs Other Snacks — Honest Comparisons',
      description: 'Side-by-side comparisons of makhana vs potato chips, popcorn, almonds, and peanuts across calories, protein, fat, fibre, minerals, and price.',
      datePublished: '2026-07-16',
      dateModified: '2026-07-16',
      author: { '@type': 'Organization', name: 'Golden Deer', url: BASE_URL },
      publisher: { '@type': 'Organization', name: 'Golden Deer', url: BASE_URL },
      mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE_URL}/makhana/vs` },
    },
    {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/makhana/vs`,
      speakable: { '@type': 'SpeakableSpecification', cssSelector: ['.speakable-summary'] },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
        { '@type': 'ListItem', position: 2, name: 'Makhana Guide', item: `${BASE_URL}/makhana` },
        { '@type': 'ListItem', position: 3, name: 'Comparisons', item: `${BASE_URL}/makhana/vs` },
      ],
    },
  ],
}

export default function ComparisonsIndex() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-cream">
        <Container className="py-12 lg:py-20 max-w-4xl">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-forest-deep/50">
              <li><Link href="/" className="transition-colors hover:text-forest-deep/70">Home</Link></li>
              <li aria-hidden="true" className="text-forest-deep/20">/</li>
              <li><Link href="/makhana" className="transition-colors hover:text-forest-deep/70">Makhana Guide</Link></li>
              <li aria-hidden="true" className="text-forest-deep/20">/</li>
              <li className="text-forest-deep/70" aria-current="page">Comparisons</li>
            </ol>
          </nav>

          <Tag variant="forest" className="mb-4">Comparisons</Tag>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-tight text-forest-deep">
            Makhana vs Other Snacks
          </h1>
          <p className="mt-3 text-sm sm:text-base text-forest-deep/60 leading-relaxed max-w-2xl speakable-summary">
            Honest, fair, side-by-side comparisons that concede where the other snack wins.
            Every comparison has a clear verdict, a detailed analysis table, and a bottom line you
            can quote.
          </p>
          <p className="mt-1 text-xs text-forest-deep/40 font-mono">
            {comparisons.length} comparisons &middot; Last updated July 2026
          </p>

          <div className="mt-10 space-y-6">
            {comparisons.map((cmp) => (
              <Link
                key={cmp.slug}
                href={`/makhana/vs/${cmp.slug}`}
                className="block group -mx-3 p-4 rounded-xl transition-colors hover:bg-forest-deep/[0.02]"
              >
                <h2 className="font-display text-xl text-forest-deep group-hover:text-gold transition-colors">
                  {cmp.title}
                </h2>
                <p className="mt-2 text-sm text-forest-deep/80 leading-relaxed">
                  {cmp.quickAnswer}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="text-xs text-gold font-medium underline underline-offset-2">
                    Read the full comparison &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/[0.04] to-transparent text-center">
            <p className="text-sm text-forest-deep/70">
              <Link href="/makhana" className="text-gold underline underline-offset-2 font-medium">&larr; Back to Makhana Guide</Link>
              {' '}&middot;{' '}
              <Link href="/products" className="text-gold underline underline-offset-2 font-medium">Shop Golden Deer makhana</Link>
              {' '}&middot;{' '}
              <Link href="/makhana/nutrition" className="text-gold underline underline-offset-2 font-medium">Makhana Nutrition</Link>
            </p>
          </div>
        </Container>
      </main>
    </>
  )
}

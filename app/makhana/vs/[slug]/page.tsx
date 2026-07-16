import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Container, Tag } from '@/components/shared/primitives'
import { comparisons } from '@/content/comparisons'

const BASE_URL = 'https://www.cosmicpower.ltd'

export async function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const cmp = comparisons.find((c) => c.slug === slug)
  if (!cmp) return {}
  return {
    title: `${cmp.title} — Which Is Healthier? | Golden Deer`,
    description: cmp.quickAnswer.slice(0, 180),
    openGraph: {
      title: `${cmp.title} — Side-by-Side Comparison`,
      description: cmp.quickAnswer.slice(0, 180),
      url: `${BASE_URL}/makhana/vs/${slug}`,
    },
    alternates: { canonical: `${BASE_URL}/makhana/vs/${slug}` },
    keywords: [cmp.title.toLowerCase(), 'makhana comparison', 'makhana vs', 'healthy snacks comparison', cmp.slug.replace('-vs-', ' vs ')],
  }
}

export default async function ComparisonPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const cmp = comparisons.find((c) => c.slug === slug)
  if (!cmp) notFound()

  const disclaimer =
    'Approximate values — verify against lab analysis before on-pack claims'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: `${cmp.title} — Which Is Healthier?`,
        description: cmp.quickAnswer.slice(0, 200),
        datePublished: '2026-07-16',
        dateModified: '2026-07-16',
        author: { '@type': 'Organization', name: 'Golden Deer', url: BASE_URL },
        publisher: { '@type': 'Organization', name: 'Golden Deer', url: BASE_URL },
        mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE_URL}/makhana/vs/${cmp.slug}` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
          { '@type': 'ListItem', position: 2, name: 'Makhana Guide', item: `${BASE_URL}/makhana` },
          { '@type': 'ListItem', position: 3, name: 'Comparisons', item: `${BASE_URL}/makhana/vs` },
          { '@type': 'ListItem', position: 4, name: cmp.title, item: `${BASE_URL}/makhana/vs/${cmp.slug}` },
        ],
      },
    ],
  }

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
              <li><Link href="/makhana/vs" className="transition-colors hover:text-forest-deep/70">Comparisons</Link></li>
              <li aria-hidden="true" className="text-forest-deep/20">/</li>
              <li className="text-forest-deep/70" aria-current="page">{cmp.title}</li>
            </ol>
          </nav>

          <Tag variant="forest" className="mb-4">Comparison</Tag>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-tight text-forest-deep">
            {cmp.title}
          </h1>
          <p className="mt-1 text-xs text-forest-deep/40 font-mono">Honest comparison · July 2026</p>

          <div className="mt-8 p-6 rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/[0.05] to-transparent">
            <p className="text-sm sm:text-base text-forest-deep leading-relaxed font-medium">
              {cmp.quickAnswer}
            </p>
          </div>

          <section className="mt-10">
            <h2 className="font-display text-2xl text-forest-deep border-b border-gold/15 pb-2 mb-1">Side-by-Side Comparison</h2>
            <p className="text-xs text-forest-deep/40 italic mb-4">Per 100 g unless noted</p>
            <div className="overflow-x-auto border border-forest/10 rounded-xl">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-forest-deep/5 border-b border-forest/10">
                    <th className="text-left px-4 py-3 font-mono text-xs uppercase tracking-wider text-forest-deep/60">Attribute</th>
                    <th className="text-left px-4 py-3 font-mono text-xs uppercase tracking-wider text-gold/70">Makhana</th>
                    <th className="text-left px-4 py-3 font-mono text-xs uppercase tracking-wider text-forest-deep/60">{cmp.competitorName}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-forest/10">
                  {cmp.table.map((row, i) => (
                    <tr key={i} className="hover:bg-cream-dark/30 transition-colors">
                      <td className="px-4 py-3 font-semibold text-forest-deep whitespace-nowrap">{row.attribute}</td>
                      <td className="px-4 py-3 font-mono tabular-nums text-gold-deep">{row.makhana}</td>
                      <td className="px-4 py-3 font-mono tabular-nums text-forest-deep/70">{row.competitor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-forest-deep/40 italic mt-2">{disclaimer}</p>
          </section>

          <section className="mt-10">
            <h2 className="font-display text-2xl text-forest-deep border-b border-gold/15 pb-2 mb-4">Detailed Analysis</h2>
            {cmp.analysis.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-sm sm:text-base text-forest-deep/80 leading-relaxed mb-4 last:mb-0">
                {paragraph}
              </p>
            ))}
          </section>

          <div className="mt-8 p-6 rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/[0.04] to-transparent">
            <h3 className="font-display text-lg text-forest-deep mb-2">The Bottom Line</h3>
            <p className="text-sm sm:text-base text-forest-deep/80 leading-relaxed">{cmp.summary}</p>
          </div>

          {cmp.linkTo && (
            <div className="mt-8 p-4 rounded-xl border border-gold/20 bg-gold/[0.03]">
              <p className="text-sm text-forest-deep/70">
                <Link
                  href={cmp.linkTo.href}
                  className="text-gold underline underline-offset-2 font-medium"
                >
                  {cmp.linkTo.label} &rarr;
                </Link>
              </p>
            </div>
          )}

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/makhana/vs"
              className="text-sm text-forest-deep/60 hover:text-gold transition-colors underline underline-offset-2"
            >
              &larr; All Comparisons
            </Link>
            <Link
              href="/makhana"
              className="text-sm text-forest-deep/60 hover:text-gold transition-colors underline underline-offset-2"
            >
              &larr; Makhana Guide
            </Link>
            <Link
              href="/products"
              className="text-sm text-forest-deep/60 hover:text-gold transition-colors underline underline-offset-2"
            >
              Shop Golden Deer &rarr;
            </Link>
          </div>
        </Container>
      </main>
    </>
  )
}

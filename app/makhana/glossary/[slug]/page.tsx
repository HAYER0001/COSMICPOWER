import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Container, Tag } from '@/components/shared/primitives'
import { glossary } from '@/content/glossary'

const BASE_URL = 'https://www.cosmicpower.ltd'

export async function generateStaticParams() {
  return glossary.map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const term = glossary.find((g) => g.slug === slug)
  if (!term) return {}
  return {
    title: `What is ${term.term}? Meaning in Makhana / Fox Nuts | Golden Deer`,
    description: term.definition.slice(0, 180),
    openGraph: {
      title: `${term.term}${term.hindiTerm ? ` (${term.hindiTerm})` : ''} — Makhana Glossary`,
      description: term.definition.slice(0, 180),
      url: `${BASE_URL}/makhana/glossary/${slug}`,
    },
    alternates: { canonical: `${BASE_URL}/makhana/glossary/${slug}` },
    keywords: [term.term.toLowerCase(), term.hindiTerm || '', 'makhana', 'fox nuts', 'definition', 'meaning'],
  }
}

export default async function TermPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const term = glossary.find((g) => g.slug === slug)
  if (!term) notFound()

  const relatedTerms = term.relatedSlugs
    .map((slug) => glossary.find((g) => g.slug === slug))
    .filter(Boolean)
    .sort((a, b) => a!.term.localeCompare(b!.term))

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'DefinedTerm',
        '@id': `${BASE_URL}/makhana/glossary/${term.slug}#definedterm`,
        name: term.term,
        ...(term.hindiTerm ? { alternateName: term.hindiTerm } : {}),
        description: term.definition,
        url: `${BASE_URL}/makhana/glossary/${term.slug}`,
        inDefinedTermSet: `${BASE_URL}/makhana/glossary#definedtermset`,
        termCode: term.slug,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
          { '@type': 'ListItem', position: 2, name: 'Makhana Guide', item: `${BASE_URL}/makhana` },
          { '@type': 'ListItem', position: 3, name: 'Glossary', item: `${BASE_URL}/makhana/glossary` },
          { '@type': 'ListItem', position: 4, name: term.term, item: `${BASE_URL}/makhana/glossary/${term.slug}` },
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
              <li><Link href="/makhana/glossary" className="transition-colors hover:text-forest-deep/70">Glossary</Link></li>
              <li aria-hidden="true" className="text-forest-deep/20">/</li>
              <li className="text-forest-deep/70" aria-current="page">{term.term}</li>
            </ol>
          </nav>

          <Tag variant="forest" className="mb-4">Glossary Term</Tag>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-tight text-forest-deep">
            {term.term}
            {term.hindiTerm && (
              <span className="block text-2xl sm:text-3xl text-forest-deep/40 font-mono mt-1">
                {term.hindiTerm}
              </span>
            )}
          </h1>

          <div className="mt-8 p-6 rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/[0.05] to-transparent">
            <p className="text-sm sm:text-base text-forest-deep leading-relaxed font-medium">
              {term.definition}
            </p>
          </div>

          <div className="mt-8 text-sm sm:text-base text-forest-deep/80 leading-relaxed space-y-4">
            {term.elaboration.split('\n\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          {relatedTerms.length > 0 && (
            <section className="mt-10">
              <h2 className="font-display text-xl text-forest-deep border-b border-gold/15 pb-2 mb-4">
                Related Terms
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {relatedTerms.map((r) => (
                  <Link
                    key={r!.slug}
                    href={`/makhana/glossary/${r!.slug}`}
                    className="block p-4 rounded-xl border border-forest/10 transition-colors hover:border-gold/30 hover:bg-gold/[0.02]"
                  >
                    <span className="font-display text-base text-forest-deep">{r!.term}</span>
                    {r!.hindiTerm && (
                      <span className="text-sm text-forest-deep/40 font-mono ml-2">{r!.hindiTerm}</span>
                    )}
                    <p className="mt-1 text-sm text-forest-deep/60 leading-relaxed line-clamp-2">
                      {r!.definition}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {term.linkTo && (
            <div className="mt-8 p-4 rounded-xl border border-gold/20 bg-gold/[0.03]">
              <p className="text-sm text-forest-deep/70">
                <Link
                  href={term.linkTo.href}
                  className="text-gold underline underline-offset-2 font-medium"
                >
                  {term.linkTo.label} &rarr;
                </Link>
              </p>
            </div>
          )}

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/makhana/glossary"
              className="text-sm text-forest-deep/60 hover:text-gold transition-colors underline underline-offset-2"
            >
              &larr; All Glossary Terms
            </Link>
            <Link
              href="/makhana"
              className="text-sm text-forest-deep/60 hover:text-gold transition-colors underline underline-offset-2"
            >
              &larr; Makhana Guide
            </Link>
          </div>
        </Container>
      </main>
    </>
  )
}

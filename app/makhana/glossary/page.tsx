import type { Metadata } from 'next'
import Link from 'next/link'
import { Container, Tag } from '@/components/shared/primitives'
import { glossary } from '@/content/glossary'

const BASE_URL = 'https://www.cosmicpower.ltd'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Makhana Glossary — Terms, Definitions & Meanings | Golden Deer',
    description:
      'The definitive glossary of makhana (fox nuts) terminology — suta grades, lawa popping, thurri raw seeds, GI tags, clean label, nitrogen flushing, and every term you need to know about makhana production and trade.',
    openGraph: {
      title: 'Makhana Glossary — Terms, Definitions & Meanings',
      description:
        'Every term used in makhana production, grading, and trade defined precisely for buyers, sellers, and enthusiasts.',
      url: `${BASE_URL}/makhana/glossary`,
    },
    alternates: { canonical: `${BASE_URL}/makhana/glossary` },
    keywords: [
      'makhana glossary', 'makhana terms', 'makhana definitions', 'suta meaning', 'lawa makhana',
      'thurri meaning', 'fox nuts glossary', 'phool makhana meaning', 'makhana terminology',
    ],
  }
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTermSet',
  '@id': `${BASE_URL}/makhana/glossary#definedtermset`,
  name: 'Makhana Glossary — Terms, Definitions & Meanings',
  description: 'Every term used in makhana production, grading, and trade defined precisely.',
  url: `${BASE_URL}/makhana/glossary`,
  hasDefinedTerm: glossary.map((g) => ({
    '@type': 'DefinedTerm',
    '@id': `${BASE_URL}/makhana/glossary/${g.slug}#definedterm`,
    name: g.term,
    description: g.definition,
    ...(g.hindiTerm ? { alternateName: g.hindiTerm } : {}),
    url: `${BASE_URL}/makhana/glossary/${g.slug}`,
    inDefinedTermSet: `${BASE_URL}/makhana/glossary#definedtermset`,
  })),
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['.speakable-summary'] },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Makhana Guide', item: `${BASE_URL}/makhana` },
      { '@type': 'ListItem', position: 3, name: 'Glossary', item: `${BASE_URL}/makhana/glossary` },
    ],
  },
}

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

export default function GlossaryIndex() {
  const groups = letters
    .map((letter) => ({
      letter,
      terms: glossary
        .filter((g) => g.term.toUpperCase().startsWith(letter))
        .sort((a, b) => a.term.localeCompare(b.term)),
    }))
    .filter((g) => g.terms.length > 0)

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
              <li className="text-forest-deep/70" aria-current="page">Glossary</li>
            </ol>
          </nav>

          <Tag variant="forest" className="mb-4">Reference</Tag>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-tight text-forest-deep">
            Makhana Glossary
          </h1>
          <p className="mt-3 text-sm sm:text-base text-forest-deep/60 leading-relaxed max-w-2xl speakable-summary">
            Every term used in makhana production, grading, and trade — defined precisely for
            buyers, sellers, cooks, and anyone who wants to understand makhana beyond the pack label.
          </p>
          <p className="mt-1 text-xs text-forest-deep/40 font-mono">
            {glossary.length} terms &middot; Last updated July 2026
          </p>

          <nav className="my-8 flex flex-wrap gap-2" aria-label="Alphabetical index">
            {letters.map((l) => {
              const hasTerms = groups.some((g) => g.letter === l)
              return hasTerms ? (
                <a
                  key={l}
                  href={`#letter-${l}`}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-forest-deep/5 text-forest-deep/70 text-sm font-mono font-medium transition-colors hover:bg-gold/20 hover:text-gold-deep"
                >
                  {l}
                </a>
              ) : (
                <span
                  key={l}
                  className="w-9 h-9 flex items-center justify-center rounded-lg text-forest-deep/15 text-sm font-mono"
                >
                  {l}
                </span>
              )
            })}
          </nav>

          <div className="space-y-12">
            {groups.map(({ letter, terms }) => (
              <section key={letter} id={`letter-${letter}`} className="scroll-mt-24">
                <h2 className="font-display text-2xl text-forest-deep border-b border-gold/15 pb-2 mb-5">
                  {letter}
                </h2>
                <div className="space-y-5">
                  {terms.map((g) => (
                    <article key={g.slug} id={g.slug} className="scroll-mt-28">
                      <Link
                        href={`/makhana/glossary/${g.slug}`}
                        className="group block -mx-3 p-3 rounded-xl transition-colors hover:bg-forest-deep/[0.02]"
                      >
                        <h3 className="font-display text-lg text-forest-deep group-hover:text-gold transition-colors">
                          {g.term}
                          {g.hindiTerm && (
                            <span className="text-base text-forest-deep/40 font-mono ml-2">
                              {g.hindiTerm}
                            </span>
                          )}
                        </h3>
                        <p className="mt-1 text-sm text-forest-deep/80 leading-relaxed">
                          {g.definition}
                        </p>
                        {g.relatedSlugs.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {g.relatedSlugs.map((rs) => {
                              const related = glossary.find((t) => t.slug === rs)
                              return related ? (
                                <span
                                  key={rs}
                                  className="text-xs text-forest-deep/40 font-mono"
                                >
                                  {related.term}
                                </span>
                              ) : null
                            })}
                          </div>
                        )}
                      </Link>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/[0.04] to-transparent text-center">
            <p className="text-sm text-forest-deep/70">
              <Link href="/makhana" className="text-gold underline underline-offset-2 font-medium">&larr; Back to Makhana Guide</Link>
              {' '}&middot;{' '}
              <Link href="/products" className="text-gold underline underline-offset-2 font-medium">Shop Golden Deer makhana</Link>
            </p>
          </div>
        </Container>
      </main>
    </>
  )
}

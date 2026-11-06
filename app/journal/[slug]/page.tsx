import Link from 'next/link'
import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { journal } from '@/content/journal'
import { getJournalMarkdown } from '@/content/journal-source'

import { Container } from '@/components/shared/primitives'
import JournalArticleClient from '@/components/journal/JournalArticleClient'
import JournalMarkdown from '@/components/journal/JournalMarkdown'
import { ChevronRight } from 'lucide-react'

const BASE_URL = 'https://www.cosmicpower.ltd'

export function generateStaticParams() {
  return journal.map((e) => ({ slug: e.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const entry = journal.find((e) => e.slug === slug)
  if (!entry) notFound()

  const title = `${entry.title} — Golden Deer Journal`
  const description = entry.excerpt.slice(0, 160)
  const coverUrl = `${BASE_URL}${entry.cover}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        { url: coverUrl, width: 1200, height: 900, alt: entry.title },
      ],
      type: 'article',
      publishedTime: entry.date,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [coverUrl],
    },
    alternates: {
      canonical: `${BASE_URL}/journal/${slug}`,
    },
  }
}

export default async function JournalArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const entry = journal.find((e) => e.slug === slug)

  if (!entry) notFound()

  const markdown = getJournalMarkdown(slug)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: entry.title,
        description: entry.excerpt,
        image: `${BASE_URL}${entry.cover}`,
        datePublished: entry.date,
        dateModified: entry.date,
        author: {
          '@type': 'Organization',
          name: 'Golden Deer',
          url: BASE_URL,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Golden Deer',
          url: BASE_URL,
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${BASE_URL}/journal/${entry.slug}`,
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Journal',
            item: `${BASE_URL}/journal`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: entry.title,
            item: `${BASE_URL}/journal/${entry.slug}`,
          },
        ],
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container className="py-8 sm:py-12 pb-24 sm:pb-16">
        <nav
          className="flex items-center gap-1.5 text-xs sm:text-sm text-forest-deep/50 mb-8 flex-wrap"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-gold transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/journal" className="hover:text-gold transition-colors">
            Journal
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-forest-deep/80 truncate max-w-[250px]">
            {entry.title}
          </span>
        </nav>

        <div data-article-progress>
          {/* Cover Image */}
          <div className="relative aspect-16/9 rounded-2xl overflow-hidden border border-gold/15 bg-cream-dark/50 mb-8">
            <Image
              src={entry.cover}
              alt=""
              fill
              className="object-contain p-4 sm:p-8"
              sizes="(max-width: 1024px) 100vw, 80rem"
              priority
            />
          </div>

          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <header className="mb-8">
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight text-forest-deep mb-4">
                {entry.title}
              </h1>
              <div className="flex items-center gap-3 text-sm text-forest-deep/50">
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
            </header>

            <JournalArticleClient entry={entry}>
              {markdown ? <JournalMarkdown source={markdown} /> : null}
            </JournalArticleClient>
          </div>
        </div>
      </Container>
    </>
  )
}

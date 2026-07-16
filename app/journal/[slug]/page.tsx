import Link from 'next/link'
import type { Metadata } from 'next'
import Image from 'next/image'
import { journal } from '@/content/journal'

import { Container } from '@/components/shared/primitives'
import JournalArticleClient from '@/components/journal/JournalArticleClient'
import { ChevronRight } from 'lucide-react'

const BASE_URL = 'https://goldendeer.in'

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
  if (!entry) return { title: 'Article not found — Golden Deer' }

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

  if (!entry) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl text-forest-deep">Article not found</h1>
        <Link
          href="/journal"
          className="mt-6 inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium tracking-wide border border-gold text-gold hover:bg-gold hover:text-forest-deep transition-all rounded-lg"
        >
          Back to Journal
        </Link>
      </div>
    )
  }

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

        {/* Cover Image */}
        <div className="relative aspect-16/9 rounded-2xl overflow-hidden border border-white/5 mb-8">
          <Image
            src={entry.cover}
            alt=""
            fill
            className="object-cover"
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

          <JournalArticleClient entry={entry} />
        </div>
      </Container>
    </>
  )
}

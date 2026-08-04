import type { Metadata } from 'next'
import Link from 'next/link'
import { faq } from '@/content/faq'
import { Container } from '@/components/shared/primitives'
import FAQAccordion from '@/components/faq/FAQAccordion'

const BASE_URL = 'https://www.cosmicpower.ltd'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Frequently Asked Questions — Golden Deer Makhana',
    description:
      'Everything you want to know about Golden Deer by Cosmic Power Pvt. Ltd.: hand-popped makhana (fox nuts), nutrition, storage, bulk ordering, roasting and more.',
    openGraph: {
      title: 'FAQ — Golden Deer Premium Hand-Popped Makhana (Fox Nuts)',
      description: 'Find answers about Golden Deer makhana — nutrition, storage, bulk ordering, and more.',
    },
    alternates: { canonical: `${BASE_URL}/faq` },
  }
}

function Breadcrumb() {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex items-center gap-2 text-sm text-forest-deep/50">
        <li><Link href="/" className="transition-colors hover:text-forest-deep/70">Home</Link></li>
        <li aria-hidden="true" className="text-forest-deep/20">/</li>
        <li className="text-forest-deep/70" aria-current="page">FAQ</li>
      </ol>
    </nav>
  )
}

const consumerFaqs = faq.filter((f) => f.category === 'consumer')
const bulkFaqs = faq.filter((f) => f.category === 'bulk')

export default function FAQPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container className="py-20 lg:py-28">
        <Breadcrumb />
        <span className="inline-block text-xs font-semibold tracking-[0.15em] uppercase text-gold mb-3">
          FAQ
        </span>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-tight text-forest-deep">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 text-base sm:text-lg text-forest-deep/60 leading-relaxed max-w-2xl">
          Everything you need to know about Golden Deer premium makhana — from snacking tips to bulk orders.
        </p>

        <p className="mt-4 text-sm text-forest-deep/60">
              For a comprehensive guide to makhana — fox nuts, grades explained, nutrition table, health benefits, how to roast at home, buying checklist, and cultural significance — see the{' '}
              <Link href="/makhana" className="underline underline-offset-2 text-gold/80 hover:text-gold transition-colors">Makhana Guide</Link>.
            </p>
        <div className="mt-12 max-w-3xl space-y-12">
          <FAQAccordion items={consumerFaqs} title="For Snackers" />
          <FAQAccordion items={bulkFaqs} title="For Bulk Buyers" />
        </div>
      </Container>
    </>
  )
}

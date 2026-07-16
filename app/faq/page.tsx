import type { Metadata } from 'next'
import Link from 'next/link'
import { faq } from '@/content/faq'
import { Container, SectionHeading } from '@/components/shared/primitives'
import FAQAccordion from '@/components/faq/FAQAccordion'
import BackgroundWrapper from '@/components/three/BackgroundWrapper'

const BASE_URL = 'https://www.cosmicpower.ltd'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Frequently Asked Questions — Golden Deer',
    description:
      'Got questions about Golden Deer premium roasted makhana? Find answers about our products, bulk ordering, nutrition, storage, and more.',
    openGraph: {
      title: 'Frequently Asked Questions — Golden Deer',
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
      <BackgroundWrapper>
      <Container className="py-20 lg:py-28">
        <Breadcrumb />
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          lede="Everything you need to know about Golden Deer premium roasted makhana — from snacking tips to bulk orders."
        />

        <div className="mt-12 max-w-3xl space-y-12">
          <FAQAccordion items={consumerFaqs} title="For Snackers" />
          <FAQAccordion items={bulkFaqs} title="For Bulk Buyers" />
        </div>
      </Container>
      </BackgroundWrapper>
    </>
  )
}

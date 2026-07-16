import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/shared/primitives'
import { site } from '@/content/site'

const BASE_URL = 'https://www.cosmicpower.ltd'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Editorial Policy — Golden Deer by Cosmic Power Pvt. Ltd.',
    description:
      'Who writes Golden Deer content, our accuracy standard for nutrition and product claims, and how to report a correction or concern.',
    openGraph: {
      title: 'Editorial Policy — Golden Deer',
      description: 'Our accuracy standard for content on cosmicpower.ltd.',
      url: `${BASE_URL}/editorial-policy`,
    },
    alternates: { canonical: `${BASE_URL}/editorial-policy` },
  }
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/editorial-policy`,
      name: 'Editorial Policy — Golden Deer',
      description: 'Who writes Golden Deer content, our accuracy standard for nutrition and product claims, and how to report a correction.',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
        { '@type': 'ListItem', position: 2, name: 'Editorial Policy', item: `${BASE_URL}/editorial-policy` },
      ],
    },
  ],
}

export default function EditorialPolicyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-cream">
        <Container className="py-12 lg:py-20 max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-forest-deep/50">
              <li><Link href="/" className="transition-colors hover:text-forest-deep/70">Home</Link></li>
              <li aria-hidden="true" className="text-forest-deep/20">/</li>
              <li className="text-forest-deep/70" aria-current="page">Editorial Policy</li>
            </ol>
          </nav>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight text-forest-deep">
            Editorial Policy
          </h1>
          <p className="mt-1 text-xs text-forest-deep/40 font-mono">Last updated July 2026</p>

          <Section title="Who writes our content">
            <p>
              All content on this website — including product descriptions, nutrition references,
              the makhana guide, glossary terms, comparisons, journal articles, recipes, and the
            brand fact sheet — is written and reviewed by the <strong>Cosmic Power Editorial Team</strong>.
            Our editorial team includes professionals with backgrounds in food science, nutrition
            communication, and agricultural journalism based in Bihar and New Delhi.
            </p>
            <p>
              Content is drafted, fact-checked for internal consistency, and reviewed before
              publication. Every substantive page records its last-updated date in its metadata
              and footer.
            </p>
          </Section>

          <Section title="Accuracy standard — nutrition and health claims">
            <p>
              Nutrition figures published on this site (per-100g and per-serving values) are
              <strong>approximate values drawn from published USDA and NIN (National Institute of
              Nutrition, India) databases</strong>. These are not laboratory analyses of any specific
              batch unless explicitly stated. Every product pack carries a nutrition panel
              generated from batch-level lab testing — that panel is the authoritative source
              for that specific batch.
            </p>
            <p>
              We do not make medical claims. Statements about health benefits (heart health,
              diabetes management, weight loss, etc.) are based on published nutritional research
              and traditional knowledge. They are not medical advice. Always consult a qualified
              healthcare professional for personalised dietary or medical recommendations.
            </p>
          </Section>

          <Section title="Correction and contact">
            <p>
              If you find an error, omission, or claim you believe is misleading, please contact us:
            </p>
            <p className="text-gold font-medium">{site.contact.email}</p>
            <p>
              We aim to review and respond to every accuracy concern within 5 business days.
              Verified errors are corrected and the page&apos;s last-updated date is incremented.
            </p>
          </Section>
        </Container>
      </main>
    </>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8 mb-8">
      <h2 className="font-display text-xl sm:text-2xl text-forest-deep mb-3 border-b border-gold/15 pb-1">{title}</h2>
      <div className="space-y-3 text-sm sm:text-base text-forest-deep/80 leading-relaxed">{children}</div>
    </section>
  )
}

import { site } from '@/content/site'

const BASE_URL = 'https://www.cosmicpower.ltd'

export default function WebSiteSchema() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    name: site.lockup,
    url: BASE_URL,
    description:
      'Premium hand-popped makhana (fox nuts / phool makhana) — clean-label, high-protein, naturally gluten-free. Sourced from the Gangetic wetlands of Bihar, India.',
    publisher: {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: site.legal.company,
      logo: `${BASE_URL}/images/logo.png`,
    },
    inLanguage: 'en-IN',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

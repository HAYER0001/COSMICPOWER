import { site } from '@/content/site'

const BASE_URL = 'https://goldendeer.in'

export default function WebSiteSchema() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: BASE_URL,
    description:
      'Premium roasted makhana — clean-label, high-protein, naturally gluten-free. Sustainably sourced from pristine wetlands.',
    publisher: {
      '@type': 'Organization',
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

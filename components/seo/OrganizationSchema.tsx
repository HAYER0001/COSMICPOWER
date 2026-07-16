import { site } from '@/content/site'

const BASE_URL = 'https://www.cosmicpower.ltd'

export default function OrganizationSchema() {
  const sameAs = [
    site.socials.instagram,
    site.socials.youtube,
    site.socials.linkedin,
  ].filter((url) => url !== 'ADD_URL')

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    legalName: site.legal.company,
    name: site.name,
    url: BASE_URL,
    logo: `${BASE_URL}/images/logo.png`,
    description:
      'Premium roasted makhana brand — clean-label, high-protein, naturally gluten-free snacks. Owned by Cosmic Power Pvt. Ltd.',
    sameAs: sameAs.length > 0 ? sameAs : undefined,
    identifier: site.legal.cin,
    taxID: site.legal.gstin,
    duns: site.legal.msme,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

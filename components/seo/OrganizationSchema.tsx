import { site } from '@/content/site'

const BASE_URL = 'https://www.cosmicpower.ltd'
const l = site.legal

export default function OrganizationSchema() {
  const sameAs = [
    site.socials.instagram,
    site.socials.youtube,
    site.socials.linkedin,
    site.commerce.amazon,
    site.commerce.flipkart,
    site.commerce.blinkit,
    site.commerce.zepto,
    site.googleBusinessProfile,
  ].filter((url) => typeof url === 'string' && url !== 'ADD_URL')

  const identifiers = [
    { propertyID: 'FSSAI', value: l.fssaiLicense, url: `${BASE_URL}/brand` },
    { propertyID: 'CIN', value: l.cin },
    { propertyID: 'GSTIN', value: l.gstin },
    { propertyID: 'Startup India', value: l.startupIndia },
    { propertyID: 'MSME (Udyam)', value: l.msme },
  ].map((i) => ({
    '@type': 'PropertyValue',
    propertyID: i.propertyID,
    value: i.value,
    ...(i.url ? { url: i.url } : {}),
  }))

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BASE_URL}/#organization`,
    name: l.company,
    alternateName: [site.lockup, site.name, 'Cosmic Power', 'Golden Deer Makhana'],
    url: BASE_URL,
    logo: {
      '@type': 'ImageObject',
      '@id': `${BASE_URL}/#logo`,
      url: `${BASE_URL}/images/logo.png`,
      width: 512,
      height: 512,
      caption: 'Golden Deer — premium hand-popped makhana (fox nuts) brand logo',
    },
    description:
      'Golden Deer by Cosmic Power Pvt. Ltd. is a premium hand-popped makhana (fox nuts / phool makhana, Euryale ferox) snack brand from Masaurhi, Bihar, India. Clean-label roasted makhana for retail and jumbo-grade raw makhana for bulk supply.',
    foundingDate: '2026',
    brand: {
      '@type': 'Brand',
      '@id': `${BASE_URL}/#brand`,
      name: 'Golden Deer',
      logo: `${BASE_URL}/images/logo.png`,
      slogan: site.tagline,
    },
    knowsAbout: [
      'Makhana',
      'Fox nuts',
      'Phool makhana',
      'Euryale ferox',
      'Gorgon nut',
      'Healthy snacks',
      'Roasted makhana',
      'Bihar agri produce',
      'Mithila Makhana GI',
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: l.address,
      addressLocality: site.locality,
      addressRegion: site.region,
      postalCode: '804452',
      addressCountry: site.isoCountry,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: site.contact.email,
      telephone: site.contact.whatsappNumber,
      contactType: 'customer service',
      availableLanguage: ['English', 'Hindi'],
    },
    identifier: identifiers,
    hasCertification: {
      '@type': 'Certification',
      name: 'ISO 9001:2015 Quality Management System',
      certificationIdentification: 'E20260750767',
      issuedBy: { '@type': 'Organization', name: 'Audittech Certification (CAB #1190)' },
    },
    areaServed: { '@type': 'Country', name: site.country },
    ...(sameAs.length > 0 ? { sameAs } : {}),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { site } from '@/content/site'
import { Container, SectionHeading } from '@/components/shared/primitives'

const BASE_URL = 'https://www.cosmicpower.ltd'
const LAST_UPDATED = '15 April 2026'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Terms of Service — Golden Deer',
    description:
      'Golden Deer terms of service. Understand your rights and obligations when using the Golden Deer website, content, and services by Cosmic Power Pvt. Ltd.',
    openGraph: {
      title: 'Terms of Service — Golden Deer',
      description: 'Terms governing your use of the Golden Deer website.',
    },
    alternates: { canonical: `${BASE_URL}/terms` },
  }
}

function Breadcrumb() {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex items-center gap-2 text-sm text-forest-deep/50">
        <li><Link href="/" className="transition-colors hover:text-forest-deep/70">Home</Link></li>
        <li aria-hidden="true" className="text-forest-deep/20">/</li>
        <li className="text-forest-deep/70" aria-current="page">Terms of Service</li>
      </ol>
    </nav>
  )
}

export default function TermsPage() {
  const email = site.contact.email

  return (
    <Container className="py-20 lg:py-28">
      <Breadcrumb />
      <SectionHeading
        title="Terms of Service"
        lede={`Last updated: ${LAST_UPDATED}`}
      />

      <div className="mt-12 max-w-3xl space-y-6 text-sm text-forest-deep/65 leading-relaxed">
        <p>
          These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the Golden Deer website (cosmicpower.ltd)
          operated by <strong className="text-forest-deep/80">{site.legal.company}</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;).
          By accessing or using this website, you agree to be bound by these Terms. If you do not agree, please
          discontinue use of the site immediately.
        </p>

        <h2 className="font-display text-xl text-forest-deep pt-4">1. Content Ownership</h2>
        <p>
          All content on this website including text, images, logos, videos, product descriptions, recipes,
          graphics, and design elements is the intellectual property of {site.legal.company} unless otherwise
          attributed. You may not reproduce, distribute, modify, create derivative works from, or commercially
          exploit any content without our prior written consent.
        </p>
        <p>
          You are granted a limited, non-exclusive, non-transferable license to access and view the content for
          personal, non-commercial use. Any unauthorised use of the content may violate copyright, trademark, and
          other applicable laws.
        </p>

        <h2 className="font-display text-xl text-forest-deep pt-4">2. Acceptable Use</h2>
        <p>
          You agree to use this website only for lawful purposes and in a manner that does not infringe the rights
          of, or restrict the use of, this site by any third party. Prohibited activities include:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Attempting to gain unauthorised access to our systems or user data.</li>
          <li>Transmitting malware, viruses, or any harmful code.</li>
          <li>Engaging in any activity that disrupts or interferes with the website&rsquo;s functionality.</li>
          <li>Using automated tools (scrapers, bots, crawlers) to extract data without permission.</li>
        </ul>

        <h2 className="font-display text-xl text-forest-deep pt-4">3. Product Information &amp; Orders</h2>
        <p>
          Product images, descriptions, nutritional information, and pricing on this website are provided for
          informational purposes. We make every effort to ensure accuracy, but minor variations in colour,
          packaging, and nutritional values may occur. We reserve the right to update product information without
          prior notice.
        </p>
        <p>
          <strong className="text-forest-deep/80">Important:</strong> The Golden Deer website does not function as an
          e-commerce storefront for direct purchases. Retail orders are fulfilled exclusively through third-party
          quick-commerce platforms including Blinkit, Zepto, and Amazon. Listings, pricing, and availability on
          those platforms are governed by their respective terms. Any product information displayed on this site
          does not constitute a contractual offer for sale. Bulk and wholesale orders placed through our inquiry
          form are subject to a separate agreement confirmed via purchase order.
        </p>

        <h2 className="font-display text-xl text-forest-deep pt-4">4. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by applicable Indian law, {site.legal.company} shall not be liable for any
          indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use
          of this website, its content, or any products purchased through third-party platforms. Our total liability
          for any claim arising from the use of this website shall not exceed INR 1,000.
        </p>

        <h2 className="font-display text-xl text-forest-deep pt-4">5. Governing Law &amp; Jurisdiction</h2>
        <p>
          These Terms are governed by and construed in accordance with the laws of India. Any disputes arising
          out of or relating to these Terms or your use of the website shall be subject to the exclusive
          jurisdiction of the courts in Patna, Bihar.
        </p>

        <h2 className="font-display text-xl text-forest-deep pt-4">6. Dispute Resolution</h2>
        <p>
          In the event of a dispute, we encourage you to contact us first to seek an amicable resolution. If the
          dispute cannot be resolved within 30 days of initial contact, it shall be settled by arbitration in
          accordance with the Arbitration and Conciliation Act, 1996. The arbitration shall be conducted in Patna,
          Bihar, and the language of proceedings shall be English.
        </p>

        <h2 className="font-display text-xl text-forest-deep pt-4">7. Amendments</h2>
        <p>
          We reserve the right to modify these Terms at any time. Changes will be effective immediately upon
          posting on this page with an updated &ldquo;Last updated&rdquo; date. Your continued use of the website
          after any modifications constitutes acceptance of the revised Terms. We encourage you to review this page
          periodically.
        </p>

        <h2 className="font-display text-xl text-forest-deep pt-4">8. Contact</h2>
        <p>
          If you have any questions about these Terms, please contact us at{' '}
          <a href={`mailto:${email}`} className="text-gold transition-colors hover:text-gold-light">{email}</a>.
        </p>
      </div>
    </Container>
  )
}

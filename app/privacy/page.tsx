import type { Metadata } from 'next'
import Link from 'next/link'
import { site } from '@/content/site'
import { Container, SectionHeading } from '@/components/shared/primitives'

const BASE_URL = 'https://www.cosmicpower.ltd'
const LAST_UPDATED = '15 April 2026'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Privacy Policy — Golden Deer',
    description:
      'Golden Deer privacy policy. Learn how Cosmic Power Pvt. Ltd. collects, uses, and protects your personal data when you visit our website or contact us.',
    openGraph: {
      title: 'Privacy Policy — Golden Deer',
      description: 'How Golden Deer handles your personal data.',
    },
    alternates: { canonical: `${BASE_URL}/privacy` },
  }
}

function Breadcrumb() {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex items-center gap-2 text-sm text-forest-deep/50">
        <li><Link href="/" className="transition-colors hover:text-forest-deep/70">Home</Link></li>
        <li aria-hidden="true" className="text-forest-deep/20">/</li>
        <li className="text-forest-deep/70" aria-current="page">Privacy Policy</li>
      </ol>
    </nav>
  )
}

export default function PrivacyPage() {
  const email = site.contact.email

  return (
    <Container className="py-20 lg:py-28">
      <Breadcrumb />
      <SectionHeading
        title="Privacy Policy"
        lede={`Last updated: ${LAST_UPDATED}`}
      />

      <div className="mt-12 max-w-3xl space-y-6 text-sm text-forest-deep/65 leading-relaxed">
        <p>
          <strong className="text-forest-deep/80">{site.legal.company}</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or
          &ldquo;our&rdquo;) operates the Golden Deer website (<Link href="/" className="text-gold transition-colors hover:text-gold-light">cosmicpower.ltd</Link>).
          This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when
          you visit our website or interact with us.
        </p>

        <h2 className="font-display text-xl text-forest-deep pt-4">1. Information We Collect</h2>
        <p>
          <strong className="text-forest-deep/80">Information you provide voluntarily:</strong> When you fill out our
          contact form, bulk inquiry form, or send us an email, we collect your name, email address, phone number,
          company name, and any details you include in your message.
        </p>
        <p>
          <strong className="text-forest-deep/80">Information collected automatically:</strong> We use Google Analytics 4
          (GA4) to collect anonymised usage data including pages visited, time spent, referring URLs, device type,
          and browser information. This data is aggregated and does not personally identify you. We do not use
          cookies for personalised advertising or third-party tracking.
        </p>

        <h2 className="font-display text-xl text-forest-deep pt-4">2. How We Use Your Information</h2>
        <p>We use the information we collect for the following purposes:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>To respond to your inquiries, comments, or bulk order requests.</li>
          <li>To improve our website experience and understand how visitors interact with our content.</li>
          <li>To comply with legal obligations and enforce our terms of service.</li>
          <li>To send administrative communications if you have contacted us.</li>
        </ul>

        <h2 className="font-display text-xl text-forest-deep pt-4">3. Data Processors</h2>
        <p>We use the following third-party services to process data:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong className="text-forest-deep/80">Google Analytics 4</strong> &mdash; anonymised website analytics.
            Data is processed in accordance with Google&rsquo;s privacy policy.
          </li>
          <li>
            <strong className="text-forest-deep/80">Resend</strong> &mdash; transactional email delivery for
            inquiry-related correspondence.
          </li>
        </ul>
        <p>
          We do not sell, rent, or trade your personal information to third parties. Your data is shared only with
          the processors listed above and only to the extent necessary to provide our services.
        </p>

        <h2 className="font-display text-xl text-forest-deep pt-4">4. Data Retention</h2>
        <p>
          We retain your personal data only as long as necessary to fulfil the purposes described in this policy,
          or as required by applicable Indian law. Inquiry-related data is retained for up to 24 months after the
          last communication. Analytics data is retained in accordance with GA4&rsquo;s default retention settings.
        </p>

        <h2 className="font-display text-xl text-forest-deep pt-4">5. Your Rights</h2>
        <p>
          Under the Information Technology Act, 2000 and the Digital Personal Data Protection Act, 2023, you have
          the right to:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Access the personal data we hold about you.</li>
          <li>Request correction of inaccurate or incomplete data.</li>
          <li>Request erasure of your personal data, subject to legal retention obligations.</li>
          <li>Withdraw consent for data processing where consent was the legal basis.</li>
        </ul>
        <p>
          To exercise any of these rights, contact us at{' '}
          <a href={`mailto:${email}`} className="text-gold transition-colors hover:text-gold-light">{email}</a>.
        </p>

        <h2 className="font-display text-xl text-forest-deep pt-4">6. Third-Party Links</h2>
        <p>
          Our website contains links to third-party platforms including Blinkit, Zepto, Amazon, WhatsApp, and
          social media channels. This Privacy Policy does not apply to those platforms. We encourage you to review
          their respective privacy policies before providing them with your data.
        </p>

        <h2 className="font-display text-xl text-forest-deep pt-4">7. Cookies</h2>
        <p>
          This website uses essential cookies required for basic functionality and GA4 analytics cookies for
          anonymised usage tracking. You can control cookie preferences through your browser settings. Disabling
          analytics cookies will not affect the core functionality of the website.
        </p>

        <h2 className="font-display text-xl text-forest-deep pt-4">8. Security</h2>
        <p>
          We implement reasonable technical and organisational measures to protect your personal data against
          unauthorised access, alteration, disclosure, or destruction. Our website is served over HTTPS, and we
          restrict access to personal data to authorised personnel only.
        </p>

        <h2 className="font-display text-xl text-forest-deep pt-4">9. Contact</h2>
        <p>
          If you have any questions about this Privacy Policy or wish to exercise your data protection rights,
          please contact us at{' '}
          <a href={`mailto:${email}`} className="text-gold transition-colors hover:text-gold-light">{email}</a>.
        </p>
      </div>
    </Container>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { site } from '@/content/site'
import { Container, SectionHeading } from '@/components/shared/primitives'

const BASE_URL = 'https://goldendeer.in'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Contact — Golden Deer',
    description:
      'Get in touch with Golden Deer. Email, WhatsApp, or reach us through our bulk & wholesale inquiry page. We respond within 1 business day.',
    openGraph: {
      title: 'Contact — Golden Deer',
      description: 'Get in touch with Golden Deer. We respond within 1 business day.',
    },
    alternates: { canonical: `${BASE_URL}/contact` },
  }
}

function Breadcrumb() {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex items-center gap-2 text-sm text-forest-deep/50">
        <li><Link href="/" className="transition-colors hover:text-forest-deep/70">Home</Link></li>
        <li aria-hidden="true" className="text-forest-deep/20">/</li>
        <li className="text-forest-deep/70" aria-current="page">Contact</li>
      </ol>
    </nav>
  )
}

interface ContactCardProps {
  label: string
  children: React.ReactNode
}

function ContactCard({ label, children }: ContactCardProps) {
  return (
    <div className="rounded-lg border border-gold/10 bg-cream-dark p-6 space-y-2">
      <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-gold">{label}</h3>
      <div className="text-sm text-forest-deep/70 leading-relaxed">{children}</div>
    </div>
  )
}

export default function ContactPage() {
  const email = site.contact.email
  const whatsapp = site.contact.whatsappNumber

  return (
    <Container className="py-20 lg:py-28">
      <Breadcrumb />
      <SectionHeading
        eyebrow="Get in Touch"
        title="We&rsquo;d love to hear from you"
        lede="Whether you are a snack lover, a business partner, or just curious — drop us a message and we will get back to you within 1 business day."
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 max-w-4xl">
        <ContactCard label="Email">
          <a href={`mailto:${email}`} className="text-forest-deep transition-colors hover:text-gold">
              {email}
            </a>
        </ContactCard>

        <ContactCard label="WhatsApp">
          {whatsapp !== 'ADD_WHATSAPP_NUMBER' ? (
            <a
              href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-forest-deep transition-colors hover:text-gold"
            >
              Chat on WhatsApp
            </a>
          ) : (
            <span className="text-forest-deep/40 italic">ADD_WHATSAPP_NUMBER</span>
          )}
        </ContactCard>

        <ContactCard label="Bulk &amp; Wholesale">
          <p className="mb-3">
            For distributor, retailer, HoReCa, corporate gifting, or export inquiries.
          </p>
          <Link
            href="/bulk"
            className="inline-flex items-center gap-1 text-gold transition-colors hover:text-gold-light"
          >
            Visit Bulk Inquiry page &rarr;
          </Link>
        </ContactCard>

        <ContactCard label="Registered Office">
          <p>{site.legal.address}</p>
        </ContactCard>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 max-w-4xl">
        <ContactCard label="Business Hours">
          <p>Monday – Saturday</p>
          <p>10:00 AM – 6:00 PM (IST)</p>
          <p className="text-forest-deep/40 text-xs mt-1">Closed on Sundays &amp; public holidays</p>
        </ContactCard>

        <ContactCard label="Response Time">
          <p>We aim to respond to all inquiries within <strong className="text-forest-deep">1 business day</strong>.</p>
          <p className="text-forest-deep/40 text-xs mt-1">
            Bulk &amp; wholesale queries may receive a preliminary acknowledgement within a few hours during business hours.
          </p>
        </ContactCard>
      </div>
    </Container>
  )
}

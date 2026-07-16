import type { Metadata } from 'next'
import { products } from '@/content/products'
import { faq } from '@/content/faq'
import { site } from '@/content/site'
import {
  Container,
  Button,
  SectionHeading,
  Tag,
  Divider,
} from '@/components/shared/primitives'
import MotionLoop from '@/components/shared/MotionLoop'
import InquiryForm from '@/components/bulk/InquiryForm'
import {
  Store,
  UtensilsCrossed,
  Gift,
  Globe,
  CheckCircle,
  ArrowRight,
  MessageCircle,
  Ship,
  Package,
} from 'lucide-react'

const BASE_URL = 'https://www.cosmicpower.ltd'
const rawMakhana = products.find((p) => p.slug === 'raw-makhana')
const bulkFaq = faq.filter((f) => f.category === 'bulk')

export const metadata: Metadata = {
  title: 'Bulk Makhana — Wholesale Fox Nuts Supplier | Golden Deer',
  description:
    'Premium bulk makhana supplier in India. Wholesale fox nuts for distributors, retailers, HoReCa, corporate gifting & export. Jumbo grade 5-6 suta, nitrogen-flushed, direct farm sourcing. Get a bulk quote today.',
  openGraph: {
    title: 'Bulk Makhana — Wholesale Fox Nuts Supplier | Golden Deer',
    description:
      'Premium bulk makhana supplier in India. Jumbo grade 5-6 suta, nitrogen-flushed, direct farm sourcing. Distributors, retailers, HoReCa & export.',
    url: `${BASE_URL}/bulk`,
    images: [
      {
        url: `${BASE_URL}/images/og/og-bulk.jpg`,
        width: 1200,
        height: 630,
        alt: 'Golden Deer Bulk Makhana — Wholesale Fox Nuts',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bulk Makhana — Wholesale Fox Nuts Supplier | Golden Deer',
    description:
      'Premium bulk makhana supplier in India. Get a custom quote today.',
    images: [`${BASE_URL}/images/og/og-bulk.jpg`],
  },
  alternates: { canonical: `${BASE_URL}/bulk` },
}

const audiences = [
  {
    icon: Store,
    title: 'Distributors & Retailers',
    desc: 'Stock India\'s cleanest crunch across your network. Competitive trade pricing, consistent supply, and marketing support.',
  },
  {
    icon: UtensilsCrossed,
    title: 'HoReCa & Institutions',
    desc: 'Elevate your menu with makhana-based dishes. Bulk raw and roasted grades for hotels, restaurants, caterers, and cafeterias.',
  },
  {
    icon: Gift,
    title: 'Corporate Gifting',
    desc: 'Custom-branded gift boxes with premium makhana assortments. Minimum 50 units, 7-10 day lead time, festive packaging options.',
  },
  {
    icon: Globe,
    title: 'Export Inquiries',
    desc: 'FOB/CIF pricing for international buyers. Jumbo grade 5-6 suta, third-party lab reports, container-load capacity.',
  },
]

const partnerBenefits = [
  'Direct farm-gate pricing — no middlemen',
  'Consistent 5-6 suta jumbo grade quality',
  'Touchless roasting and sorting facility',
  'Nitrogen-flushed packaging for extended shelf life',
  'Third-party lab analysis on every lot',
  'Flexible MOQ — from small artisans to container loads',
]

const howItWorks = [
  {
    icon: MessageCircle,
    title: 'Tell Us What You Need',
    desc: 'Share your requirements via the inquiry form or WhatsApp — grade, quantity, packaging, and destination.',
  },
  {
    icon: Package,
    title: 'Receive a Custom Quote',
    desc: 'Our team responds within 24 hours with FOB/CIF or delivered pricing, MOQ details, and sample availability.',
  },
  {
    icon: Ship,
    title: 'Order & Delivery',
    desc: 'Once confirmed, we process and ship within 5–7 working days. Track your order from our facility to your doorstep.',
  },
]

export default function BulkPage() {
  return (
    <>
      {/* Hero Band */}
      <section className="relative h-[50vh] min-h-[320px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <MotionLoop
            src="/videos/gifting.mp4"
            poster=""
            aspect="16/9"
            alt="Golden Deer bulk makhana — premium gifting"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cream/80 via-cream/60 to-transparent" />
        </div>
        <Container className="relative z-10">
          <Tag variant="gold" className="mb-4">
            Bulk &amp; Wholesale
          </Tag>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-tight text-forest-deep max-w-2xl">
            Premium Makhana,
            <br />
            <span className="text-gold">at Scale</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-forest-deep/70 max-w-xl leading-relaxed">
            From single-origin sourcing to nitrogen-flushed bulk packs —
            Golden Deer partners with businesses of every size to deliver
            India&apos;s finest fox nuts.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Button variant="gold-solid" href="#inquiry">
              Request a Quote
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              variant="gold-outline"
              href={`https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent('Hi, I\'d like a bulk quote for Golden Deer makhana — grade/quantity: ')}`}
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Us
            </Button>
          </div>
        </Container>
      </section>

      {/* Audience Cards */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Who We Serve"
            title="Built for Every Kind of Buyer"
            lede="Whether you are stocking shelves, running a kitchen, planning corporate gifts, or exporting to international markets — we have a grade and pack size for you."
            align="center"
            className="mb-12"
          />
          <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
            {audiences.map((a) => (
              <div
                key={a.title}
                className="rounded-xl border border-forest/10 bg-cream-dark/40 p-6 hover:border-gold/20 hover:bg-cream-dark/60 transition-all"
              >
                <a.icon className="w-6 h-6 text-gold mb-3" />
                <h3 className="font-display text-lg text-forest-deep mb-2">
                  {a.title}
                </h3>
                <p className="text-sm text-forest-deep/60 leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Why Partner Strip */}
      <section className="py-16 sm:py-20 bg-cream-dark/30">
        <Container>
          <SectionHeading
            eyebrow="Why Partner With Golden Deer"
            title="Quality, Consistency, Trust"
            align="center"
            className="mb-10"
          />
          <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-x-10 gap-y-3">
            {partnerBenefits.map((b) => (
              <div key={b} className="flex items-start gap-3 text-sm sm:text-base text-forest-deep/70 py-2">
                <CheckCircle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <span>{b}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Grade Table */}
      {rawMakhana?.bulkSpec && (
        <section className="py-16 sm:py-20">
          <Container>
            <SectionHeading
              eyebrow="Product Specification"
              title="Raw Makhana Grades"
              align="center"
              className="mb-10"
            />
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="divide-y divide-white/10 border border-forest/10 rounded-xl">
                {rawMakhana.bulkSpec.grades.map((g) => (
                  <div
                    key={g.name}
                    className="px-5 py-4 flex items-start justify-between gap-4"
                  >
                    <div>
                      <p className="text-sm font-medium text-forest-deep">{g.name}</p>
                      <p className="text-xs text-forest-deep/50 mt-0.5">{g.note}</p>
                    </div>
                    <span className="text-xs font-mono tabular-nums text-gold whitespace-nowrap">
                      {g.size}
                    </span>
                  </div>
                ))}
              </div>
              <div>
                <h4 className="text-sm font-medium text-gold uppercase tracking-wider mb-3">
                  Packaging Options
                </h4>
                <div className="flex flex-wrap gap-2">
                  {rawMakhana.bulkSpec.packOptions.map((o) => (
                    <span
                      key={o}
                      className="px-3 py-1.5 text-xs font-medium bg-cream/50 rounded-full text-forest-deep/70 border border-forest/10"
                    >
                      {o}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-xs text-forest-deep/40 italic">
                {rawMakhana.bulkSpec.moqNote}
              </p>
            </div>
          </Container>
        </section>
      )}

      {/* How It Works */}
      <section className="py-16 sm:py-20 bg-cream-dark/30">
        <Container>
          <SectionHeading
            eyebrow="Process"
            title="How It Works"
            align="center"
            className="mb-12"
          />
          <div className="max-w-4xl mx-auto grid sm:grid-cols-3 gap-8">
            {howItWorks.map((step, i) => (
              <div key={step.title} className="text-center">
                <div className="w-14 h-14 rounded-full bg-gold/15 flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-6 h-6 text-gold" />
                </div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-xs font-mono text-gold bg-gold/10 px-2 py-0.5 rounded-full">
                    Step {i + 1}
                  </span>
                </div>
                <h3 className="font-display text-lg text-forest-deep mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-forest-deep/60 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      {bulkFaq.length > 0 && (
        <section className="py-16 sm:py-20">
          <Container>
            <SectionHeading
              eyebrow="FAQ"
              title="Bulk Buying Questions"
              align="center"
              className="mb-10"
            />
            <div className="max-w-3xl mx-auto divide-y divide-white/10 border border-forest/10 rounded-xl">
              {bulkFaq.map((item) => (
                <details
                  key={item.question}
                  className="group"
                >
                  <summary className="flex items-center justify-between px-5 py-4 text-sm font-medium text-forest-deep/80 hover:text-forest-deep transition-colors cursor-pointer list-none">
                    {item.question}
                    <span className="text-gold text-lg leading-none group-open:rotate-180 transition-transform">
                      ▾
                    </span>
                  </summary>
                  <div className="px-5 pb-4 text-sm text-forest-deep/60 leading-relaxed">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </Container>
        </section>
      )}

      <Divider />

      {/* WhatsApp CTA */}
      <section className="py-12 sm:py-16">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-2xl sm:text-3xl text-forest-deep mb-3">
              Ready to Partner?
            </h2>
            <p className="text-sm sm:text-base text-forest-deep/60 mb-6">
              Message us directly on WhatsApp for a faster response.
            </p>
            <Button
              variant="gold-solid"
              href={`https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent('Hi, I\'d like a bulk quote for Golden Deer makhana — grade/quantity: ')}`}
            >
              <MessageCircle className="w-4 h-4" />
              Get Bulk Quote on WhatsApp
            </Button>
          </div>
        </Container>
      </section>

      <Divider />

      {/* Inquiry Form */}
      <section id="inquiry" className="py-16 sm:py-20 scroll-mt-24">
        <Container>
          <SectionHeading
            eyebrow="Get in Touch"
            title="Send Us Your Requirement"
            lede="Fill the form below and our team will respond within 24 hours with a custom quote."
            align="center"
            className="mb-10"
          />
          <div className="max-w-xl mx-auto">
            <InquiryForm />
          </div>
        </Container>
      </section>
    </>
  )
}

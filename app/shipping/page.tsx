import type { Metadata } from 'next'
import Link from 'next/link'
import { site } from '@/content/site'
import { Container, SectionHeading } from '@/components/shared/primitives'

const BASE_URL = 'https://www.cosmicpower.ltd'
const LAST_UPDATED = '15 April 2026'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Shipping Policy — Golden Deer',
    description:
      'Golden Deer shipping policy for retail and bulk orders. Learn about delivery through Blinkit, Zepto, Amazon, and wholesale dispatch terms.',
    openGraph: {
      title: 'Shipping Policy — Golden Deer',
      description: 'How Golden Deer delivers your orders — retail quick-commerce and bulk wholesale.',
    },
    alternates: { canonical: `${BASE_URL}/shipping` },
  }
}

function Breadcrumb() {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex items-center gap-2 text-sm text-forest-deep/50">
        <li><Link href="/" className="transition-colors hover:text-forest-deep/70">Home</Link></li>
        <li aria-hidden="true" className="text-forest-deep/20">/</li>
        <li className="text-forest-deep/70" aria-current="page">Shipping Policy</li>
      </ol>
    </nav>
  )
}

export default function ShippingPage() {
  const email = site.contact.email

  return (
    <Container className="py-20 lg:py-28">
      <Breadcrumb />
      <SectionHeading
        title="Shipping Policy"
        lede={`Last updated: ${LAST_UPDATED}`}
      />

      <div className="mt-12 max-w-3xl space-y-6 text-sm text-forest-deep/65 leading-relaxed">
        <p>
          This Shipping Policy describes how <strong className="text-forest-deep/80">{site.legal.company}</strong> (&ldquo;we&rdquo;,
          &ldquo;us&rdquo;, or &ldquo;our&rdquo;) fulfils and delivers orders for Golden Deer products. Our
          operations follow a two-funnel model: retail orders through quick-commerce partners and bulk/wholesale
          orders dispatched directly from our warehouse.
        </p>

        <h2 className="font-display text-xl text-forest-deep pt-4">1. Retail Orders (Quick-Commerce)</h2>
        <p>
          Golden Deer retail products are available for purchase on the following platforms. We do not process
          or ship retail orders directly.
        </p>

        <h3 className="font-display text-lg text-forest-deep pt-2">Blinkit</h3>
        <p>
          Available for 10-minute delivery in serviceable pin codes. Delivery times and availability depend on
          your location and Blinkit&rsquo;s real-time inventory. All Blinkit orders are governed by Blinkit&rsquo;s
          own delivery and return policies.
        </p>

        <h3 className="font-display text-lg text-forest-deep pt-2">Zepto</h3>
        <p>
          Available for delivery within minutes in Zepto-served areas. Delivery slots, serviceability, and
          charges are determined by Zepto&rsquo;s platform at checkout. We recommend checking Zepto for the most
          up-to-date availability in your area.
        </p>

        <h3 className="font-display text-lg text-forest-deep pt-2">Amazon</h3>
        <p>
          Available with standard Amazon shipping timelines (typically 1&ndash;3 business days for Prime members,
          and 3&ndash;7 business days for standard delivery). Fulfilled by Amazon or third-party sellers
          authorised by us. Shipping charges, if any, are displayed at checkout on Amazon.
        </p>

        <h2 className="font-display text-xl text-forest-deep pt-4">
          2. Bulk &amp; Wholesale Orders
        </h2>
        <p>
          Bulk and wholesale orders placed through our <Link href="/bulk" className="text-gold transition-colors hover:text-gold-light">Bulk Inquiry</Link> page or via WhatsApp are
          processed directly by our team. Dispatch timelines are agreed upon at the time of order confirmation
          and depend on:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Order volume and packaging requirements (standard retail packs, bulk pouches, or custom branding).</li>
          <li>Grade and product availability (5&ndash;6 suta jumbo, 4&ndash;5 suta standard, or raw makhana).</li>
          <li>Destination (domestic India or export with FOB/CIF terms).</li>
        </ul>
        <p>
          Typical dispatch timelines range from 3 to 10 working days for standard bulk orders. Export orders may
          require additional lead time for customs documentation and container consolidation. All bulk shipments
          include a detailed packing list and invoice.
        </p>

        <h2 className="font-display text-xl text-forest-deep pt-4">3. Returns &amp; Replacements</h2>
        <p>
          <strong className="text-forest-deep/80">Sealed food products are non-returnable</strong> once delivered, in
          accordance with Indian food safety regulations (FSSAI) and consumer protection norms. This policy applies
          to all retail purchases made through Blinkit, Zepto, and Amazon, as well as bulk wholesale orders.
        </p>
        <p>
          <strong className="text-forest-deep/80">Exceptions:</strong> If your product arrives with visible damage to
          the packaging, signs of tampering, or a defect affecting the quality (e.g., compromised seal, pest
          infestation, or rancidity), please contact us within 48 hours of delivery with:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Your order reference number and purchase platform.</li>
          <li>A clear photograph of the damaged or defective product and packaging.</li>
          <li>The batch number and expiry date printed on the pack.</li>
        </ul>
        <p>
          Upon verification, we will issue a replacement or refund at our discretion. For retail purchases,
          replacements are processed through the respective platform&rsquo;s support system. For direct bulk
          orders, we will arrange a replacement dispatch at no additional cost.
        </p>

        <h2 className="font-display text-xl text-forest-deep pt-4">4. Contact</h2>
        <p>
          For any questions or concerns regarding shipping, delivery, or product quality, please reach out to us at{' '}
          <a href={`mailto:${email}`} className="text-gold transition-colors hover:text-gold-light">{email}</a>
          .
        </p>
      </div>
    </Container>
  )
}

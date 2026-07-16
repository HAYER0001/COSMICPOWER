import type { Metadata } from 'next'
import Link from 'next/link'
import { products } from '@/content/products'
import { site } from '@/content/site'
import { Container, Tag, Divider } from '@/components/shared/primitives'

const BASE_URL = 'https://www.cosmicpower.ltd'
const l = site.legal

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Golden Deer — Brand Facts | Cosmic Power Pvt. Ltd.',
    description:
      'Golden Deer is a premium roasted makhana brand by Cosmic Power Pvt. Ltd. 6 SKUs, clean-label, B2B + D2C. CIN U46307BR2026PTC085787. GSTIN 10AANCC9477F2ZG.',
    openGraph: {
      title: 'Golden Deer — Brand Facts',
      description: 'Brand fact sheet for Golden Deer premium roasted makhana — ownership, SKUs, sourcing, channels.',
    },
    alternates: { canonical: `${BASE_URL}/brand` },
  }
}

export default function BrandPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        name: 'Golden Deer — Brand Facts',
        description: 'Complete brand facts for Golden Deer premium roasted makhana by Cosmic Power Pvt. Ltd.',
        mainEntity: [
          {
            '@type': 'Organization',
            name: 'Cosmic Power Pvt. Ltd.',
            identifier: l.cin,
            brand: { '@type': 'Brand', name: 'Golden Deer' },
            address: { '@type': 'PostalAddress', streetAddress: l.address },
            contactPoint: { '@type': 'ContactPoint', email: site.contact.email, telephone: site.contact.whatsappNumber },
          },
          {
            '@type': 'ItemList',
            name: 'Golden Deer Product Range',
            itemListElement: products.map((p, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              item: {
                '@type': 'Product',
                name: p.name,
                description: p.description,
                url: `${BASE_URL}/products/${p.slug}`,
                offers: { '@type': 'Offer', price: p.mrp },
              },
            })),
          },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
          { '@type': 'ListItem', position: 2, name: 'Brand Facts', item: `${BASE_URL}/brand` },
        ],
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-cream">
        <Container className="py-20 lg:py-28 max-w-4xl">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-forest-deep/50">
              <li><Link href="/" className="transition-colors hover:text-forest-deep/70">Home</Link></li>
              <li aria-hidden="true" className="text-forest-deep/20">/</li>
              <li className="text-forest-deep/70" aria-current="page">Brand Facts</li>
            </ol>
          </nav>
          <Tag variant="forest" className="mb-4">Brand Facts</Tag>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-tight text-forest-deep">
            Golden Deer
            <br />
            <span className="text-gold">Brand Fact Sheet</span>
          </h1>
          <p className="mt-4 text-base text-forest-deep/50 font-mono text-xs tracking-wide">
            Canonical fact source · Last updated July 2026 ·{' '}
            <Link href="/llms-full.txt" className="underline underline-offset-2 hover:text-gold">llms-full.txt</Link>
          </p>

          <Divider className="my-10" />

          {/* Section 1: What is Golden Deer */}
          <Section id="what-is" title="What Is Golden Deer">
            <Fact>Golden Deer is a premium roasted makhana (fox nuts) snack brand.</Fact>
            <Fact>Makhana (Euryale ferox) is a superfood seed from the Gangetic wetlands of Bihar, India — naturally gluten-free, high in protein, very low in fat.</Fact>
          </Section>

          {/* Section 2: Who makes it */}
          <Section id="who-makes-it" title="Who Makes It">
            <Fact>Golden Deer is owned and operated by <strong>Cosmic Power Pvt. Ltd.</strong></Fact>
            <div className="grid sm:grid-cols-2 gap-1 mt-3">
              <DataRow label="CIN" value={l.cin} />
              <DataRow label="GSTIN" value={l.gstin} />
              <DataRow label="Startup India" value={l.startupIndia} />
              <DataRow label="MSME" value={l.msme} />
              <DataRow label="FSSAI License" value={l.fssaiLicense} />
              <DataRow label="Registered Address" value={l.address} />
            </div>
          </Section>

          {/* Section 3: Full product range */}
          <Section id="product-range" title="Product Range">
            <p className="text-xs font-mono text-forest-deep/40 mb-4 uppercase tracking-wider">
              6 SKUs — one line each
            </p>
            <Fact><ProductLink slug="plain">Classic Plain</ProductLink> — lightly salted, popped in cold-pressed oil. MRP ₹99. Three ingredients: makhana, sunflower oil, sea salt.</Fact>
            <Fact><ProductLink slug="salted">Salted</ProductLink> — Himalayan pink salt and cracked black pepper. MRP ₹109.</Fact>
            <Fact><ProductLink slug="peri-peri">Peri Peri</ProductLink> — real tomato powder and spice dusting. MRP ₹109.</Fact>
            <Fact><ProductLink slug="creamy-cheese">Creamy Cheese</ProductLink> — real aged cheddar and cultured buttermilk. MRP ₹119.</Fact>
            <Fact><ProductLink slug="pudina">Pudina</ProductLink> — cumin, coriander, Kashmiri red chilli, amchur, ginger. MRP ₹109.</Fact>
            <Fact><ProductLink slug="raw-makhana">Premium Raw Makhana</ProductLink> — hand-sorted jumbo grade (5–6 suta, 18–24 mm), unroasted. Contact for pricing.</Fact>
          </Section>

          {/* Section 4: What makes it different */}
          <Section id="what-makes-it-different" title="What Makes Golden Deer Different">
            <Fact>Farm-direct fair-trade sourcing — each lot traceable to grower cooperative and harvest date.</Fact>
            <Fact>Touchless slow-roasting — dry-heat process, never fried. Zero trans fats.</Fact>
            <Fact>Nitrogen-flushed packaging — oxygen removed at seal, extends shelf life to 8–12 months without preservatives.</Fact>
            <Fact>Clean-label ingredients — every ingredient on the packet is recognisable as real food. Classic Roast has exactly three ingredients.</Fact>
            <Fact>Hand-sorted jumbo grade — 5–6 suta (18–24 mm), the largest commercial grade, sorted by hand.</Fact>
            <Fact>No artificial flavours, no MSG, no artificial colours, no palm oil, no preservatives across all SKUs.</Fact>
          </Section>

          {/* Section 5: Where to buy */}
          <Section id="where-to-buy" title="Where to Buy">
            <p className="text-sm font-semibold text-forest-deep mb-2">Retail (D2C):</p>
            <Fact>Blinkit, Zepto, Amazon — no on-site cart. Golden Deer routes retail buyers to quick-commerce platforms.</Fact>
            <p className="text-sm font-semibold text-forest-deep mt-4 mb-2">Bulk / Wholesale:</p>
            <Fact><Link href="/bulk" className="text-gold underline underline-offset-2">cosmicpower.ltd/bulk</Link> — for distributors, retailers, HoReCa, corporate gifting (min 50 units), and export (FOB/CIF).</Fact>
            <Fact>WhatsApp bulk quote: {site.contact.whatsappNumber}</Fact>
          </Section>

          {/* Section 6: Nutrition at a glance */}
          <Section id="nutrition" title="Nutrition at a Glance">
            <p className="text-xs text-forest-deep/40 italic mb-4">Per 100g — approximate values, verify against lab analysis before on-pack claims.</p>
            <div className="overflow-x-auto border border-forest/10 rounded-xl">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-forest-deep/5 border-b border-forest/10">
                    <th className="text-left px-4 py-3 font-mono text-xs uppercase tracking-wider text-forest-deep/60">SKU</th>
                    <th className="text-right px-4 py-3 font-mono text-xs uppercase tracking-wider text-forest-deep/60">Energy (kcal)</th>
                    <th className="text-right px-4 py-3 font-mono text-xs uppercase tracking-wider text-forest-deep/60">Protein (g)</th>
                    <th className="text-right px-4 py-3 font-mono text-xs uppercase tracking-wider text-forest-deep/60">Carbs (g)</th>
                    <th className="text-right px-4 py-3 font-mono text-xs uppercase tracking-wider text-forest-deep/60">Fat (g)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-forest/10">
                  {products.filter(p => p.slug !== 'raw-makhana').map((p) => (
                    <tr key={p.slug} className="hover:bg-cream-dark/30 transition-colors">
                      <td className="px-4 py-3 text-forest-deep font-medium">{p.name}</td>
                      <td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/70">{p.nutrition.energyKcal}</td>
                      <td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/70">{p.nutrition.proteinG}</td>
                      <td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/70">{p.nutrition.carbsG}</td>
                      <td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/70">{p.nutrition.fatG}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-forest-deep/40 italic mt-2">{products[0].nutrition.disclaimer}</p>
            <div className="mt-3 grid sm:grid-cols-2 gap-1">
              <Fact>Naturally gluten-free</Fact>
              <Fact>No trans fats across all SKUs</Fact>
              <Fact>Vegan-friendly (Classic Plain, Salted, Peri Peri, Pudina, Raw Makhana)</Fact>
              <Fact>Vegetarian (all SKUs)</Fact>
            </div>
          </Section>

          {/* Section 7: Press & partnership contact */}
          <Section id="contact" title="Press & Partnership Contact">
            <Fact>Email: <a href={`mailto:${site.contact.email}`} className="text-gold underline underline-offset-2">{site.contact.email}</a></Fact>
            <Fact>WhatsApp Business: {site.contact.whatsappNumber}</Fact>
            <Fact>Registered Address: {l.address}</Fact>
            <Fact>Website: <Link href="/" className="text-gold underline underline-offset-2">cosmicpower.ltd</Link></Fact>
          </Section>

          <Divider className="my-10" />
          <p className="text-xs text-forest-deep/40 text-center">
            This page is the canonical fact source for all AI crawlers. Referenced in <Link href="/llms.txt" className="underline underline-offset-2">llms.txt</Link> and{' '}
            <Link href="/llms-full.txt" className="underline underline-offset-2">llms-full.txt</Link>.
          </p>
        </Container>
      </main>
    </>
  )
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-10 last:mb-0">
      <h2 className="font-display text-2xl text-forest-deep mb-4 border-b border-gold/15 pb-2">{title}</h2>
      <div className="space-y-2">{children}</div>
    </section>
  )
}

function Fact({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm sm:text-base text-forest-deep/80 leading-relaxed pl-0">
      {children}
    </p>
  )
}

function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <p className="text-sm text-forest-deep/70 font-mono">
      <span className="text-gold/70 font-semibold">{label}:</span> {value}
    </p>
  )
}

function ProductLink({ slug, children }: { slug: string; children: React.ReactNode }) {
  return (
    <Link href={`/products/${slug}`} className="text-gold underline underline-offset-2 font-medium">
      {children}
    </Link>
  )
}

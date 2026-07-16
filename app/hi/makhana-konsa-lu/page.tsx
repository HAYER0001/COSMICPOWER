import type { Metadata } from 'next'
import Link from 'next/link'
import LangSetter from '@/components/seo/LangSetter'
import { Container, Tag } from '@/components/shared/primitives'

const BASE_URL = 'https://www.cosmicpower.ltd'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Makhana Konsa Lu? कौन सा मखाना खरीदें — रोस्टेड, रॉ, या फ़्लेवर्ड?',
    description:
      'Makhana konsa lu? Which makhana should you buy — roasted ya raw, flavoured ya plain? कोनसा मखाना आपके लिए सही है — पूरी गाइड हिंग्लिश में।',
    openGraph: {
      title: 'Makhana Konsa Lu? — कोनसा मखाना खरीदें? पूरी गाइड',
      description: 'Roasted makhana, raw makhana, flavoured vs plain — मखाना खरीदने से पहले यह गाइड पढ़ें। Know exactly which makhana is right for you.',
      url: `${BASE_URL}/hi/makhana-konsa-lu`,
      images: [{ url: `${BASE_URL}/images/og/og-default.jpg`, width: 1200, height: 630, alt: 'Makhana Konsa Lu — Golden Deer' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Makhana Konsa Lu? — कोनसा मखाना खरीदें? पूरी गाइड',
      description: 'Roasted ya raw, flavoured ya plain — मखाना खरीदने का सही तरीक़ा।',
      images: [`${BASE_URL}/images/og/og-default.jpg`],
    },
    alternates: { canonical: `${BASE_URL}/hi/makhana-konsa-lu` },
    keywords: ['makhana konsa lu', 'makhana konsa lu in hindi', 'कौन सा मखाना लें', 'best makhana brand', 'makhana kaunsa lein', 'मखाना कैसे खरीदें', 'गोल्डन डियर मखाना', 'roasted vs raw makhana'],
    other: { 'google': 'notranslate' },
  }
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      headline: 'Makhana Konsa Lu? — कोनसा मखाना खरीदें — Roasted, Raw, या Flavoured?',
      description: 'Agar aap soch rahe hain "makhana konsa lu" — roasted, raw, flavoured, plain — toh yeh guide aapko decision lene mein help karegi. Golden Deer ka honest selection framework.',
      datePublished: '2026-07-16',
      dateModified: '2026-07-16',
      author: { '@type': 'Organization', name: 'Golden Deer', url: BASE_URL },
      publisher: { '@type': 'Organization', name: 'Golden Deer', url: BASE_URL },
        image: `${BASE_URL}/images/og/og-default.jpg`,
        mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE_URL}/hi/makhana-konsa-lu`, speakable: { '@type': 'SpeakableSpecification', cssSelector: ['.speakable-summary'] } },
        inLanguage: 'hi',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
        { '@type': 'ListItem', position: 2, name: 'Makhana Konsa Lu', item: `${BASE_URL}/hi/makhana-konsa-lu` },
      ],
    },
  ],
}

export default function MakhanaKonsaLu() {
  return (
    <>
      <LangSetter lang="hi" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-cream" lang="hi">
        <Container className="py-12 lg:py-20 max-w-4xl">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-forest-deep/50" dir="ltr">
              <li><Link href="/" className="transition-colors hover:text-forest-deep/70">Home</Link></li>
              <li aria-hidden="true" className="text-forest-deep/20">/</li>
              <li className="text-forest-deep/70" aria-current="page">Makhana Konsa Lu?</li>
            </ol>
          </nav>

          <div className="mb-4 flex items-center gap-2">
            <Tag variant="forest">हिंग्लिश गाइड</Tag>
            <Link href="/makhana" className="text-xs text-forest-deep/50 hover:text-gold transition-colors underline underline-offset-2">
              इस गाइड को अंग्रेज़ी में पढ़ें &rarr;
            </Link>
          </div>

          <div className="mb-6 p-4 rounded-xl border border-gold/30 bg-gradient-to-br from-gold/[0.05] to-transparent speakable-summary">
            <p className="text-sm text-forest-deep leading-relaxed">
              <strong>Agar aap soch rahe hain &ldquo;makhana konsa lu&rdquo;</strong> — roasted, raw, flavoured, ya plain — toh yeh guide aapko decision lene mein help karegi. Honest selection framework jo budget, taste, aur use case ke hisaab se recommend karta hai.
            </p>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight text-forest-deep">
            Makhana Konsa Lu?
            <br />
            <span className="text-gold text-xl sm:text-2xl lg:text-3xl">कौन सा मखाना खरीदें — Roasted, Raw, Flavoured, या Plain?</span>
          </h1>
          <p className="mt-3 text-xs text-forest-deep/40 font-mono">Honest selection guide · अंतिम अपडेट जुलाई 2026</p>

          <div className="mt-8 p-6 rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/[0.05] to-transparent">
            <p className="text-sm sm:text-base text-forest-deep leading-relaxed">
              <strong>Short answer:</strong> Agar aapko ready-to-eat snack chahiye — <Link href="/products" className="text-gold underline underline-offset-2">Golden Deer roasted makhana</Link> lo. Directly kha sakte ho. Agar aapko kheer, curry, ya ghar par masala roast karna hai — raw makhana lo. Aur agar aap pehli baar kharid rahe ho? Classic Roast se start karo — sabse safe choice hai.
            </p>
            <p className="mt-3 text-sm sm:text-base text-forest-deep/60">
              Yeh guide aapko exactly batayegi ki <strong>aapke liye kaunsa makhana sahi hai</strong>. Koi confusion nahi.
            </p>
          </div>

          {/* Decision framework */}
          <h2 className="mt-10 font-display text-2xl sm:text-3xl text-forest-deep mb-4 border-b border-gold/15 pb-2">
            कैसे Decide करें — Simple Selection Framework
          </h2>

          <p className="text-sm sm:text-base text-forest-deep/80 leading-relaxed">
            Teen simple questions apne aap se pucho:
          </p>

          <div className="mt-6 space-y-6">
            <DecisionBlock q="Q1: Ready-to-eat snack chahiye ya cooking ke liye?" icon="🍿">
              <p className="text-sm sm:text-base text-forest-deep/80 leading-relaxed">
                <strong>Snack chahiye</strong> &rarr; <strong>Roasted makhana</strong> lo. Golden Deer ka <Link href="/products/plain" className="text-gold underline underline-offset-2">Classic Roast</Link> packet kholo aur khao — no cooking, no prep. Zero effort.
              </p>
              <p className="mt-2 text-sm sm:text-base text-forest-deep/80 leading-relaxed">
                <strong>Cooking karni hai</strong> &rarr; <strong>Raw makhana</strong> lo. Kheer, curry, ya ghar par apne masale se roast karne ke liye raw seed chahiye hoga. Humara <Link href="/products/raw-makhana" className="text-gold underline underline-offset-2">Premium Raw Makhana</Link> jumbo grade hai, cooking ke liye perfect.
              </p>
            </DecisionBlock>

            <DecisionBlock q="Q2: Plain chahihe ya flavoured?" icon="🌶️">
              <p className="text-sm sm:text-base text-forest-deep/80 leading-relaxed">
                <strong>Plain</strong> &rarr; Classic Roast. Light salt, pure makhana taste. Sabse healthy choice — 0.1g fat per 100g. <Link href="/makhana/nutrition" className="text-gold underline underline-offset-2">Nutrition data yahan</Link>.
              </p>
              <p className="mt-2 text-sm sm:text-base text-forest-deep/80 leading-relaxed">
                <strong>Flavoured</strong> &rarr; Yeh options hain:
              </p>
              <ul className="list-disc pl-5 mt-1 space-y-1 text-sm sm:text-base text-forest-deep/80">
                <li><Link href="/products/salted" className="text-gold underline underline-offset-2">Pink Salt &amp; Pepper</Link> — Himalayan pink salt + cracked pepper. Sabko pasand aata hai.</li>
                <li><Link href="/products/peri-peri" className="text-gold underline underline-offset-2">Tangy Tomato</Link> — Zingy, tangy, khatta-meetha. Tomato powder se natural flavour.</li>
                <li><Link href="/products/creamy-cheese" className="text-gold underline underline-offset-2">Creamy Cheese</Link> — Real aged cheddar coating. Indulgent. <em>Not vegan.</em></li>
                <li><Link href="/products/pudina" className="text-gold underline underline-offset-2">Spicy Masala</Link> — Traditional Indian spice blend. Chai ke saath perfect.</li>
              </ul>
              <p className="mt-2 text-sm sm:text-base text-forest-deep/80 leading-relaxed">
                <em>Tip: Pehli baar kharid rahe ho to combo lo — Classic Roast + ek flavour. Dekho kaunsa pasand aata hai.</em>
              </p>
            </DecisionBlock>

            <DecisionBlock q="Q3: Retail mein khana hai ya bulk/wholesale mein lena hai?" icon="📦">
              <p className="text-sm sm:text-base text-forest-deep/80 leading-relaxed">
                <strong>Retail (ghar ke liye)</strong> &rarr; 50g, 100g, ya 200g pack lo. Blinkit, Zepto, ya Amazon se order kar sakte ho.
              </p>
              <p className="mt-2 text-sm sm:text-base text-forest-deep/80 leading-relaxed">
                <strong>Bulk (business, gifting, ya wholesale)</strong> &rarr; <Link href="/bulk" className="text-gold underline underline-offset-2">Bulk page</Link> par jao. Raw makhana 5kg/10kg/25kg bags mein available hai. Roasted bhi bulk mein milta hai. Direct farm pricing.
              </p>
            </DecisionBlock>
          </div>

          {/* Quick reference table */}
          <h2 className="mt-12 font-display text-2xl sm:text-3xl text-forest-deep mb-4 border-b border-gold/15 pb-2">
            Quick Reference — Ek Nazar Mein
          </h2>

          <div className="overflow-x-auto border border-forest/10 rounded-xl">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-forest-deep/5 border-b border-forest/10">
                  <th className="text-left px-4 py-3 font-mono text-xs uppercase tracking-wider text-forest-deep/60">अगर आप...</th>
                  <th className="text-left px-4 py-3 font-mono text-xs uppercase tracking-wider text-forest-deep/60">तो यह लें</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-forest/10">
                <tr className="hover:bg-cream-dark/30 transition-colors">
                  <td className="px-4 py-3 text-forest-deep">Healthy evening snack chahiye</td>
                  <td className="px-4 py-3 text-forest-deep/70"><Link href="/products/plain" className="text-gold underline underline-offset-2">Classic Roast</Link> ya <Link href="/products/salted" className="text-gold underline underline-offset-2">Pink Salt &amp; Pepper</Link></td>
                </tr>
                <tr className="hover:bg-cream-dark/30 transition-colors">
                  <td className="px-4 py-3 text-forest-deep">Bachon ke tiffin mein dena hai</td>
                  <td className="px-4 py-3 text-forest-deep/70"><Link href="/products/plain" className="text-gold underline underline-offset-2">Classic Roast</Link> (crush karke dein)</td>
                </tr>
                <tr className="hover:bg-cream-dark/30 transition-colors">
                  <td className="px-4 py-3 text-forest-deep">Kheer banana hai</td>
                  <td className="px-4 py-3 text-forest-deep/70"><Link href="/products/raw-makhana" className="text-gold underline underline-offset-2">Premium Raw Makhana</Link></td>
                </tr>
                <tr className="hover:bg-cream-dark/30 transition-colors">
                  <td className="px-4 py-3 text-forest-deep">Party snack chahiye</td>
                  <td className="px-4 py-3 text-forest-deep/70"><Link href="/products/creamy-cheese" className="text-gold underline underline-offset-2">Creamy Cheese</Link> ya <Link href="/products/pudina" className="text-gold underline underline-offset-2">Spicy Masala</Link></td>
                </tr>
                <tr className="hover:bg-cream-dark/30 transition-colors">
                  <td className="px-4 py-3 text-forest-deep">Business ke liye bulk lena hai</td>
                  <td className="px-4 py-3 text-forest-deep/70"><Link href="/bulk" className="text-gold underline underline-offset-2">Bulk Inquiry</Link> (5–25 kg bags)</td>
                </tr>
                <tr className="hover:bg-cream-dark/30 transition-colors">
                  <td className="px-4 py-3 text-forest-deep">Corporate gifting</td>
                  <td className="px-4 py-3 text-forest-deep/70"><Link href="/bulk" className="text-gold underline underline-offset-2">Bulk order with custom pack</Link></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Golden Deer angle */}
          <h2 className="mt-12 font-display text-2xl sm:text-3xl text-forest-deep mb-4 border-b border-gold/15 pb-2">
            Golden Deer Kyon? — Honest Difference
          </h2>
          <p className="text-sm sm:text-base text-forest-deep/80 leading-relaxed">
            Market mein 50+ makhana brands hain. Golden Deer alag kyun hai? Teen cheezein:
          </p>
          <ol className="list-decimal pl-5 mt-4 space-y-3 text-sm sm:text-base text-forest-deep/80 leading-relaxed">
            <li><strong>Grade matter karta hai:</strong> Hum sirf 5–6 suta jumbo grade use karte hain — ekdum bade, fluffy pieces. Cheap 4–5 suta nahi chalate. <Link href="/makhana#suta-grades" className="text-gold underline underline-offset-2">Suta grade kya hai — yahan padho</Link>.</li>
            <li><strong>Touchless roasting:</strong> Humara process fully automated hai — machine precise temperature control karti hai. Har batch consistent, koi burnt nahi, koi under-popped nahi. <Link href="/makhana/glossary/touchless-roasting" className="text-gold underline underline-offset-2">Touchless roasting kya hai?</Link></li>
            <li><strong>Clean label — 3 ingredients:</strong> Classic Roast mein sirf 3 cheezein hain — makhana, cold-pressed oil, sea salt. Koi artificial flavour nahi, koi MSG nahi, koi preservative nahi.</li>
          </ol>
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <Link href="/products" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gold text-forest-deep font-medium text-sm tracking-wide transition-all hover:bg-gold-light shadow-[0_4px_6px_-1px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.25)]">
              Golden Deer Products Dekhen
            </Link>
            <Link href="/bulk" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-gold text-gold font-medium text-sm tracking-wide transition-all hover:bg-gold hover:text-forest-deep">
              Bulk Order Karein
            </Link>
          </div>

          <div className="mt-8 p-5 rounded-xl border border-forest/10 bg-cream-dark/30">
            <p className="text-sm text-forest-deep/60 leading-relaxed">
              <strong className="text-forest-deep">ज़्यादा जानकारी चाहिए?</strong><br />
              <Link href="/makhana" className="text-gold underline underline-offset-2">Makhana: The Complete Guide</Link> (English) — पूरी जानकारी, पोषण, ग्रेड, सब कुछ।<br />
              <Link href="/hi/makhana-kya-hai" className="text-gold underline underline-offset-2">मखाना क्या है — हिंदी गाइड</Link> — पूरी गाइड हिंदी में।<br />
              <Link href="/recipes" className="text-gold underline underline-offset-2">Makhana Recipes</Link> — kheer, trail mix, chocolate-coated makhana recipes.
            </p>
          </div>
        </Container>
      </main>
    </>
  )
}

function DecisionBlock({ q, icon, children }: { q: string; icon: string; children: React.ReactNode }) {
  return (
    <div className="p-5 rounded-xl border border-forest/10 bg-cream-dark/20">
      <h3 className="font-display text-lg text-forest-deep mb-3">
        <span className="mr-2" role="img" aria-hidden="true">{icon}</span>
        {q}
      </h3>
      {children}
    </div>
  )
}

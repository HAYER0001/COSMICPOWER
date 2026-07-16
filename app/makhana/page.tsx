import type { Metadata } from 'next'
import Link from 'next/link'
import { Container, Tag } from '@/components/shared/primitives'
import { products } from '@/content/products'
import { site } from '@/content/site'
import { faq } from '@/content/faq'

const BASE_URL = 'https://www.cosmicpower.ltd'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Makhana Guide — Fox Nuts, Phool Makhana, Benefits, Grades & How to Use',
    description:
      'The complete guide to makhana (fox nuts / phool makhana). What it is, how it is grown, suta grades explained, nutrition, health benefits, how to roast and season at home, storage tips, buying checklist, and makhana in Indian tradition.',
    openGraph: {
      title: 'Makhana: The Complete Guide — Fox Nuts, Grades, Nutrition & How to Use',
      description:
        'Everything you need to know about makhana (Euryale ferox): definition, cultivation, suta grades, nutrition per 100g, health benefits, at-home roasting, storage, buying checklist, and cultural significance.',
      url: `${BASE_URL}/makhana`,
      images: [
        { url: `${BASE_URL}/images/og/og-default.jpg`, width: 1200, height: 630, alt: 'Makhana Guide — Golden Deer' },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Makhana: The Complete Guide — Fox Nuts, Grades, Nutrition & How to Use',
      description:
        'Everything you need to know about makhana (Euryale ferox): definition, cultivation, suta grades, nutrition per 100g, health benefits, at-home roasting, storage, buying checklist, and cultural significance.',
      images: [`${BASE_URL}/images/og/og-default.jpg`],
    },
    alternates: { canonical: `${BASE_URL}/makhana` },
    keywords: ['makhana', 'fox nuts', 'phool makhana', 'what is makhana', 'makhana benefits', 'makhana nutrition', 'makhana grades', 'suta makhana', 'Euryale ferox', 'makhana guide', 'how to roast makhana', 'makhana storage', 'makhana cultivation', 'Mithila Makhana GI', 'Bihar makhana'],
  }
}

const cooked = products.filter((p) => p.slug !== 'raw-makhana')
const raw = products.find((p) => p.slug === 'raw-makhana')!

const sectionIntro: Record<string, string> = {
  'what-is': 'Makhana, also known as fox nuts or phool makhana, are the popped seeds of Euryale ferox, an aquatic plant cultivated in stagnant wetland ponds across the Gangetic plains of Bihar, India. The seeds are harvested, dried, and roasted to produce a light, crunchy puff that is naturally gluten-free, high in protein, and very low in fat.',
  cultivation: 'Makhana is grown in shallow wetland ponds — not fields — across the Mithila region of Bihar, where the Euryale ferox water lily has been cultivated for centuries under a Geographical Indication (GI) tag that protects the traditional growing methods.',
  processing: 'Raw makhana seeds go through a four-stage process — sun-drying, dry-roasting in hot sand or a drum, controlled moisture conditioning, and impact popping — to transform from dense black seeds into the familiar white puffs sold as makhana.',
  suta: 'Suta is the traditional grading system for raw makhana seeds, measuring diameter in increments where 5–6 suta (18–24 mm) is the largest jumbo grade and 4–5 suta (14–18 mm) is the standard culinary grade — serious buyers check this before every purchase.',
  health: 'Makhana is one of the healthiest snack seeds available: approximately 9.7 g protein, 76.9 g carbohydrates, and less than 0.5 g fat per 100 g, with a low glycaemic index and significant antioxidant content from flavonoids and phenolic compounds.',
  'roast-at-home': 'The simplest way to roast makhana at home: heat a heavy pan on low flame, add 1 tsp ghee or coconut oil, toss in raw or plain roasted makhana, stir constantly for 3–5 minutes until it develops a golden tint and audible crispness, then season while hot.',
  storage: 'Store makhana in an airtight container in a cool, dry place away from direct sunlight — properly nitrogen-flushed packs stay fresh for 8–12 months unopened, and once opened, consume within 15–20 days for best crunch.',
  'buying-checklist': 'A good makhana should: (1) be uniformly white to pale cream with no yellowing, (2) have at least 5–6 suta grade (18+ mm), (3) contain less than 2 % broken pieces, (4) feel crisp not chewy, and (5) have a clean nutty aroma with no mustiness or rancid smell.',
  tradition: 'Makhana has been part of the Indian diet for centuries as a fasting food (vrat ka khana) during Navratri and Ekadashi, as the base for makhana kheer at festivals, and in Ayurveda as a tridoshic food believed to balance all three doshas.',
}

const faqMini = [
  {
    q: 'Is makhana a nut?',
    a: 'No. Makhana is a seed — specifically the popped seed of the Euryale ferox aquatic plant. It is not a tree nut or a legume. Most people with nut allergies can safely eat makhana, but consult your doctor if you have specific concerns.',
    id: 'is-makhana-a-nut',
  },
  {
    q: 'Can makhana be eaten raw (unroasted)?',
    a: 'Technically yes — fully dried raw makhana seeds are edible — but they are extremely hard and not pleasant to chew. Raw makhana is meant for cooking: making kheer, curry, or home-roasting with your own masala. For immediate snacking, always use pre-roasted makhana.',
    id: 'can-eat-makhana-raw',
  },
  {
    q: 'Is makhana good for diabetes?',
    a: 'Makhana has a low glycaemic index (estimated GI under 50) because its complex carbohydrates digest slowly, preventing blood sugar spikes. Its high fibre and protein content also promote satiety. As with any carbohydrate food, portion control applies — a 30 g serving is a sensible amount. Always consult your healthcare provider for personalised dietary advice.',
    id: 'makhana-diabetes',
  },
  {
    q: 'How many calories are in one bowl of makhana?',
    a: 'A typical 30 g serving of roasted makhana (about 2–3 handfuls, or one small bowl) contains approximately 104–107 calories, 2.9 g protein, 23 g carbohydrates, and less than 0.15 g fat. Compare this with a 30 g serving of potato chips (approx 160 calories, 10 g fat) and the difference is stark.',
    id: 'makhana-calories-bowl',
  },
  {
    q: 'Makhana vs popcorn — which is healthier?',
    a: 'Both are healthy whole-grain snacks, but makhana has advantages: lower calories per serving (air-popped popcorn has about 110 kcal per 30 g, makhana about 105 kcal), significantly lower fat (0.1 g vs 1.2 g), and higher protein (9.7 g vs 3.5 g per 100 g). Makhana also retains more minerals including calcium, magnesium, and phosphorus. Popcorn wins on fibre (14.5 g per 100 g vs 7.6 g for makhana). Both are excellent snack choices; alternating them gives you the best of both worlds.',
    id: 'makhana-vs-popcorn',
  },
]



export default function MakhanaGuide() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: 'Makhana: The Complete Guide — Fox Nuts (Euryale ferox), Phool Makhana',
        description: 'The most comprehensive single page about makhana on the internet: definition, cultivation, suta grades, nutrition table, health benefits, how to roast and season at home, storage tips, buying checklist, cultural significance, and FAQ.',
        datePublished: '2026-07-16',
        dateModified: '2026-07-16',
        author: { '@type': 'Organization', name: 'Golden Deer', url: BASE_URL },
        publisher: { '@type': 'Organization', name: 'Golden Deer', url: BASE_URL },
        image: `${BASE_URL}/images/og/og-default.jpg`,
        mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE_URL}/makhana` },
        hasPart: [
          { '@type': 'WebPageElement', name: 'Quick Answer — what is makhana' },
          { '@type': 'WebPageElement', name: 'What Is Makhana' },
          { '@type': 'WebPageElement', name: 'How Makhana Is Grown and Harvested' },
          { '@type': 'WebPageElement', name: 'How Raw Seeds Become Popped Makhana' },
          { '@type': 'WebPageElement', name: 'Suta Grades Explained' },
          { '@type': 'WebPageElement', name: 'Makhana Nutrition Per 100g' },
          { '@type': 'WebPageElement', name: 'Health Benefits of Makhana' },
          { '@type': 'WebPageElement', name: 'How to Roast and Season Makhana at Home' },
          { '@type': 'WebPageElement', name: 'How to Store Makhana' },
          { '@type': 'WebPageElement', name: 'How to Choose Good Makhana — Buying Checklist' },
          { '@type': 'WebPageElement', name: 'Makhana in Indian Tradition' },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
          { '@type': 'ListItem', position: 2, name: 'Makhana Guide', item: `${BASE_URL}/makhana` },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': `${BASE_URL}/makhana`,
        name: 'Makhana Guide — Fox Nuts, Phool Makhana, Benefits, Grades & How to Use',
        speakable: { '@type': 'SpeakableSpecification', cssSelector: ['.speakable-summary'] },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-cream">
        <Container className="py-12 lg:py-20 max-w-4xl">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-forest-deep/50">
              <li><Link href="/" className="transition-colors hover:text-forest-deep/70">Home</Link></li>
              <li aria-hidden="true" className="text-forest-deep/20">/</li>
              <li className="text-forest-deep/70" aria-current="page">Makhana Guide</li>
            </ol>
          </nav>

          <Tag variant="forest" className="mb-4">Complete Guide</Tag>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-tight text-forest-deep">
            Makhana: The Complete Guide
            <br />
            <span className="text-gold text-2xl sm:text-3xl lg:text-4xl">Fox nuts, phool makhana, grades, nutrition &amp; how to use</span>
          </h1>
          <p className="mt-3 text-xs text-forest-deep/40 font-mono">Comprehensive reference · Last updated July 2026</p>

          <div className="mt-8 p-6 rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/[0.05] to-transparent speakable-summary">
            <p className="text-sm sm:text-base text-forest-deep leading-relaxed">
              <strong>Makhana</strong> — also called <strong>fox nuts</strong> or <strong>phool makhana</strong> — are the popped seeds of <em>Euryale ferox</em>, an aquatic plant cultivated in wetland ponds across the Gangetic plains of Bihar, India. They are naturally gluten-free, rich in protein (9.7 g per 100 g), very low in fat (0.1 g), and a traditional Indian fasting food. This guide covers everything: how makhana is grown, the suta grading system, nutrition facts, health benefits, how to roast and season at home, proper storage, an honest buying checklist, and its cultural significance.
              <Link href="/products" className="block mt-2 text-gold underline underline-offset-2 text-sm font-medium">Browse Golden Deer makhana products &rarr;</Link>
            </p>
          </div>

          <nav className="my-10 p-5 rounded-xl border border-forest/10 bg-cream-dark/30" aria-label="Table of contents">
            <h2 className="text-xs font-semibold tracking-[0.15em] uppercase text-gold mb-4">On this page</h2>
            <ol className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
              {[
                ['what-is-makhana', 'What Is Makhana?'],
                ['cultivation', 'How Makhana Is Grown & Harvested'],
                ['processing', 'How Raw Seeds Become Popped Makhana'],
                ['suta-grades', 'Suta Grades Explained'],
                ['nutrition', 'Nutrition Per 100g'],
                ['health-benefits', 'Health Benefits of Makhana'],
                ['roast-at-home', 'How to Roast & Season at Home'],
                ['storage', 'How to Store Makhana'],
                ['buying-checklist', 'Buying Checklist'],
                ['tradition', 'Makhana in Indian Tradition'],
                ['faq-mini', 'FAQ'],
                ['comparisons', 'Comparisons & Nutrition'],
              ].map(([id, label]) => (
                <li key={id}>
                  <a href={`#${id}`} className="text-forest-deep/70 hover:text-gold transition-colors underline underline-offset-2 decoration-forest/20">
                    {label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* Section 1: What Is Makhana */}
          <Section id="what-is-makhana" title="What Is Makhana?">
            <Answer>{sectionIntro['what-is']}</Answer>
            <p className="mt-4 text-sm sm:text-base text-forest-deep/80 leading-relaxed">
              The <em>Euryale ferox</em> plant — commonly called prickly water lily, Gorgon plant, or simply makhana — grows in shallow (4–6 ft deep) stagnant freshwater ponds. Its large circular leaves, up to 1.5 m across, float on the water surface while the seeds develop inside spiny seed pods. Each pod contains 15–30 dark, hard seeds that resemble small black chickpeas. These seeds are the raw makhana.
            </p>
            <p className="mt-3 text-sm sm:text-base text-forest-deep/80 leading-relaxed">
              Raw makhana seeds are inedible in their natural state. The edible white puffs sold as makhana are the result of a careful roasting-and-popping process that transforms the dense, starchy seed into a light, airy puff — similar in principle to how raw corn kernels become popcorn. The popped makhana is what you find in snack packets, kheer recipes, and masala mixes.
            </p>
            <p className="mt-3 text-sm sm:text-base text-forest-deep/80 leading-relaxed">
              Makhana is sometimes confused with lotus seeds (kamu gatta / phool makhana is a different seed from the lotus plant), but they are botanically distinct. Both are used in Indian cooking and Ayurveda, but makhana (Euryale ferox) is the one commonly referred to as phool makhana in North Indian households. See the <Link href="/makhana/glossary/lotus-seeds-vs-makhana" className="text-gold underline underline-offset-2">lotus seeds vs makhana glossary entry</Link> for the full comparison, or browse our <Link href="/products" className="text-gold underline underline-offset-2">product range</Link> for ready-to-eat roasted makhana.
            </p>
          </Section>

          {/* Section 2: Cultivation */}
          <Section id="cultivation" title="How Makhana Is Grown and Harvested">
            <Answer>{sectionIntro.cultivation}</Answer>
            <p className="mt-4 text-sm sm:text-base text-forest-deep/80 leading-relaxed">
              Makhana cultivation is unlike any other crop. It takes place in <strong>natural or man-made wetland ponds</strong> (pokhar / talab) that retain 4–6 ft of water throughout the growing season. The seeds are sown directly into the muddy pond bed between February and March, and the plants begin germinating as the water temperature rises. By April, the iconic floating leaves cover the pond surface.
            </p>
            <p className="mt-3 text-sm sm:text-base text-forest-deep/80 leading-relaxed">
              The growing belt spans the <strong>Mithila region</strong> of Bihar — districts including Darbhanga, Madhubani, Purnia, Katihar, Saharsa, Supaul, and Kishanganj. The <strong><Link href="/makhana/glossary/mithila-makhana-gi" className="text-gold underline underline-offset-2">Mithila Makhana GI tag</Link></strong> (Geographical Indication registration) formally recognises that makhana from this region has distinct qualities attributable to its geographic origin: the specific mineral composition of the Gangetic silt, the water chemistry, and the centuries-old cultivation knowledge passed down through farming families. Read more in <Link href="/journal" className="text-gold underline underline-offset-2">our journal</Link> about makhana&apos;s origins.
            </p>
            <p className="mt-3 text-sm sm:text-base text-forest-deep/80 leading-relaxed">
              Harvesting is entirely <strong>manual and labour-intensive</strong>. In August–September, farmers wade chest-deep into the ponds, locate the submerged seed pods by feel, and collect them in baskets. Each pod is opened by hand to extract the seeds. A skilled harvester can collect 10–15 kg of raw seeds per day. The fresh seeds are immediately washed and sun-dried on large tarpaulins for 3–5 days, reducing moisture from about 40 % to 12–14 % for storage and transport.
            </p>
            <p className="mt-3 text-sm sm:text-base text-forest-deep/80 leading-relaxed">
              Golden Deer sources directly from farming cooperatives in this belt. Every lot is traceable to the grower cooperative and harvest date. See our <Link href="/brand#what-makes-it-different" className="text-gold underline underline-offset-2">brand fact sheet</Link> for sourcing details.
            </p>
          </Section>

          {/* Section 3: Processing */}
          <Section id="processing" title="How Raw Seeds Become Popped Makhana">
            <Answer>{sectionIntro.processing}</Answer>
            <div className="mt-4 space-y-3">
              <Step n={1} title="Drying">Sun-dried raw seeds are further dried in mechanical driers to reach the optimal moisture content (8–10 %) for popping. Under-dried seeds will not pop; over-dried seeds shatter.</Step>
              <Step n={2} title="Roasting">The dried seeds are roasted in a large iron pan or rotating drum with hot sand or salt at 200–250 °C. Constant stirring prevents burning. The high heat causes the internal moisture to turn to steam, building pressure inside the seed.</Step>
              <Step n={3} title="Conditioning">After the initial roast, the seeds are briefly removed and lightly moistened (sprinkled with water) to create a thermal shock — this step is critical for achieving the characteristic porous, airy texture. The moisture flashes to steam on re-contact with heat.</Step>
              <Step n={4} title="Popping">The conditioned seeds go through a second high-heat pass. The internal steam pressure causes the dense seed to explode outward into a white, puffed makhana — increasing in volume by 3–4×. The popped makhana is then cooled, sorted by size, and graded.</Step>
            </div>
              <p className="mt-4 text-sm sm:text-base text-forest-deep/80 leading-relaxed">
                Golden Deer&apos;s <Link href="/makhana/glossary/touchless-roasting" className="text-gold underline underline-offset-2">touchless roasting</Link> facility uses a dry-heat process with automated temperature control. No oil is used at any stage of popping — the only oil in our flavoured variants is a minimal post-roast coating for seasoning adhesion. The popping process (called <Link href="/makhana/glossary/lawa" className="text-gold underline underline-offset-2">lawa</Link> in the trade) is what transforms dense raw seeds into light, airy puffs. See the <Link href="/products" className="text-gold underline underline-offset-2">full product range</Link> for our clean-label roasted makhana.
              </p>
          </Section>

          {/* Section 4: Suta Grades */}
          <Section id="suta-grades" title="Suta Grades Explained">
            <Answer>{sectionIntro.suta}</Answer>
            <p className="mt-4 text-sm sm:text-base text-forest-deep/80 leading-relaxed">
              Suta (सूत) is the traditional unit for makhana seed diameter. The grading system is simple: higher suta = larger seed = bigger, fluffier popped makhana. Here is the standard grading used across Bihar&apos;s makhana trade:
            </p>
            <div className="overflow-x-auto mt-4 border border-forest/10 rounded-xl">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-forest-deep/5 border-b border-forest/10">
                    <th className="text-left px-4 py-3 font-mono text-xs uppercase tracking-wider text-forest-deep/60">Grade</th>
                    <th className="text-left px-4 py-3 font-mono text-xs uppercase tracking-wider text-forest-deep/60">Diameter</th>
                    <th className="text-left px-4 py-3 font-mono text-xs uppercase tracking-wider text-forest-deep/60">Best For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-forest/10">
                  <tr className="hover:bg-cream-dark/30 transition-colors">
                    <td className="px-4 py-3 font-semibold text-forest-deep">5–6 Suta (Jumbo)</td>
                    <td className="px-4 py-3 font-mono tabular-nums text-forest-deep/70">18–24 mm</td>
                    <td className="px-4 py-3 text-forest-deep/70">Premium retail, export, white-label roasting</td>
                  </tr>
                  <tr className="hover:bg-cream-dark/30 transition-colors">
                    <td className="px-4 py-3 font-semibold text-forest-deep">4–5 Suta (Standard)</td>
                    <td className="px-4 py-3 font-mono tabular-nums text-forest-deep/70">14–18 mm</td>
                    <td className="px-4 py-3 text-forest-deep/70">HoReCa, processed snacks, culinary use</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm sm:text-base text-forest-deep/80 leading-relaxed">
              <strong>Why suta grade matters to serious buyers:</strong> Larger seeds produce larger, more consistent popped makhana with better plate appeal. The pop yield (weight of popped makhana per kg of raw) is higher with jumbo grade. Inconsistent grading leads to uneven roasting — some pieces burn while others remain under-popped. Golden Deer standardises on <Link href="/makhana/glossary/5-6-suta-jumbo" className="text-gold underline underline-offset-2">5–6 suta jumbo grade</Link> for all retail products. For bulk buyers, we also offer <Link href="/makhana/glossary/4-5-suta" className="text-gold underline underline-offset-2">4–5 suta</Link>. See the full <Link href="/makhana/glossary/suta" className="text-gold underline underline-offset-2">suta grading glossary</Link> for more detail. Read the <Link href="/journal/bulk-makhana-supplier" className="text-gold underline underline-offset-2">bulk procurement guide</Link>.
            </p>
          </Section>

          {/* Section 5: Nutrition */}
          <Section id="nutrition" title="Makhana Nutrition Per 100g">
            <Answer>{sectionIntro.health}</Answer>
            <div className="overflow-x-auto mt-4 border border-forest/10 rounded-xl">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-forest-deep/5 border-b border-forest/10">
                    <th className="text-left px-4 py-3 font-mono text-xs uppercase tracking-wider text-forest-deep/60">Nutrient</th>
                    <th className="text-right px-4 py-3 font-mono text-xs uppercase tracking-wider text-forest-deep/60">Per 100g</th>
                    <th className="text-right px-4 py-3 font-mono text-xs uppercase tracking-wider text-forest-deep/60">Per 30g Serving</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-forest/10">
                  <tr className="hover:bg-cream-dark/30 transition-colors"><td className="px-4 py-3 text-forest-deep">Energy</td><td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/70">347 kcal</td><td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/70">104 kcal</td></tr>
                  <tr className="hover:bg-cream-dark/30 transition-colors"><td className="px-4 py-3 text-forest-deep">Protein</td><td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/70">9.7 g</td><td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/70">2.9 g</td></tr>
                  <tr className="hover:bg-cream-dark/30 transition-colors"><td className="px-4 py-3 text-forest-deep">Carbohydrates</td><td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/70">76.9 g</td><td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/70">23.1 g</td></tr>
                  <tr className="hover:bg-cream-dark/30 transition-colors"><td className="px-4 py-3 text-forest-deep">Fat</td><td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/70">0.1 g</td><td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/70">0.03 g</td></tr>
                  <tr className="hover:bg-cream-dark/30 transition-colors"><td className="px-4 py-3 text-forest-deep">Fibre</td><td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/70">7.6 g</td><td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/70">2.3 g</td></tr>
                  <tr className="hover:bg-cream-dark/30 transition-colors"><td className="px-4 py-3 text-forest-deep">Calcium</td><td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/70">60 mg</td><td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/70">18 mg</td></tr>
                  <tr className="hover:bg-cream-dark/30 transition-colors"><td className="px-4 py-3 text-forest-deep">Magnesium</td><td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/70">67 mg</td><td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/70">20 mg</td></tr>
                  <tr className="hover:bg-cream-dark/30 transition-colors"><td className="px-4 py-3 text-forest-deep">Phosphorus</td><td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/70">150 mg</td><td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/70">45 mg</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-forest-deep/40 italic mt-2">{products[0].nutrition.disclaimer} &middot; <Link href="/makhana/nutrition" className="text-gold underline underline-offset-2">Full nutrition reference &rarr;</Link></p>
            <p className="mt-3 text-sm sm:text-base text-forest-deep/80 leading-relaxed">
              Makhana is also a source of antioxidants (flavonoids, phenolic acids), potassium, zinc, and iron. Its protein content is notably high for a seed-based snack — comparable to quinoa and higher than most puffed grains. The very low fat content (0.1 g per 100 g) makes it one of the lowest-fat snack options available. Per-variant nutrition for each flavour is listed on individual <Link href="/products" className="text-gold underline underline-offset-2">product pages</Link>.
            </p>
          </Section>

          {/* Section 6: Health Benefits */}
          <Section id="health-benefits" title="Health Benefits of Makhana">
            <Answer>{sectionIntro.health}</Answer>
            <div className="mt-4 space-y-4">
              <Benefit title="High Protein Supports Satiety and Muscle Health">
                With 9.7 g protein per 100 g, makhana provides more protein than most snack grains (puffed rice: 6 g, popcorn: 3.5 g). Protein promotes satiety, helping you feel full longer between meals, and supports muscle maintenance.
              </Benefit>
              <Benefit title="Very Low Fat — Guilt-Free Crunch">
                At 0.1 g fat per 100 g (in its plain form), makhana is among the lowest-fat snack seeds available. It is dry-roasted, never fried. Even the flavoured variants add only 0.3–1.2 g fat per 100 g from minimal oil coatings.
              </Benefit>
              <Benefit title="Naturally Gluten-Free and Vegan-Friendly">
                Makhana is not a grain but a seed, making it naturally gluten-free. It contains no wheat, barley, or rye. All Golden Deer products are processed in a dedicated facility with no gluten cross-contamination. Classic Roast, Pink Salt &amp; Pepper, Peri Peri, Spicy Masala, and Raw Makhana are vegan-friendly. See <Link href="/faq" className="text-gold underline underline-offset-2">the FAQ</Link> for dietary details.
              </Benefit>
              <Benefit title="Low Glycaemic Index — Diabetes-Friendly">
                The complex carbohydrates in makhana digest slowly, preventing rapid blood glucose spikes. Studies estimate the glycaemic index of popped makhana at under 50, which classifies it as a low-GI food. Its high fibre content further slows glucose absorption.
              </Benefit>
              <Benefit title="Rich in Antioxidants">
                Makhana contains flavonoids (including kaempferol derivatives) and phenolic compounds that act as antioxidants, helping neutralise free radicals in the body. The antioxidant activity is concentrated in the thin brown seed coat that sometimes remains on the popped makhana.
              </Benefit>
              <Benefit title="Supports Bone Health with Calcium, Magnesium, and Phosphorus">
                The mineral profile of makhana — approximately 60 mg calcium, 67 mg magnesium, and 150 mg phosphorus per 100 g — contributes to bone mineral density. Magnesium also supports muscle and nerve function.
              </Benefit>
            </div>
            <p className="mt-4 text-xs text-forest-deep/50 italic">
              These benefits are based on published nutritional research and traditional knowledge. Golden Deer makes no medical claims. Always consult a qualified healthcare professional for personalised dietary advice.
            </p>
          </Section>

          {/* Section 7: How to Roast at Home */}
          <Section id="roast-at-home" title="How to Roast and Season Makhana at Home">
            <Answer>{sectionIntro['roast-at-home']}</Answer>
            <div className="mt-4 space-y-3">
              <p className="text-sm sm:text-base text-forest-deep/80 leading-relaxed">
                Roasting makhana at home is straightforward and gives you full control over seasoning. Start with either <Link href="/products/plain" className="text-gold underline underline-offset-2">Classic Roast makhana</Link> (already popped, just need re-crisping and flavouring) or <Link href="/products/raw-makhana" className="text-gold underline underline-offset-2">raw makhana</Link> (needs the full popping process below).
              </p>
              <Step n={1} title="Heat the pan">Use a heavy-bottomed pan or kadhai on low flame. A non-stick or cast-iron pan works best. Do not use high heat — makhana burns quickly.</Step>
              <Step n={2} title="Add fat (optional)">Add 1 tsp ghee, coconut oil, or cold-pressed oil. For a dry roast, skip the fat entirely. Ghee adds a rich nutty flavour that complements makhana naturally.</Step>
              <Step n={3} title="Roast, stirring constantly">Add 2 cups of makhana. Keep stirring or tossing for 3–5 minutes. You will hear the makhana become crisper as moisture evaporates. Stop when the puffs develop a very light golden tint.</Step>
              <Step n={4} title="Season while hot">Remove from heat. Sprinkle your seasoning — salt, chaat masala, red chilli powder, turmeric, cumin powder, or anything from our <Link href="/recipes" className="text-gold underline underline-offset-2">recipe collection</Link>. Toss well. The residual heat helps the seasoning adhere.</Step>
              <Step n={5} title="Cool and enjoy">Spread on a plate to cool. Makhana crisps further as it cools. Store leftovers in an airtight container.</Step>
            </div>
            <p className="mt-4 text-sm sm:text-base text-forest-deep/80 leading-relaxed">
              For recipe ideas beyond basic seasoning, see our <Link href="/recipes" className="text-gold underline underline-offset-2">recipes page</Link> (makhana kheer, chaat, chivda trail mix, chocolate-coated makhana) and the journal article <Link href="/journal/7-makhana-recipes" className="text-gold underline underline-offset-2">7 Easy Makhana Recipes</Link>.
            </p>
          </Section>

          {/* Section 8: Storage */}
          <Section id="storage" title="How to Store Makhana">
            <Answer>{sectionIntro.storage}</Answer>
            <div className="mt-4 space-y-3">
              <p className="text-sm sm:text-base text-forest-deep/80 leading-relaxed">
                Makhana is hygroscopic — it absorbs moisture from the air, which softens its crunch. Proper storage preserves both texture and flavour.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-forest-deep/80 leading-relaxed">
                <li><strong>Airtight container:</strong> Transfer opened makhana to a glass jar or airtight container immediately. Never leave the pack open.</li>
                <li><strong>Cool, dry place:</strong> Store below 30 °C, away from direct sunlight, stoves, or other heat sources. Kitchen cabinets near the stove are too warm.</li>
                <li><strong>Closed pack shelf life:</strong> Our <Link href="/makhana/glossary/nitrogen-flushed-packaging" className="text-gold underline underline-offset-2">nitrogen-flushed</Link> pouches keep makhana fresh for 8–12 months unopened. See the pack for the best-before date.</li>
                <li><strong>Opened pack:</strong> Consume within 15–20 days for optimal crunch. After that, makhana slowly absorbs ambient moisture and softens.</li>
                <li><strong>Revive stale makhana:</strong> If your makhana has lost crunch, spread it on a baking tray and warm in a preheated oven at 120 °C for 3–4 minutes, or dry-roast in a pan on low flame for 2 minutes. Let it cool — it will crisp back up.</li>
              </ul>
            </div>
            <p className="mt-3 text-sm sm:text-base text-forest-deep/80 leading-relaxed">
              For bulk buyers, nitrogen-flushed packaging is essential for maintaining quality during storage and transit. <Link href="/bulk" className="text-gold underline underline-offset-2">Bulk inquiry page</Link> has detailed packaging options. See also our <Link href="/journal/bulk-makhana-supplier" className="text-gold underline underline-offset-2">bulk procurement guide</Link> for supplier evaluation criteria.
            </p>
          </Section>

          {/* Section 9: Buying Checklist */}
          <Section id="buying-checklist" title="How to Choose Good Makhana — Buying Checklist">
            <Answer>{sectionIntro['buying-checklist']}</Answer>
            <div className="mt-4 space-y-4">
              <CheckItem title="Uniform colour — white to pale cream" ok>
                Good makhana is uniformly white to pale cream with no yellow or brown patches. Yellowing indicates age or improper drying. If you see significant discolouration, reject the lot.
              </CheckItem>
              <CheckItem title="5–6 suta jumbo grade (18+ mm diameter)">
                Larger seeds produce better pops. The 5–6 suta jumbo grade is the gold standard for retail and export. If the pack does not specify a suta grade, ask the supplier before buying.
              </CheckItem>
              <CheckItem title="Less than 2 % broken pieces" ok>
                Broken makhana pieces are unavoidable during transit, but a good pack should have minimal breakage. High broken content indicates rough handling or low-grade sorting. Golden Deer&apos;s <Link href="/makhana/glossary/hand-sorting" className="text-gold underline underline-offset-2">hand sorting</Link> achieves less than 2 % broken pieces.
              </CheckItem>
              <CheckItem title="Crisp texture (not chewy or soft)" ok>
                Fresh makhana snaps cleanly when bitten — it should feel light and airy, not dense or chewy. Chewiness indicates moisture absorption or incomplete popping. The sound when you shake a pack should be a light rattle, not a dull thud.
              </CheckItem>
              <CheckItem title="Clean nutty aroma — no mustiness or rancid smell" ok>
                Fresh makhana has a mild, nutty, slightly toasty aroma. A musty or sour smell indicates moisture damage or fungal growth. A rancid smell indicates old or improperly stored product. If in doubt, do not eat it.
              </CheckItem>
              <CheckItem title="Nitrogen-flushed packaging for long shelf life">
                If you are buying in bulk or planning to store makhana for more than a month, insist on nitrogen-flushed packaging. It removes oxygen from the pack, preventing oxidation and moisture absorption. Read more in our journal: <Link href="/journal/bulk-makhana-supplier" className="text-gold underline underline-offset-2">what nitrogen flushing does</Link>.
              </CheckItem>
            </div>
            <p className="mt-4 text-sm sm:text-base text-forest-deep/80 leading-relaxed">
              Golden Deer meets every item on this checklist. Our 5–6 suta jumbo grade, hand-sorted, nitrogen-flushed, clean-label makhana is available for both <Link href="/products" className="text-gold underline underline-offset-2">retail purchase</Link> and <Link href="/bulk" className="text-gold underline underline-offset-2">bulk supply</Link>.
            </p>
          </Section>

          {/* Section 10: Makhana in Indian Tradition */}
          <Section id="tradition" title="Makhana in Indian Tradition">
            <Answer>{sectionIntro.tradition}</Answer>
            <p className="mt-4 text-sm sm:text-base text-forest-deep/80 leading-relaxed">
              <strong>Fasting food (vrat ka khana):</strong> Makhana is one of the most widely consumed fasting foods in North India. During Navratri, Ekadashi, Shivratri, and other Hindu fasting periods, makhana is prepared as kheer (sweet milk pudding), roasted with sendha namak (rock salt), or ground into flour for vrat-puris and rotis. Its classification as a phalahar (fruit-based) food — technically a seed, not a grain — makes it permissible during fasts when grains are avoided.
            </p>
            <p className="mt-3 text-sm sm:text-base text-forest-deep/80 leading-relaxed">
              <strong>Makhana kheer:</strong> The most iconic makhana dessert. Raw makhana is simmered in full-fat milk with sugar or jaggery, cardamom, saffron, and chopped nuts until the makhana softens and absorbs the milk. Served warm or chilled, it is a festival-season staple across Bihar, Uttar Pradesh, Punjab, and Rajasthan. See our <Link href="/recipes" className="text-gold underline underline-offset-2">recipes page</Link> for a makhana kheer recipe.
            </p>
            <p className="mt-3 text-sm sm:text-base text-forest-deep/80 leading-relaxed">
              <strong>Makhana in Ayurveda:</strong> Traditional Ayurvedic texts describe makhana as a <em>tridoshic</em> food — it is believed to balance all three doshas (vata, pitta, kapha). It is considered <em>vrishya</em> (aphrodisiac and rejuvenating), <em>stambhaka</em> (absorbent, useful for diarrhoea), and <em>balya</em> (strength-promoting). Ayurvedic practitioners recommend makhana for digestive health, kidney function, and as a general tonic. These are traditional claims that reflect centuries of empirical use, not modern clinical conclusions.
            </p>
            <p className="mt-3 text-sm sm:text-base text-forest-deep/80 leading-relaxed">
              <strong>Makhana chivda and namkeen:</strong> In Bihar, roasted makhana is a key ingredient in traditional chivda (savoury trail mix) alongside puffed rice, peanuts, roasted chana, and curry leaves. Many Indian namkeen (snack mix) brands include makhana as a premium ingredient. Our <Link href="/products/creamy-cheese" className="text-gold underline underline-offset-2">Creamy Cheese</Link> and <Link href="/products/pudina" className="text-gold underline underline-offset-2">Spicy Masala</Link> variants update this tradition for modern palates.
            </p>
          </Section>

          {/* Section 11: FAQ Mini */}
          <Section id="faq-mini" title="Makhana FAQ">
            <p className="text-sm sm:text-base text-forest-deep/60 leading-relaxed mb-6">
              Five common questions not already covered on our <Link href="/faq" className="text-gold underline underline-offset-2">main FAQ page</Link>. For more answers (storage, kids, weight loss, makhana vs chips, how much to eat daily), visit the full FAQ.
            </p>
            <div className="space-y-5">
              {faqMini.map((item) => (
                <div key={item.id} id={item.id}>
                  <h3 className="font-display text-lg text-forest-deep mb-1">{item.q}</h3>
                  <p className="text-sm sm:text-base text-forest-deep/80 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* Sources */}
          <Section id="sources" title="Sources &amp; Further Reading">
            <p className="text-sm sm:text-base text-forest-deep/80 leading-relaxed">
              Information on this page is drawn from published botanical, nutritional, and trade references.
              The following sources were consulted:
            </p>
            <ul className="mt-3 space-y-1.5 text-sm text-forest-deep/70 leading-relaxed list-disc pl-5">
              <li>
                <a href="https://en.wikipedia.org/wiki/Euryale_ferox" target="_blank" rel="noopener noreferrer" className="text-gold underline underline-offset-2">
                  Wikipedia — Euryale ferox
                </a>
                <span className="text-forest-deep/40"> &middot; Botanical and cultivation reference</span>
              </li>
              <li className="text-forest-deep/50 italic">
                USDA FoodData Central — makhana entries
              </li>
              <li className="text-forest-deep/50 italic">
                National Institute of Nutrition (NIN), India — Indian food composition tables
              </li>
              <li className="text-forest-deep/50 italic">
                Startup India portal &middot; FSSAI regulations &middot; Geographical Indications Registry
              </li>
            </ul>
            <p className="mt-3 text-xs text-forest-deep/50 italic leading-relaxed">
              Nutrition figures are approximate. Always verify against the batch-specific panel on your product pack.
              See the <Link href="/brand" className="text-gold underline underline-offset-2">Brand Facts</Link> page for legal registration details.
            </p>
          </Section>

          {/* Section 11.5: Comparisons & Nutrition Links */}
          <section id="comparisons" className="mb-12 scroll-mt-24">
            <h2 className="font-display text-2xl sm:text-3xl text-forest-deep mb-4 border-b border-gold/15 pb-2">Comparisons &amp; Nutrition Reference</h2>
            <p className="text-sm sm:text-base text-forest-deep/80 leading-relaxed mb-4">
              For deeper nutrition data and side-by-side snack comparisons, see these dedicated pages:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link
                href="/makhana/nutrition"
                className="block p-4 rounded-xl border border-forest/10 transition-colors hover:border-gold/30 hover:bg-gold/[0.02]"
              >
                <span className="font-display text-base text-forest-deep">Makhana Nutrition Reference &rarr;</span>
                <p className="mt-1 text-sm text-forest-deep/60 leading-relaxed">Full per-100g and per-serving tables, mineral profile, glycaemic index, and flavouring impact.</p>
              </Link>
              <Link
                href="/makhana/vs"
                className="block p-4 rounded-xl border border-forest/10 transition-colors hover:border-gold/30 hover:bg-gold/[0.02]"
              >
                <span className="font-display text-base text-forest-deep">Makhana vs Other Snacks &rarr;</span>
                <p className="mt-1 text-sm text-forest-deep/60 leading-relaxed">Honest comparisons with chips, popcorn, almonds, and peanuts — including where the other snack wins.</p>
              </Link>
            </div>
          </section>

          {/* Section 12: Golden Deer Positioning + CTAs */}
          <div className="mt-16 p-8 rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/[0.04] to-forest-deep/[0.02]">
            <h2 className="font-display text-2xl sm:text-3xl text-forest-deep leading-tight">Makhana at Golden Deer</h2>
            <p className="mt-3 text-sm sm:text-base text-forest-deep/80 leading-relaxed">
              Golden Deer was founded to bring makhana to the world the way it deserves to be eaten: clean-label, jumbo-grade, slow-roasted without compromise. Our Classic Roast has three ingredients. Every flavoured variant uses real food — real cheddar, real tomato powder, whole spices — not flavouring agents. We source directly from Bihar&apos;s farming cooperatives, hand-sort for 5–6 suta jumbo grade, nitrogen-flush every pack, and roast in a touchless facility with zero trans fats and zero artificial additives.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gold text-forest-deep font-medium text-sm tracking-wide transition-all hover:bg-gold-light shadow-[0_4px_6px_-1px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.25)]"
              >
                Shop Retail Makhana
              </Link>
              <Link
                href="/bulk"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-gold text-gold font-medium text-sm tracking-wide transition-all hover:bg-gold hover:text-forest-deep"
              >
                Bulk &amp; Wholesale Inquiry
              </Link>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/our-story" className="text-xs text-forest-deep/50 hover:text-gold transition-colors underline underline-offset-2">Our story &rarr;</Link>
              <Link href="/brand" className="text-xs text-forest-deep/50 hover:text-gold transition-colors underline underline-offset-2">Brand facts &rarr;</Link>
              <Link href="/faq" className="text-xs text-forest-deep/50 hover:text-gold transition-colors underline underline-offset-2">FAQ &rarr;</Link>
              <Link href="/makhana/nutrition" className="text-xs text-forest-deep/50 hover:text-gold transition-colors underline underline-offset-2">Nutrition &rarr;</Link>
              <Link href="/makhana/vs" className="text-xs text-forest-deep/50 hover:text-gold transition-colors underline underline-offset-2">Comparisons &rarr;</Link>
              <Link href="/makhana/glossary" className="text-xs text-forest-deep/50 hover:text-gold transition-colors underline underline-offset-2">Glossary &rarr;</Link>
            </div>
          </div>
        </Container>
      </main>
    </>
  )
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-12 last:mb-0 scroll-mt-24">
      <h2 className="font-display text-2xl sm:text-3xl text-forest-deep mb-4 border-b border-gold/15 pb-2">{title}</h2>
      {children}
    </section>
  )
}

function Answer({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm sm:text-base text-forest-deep/80 leading-relaxed bg-forest-deep/[0.02] border-l-2 border-gold pl-4 py-2 -ml-4">
      {children}
    </p>
  )
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-gold/15 text-gold-deep text-xs font-bold font-mono mt-0.5">{n}</span>
      <div>
        <span className="text-sm font-semibold text-forest-deep">{title}: </span>
        <span className="text-sm sm:text-base text-forest-deep/80 leading-relaxed">{children}</span>
      </div>
    </div>
  )
}

function Benefit({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-display text-lg text-forest-deep mb-1">{title}</h3>
      <p className="text-sm sm:text-base text-forest-deep/80 leading-relaxed">{children}</p>
    </div>
  )
}

function CheckItem({ title, children, ok }: { title: string; children: React.ReactNode; ok?: boolean }) {
  return (
    <div className="flex gap-3">
      <span className={`flex-shrink-0 mt-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${ok ? 'bg-[#1A7A3A]/10 text-[#1A7A3A]' : 'bg-gold/10 text-gold-deep'}`}>
        {ok ? '\u2713' : '?'}
      </span>
      <div>
        <span className="text-sm font-semibold text-forest-deep">{title}</span>
        <p className="text-sm sm:text-base text-forest-deep/80 leading-relaxed mt-1">{children}</p>
      </div>
    </div>
  )
}

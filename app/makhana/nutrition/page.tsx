import type { Metadata } from 'next'
import Link from 'next/link'
import { Container, Tag } from '@/components/shared/primitives'

const BASE_URL = 'https://www.cosmicpower.ltd'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Makhana Nutrition — Calories, Protein, Carbs, Fat, Minerals per 100g | Golden Deer',
    description:
      'The definitive makhana nutrition reference: full per-100g and per-30g-serving tables for energy, protein, carbs, sugar, fat, fibre, calcium, magnesium, potassium, and phosphorus. Glycaemic index, how flavouring changes the numbers, and FAQ.',
    openGraph: {
      title: 'Makhana Nutrition — Complete Reference Guide',
      description:
        'Full nutrition tables per 100g and per serving for makhana (fox nuts): calories, protein, carbs, fat, fibre, minerals, glycaemic index, and flavouring impact.',
      url: `${BASE_URL}/makhana/nutrition`,
    },
    alternates: { canonical: `${BASE_URL}/makhana/nutrition` },
    keywords: ['makhana nutrition', 'makhana calories', 'makhana protein', 'makhana carbs', 'makhana fat', 'makhana fibre', 'makhana minerals', 'makhana glycaemic index', 'fox nuts nutrition', 'phool makhana nutrition', 'makhana per 100g'],
  }
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      headline: 'Makhana Nutrition — Per 100g, Per Serving, Minerals, GI, and Flavouring Impact',
      description: 'The definitive Makhana nutrition reference with full tables, glycaemic character, mineral profile, and how flavourings change the numbers.',
      datePublished: '2026-07-16',
      dateModified: '2026-07-16',
      author: { '@type': 'Organization', name: 'Golden Deer', url: BASE_URL },
      publisher: { '@type': 'Organization', name: 'Golden Deer', url: BASE_URL },
      mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE_URL}/makhana/nutrition` },
    },
    {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/makhana/nutrition`,
      speakable: { '@type': 'SpeakableSpecification', cssSelector: ['.speakable-summary'] },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
        { '@type': 'ListItem', position: 2, name: 'Makhana Guide', item: `${BASE_URL}/makhana` },
        { '@type': 'ListItem', position: 3, name: 'Nutrition', item: `${BASE_URL}/makhana/nutrition` },
      ],
    },
  ],
}

const disclaimer =
  'Approximate values — verify against lab analysis before on-pack claims'

export default function NutritionPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-cream">
        <Container className="py-12 lg:py-20 max-w-4xl">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-forest-deep/50">
              <li><Link href="/" className="transition-colors hover:text-forest-deep/70">Home</Link></li>
              <li aria-hidden="true" className="text-forest-deep/20">/</li>
              <li><Link href="/makhana" className="transition-colors hover:text-forest-deep/70">Makhana Guide</Link></li>
              <li aria-hidden="true" className="text-forest-deep/20">/</li>
              <li className="text-forest-deep/70" aria-current="page">Nutrition</li>
            </ol>
          </nav>

          <Tag variant="forest" className="mb-4">Nutrition Reference</Tag>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-tight text-forest-deep">
            Makhana Nutrition
          </h1>
          <p className="mt-1 text-xs text-forest-deep/40 font-mono">Complete reference · July 2026</p>

          <div className="mt-8 p-6 rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/[0.05] to-transparent speakable-summary">
            <p className="text-sm sm:text-base text-forest-deep leading-relaxed font-medium">
              Makhana (popped fox nuts) is a nutrient-dense seed snack: approximately 347 kcal,
              9.7 g protein, 76.9 g carbohydrates, and 0.1 g fat per 100 g. It is naturally
              gluten-free, very low in sodium, and a source of calcium, magnesium, phosphorus,
              and potassium. This page is the definitive nutrition reference for plain roasted
              makhana, with per-serving conversions, mineral details, and honest notes on how
              flavouring changes the profile.
            </p>
          </div>

          <nav className="mt-8 mb-10 flex flex-wrap gap-3 text-sm" aria-label="Section jump links">
            {[
              ['per-100g', 'Nutrition per 100g'],
              ['per-serving', 'Per Serving (30g)'],
              ['mineral-profile', 'Mineral Profile'],
              ['glycaemic-index', 'Glycaemic Index'],
              ['flavouring-impact', 'How Flavouring Changes the Numbers'],
              ['faq', 'FAQ'],
            ].map(([href, label]) => (
              <a
                key={href}
                href={`#${href}`}
                className="px-3 py-1.5 rounded-lg border border-forest/15 text-forest-deep/70 hover:text-gold hover:border-gold/30 transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Per 100g */}
          <Section id="per-100g" title="Nutrition per 100 g">
            <p className="text-sm sm:text-base text-forest-deep/80 leading-relaxed mb-4">
              Values for plain roasted makhana with minimal salt. These are composite estimates
              from published USDA and NIN (National Institute of Nutrition, India) databases.
            </p>
            <div className="overflow-x-auto border border-forest/10 rounded-xl">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-forest-deep/5 border-b border-forest/10">
                    <th className="text-left px-4 py-3 font-mono text-xs uppercase tracking-wider text-forest-deep/60">Nutrient</th>
                    <th className="text-right px-4 py-3 font-mono text-xs uppercase tracking-wider text-forest-deep/60">Per 100 g</th>
                    <th className="text-right px-4 py-3 font-mono text-xs uppercase tracking-wider text-forest-deep/60 text-xs">% Daily Value*</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-forest/10">
                  <tr className="hover:bg-cream-dark/30 transition-colors"><td className="px-4 py-3 text-forest-deep font-semibold">Energy</td><td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/70">347 kcal</td><td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/40 text-xs">17 %</td></tr>
                  <tr className="hover:bg-cream-dark/30 transition-colors"><td className="px-4 py-3 text-forest-deep">Protein</td><td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/70">9.7 g</td><td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/40 text-xs">19 %</td></tr>
                  <tr className="hover:bg-cream-dark/30 transition-colors"><td className="px-4 py-3 text-forest-deep">Total Carbohydrates</td><td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/70">76.9 g</td><td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/40 text-xs">28 %</td></tr>
                  <tr className="hover:bg-cream-dark/30 transition-colors"><td className="px-4 py-3 text-forest-deep pl-8">Sugar</td><td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/70">&lt;1 g</td><td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/40 text-xs">—</td></tr>
                  <tr className="hover:bg-cream-dark/30 transition-colors"><td className="px-4 py-3 text-forest-deep">Total Fat</td><td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/70">0.1 g</td><td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/40 text-xs">&lt;1 %</td></tr>
                  <tr className="hover:bg-cream-dark/30 transition-colors"><td className="px-4 py-3 text-forest-deep pl-8">Saturated Fat</td><td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/70">0.0 g</td><td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/40 text-xs">0 %</td></tr>
                  <tr className="hover:bg-cream-dark/30 transition-colors"><td className="px-4 py-3 text-forest-deep">Fibre</td><td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/70">7.6 g</td><td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/40 text-xs">30 %</td></tr>
                  <tr className="hover:bg-cream-dark/30 transition-colors"><td className="px-4 py-3 text-forest-deep">Sodium</td><td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/70">~2 mg (plain)</td><td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/40 text-xs">&lt;1 %</td></tr>
                  <tr className="hover:bg-cream-dark/30 transition-colors"><td className="px-4 py-3 text-forest-deep">Calcium</td><td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/70">60 mg</td><td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/40 text-xs">6 %</td></tr>
                  <tr className="hover:bg-cream-dark/30 transition-colors"><td className="px-4 py-3 text-forest-deep">Magnesium</td><td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/70">67 mg</td><td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/40 text-xs">17 %</td></tr>
                  <tr className="hover:bg-cream-dark/30 transition-colors"><td className="px-4 py-3 text-forest-deep">Phosphorus</td><td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/70">150 mg</td><td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/40 text-xs">15 %</td></tr>
                  <tr className="hover:bg-cream-dark/30 transition-colors"><td className="px-4 py-3 text-forest-deep">Potassium</td><td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/70">~300 mg</td><td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/40 text-xs">9 %</td></tr>
                  <tr className="hover:bg-cream-dark/30 transition-colors"><td className="px-4 py-3 text-forest-deep">Iron</td><td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/70">~1.5 mg</td><td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/40 text-xs">8 %</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-forest-deep/40 italic mt-2">
              {disclaimer} *% Daily Value based on a 2,000 kcal diet. Individual requirements vary.
            </p>
          </Section>

          {/* Per Serving */}
          <Section id="per-serving" title="Nutrition per 30 g Serving">
            <p className="text-sm sm:text-base text-forest-deep/80 leading-relaxed mb-4">
              A standard single-serving portion of roasted makhana is approximately 30 g
              (about 2–3 handfuls, or one small bowl). Here is how the numbers scale:
            </p>
            <div className="overflow-x-auto border border-forest/10 rounded-xl">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-forest-deep/5 border-b border-forest/10">
                    <th className="text-left px-4 py-3 font-mono text-xs uppercase tracking-wider text-forest-deep/60">Nutrient</th>
                    <th className="text-right px-4 py-3 font-mono text-xs uppercase tracking-wider text-forest-deep/60">Per 30 g Serving</th>
                    <th className="text-right px-4 py-3 font-mono text-xs uppercase tracking-wider text-forest-deep/60 text-xs">% Daily Value*</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-forest/10">
                  <tr className="hover:bg-cream-dark/30 transition-colors"><td className="px-4 py-3 text-forest-deep font-semibold">Energy</td><td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/70">104 kcal</td><td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/40 text-xs">5 %</td></tr>
                  <tr className="hover:bg-cream-dark/30 transition-colors"><td className="px-4 py-3 text-forest-deep">Protein</td><td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/70">2.9 g</td><td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/40 text-xs">6 %</td></tr>
                  <tr className="hover:bg-cream-dark/30 transition-colors"><td className="px-4 py-3 text-forest-deep">Carbohydrates</td><td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/70">23.1 g</td><td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/40 text-xs">8 %</td></tr>
                  <tr className="hover:bg-cream-dark/30 transition-colors"><td className="px-4 py-3 text-forest-deep">Fat</td><td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/70">0.03 g</td><td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/40 text-xs">&lt;1 %</td></tr>
                  <tr className="hover:bg-cream-dark/30 transition-colors"><td className="px-4 py-3 text-forest-deep">Fibre</td><td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/70">2.3 g</td><td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/40 text-xs">9 %</td></tr>
                  <tr className="hover:bg-cream-dark/30 transition-colors"><td className="px-4 py-3 text-forest-deep">Calcium</td><td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/70">18 mg</td><td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/40 text-xs">2 %</td></tr>
                  <tr className="hover:bg-cream-dark/30 transition-colors"><td className="px-4 py-3 text-forest-deep">Magnesium</td><td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/70">20 mg</td><td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/40 text-xs">5 %</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-forest-deep/40 italic mt-2">
              {disclaimer} *% DV based on 2,000 kcal diet. A serving of flavoured makhana may differ (see below).
            </p>
            <p className="mt-3 text-sm sm:text-base text-forest-deep/80 leading-relaxed">
              Per-variant nutrition is listed on each individual <Link href="/products" className="text-gold underline underline-offset-2">product page</Link>.
              The nutrition panel on your Golden Deer pack is the authoritative source for that specific batch.
            </p>
          </Section>

          {/* Mineral Profile */}
          <Section id="mineral-profile" title="Mineral Profile">
            <p className="text-sm sm:text-base text-forest-deep/80 leading-relaxed mb-4">
              Makhana is a better source of several key minerals than most puffed or popped snacks.
              The mineral content originates from the Gangetic silt in which the Euryale ferox plant grows
              — the <Link href="/makhana/glossary/mithila-makhana-gi" className="text-gold underline underline-offset-2">Mithila Makhana GI tag</Link> formally recognises the relationship between soil chemistry and product quality.
            </p>
            <div className="overflow-x-auto border border-forest/10 rounded-xl">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-forest-deep/5 border-b border-forest/10">
                    <th className="text-left px-4 py-3 font-mono text-xs uppercase tracking-wider text-forest-deep/60">Mineral</th>
                    <th className="text-right px-4 py-3 font-mono text-xs uppercase tracking-wider text-forest-deep/60">Per 100 g</th>
                    <th className="text-left px-4 py-3 font-mono text-xs uppercase tracking-wider text-forest-deep/60">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-forest/10">
                  <tr className="hover:bg-cream-dark/30 transition-colors"><td className="px-4 py-3 text-forest-deep font-semibold">Calcium</td><td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/70">60 mg</td><td className="px-4 py-3 text-forest-deep/70 text-sm">Comparable to almonds (75 mg per 100 g almonds with skin)</td></tr>
                  <tr className="hover:bg-cream-dark/30 transition-colors"><td className="px-4 py-3 text-forest-deep font-semibold">Magnesium</td><td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/70">67 mg</td><td className="px-4 py-3 text-forest-deep/70 text-sm">Supports muscle function, nerve transmission, and energy metabolism</td></tr>
                  <tr className="hover:bg-cream-dark/30 transition-colors"><td className="px-4 py-3 text-forest-deep font-semibold">Phosphorus</td><td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/70">150 mg</td><td className="px-4 py-3 text-forest-deep/70 text-sm">Important for bone health and energy storage (ATP)</td></tr>
                  <tr className="hover:bg-cream-dark/30 transition-colors"><td className="px-4 py-3 text-forest-deep font-semibold">Potassium</td><td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/70">~300 mg</td><td className="px-4 py-3 text-forest-deep/70 text-sm">Helps counterbalance sodium intake; supports blood pressure regulation</td></tr>
                  <tr className="hover:bg-cream-dark/30 transition-colors"><td className="px-4 py-3 text-forest-deep font-semibold">Iron</td><td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/70">~1.5 mg</td><td className="px-4 py-3 text-forest-deep/70 text-sm">Non-heme iron; absorption improved when paired with vitamin C</td></tr>
                  <tr className="hover:bg-cream-dark/30 transition-colors"><td className="px-4 py-3 text-forest-deep font-semibold">Zinc</td><td className="px-4 py-3 text-right font-mono tabular-nums text-forest-deep/70">~1.0 mg</td><td className="px-4 py-3 text-forest-deep/70 text-sm">Supports immune function and protein synthesis</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-forest-deep/40 italic mt-2">{disclaimer}</p>
          </Section>

          {/* Glycaemic Index */}
          <Section id="glycaemic-index" title="Glycaemic Index">
            <p className="text-sm sm:text-base text-forest-deep/80 leading-relaxed mb-4">
              Makhana has a low estimated glycaemic index (GI) of approximately 40–50,
              placing it in the low-GI category (GI ≤ 55). This means its carbohydrates are
              digested and absorbed slowly, causing a gradual rise in blood glucose rather than
              a sharp spike.
            </p>
            <p className="text-sm sm:text-base text-forest-deep/80 leading-relaxed">
              The low GI is attributed to two factors: the high amylose-to-amylopectin ratio
              in makhana starch (amylose digests more slowly), and the presence of fibre (7.6 g
              per 100 g) which slows gastric emptying and glucose absorption. A low-GI food is
              beneficial for glycaemic management in people with diabetes when consumed as part
              of a balanced diet. However, individual glycaemic response varies — factors like
              meal composition, cooking method, and personal metabolism all affect actual blood
              glucose impact. Consult your healthcare provider for personalised dietary advice.
            </p>
            <p className="mt-3 text-sm sm:text-base text-forest-deep/80 leading-relaxed">
              For comparison: white rice has a GI of approximately 70–90 (high), wholemeal bread
              70–75, air-popped popcorn ~55–65 (low–medium), and almonds GI ~15 (very low).
              Makhana sits in a favourable range — lower than most grain-based snacks but higher
              than nuts.
            </p>
          </Section>

          {/* Flavouring Impact */}
          <Section id="flavouring-impact" title="How Flavouring Changes the Numbers">
            <p className="text-sm sm:text-base text-forest-deep/80 leading-relaxed mb-4">
              The nutrition tables above describe <strong>plain roasted makhana</strong>. Flavoured
              variants — such as Creamy Cheese, Tangy Tomato, or Spicy Masala — add small amounts
              of oil (for seasoning adhesion), real food ingredients (cheese powder, tomato powder,
              spices), and salt. Here is what changes:
            </p>
            <div className="space-y-3 mt-4">
              <div>
                <h3 className="font-display text-base text-forest-deep mb-0.5">Fat increases slightly</h3>
                <p className="text-sm sm:text-base text-forest-deep/80 leading-relaxed">
                  The oil coating for seasoning adhesion adds 0.3–1.2 g fat per 100 g, depending on
                  the variant. This is still an order of magnitude less than fried snacks (35+ g per 100 g).
                  Golden Deer uses only cold-pressed sunflower oil in minimal quantity.
                </p>
              </div>
              <div>
                <h3 className="font-display text-base text-forest-deep mb-0.5">Sodium increases</h3>
                <p className="text-sm sm:text-base text-forest-deep/80 leading-relaxed">
                  Plain makhana has negligible sodium (~2 mg per 100 g). Seasoned variants add salt:
                  typically 200–400 mg per 100 g, comparable to lightly salted popcorn. If you are on
                  a low-sodium diet, choose Classic Roast (lightly salted) or plain.
                </p>
              </div>
              <div>
                <h3 className="font-display text-base text-forest-deep mb-0.5">Calories increase marginally</h3>
                <p className="text-sm sm:text-base text-forest-deep/80 leading-relaxed">
                  Expect approximately 10–30 additional kcal per 100 g in flavoured variants due to the
                  added oil and ingredient powder. The difference per 30 g serving is negligible
                  (3–9 kcal).
                </p>
              </div>
              <div>
                <h3 className="font-display text-base text-forest-deep mb-0.5">Protein and fibre remain stable</h3>
                <p className="text-sm sm:text-base text-forest-deep/80 leading-relaxed">
                  The base makhana provides all the protein and fibre. Seasoning adds negligible
                  quantities of either. Our flavoured variants retain the full nutritional advantage of
                  the plain product.
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm sm:text-base text-forest-deep/80 leading-relaxed">
              For precise per-variant nutrition, check the nutrition panel on your specific pack or
              visit the individual <Link href="/products" className="text-gold underline underline-offset-2">product pages</Link>.
            </p>
          </Section>

          {/* FAQ */}
          <Section id="faq" title="Frequently Asked Questions">
            <div className="space-y-5 mt-4">
              <FAQ
                q="Is makhana good for weight loss?"
                a="Yes, makhana is an excellent snack for weight management. A 30 g serving has approximately 104 calories, 0.03 g fat, and 2.3 g fibre. The combination of protein (2.9 g per serving) and fibre promotes satiety, helping you feel full between meals. The low calorie density (you get a large volume for few calories) makes it easier to stay within your daily energy budget. For best results, choose plain or lightly salted variants and pair makhana with a balanced diet and regular exercise."
              />
              <FAQ
                q="Can I eat makhana every day?"
                a="Yes. Makhana is a whole seed with no artificial additives (in its plain form) and is safe for daily consumption. A serving of 30 g per day provides useful protein, fibre, and minerals without adding significant fat or sodium to your diet. There are no known adverse effects of eating makhana daily for healthy individuals. As with any food, variety matters — rotate makhana with nuts, seeds, fruits, and vegetables for a broad nutrient profile."
              />
              <FAQ
                q="Is makhana keto-friendly?"
                a="No. Makhana is predominantly carbohydrate (76.9 g per 100 g) with minimal fat. It is not suitable for a standard ketogenic diet that requires very low carbohydrate intake (typically under 20–50 g net carbs per day). A 30 g serving of makhana provides approximately 23 g of carbohydrates, which would consume most or all of a keto dieter's daily carb allowance. Individuals on low-carb diets may prefer nuts and seeds with higher fat and lower carb content."
              />
              <FAQ
                q="How does makhana protein compare to other plant proteins?"
                a="Makhana's protein content (9.7 g per 100 g) is higher than most puffed grains (puffed rice: ~6 g, popcorn: ~3.5 g) and comparable to quinoa (4.4 g cooked, ~14 g dry). It is lower than legumes (chickpeas: ~19 g, lentils: ~25 g) and seeds (pumpkin seeds: ~30 g). Makhana protein is not a complete protein (it is low in certain essential amino acids like lysine), but as part of a varied diet that includes other plant proteins, it contributes usefully to daily protein intake."
              />
              <FAQ
                q="What is the shelf life of makhana?"
                a="Properly packaged makhana in nitrogen-flushed pouches has a shelf life of 8–12 months from the date of packaging when stored unopened in a cool, dry place (below 30 °C). Once opened, consume within 15–20 days for optimal crunchiness. After opening, transfer to an airtight container. If your makhana loses crunch, you can revive it by warming in an oven at 120 °C for 3–4 minutes or dry-roasting in a pan on low flame for 2 minutes."
              />
            </div>
          </Section>

          {/* Sources */}
          <Section id="sources" title="Sources &amp; Further Reading">
            <p className="text-sm sm:text-base text-forest-deep/80 leading-relaxed">
              Nutrition figures on this page are composite estimates from published databases.
              They are not batch-level laboratory analyses. The following sources were consulted:
            </p>
            <ul className="mt-3 space-y-1.5 text-sm text-forest-deep/70 leading-relaxed list-disc pl-5">
              <li>
                <a href="https://en.wikipedia.org/wiki/Euryale_ferox" target="_blank" rel="noopener noreferrer" className="text-gold underline underline-offset-2">
                  Wikipedia — Euryale ferox (Makhana)
                </a>
                <span className="text-forest-deep/40"> &middot; Botanical reference and cultivation background</span>
              </li>
              <li className="text-forest-deep/50 italic">
                USDA FoodData Central — makhana entries (accessed 2026)
              </li>
              <li className="text-forest-deep/50 italic">
                National Institute of Nutrition (NIN), India — Indian food composition tables
              </li>
            </ul>
            <p className="mt-3 text-xs text-forest-deep/50 italic leading-relaxed">
              Always verify nutrition values against the batch-specific panel on your product pack.
              Golden Deer products carry lab-verified nutrition data generated per production run.
            </p>
          </Section>

          {/* Bottom CTAs */}
          <div className="mt-16 p-8 rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/[0.04] to-forest-deep/[0.02]">
            <h2 className="font-display text-2xl sm:text-3xl text-forest-deep leading-tight">Makhana Nutrition — Summary</h2>
            <p className="mt-3 text-sm sm:text-base text-forest-deep/80 leading-relaxed">
              High in protein. Almost zero fat. Rich in fibre, calcium, magnesium, and phosphorus.
              Low glycaemic index. Naturally gluten-free. Makhana is one of the most nutrient-dense
              seed snacks available — and every Golden Deer product delivers it in its best form:
              jumbo-grade, clean-label, nitrogen-flushed for freshness.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gold text-forest-deep font-medium text-sm tracking-wide transition-all hover:bg-gold-light shadow-[0_4px_6px_-1px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.25)]"
              >
                Shop Makhana
              </Link>
              <Link
                href="/makhana"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-gold text-gold font-medium text-sm tracking-wide transition-all hover:bg-gold hover:text-forest-deep"
              >
                Back to Makhana Guide
              </Link>
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

function FAQ({ q, a }: { q: string; a: string }) {
  return (
    <div>
      <h3 className="font-display text-lg text-forest-deep mb-1">{q}</h3>
      <p className="text-sm sm:text-base text-forest-deep/80 leading-relaxed">{a}</p>
    </div>
  )
}

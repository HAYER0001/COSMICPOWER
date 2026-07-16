'use client'

import { useState } from 'react'
import type { JournalEntry } from '@/content/journal'
import { site } from '@/content/site'
import { Divider } from '@/components/shared/primitives'
import { Link as LinkIcon, MessageCircle } from 'lucide-react'

const articleBody: Record<
  string,
  { type: 'heading' | 'text' | 'link' | 'bullet'; content: string; href?: string }[]
> = {
  'golden-grain-ancient-superfood': [
    { type: 'text', content: 'Long before the wellness industry rediscovered it, makhana was prized in Ayurveda as a tridoshic food that nourishes body, mind, and spirit. For millennia, the Euryale ferox water lily has grown in the still waters of Asia\'s wetlands, producing seeds that native communities harvested, roasted, and treasured.' },
    { type: 'heading', content: 'What Makes Makhana a "Superfood"?' },
    { type: 'text', content: 'Modern nutritional science has confirmed what ancient wisdom knew all along. Makhana is rich in protein (9.7g per 100g), extremely low in fat (0.1g), and packed with antioxidants including gallic acid and chlorogenic acid. Its low glycaemic index makes it an excellent snack for blood sugar management.' },
    { type: 'text', content: 'Unlike many trendy superfoods that are imported and expensive, makhana grows abundantly in India\'s own wetlands — primarily in Bihar, Assam, and parts of Eastern Uttar Pradesh. It is a crop that has sustained local communities for generations while remaining virtually unknown to the wider world.' },
    { type: 'heading', content: 'The Ayurvedic Perspective' },
    { type: 'text', content: 'In Ayurveda, makhana is considered a tridoshic food — meaning it balances Vata, Pitta, and Kapha doshas. It is recommended for strengthening the reproductive system, improving kidney function, and as a sattvic food that promotes mental clarity and spiritual well-being.' },
    { type: 'text', content: 'Today, Golden Deer is proud to bring this ancient superfood to modern Indian households in a form that is convenient, delicious, and uncompromisingly clean.' },
  ],
  'from-wetlands-to-your-bowl': [
    { type: 'text', content: 'Every seed of Golden Deer makhana begins its journey in the flooded fields of Bihar — a region that produces over 90% of India\'s makhana. But the journey from seed to snack is anything but simple.' },
    { type: 'heading', content: 'Step 1: The Wetlands' },
    { type: 'text', content: 'Makhana is not planted in soil. The seeds of the Euryale ferox water lily are sown directly into the muddy beds of shallow ponds and wetlands. These water bodies, often communally managed by farming cooperatives, provide the perfect environment for the seeds to germinate and grow.' },
    { type: 'heading', content: 'Step 2: Hand Harvesting' },
    { type: 'text', content: 'Harvesting makhana is one of the most labour-intensive agricultural processes in India. Farmers wade into chest-deep water, feeling for the mature seed pods with their feet. Each pod is carefully collected by hand — a skill that takes years to master.' },
    { type: 'text', content: 'Golden Deer partners directly with these farming cooperatives, ensuring fair prices and traceable sourcing for every lot we purchase.' },
    { type: 'heading', content: 'Step 3: Touchless Processing' },
    { type: 'text', content: 'Once harvested, the seeds arrive at our touchless roasting facility where they are sorted, graded by size, and slow-roasted in small batches. Our gentle dry-heat process preserves every nutrient while delivering the signature ethereal crunch that defines Golden Deer.' },
  ],
  '5-reasons-switch-to-makhana': [
    { type: 'heading', content: '1. Blood Sugar Stability' },
    { type: 'text', content: 'Unlike packaged chips and biscuits that cause rapid spikes in blood glucose, makhana has a low glycaemic index. The complex carbohydrates in makhana are digested slowly, providing sustained energy without the crash that follows refined snacks.' },
    { type: 'heading', content: '2. Remarkably Low in Fat' },
    { type: 'text', content: 'At just 0.1g of fat per 100g, makhana is one of the lowest-fat snack options available. Compare that to potato chips (35g+ of fat per 100g) or fried namkeen, and the difference is staggering. You get the crunch without the grease.' },
    { type: 'heading', content: '3. High Protein for Satiety' },
    { type: 'text', content: 'With 9.7g of protein per 100g, makhana keeps you fuller for longer. This makes it an excellent snack between meals — especially for anyone trying to manage their weight without feeling deprived.' },
    { type: 'heading', content: '4. Gluten-Free by Nature' },
    { type: 'text', content: 'Makhana is naturally gluten-free — it is not a grain but a seed from a water lily. For anyone with celiac sensitivity or gluten intolerance, makhana offers a safe, delicious alternative to wheat-based snacks.' },
    { type: 'heading', content: '5. Clean-Label Ingredients' },
    { type: 'text', content: 'Golden Deer makhana contains exactly what you see on the ingredient list — no artificial flavours, no preservatives, no MSG, no palm oil. In a world of processed food, clean-label snacking is not a luxury. It is a right.' },
  ],
  'makhana-for-every-diet': [
    { type: 'text', content: 'One of the most remarkable things about makhana is how seamlessly it fits into almost every major dietary framework. Whether you are keto, vegan, paleo, or gluten-free, makhana belongs on your plate.' },
    { type: 'heading', content: 'Keto-Friendly Crunch' },
    { type: 'text', content: 'While makhana does contain carbohydrates (76.9g per 100g), its high fibre content means net carbs are lower than the total suggests. For keto dieters, makhana can be enjoyed in moderation — think of it as a periodic treat rather than a daily staple.' },
    { type: 'heading', content: 'Vegan and Plant-Based' },
    { type: 'text', content: 'All Golden Deer products are 100% plant-based. Our Classic Roast, Pink Salt & Pepper, Tangy Tomato, and Spicy Masala variants contain no animal products whatsoever. Creamy Cheese uses real cheddar, so vegans should stick to the other five flavours.' },
    { type: 'heading', content: 'Gluten-Free and Grain-Free' },
    { type: 'text', content: 'Makhana is naturally free from gluten and grains — it is a seed, not a cereal grain. This makes it safe for those with celiac disease, gluten sensitivity, or anyone following a grain-free paleo diet.' },
    { type: 'text', content: 'No matter your dietary preferences, Golden Deer has a makhana variant that fits. Explore our full range on the products page.' },
    { type: 'link', content: 'Browse all flavours →', href: '/products' },
  ],
  'art-of-slow-roasting': [
    { type: 'text', content: 'Ask any makhana connoisseur what makes great makhana, and they will tell you the same thing: it is all in the roast. Fast-roasting might be cheaper and faster, but it produces a snack that is brittle, uneven, and lacking in depth of flavour.' },
    { type: 'heading', content: 'Why Speed Ruins Makhana' },
    { type: 'text', content: 'When raw makhana is exposed to high heat too quickly, the outer shell hardens before the interior has a chance to puff properly. The result is a dense, tooth-cracking crunch that lacks the signature airy texture that makes makhana special.' },
    { type: 'text', content: 'At Golden Deer, we take a different approach. Each batch spends 40 minutes in our gentle dry-heat roaster, where the temperature is carefully controlled to allow the moisture inside each seed to turn to steam gradually, puffing the seed from within.' },
    { type: 'heading', content: 'The 40-Minute Difference' },
    { type: 'text', content: 'Our slow-roasting process ensures every puff achieves the perfect balance: a delicate, melt-in-the-mouth crunch that shatters softly with each bite. The natural nuttiness of the makhana is preserved, enhanced only by a whisper of cold-pressed oil and fine sea salt.' },
    { type: 'text', content: 'It takes longer, costs more, and requires constant attention. But the result is a snack that tastes of patience and care — because it is.' },
  ],
  'beyond-bhujia-reinventing-indian-snacking': [
    { type: 'text', content: 'India snacks on tradition. Bhujia, namkeen, chanachur — every region has its own beloved mix of fried gram flour, nuts, and spices. These snacks are woven into the fabric of Indian life, from evening chai to festive gatherings.' },
    { type: 'heading', content: 'The Shift in the Aisle' },
    { type: 'text', content: 'But something is changing in the packaged snack aisle. A growing number of consumers are reading ingredient lists, checking nutritional panels, and asking questions their parents never thought to ask. They want the flavours they love, but without the refined oils, artificial colours, and preservatives.' },
    { type: 'text', content: 'Enter makhana. Light, airy, naturally nutritious, and endlessly versatile — makhana is perfectly positioned to become India\'s next great snack staple.' },
    { type: 'heading', content: 'Tradition Meets Innovation' },
    { type: 'text', content: 'Golden Deer is not trying to replace bhujia. We are offering an alternative that honours the same spirit of bold, savoury snacking while meeting modern standards of clean-label eating. Our Spicy Masala and Tangy Tomato variants deliver the same satisfying flavour hits that Indians love — without the chemicals.' },
    { type: 'text', content: 'The revolution in Indian snacking is not about abandoning tradition. It is about evolving it — keeping the soul while upgrading the substance.' },
  ],
  'why-nitrogen-flushed-packaging-matters': [
    { type: 'text', content: 'That soft whoosh of air you hear when opening a fresh pack of Golden Deer makhana is not ordinary air. It is food-grade nitrogen, and it is the only preservative we use.' },
    { type: 'heading', content: 'What Is Nitrogen Flushing?' },
    { type: 'text', content: 'Nitrogen flushing is a packaging process where the oxygen inside the pack is replaced with nitrogen gas before sealing. Since oxygen is the primary cause of rancidity in nuts and seeds, removing it dramatically extends shelf life without chemical preservatives.' },
    { type: 'text', content: 'For makhana, which is prized for its delicate crunch, nitrogen flushing serves an additional purpose: it prevents moisture absorption, keeping every puff crisp and fresh for months.' },
    { type: 'heading', content: 'Why It Matters for You' },
    { type: 'text', content: 'Without nitrogen flushing, makhana would need chemical preservatives or refrigeration to stay fresh beyond a few weeks. Our nitrogen-flushed packs maintain peak freshness for 8-12 months at room temperature — no additives required.' },
    { type: 'text', content: 'When you choose Golden Deer, you are choosing food that stays fresh naturally. No chemistry experiments, no preservatives — just pure, protected crunch.' },
  ],
}

export default function JournalArticleClient({
  entry,
}: {
  entry: JournalEntry
}) {
  const [copied, setCopied] = useState(false)

  const body = articleBody[entry.slug] || [
    { type: 'text' as const, content: entry.excerpt },
  ]

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
    }
  }

  return (
    <article>
      {/* Article Body */}
      <div className="prose prose-invert prose-gold max-w-none space-y-5">
        {body.map((block, i) => {
          switch (block.type) {
            case 'heading':
              return (
                <h2
                  key={i}
                  id={block.content
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)/g, '')}
                  className="font-display text-2xl text-forest-deep mt-8 mb-3 scroll-mt-24 group flex items-center gap-2"
                >
                  <span>{block.content}</span>
                  <a
                    href={`#${block.content.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-gold/50 hover:text-gold"
                    aria-label="Link to section"
                  >
                    #
                  </a>
                </h2>
              )
            case 'link':
              return (
                <a
                  key={i}
                  href={block.href}
                  className="inline-flex items-center gap-1.5 text-gold hover:text-gold-light transition-colors underline underline-offset-2"
                >
                  {block.content}
                </a>
              )
            default:
              return (
                <p
                  key={i}
                  className="text-sm sm:text-base text-forest-deep/70 leading-relaxed"
                >
                  {block.content}
                </p>
              )
          }
        })}
      </div>

      <div className="mt-10 p-5 rounded-xl border border-gold/15 bg-gold/[0.03]">
        <p className="text-sm text-forest-deep/80 leading-relaxed">
          <strong className="text-forest-deep">Makhana: The Complete Guide</strong> — Learn everything about makhana (fox nuts): what it is, how it is grown, suta grades explained, nutrition per 100g, health benefits, how to roast and season at home, the honest buying checklist, and its role in Indian tradition.{' '}
          <a href="/makhana" className="text-gold underline underline-offset-2 font-medium whitespace-nowrap">
            Read the full guide &rarr;
          </a>
        </p>
      </div>

      <div className="mt-6 p-4 rounded-xl border border-gold/15 bg-gold/[0.03]">
        <p className="text-xs text-forest-deep/60 leading-relaxed">
          Accuracy commitment &middot; Our content follows the{' '}
          <a href="/editorial-policy" className="text-gold underline underline-offset-2">Editorial Policy</a>.
          Nutrition figures are approximate — verify against the pack label for your specific batch.
            </p>
          </div>

      <Divider className="my-8" />

      {/* Share Row */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-xs text-forest-deep/50 font-medium tracking-wide uppercase mr-1">
          Share
        </span>
        <button
          type="button"
          onClick={copyLink}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium border border-forest/10 rounded-lg text-forest-deep/70 hover:text-forest-deep hover:border-gold/30 transition-all"
        >
          <LinkIcon className="w-3.5 h-3.5" />
          {copied ? 'Copied!' : 'Copy Link'}
        </button>
        <a
          href={`https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent(`Check out this article: ${entry.title} — ${typeof window !== 'undefined' ? window.location.href : ''}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium border border-forest/10 rounded-lg text-forest-deep/70 hover:text-forest-deep hover:border-gold/30 transition-all"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          WhatsApp
        </a>
      </div>
    </article>
  )
}

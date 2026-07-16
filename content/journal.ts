export interface JournalEntry {
  slug: string
  title: string
  excerpt: string
  date: string
  cover: string
  readTime: string
}

export const journal: JournalEntry[] = [
  {
    slug: 'golden-grain-ancient-superfood',
    title: 'The Golden Grain: Why Makhana is India\'s Ancient Superfood',
    excerpt:
      'Long before the wellness industry rediscovered it, makhana was prized in Ayurveda as a tridoshic food that nourishes body, mind, and spirit. Here is the untold story of India\'s original superfood.',
    date: '2026-03-15',
    cover: '/images/journal/golden-grain-ancient-superfood.jpg',
    readTime: '6 min',
  },
  {
    slug: 'from-wetlands-to-your-bowl',
    title: 'From Wetlands to Your Bowl: The Journey of Golden Deer Makhana',
    excerpt:
      'Follow a single seed from the flooded fields of Bihar through our touchless roasting facility to your snack bowl — a journey of patience, precision, and fair-trade partnerships.',
    date: '2026-03-28',
    cover: '/images/journal/from-wetlands-to-your-bowl.jpg',
    readTime: '8 min',
  },
  {
    slug: '5-reasons-switch-to-makhana',
    title: '5 Reasons to Switch to Makhana for Your Evening Snack',
    excerpt:
      'If your 5pm desk drawer still holds packaged chips or biscuits, here are five evidence-backed reasons to make the switch — starting with what happens to your blood sugar.',
    date: '2026-04-10',
    cover: '/images/journal/5-reasons-switch-to-makhana.jpg',
    readTime: '4 min',
  },
  {
    slug: 'makhana-for-every-diet',
    title: 'Makhana for Every Diet: Keto, Vegan, Gluten-Free and More',
    excerpt:
      'Whether you are counting macros, cutting grains, or simply eating cleaner, makhana fits. We mapped every major diet against our nutritional panel — the results may surprise you.',
    date: '2026-04-22',
    cover: '/images/journal/makhana-for-every-diet.jpg',
    readTime: '5 min',
  },
  {
    slug: 'art-of-slow-roasting',
    title: 'The Art of Slow-Roasting: How We Make Golden Deer Makhana',
    excerpt:
      'Why fast-roasting ruins makhana and why we spend 40 minutes per batch on a gentle dry-heat process that preserves every nutrient and delivers an ethereal crunch.',
    date: '2026-05-05',
    cover: '/images/journal/art-of-slow-roasting.jpg',
    readTime: '7 min',
  },
  {
    slug: 'beyond-bhujia-reinventing-indian-snacking',
    title: 'Beyond Bhujia: Reinventing Indian Snacking with Makhana',
    excerpt:
      'India snacks on tradition — bhujia, namkeen, chanachur. But a quiet revolution is happening in the packaged snack aisle, and it starts with a seed from the floodplains of Bihar.',
    date: '2026-05-18',
    cover: '/images/journal/beyond-bhujia-reinventing-indian-snacking.jpg',
    readTime: '6 min',
  },
  {
    slug: 'why-nitrogen-flushed-packaging-matters',
    title: 'Why Nitrogen-Flushed Packaging Matters for Your Snacks',
    excerpt:
      'That whoosh of air you hear when opening a fresh pack is not air — it is nitrogen, and it is the only preservative we use. Here is why it matters more than the ingredient list.',
    date: '2026-06-01',
    cover: '/images/journal/why-nitrogen-flushed-packaging-matters.jpg',
    readTime: '5 min',
  },
]

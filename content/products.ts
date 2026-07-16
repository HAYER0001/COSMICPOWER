export interface Product {
  slug: string
  name: string
  tagline: string
  description: string
  descriptionFull: string
  tags: string[]
  mrp: string
  netWeights: string[]
  nutrition: {
    energyKcal: number
    proteinG: number
    carbsG: number
    fatG: number
    disclaimer: string
  }
  benefits: string[]
  ingredients: string[]
  loop: string
  poster: string
  commerce: {
    blinkit: string
    zepto: string
    amazon: string
  }
  isBulk: boolean
  bulkSpec?: {
    grades: { name: string; size: string; note: string }[]
    packOptions: string[]
    moqNote: string
    qualityNotes: string[]
  }
}

const disclaimer =
  'Approximate values — verify against lab analysis before on-pack claims'

export const products: Product[] = [
  {
    slug: 'classic-roast',
    name: 'Classic Roast',
    tagline: 'Pure. Lightly Salted. Irresistibly Crunchy.',
    description:
      'The taste that started it all. Our Classic Roast makhana is popped to golden perfection in the lightest veil of premium cold-pressed oil and finished with a whisper of fine sea salt. Every puff carries the pure, nutty essence of hand-picked jumbo fox nuts — nothing more, nothing less.',
    descriptionFull:
      'Clean-label snacking at its most honest. We begin with the largest grade of raw makhana, sourced directly from farming partners across Bihar\'s pristine wetlands. Each seed is touchless-roasted in small batches using a gentle dry-heat process that preserves the natural structure and delicate crunch. A trace of cold-pressed oil and a sprinkle of sea salt is all that touches these golden puffs. No artificial flavours, no preservatives, no compromise. The result is a snack that tastes of its origin — earth, water, and the quiet labour of hands that have cultivated this grain for generations.',
    tags: ['Classic', 'Lightly Salted', 'Clean Label', 'Everyday Snack'],
    mrp: '₹99',
    netWeights: ['50g', '100g', '200g'],
    nutrition: {
      energyKcal: 347,
      proteinG: 9.7,
      carbsG: 76.9,
      fatG: 0.1,
      disclaimer,
    },
    benefits: [
      'High protein — keeps you fuller longer',
      'Naturally low in fat — guilt-free crunch',
      'Rich in antioxidants and dietary fibre',
      'Gluten-free and vegan-friendly',
      'No artificial preservatives or flavours',
    ],
    ingredients: [
      'Premium makhana (fox nuts)',
      'Cold-pressed sunflower oil',
      'Fine sea salt',
    ],
    loop: '/videos/products/classic-roast.mp4',
    poster: '/videos/products/classic-roast-poster.jpg',
    commerce: {
      blinkit: 'ADD_URL',
      zepto: 'ADD_URL',
      amazon: 'ADD_URL',
    },
    isBulk: false,
  },
  {
    slug: 'pink-salt-pepper',
    name: 'Himalayan Pink Salt & Pepper',
    tagline: 'A Perfect Marriage of Mineral Salt and Cracked Pepper.',
    description:
      'Elevated. Ancient Himalayan pink salt meets freshly cracked black peppercorns on our signature slow-roasted makhana. The salt\'s subtle mineral complexity — pink-hued, sun-dried, hand-mined from the Khewra range — balances the warm bite of Tellicherry pepper for a savoury snack that feels deliberate, not accidental.',
    descriptionFull:
      'This is not your standard salted snack. We source Himalayan pink salt from deep within the Punjab salt range, valued for its rich mineral profile and clean, rounded salinity. Each crystal is dry-milled to a fine powder, then dusted over freshly roasted makhana alongside coarsely ground Tellicherry black pepper known for its bold aromatic punch. The combination is timeless: earthy pepper heat softened by mineral salt, wrapped in the ethereal crunch of slow-roasted fox nuts. A grown-up snack for discerning palates, as at home in a desk drawer as on a charcuterie board.',
    tags: ['Savory', 'Pink Salt', 'Black Pepper', 'Gourmet'],
    mrp: '₹109',
    netWeights: ['50g', '100g', '200g'],
    nutrition: {
      energyKcal: 350,
      proteinG: 9.5,
      carbsG: 75.8,
      fatG: 0.3,
      disclaimer,
    },
    benefits: [
      'Himalayan pink salt — 84+ trace minerals',
      'Black pepper aids nutrient absorption',
      'Low-calorie gourmet snacking',
      'Gluten-free and non-GMO',
      'No artificial flavouring — real ingredients only',
    ],
    ingredients: [
      'Premium makhana (fox nuts)',
      'Cold-pressed sunflower oil',
      'Himalayan pink salt',
      'Coarse black pepper',
    ],
    loop: '/videos/products/pink-salt-pepper.mp4',
    poster: '/videos/products/pink-salt-pepper-poster.jpg',
    commerce: {
      blinkit: 'ADD_URL',
      zepto: 'ADD_URL',
      amazon: 'ADD_URL',
    },
    isBulk: false,
  },
  {
    slug: 'tangy-tomato',
    name: 'Tangy Tomato',
    tagline: 'Sun-Ripened Tang in Every Crunch.',
    description:
      'A burst of sun-ripened tomato goodness on a cloud of roasted makhana. We marry the bright acidity of real tomato with a whisper of spice, creating a snack that hits every note: tangy, savoury, and satisfyingly crisp. No artificial colours — just the warm red of real tomato, as nature intended.',
    descriptionFull:
      'Inspired by India\'s eternal love affair with tangy-spicy snacks, our Tangy Tomato makhana is a masterclass in clean-label flavouring. We start with vine-ripened tomatoes, slow-dried and ground into a fine powder, then blended with a proprietary spice mix that uses no artificial colours, no MSG, and no synthetic flavour enhancers. The result is a dusting of authentic tomato that clings to every crevice of the puffed makhana, delivering a bright, moreish tang with just enough warmth to keep you reaching for another handful. It\'s the snack you grew up loving — reimagined for a cleaner plate.',
    tags: ['Tangy', 'Tomato', 'Spiced', 'Bold Flavour'],
    mrp: '₹109',
    netWeights: ['50g', '100g', '200g'],
    nutrition: {
      energyKcal: 353,
      proteinG: 9.2,
      carbsG: 74.5,
      fatG: 0.5,
      disclaimer,
    },
    benefits: [
      'Real tomato — no artificial flavouring',
      'Lycopene-rich for antioxidant support',
      'Low-fat alternative to fried tomato snacks',
      'Clean-label indulgence',
      'No MSG, no artificial colours',
    ],
    ingredients: [
      'Premium makhana (fox nuts)',
      'Cold-pressed sunflower oil',
      'Tomato powder',
      'Spices',
      'Sea salt',
    ],
    loop: '/videos/products/tangy-tomato.mp4',
    poster: '/videos/products/tangy-tomato-poster.jpg',
    commerce: {
      blinkit: 'ADD_URL',
      zepto: 'ADD_URL',
      amazon: 'ADD_URL',
    },
    isBulk: false,
  },
  {
    slug: 'creamy-cheese',
    name: 'Creamy Cheese',
    tagline: 'Real Cheese. Real Crunch. Real Good.',
    description:
      'For the cheese lover who refuses to compromise on clean eating. We coat each makhana puff in a whisper of real cheddar and cultured buttermilk powder, creating a creamy, tangy cheese flavour that tastes of something — not of chemicals. Rich, savoury, and utterly addictive, without a trace of artificial aftertaste.',
    descriptionFull:
      'Cheese-flavoured snacks usually mean a lab-engineered powder with a dozen unpronounceable ingredients. Ours is different. We start with real aged cheddar, dried and milled into a fine powder, then blended with cultured buttermilk for that unmistakable tang. A touch of mustard and turmeric adds depth and warmth, while the makhana itself — light, airy, slow-roasted — becomes the perfect canvas for this creamy coating. No artificial cheese flavouring, no palm oil, no MSG. Just the honest taste of real cheddar on India\'s cleanest crunch. Pair it with a cold drink or toss it over a salad for a crouton-like twist.',
    tags: ['Cheese', 'Creamy', 'Indulgent', 'Real Cheddar'],
    mrp: '₹119',
    netWeights: ['50g', '100g', '200g'],
    nutrition: {
      energyKcal: 358,
      proteinG: 10.1,
      carbsG: 72.3,
      fatG: 1.2,
      disclaimer,
    },
    benefits: [
      'Real cheddar — not artificial flavouring',
      'Higher protein from cheese + makhana',
      'No palm oil, no trans fats',
      'Vegetarian-friendly indulgence',
      'No MSG or synthetic flavour enhancers',
    ],
    ingredients: [
      'Premium makhana (fox nuts)',
      'Cold-pressed sunflower oil',
      'Aged cheddar powder',
      'Cultured buttermilk powder',
      'Sea salt',
      'Mustard powder',
      'Turmeric',
    ],
    loop: '/videos/products/creamy-cheese.mp4',
    poster: '/videos/products/creamy-cheese-poster.jpg',
    commerce: {
      blinkit: 'ADD_URL',
      zepto: 'ADD_URL',
      amazon: 'ADD_URL',
    },
    isBulk: false,
  },
  {
    slug: 'spicy-masala',
    name: 'Spicy Masala',
    tagline: 'India\'s Favourite Spice Blend, Now on Makhana.',
    description:
      'A bold, aromatic masala blend — cumin, coriander, red chilli, ginger, and a hint of amchur — dusted generously over our signature golden puffs. This is makhana for the�chaat lover: complex, layered, and fiery in all the right ways. Every handful is a journey through India\'s spice cabinet.',
    descriptionFull:
      'Masala is not a single flavour — it is a philosophy of layering. Our master blenders spent months perfecting this mix: the earthy warmth of roasted cumin, the citrus lift of coriander, the slow-building heat of Kashmiri red chilli, the tang of dried mango powder, and a whisper of ginger that lingers on the palate. Each spice is individually toasted and ground, then blended in small batches to ensure every grain of makhana catches the full spectrum. The result is a snack that unfolds on the tongue — first warm, then tangy, then building to a gentle, satisfying heat. No artificial enhancers, no flavouring agents: just the purest spices India has to offer, in the proportions they deserve.',
    tags: ['Masala', 'Spicy', 'Indian', 'Bold'],
    mrp: '₹109',
    netWeights: ['50g', '100g', '200g'],
    nutrition: {
      energyKcal: 355,
      proteinG: 9.3,
      carbsG: 73.8,
      fatG: 0.6,
      disclaimer,
    },
    benefits: [
      'Whole spices — no artificial flavouring',
      'Digestive spices: cumin, ginger, amchur',
      'Kashmiri chilli for colour without excessive heat',
      'Low-calorie way to satisfy masala cravings',
      'No MSG, no artificial colours',
    ],
    ingredients: [
      'Premium makhana (fox nuts)',
      'Cold-pressed sunflower oil',
      'Cumin powder',
      'Coriander powder',
      'Kashmiri red chilli powder',
      'Dried mango powder (amchur)',
      'Ginger powder',
      'Black salt',
      'Sea salt',
    ],
    loop: '/videos/products/spicy-masala.mp4',
    poster: '/videos/products/spicy-masala-poster.jpg',
    commerce: {
      blinkit: 'ADD_URL',
      zepto: 'ADD_URL',
      amazon: 'ADD_URL',
    },
    isBulk: false,
  },
  {
    slug: 'raw-makhana',
    name: 'Premium Raw Makhana',
    tagline: 'Hand-Sorted Jumbo Grade — The Foundation of Every Great Pop.',
    description:
      'The raw ingredient that makes Golden Deer special. These are not ordinary fox nuts — each seed is hand-sorted, graded by size, and selected for its pristine white colour and uniform shape. Sourced directly from farming partner cooperatives in Bihar\'s makhana belt, our raw makhana represents the highest standard of purity available to wholesalers, retailers, and food businesses.',
    descriptionFull:
      'Behind every perfect puff of Golden Deer lies an uncompromising raw material. Our Premium Raw Makhana is the largest, brightest jumbo grade — what the trade calls 5–6 suta — sourced from the Gangetic wetlands of Bihar where makhana has been cultivated for centuries. Each lot is hand-sorted by experienced graders who remove discoloured seeds, broken pieces, and any grain below our size threshold. The result is a consistently superior raw product that roasts evenly, puffs fully, and delivers the signature ethereal crunch that defines Golden Deer. For retail brands seeking white-label supply, HoReCa kitchens creating innovative makhana-based dishes, and export buyers who demand the highest grade, this is the gold standard in raw fox nuts.',
    tags: ['Raw', 'Bulk', 'Wholesale', 'Jumbo Grade', 'Unroasted'],
    mrp: 'Contact for pricing',
    netWeights: ['5kg bulk', '10kg bulk', '25kg bulk'],
    nutrition: {
      energyKcal: 347,
      proteinG: 9.7,
      carbsG: 76.9,
      fatG: 0.1,
      disclaimer,
    },
    benefits: [
      'Hand-sorted jumbo grade — 5–6 suta',
      'Uniform size for even roasting',
      'Minimal broken pieces (< 2%)',
      'Direct farm sourcing — traceable lots',
      'Nitrogen-flushed packaging option',
    ],
    ingredients: ['Premium raw makhana (fox nuts) — 100% pure, no additives'],
    loop: '/videos/products/raw-makhana.mp4',
    poster: '/videos/products/raw-makhana-poster.jpg',
    commerce: {
      blinkit: 'ADD_URL',
      zepto: 'ADD_URL',
      amazon: 'ADD_URL',
    },
    isBulk: true,
    bulkSpec: {
      grades: [
        {
          name: '5–6 Suta Jumbo',
          size: '18–24mm',
          note: 'hand-sorted, brightest premium pops — our flagship export grade',
        },
        {
          name: '4–5 Suta Standard',
          size: '14–18mm',
          note: 'culinary & roasting grade — ideal for HoReCa and processed snacks',
        },
      ],
      packOptions: ['250g retail pouch', '5kg bulk bag', '10kg bulk bag', '25kg bulk bag'],
      moqNote: 'MOQ discussed on inquiry — we work with small-batch artisans and large-scale buyers alike',
      qualityNotes: [
        'Touchless roasting and sorting facility',
        'Airtight nitrogen-flushed packaging for maximum shelf life',
        'Direct farm sourcing with fair-trade practices',
        'Each lot traceable to grower cooperative and harvest date',
        'Third-party lab testing available on request',
      ],
    },
  },
]

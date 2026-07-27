export interface ComparisonRow {
  attribute: string
  makhana: string
  competitor: string
}

export interface Comparison {
  slug: string
  title: string
  competitorName: string
  quickAnswer: string
  table: ComparisonRow[]
  analysis: string
  summary: string
  linkTo?: { label: string; href: string }
}

export const comparisons: Comparison[] = [
  {
    slug: 'makhana-vs-chips',
    title: 'Makhana vs Potato Chips',
    competitorName: 'Potato Chips',
    quickAnswer:
      'Makhana has roughly one-third the calories and one-fortieth the fat of potato chips, with the added benefit of protein, fibre, and antioxidants that chips simply do not provide. If you are comparing a snack for everyday eating, makhana wins on every nutritional metric.',
    table: [
      { attribute: 'Calories', makhana: '347 kcal', competitor: '536 kcal' },
      { attribute: 'Protein', makhana: '9.7 g', competitor: '5.0 g' },
      { attribute: 'Total Fat', makhana: '0.1 g', competitor: '35 g' },
      { attribute: 'Saturated Fat', makhana: '0.0 g', competitor: '11 g' },
      { attribute: 'Carbohydrates', makhana: '76.9 g', competitor: '49 g' },
      { attribute: 'Fibre', makhana: '7.6 g', competitor: '4.5 g' },
      { attribute: 'Sodium', makhana: '~2 mg (plain)', competitor: '~530 mg' },
      { attribute: 'Processing Level', makhana: 'Dry-roasted', competitor: 'Deep-fried' },
      { attribute: 'Satiety Index (relative)', makhana: 'High (protein + fibre)', competitor: 'Low (fat + salt)' },
      { attribute: 'Price per 30 g serving', makhana: '~₹13', competitor: '~₹10' },
    ],
    analysis:
      'Potato chips are the most popular snack in India, but their nutritional profile makes them a poor everyday choice. A single 50 g serving of chips delivers roughly 270 calories and 17 g of fat — nearly half the daily recommended fat intake for an average adult. The deep-frying process also creates acrylamide, a compound classified as a probable carcinogen by IARC. Makhana, by contrast, is dry-roasted at high heat without submerging in oil, resulting in negligible fat and no acrylamide formation. The protein and fibre in makhana produce a satiety signal that chips — engineered for "vanishing calorie density" — deliberately avoid.\n\nWhere chips have an edge is flavour variety and cultural ubiquity. A packet of chips is available at every corner store, while makhana is still building its distribution network. Chips also deliver an immediate salt-and-fat hit that some palates prefer. But for the consumer who wants to snack daily without compromising health, the choice is clear: makhana provides crunch, satisfaction, and nutrition without the oil or the empty calories.',
    summary:
      'Chips win on instant availability and price. Makhana wins on every health metric: calories, fat, protein, fibre, and processing quality.',
    linkTo: { label: 'Browse Golden Deer roasted makhana', href: '/products' },
  },
  {
    slug: 'makhana-vs-popcorn',
    title: 'Makhana vs Popcorn',
    competitorName: 'Popcorn (Air-Popped)',
    quickAnswer:
      'Both are healthy whole-grain snacks, but makhana has more protein (9.7 g vs 3.5 g per 100 g), less fat (0.1 g vs 1.2 g), and a richer mineral profile. Popcorn wins on fibre (14.5 g vs 7.6 g) and price. The best answer: alternate them.',
    table: [
      { attribute: 'Calories', makhana: '347 kcal', competitor: '387 kcal' },
      { attribute: 'Protein', makhana: '9.7 g', competitor: '3.5 g' },
      { attribute: 'Total Fat', makhana: '0.1 g', competitor: '1.2 g' },
      { attribute: 'Carbohydrates', makhana: '76.9 g', competitor: '77.9 g' },
      { attribute: 'Fibre', makhana: '7.6 g', competitor: '14.5 g' },
      { attribute: 'Calcium', makhana: '60 mg', competitor: '7 mg' },
      { attribute: 'Magnesium', makhana: '67 mg', competitor: '36 mg' },
      { attribute: 'Phosphorus', makhana: '150 mg', competitor: '100 mg' },
      { attribute: 'Processing Level', makhana: 'Dry-roasted / popped', competitor: 'Hot-air popped' },
      { attribute: 'Satiety Index', makhana: 'High', competitor: 'Moderate' },
      { attribute: 'Price per 30 g serving', makhana: '~₹13', competitor: '~₹5' },
    ],
    analysis:
      'Popcorn is a genuinely healthy snack — air-popped, it is a whole grain with impressive fibre content (14.5 g per 100 g, nearly double that of makhana). Its low-calorie, high-volume nature makes it popular for weight management. However, popcorn falls short on protein (3.5 g vs makhana\'s 9.7 g per 100 g) and key minerals like calcium (7 mg vs 60 mg) and magnesium (36 mg vs 67 mg).\n\nMakhana\'s protein advantage is significant for satiety and muscle maintenance. A 30 g serving of makhana delivers 2.9 g protein compared to popcorn\'s 1.1 g. For someone using snacks as part of a balanced diet, the extra protein makes makhana more satisfying.\n\nWhere popcorn wins decisively is fibre (14.5 g per 100 g vs 7.6 g), which supports digestive health, and cost — popcorn kernels are cheaper per serving than makhana. The best strategy is not to pick one: keep both in your pantry. Popcorn for high-fibre days, makhana for high-protein crunch.',
    summary:
      'Popcorn wins on fibre and price. Makhana wins on protein, fat content, and minerals. Both are excellent choices — rotate them.',
    linkTo: { label: 'Try our protein-packed makhana', href: '/products' },
  },
  {
    slug: 'makhana-vs-almonds',
    title: 'Makhana vs Almonds',
    competitorName: 'Almonds (Raw)',
    quickAnswer:
      'Almonds are a nutrient powerhouse with healthy fats, vitamin E, and magnesium — but they are also calorie-dense (579 kcal per 100 g) and high in fat (49.9 g). Makhana provides comparable protein (9.7 g vs 21.2 g) with 0.1 g fat and 347 kcal, making it the better choice for low-fat, high-volume snacking.',
    table: [
      { attribute: 'Calories', makhana: '347 kcal', competitor: '579 kcal' },
      { attribute: 'Protein', makhana: '9.7 g', competitor: '21.2 g' },
      { attribute: 'Total Fat', makhana: '0.1 g', competitor: '49.9 g' },
      { attribute: 'Saturated Fat', makhana: '0.0 g', competitor: '3.8 g' },
      { attribute: 'Carbohydrates', makhana: '76.9 g', competitor: '21.6 g' },
      { attribute: 'Fibre', makhana: '7.6 g', competitor: '12.5 g' },
      { attribute: 'Calcium', makhana: '60 mg', competitor: '269 mg' },
      { attribute: 'Vitamin E', makhana: 'Not significant', competitor: '25.6 mg (α-tocopherol)' },
      { attribute: 'Processing Level', makhana: 'Dry-roasted', competitor: 'Raw / dry-roasted' },
      { attribute: 'Satiety per calorie', makhana: 'Higher (volume)', competitor: 'Higher (fat + protein)' },
      { attribute: 'Price per 30 g serving', makhana: '~₹13', competitor: '~₹18' },
    ],
    analysis:
      'Almonds are widely considered the gold standard of healthy snacks, and with good reason: they are rich in monounsaturated fats that support heart health, provide 25.6 mg of vitamin E per 100 g (a powerful antioxidant), and deliver 21.2 g protein. However, their high calorie density (579 kcal per 100 g) means portion control is critical — a standard 30 g serving is about 23 almonds, which many people exceed easily.\n\nMakhana offers a different value proposition: you can eat a larger volume for fewer calories. A 30 g serving of makhana is approximately 2–3 handfuls, versus a small palmful of almonds. The satiety from volume eating is a legitimate advantage for people who need to feel "full" from their snack.\n\nWhere almonds are irreplaceable: vitamin E (makhana supplies negligible amounts), healthy fats for heart health, and calcium (269 mg vs 60 mg). Makhana is not a substitute for almonds — it is a complementary snack. Eat almonds for their healthy fats and micronutrients; eat makhana when you want a crunchy, satisfying snack without the calorie load.',
    summary:
      'Almonds win on healthy fats, vitamin E, and calcium. Makhana wins on calorie density, volume per serving, and fat content. They complement rather than replace each other.',
    linkTo: { label: 'Shop Golden Deer makhana', href: '/products' },
  },
  {
    slug: 'makhana-vs-peanuts',
    title: 'Makhana vs Peanuts',
    competitorName: 'Peanuts (Roasted)',
    quickAnswer:
      'Peanuts are an affordable, protein-rich snack (25.8 g per 100 g) but come with significant fat (49.2 g) and calorie density (567 kcal). Makhana has less than 1 % of the fat and 60 % of the calories, with higher fibre and mineral content per calorie. For everyday low-fat snacking, makhana is the better choice.',
    table: [
      { attribute: 'Calories', makhana: '347 kcal', competitor: '567 kcal' },
      { attribute: 'Protein', makhana: '9.7 g', competitor: '25.8 g' },
      { attribute: 'Total Fat', makhana: '0.1 g', competitor: '49.2 g' },
      { attribute: 'Saturated Fat', makhana: '0.0 g', competitor: '6.8 g' },
      { attribute: 'Carbohydrates', makhana: '76.9 g', competitor: '16.1 g' },
      { attribute: 'Fibre', makhana: '7.6 g', competitor: '8.5 g' },
      { attribute: 'Calcium', makhana: '60 mg', competitor: '54 mg' },
      { attribute: 'Magnesium', makhana: '67 mg', competitor: '50 mg' },
      { attribute: 'Phosphorus', makhana: '150 mg', competitor: '115 mg' },
      { attribute: 'Processing Level', makhana: 'Dry-roasted', competitor: 'Dry-roasted / fried' },
      { attribute: 'Allergen Risk', makhana: 'Very low (seed, not nut)', competitor: 'High (legume allergen)' },
      { attribute: 'Price per 30 g serving', makhana: '~₹13', competitor: '~₹4' },
    ],
    analysis:
      'Peanuts are the most consumed snack nut in India, prized for their high protein content (25.8 g per 100 g), affordability, and satisfying mouthfeel. They are technically legumes, not tree nuts, which means some tree-nut-allergic individuals can eat them — though peanut allergy is itself common and serious.\n\nMakhana\'s advantage over peanuts is clearest in fat content: 0.1 g vs 49.2 g per 100 g. A single 50 g serving of roasted peanuts delivers nearly 25 g of fat, roughly 40 % of an adult\'s daily recommended intake. Makhana delivers essentially zero fat per serving. For anyone managing weight, cholesterol, or heart health, this difference is decisive.\n\nPeanuts have two clear wins: protein (2.7× makhana\'s content) and price (roughly one-third the cost per serving). If your goal is maximum protein per rupee, peanuts are hard to beat. But for a daily snack that delivers crunch, nutrition, and minimal fat, makhana is the superior choice — especially since makhana\'s protein-to-fat ratio (97:1) is dramatically better than peanuts\' (0.5:1).\n\nAn honest concession: roasted peanuts with salt are delicious, and their umami-savoury profile is more immediately addictive than makhana\'s mild nuttiness. For the consumer who finds plain makhana too subtle, Golden Deer\'s flavoured variants (Spicy Masala, Tangy Tomato, Creamy Cheese) close that taste gap while keeping the nutritional advantage.',
    summary:
      'Peanuts win on protein per gram and price. Makhana wins on fat content, calorie density, mineral density per calorie, and near-zero allergen risk. For daily low-fat snacking, makhana is the clear winner.',
    linkTo: { label: 'See all Golden Deer flavours', href: '/products' },
  },
]

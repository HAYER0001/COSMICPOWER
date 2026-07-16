export interface GlossaryTerm {
  slug: string
  term: string
  hindiTerm?: string
  definition: string
  elaboration: string
  relatedSlugs: string[]
  linkTo?: { label: string; href: string }
}

export const glossary: GlossaryTerm[] = [
  {
    slug: 'makhana',
    term: 'Makhana',
    hindiTerm: 'मखाना',
    definition:
      'Makhana, also called fox nuts or phool makhana, are the popped seeds of Euryale ferox, an aquatic plant cultivated in wetland ponds across the Gangetic plains of Bihar, India.',
    elaboration:
      'Makhana has been part of the Indian diet for centuries. The raw seeds are harvested from the prickly water lily\'s seed pods, sun-dried, and then roasted under controlled heat to pop them into the familiar white, airy puffs. They are naturally gluten-free, rich in protein (9.7 g per 100 g), very low in fat (0.1 g), and a staple fasting food during Navratri and Ekadashi. In the modern snack market, makhana has gained popularity as a clean-label alternative to fried snacks and chips. Golden Deer sources 5–6 suta jumbo-grade makhana directly from farming cooperatives in Bihar.',
    relatedSlugs: ['fox-nuts', 'phool-makhana', 'euryale-ferox', 'suta', 'lawa'],
    linkTo: { label: 'Browse Golden Deer makhana', href: '/products' },
  },
  {
    slug: 'fox-nuts',
    term: 'Fox Nuts',
    hindiTerm: 'लोमड़ी मेवा',
    definition:
      'Fox nuts are the English common name for popped makhana seeds (Euryale ferox), though they are neither nuts nor related to foxes — the name likely derives from the seed\'s resemblance to small animal droppings or from a mistranslation.',
    elaboration:
      'The term "fox nut" is used primarily in English-language packaging and export markets. It was historically used in British colonial botanical records for Euryale ferox seeds and has persisted in international trade. In India, the term is rarely used domestically — consumers know the product as makhana or phool makhana. The botanical name Euryale ferox is preferred in scientific and nutritional literature. For export-grade product descriptions, "fox nuts" remains the standard English term recognised by international buyers.',
    relatedSlugs: ['makhana', 'phool-makhana', 'euryale-ferox'],
  },
  {
    slug: 'phool-makhana',
    term: 'Phool Makhana',
    hindiTerm: 'फूल मखाना',
    definition:
      'Phool makhana (literally "flower makhana") is the Hindi term for popped or processed makhana, distinguishing the light, puffed snack form from the raw, hard seed (thurri).',
    elaboration:
      'In North Indian households, "phool makhana" is the everyday term for the white, puffed makhana sold in snack packets and used in kheer. The word "phool" (flower) describes the way the dense raw seed blooms into a flower-like puff during popping. Phool makhana is what you buy for snacking, cooking, or festive preparations. The term also appears in Indian English product labelling as "Phool Makhana (Fox Nuts)".',
    relatedSlugs: ['makhana', 'lawa', 'thurri-raw-seed'],
    linkTo: { label: 'Shop phool makhana', href: '/products' },
  },
  {
    slug: 'euryale-ferox',
    term: 'Euryale ferox',
    definition:
      'Euryale ferox is the scientific name of the aquatic plant that produces makhana seeds — a prickly water lily native to stagnant wetlands across South and East Asia, with its largest commercial cultivation in the Gangetic plains of Bihar, India.',
    elaboration:
      'Classified in the Nymphaeaceae (water lily) family, Euryale ferox is the only surviving species in its genus, making it a living fossil. The plant grows from seeds sown in pond beds, producing massive floating leaves up to 1.5 m across that cover the water surface. Its seed pods, which develop underwater, contain 15–30 dark, spherical seeds roughly 1–2 cm in diameter. These seeds are the raw makhana. The plant\'s leaves and stems are covered in sharp spines, which is why harvesting is done manually — the prickly nature makes mechanical harvesting impractical. Euryale ferox has been cultivated in India and China for over 3,000 years for both food and traditional medicine.',
    relatedSlugs: ['makhana', 'gorgon-nut', 'lotus-seeds-vs-makhana', 'mithila-makhana-gi'],
  },
  {
    slug: 'gorgon-nut',
    term: 'Gorgon Nut',
    definition:
      'Gorgon nut is an historical English name for Euryale ferox seeds, derived from the Gorgon of Greek mythology, referring to the spiny, Medusa-like appearance of the plant\'s seed pods.',
    elaboration:
      'The name "gorgon nut" appears in 19th-century British botanical literature describing Euryale ferox. It is rarely used in modern commerce — "fox nuts" and "makhana" have become the standard English and trade terms. The Greek reference was intended to evoke the dangerous, spiny appearance of the plant\'s seed pods, which are covered in sharp spines that protect the seeds until harvest. Today, the term is primarily encountered in historical texts and seed catalogues for water garden enthusiasts.',
    relatedSlugs: ['euryale-ferox', 'makhana', 'fox-nuts'],
  },
  {
    slug: 'lotus-seeds-vs-makhana',
    term: 'Lotus Seeds vs Makhana',
    hindiTerm: 'कमल के बीज बनाम मखाना',
    definition:
      'Lotus seeds (kamu gatta / makhana of a different type) and makhana (Euryale ferox) are frequently confused — both are aquatic seeds used in Indian cooking, but they come from different plants and have distinct textures, nutritional profiles, and culinary uses.',
    elaboration:
      'Lotus seeds (Nelumbo nucifera) come from the lotus flower\'s seed pod. They are oval, pale cream, with a distinct green embryo that is often removed before cooking. Lotus seeds are denser, chewier, and higher in calories than makhana. They are used in kheer, curries, and as a roasted snack. Makhana (Euryale ferox) comes from a different aquatic plant — the prickly water lily. Makhana seeds are round, pure white when popped, and have no green embryo. They are lighter, airier, and lower in fat than lotus seeds. The nutritional profiles differ: makhana has about 9.7 g protein per 100 g and 0.1 g fat, while lotus seeds have roughly 8 g protein and 0.5 g fat per 100 g. In Indian Ayurveda, both are considered sattvic fasting foods, but the plants are botanically distinct. The confusion arises because both are called "makhana" in some regional dialects — in North India, "phool makhana" almost always refers to Euryale ferox, not lotus seeds.',
    relatedSlugs: ['makhana', 'phool-makhana', 'euryale-ferox'],
  },
  {
    slug: 'suta',
    term: 'Suta',
    hindiTerm: 'सूत',
    definition:
      'Suta (सूत) is the traditional Bihar grading unit for raw makhana seed diameter, where a higher suta number indicates a larger seed — the standard retail and export grade is 5–6 suta (18–24 mm).',
    elaboration:
      'The suta system is the backbone of makhana quality assessment in Bihar\'s wholesale markets. The term "suta" literally means "thread" or "line" in Hindi, and traditionally referred to the number of radial lines visible on the seed surface, which correlated with size. In modern trade, suta is a direct measure of seed diameter. Grades range from 3 suta (small, approximately 10–12 mm, mostly used for local consumption) to 6 suta (jumbo, up to 24 mm). The suta grade directly determines the final product quality: larger seeds produce bigger, fluffier popped makhana with better plate appeal and higher pop yield. Serious buyers — including export traders, white-label manufacturers, and premium retail brands — specify suta grade in every procurement contract. Golden Deer standardises on 5–6 suta jumbo grade for all retail products.',
    relatedSlugs: ['4-5-suta', '5-6-suta-jumbo', 'hand-sorting'],
    linkTo: { label: 'Learn about suta grades', href: '/makhana#suta-grades' },
  },
  {
    slug: '4-5-suta',
    term: '4–5 Suta Makhana',
    hindiTerm: '४-५ सूत मखाना',
    definition:
      '4–5 suta is the standard culinary grade of raw makhana, measuring 14–18 mm in diameter — the most common grade used in HoReCa kitchens, processed snack manufacturing, and bulk cooking applications.',
    elaboration:
      'This grade represents good quality at a more accessible price point than jumbo (5–6 suta). 4–5 suta seeds pop into medium-sized puffs that are suitable for curries, kheer, and home-roasting where extreme size uniformity is less critical. For restaurants, hotels, and catering operations (HoReCa), this grade offers the best value-to-yield ratio. Processed snack manufacturers who grind makhana into flour or use it as a functional ingredient also prefer this grade. Golden Deer offers 4–5 suta as a bulk option alongside our flagship 5–6 suta jumbo grade.',
    relatedSlugs: ['suta', '5-6-suta-jumbo'],
    linkTo: { label: 'Bulk inquiry', href: '/bulk' },
  },
  {
    slug: '5-6-suta-jumbo',
    term: '5–6 Suta Jumbo Makhana',
    hindiTerm: '५-६ सूत जंबो मखाना',
    definition:
      '5–6 suta jumbo is the highest commercial grade of raw makhana, measuring 18–24 mm in diameter — the largest, most premium grade reserved for retail snack brands, export markets, and white-label roasters who demand the biggest pops.',
    elaboration:
      'Jumbo-grade makhana is the gold standard of the trade. Seeds at this size produce the largest, fluffiest popped puffs with the most consistent texture and colour. The pop yield (weight of finished product per kg of raw material) is highest at this grade because larger seeds have a higher starch-to-shell ratio. Jumbo grade commands a significant price premium in wholesale markets. For retail brands, using 5–6 suta translates to better visual presentation on shelf, higher customer satisfaction (larger pieces feel more premium), and lower breakage in transit. Golden Deer standardises on this grade for every retail product. In the export market, 5–6 suta is the minimum grade expected by discerning buyers in North America, Europe, and the Middle East.',
    relatedSlugs: ['suta', '4-5-suta', 'hand-sorting'],
    linkTo: { label: 'See our jumbo-grade products', href: '/products' },
  },
  {
    slug: 'lawa',
    term: 'Lawa (Popping)',
    hindiTerm: 'लावा',
    definition:
      'Lawa (लावा) is the traditional Bihar term for the popping process that transforms dense raw makhana seeds into light, edible white puffs through controlled heat and moisture.',
    elaboration:
      'The lawa process is the critical transformation step in makhana production. Raw seeds (thurri) are first sun-dried, then roasted in hot sand or a rotating drum at 200–250 °C. The high heat converts internal moisture to steam, building pressure inside the hard seed coat. The seeds are then removed, lightly moistened (sprinkled with water for thermal shock), and re-roasted. This second heating causes the steamed seed to explode outward — increasing in volume by 3–4× — producing the familiar white, porous puff. The skill of the lawa operator determines the final quality: under-popped seeds are dense and chewy; over-popped seeds shatter. Golden Deer\'s touchless roasting facility uses automated temperature control to achieve consistent popping across every batch.',
    relatedSlugs: ['thurri-raw-seed', 'touchless-roasting', 'moisture-content'],
  },
  {
    slug: 'thurri-raw-seed',
    term: 'Thurri (Raw Seed)',
    hindiTerm: 'थुर्री',
    definition:
      'Thurri (थुर्री) is the Bihar trade term for raw, unpopped makhana seeds — hard, dark-brown-to-black seeds harvested directly from Euryale ferox seed pods, dried to 12–14 % moisture for storage and trade.',
    elaboration:
      'Thurri is what farmers harvest and what wholesale traders buy and sell in Bihar\'s makhana mandis. It is the raw material that roasters and processors transform into edible makhana. Thurri is graded by suta size, moisture content, broken percentage, and colour uniformity. Good-quality thurri has a dark, uniform colour with minimal yellowing, less than 2 % broken seeds, and a clean, nutty aroma. Thurri is inedible in its raw state — it must be popped (lawa) before consumption. The thurri market is concentrated in Bihar\'s makhana-growing districts: Darbhanga, Madhubani, Purnia, Katihar, Saharsa, Supaul, and Kishanganj. Golden Deer sources thurri directly from farming cooperatives, bypassing middlemen for better traceability and farmer returns.',
    relatedSlugs: ['lawa', 'suta', 'moisture-content', 'mithila-makhana-gi'],
    linkTo: { label: 'Bulk raw makhana inquiry', href: '/products/raw-makhana' },
  },
  {
    slug: 'mithila-makhana-gi',
    term: 'Mithila Makhana GI Tag',
    hindiTerm: 'मिथिला मखाना जीआई टैग',
    definition:
      'The Mithila Makhana Geographical Indication (GI) tag is a formal recognition by the Government of India that makhana grown in the Mithila region of Bihar has distinct qualities and reputation attributable to its geographic origin.',
    elaboration:
      'Registered under the Geographical Indications of Goods Act, the Mithila Makhana GI tag covers the traditional makhana-growing belt of Bihar, including Darbhanga, Madhubani, Purnia, Katihar, Saharsa, Supaul, and Kishanganj districts. The GI registration recognises that the unique mineral composition of Gangetic silt, the region\'s specific water chemistry, and centuries of traditional cultivation knowledge produce makhana with distinct characteristics not reproducible elsewhere. For buyers, the GI tag is a quality assurance signal — it means the product comes from the recognised origin region and has been cultivated using traditional methods. For farmers, GI registration supports premium pricing and geographic branding. Golden Deer sources exclusively from GI-tagged Mithila region cooperatives.',
    relatedSlugs: ['thurri-raw-seed', 'euryale-ferox', 'hand-sorting'],
    linkTo: { label: 'Our story — sourcing origins', href: '/our-story' },
  },
  {
    slug: 'hand-sorting',
    term: 'Hand Sorting',
    hindiTerm: 'हाथ से छँटाई',
    definition:
      'Hand sorting is the manual process of grading raw makhana seeds by size, colour, and integrity — removing discoloured seeds, broken pieces, and undersized grains to ensure consistent quality before popping or packaging.',
    elaboration:
      'Despite advances in optical sorting technology, hand sorting remains the gold standard for premium makhana because of the seed\'s natural variability in size, shape, and colour. Trained sorters work at tables with raw seeds spread in a thin layer, visually inspecting and manually removing any seed that falls below grade. A skilled sorter can process 10–15 kg per hour. Hand sorting achieves less than 2 % broken content and near-zero discoloured seed inclusion — standards that mechanical sorters alone cannot reliably match. For Golden Deer, hand sorting is a non-negotiable quality step. Each batch passes through multiple sorters before being approved for roasting or bulk packing.',
    relatedSlugs: ['suta', '5-6-suta-jumbo', 'touchless-roasting'],
    linkTo: { label: 'Our quality standards', href: '/brand' },
  },
  {
    slug: 'moisture-content',
    term: 'Moisture Content',
    hindiTerm: 'नमी की मात्रा',
    definition:
      'Moisture content is the percentage of water in raw or popped makhana — the single most critical quality parameter that determines popping success, shelf life, and texture preservation.',
    elaboration:
      'For raw thurri, the ideal moisture content is 12–14 % for storage and 8–10 % for popping. If moisture is too high, the seeds won\'t pop (steam doesn\'t build enough pressure). If too low, the seeds shatter during popping instead of puffing (brittle failure). For popped makhana, the target moisture content is 3–5 %. Above 5 %, the makhana loses its crunch and becomes chewy — it\'s hygroscopic, meaning it absorbs ambient moisture. Below 3 %, it becomes brittle with a higher breakage rate. Golden Eagle measures moisture content at three stages: receiving (raw thurri from cooperatives), pre-pop (conditioned seeds), and finished product. Digital moisture analysers provide results in minutes, and every production lot is tested before release.',
    relatedSlugs: ['thurri-raw-seed', 'lawa', 'nitrogen-flushed-packaging'],
  },
  {
    slug: 'nitrogen-flushed-packaging',
    term: 'Nitrogen-Flushed Packaging',
    hindiTerm: 'नाइट्रोजन फ्लश पैकेजिंग',
    definition:
      'Nitrogen-flushed packaging replaces the oxygen inside a sealed pouch with food-grade nitrogen gas before sealing, eliminating the primary cause of rancidity and moisture absorption in makhana.',
    elaboration:
      'Oxygen is the enemy of shelf-stable snacks. It causes lipid oxidation (which creates rancid flavours), moisture ingress (which softens crunch), and can support microbial growth. Nitrogen flushing works by introducing a stream of nitrogen gas into the pouch just before sealing, pushing out ambient air and creating an inert atmosphere around the product. Since nitrogen is odourless, tasteless, and chemically inert, it preserves the makhana\'s original flavour and texture without any chemical preservatives. For makhana specifically, nitrogen flushing extends ambient shelf life from approximately 3 months to 8–12 months. All Golden Deer retail packs and bulk packaging options use nitrogen flushing as a standard practice.',
    relatedSlugs: ['moisture-content', 'clean-label'],
    linkTo: { label: 'Bulk packaging options', href: '/bulk' },
  },
  {
    slug: 'touchless-roasting',
    term: 'Touchless Roasting',
    hindiTerm: 'स्पर्श रहित भूनना',
    definition:
      'Touchless roasting is a dry-heat popping method where makhana seeds are roasted in a rotating drum with automated temperature control — no oil, no direct contact with heating surfaces, and no manual handling during the process.',
    elaboration:
      'Traditional makhana popping involved roasting seeds in sand or salt in open iron pans over a wood fire, requiring constant manual stirring and exposing the product to inconsistent heat and potential contaminants. Touchless roasting uses a closed rotating drum with precise temperature control (typically 200–250 °C) and preset cycle times. The seeds tumble inside the drum, heated by controlled hot air, without contacting any heating element or frying medium. This produces more consistent popping results (95 %+ pop rate versus 70–80 % in traditional methods), eliminates the risk of scorching, ensures food-safety compliance, and allows scalability from small batches to continuous production. Golden Deer\'s facility uses touchless roasting for every batch of retail and bulk makhana.',
    relatedSlugs: ['lawa', 'clean-label', 'hand-sorting'],
    linkTo: { label: 'Our story — how we make makhana', href: '/our-story' },
  },
  {
    slug: 'clean-label',
    term: 'Clean Label',
    definition:
      'Clean label means every ingredient in a product is recognisable as real food — no numbers, no chemical names, no artificial flavours, colours, preservatives, or processing aids that a consumer cannot identify.',
    elaboration:
      'Clean label is not a regulated certification — it is a consumer-driven standard that demands ingredient transparency. For Golden Deer, clean label means our Classic Roast has three ingredients (premium makhana, cold-pressed sunflower oil, sea salt) and every flavoured variant uses real food ingredients: real cheddar in Creamy Cheese, real tomato powder in Tangy Tomato, whole spices in Spicy Masala. No MSG, no artificial flavours, no colours, no preservatives, no palm oil, no anti-caking agents. The clean-label approach extends to our packaging, where we avoid marketing claims that cannot be substantiated. For buyers evaluating makhana suppliers, clean-label manufacturing is increasingly a gating criterion for retail distribution and export certification.',
    relatedSlugs: ['touchless-roasting', 'nitrogen-flushed-packaging'],
    linkTo: { label: 'Read our brand fact sheet', href: '/brand' },
  },
  {
    slug: 'roasted-vs-fried-makhana',
    term: 'Roasted vs Fried Makhana',
    hindiTerm: 'भुना बनाम तला मखाना',
    definition:
      'Roasted makhana is popped using dry heat with little or no oil, while fried makhana is cooked in hot oil — the two methods produce fundamentally different products in terms of texture, nutrition, and shelf life.',
    elaboration:
      'Roasted makhana uses the lawa process: dry heat causes internal moisture to steam and expand the seed from within. The result is an airy, crisp puff with very low fat content (0.1 g per 100 g in plain form). Roasted makhana is the traditional Indian preparation and the basis for all premium retail makhana brands. Fried makhana (sometimes called "makhana namkeen") is coated in seasoned oil or ghee and fried until crispy. It has a richer, oilier mouthfeel but significantly higher fat content (15–25 g per 100 g). Fried makhana has a shorter shelf life because the oil used for frying can go rancid. The distinction matters for nutrition labelling: a pack labelled "roasted" should not be fried. Golden Deer produces only dry-roasted makhana — zero trans fats, no frying oil.',
    relatedSlugs: ['lawa', 'touchless-roasting', 'clean-label'],
    linkTo: { label: 'Shop roasted makhana', href: '/products' },
  },
  {
    slug: 'makhana-flour',
    term: 'Makhana Flour',
    hindiTerm: 'मखाने का आटा',
    definition:
      'Makhana flour is a gluten-free flour made by grinding dried, popped makhana into a fine powder — used as a thickening agent, a binding substitute for wheat flour, and a nutrient-dense base for rotis, puris, and baked goods during fasting periods.',
    elaboration:
      'Makhana flour is a staple of Indian fasting (vrat) cuisine since grains are avoided during many Hindu fasting periods. To make it, popped makhana is dry-roasted until crisp (to remove any residual moisture), then ground to a fine powder in a blender or mill. The flour has a mild, nutty flavour and a light texture. It can be used to thicken curries and soups (similar to cornflour or arrowroot), make gluten-free rotis and puris that are soft and pliable, or as a binding agent in tikkis and cutlets. Nutritionally, makhana flour retains the protein (9.7 g per 100 g) and mineral content of whole makhana, making it more nutrient-dense than refined wheat flour. It is not a direct 1:1 substitute for wheat flour in baking — its lack of gluten means baked goods will be denser — but it works well mixed with other gluten-free flours. Golden Deer does not currently sell makhana flour, but our raw and classic-roast makhana can be ground at home.',
    relatedSlugs: ['makhana', 'roasted-vs-fried-makhana', 'makhana-kheer'],
  },
  {
    slug: 'makhana-kheer',
    term: 'Makhana Kheer',
    hindiTerm: 'मखाने की खीर',
    definition:
      'Makhana kheer is a traditional Indian dessert where roasted raw makhana is simmered in sweetened milk with cardamom, saffron, and nuts until the makhana softens into pearl-like dumplings.',
    elaboration:
      'Makhana kheer is one of the most beloved festive desserts across North India, especially in Bihar, Uttar Pradesh, Punjab, and Rajasthan. It is a staple during Navratri, Diwali, and other Hindu festivals because makhana is a permitted fasting food. The preparation starts with roasting raw makhana in ghee until golden and crisp (some recipes use Golden Deer Classic Roast for convenience). The roasted makhana is then simmered in full-fat milk for 15–18 minutes until it absorbs the milk and becomes soft, tender, and dumpling-like. Sugar or jaggery, crushed cardamom, saffron strands, and chopped almonds/pistachios are added for flavour. The kheer thickens as it cools and is served warm in winter or chilled in summer. The texture is unique — the makhana pearls remain intact but become spoon-tender, creating a dessert that is both rich in flavour and surprisingly light. For the best texture, use raw makhana (not pre-roasted) so the seeds absorb the milk fully.',
    relatedSlugs: ['makhana', 'thurri-raw-seed', 'makhana-flour'],
    linkTo: { label: 'See the makhana kheer recipe', href: '/recipes/makhana-kheer' },
  },
]

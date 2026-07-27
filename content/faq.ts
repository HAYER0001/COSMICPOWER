export interface FAQ {
  question: string
  answer: string
  category: 'consumer' | 'bulk'
}

export const faq: FAQ[] = [
  {
    question: 'Makhana konsa lu — roasted ya raw?',
    answer:
      'Agar aapko ready-to-eat snack chahiye, Golden Deer Classic Roast lo — it is already slow-roasted with a light salt, ready to eat straight from the pack. Raw makhana is for cooking: curries, kheer, or roasting at home with your own masala. Roasted for snacking, raw for cooking — simple.',
    category: 'consumer',
  },
  {
    question: 'Roasted makhana healthy hai kya?',
    answer:
      'Haan, bilkul. Roasted makhana is one of the healthiest snacks you can eat — rich in protein (9.7g per 100g), very low in fat (0.1g), and packed with antioxidants and fibre. Our Classic Roast is slow-roasted in minimal cold-pressed oil, not fried. No artificial preservatives, no MSG, no trans fats. Great for weight management, diabetes-friendly, and gluten-free.',
    category: 'consumer',
  },
  {
    question: 'What makes Golden Deer a clean-label brand?',
    answer:
      'Clean-label means every ingredient on the packet is recognisable as real food. Our Classic Roast has three ingredients: premium makhana, cold-pressed sunflower oil, and fine sea salt. No artificial flavours, no colours, no MSG, no preservatives, no palm oil. What you see is what you eat — honest food, no chemistry experiments.',
    category: 'consumer',
  },
  {
    question: 'Makhana vs chips — which is better?',
    answer:
      'There is no comparison. A 50g serving of potato chips has about 270 calories and 17g of fat. The same serving of Golden Deer makhana has roughly 170 calories and less than 0.1g of fat. Makhana also delivers protein, fibre, and antioxidants that chips simply do not have. Taste-wise, our flavoured variants (Creamy Cheese, Spicy Masala, Tangy Tomato) give you the same satisfying savoury experience without the oil or artificial aftertaste.',
    category: 'consumer',
  },
  {
    question: 'Can makhana help with weight loss?',
    answer:
      'Makhana is an excellent snack for weight management. High protein and fibre content keep you fuller for longer, reducing the urge to binge on empty calories. The low glycaemic index means no insulin spikes followed by sugar crashes. And at barely 0.1g fat per 100g, you get the crunch without the guilt. Replace your evening fried snack with a bowl of Golden Deer makhana and your body will thank you within weeks.',
    category: 'consumer',
  },
  {
    question: 'Kitna makhana roz kha sakte hain?',
    answer:
      'Ek healthy adult ke liye 30–50g (about 2–3 handfuls) per day is an ideal portion. This gives you about 4–5g of protein and plenty of fibre without overdoing it. Makhana is nutrient-dense but light, so listen to your body — start with a handful and see how you feel. As with any food, balance is key.',
    category: 'consumer',
  },
  {
    question: 'Makhana ko kaise store karein?',
    answer:
      'Roasted makhana ko hamesha airtight container mein rakhein, cool and dry jagah par. Dhoop aur nami se door rakhein. Properly stored, our nitrogen-flushed packs stay fresh for 6–8 months. Once opened, consume within 15–20 days for best crunch. Agar makhana apni crunch kho de, unhe 2–3 minutes ke liye low flame par dry roast karein — wapas crisp ho jayenge.',
    category: 'consumer',
  },
  {
    question: 'Is makhana gluten-free?',
    answer:
      'Yes, makhana (fox nuts) is naturally gluten-free — it is not a grain but a seed harvested from the Euryale ferox water lily. All Golden Deer products are processed in a dedicated facility with no gluten-containing ingredients, and we do not use wheat flour or any binders in our flavouring. Safe for celiacs and anyone on a gluten-free diet.',
    category: 'consumer',
  },
  {
    question: 'Bacchon ke liye makhana safe hai?',
    answer:
      'Haan, makhana is one of the best first snacks for kids. It is naturally soft-crunchy (no hard edges), easy to digest, and packed with calcium and protein for growing bodies. For toddlers, crush the classic roast into smaller pieces to prevent any choking risk. No artificial colours or preservatives — sirf pure, natural crunch. A perfect tiffin snack for school-going children.',
    category: 'consumer',
  },
  {
    question: 'What is 5–6 suta makhana — and why does grade matter?',
    answer:
      'Suta is the traditional grading system for makhana, referring to the number of radial lines or the size range. 5–6 suta means 18–24mm diameter — the largest, most premium grade available. Bigger seeds pop into bigger, fluffier puffs with better texture and presentation. Golden Deer standardises on 5–6 suta jumbo grade for our retail products, while offering 4–5 suta (14–18mm) as a culinary grade. Grade directly affects pop yield, finished product consistency, and plate appeal — this is why professional roasters source by suta grade, not by visual guesswork.',
    category: 'bulk',
  },
  {
    question: 'How to order bulk makhana from Golden Deer as a wholesale buyer?',
    answer:
      'Visit our /bulk page and fill the segmented inquiry form, or message us directly on WhatsApp with your requirement — quantity, preferred grade, packaging format, and destination. Our team will respond within 24 hours with a custom quote including FOB/CIF for export orders or delivered pricing for domestic. We work with retailers, distributors, HoReCa chains, white-label brands, corporate gifting buyers, and export partners. No minimum order is too small for a serious inquiry, and we can scale to multi-tonne container loads for export.',
    category: 'bulk',
  },
  {
    question: 'Do you supply raw makhana for other brands to roast and pack?',
    answer:
      'Yes — white-label raw makhana supply is a core part of our business. We supply premium raw makhana (both 5–6 suta jumbo and 4–5 suta standard grades) in bulk packaging to retail brands, food processors, and HoReCa operators. Every lot is hand-sorted, size-graded, and optionally nitrogen-flushed for extended shelf life. We can also provide third-party lab analysis for your quality assurance team. Contact us via the bulk inquiry form or WhatsApp with your volume requirements.',
    category: 'bulk',
  },
  {
    question: 'What does nitrogen-flushed packaging do for makhana?',
    answer:
      'Nitrogen flushing replaces the oxygen inside the pack with food-grade nitrogen gas before sealing. This prevents oxidation, which is the primary cause of rancidity in nuts and seeds. For makhana, nitrogen flushing preserves the delicate crunch, prevents moisture absorption, and extends ambient shelf life from 3 months to 8–12 months without any chemical preservatives. All Golden Deer bulk packs offer nitrogen flushing as a standard option — it is a quality investment that ensures your product stays fresh from our warehouse to your customer\'s bowl.',
    category: 'bulk',
  },
  {
    question: 'Corporate gifting with makhana — what are the minimums and options?',
    answer:
      'We offer custom-branded corporate gifting boxes with a minimum of 50 units per order. Options include: curated assortment boxes (all 5 roasted flavours in individual packs), premium gift tins with a single large format bag, or bulk raw makhana hampers for health-conscious clients. Custom branding, personalised notes, and festive packaging (Diwali, wedding season, corporate events) are available. Lead time is typically 7–10 working days for quantities under 500 units. Use our bulk inquiry form or WhatsApp to discuss your corporate gifting needs.',
    category: 'bulk',
  },
]

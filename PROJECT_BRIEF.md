# Golden Deer — Complete Project Brief

> **Give this file to any AI assistant to get update suggestions, new features, bug fixes, or improvements.**

---

## 1. What This Site Is

**Golden Deer** is the premium roasted makhana (fox nuts) brand by **Cosmic Power Pvt. Ltd.** — a production-grade marketing + dual-funnel commerce website for an Indian snack food company based in Bihar, India.

The site serves two audiences:
- **Retail consumers** (D2C funnel): Browse products → Buy on Blinkit / Zepto / Amazon (no on-site cart)
- **Business buyers** (B2B funnel): Browse specs → Submit inquiry form or WhatsApp → Get custom quote

---

## 2. Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 16.2.10 |
| Language | TypeScript | strict: true |
| Styling | Tailwind CSS | v4 |
| Animation | Framer Motion | 12.42.2 |
| Animation | GSAP + ScrollTrigger | 3.15.0 |
| Smooth Scroll | Lenis | 1.3.25 |
| 3D | Three.js + React Three Fiber + Drei | 0.185.1 |
| Icons | Lucide React | 1.24.0 |
| Email | Resend | 6.17.2 |
| Analytics | Vercel Analytics | 2.0.1 |
| Fonts | Cormorant Garamond (display) + Inter (body) | — |
| Domain | golden-deer.vercel.app → cosmicpower.ltd | — |

---

## 3. Brand & Business Identity

- **Brand Name:** Golden Deer
- **Tagline:** "Premium Roasted Makhana — Naturally Good."
- **Company:** Cosmic Power Pvt. Ltd.
- **CIN:** U46307BR2026PTC085787
- **GSTIN:** 10AANCC9477F2ZG
- **Startup India:** DIPP269634
- **MSME:** UDYAM-BR-26-0237862
- **FSSAI:** 10426999000286 (Central License — Trade/Retail, valid till 26-07-2027)
- **ISO 9001:2015:** E20260750767 (QMS — Audittech Certification, CAB #1190, valid till 31-07-2029)
- **Address:** 1639- Ganga chak malikana, Post office - Masaurhi, Police station- Masaurhi, Dist - Patna, Pin- 804452, State- Bihar
- **Email:** chandan@cosmicpower.ltd
- **WhatsApp:** +91 97791 55132
- **Google Business:** https://share.google/3zKvPNTo7VYTvv1q6
- **Socials:** Instagram, YouTube, LinkedIn (all ADD_URL placeholders)
- **Commerce Links:** Blinkit, Zepto, Amazon (all ADD_URL placeholders)

### Placeholder Status (needs real data)
- Social media URLs → `ADD_URL`
- Commerce platform URLs → `ADD_URL`
- Product images/videos → many use placeholder paths
- YouTube video IDs in recipes → `REPLACE_WITH_REAL_VIDEO_ID`

---

## 4. Design System

### Color Palette
```
Forest:      #0F2E1E (primary dark — header, footer, text)
Forest Deep: #081A10 (darkest — body text)
Forest Light:#1A4A30
Cream:       #F5EFE2 (background)
Cream Dark:  #E5DCC8 (alternating sections)
Gold:        #C9A24B (primary accent — CTAs, highlights)
Gold Light:  #E8C97A (hover states)
Gold Deep:   #8C6A1D (shadows)
Ink:         #101410
Ink Light:   #2A2F2A
Ink Muted:   #5C635C
```

### Typography
- **Display:** Cormorant Garamond (headings, brand name) — variable `--font-display`
- **Body:** Inter (paragraphs, UI) — variable `--font-body`

### Custom CSS Classes
- `.gold-particle` — floating gold dot animation
- `.text-gold-gradient` — gradient gold text fill
- `.bg-grain` — SVG noise texture overlay
- `.glass` — glassmorphism panel (backdrop blur + border)
- `.animate-gd-shake` — form field shake on error
- `.animate-drift-wave` — subtle drift animation

### Animations & Keyframes
- `marquee` — horizontal infinite scroll (30s)
- `shimmer` — opacity pulse (3s)
- `fade-up` — fade + translate up (0.7s)
- `fade-in` — opacity transition (0.5s)
- `pulse-glow` — gold box-shadow pulse (2s)
- `float-particle` — gold particle float (4s)
- `gd-shake` — error shake (0.45s)
- `drift-wave` — subtle horizontal drift (6s)
- View transitions for product media and page routing

### Reduced Motion
Full `prefers-reduced-motion` support — all animations disabled when user prefers reduced motion.

---

## 5. Complete File Structure

```
COSMICPOWER-main/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx                # Root layout (fonts, header, footer, smooth scroll, schemas)
│   ├── page.tsx                  # Homepage (Hero + HomeClient)
│   ├── globals.css               # Tailwind config, colors, animations, glass, grain
│   ├── not-found.tsx             # 404 page
│   ├── sitemap.ts                # Dynamic XML sitemap
│   ├── robots.ts                 # Robots.txt
│   ├── api/inquiry/route.ts      # POST endpoint for bulk inquiry form
│   │
│   ├── products/
│   │   ├── page.tsx              # Product listing with filter chips + ItemList JSON-LD
│   │   ├── products-grid-client.tsx  # Client-side filter grid
│   │   └── [slug]/page.tsx       # Product detail SSG (6 SKUs) + Product JSON-LD
│   │
│   ├── recipes/
│   │   ├── page.tsx              # Recipe grid listing
│   │   └── [slug]/page.tsx       # Recipe detail with YouTube embed (6 recipes)
│   │
│   ├── journal/
│   │   ├── page.tsx              # Editorial article grid
│   │   └── [slug]/page.tsx       # Full article (MDX-based, 7 articles)
│   │
│   ├── bulk/page.tsx             # Bulk/wholesale page + inquiry form
│   ├── our-story/page.tsx        # Brand story + AboutPage JSON-LD
│   ├── faq/page.tsx              # 14 Q&A accordion
│   ├── contact/page.tsx          # Contact cards
│   ├── brand/page.tsx            # Brand fact sheet
│   ├── privacy/page.tsx          # Privacy policy
│   ├── terms/page.tsx            # Terms of service
│   ├── shipping/page.tsx         # Shipping & returns
│   ├── editorial-policy/page.tsx # Editorial policy
│   │
│   ├── makhana/
│   │   ├── page.tsx              # Comprehensive makhana guide (massive SEO page)
│   │   ├── nutrition/page.tsx    # Full nutrition reference
│   │   ├── glossary/page.tsx     # Glossary index (20 terms)
│   │   ├── glossary/[slug]/page.tsx  # Individual glossary entries
│   │   ├── vs/page.tsx           # Comparison index (4 comparisons)
│   │   └── vs/[slug]/page.tsx    # Individual comparison pages
│   │
│   └── hi/                       # Hindi language section
│       ├── layout.tsx            # Hindi layout wrapper (lang="hi")
│       ├── makhana-kya-hai/page.tsx   # "What is makhana?" in Hindi
│       └── makhana-konsa-lu/page.tsx  # "Which makhana should I buy?" in Hindi
│
├── components/
│   ├── home/
│   │   ├── Hero.tsx              # Hero section (video bg, GSAP scroll, 3D pearls)
│   │   ├── HomeClient.tsx        # Homepage sections (stats, products, farm, gifting, recipes, journal, CTA)
│   │   └── OurStoryClient.tsx    # Our Story page client component
│   │
│   ├── layout/
│   │   ├── Header.tsx            # Fixed nav bar (mobile hamburger menu with Framer Motion)
│   │   ├── Footer.tsx            # 4-column footer (brand, explore, business, corporate info)
│   │   └── CustomCursor.tsx      # Custom cursor effect
│   │
│   ├── shared/
│   │   ├── primitives.tsx        # Container, Button, SectionHeading, Tag, AnimatedCounter, Divider, Ripple
│   │   ├── SmoothScroll.tsx      # Lenis smooth scroll wrapper
│   │   ├── ScrollProgress.tsx    # Top scroll progress bar
│   │   ├── PageTransition.tsx    # Page transition wrapper
│   │   ├── ScrollReveal.tsx      # Scroll-triggered reveal animation
│   │   ├── ParallaxSection.tsx   # Parallax scroll section
│   │   ├── MotionLoop.tsx        # Video/image loop component
│   │   ├── SplitText.tsx         # Text split animation
│   │   ├── MagneticButton.tsx    # Magnetic hover button
│   │   ├── TiltCard.tsx          # 3D tilt card effect
│   │   ├── Highlight.tsx         # Text highlight component
│   │   ├── SectionDivider.tsx    # Decorative section dividers
│   │   ├── QuickOrderFab.tsx     # Floating order button (mobile) — Blinkit/Zepto/WhatsApp
│   │   └── shimmer.ts            # Image shimmer placeholder props
│   │
│   ├── products/
│   │   └── ProductDetailClient.tsx  # Product detail page client component
│   │
│   ├── recipes/
│   │   ├── RecipeDetailClient.tsx   # Recipe detail client component
│   │   └── YouTubeEmbed.tsx         # YouTube embed wrapper
│   │
│   ├── journal/
│   │   └── JournalArticleClient.tsx # Journal article client component
│   │
│   ├── bulk/
│   │   └── InquiryForm.tsx       # Segmented inquiry form (name, company, email, phone, buyer type, quantity, message)
│   │
│   ├── makhana/
│   │   ├── ComparisonBars.tsx    # Animated comparison bars
│   │   └── PondToPack.tsx        # Visual pond-to-pack journey
│   │
│   ├── faq/
│   │   └── FAQAccordion.tsx      # FAQ accordion component
│   │
│   ├── seo/
│   │   ├── OrganizationSchema.tsx # Organization JSON-LD
│   │   ├── WebSiteSchema.tsx      # WebSite JSON-LD
│   │   └── LangSetter.tsx        # Language setter
│   │
│   └── three/
│       ├── Scene3D.tsx            # R3F Canvas gate (intersection, WebGL error boundary, device checks)
│       ├── HeroPearls.tsx         # Floating 3D pearl/makhana shapes on hero
│       ├── ParticleDeer.tsx       # 3D particle deer animation
│       ├── GoldFlow.tsx           # Gold flow animation
│       ├── GoldFlowBackground.tsx # Gold flow background for CTA section
│       ├── ProductInspect.tsx     # 3D product inspection
│       ├── StoryPrologue.tsx      # 3D story prologue scene
│       ├── BackgroundWrapper.tsx  # 3D background wrapper
│       ├── NotFoundBoundary.tsx   # 3D not-found boundary
│       ├── NotFoundSpheres.tsx    # 3D not-found spheres
│       └── NotFoundClient.tsx     # 3D not-found client
│
├── content/                       # Static content data layer (no CMS)
│   ├── site.ts                    # Brand info, legal IDs, contact, socials, commerce URLs
│   ├── products.ts                # 6 product SKUs (5 roasted + 1 raw/bulk)
│   ├── recipes.ts                 # 6 recipes with ingredients, steps, YouTube IDs
│   ├── faq.ts                     # 14 Q&As (9 consumer + 5 bulk)
│   ├── glossary.ts                # 20 glossary terms about makhana
│   ├── comparisons.ts             # 4 snack comparisons (vs chips, popcorn, almonds, peanuts)
│   └── journal.ts                 # 7 journal article entries
│
├── lib/
│   └── three/
│       └── golden-studio.tsx      # Shared 3D studio: lighting, materials (ivory, gold, brass, glass, dust)
│
├── scripts/
│   └── indexnow-ping.mjs          # IndexNow ping script for SEO
│
├── public/                        # Static assets (images, videos, robots, sitemap)
│
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
└── README.md
```

---

## 6. Products (6 SKUs)

| # | Slug | Name | MRP | Weight Options | Type | Key Features |
|---|------|------|-----|---------------|------|-------------|
| 1 | `plain` | Classic Plain | ₹99 | 50g, 100g, 200g | Retail | 3 ingredients, lightly salted |
| 2 | `salted` | Salted | ₹109 | 50g, 100g, 200g | Retail | Himalayan pink salt + black pepper |
| 3 | `peri-peri` | Peri Peri | ₹109 | 50g, 100g, 200g | Retail | African bird's eye chilli |
| 4 | `tangy-tomato` | Tangy Tomato | ₹109 | 50g, 100g, 200g | Retail | Real tomato powder |
| 5 | `pudina` | Pudina | ₹109 | 50g, 100g, 200g | Retail | Cumin, coriander, red chilli, ginger, amchur |
| 6 | `raw-makhana` | Premium Raw Makhana | Contact for pricing | 5kg, 10kg, 25kg bulk | Bulk | Jumbo grade 5-6 suta, hand-sorted |

### Product Data Structure
Each product has: slug, name, tagline, description, descriptionFull, tags, mrp, netWeights, nutrition (energyKcal, proteinG, carbsG, fatG, disclaimer), benefits[], ingredients[], loop (video/image path), poster, commerce links (Blinkit, Zepto, Amazon, IndiaMART, Instamart), isBulk flag, and optional bulkSpec (grades, packOptions, moqNote, qualityNotes).

---

## 7. Recipes (6 Recipes)

| # | Slug | Time | Serves |
|---|------|------|--------|
| 1 | `makhana-bhel` | 10 min | 2 |
| 2 | `makhana-kheer` | 35 min | 4 |
| 3 | `peri-peri-makhana` | 15 min | 2 |
| 4 | `makhana-chaat` | 5 min | 2 |
| 5 | `golden-trail-mix` | 5 min | ~4 cups |
| 6 | `makhana-curry` | 30 min | 3 |

Each recipe has: slug, title, intro, youtubeId (placeholder), time, serves, ingredients[], steps[], loop (video path), poster.

---

## 8. All Routes (30+ pages)

| Route | Type | Description |
|-------|------|-------------|
| `/` | Static | Home: hero (video bg + 3D pearls) → stats (animated counters) → 3D deer → product grid → farm direct → gifting & wholesale → recipes teaser → journal teaser → marquee band → closing CTA |
| `/products` | Static | Product listing with filter chips, ItemList JSON-LD |
| `/products/[slug]` | SSG | Product detail (6 SKUs), Product + BreadcrumbList JSON-LD |
| `/recipes` | Static | Recipe grid with video loops |
| `/recipes/[slug]` | SSG | Recipe detail with YouTube embed |
| `/journal` | Static | Editorial article grid (7 articles) |
| `/journal/[slug]` | SSG | Full journal article |
| `/our-story` | Static | Brand story with 4 cinemagraph chapters, AboutPage JSON-LD |
| `/bulk` | Static | Bulk/wholesale page: hero → audience cards → partner benefits → grade table → how it works → FAQ → WhatsApp CTA → inquiry form |
| `/faq` | Static | 14 Q&A accordion (consumer + bulk) |
| `/contact` | Static | Contact cards |
| `/brand` | Static | Brand fact sheet |
| `/makhana` | Static | **Massive SEO page** — complete makhana guide (12 sections: what is, cultivation, processing, suta grades, nutrition, health benefits, roast at home, storage, buying checklist, tradition, FAQ, comparisons) |
| `/makhana/nutrition` | Static | Full nutrition reference |
| `/makhana/glossary` | Static | Glossary index (20 terms) |
| `/makhana/glossary/[slug]` | SSG | Individual glossary entries |
| `/makhana/vs` | Static | Comparison index (4 comparisons) |
| `/makhana/vs/[slug]` | SSG | Individual comparison pages |
| `/privacy` | Static | Privacy policy |
| `/terms` | Static | Terms of service |
| `/shipping` | Static | Shipping & returns |
| `/editorial-policy` | Static | Editorial policy |
| `/hi/makhana-kya-hai` | Static | "What is makhana?" in Hindi |
| `/hi/makhana-konsa-lu` | Static | "Which makhana should I buy?" in Hindi |
| `/api/inquiry` | Dynamic POST | Bulk inquiry form backend (Resend email, rate limiting, honeypot) |

---

## 9. Database / Data Layer

**No database. No CMS.** All content lives in `content/` as typed TypeScript files:

| File | Content | Records |
|------|---------|---------|
| `site.ts` | Brand info, legal IDs, contact, socials, commerce URLs | 1 |
| `products.ts` | Product SKUs with full specs | 6 |
| `recipes.ts` | Recipes with ingredients, steps | 6 |
| `faq.ts` | Q&A entries (consumer + bulk) | 14 |
| `glossary.ts` | Makhana terminology | 20 |
| `comparisons.ts` | Snack vs makhana comparisons | 4 |
| `journal.ts` | Article entries | 7 |

---

## 10. 3D / Visual Effects

### Three.js Scenes (all SSR-safe via dynamic import + Scene3D gate)
- **HeroPearls** — 8 floating ivory-colored makhana pearl shapes with mouse-tracking parallax + 250 gold dust particles
- **ParticleDeer** — 3D particle deer animation on homepage
- **GoldFlowBackground** — Gold flow animation for CTA section
- **ProductInspect** — 3D product inspection (on product pages)
- **StoryPrologue** — 3D story prologue scene
- **NotFoundSpheres** — 3D spheres for 404 page

### Scene3D Gate Logic
- Checks `prefers-reduced-motion`, pointer type (fine only), save-data mode
- Uses IntersectionObserver (30% threshold) to only render when visible
- WebGL error boundary catches GPU failures gracefully
- DPR capped at 1.75, `powerPreference: 'high-performance'`

### Shared 3D Studio (`lib/three/golden-studio.tsx`)
- Custom `Environment` with 3 `Lightformer` rectangles (warm cream key, gold rim, cool fill)
- Ambient + directional light
- FogExp2 for depth
- Material presets: MakhanaIvory, GoldFoil, AgedBrass, ClearGlass, GoldDust (additive blending)

---

## 11. Animation System

### Libraries Used Together
1. **Lenis** — smooth scroll (duration 1.2s, exponential easing)
2. **GSAP + ScrollTrigger** — scroll-driven animations (hero parallax, marquee velocity, ring scale)
3. **Framer Motion** — component-level animations (page transitions, mobile menu, hover effects, button spring physics)

### Key Animation Patterns
- **Hero:** GSAP staggered fade-up on overlay elements, background scale on scroll via ScrollTrigger
- **Marquee Band:** GSAP infinite horizontal scroll with velocity-responsive time scale + skew
- **WhyMakhana Ring:** ScrollTrigger scrub-driven scale + translate + opacity
- **Buttons:** Framer Motion spring `whileHover` (scale 1.03) + `whileTap` (scale 0.96) with ripple effect
- **Mobile Menu:** Framer Motion `AnimatePresence` with staggered fade-in per nav link
- **QuickOrderFab:** Spring-animated fan-out with trigonometric positioning
- **AnimatedCounter:** IntersectionObserver-triggered cubic ease count-up
- **View Transitions:** CSS `::view-transition-old/new` for product media and page routing

---

## 12. SEO / AEO / GEO Implementation

### JSON-LD Schemas (per page)
- `Organization` (global, in layout)
- `WebSite` (global, in layout)
- `Product` + `BreadcrumbList` (product detail pages)
- `ItemList` (products listing)
- `Recipe` (recipe pages — inferred from content)
- `Article` + `BreadcrumbList` + `WebPage` (makhana guide)
- `AboutPage` (our-story)
- `FAQPage` (faq page)
- `SpeakableSpecification` (makhana guide — for voice assistants)

### Technical SEO
- `sitemap.ts` — Dynamic XML sitemap with all 30+ routes, priorities, change frequencies
- `robots.ts` — Allows all crawlers
- `public/llms.txt` — LLM-friendly site description
- `scripts/indexnow-ping.mjs` — IndexNow protocol for instant indexing
- Canonical URLs on every page
- OpenGraph + Twitter Card meta on every page (with OG images from `/images/og/`)
- `metadataBase` set to `https://www.cosmicpower.ltd`
- Theme color: `#0F2E1E`
- Manifest: `/site.webmanifest`

### Content SEO
- `/makhana` is a massive pillar page (500+ lines) covering: what is, cultivation, processing, suta grades, nutrition table, health benefits, how to roast at home, storage, buying checklist, tradition, FAQ, comparisons
- 20 glossary terms with internal cross-linking
- 4 comparison pages (vs chips, popcorn, almonds, peanuts)
- Hindi pages for regional SEO (`/hi/*`)
- Journal with 7 editorial articles
- Breadcrumbs on all inner pages

---

## 13. API / Backend

### `POST /api/inquiry`
- **Purpose:** Receive bulk/wholesale inquiry form submissions
- **Fields:** name, email, phone, company, buyerType, quantity, message, website (honeypot)
- **Validation:** name (min 2 chars), email (regex), message (min 10 chars)
- **Rate Limiting:** 5 requests per IP per hour (in-memory Map)
- **Honeypot:** Hidden `website` field — if filled, silently returns success (bot trap)
- **Email:** Sends via Resend to `INQUIRY_TO_EMAIL` env var + auto-reply to submitter
- **Email Template:** HTML table with brand styling (forest/gold theme)
- **Error Handling:** Graceful fallback if Resend not configured

---

## 14. Environment Variables Needed

```env
NEXT_PUBLIC_SITE_URL=https://www.cosmicpower.ltd
NEXT_PUBLIC_WHATSAPP_NUMBER=+91 97791 55132
RESEND_API_KEY=re_xxxxx
INQUIRY_TO_EMAIL=chandan@cosmicpower.ltd
```

---

## 15. Inquiry Form Details

### Buyer Types (dropdown)
1. Distributor / Wholesaler
2. Retailer
3. HoReCa / Restaurant / Hotel
4. Corporate Gifting Buyer
5. Exporter
6. Food Processor / Brand
7. Individual / Small Batch
8. Other

### Quantity Options (dropdown)
1. Less than 10 kg
2. 10–50 kg
3. 50–200 kg
4. 200–500 kg
5. 500 kg – 1 tonne
6. 1–5 tonnes
7. 5+ tonnes (container load)

### Form Features
- Client-side field validation with shake animation on error
- Valid checkmark icon on validated fields
- Honeypot anti-spam field
- Animated success state with SVG checkmark
- Loading spinner during submission

---

## 16. Layout & Navigation

### Header (Fixed)
- Logo (image + text fallback)
- Desktop nav: Products, Recipes, Bulk & Wholesale, Our Story, Journal, Contact
- "Order Now" CTA button
- Mobile: hamburger menu with Framer Motion animated overlay

### Footer (4-column)
1. Brand column: Logo + tagline
2. Explore: All Products, Recipes, Our Story, Journal, Contact, Brand Facts, Makhana Guide, Glossary, Nutrition, Comparisons, Hindi pages, Editorial Policy
3. For Business: Bulk & Wholesale, Corporate Gifting
4. Corporate Info: Company name, CIN, GSTIN, Startup India, MSME, FSSAI

### QuickOrderFab (Mobile only)
- Floating gold button (bottom-right)
- Expands to show: Blinkit, Zepto, WhatsApp (if URLs configured)
- Only shows on `/` and `/products` routes (hidden on product detail)
- Spring-animated fan-out with trigonometric positioning

---

## 17. Key Components Explained

### `SmoothScroll.tsx`
- Initializes Lenis with duration 1.2s, exponential easing
- Runs via `requestAnimationFrame` loop
- Disabled when `prefers-reduced-motion` is active

### `Scene3D.tsx`
- IntersectionObserver gate (30% threshold)
- Device capability checks (pointer: fine, no save-data, no reduced-motion)
- WebGL error boundary
- R3F Canvas with DPR [1, 1.75], alpha, antialias

### `primitives.tsx`
- `Container` — max-w-7xl centered wrapper
- `Button` — 3 variants (gold-solid, gold-outline, ghost) with Framer Motion spring + ripple
- `SectionHeading` — eyebrow + title + lede with alignment
- `Tag` — 3 variants (gold, forest, cream)
- `AnimatedCounter` — IntersectionObserver-triggered count-up with cubic easing
- `Divider` — gold/15 border separator

### `MotionLoop.tsx`
- Video or image loop with poster fallback
- Used extensively on homepage and content pages

### `TiltCard.tsx`
- 3D tilt effect on hover (mouse position tracking)

### `MagneticButton.tsx`
- Button that follows cursor magnetically on hover

---

## 18. Content Strategy

### Pages Designed for SEO
1. `/makhana` — Pillar page (comprehensive makhana guide, 500+ lines)
2. `/makhana/glossary` — 20 terms with cross-linking
3. `/makhana/vs` — 4 comparison pages
4. `/makhana/nutrition` — Detailed nutrition reference
5. `/products` — Product listing with JSON-LD
6. `/bulk` — B2B conversion page
7. `/hi/*` — Hindi content for regional SEO

### Internal Linking Strategy
- Every product page links to related glossary terms
- Makhana guide links to products, recipes, journal, glossary, comparisons
- Glossary entries cross-link to related terms
- Journal articles link to products and guides
- Footer contains comprehensive site navigation

---

## 19. Known Placeholders / TODOs

### Business Data (must be filled)
- [x] FSSAI license number → 10426999000286
- [x] ISO 9001:2015 QMS certificate → E20260750767
- [ ] Social media URLs (Instagram, YouTube, LinkedIn)
- [ ] Commerce platform URLs (Blinkit, Zepto, Amazon)
- [ ] Product video files (currently using .jpg posters as fallback)
- [ ] Recipe YouTube video IDs (all set to `REPLACE_WITH_REAL_VIDEO_ID`)
- [ ] OG images for each page (`/images/og/og-*.jpg`)

### Technical
- [ ] `.env.example` file referenced in README but not present
- [ ] Some components may have unused imports
- [ ] Journal articles referenced in `content/journal.ts` need MDX files in `content/journal/`

---

## 20. Build & Deploy

### Commands
```bash
npm install              # Install dependencies
npm run dev              # Development server (Turbopack)
npm run build            # Production build (MUST pass before deploy)
npm run lint             # ESLint check
npm start                # Production server
npm run submit:indexnow  # Ping IndexNow for SEO
```

### Deploy Pipeline
1. Push to GitHub
2. Import in Vercel
3. Set env vars in Vercel dashboard
4. Point `cosmicpower.ltd` CNAME to `cname.vercel.com`
5. Run video optimization script after uploading assets
6. Verify `npm run build` passes

### Video Asset Pipeline
```bash
bash scripts/optimize-videos.sh              # Re-encode oversized videos
bash scripts/optimize-videos.sh --check-only # Size report only
```

**Budget:** Hero loop max 4MB, other loops max 2.5MB, posters max 200KB

---

## 21. What Makes This Site Special

1. **Dual-funnel architecture** — Clean separation between D2C retail (external commerce links) and B2B wholesale (inquiry form + WhatsApp)
2. **No CMS** — All content as typed TS files = zero vendor lock-in, full type safety, instant builds
3. **3D scenes** — React Three Fiber with intelligent gating (device checks, intersection loading, WebGL fallback)
4. **Animation layering** — Lenis (scroll) + GSAP (scroll-triggered) + Framer Motion (component-level) working together
5. **SEO-first content** — Massive pillar page, 20 glossary terms, 4 comparison pages, Hindi content, JSON-LD on every page
6. **Accessibility** — `prefers-reduced-motion` respected throughout, semantic HTML, aria labels
7. **Bot protection** — Honeypot field + rate limiting on inquiry form
8. **Brand consistency** — Custom design system (forest/gold/cream), custom cursor, grain textures, glass effects

---

*This document was auto-generated by scanning every source file in the COSMICPOWER-main repository. Give it to any AI assistant for contextual update suggestions.*

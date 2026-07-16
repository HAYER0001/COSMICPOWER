# Golden Deer — Cosmic Power Pvt. Ltd.

## COMPANY (legal entity)
Cosmic Power Pvt. Ltd. — CIN U46307BR2026PTC085787, GSTIN 10AANCC9477F2ZG, Startup India DIPP269634, MSME UDYAM-BR-26-0237862, FSSAI "ADD_FSSAI_NUMBER".

## BRAND
Golden Deer — symbol of purity, agility, and natural vitality. The site is Golden Deer's storefront published by Cosmic Power — never confuse the two.

## VISION
Make Golden Deer a household name in healthy snacking.

## MISSION
Sustainably sourced, ethically processed superfood snacks that empower farming partner communities.

## PRODUCT RANGE (6 SKUs)
1. Classic Roast — slug: `classic-roast`
2. Himalayan Pink Salt & Pepper — slug: `pink-salt-pepper`
3. Tangy Tomato — slug: `tangy-tomato`
4. Creamy Cheese — slug: `creamy-cheese`
5. Spicy Masala — slug: `spicy-masala`
6. Premium Raw Makhana — slug: `raw-makhana`

## TWO-FUNNEL PRINCIPLE
- **Funnel A — D2C retail:** Premium-snack buyers buy via quick-commerce. Primary CTAs: "Buy on Blinkit" / "Buy on Zepto" (Amazon secondary). No on-site cart.
- **Funnel B — Bulk & wholesale:** Distributors, retailers, HoReCa, corporate gifting, export. Converts through `/bulk` page, segmented inquiry form, and wa.me prefilled bulk-quote link.

## QUALITY & TRUST PROPS
Direct farmer partnerships; hand-picked from pristine wetlands; jumbo seeds only; touchless roasting and sorting; nitrogen-flushed packaging; slow-roasted, no frying, no artificial preservatives; rich in protein and antioxidants.

## MOTION-FIRST PRINCIPLE
Short seamless video loops with poster fallbacks:
- `/videos/hero.mp4` (+ .webm, hero-poster.jpg)
- `/videos/ambient/why-makhana.mp4`
- `/videos/products/{slug}.mp4` (all 6 slugs)
- `/videos/story/story-1.mp4` ... `story-4.mp4`
- `/videos/recipes/{slug}.mp4`
- `/videos/gifting.mp4`, `/videos/logo-reveal.mp4`
Logo: user-supplied at `/images/logo.png` (transparent PNG) — never generate or replace.

## HARD RULES
1. Every component using hooks/window/document/GSAP/media APIs: `'use client'` + guard browser access.
2. Mobile-first, test at 375px.
3. Free services only — Vercel, Resend free tier, GA4, local content, wa.me, youtube-nocookie facades.
4. All videos: muted autoPlay loop playsInline with poster. Hero: `preload="metadata"`. Others: `preload="none"`, pause offscreen.
5. Respect `prefers-reduced-motion` and `Save-Data`: posters only.
6. Real HTML text always above media.
7. Video budget: hero ≤4MB, loops ≤2.5MB, posters ≤200KB.
8. `npm run build` after EVERY task, zero errors.
9. Missing loop/poster never breaks layout — fallback: loop→poster→branded gradient with dev-only path label.

## FIXED STACK
- Next.js (App Router only)
- TypeScript (strict: true)
- Tailwind CSS
- Framer Motion + GSAP/ScrollTrigger
- Lenis (single scroll source)
- Resend (free tier)

## 3D LAYER RULES (additive — never replaces motion-first)
1. **ADDITIVE ONLY** — every 3D feature mounts as an overlay or optional toggle. Never remove, replace, or restructure any existing MotionLoop, video, poster, section, or page. Existing elements remain the default and fallback.
2. **Touch devices NEVER get WebGL** — they keep the video/poster experience. This is a performance feature, not a downgrade.
3. **Max 1 mounted Canvas at a time** on any page (IO-gated via Scene3D).
4. **Every 3D scene has a non-WebGL fallback** — the children of Scene3D render when conditions aren't met or when WebGL errors.
5. **Every 3D file is 'use client'** with guarded browser access (typeof window checks).
6. **`npm run build` after every 3D task** — zero errors required.
7. **All 3D scenes pass through `components/three/Scene3D.tsx`** — the single gate that checks `(pointer: fine)`, `prefers-reduced-motion`, `Save-Data`, and viewport intersection (≥30%) before mounting a lazy R3F Canvas.

## 3D STYLE CONTRACT (all future 3D work — enforceable)

### ALLOWED motifs
- Makhana pearls — ivory-cream (`#F3EAD8` range), organic, PBR-lit, slight vertex noise
- Gold dust — warm additive points (`#E8C97A`→`#C9A24B` ramp), soft sprite texture, 30% opacity
- Deer crest — rendered ONLY via sampled-logo particles (ParticleDeer)
- Product pouch — extruded rounded-rect, textured with pack image, goldFoil sheen
- Glass jar of raw makhana — transmission glass + instanced makhanaIvory spheres
- Light, fog, shadow — procedural studio rig only

### ALWAYS banned
- drei `<Sparkles>` / `<Stars>` — never import, never use
- Naked geometric primitives as decoration — spheres, cubes, diamonds, torus, torusKnot, cones shown as standalone visual elements
- Any grey, black, or untextured material visible on screen — every surface must carry a golden-studio preset or a branded color
- Dark abstract blobs or unidentified dark shapes in any section
- Any 3D object inside the central text band of any section — the headline + subline + CTA area must remain a clean exclusion zone, verified at 1440px and 1024px
- Any 3D object rendered center-screen above copy or the product (HeroPearls drift in outer thirds only)

### Every scene must
- Use `<GoldenStudio>` — no ad-hoc lights, environments, or contact shadows anywhere else
- Keep its non-WebGL fallback — Scene3D children render when gates fail
- Have all materials from golden-studio presets (MakhanaIvoryMaterial, GoldFoilMaterial, ClearGlassMaterial, AgedBrassMaterial, GoldDustMaterial) or config objects (MAKHANA_IVORY, GOLD_FOIL, AGED_BRASS)
- Set Canvas `pointer-events: none` unless the scene is explicitly interactive (ProductInspect only)
- Pass through Scene3D unless the scene requires direct user interaction (ProductInspect only)

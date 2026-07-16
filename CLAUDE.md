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

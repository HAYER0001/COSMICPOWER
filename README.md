# Golden Deer — Premium Roasted Makhana

Production-grade marketing + dual-funnel commerce website for **Golden Deer**, the premium roasted makhana brand by **Cosmic Power Pvt. Ltd.**

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (`strict: true`) |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion 12 + GSAP 3 + ScrollTrigger + Lenis |
| Icons | Lucide React |
| Email | Resend (free tier) |
| Domain | golden-deer.vercel.app → goldendeer.in |
| Fonts | Cormorant Garamond (display), Inter (body) |

## Quick Start

```bash
npm install
cp .env.example .env.local   # edit variables
npm run dev                   # http://localhost:3000
```

## Useful Commands

```bash
npm run dev          # Development server with Turbopack
npm run build        # Production build (run BEFORE every commit)
npm run lint         # ESLint check
npm start            # Production server (after build)
bash scripts/optimize-videos.sh              # Re-encode oversized videos
bash scripts/optimize-videos.sh --check-only # Size report only
```

## Video Asset Pipeline

1. Export source videos as H.264 MP4 (1920×1080 max, 24–30fps)
2. Drop into the correct `public/videos/` subfolder
3. Run `bash scripts/optimize-videos.sh` — it re-encodes oversized files and extracts missing poster frames

### Budget limits

| Type | Max size |
|------|---------|
| Hero loop (`/videos/hero.mp4`) | 4 MB |
| Other loops | 2.5 MB |
| Posters (JPG) | 200 KB |

### Fallback chain

Missing loop → Missing poster → Branded forest/gold gradient with dev-only path label. Never breaks layout.

## Architecture

### Two-funnel principle

- **Funnel A (D2C Retail):** Product pages → Buy on Blinkit / Zepto / Amazon. No on-site cart.
- **Funnel B (Bulk & Wholesale):** `/bulk` page → segmented inquiry form → WhatsApp. Prefilled wa.me links throughout.

### Data layer (no CMS)

All content lives in `content/` as typed TS files:

| File | Content |
|------|---------|
| `site.ts` | Brand info, legal IDs, contact, socials, commerce URLs |
| `products.ts` | 6 SKUs with nutrition, benefits, ingredients, commerce links |
| `recipes.ts` | 6 recipes with ingredients, steps, YouTube IDs |
| `journal/` | 7 MDX articles with frontmatter |
| `faq.ts` | 14 Q&As (consumer + bulk-buyer) |

### How to add a product

1. Add an entry to `content/products.ts` following the `Product` interface
2. Add video loop to `public/videos/products/{slug}.mp4` + poster
3. Run `bash scripts/optimize-videos.sh`

### How to add a recipe

1. Add an entry to `content/recipes.ts` following the `Recipe` interface
2. Add video loop to `public/videos/recipes/{slug}.mp4` + poster
3. Update `app/recipes/page.tsx` → `generateStaticParams` exports it automatically

### How to add a journal article

1. Create a new `.mdx` file in `content/journal/` with frontmatter
2. Add cover image to `public/images/journal/{slug}.jpg`
3. The `generateStaticParams` in `app/journal/[slug]/page.tsx` picks it up automatically

## Routes

| Route | Type | Description |
|-------|------|-------------|
| `/` | Static | Home: hero → stats → products → story → gifting → recipes → journal → CTA |
| `/products` | Static | Product listing with filter chips |
| `/products/[slug]` | SSG | Product detail (6 SKUs) |
| `/recipes` | Static | Recipe grid |
| `/recipes/[slug]` | SSG | Recipe detail with YouTube embed (6 recipes) |
| `/journal` | Static | Editorial article grid |
| `/journal/[slug]` | SSG | Full article (7 articles) |
| `/our-story` | Static | Brand story with 4 cinemagraph chapters |
| `/bulk` | Static | Bulk/wholesale conversion page + inquiry form |
| `/faq` | Static | 14 Q&A accordion (consumer + bulk) |
| `/contact` | Static | Contact cards |
| `/privacy` | Static | Privacy policy |
| `/terms` | Static | Terms of service |
| `/shipping` | Static | Shipping & returns policy |
| `/api/inquiry` | Dynamic | Bulk inquiry form POST endpoint |

## SEO

- JSON-LD schemas: Product, ItemList, Recipe, Article, FAQPage, AboutPage, BreadcrumbList, Organization, WebSite
- OG/Twitter images from `public/images/og/`
- `app/sitemap.ts` with all static + dynamic URLs
- `app/robots.ts` allowing all crawlers
- `public/llms.txt` for LLM crawling

## Deployment

1. Push to GitHub
2. Import in Vercel
3. Set environment variables in Vercel dashboard
4. Point `goldendeer.in` CNAME to `cname.vercel.com`
5. Run `bash scripts/optimize-videos.sh` after uploading video assets
6. Verify `npm run build` passes before every deploy
# COSMICPOWER

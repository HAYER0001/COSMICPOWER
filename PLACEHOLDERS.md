# Placeholders — Replace Before Launch

## Quick-Commerce URLs (per SKU)

| SKU | Blinkit | Zepto | Amazon |
|-----|---------|-------|--------|
| Classic Roast | `products[0].commerce.blinkit` | `products[0].commerce.zepto` | `products[0].commerce.amazon` |
| Himalayan Pink Salt & Pepper | `products[1].commerce.blinkit` | `products[1].commerce.zepto` | `products[1].commerce.amazon` |
| Tangy Tomato | `products[2].commerce.blinkit` | `products[2].commerce.zepto` | `products[2].commerce.amazon` |
| Creamy Cheese | `products[3].commerce.blinkit` | `products[3].commerce.zepto` | `products[3].commerce.amazon` |
| Spicy Masala | `products[4].commerce.blinkit` | `products[4].commerce.zepto` | `products[4].commerce.amazon` |
| Raw Makhana | `products[5].commerce.blinkit` | `products[5].commerce.zepto` | `products[5].commerce.amazon` |

**File:** `content/products.ts` — edit the `commerce` block for each SKU. Replace `ADD_URL` with the real product URL from each platform.

## Contact & Social

| Field | Value in `content/site.ts` | Replace with |
|-------|---------------------------|--------------|
| WhatsApp number | `contact.whatsappNumber: "ADD_WHATSAPP_NUMBER"` | Real 10-digit number with country code (e.g. `919876543210`) |
| Contact email | `contact.email: "ADD_CONTACT_EMAIL"` | Real inbox (e.g. `hello@goldendeer.in`) |
| Instagram URL | `socials.instagram: "ADD_URL"` | e.g. `https://instagram.com/goldendeer` |
| YouTube URL | `socials.youtube: "ADD_URL"` | e.g. `https://youtube.com/@goldendeer` |
| LinkedIn URL | `socials.linkedin: "ADD_URL"` | e.g. `https://linkedin.com/company/goldendeer` |
| Registered address | `legal.address: "ADD_REGISTERED_ADDRESS"` | Full registered office address |
| FSSAI License | `legal.fssaiLicense: "ADD_FSSAI_NUMBER"` | 14-digit FSSAI license number |

**File:** `content/site.ts`

## YouTube Video IDs

| Recipe | Current value in `content/recipes.ts` |
|--------|--------------------------------------|
| Makhana Bhel | `youtubeId: "REPLACE_WITH_REAL_VIDEO_ID"` |
| Makhana Kheer | `youtubeId: "REPLACE_WITH_REAL_VIDEO_ID"` |
| Peri Peri Makhana | `youtubeId: "REPLACE_WITH_REAL_VIDEO_ID"` |
| Makhana Chaat | `youtubeId: "REPLACE_WITH_REAL_VIDEO_ID"` |
| Golden Trail Mix | `youtubeId: "REPLACE_WITH_REAL_VIDEO_ID"` |
| Makhana Curry | `youtubeId: "REPLACE_WITH_REAL_VIDEO_ID"` |

Extract the 11-char ID from the YouTube watch URL (`?v=XXXXXXXXXXX`) and replace the placeholder.

**File:** `content/recipes.ts`

## MRP Prices

All prices in `content/products.ts` use ₹99–₹119 as placeholders. Update to actual retail prices before launch.

## Environment Variables

Create `.env.local` from `.env.example`:

| Variable | Description | Example |
|----------|-------------|---------|
| `RESEND_API_KEY` | Resend API key for transactional emails | `re_xxxxxxxxxxxx` |
| `INQUIRY_TO_EMAIL` | Where bulk inquiry notifications go | `partners@goldendeer.in` |
| `NEXT_PUBLIC_SITE_URL` | Production URL (affects OG images, canonicals) | `https://goldendeer.in` |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 measurement ID | `G-XXXXXXXXXX` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number used sitewide for wa.me links | `919876543210` |
| `NEXT_PUBLIC_API_URL` | (optional) Override API base | — |

**Important:** After verifying the Resend domain, change the `from` address in `app/api/inquiry/route.ts` from `onboarding@resend.dev` to a verified `@goldendeer.in` address.

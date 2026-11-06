# Golden Deer — Commerce Go-Live Guide

Everything below must be done before `/checkout` is safe to expose. Work top to bottom.

---

## 1. Database (required — nothing works without it)

SQLite cannot be used: Vercel's filesystem is ephemeral, so orders would silently vanish.

1. Create a free Postgres at [neon.tech](https://neon.tech) (or Supabase / Vercel Postgres).
2. Copy the connection string into `.env`:
   ```
   DATABASE_URL="postgresql://user:pass@host/db?sslmode=require"
   ```
3. Create the tables:
   ```bash
   npm run db:push
   ```

---

## 2. Admin login — ALREADY DONE for localhost

`.env` already has a generated `ADMIN_PASSWORD_HASH` and `NEXTAUTH_SECRET`. Sign in at `http://localhost:3000/admin/login` with the credentials handed over in chat.

To change the password:

```bash
npm run admin:hash -- 'a-new-long-password'
```

Paste the printed line over `ADMIN_PASSWORD_HASH` in `.env`.

**Before deploying**, regenerate `NEXTAUTH_SECRET` for production and set `NEXTAUTH_URL="https://www.cosmicpower.ltd"`.

---

## 3. Razorpay (required)

**Dashboard → Settings → API Keys.** Start in **Test mode**.

```
RAZORPAY_KEY_ID="rzp_test_..."
RAZORPAY_KEY_SECRET="..."
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_test_..."   # same key id, browser-visible
```

**Dashboard → Settings → Webhooks → Add New Webhook:**

| Field | Value |
|---|---|
| URL | `https://www.cosmicpower.ltd/api/webhooks/razorpay` |
| Active events | `order.paid`, `payment.failed` |
| Secret | anything long — paste the same value into `RAZORPAY_WEBHOOK_SECRET` |

```
RAZORPAY_WEBHOOK_SECRET="..."
```

> The webhook is the **source of truth** for payment. Without it, orders stay `PENDING` even after a successful payment.

Test with card `4111 1111 1111 1111`, any future expiry, any CVV. Then swap the four values for live keys.

---

## 4. Delhivery (optional — mock-safe)

Leave `DELHIVERY_API_KEY` and `DELHIVERY_PICKUP_NAME` **blank** and shipping runs in mock mode: AWBs come back prefixed `MOCK-` so a test shipment can never be mistaken for a real one. The admin panel shows the same flag.

To go live, add both. `DELHIVERY_PICKUP_NAME` must match the registered pickup location in the Delhivery panel *exactly*.

```
DELHIVERY_API_KEY="..."
DELHIVERY_PICKUP_NAME="Golden Deer Masaurhi"
```

---

## 5. Email (recommended)

Without this, customers get no receipt.

```
RESEND_API_KEY="re_..."
ORDER_EMAIL_FROM="Golden Deer <orders@cosmicpower.ltd>"
```

The sending domain must be verified in Resend first.

---

## 6. Deploy

Add every variable above to **Vercel → Project → Settings → Environment Variables**, then push. `postinstall` runs `prisma generate` automatically.

---

## Order lifecycle

```
PENDING ──payment──▶ PAID ──Generate label──▶ SHIPPED ──Mark delivered──▶ DELIVERED
   │                  │                          │
   │                  └────── Start return ──────┴──────▶ RETURNED ──▶ Refund
   └── payment.failed ──▶ FAILED
```

The admin panel at `/admin` gives you: revenue collected, orders today, awaiting shipment, in transit, open returns; filter tabs by status; search across name, email, phone, order id and AWB; and per-order actions. Every money-moving action is written to `AdminAuditLog` with the admin's email.

---

## Two decisions you should confirm

**Shipping.** ₹49 flat, **free at ₹999+** (`lib/pricing.ts`). Reaching ₹999 needs roughly 3–4 packs, so it works as a basket-builder.

**GST rate.** Prices are GST-**inclusive** — nothing is added at checkout. The rate only back-calculates the tax component stored against each order for your GSTIN filing. Default is **5%** (`GST_RATE_PERCENT` in `.env`). **Confirm this with your CA** — makhana has moved between slabs, and a wrong rate means wrong returns, not a wrong charge.

---

## Status

### Done and verified
- [x] Neon Postgres live, schema pushed
- [x] Admin login working (`/admin/login`), wrong password rejected
- [x] `/admin` redirects when signed out — no loop
- [x] **Test payment captured** — `pay_Tf6Bo8TcvWl6DU`, order flipped to `PAID`
- [x] Signature verification confirmed against the live Razorpay API
- [x] Resend sending from a verified `cosmicpower.ltd`
- [x] Customer tracking at `/track`, linked from both emails
- [x] Order detail pages with audit trail
- [x] Server-side pricing — 9/9 tests, tamper case included
- [x] Tracking lookup — 5/5 tests, enumeration blocked
- [x] `npm run build` and `eslint` clean
- [x] No credentials in source; `.env` git-ignored

### Blocked on Delhivery
- [ ] `DELHIVERY_API_KEY` + `DELHIVERY_PICKUP_NAME`

Until both are set, shipping runs in MOCK mode. `/api/delhivery/manifest`
returns **503** if Razorpay is live while Delhivery is mocked, so a paying
customer can never be emailed a fake tracking number.

### Deploy day (once Delhivery lands)
1. Vercel env vars — everything in `.env.example`, plus:
   - `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` / `NEXT_PUBLIC_RAZORPAY_KEY_ID` → the **live** pair (kept as a comment in `.env`; never activate them locally)
   - `NEXTAUTH_SECRET` → freshly generated for production
   - `NEXTAUTH_URL` and `NEXT_PUBLIC_SITE_URL` → `https://www.cosmicpower.ltd`
2. Razorpay → Settings → Webhooks → `https://www.cosmicpower.ltd/api/webhooks/razorpay`, events `order.paid` + `payment.failed`, secret matching `RAZORPAY_WEBHOOK_SECRET`
3. Confirm the GST rate with your CA
4. One live ₹1 order end to end, then refund it from `/admin`

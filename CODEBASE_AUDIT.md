# Cosmic Power / Golden Deer — codebase and shipping audit

Reviewed: 29 October 2026 (Asia/Kolkata).

## Current position

The public site is a marketing/catalogue site with WhatsApp ordering. The local checkout, admin dashboard, payment handling, and order tracking are a separate, substantially implemented commerce layer that is not deployed at the public URLs checked. Amazon Shipping is not implemented. Existing courier code is specific to Delhivery and currently configured locally to produce mock shipments.

Do not switch live payment keys on and assume fulfilment is ready. First resolve payment lifecycle and fulfilment reliability issues, implement Amazon Shipping, and complete a controlled end-to-end acceptance run.

## Evidence and limits

- Inventoried `app`, `components`, `content`, `lib`, `scripts`, `prisma`, `automation`, configuration, documentation, and public assets. Traced product → cart → checkout → payment → admin → shipment → tracking → return/refund, plus inquiry and publishing paths.
- Made fresh, read-only HTTPS requests to the public site. No payments, refunds, shipments, emails, database changes, or deployments were initiated.
- Inspected environment variable presence and payment mode without recording secret values. Local configuration does not establish Vercel's production configuration.
- Database connectivity, actual table state, provider account approval, production secrets, webhook registration, email deliverability, and carrier coverage were not verified through their accounts.
- Existing `COMMERCE_SETUP.md` records earlier successful tests. Those are historical claims, not proof of the current production deployment.
- This is a source and deployment-readiness audit, not a full browser accessibility, performance, penetration, or exhaustive runtime test.

## Live versus local

| Area | Public evidence | Local implementation/configuration | Assessment |
|---|---|---|---|
| Homepage | `/` HTTP 200, branded homepage | Next.js App Router, rich motion/3D, brand content | Publicly available |
| Product catalogue | `/products` readable; `/products/peri-peri` fresh HTTP 200 | Six products; five retail products; raw product marked bulk-only | Public catalogue available |
| Marketplace purchasing | Public catalogue displays marketplace “Soon” labels | All Amazon/Blinkit/Zepto product links are `ADD_URL`; other marketplace fields also need real destinations | Not connected |
| Direct cart | Fresh public product HTML has no “Add to Cart”; homepage has no “Open cart” | Zustand persisted cart, drawer, retail variant selector, server price calculation | Present locally; no public evidence of deployment |
| Checkout | `/checkout` HTTP 404 | Address form, quote, Razorpay popup, order creation | Not deployed at checked public URL |
| Payments | No live transaction attempted | Local Razorpay browser/server key IDs are test-mode; secret is set; webhook secret empty | Local test configuration; not a verified live payment flow |
| Orders/database | No account-level inspection | Prisma/PostgreSQL schema and connection URL present | Implemented; current connectivity/data unverified |
| Admin | `/admin/login` HTTP 404 | Credential login, guarded dashboard, order detail/actions/audit table | Local implementation; not deployed at checked public URL |
| Tracking | `/track` HTTP 404 | Reference + email lookup; local order timeline; Delhivery tracking links | Local implementation; no courier event sync |
| Forward shipping | No shipment attempted | Delhivery credentials/pickup name empty locally; mock AWBs | No real local courier connection |
| Amazon Shipping | No code integration found | No Amazon Shipping client, routes, account configuration, or shipment records | Not implemented |
| Returns/refunds | No external action attempted | Admin reverse pickup and full Razorpay refund routes | Implemented with lifecycle/retry risks below |
| Transactional email | No email sent | Resend key and sender set locally | Delivery/domain status unverified |
| Bulk inquiries | Public funnel exists | Resend route; `INQUIRY_TO_EMAIL` absent locally and from example env | Local email delivery skipped while success is returned |
| Recipes | Content routes exist | Six recipe entries; all YouTube IDs placeholders; missing recipe media | Content exists, video experience incomplete |
| Journal | Public linked article can render an “Article not found” page with HTTP 200 | Seven TS entries with hardcoded bodies; seven separate MDX articles never loaded | Split content sources and broken article links |
| SEO/education | Public brand/guide navigation visible | Sitemap, robots, structured data, Hindi guides, glossary, comparisons, LLM text endpoints | Implemented; asset/indexing/content issues remain |
| Blog-to-ad automation | No running instance inspected | n8n workflow JSON with credential/folder placeholders | Template only; execution not established |

Fresh public probes: `/`, `/products/peri-peri` → 200; `/checkout`, `/track`, `/admin/login` → 404. `/journal/bulk-makhana-supplier` → 200 but title says “Article not found”; HTTP success alone does not mean a working article.

## Launch blockers and correctness findings

### P1 — Payment success can be lost after an earlier failed attempt

`app/api/webhooks/razorpay/route.ts:63` changes the whole order from PENDING to FAILED on `payment.failed`. Both `order.paid` and `/api/razorpay/verify` only update PENDING orders. If a customer fails once and later successfully pays the same Razorpay order, the local order can remain FAILED. The verify endpoint can still return success without fixing that state.

Track payment attempts separately from the order lifecycle. Reconcile verified captured/paid events against provider order/payment ID, amount, currency and capture state, and permit valid recovery without downgrading shipped/refunded orders. Use atomic transitions and event deduplication. Add regression coverage for failed → paid, late events, concurrent verify/webhook calls, and duplicate events.

### P1 — Checkout callback signature is treated as proof of captured money

`app/api/razorpay/verify/route.ts:53` marks PAID after checking the callback HMAC, without fetching payment capture status or reconciling provider amount/currency. A valid callback signature authenticates the callback but the implementation does not establish capture. The empty local webhook secret also makes the independent webhook endpoint reject events.

Make fulfilment depend on authoritative capture confirmation; retain a pending-confirmation screen when reconciliation is incomplete. Record payment timestamps separately from `updatedAt`.

### P1 — Shipment, return, refund and payment transitions are not atomic across retries

Forward shipping checks for an existing AWB, calls the external courier, then writes the AWB. Two requests can both pass the initial check; a successful external call followed by a database failure leaves an unrecorded shipment. Reverse pickup and refunds follow similar external-call-before-persistence sequences. Payment verification/webhooks use read-then-write checks, which can also duplicate confirmation emails.

Introduce durable operation records, unique operation keys, atomic reservations, provider-supported idempotency where available, and reconciliation for ambiguous timeouts. Do not blindly retry a label purchase or refund after a timeout. A database transaction alone cannot roll back an external provider action.

Relevant files: `app/api/delhivery/manifest/route.ts:46`, `app/api/delhivery/returns/route.ts:36`, `app/api/razorpay/refund/route.ts:38`, both payment handlers.

### P1 — Checkout accepts destinations without verified delivery coverage

`lib/delhivery.ts:41` explicitly fails open on provider errors; mock mode accepts almost every PIN. `app/actions/checkout.ts` uses that result before accepting payment. The live-payment guard is only at forward manifestation, after a customer could already have paid.

For Amazon, require a valid eligible shipping offer for the actual sender, recipient and parcel before payment. Distinguish an unserviceable destination from a temporary carrier outage. Apply a production readiness gate before order/payment creation.

### P1 — Inquiry form can silently lose leads

`app/api/inquiry/route.ts:97` sends only if both Resend and `INQUIRY_TO_EMAIL` exist; otherwise it still returns success. The recipient variable is absent from local env and `.env.example`. There is no persistent inquiry record. Email SDK responses are not checked for returned error objects, including in `lib/email.ts`.

Persist inquiries durably, return a truthful failure if the lead cannot be accepted, configure the recipient, and monitor/retry delivery. Escape user-supplied fields before embedding them in email HTML. Current rate limiting is in process memory and is not shared across serverless instances.

### P1 — Returns and dispatch statuses describe events that have not happened

Creating a reverse pickup immediately sets the order to RETURNED (`app/api/delhivery/returns/route.ts:49`). Creating a forward AWB immediately sets SHIPPED and emails that the parcel was handed to the courier. Neither is evidence of physical pickup or receipt. The reverse route also lacks the forward route's live-payment/mock-shipping guard.

Separate label-created, handed-over, in-transit, delivered, return-requested, return-in-transit, received and refunded events. Keep payment, shipment and return states separate. Do not carry the existing Delhivery return assumptions into Amazon without confirming account-supported reverse logistics.

### P1 — Shipping policy contradicts the intended direct checkout

`app/shipping/page.tsx:55` says retail orders are not processed or shipped directly. README describes a site with no onsite cart. Metadata mentions buying through marketplaces whose links are placeholders. Before launch, align direct order shipping charges, destination coverage, dispatch expectations, tracking, cancellation, and support copy with actual operations. The code currently charges ₹49 below ₹999 and free shipping at ₹999 or more; those are merchant prices, not measured Amazon carrier costs.

### P2 — Content and SEO inconsistencies

- All seven journal covers and `/images/og/og-home.jpg` are missing locally. A literal-path scan found 20 missing media references: seven journal images, one home OG image, six recipe videos and six recipe posters. This is a lower bound: paths assembled with templates or absolute base URLs were outside that scan.
- All six recipe YouTube IDs are `REPLACE_WITH_REAL_VIDEO_ID`.
- `content/journal/*.mdx` is not consumed by the routes. The guide links to MDX slugs absent from the actual journal array. Unknown journal/product slugs return a normal component instead of invoking `notFound()`, producing misleading successful responses.
- Product JSON-LD advertises `InStock` without an inventory source. There is no stock reservation or inventory deduction in checkout.
- Checkout success is a public static page, with no order reference or verified order context. The client discards the returned order ID before navigation.
- Cart line display prices still come from local storage, while summary totals are recalculated on the server. Render the returned priced lines to avoid conflicting prices.
- Bot-specific robots rules allow `/` without the private-path exclusions in the wildcard group. Add explicit noindex metadata for checkout, success, admin and tracking, and make robots rules consistent. Robots are not access control.
- Social URLs remain placeholders. Nutrition/certification and other marketing claims need substantiated business source material before publication changes.

### P2 — Operational gaps

- No committed Prisma migrations or automated test suite/CI configuration found. Existing commerce files are largely untracked. A push of the current tracked tree alone will omit those files.
- Local environment includes a GST setting absent from the example; inquiry recipient is absent from both. Complete the environment contract without exposing secrets.
- Public create-order, quote and tracking endpoints and admin credential login need appropriate shared rate limits and request bounds. Cart pricing caps each line at 20 but does not cap line count or aggregate duplicate variants.
- Admin audit writes deliberately swallow persistence failures. Refund success is recorded immediately after the provider request, with no separate pending/failed refund reconciliation. The revenue dashboard excludes all returns even before money is refunded.
- Labels are not downloaded/stored by the current “Generate label” action; it only creates an AWB. There is no carrier tracking webhook/polling worker, pickup workflow, failed-delivery management or reconciliation job.
- n8n JSON contains `REPLACE_ME` credentials and `PASTE_GOOGLE_DRIVE_FOLDER_ID`; runtime activation is unverified. Its daily watcher selects a rolling seven-day window without evident durable publication deduplication, and polling lacks a ceiling. Do not run paid generation unattended as-is.
- Next.js emits a deprecation warning for `middleware.ts`; plan a tested migration to `proxy.ts`, preserving NextAuth compatibility. Read installed Next.js guidance before implementation.

## Amazon Shipping implementation plan

Use Amazon Shipping India to fulfil website orders. This is separate from adding a “Buy on Amazon” marketplace link. Amazon explicitly supports shipping orders from a merchant's own website: [India integration overview](https://shipping.amazon.in/integrations).

### Account prerequisites

Confirm whether Cosmic Power is already an Amazon marketplace seller. Amazon's direct onboarding path for non-marketplace shippers requires a developer profile, Amazon Logistics role, shipping application, authorization credentials, test coverage and test-label sign-off. Existing marketplace sellers should follow the relevant account-manager onboarding path. See [Amazon's onboarding guide](https://developer-docs.shipping.amazon.com/apis/docs/off-amazon-guide).

Obtain through secure configuration: application credentials/refresh token, approved shipper account, pickup address and contact, billing/rate agreement, and confirmed pickup coverage for the Masaurhi warehouse. Supply measured packed weights and external carton dimensions for supported baskets. An 80 g product net weight is not its shipping weight. Confirm any reverse pickup and COD capabilities with the account; the current checkout supports prepaid only.

### Architecture changes

1. Add a server-only carrier abstraction and Amazon adapter. Keep historical Delhivery shipments explicitly identified rather than converting old tracking numbers to Amazon links.
2. Model `Shipment`, package details, selected offer, label/document references, tracking events and operation/reconciliation state. Store carrier ID, Amazon shipment ID and tracking ID separately; one `awbNumber` is insufficient. Add versioned migrations.
3. Implement authentication/token refresh, bounded timeouts, redacted provider errors and rate-limit-aware retries. Set the India shipping business explicitly (`AmazonShipping_IN`); verify the region endpoint against current Amazon documentation/account setup.
4. Call `getRates` with actual ship-from, ship-to and package data. Store the returned offer/request identifiers and delivery promise as required; handle expiry and re-quote. Choose an eligible service according to delivery target and merchant margin.
5. After confirmed payment, reserve the fulfilment operation atomically, purchase the selected shipment, persist IDs and downloadable label data, and reconcile uncertain outcomes before retrying.
6. Add admin label printing/retrieval and cancellation. Restrict labels and customer address documents to authorized access.
7. Synchronize tracking through a verified Amazon-supported notification or polling mechanism; make event processing idempotent and resilient to out-of-order updates. Drive customer timelines from carrier events.
8. Replace Delhivery-specific admin actions, customer links and email copy with stored-carrier-aware behavior. Send a dispatch notice at the agreed physical handover event.
9. Implement returns only after confirming Amazon's supported workflow for this account. Maintain a separate return state machine and payment refund reconciliation.
10. Update customer policies and launch configuration, then validate in preview before changing production traffic.

Operation and payload source: [Shipping API v2 reference](https://developer-docs.shipping.amazon.com/apis/docs/shipping-api-v2-reference). These are implementation steps, not claims that the integration already exists.

### Acceptance criteria

- Unsupported destinations and carrier outages cannot collect a payment under a false delivery promise.
- Totals remain server-authoritative; customer shipping fees and actual carrier cost are stored separately.
- Repeated clicks, concurrent requests and ambiguous timeouts do not buy duplicate labels or issue duplicate refunds.
- Successful payments survive failed earlier attempts and webhook delays; captured money and local records reconcile.
- Print-ready label retrieval, shipment cancellation, tracking and an approved returns process work for the actual account.
- Emails, order reference, tracking page and admin state agree; receipt delivery failures can be retried.
- One controlled production acceptance order completes payment → parcel handover → carrier tracking → delivery, followed by a separately verified cancellation/refund scenario as applicable.

## Verification results

| Check | Result |
|---|---|
| `npx tsc --noEmit` | Passed |
| `npm run build` | Passed with network access; 82 static generation tasks completed; commerce routes included |
| First sandboxed build | Failed to fetch Google Fonts due network restrictions; rerun succeeded |
| Next.js warning | `middleware` convention deprecated; migrate to `proxy` |
| `npm run lint` | Failed: `@typescript-eslint/no-require-imports` at line 1 of `update_prices.js` and `update_plain_price.js` |
| Secret handling | No secret values copied into this report; `.env` ignored and not tracked |
| Live end-to-end checkout | Not attempted; public checkout is 404 |
| Real Amazon shipment | Not attempted; integration/account access not established |

Recommended order of work: payment and operation reliability → Amazon adapter and package data → customer/admin shipment experience → content/policy alignment → preview acceptance → production activation. Amazon onboarding can proceed in parallel with engineering.

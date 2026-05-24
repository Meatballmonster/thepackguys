# The Pack Guys — Launch Day Runbook

**Single source of truth for going live with sales.** Updated 2026-05-24.

This document assumes the static marketing site at `thepackguys.com` is **already live and working** (it is — V6 Recess-pastel direction, see commit history). The remaining work is e-commerce activation: Shopify store + payment processors + first sales.

---

## Where we are right now

| Layer | State | Notes |
|---|---|---|
| **Marketing site** | ✅ live at `thepackguys.com` | 32 indexable pages, HTTPS enforced, SEO complete |
| **Analytics** | ✅ GA4 G-0G4HVSF6QC, Consent Mode v2 | 18 events + 5 web vitals + 5 custom dimensions firing |
| **Legal pages** | ✅ live | privacy / terms / returns / shipping / contact / payments |
| **Compliance pages** | ✅ live | CR cert summary + spec sheet (noindex) |
| **Schema** | ✅ 30+ JSON-LD blocks | Org, LocalBusiness, Product×6, FAQPage, BlogPosting×5, MerchantReturnPolicy, OfferShippingDetails, Service, Breadcrumb×8 |
| **Search engines** | ✅ Google verified + Bing/Yandex (IndexNow) | Sitemap submitted, indexing requested |
| **Google Merchant Center** | ⏳ feed.xml ready, needs Lambert click | https://thepackguys.com/feed.xml |
| **Shopify store** | 🔒 **BLOCKED on LLC + EIN + Mercury + Stripe chain** | Per OPEN.md — defer until CA SOS approval ~5/30 |
| **Payment processors** | 🔒 **BLOCKED on LLC + EIN** | Stripe needs EIN; Coinbase Commerce needs entity |
| **Order fulfillment** | ⏳ Forms collect leads, manual response | Lambert emails Stripe/Coinbase link until Shopify lives |

**The site is sellable RIGHT NOW** via manual order intake (forms → email → invoice → ship). Shopify is the SCALE layer that comes after the LLC clears.

---

## Critical path — the only sequence that matters

```
TODAY (5/24)         →  Marketing site + GA4 + Merchant feed prep
↓
5/30 (CA SOS)        →  LLC officially exists
↓
5/30 same day        →  Apply EIN at irs.gov/EIN  (10 min, instant)
↓
5/31 morning         →  Open Mercury business checking (uses Banking Resolution)
↓
6/1                  →  Sign up Stripe (uses EIN + Mercury)
↓
6/2                  →  Sign up Shopify trial → import products.csv → connect Stripe
↓
6/3-7                →  Theme customization, test order, soft launch
```

**Everything before 5/30 is preparation. Everything after 5/30 is execution.**

---

## What's pre-staged in this repo

```
launch/
├── LAUNCH-DAY.md                    ← you are here
├── shopify/
│   ├── products.csv                 ← 40 SKU variants ready to import
│   ├── architecture.md              ← Dawn theme + customization plan
│   └── cutoff-timer.liquid          ← order-by-noon-PT countdown snippet
├── docs/
│   ├── launch-checklist-original.md ← original detailed checklist
│   ├── fulfillment-automation.md    ← pick/pack workflow
│   ├── financial-audit.md           ← unit economics
│   ├── shipping-research.md         ← carrier comparison
│   ├── brand-identity.md            ← brand guidelines
│   └── copy-bank.md                 ← reusable copy snippets
```

Legal pack stays out of this public repo (sensitive). Source of truth remains `~/business/preroll-tubes/legal/` + Google Drive + NAS mirror.

---

## Launch day sequence (5/30 onward)

### Hour 1 — Federal + state activation

1. **Northwest emails Articles approval** → LLC is officially active
2. **IRS EIN application** at `irs.gov/EIN` — pre-filled SS-4 at `legal/federal/ss-4-ein-application.md`
   - Takes 10 min, EIN issues immediately via online tool
   - Print/save the CP575 confirmation letter
3. **Sign 5 day-1 docs**: Operating Agreement, Org Consent, Capital Contribution, Banking Resolution, IP Assignment
4. **CDTFA Seller's Permit** at cdtfa.ca.gov → online application, instant approval
5. **LA City BTRC** at finance.lacity.gov → online registration

### Hour 2 — Banking + payment processors

6. **Mercury** at mercury.com → business checking application
   - Uses: EIN, LLC Articles, Banking Resolution, Lambert ID
   - Funded with initial $1,000 cash capital
   - Account opens same day (sometimes next day)
7. **Stripe** at stripe.com → activate account
   - Industry: "B2B / Wholesale — Packaging"  
   - NOT "Cannabis-related" (tubes are general packaging, not cannabis)
   - EIN + Mercury account # required
   - Approval usually 1 business day
8. **Coinbase Commerce** at commerce.coinbase.com → merchant signup
   - Accept USDC, BTC, ETH
   - KYC required (EIN + Lambert ID)
   - ~24-48 hour approval

### Hour 3-4 — Shopify activation

9. **Shopify trial** at shopify.com → start free trial
   - Plan: **Basic ($25/mo)** for first month, upgrade to Shopify ($69/mo) when sales justify
   - Connect: lamberthahm@gmail.com
   - Industry: "Wholesale" → "Packaging"
10. **Import products** → Settings → Products → Import → upload `launch/shopify/products.csv`
    - 40 variants will create with proper SKU/price/inventory
    - Verify case sizes + per-unit pricing
11. **Connect Stripe** → Shopify Payments → use Stripe account from step 7
    - Apple Pay + Google Pay auto-enable
12. **Fork Dawn theme** → Online Store → Themes → Add theme → Dawn → Customize
    - Reference: `launch/shopify/architecture.md` for theme customization plan
13. **Set up shipping zones** → Settings → Shipping → Add zone
    - US domestic: Free over $500, otherwise $5-25 by ZIP
    - LA County: Free over $300 (incentivize local pickup)
    - International: disabled
14. **Set up tax** → Settings → Taxes
    - California 0% (resale certificate on file from each wholesale buyer)
    - Other states: collect by state
15. **Connect domain** → Settings → Domains
    - Option A: subdomain `shop.thepackguys.com` (keeps marketing site at root)
    - Option B: full migration `thepackguys.com` → Shopify (kills GH Pages)
    - **Recommended: Option A** for first 30 days, then evaluate

### Hour 5 — Testing + go-live

16. **Test order** → use a real card with $1 product, verify the entire flow
17. **Order confirmation email** → customize in Settings → Notifications
    - Use The Pack Guys brand voice (operator-to-operator)
18. **Set up Shopify Email** for transactional + 1 monthly newsletter
19. **Set up Returns & Refunds page** → copy from `thepackguys.com/returns.html`
20. **Connect GA4** → Online Store → Preferences → Google Analytics → paste G-0G4HVSF6QC
21. **Connect Google Merchant Center** → Sales channels → Google → link to existing GMC account
22. **Soft launch** — send first batch of orders to PT-network buyers (ATH, Afterhours, etc.)

---

## What goes in /launch/shopify/products.csv

40 variants across:

| Family | Variants |
|---|---|
| 116mm Black | 100, 1K, 5K, 25K, 50K (5 case sizes) |
| 116mm Clear | 100, 1K, 5K, 25K, 50K |
| 116mm White | 100, 1K, 5K, 25K, 50K |
| 116mm Smoke | 100, 1K, 5K, 25K, 50K |
| 116mm Silver | 100, 1K, 5K, 25K, 50K |
| DTC retail packs (Phase 1.5) | 25-pack, 100-pack, 500-pack |
| Trial case (legacy) | 100-unit @ $14.99 |
| Custom orders (Phase 2) | placeholder |

Total **40 variants** across **8 product handles**.

Inventory is tracked at the variant level. Initial counts will need to be set per the live `inventory.json` numbers from the static site (~142 / 287 / 198 / 91 / 64 cases per color).

---

## Theme customization (Dawn) — already designed

See `launch/shopify/architecture.md` for the full plan. High-level:

- **Sage palette** (#7A8C6E / #C5D4B5) replaces Dawn default
- **Fraunces serif** for display, **Inter** for UI (matches current static site)
- **5 custom snippets**: live tier-price calculator, cutoff timer, color swatches, real-time inventory chip, sticky tier-pricing table on mobile
- **Sections-everywhere** architecture (not code-injection)
- **App stack**: Klaviyo (email), Search & Discovery (Shopify native), Judge.me (reviews — defer), ReferralCandy (defer)

Estimated theme setup time: **4-6 hours** of focused work. All design tokens, copy, and component patterns are pre-defined.

---

## Marketing site → Shopify migration plan

**Decision point on launch day:** keep current static site or replace?

### Recommended: Hybrid
- `thepackguys.com/` → keeps current static marketing site (catalog, blog, about, etc.)
- `shop.thepackguys.com/` → Shopify store with checkout
- Buy CTAs on marketing site link to Shopify checkout
- Static site keeps doing SEO heavy lifting (blog posts rank organically)
- Shopify just does checkout + order management
- Best of both: full design control over marketing, full e-commerce on Shopify

### Alternative: Full migration
- Move all pages to Shopify
- Lose: golden-ratio control, fast static page loads, free hosting
- Gain: unified admin, faster product updates

The hybrid model is what most B2B operators do. Recommend defaulting there.

---

## Soft launch (days 9-14)

1. Email PT-network buyers (ATH, Afterhours, STUFF'D, etc.) with "we're live, sample case waiting"
2. Pin a Pack Notes post about the launch to LinkedIn
3. Run first 5-10 orders manually if Shopify checkout has hiccups
4. Watch GA4 Realtime for first organic visits
5. Track conversion rate vs. Pack Guys' direct PT customer pricing baseline

**Target metrics for soft launch week:**
- 5+ sample case orders ($75 revenue)
- 2+ wholesale account applications
- 1+ first wholesale order ≥ 1K case
- 0 broken-flow / broken-form bug reports

---

## Cost summary (first 90 days)

| Item | Cost |
|---|---|
| Shopify Basic | $25/mo × 3 = $75 |
| Shopify Email (under 10K sends) | free |
| Klaviyo (under 250 contacts) | free |
| Stripe processing | ~2.9% per order |
| Coinbase Commerce | ~1% per crypto order |
| Mercury banking | free |
| LA City BTRC | one-time ~$40-150 by gross |
| CDTFA Seller's Permit | free |
| Domain renewal (Porkbun) | already paid |
| GA4 + Search Console | free |
| **First container PO** | $52,000 (1.3M units @ $0.04) |

Capital required to launch: **~$52,500** (container + first-month ops). Per memory, friend supplier extends flexible payment terms — Lambert can place PO without upfront deposit and pay as sales support it.

---

## After soft launch — first 30-90 days

Per `docs/launch-checklist-original.md`:
- Day 30: review GA4 funnel, optimize lowest-converting page
- Day 30: first Pack Notes blog post post-launch about lessons learned
- Day 60: evaluate Shopify plan upgrade (Basic → Shopify if >$500/mo revenue)
- Day 60: launch Phase 2 (custom-printed tubes) if container inventory levels support
- Day 90: evaluate 3PL switch if order volume >1000/mo

---

## Emergency contacts + ops

- **Domain registrar:** Porkbun (Order #10445385, lamberthahm@gmail.com)
- **DNS provider:** Porkbun → GH Pages (currently); migrate to Shopify or Cloudflare if needed
- **Email forwarding:** sales/help/hello@thepackguys.co → lamberthahm@gmail.com (Porkbun)
- **LLC registered agent:** Northwest (Order #WGD8F47H, $129/yr renewal)
- **Bank:** Mercury (post-launch)
- **Payment processor primary:** Stripe (post-launch)
- **Payment processor crypto:** Coinbase Commerce (post-launch)
- **Customs broker:** Flexport (post-EIN per OPEN.md task)
- **Insurance:** Brown & Brown + Hiscox quotes pending

---

## What's NOT done yet (honest list)

- [ ] CA SOS approval (~5/30, external)
- [ ] EIN (post-CA SOS, 10 min)
- [ ] Mercury banking (post-EIN)
- [ ] Stripe activation (post-Mercury)
- [ ] Coinbase Commerce activation (post-EIN)
- [ ] Shopify store creation (post-Stripe)
- [ ] Theme customization (4-6 hours, post-Shopify)
- [ ] Real product photography at 915 Mateo (post-CA SOS)
- [ ] Google Business Profile (post-CA SOS)
- [ ] First container PO with China supplier
- [ ] First Flexport intake (customs broker)
- [ ] Real LA-area phone number
- [ ] Cannabis industry directory submissions (7-10 sites)

Most of this is sequential on CA SOS. From approval day to first paid order shipped: **~7-10 days** if Lambert moves fast.

---

**This document is the master reference. Update it as steps complete. Source of truth for Pack Guys go-live.**

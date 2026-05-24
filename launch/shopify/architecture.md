# Shopify Architecture — The Pack Guys (thepackguys.com)

> **Plan file** — this is the architecture document. Once approved, the body below should be saved to `/Users/ratmouse/business/preroll-tubes/shopify-architecture.md` (current plan mode prevents writing outside the plans dir). Author: senior Shopify Plus architect persona. Date: 2026-05-24.

---

## TL;DR

- **Theme:** Dawn (free, OS 2.0), forked into a Git-tracked "Pack Guys" child theme via Shopify CLI. Heavily restyled via `settings_schema.json`, custom sections, and CSS custom properties — never via "Edit code → page-builder spaghetti."
- **App stack (5, ~$60/mo at launch):** Shopify B2B native (Plan dependent — start Bold Quantity Breaks $19.99 on Basic), Shopify Forms (free), Shopify Email + Flow (free), Judge.me Lite ($15, month 2), QuickBooks Online Connector (free). Klaviyo, Shogun, Yotpo, PageFly: all rejected at launch.
- **Custom Liquid (in-theme, no app):** tier-price calculator, PT cutoff timer, color swatch radios, real-time inventory chip, sticky tier-pricing table, sample-kit form.
- **Backup payment:** Stripe direct + PayPal Express live day 1; Authorize.Net + NMI in a "break glass" runbook for cannabis-adjacent freeze.
- **Critical risk:** Shopify Payments freeze on cannabis-adjacent keyword scan. Mitigation = launch language scrubbed of "cannabis/marijuana/pre-roll" in payment-visible fields + Stripe redundancy pre-configured.

---

## 1. Theme Choice — Dawn (forked, Git-managed)

### Candidates evaluated

| Theme | Cost | OS 2.0 | B2B blocks | Speed (LCP) | Upgrade path | Verdict |
|---|---|---|---|---|---|---|
| **Dawn** (Shopify, free) | $0 | Yes | Native B2B catalog blocks (Shopify-maintained) | Best in class (~1.2s LCP unmodified) | Shopify ships updates; easy `git merge upstream/main` | **PICK** |
| Sense (Shopify, free) | $0 | Yes | Limited | Comparable | Same as Dawn | Skip — Dawn is more actively maintained |
| Studio (Shopify, free) | $0 | Yes | Editorial focus | Comparable | Same | Wrong vibe — magazine layout for a B2B/DTC hybrid is friction |
| Impulse (Archetype, $400) | $400 one-time | Yes | None | ~1.6s LCP | Vendor-dependent; updates lag Shopify by 2-6 months | Skip — pretty but slow + locked into Archetype's release cycle |
| Prestige (Maestrooo, $400) | $400 | Yes | Limited | ~1.5s LCP | Vendor-dependent | Skip — same reason; gorgeous demos hide heavy JS |
| Custom from scratch via CLI | $5-15K dev | Yes | Build yourself | Unknown | You own it forever | Skip at launch — Lambert is single founder, no front-end resource. Re-evaluate at $1M ARR. |

### Why Dawn wins for The Pack Guys

1. **B2B blocks are first-party.** When Shopify ships native B2B (tier pricing, company accounts, customer-specific catalogs) it ships in Dawn first. Paid themes lag months behind. The Pack Guys' core thesis is B2B-first; locking onto Shopify's B2B roadmap is strategic.
2. **Cheapest path to "doesn't look like Dawn."** Restyling Dawn via theme settings + 8-12 custom sections + CSS variables takes ~40 hours of focused dev. The same restyle on Impulse takes ~60 hours because the vendor's CSS architecture fights you.
3. **Performance ceiling is highest.** Dawn ships ~70KB of JS unmodified. Impulse ships ~280KB. Every paid theme bundles features (mega-menu, quick-add modals, lookbook galleries) you'll never use but can't strip out cleanly.
4. **Upgrade path = `git merge`.** Fork Dawn into a Git repo, never edit upstream files (only `sections/pg-*.liquid`, `snippets/pg-*.liquid`, `assets/pg-*.css`). When Dawn 16.0 ships, `git merge upstream/main` and your work survives because it's in a separate namespace.
5. **Accessible by default.** Dawn ships WCAG 2.1 AA. Paid themes pass demo but fail real-world contrast/keyboard-nav audits.

### "Doesn't look like Dawn" — restyling tactics

The Dawn "template feel" comes from 5 specific things, all kill-able in theme settings + 1 hour of CSS:

1. **Default font (Assistant / Inter).** Replace with Space Grotesk (headings) + Inter (body) via Shopify's Google Fonts picker. Industrial vibe, free.
2. **Default button border-radius (6px).** Set to 0 (industrial / wholesale feel) or 999px (DTC / consumer feel). The Pack Guys uses **2px** — split the difference, hat-tip to industrial supplier aesthetic.
3. **Default page-width (1200px).** Push to 1440px on desktop. Modern feel.
4. **Default image grid spacing (24px).** Tighten to 8px on PDP, 16px on collection. Less white space = "stocked warehouse" feel vs Dawn's "yoga studio" feel.
5. **Default product card layout.** Replace stock `card-product.liquid` with `pg-card-product.liquid` showing: product image (square), name, **per-unit price + per-case price both visible**, stock chip ("142 in stock LA"), CR-cert badge. This single change reads as "B2B wholesale" instead of "Dawn template."

---

## 2. Customization Strategy — Sections-Everywhere + Namespaced Files

Dawn is OS 2.0, so EVERY template (product, collection, page, blog, cart, account) accepts merchant-editable sections. Use this:

### Architectural rule (the only one that matters)

**Never edit upstream Dawn files. Never inject `<script>` via theme.liquid for one-off needs. All custom work goes into `pg-*` namespaced files.**

Concretely:

```
shopify-theme/
├── assets/
│   ├── pg-base.css                  # CSS custom properties + brand vars
│   ├── pg-tier-calc.js              # Live tier price calculator
│   ├── pg-cutoff-timer.js           # 2pm PT countdown
│   ├── pg-swatch.js                 # Color swatch accessible radio
│   └── pg-inventory-chip.js         # Real-time stock chip (Storefront API)
├── sections/
│   ├── pg-hero-cutoff.liquid        # Hero with embedded cutoff timer
│   ├── pg-tier-table.liquid         # Sticky tier-price table for PDP
│   ├── pg-trust-bar.liquid          # CR-cert / LA-stock / lab-tested badges
│   ├── pg-sample-kit-form.liquid    # /samples lead-magnet form
│   ├── pg-quote-form.liquid         # /quote custom-print form (Phase 2)
│   ├── pg-product-card-grid.liquid  # Collection page custom grid
│   ├── pg-cross-sell-future.liquid  # "Need boxes? Notify me" capture
│   ├── pg-resale-cert-upload.liquid # B2B account profile
│   └── pg-shipping-cutoff-banner.liquid
├── snippets/
│   ├── pg-card-product.liquid       # Replaces card-product on collections
│   ├── pg-tier-price.liquid         # "$0.075/unit ($75/case)" formatter
│   ├── pg-prop65.liquid             # CA Prop 65 warning block
│   ├── pg-cr-badge.liquid           # CR-certified badge w/ link to /cert
│   └── pg-stock-chip.liquid         # "142 in stock LA" pill
├── templates/
│   ├── product.tube.json            # Custom PDP for wholesale tubes
│   ├── product.retail.json          # Custom PDP for retail packs
│   ├── product.trial.json           # Custom PDP for trial case
│   ├── page.samples.json            # /samples lead-magnet page
│   ├── page.quote.json              # /quote page (Phase 2)
│   └── page.cert.json               # /cert PDF download page
└── config/
    ├── settings_schema.json         # Theme settings (extended)
    └── settings_data.json
```

### Why "section blocks" not "code injection"

- **Section blocks survive theme upgrades.** Code injection in `theme.liquid` does not — every Dawn update fights you.
- **Section blocks are merchant-editable.** Lambert can rearrange the homepage without editing code. Part-time staff can edit hero copy without dev intervention.
- **Section blocks are JSON-template friendly.** `templates/product.tube.json` declares the section order, and any future product can re-use that template via the admin's "Theme template" dropdown. **Adding SKU #50 = pick a template from a dropdown. Zero code.**

### Page-builder rejection (Shogun / PageFly)

Both add **600KB-1.2MB of runtime JS** + a $30-149/mo tax forever + lock-in (can't uninstall without rebuilding pages). Native sections + Liquid do 100% of what The Pack Guys needs at ~15KB JS overhead and $0/mo. Hard rule: **no page builders, ever.**

---

## 3. App Stack — Minimum Viable + Escalation Triggers

### Launch stack (Month 1, ~$60/mo)

| App | Purpose | Cost/mo | Why not in-theme |
|---|---|---|---|
| **Bold Quantity Breaks** | B2B tier pricing on standard Shopify (Basic/Shopify plan) | $19.99 | Tier pricing needs cart-level price overrides; requires server logic. Bold is the cheapest stable option until upgrading to Shopify Plan + native B2B. |
| **Shopify Forms** (built-in) | /samples + /quote forms with file upload | $0 | Free, native, GDPR-clean |
| **Shopify Email** (built-in) | Transactional + newsletter to 10K/mo | $0 | Free at this volume |
| **Shopify Flow** (built-in) | Auto-tag B2B customers, alerts, sample-kit follow-up | $0 | Native — replaces $20-99/mo Zapier/Make for Shopify-internal flows |
| **QuickBooks Online Connector** | Orders → QBO | $0 | Native, supported by Intuit |

### Deferred until trigger fires

| App | Trigger | Why deferred |
|---|---|---|
| **Judge.me** ($15/mo) | Reviews count > 10 (Month 2-3) | Empty review widget is worse than no widget; wait for inventory of social proof |
| **Klaviyo** ($20-45/mo) | Email list > 250 OR repeat customer rate > 10% | Shopify Email handles first 10K sends free; Klaviyo's segmentation only matters at scale |
| **Smile.io / loyalty** | Repeat customer count > 50/mo | Don't reward loyalty before you have any |
| **Easify / Hulk Product Options** ($10-15/mo) | Custom-print orders > 3/week | Phase 2 (deferred per site-spec) |
| **ShipStation** ($10/mo) | Orders > 30/mo OR multi-carrier needed | Shopify Shipping handles USPS/UPS natively |
| **Shopify B2B (Plus tier)** | Wholesale revenue > $30K/mo | Plus is $2,300/mo — only worth it when native company accounts replace Bold + saves manual tagging |

### Category-by-category decisions

**Tier pricing — Bold Quantity Breaks ($19.99) vs Wholesale Club ($24) vs Shopify B2B native (Plus only):**
- Pick **Bold**. Wholesale Club's UI is more dated, and B2B native requires Plus ($2,300/mo) — overkill until $30K+/mo wholesale.
- Migration path: when revenue justifies Plus, native B2B replaces Bold cleanly (customer tags carry over).

**Sample kit / free product flow — Shopify Forms + Shopify Flow (free) vs SureGift ($14.99):**
- **Shopify Forms + Flow.** Form submission → Flow rule → tag customer "sample-requested" → trigger Shopify Email sequence (Day 0 confirmation, Day 7 "did you receive it?", Day 14 first-order discount). Zero app cost, zero per-kit cost. Lambert manually picks/ships sample kits — at sub-30/week volume it's faster than automating.

**Abandoned cart — Shopify built-in vs Klaviyo:**
- **Shopify built-in** until list > 250 emails. Shopify's abandoned-checkout email recovers ~15% of carts free. Klaviyo recovers ~22% but costs $20-45/mo and requires segmentation infrastructure not worth building at <100 orders/mo.

**Reviews — Judge.me vs Yotpo vs Loox:**
- **Judge.me Lite ($15/mo, Month 2+).** Yotpo ($79+) is enterprise overkill. Loox ($35+) is photo-first which matters for DTC fashion, not B2B packaging. Judge.me has the cleanest free tier, fastest widget (~12KB), and native Shopify integration.

**SEO — Plug In SEO vs SearchPie vs Smart SEO vs none:**
- **None.** SEO apps are 90% snake oil. Shopify natively generates sitemaps, alt text inheritance, and JSON-LD product schema. The remaining 10% (title format, meta description templates, canonical URLs) is 30 minutes of theme.liquid work. Save $20-50/mo. Re-evaluate at Month 6 if rankings stall.

**Email marketing — Shopify Email vs Klaviyo:**
- **Shopify Email** until list > 250 or repeat customer rate > 10%. Klaviyo's value is segmentation and flows, both meaningless at low list size. Migrate to Klaviyo at Month 3-6 when you have enough behavioral data to segment on.

**Inventory + 3PL — ShipBob vs Shipmonk vs DIY:**
- **DIY in LA warehouse Month 1** (Lambert's existing footprint). ShipBob ($40/mo + per-order) only when order volume > 30/week OR Lambert needs nights/weekends back. Inventory tracked natively in Shopify; reorder triggers via Shopify Flow rule + Telegram alert (already wired for PT).

**B2B account management — Bold + Shopify Tags + Shopify Forms vs Sparklayer ($49/mo):**
- **Bold + Tags + Forms.** Sparklayer is impressive but $49/mo + complex setup. At <50 wholesale accounts, tagging customers manually (`wholesale-tier-1`, `net-30-approved`, `resale-cert-on-file`) is sufficient.

**Quote-to-order — Quick Quote ($9.99) vs Shopify Forms + manual:**
- **Shopify Forms + manual.** Quote-to-order apps automate quote→invoice→checkout link. Worth it at >10 quotes/week. At <5/week, Lambert emails a draft order link from Shopify admin in 90 seconds.

**Custom product pages — Shogun ($39+) vs PageFly ($24+) vs Raw Liquid:**
- **Raw Liquid via custom JSON templates.** See §2. Shogun/PageFly add 600KB-1.2MB JS, $24-150/mo forever, and lock-in. Hard veto.

---

## 4. Custom Liquid Components Worth Building In-Theme

These are the high-leverage builds. Each saves an app subscription and runs at near-zero JS cost.

### A. Live tier-price calculator (`pg-tier-calc.js` + `pg-tier-table.liquid`)

**Problem:** B2B buyers want to see "if I add 5 of these to cart, what's my per-unit price?" without doing math.

**Build:**
- Section block on PDP renders the 5-tier table from product metafields (`custom.tier_prices` JSON array: `[{min: 1, price: 85}, {min: 5, price: 75}, ...]`).
- JS listens to quantity input change → highlights active tier row → updates a `<span>` next to Add-to-Cart showing "$0.075/unit · $375 total at this qty."
- No app. ~3KB JS. Works for every future SKU because metafield-driven.

**Cost saved:** Bold's $19.99/mo (long-term — Bold still needed for cart price override; calculator is the UX layer on top).

### B. Cutoff timer (`pg-cutoff-timer.js` + `pg-hero-cutoff.liquid`)

**Problem:** "Order by 2pm PT, ships today" — needs to be live, accurate, and switch to "ships tomorrow" after cutoff.

**Build:**
- Liquid section with editable cutoff time + timezone in section settings.
- JS calculates remaining ms in PT (handles DST), updates DOM every 1s.
- After cutoff: swaps to "Order now, ships tomorrow" + shows tomorrow's date.
- Weekends/holidays: configurable in section blocks as date list; skips to next business day.

**Cost saved:** Hurrify / Countdown apps ($5-15/mo) + 80KB of their JS.

### C. Color swatch picker as accessible radios (`pg-swatch.js` + `pg-card-product.liquid` + `snippets/pg-swatch.liquid`)

**Problem:** Dawn's default variant picker is a `<select>` dropdown. Visual swatches matter for color SKUs (5 colors at launch, 20+ by Month 12).

**Build:**
- Render variants as `<input type="radio">` with `<label>` containing color chip + name.
- CSS: hidden radio, label is the visible swatch; `:checked` + sibling selector for active state.
- ARIA: `role="radiogroup"`, `aria-label`, keyboard arrow navigation (handled by native radios).
- Color hex pulled from variant metafield `custom.swatch_hex` — so adding "Translucent Purple" SKU = set hex, done.

**Cost saved:** Swatch King / Swatchify ($5-13/mo). Plus better accessibility than most apps.

### D. Real-time inventory chip (`pg-inventory-chip.js` + `snippets/pg-stock-chip.liquid`)

**Problem:** "Ships from LA" is a trust signal but stale inventory is worse than no number.

**Build:**
- Liquid renders initial inventory count from `variant.inventory_quantity` at render time (server-side, free, no API call).
- For PDP only, fetch fresh count via Shopify Storefront API on variant change (1 API call per variant click).
- Display logic: `>100 = "In stock — ships today"`, `10-100 = "{n} in stock"`, `<10 = "Only {n} left"`, `0 = "Out of stock — notify me"`.
- Hide Add-to-Cart at 0; replace with "Notify me when back" email capture (already in Dawn — just enable).

**Cost saved:** Back in Stock apps ($10-30/mo) + inventory display apps ($5-15/mo).

### E. Sticky tier-pricing table on mobile (`pg-tier-table.liquid`)

**Problem:** B2B buyer scrolls PDP, loses sight of pricing.

**Build:**
- Tier table renders inline on desktop, becomes `position: sticky; bottom: 0` on mobile after scrolling past viewport-1.
- Tap to collapse/expand.
- No JS framework — pure CSS + IntersectionObserver (15 lines of JS).

**Cost saved:** Sticky Add-to-Cart apps ($5-10/mo).

### F. Sample-kit form (uses Shopify Forms section, no custom build)

Already built into Shopify Forms — wrap in `pg-sample-kit-form.liquid` section for brand styling. No JS overhead.

---

## 5. Performance + Core Web Vitals Strategy

### Targets

| Metric | Target | Dawn unmodified | Pack Guys post-build |
|---|---|---|---|
| LCP (mobile) | <2.5s | ~1.8s | <2.0s |
| INP | <200ms | ~120ms | <150ms |
| CLS | <0.1 | 0.03 | <0.05 |
| Total page weight (homepage) | <800KB | ~650KB | <750KB |
| JS execution time (mobile) | <2s | ~1.4s | <1.6s |

### Tactics

1. **Images:**
   - Use Shopify's `image_url` filter with `width:`, `format: 'webp'`, and `loading: 'lazy'` on everything below the fold.
   - Hero/LCP image: `fetchpriority="high"`, no lazy load, served at exact viewport width via `srcset`.
   - Product images: 2048×2048 master uploaded once; Shopify auto-serves WebP/AVIF responsive variants. **Never** upload pre-resized — costs you future flexibility.
   - Strip EXIF (privacy + size) via export preset.

2. **Fonts:**
   - **Use Shopify-hosted fonts**, not Google Fonts CDN. Shopify hosts on its CDN with proper cache headers; Google Fonts adds a DNS lookup.
   - `font-display: swap` (Shopify default).
   - Preload ONLY the woff2 used for LCP text (typically one heading weight).

3. **Third-party scripts:**
   - Hard veto on Facebook Pixel, TikTok Pixel, Hotjar at launch. Add only when ad spend > $500/mo justifies attribution.
   - Microsoft Clarity (free heatmaps) — load async, low priority.
   - GA4 — use Shopify's native integration (no GTM container).
   - Klaviyo (when added) — load via Shopify Customer Events, not script tag (avoids render-blocking).

4. **CDN:**
   - Shopify CDN is already global (Fastly). No Cloudflare in front of the storefront — would double-CDN and break Shopify's image transformation.
   - **Use Cloudflare ONLY for DNS + email** (MX records, SPF/DKIM) and for the GitHub Pages bridge during migration.

5. **Lazy loading:**
   - Native `loading="lazy"` on all below-fold `<img>`.
   - Defer non-critical JS via `defer` attribute (Shopify's `script_tag` filter handles this).
   - Section visibility via IntersectionObserver to delay heavy sections (e.g., review widget) until in-viewport.

6. **JS budget enforcement:**
   - Lighthouse run weekly in CI. Fail build if mobile LCP > 2.5s or total JS > 200KB.
   - Theme Inspector (Chrome ext) used during development to spot Liquid render slowness.

---

## 6. Multi-Channel Strategy — Shopify as Source of Truth

### Channel topology

```
                    ┌────────────────────────┐
                    │  Shopify Admin (SOURCE) │
                    │  - Products + variants  │
                    │  - Inventory levels     │
                    │  - Customer accounts    │
                    │  - Orders               │
                    └────────────────────────┘
                              │
       ┌──────────┬───────────┼───────────┬──────────────┐
       │          │           │           │              │
       ▼          ▼           ▼           ▼              ▼
   thepackguys  Amazon     Shopify     Shopify       Future:
   .com         FBA        POS Lite    B2B portal    Faire / Brex
   (DTC + B2B)  (DTC only) (LA pickup) (Plus)        Connected
                                                     (Phase 4+)
```

### How

1. **Shopify Admin is the only place inventory is edited.** Every other channel reads from Shopify.
2. **Amazon FBA (Month 3+):** Use the **Amazon by CedCommerce** app (free tier) — pulls Shopify product catalog, pushes to Seller Central, syncs FBA inventory back. Map retail packs only (25/100/500). Wholesale SKUs stay Shopify-only.
3. **Shopify POS Lite (Month 1):** Free with every Shopify plan. Install on Lambert's phone for LA pickup customers — scan SKU, charge card, prints receipt, deducts inventory. Zero additional cost.
4. **B2B portal (Month 6+):** Shopify Plus B2B native — separate storefront URL with company-account login, customer-specific catalogs, draft orders, Net 30 invoicing. Only justified at $30K+/mo wholesale.
5. **Faire / Brex Connected (Phase 4):** Faire's marketplace channel app syncs from Shopify. Only enable once Lambert has bandwidth to handle Faire's net-60 + 25% commission.
6. **Inventory sync rules:**
   - Reserve 10% of stock for B2B Plus (Phase 4) so FBA doesn't drain wholesale inventory.
   - Shopify Locations feature: "LA warehouse" + "Amazon FBA" + "PT pickup" as separate locations.

### What NOT to do

- **Don't use a separate ERP.** At <500 orders/mo, Shopify Admin IS the ERP. Adding Cin7/TradeGecko ($300+/mo) is premature.
- **Don't sync inventory via Zapier.** Use native channel apps. Zapier sync has 5-15 min lag → overselling.
- **Don't list wholesale cases on Amazon.** Amazon's cannabis-adjacent screening is stricter for "case of 5000 tubes" than for "100-pack." Stick to retail.

---

## 7. Migration Plan — GitHub Pages → Live Shopify

### What's reusable from GitHub Pages preview

| Asset | Reusable? | How |
|---|---|---|
| Brand colors / typography decisions | Yes | Port to Shopify theme settings |
| Product copy (HTML descriptions) | Yes | Pasted into Shopify Products → Description (already in CSV) |
| CR-cert PDF | Yes | Upload to Shopify Files, link from /cert page |
| Logo / favicon | Yes | Upload to Theme Settings |
| Hero photography | Yes | Re-upload at 2048px to Shopify |
| FAQ / About copy | Yes | Paste into Shopify Pages |
| HTML / CSS structure | Partial | Reference for visual fidelity; rebuild in Liquid sections |
| JS (cutoff timer, etc.) | Yes | Port to `assets/pg-*.js` with Liquid wrappers |
| Static URLs | Yes (redirects) | Map old paths to new via Shopify URL Redirects |

### What's rebuilt

- Page builder layouts → Liquid sections
- Static product pages → Shopify product templates (data-driven from CSV)
- Static cart → Shopify cart
- Static checkout (none on GH Pages) → Shopify checkout

### Phased migration

| Phase | Days | Tasks | Dev time |
|---|---|---|---|
| **0 — Account setup** | D0-1 | Create Shopify trial, connect domain (subdomain `staging.thepackguys.com` while building), Mercury account, CDTFA permit | 2 hrs |
| **1 — Theme fork** | D2-3 | Clone Dawn via Shopify CLI, init Git repo, push to GitHub private, deploy to `staging` theme slot | 3 hrs |
| **2 — Brand restyling** | D3-4 | Theme settings (colors, fonts, page width), `pg-base.css`, custom logo, favicon | 4 hrs |
| **3 — Product import** | D4 | Upload `shopify-products.csv`, attach images, verify variants | 2 hrs |
| **4 — Custom sections** | D5-7 | Build `pg-hero-cutoff`, `pg-tier-table`, `pg-card-product`, `pg-trust-bar`, `pg-stock-chip` | 12 hrs |
| **5 — Custom JS** | D7-8 | `pg-tier-calc.js`, `pg-cutoff-timer.js`, `pg-swatch.js`, `pg-inventory-chip.js` | 8 hrs |
| **6 — JSON templates** | D8 | `product.tube.json`, `product.retail.json`, `product.trial.json`, `page.samples.json`, `page.cert.json` | 3 hrs |
| **7 — Pages + nav** | D9 | About / FAQ / Shipping / Returns / Prop65 / Cert / Samples pages; main + footer nav | 4 hrs |
| **8 — Apps install + config** | D9-10 | Bold tier setup for 5 wholesale products, Shopify Forms (samples), QBO connector | 3 hrs |
| **9 — Payments + tax + shipping** | D10 | Shopify Payments activation, Stripe backup setup, CA tax, shipping zones | 3 hrs |
| **10 — Flow + email** | D10-11 | Shopify Flow rules (sample follow-up, B2B tag, low-stock alert), email templates | 3 hrs |
| **11 — Redirects + SEO** | D11 | URL redirects from GH Pages paths, Search Console, GA4, sitemap submit | 2 hrs |
| **12 — QA + soft launch** | D12-13 | PageSpeed (>85 mobile), mobile checkout, B2B tier verification, real-card $1 test order | 4 hrs |
| **13 — DNS cutover** | D14 | Switch `thepackguys.com` A record from GitHub Pages to Shopify, monitor 4 hours | 1 hr |
| **TOTAL DEV TIME** | **~14 days elapsed** | | **~54 hrs focused work** |

GitHub Pages preview stays live at `preview.thepackguys.com` for 30 days as a backup. After 30 days clean → archive repo, retire DNS.

---

## 8. Backup Payment Processor Strategy

### Risk profile

Shopify Payments (Stripe-backed) has an automated risk-screening pass on signup + ongoing. Cannabis-adjacent triggers:
- Product title containing "pre-roll," "cannabis," "marijuana," "joint," "weed," "THC," "CBD"
- Image OCR detecting cannabis leaf imagery
- Customer support chat history mentioning cannabis brands by name
- Chargeback rate > 0.7% (rare for B2B but possible if a brand disputes a bulk order)

**Probability of freeze in Year 1: estimate 15-25%** based on similar packaging suppliers in industry forums.

### Three-tier plan

**Tier A — Primary (Day 1):**
- **Shopify Payments** activated with scrubbed product titles ("Pop-Top Storage Tubes" not "Pre-Roll Tubes" in payment-visible fields — Shopify Payments sees product names on chargeback risk reports).
- **PayPal Express** as secondary checkout option (PayPal has clearer cannabis-paraphernalia policy and is more tolerant of "smoking accessories" / "storage" framing).

**Tier B — Hot backup (Pre-configured Day 1, dormant):**
- **Stripe direct account** (separate from Shopify Payments). Activated via Shopify's "Third-party gateway" option. Costs $0/mo until processed; same 2.9% + 30¢.
- Stripe Connected Account application filed in parallel to Shopify Payments. Approval takes 2-5 business days.
- Saved Shopify checkout config switch: one-click from Shopify Payments → Stripe direct.
- Runbook in `~/business/preroll-tubes/payment-freeze-runbook.md` (build this) with exact steps to flip processor in <30 min.

**Tier C — Break-glass alternatives (24-72 hr activation if Stripe ALSO freezes):**
- **Authorize.Net via 2Checkout reseller** — accepts cannabis-paraphernalia with proper merchant category code (MCC 5993 "Cigar Stores" or MCC 5999 "Miscellaneous Retail"). Cost: $25/mo + 2.9-3.5%.
- **NMI (Network Merchants)** — cannabis-friendly processor, ~3.5% + $0.25. Setup: 2-5 business days.
- **Square (DTC only)** — Square has accepted "storage tubes" / "smoking accessories" reliably for years. Can process DTC retail packs while wholesale moves to NMI.

### Operational rules

1. **Never put all eggs in Shopify Payments.** Always have PayPal Express live as parallel option.
2. **Daily payout to Mercury.** Don't let >3 days of receivables sit inside Stripe. If freeze hits, the cap is whatever's already paid out.
3. **Stripe direct kept "warm"** — process 1 test transaction per month to keep the account active.
4. **Backup runbook tested quarterly** — Lambert switches processor in staging once per quarter to keep muscle memory.
5. **Customer email pre-drafted** — "We're temporarily processing payments through a backup system. Your order is safe. Click here to complete checkout." Ready to send if freeze hits.

---

## 9. Theme Code Structure for Zero-Code SKU Expansion

**Goal: Adding SKU #50 (e.g., 98mm tubes in 8 new colors) requires zero new code — only Admin clicks.**

### Achieve this via:

1. **Metafield-driven product attributes.**
   - `custom.tier_prices` (JSON) — defines tier breakpoints + per-unit prices
   - `custom.swatch_hex` (color) — hex code for the color chip
   - `custom.cr_certified` (boolean) — show CR-cert badge
   - `custom.prop65_required` (boolean) — show Prop 65 warning
   - `custom.tube_diameter_mm` (number) — for future filtering
   - `custom.tube_length_mm` (number) — for future filtering
   - `custom.warehouse_location` (single-line text) — "LA" / "China-direct" / "OKC"
   - `custom.cross_sell_handles` (list of product references) — for "you may also need" block

2. **JSON template assignment by product type:**
   - `Pre-Roll Tube` type → `product.tube.json` template (5-tier wholesale layout)
   - `Retail Pack` type → `product.retail.json` template (color picker + buy now)
   - `Trial Case` type → `product.trial.json` template (single-qty + upsell to wholesale)
   - `Custom Print` type (Phase 2) → `product.custom.json` template (with options app)
   - Future: `Mylar Bag` → `product.bag.json`, `Glass Jar` → `product.jar.json` — each new product type = one new JSON template = one-time 2-hour build.

3. **Collection auto-population via Smart Collections:**
   - "Wholesale Cases" = `tag contains "wholesale"`
   - "Retail Packs" = `tag contains "retail"`
   - "Trial Sizes" = `tag contains "trial"`
   - "Cones" (future) = `product_type equals "Cone"`
   - "In Stock LA" = `metafield custom.warehouse_location equals "LA"`
   - **Adding SKU = add tag, collection auto-updates. Zero code.**

4. **Navigation:**
   - Main nav references collections, not products. New SKUs in existing collections appear instantly.
   - Mega-menu (Phase 4) driven by Linklist metafields — same zero-code pattern.

5. **Variant-level imagery:**
   - One product per color, one variant per quantity — keeps URL count low for SEO.
   - Variant `featured_image` swaps PDP hero on variant click (Dawn supports natively).

6. **Search:**
   - Shopify Search (built-in) — indexes product title, description, tags, metafields.
   - Synonym groups configured in admin (`tube` ↔ `pop top` ↔ `cone holder`) — no app needed.

### What this looks like in practice

**Adding "98mm CR tubes, 5 new colors, 4 tier prices each" (Phase 2 launch):**
1. Duplicate `116mm-cr-tube-black` product in admin → rename to `98mm-cr-tube-black`.
2. Update metafields (tier_prices, tube_length_mm).
3. Upload product images.
4. Repeat for 4 more colors (5 min each).
5. Done. PDP renders correctly via `product.tube.json`. Auto-appears in "Wholesale Cases" collection. Auto-shows in search. Auto-tracked in inventory. Auto-syncs to QBO.

**Total time: ~30 min for 5 new SKUs. Zero code change.**

---

## 10. Single Biggest Technical Risk + Mitigation

### Risk

**Shopify Payments freeze on cannabis-adjacent flag mid-volume, taking the store offline for 7-30 days, with 60-day rolling reserve on already-processed funds.**

### Why this is THE risk (vs theme bugs, app failures, inventory sync issues)

- Theme bugs are visible immediately; you fix and ship. Hours of downtime, not days.
- App failures have workarounds (manual tier pricing on a dozen orders is annoying, not fatal).
- Inventory sync issues are operational; affect <5% of orders.
- A payment processor freeze takes **the entire revenue stream to zero**. If it happens at Month 3 when Lambert's burning through Container #1, it can cascade into supplier-trust damage (can't pay Net-60 invoice) → container delays → stockout → customer churn → death spiral.

### Mitigation stack (defense in depth)

1. **Linguistic scrubbing on payment-visible fields:**
   - Product titles in Shopify: "Pop-Top Storage Tubes" not "Pre-Roll Tubes"
   - Variant SKUs: keep `TUBE-116-*` (Shopify Payments doesn't OCR SKUs)
   - Cart line item display: configured to show product title (already scrubbed)
   - Email receipts: same scrubbed naming
   - Marketing copy on PDP / About / FAQ: pre-roll language OK (not visible to Shopify risk team unless audited)

2. **Stripe direct account pre-approved Day 1.**
   - File Stripe application in parallel with Shopify Payments. Don't wait until freeze.
   - Keep account warm with 1 test transaction/mo.

3. **PayPal Express live as parallel checkout option Day 1.**
   - Some customers choose PayPal regardless. Keeps ~15% of revenue flowing if Shopify Payments freezes.

4. **30-day operating cash buffer in Mercury, untouchable.**
   - $4-6K cash floor. Funded from first profitable month. Survives a 30-day freeze.

5. **Daily Mercury payout from Shopify.**
   - Minimize Stripe-held balance. Freezes hit current balance, not already-banked funds.

6. **Pre-drafted customer email + Twitter/Instagram post:**
   - "Brief checkout maintenance — alternative payment link here." Buys 24-48 hours of customer patience.

7. **Backup runbook tested quarterly.**
   - `~/business/preroll-tubes/payment-freeze-runbook.md`: exact 30-min flip sequence (admin → settings → payments → activate Stripe gateway → deactivate Shopify Payments → test → email customers).

8. **Quarterly chargeback audit:**
   - Disputes < 0.5% target. Investigate any dispute within 24 hrs. Lower dispute rate = lower freeze probability.

9. **Diversify SKU mix:**
   - Once Phase 2 ships mylar/jars/boxes (less cannabis-coded than tubes), include them in payment-visible product feed. Lowers cannabis-adjacency signal weight in Shopify's risk model.

10. **If freeze happens — runbook order:**
    - Day 0: Flip to Stripe direct (pre-warmed). Email customers. Post on social.
    - Day 1: Open ticket with Shopify, request specific reason. Provide CR-cert, business license, supplier docs.
    - Day 3: If no resolution, file appeal. Engage Shopify Plus partner (even on Basic plan) for advocacy.
    - Day 7: If still frozen, switch primary to NMI (cannabis-friendly). Accept ~0.6% cost increase as insurance premium.
    - Day 30: If 60-day rolling reserve held, file complaint with state AG + small claims if amount > $5K threshold.

### Acceptance criteria for "we've mitigated this"

- [ ] Stripe direct account approved AND configured as Shopify backup gateway
- [ ] PayPal Express enabled at checkout
- [ ] Product titles scrubbed of cannabis terms in admin
- [ ] 30-day cash buffer in Mercury
- [ ] Daily payout configured
- [ ] Payment freeze runbook documented
- [ ] Quarterly test of processor flip
- [ ] Chargeback monitoring weekly via Shopify Analytics

---

## Appendix A — Settings Schema Extensions

Add to `config/settings_schema.json`:

```jsonc
[
  {
    "name": "Pack Guys — Brand",
    "settings": [
      { "type": "color", "id": "pg_color_industrial_yellow", "label": "Industrial yellow", "default": "#ffd400" },
      { "type": "color", "id": "pg_color_jet_black",        "label": "Jet black",        "default": "#0f0f0f" },
      { "type": "color", "id": "pg_color_stock_green",      "label": "In-stock chip",    "default": "#1ea672" },
      { "type": "color", "id": "pg_color_low_stock_amber",  "label": "Low-stock chip",   "default": "#e08a1a" },
      { "type": "color", "id": "pg_color_out_red",          "label": "Out-of-stock",     "default": "#c52628" }
    ]
  },
  {
    "name": "Pack Guys — Operations",
    "settings": [
      { "type": "text",   "id": "pg_cutoff_time",       "label": "Same-day ship cutoff (HH:MM)", "default": "14:00" },
      { "type": "select", "id": "pg_cutoff_timezone",   "label": "Cutoff timezone",
        "options": [{"value": "America/Los_Angeles", "label": "PT"}, {"value": "America/New_York", "label": "ET"}],
        "default": "America/Los_Angeles" },
      { "type": "richtext", "id": "pg_warehouse_address", "label": "Warehouse address" },
      { "type": "url",    "id": "pg_cr_cert_pdf",       "label": "CR-cert PDF (uploaded to Files)" }
    ]
  }
]
```

## Appendix B — Apps Decision Matrix (Quick Reference)

| Need | Launch (Month 1) | Trigger | Escalation (Month 2-6) | Replacement (Month 12+) |
|---|---|---|---|---|
| Tier pricing | Bold Quantity Breaks $19.99 | Wholesale > $30K/mo | — | Shopify Plus B2B native |
| Sample kit / lead form | Shopify Forms (free) | — | — | Native, no change |
| Abandoned cart | Shopify built-in | List > 250 | Klaviyo $20-45 | Klaviyo |
| Reviews | None | Reviews count > 10 | Judge.me Lite $15 | Judge.me Pro $25 |
| SEO | None (theme.liquid native) | Rankings stall @ M6 | Reconsider | None |
| Email | Shopify Email (free) | List > 250 | Klaviyo $20-45 | Klaviyo |
| Inventory | Shopify native | Orders > 30/wk | ShipBob $40 + per-order | 3PL contract |
| B2B accounts | Tags + Bold + Forms | Wholesale > $30K/mo | Sparklayer $49 OR Plus B2B | Shopify Plus B2B |
| Quote-to-order | Shopify Forms + manual | Quotes > 10/wk | Quick Quote $9.99 | Native B2B draft orders |
| Custom product pages | Raw Liquid + JSON templates | Never | Never | Never |

## Appendix C — File Inventory (post-build)

Estimated ~25 custom files in the theme repo. Compare to a Shogun/PageFly install: ~150+ generated files, none version-controllable.

```
sections/pg-*.liquid          12 files
snippets/pg-*.liquid           6 files
assets/pg-*.js                 4 files
assets/pg-*.css                2 files
templates/*.json               6 files
config/settings_schema (ext)   1 file
```

---

## Action items (post-approval, in order)

1. [ ] Confirm theme choice = Dawn (forked) — Lambert sign-off
2. [ ] Save this doc to `/Users/ratmouse/business/preroll-tubes/shopify-architecture.md`
3. [ ] Create Stripe direct application (parallel to Shopify Payments)
4. [ ] Initialize GitHub repo for Dawn fork
5. [ ] Install Shopify CLI on Lambert's Mac (already has Codex/dev tooling)
6. [ ] Begin Phase 1 of migration (D2-3 in §7 timeline)

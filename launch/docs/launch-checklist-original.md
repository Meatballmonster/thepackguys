# Launch Checklist — D0 → First Paid Order Shipped

> Sequential. Each task: **Owner** · **Time** · **Cost** · **Blocked by**.
> Critical path = items marked ⭐. Skip nothing on the critical path.

---

## Day 0 — Decisions (1 hour, all Lambert)

- [x] ⭐ ~~Pick brand name~~ → **The Pack Guys** (locked 2026-05-22)
- [ ] ⭐ Buy domain `thepackguys.com` on Cloudflare Registrar (~$12) — confirmed available, grab before someone else does
- [ ] ⭐ Send supplier-friend the **Template A email** from `china-supplier-setup.md` Part 7 — kicks off everything else

---

## China Supplier Onboarding (parallel track, runs alongside Days 1–14)

Most blocking item on the whole launch — start day 1. Full detail in `china-supplier-setup.md`.

- [ ] ⭐ **Get CR test report PDF** from friend matching exact 116mm SKU specs
- [ ] ⭐ **Confirm duty/freight inclusion in $0.05 landed price** — Section 301 + MFN = 30.3% on HS 3923.50. If duty is extra, true landed = $0.062 and pricing ladder needs revision
- [ ] ⭐ **Net-60 payment terms in writing** (Template B email)
- [ ] **Sample shipment** — 25-50 units of each color via air, $50-100 total freight
- [ ] **HS code confirmed** (almost certainly 3923.50.0000) + container loading spec (units per carton, cartons per 20'/40')
- [ ] **Custom production capabilities + pricing** — custom color MOQ, custom-print MOQ, setup fees, lead times
- [ ] **Backup contact at factory** (continuity insurance)

---

## US Importer Infrastructure (parallel track, runs alongside Days 1–14)

Can't legally land a container without these. Full vendor list in `china-supplier-setup.md` Part 2.

- [ ] ⭐ **Customs broker quotes** from Flexport + 1 local LA broker — pick one, sign POA
- [ ] ⭐ **Customs Continuous Bond** ($600-800/yr) — your broker handles application via surety
- [ ] ⭐ **Product Liability Insurance** ($1-2M, $500-1,500/yr) — Hiscox, Next, Hartford. Required for Amazon FBA in month 3
- [ ] ⭐ **Cargo Insurance** (0.5% of cargo value, ~$270 on $54K container) — bundle with forwarder
- [ ] **Freight forwarder relationship** — Flexport recommended (forwarding + brokerage + customs in one)
- [ ] **Verify warehouse receives 40' containers** — dock door / forklift access, or arrange cross-dock

---

## Day 1 — Entity + Domain (parallelizable, ~2 hours of Lambert's time spread across 2-3 days)

- [ ] ⭐ **CA LLC filing** · Lambert (or Northwest Registered Agent service) · 20 min to file, 1-3 days for confirmation · $70 + $125 RA = $195 · Blocked by: name pick
- [ ] ⭐ **EIN from IRS** · Lambert · 15 min online · Free · Blocked by: LLC confirmation
- [ ] ⭐ **CA Seller's Permit** (cdtfa.ca.gov) · Lambert · 30 min · Free · Blocked by: EIN
- [ ] **Mercury business checking** · Lambert · 20 min online · Free · Blocked by: EIN
- [ ] **Stripe account application** · Lambert · 15 min · Free (2.9% + 30¢) · Blocked by: EIN + Mercury
- [ ] **Domain purchase** · Lambert · 5 min · ~$12/yr · No blockers
- [ ] **Google Workspace** (optional but useful for sales@, help@) · Lambert · 10 min · $6/user/mo · Blocked by: domain

---

## Day 2-5 — Site Build (8-12 hours total, mostly Lambert with template support)

- [ ] ⭐ **Shopify Basic signup** · Lambert · 10 min · $39/mo (14-day free trial) · Blocked by: nothing
- [ ] ⭐ **Install Dawn theme + edit logo/colors** · Lambert + designer (Fiverr $50) · 1-2 hrs · ~$50
- [ ] ⭐ **Connect domain to Shopify** · Lambert · 15 min · Free · Blocked by: domain purchase
- [ ] **Install required apps** (Bold Quantity Breaks, QBO connector, Shopify Inbox) · Lambert · 30 min · ~$20/mo
- [ ] ⭐ **Create all 8 products** (5 wholesale colors + 3 retail pack sizes) using `site-spec.md` · Lambert · 2 hrs · Free
- [ ] ⭐ **Upload product photos** (shoot all SKUs in one 90-min session) · Lambert · 90 min · ~$20 lightbox
- [ ] ⭐ **Configure Bold Quantity Breaks** for each wholesale product · Lambert · 30 min · Included in app fee
- [ ] ⭐ **Build static pages**: About, FAQ, Shipping, Returns, Privacy, Terms, Prop 65, /cert · Lambert · 1 hr (paste from `copy-bank.md`) · Free
- [ ] ⭐ **Upload CR test report PDF to /cert** · Lambert · 5 min · Free · Blocked by: supplier sending PDF
- [ ] ⭐ **Configure discount codes** (`PTFRIENDS`, `LAPICKUP`, `WELCOME10`, `BULK5`) · Lambert · 15 min · Free
- [ ] **Build /quote form** via Shopify Forms · Lambert · 30 min · Free
- [ ] **Build /account/apply B2B form** · Lambert · 30 min · Free
- [ ] ⭐ **Configure Shopify Tax** (enter CDTFA permit) · Lambert · 15 min · Free · Blocked by: CDTFA permit
- [ ] ⭐ **Configure Shopify Shipping** zones + methods · Lambert · 30 min · Free
- [ ] **Set up Shopify Flow auto-tagging rules** from `fulfillment-automation.md` · Lambert · 45 min · Free
- [ ] **Install Google Analytics + Search Console** · Lambert · 20 min · Free
- [ ] **Configure transactional email templates** (paste from `copy-bank.md`) · Lambert · 45 min · Free

---

## Day 5-7 — Warehouse + Fulfillment Setup (4 hours)

- [ ] ⭐ **Designate physical inventory area** in LA warehouse, segregate from any PT-licensed product · Lambert · 1 hr
- [ ] **Buy fulfillment hardware** (Rollo printer, labels, mailers, tape, scale) · Lambert · 30 min ordering · ~$450 one-time
- [ ] ⭐ **Inbound + count inventory in Shopify** (set starting stock levels per SKU) · Lambert · 1 hr · Free
- [ ] **Connect Rollo printer to Shopify Shipping** · Lambert · 30 min · Free
- [ ] **Test print 5 labels** + practice packing 5 mock orders · Lambert · 30 min · Free
- [ ] **Set up Telegram order alerts** via existing Duke Bot · Lambert · 30 min · Free

---

## Day 8 — Pre-Launch QA (2 hours)

Run the full QA checklist from `site-spec.md` section 14. Specifically:

- [ ] ⭐ Test checkout with real card → $1 product → refund
- [ ] ⭐ Test wholesale account → verify tiered pricing
- [ ] ⭐ Test /quote form submission → verify Lambert receives email
- [ ] ⭐ Test order confirmation email + shipped email
- [ ] ⭐ Verify CR cert PDF is downloadable from /cert
- [ ] ⭐ Test mobile checkout on actual phone
- [ ] ⭐ Verify QBO sync on test order
- [ ] ⭐ Verify Telegram alert fires
- [ ] Run PageSpeed Insights — site loads < 3 sec on 4G
- [ ] Spell-check every page once more

---

## Day 9 — Soft Launch (2 hours)

- [ ] ⭐ **Send soft-launch text** to top 10 PT-network customers (template in `copy-bank.md` section 10A) · Lambert · 30 min · Free
- [ ] ⭐ **Send soft-launch email blast** to PT-network customer list (template 10B) · Lambert · 30 min · Free
- [ ] **Post one Instagram story** from Lambert's personal IG announcing the new site
- [ ] **Monitor inbox + chat** for the first 24 hours, respond fast

**Target outcomes (first 7 days post-launch):**
- ≥ 3 paid orders
- ≥ 1 B2B account application
- ≥ 1 custom-quote inquiry

---

## Day 10-30 — Iterate

- [ ] ⭐ **Build /samples landing page + form** — universal B2B conversion mechanic (research finding #4). Pre-written copy in `copy-bank.md` section 10b. · Lambert · 1 hr · Free
- [ ] ⭐ **Install live "ships today" cutoff timer on homepage** (research finding #3). Liquid + JS snippet, no app needed. · Lambert · 30 min · Free
- [ ] **File USPTO trademark for The Pack Guys** (needed for Amazon Brand Registry in month 3). LegalZoom or self-file at uspto.gov · Lambert · 1 hr · $250 (TEAS Plus) or $2K (expedited)
- [ ] Add customer logos to homepage as you get permission
- [ ] Add product reviews as customers receive orders (Judge.me, $15/mo, install in week 2)
- [ ] Write 1-2 short blog posts targeting SEO queries from `site-spec.md` section 12
- [ ] **Cold outbound to 20 LA cannabis brands** per week (email template 10C in `copy-bank.md`)
- [ ] Send first 20–50 sample kits to inbound /samples form submitters (cost: ~$6.50/kit)
- [ ] First weekly review with Lambert: what's working, what's broken, what to change

---

## Month 2-3 — Self-Serve Custom Designer (Phase 2)

Add Easify Product Options ($14.99/mo) to the custom-labeled tube product. Customer uploads artwork directly on the product page, picks color + label shape, sees estimated price, pays deposit, order routes to Lambert with files attached.

- [ ] **Install Easify Product Options app** · Lambert · 15 min · $14.99/mo
- [ ] **Configure custom-labeled tube product** with options: color, file upload (logo), text fields (brand name, tagline), label shape · Lambert · 1 hr · Included
- [ ] **Publish file format/size standards** on the custom product page (PNG/JPG/PDF/AI/EPS, 20MB max, 300DPI, CMYK preferred) · Lambert · 15 min
- [ ] **Test end-to-end:** upload a logo as a customer → confirm order arrives in Lambert's inbox with files attached · Lambert · 15 min
- [ ] **Update FAQ + quote-flow copy** to mention the new self-serve option · Lambert · 20 min

---

## Month 2-3 — Amazon FBA Channel (Phase 2 — optional but recommended)

Per competitor research: Evo + Urekt + Packlahoma are quietly profitable on Amazon at $0.40/unit retail with ~55% net margin (FBA fees + 15% referral baked in). Adds a third channel with free traffic.

- [ ] **Confirm trademark registration filed** (from Month 1 task above) · Blocked by: USPTO confirmation
- [ ] **Apply for Amazon Brand Registry** (free, requires trademark serial number) · Lambert · 30 min · Free
- [ ] **Apply for Amazon Seller Central account** (Professional plan) · Lambert · 30 min · $39.99/mo
- [ ] **Create 3 FBA listings** (25 / 100 / 500 retail packs, Black + Mixed variants first) using titles + bullets from `copy-bank.md` section 10c · Lambert · 2 hrs
- [ ] **Send first FBA shipment** to Amazon LA fulfillment center (~2,000 units of each pack size) · Lambert · 2 hrs
- [ ] **Run 10-day Amazon Vine or low-dose PPC** ($200 budget) to seed first reviews
- [ ] **Monitor weekly:** ACOS, BSR rank, conversion rate. Adjust pricing if margin holds.

---

## Total Time / Cost Summary

| Bucket | Lambert hours | One-time cost | Monthly cost |
|---|---|---|---|
| Entity + accounts | 2 hrs | $195 | $0 |
| Site build | 8-12 hrs | $50 (designer) | $60 (Shopify + apps) |
| Warehouse setup | 4 hrs | $450 (hardware) | $0 |
| QA + launch | 4 hrs | $0 | $0 |
| **Total to launch** | **18-22 hrs** | **~$700** | **$60/mo** |

Plus CA franchise tax: $800/yr (due by April 15 following year of formation).

---

## Critical Path (the only sequence that matters)

```
Pick name → File LLC → EIN → CDTFA permit + Mercury + Stripe
                                        ↓
                                 Configure Shopify Tax + Payments
                                        ↓
              Create products → Upload photos → Configure pricing → QA → LAUNCH
                     ↑
              CR cert PDF from supplier (do this FIRST in parallel)
```

**The longest blocking item is LLC confirmation (1-3 business days).** Everything else can finish in a week if Lambert puts in 18-22 hours.

**Earliest realistic launch:** 10 business days from D0.
**Comfortable launch target:** 14 business days (2 weeks).

---

## Profitability Reality Check (honest)

**Fixed costs to cover monthly:** ~$60 Shopify + apps + ~$67 CA franchise tax amortized = ~$127/mo.

**At launch margins:** average $0.06/unit gross margin × ~50 orders × ~1,500 avg units = $4,500/mo gross profit. Net of $127 fixed = **$4,373 net per month at low volume.**

**Profitable from order 1?** Yes on a gross-margin basis. Profitable on a net basis once cumulative orders cover the $700 one-time setup — typically by the second week if the PT-network soft launch lands as expected.

**Where it becomes uncomfortable:** If sales stall and only 10 orders/mo come in (~$900 revenue / ~$500 gross profit), fixed costs are still covered but Lambert's time isn't getting paid. Decision point at day 30: if < 30 orders by then, double down on cold outbound (template 10C) or reconsider channel mix.

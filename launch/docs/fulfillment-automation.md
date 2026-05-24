# Fulfillment Automation Spec

> Goal: every paid order routes to the right fulfillment path with zero touch from Lambert until packing/shipping.

---

## 1. Decision: 3PL vs In-House at LA Warehouse

| Option | Pros | Cons | Cost |
|---|---|---|---|
| **A. In-house at LA warehouse + part-time person** | Lowest variable cost, total control, integrates with PT ops staff if any | Need a human (4–8 hrs/week to start), warehouse buildout must be done | $20–25/hr × ~8 hr/wk = ~$700/mo at low volume |
| **B. ShipBob LA fulfillment center** | True hands-off, 2-day shipping everywhere, scales infinitely | Per-unit fees stack up, less control, must ship inventory in | $40/mo + ~$3–5 per order + $0.50/unit storage |
| **C. ShipMonk LA** | Similar to ShipBob, slightly cheaper on storage | Same as ShipBob | ~$3–4 per order + storage |
| **D. Local LA 3PL (e.g. SFL Worldwide, Whiplash, Saddle Creek LA)** | Cheaper than national 3PLs, possible cannabis-adjacent comfort | Less Shopify integration, may need manual order export | $2–4 per order varies |

### Recommendation: **Hybrid — Option A as primary, Option B as fallback.**

**Why:** Lambert's warehouse is being built out anyway. A part-time picker/packer at the warehouse (could be the same person handling PT-adjacent ops) at ~$700/mo handles low-volume launch (under ~300 orders/month) at a fraction of 3PL cost. Once volume exceeds 500 orders/month or warehouse staff is overloaded, flip the spillover to ShipBob LA without changing the customer-facing experience.

**Trigger to switch to 3PL:** consistently > 500 orders/mo for 2 months OR Lambert/staff spending > 12 hrs/week on fulfillment.

---

## 2. Shipping Tech Stack

### Primary: **Shopify Shipping** (built into Shopify, no extra app)
- Negotiated USPS + UPS rates (matches ShipStation pricing for SMB volume).
- Print labels directly from Shopify admin (or mobile app).
- Auto-marks order as fulfilled when label printed → triggers shipped email.
- Free.

### Backup: **ShipStation** ($9.99/mo Starter)
- Add only if you need: FedEx integration, multi-warehouse routing, more carrier options, batch label printing > 50/day.
- Skip at launch.

### Hardware (one-time):
| Item | Source | Cost |
|---|---|---|
| Thermal label printer (Rollo or Munbyn) | Amazon | $180 |
| Thermal labels (4×6) — 1000 ct | Amazon | $40 |
| Poly mailers (multiple sizes) | Uline / Amazon | $80 starter assortment |
| Packing tape + dispenser | Uline | $40 |
| Filler (Kraft paper or air pillows) | Uline | $50 |
| Scale (250 lb digital) | Amazon | $60 |
| **Total one-time hardware** | — | **~$450** |

---

## 3. Auto-Routing Rules

These are configured as **automation rules in Shopify Flow** (free on all plans):

```
TRIGGER: Order created and paid

IF order line items include any "Custom" SKU
  → Add tag "needs-quote" → email Lambert → DO NOT fulfill automatically

ELSE IF order line items include any retail-pack SKU (RETAIL-25, RETAIL-100, RETAIL-500)
  → Add tag "retail" → route to LA warehouse fulfillment queue
  → Notify warehouse staff via Slack/Telegram

ELSE IF order subtotal >= $1000 OR units >= 5000
  → Add tag "wholesale-priority" → route to LA warehouse with priority flag
  → Notify Lambert directly via Telegram

ELSE
  → Add tag "standard" → route to LA warehouse fulfillment queue
  → Standard same-day fulfillment SLA
```

**Manual quote orders never auto-fulfill.** Lambert reviews, creates a custom invoice, sends to customer, marks paid, then fulfills.

---

## 4. Inventory Sync

- **Source of truth:** Shopify inventory levels (set once at warehouse intake).
- **Manual decrements:** Shopify auto-decrements on order. No additional system needed for launch.
- **Restocking:** when a container arrives, scan in via Shopify mobile app or bulk-update CSV.
- **Low-stock alert:** Shopify built-in. Threshold: 50 cases. Lambert + warehouse get email.
- **QBO sync:** Shopify → QBO connector posts each order as an Invoice + Payment. Inventory cost tracking lives in Shopify (or a simple spreadsheet for COGS month-end JE) — don't try to make QBO inventory tracking match Shopify; it's a known headache.

---

## 5. Customer Service Automation

| Channel | Tool | SLA target |
|---|---|---|
| On-site chat | Shopify Inbox (mobile + desktop) | Reply within 4 hrs business hours |
| Email | help@thepackguys.com → Gmail / Shopify Inbox | Reply within 1 business day |
| Phone | Twilio number forwarded to Lambert's cell (only for B2B / quote requests) | Voicemail OK |

**Auto-responders set up day 1:**
- New chat → "We're usually here within a few hours. For instant answers, /faq has 25 common questions."
- New email → "Got your message — we reply within 1 business day. Order questions: include your order number. Custom quote: use /quote for fastest turnaround."

**Reduce CS load by pre-empting questions:**
- Order confirmation email includes ship cutoff time so people don't email asking when their order ships.
- Shipping email includes tracking link + delivery ETA so people don't email asking where their package is.
- FAQ covers all 25 most-likely questions.

---

## 6. Returns Automation

**Stock returns (rare, but build the flow):**
- Customer emails help@ → Lambert/staff approves in Shopify admin → Shopify generates return shipping label → emails to customer.
- Returned package arrives → warehouse scans in → Shopify marks "refunded" → Stripe refunds automatically.

**Defective replacements (more common):**
- Customer emails photos → Lambert/staff creates a $0 replacement order in Shopify admin → ships per normal flow.
- No physical return required (cost of return shipping > cost of product).

---

## 7. Payment & Risk

- **Shopify Payments** primary (2.9% + 30¢, 2-day payout to Mercury checking).
- **Fraud filters:** Shopify built-in. Manual review flag on orders > $1,000 from new customers.
- **Chargeback handling:** Shopify auto-prompts evidence upload. Build a template response document with shipping proof + signed delivery confirmation for high-value orders.
- **Net-30 for approved B2B:** Shopify B2B Net Terms app. Auto-generates invoice at order, due 30 days later. Auto-reminders at day 25 + day 31.

---

## 8. Reporting & Alerts (zero-touch monitoring)

**Daily Telegram alert** (via Shopify webhook → Lambert's existing Duke Bot):
- Orders count, revenue, top SKU, anything tagged `needs-quote`

**Weekly email digest** (Shopify Analytics auto-email):
- Conversion rate, AOV, traffic sources, inventory low-stock list

**Monthly QBO P&L** (already part of Lambert's monthly cadence):
- Add the new LLC to the existing /finance audit flow.

---

## 9. Order Volume Capacity (sanity check)

| Stage | Orders/mo | Hrs of human time | Notes |
|---|---|---|---|
| Launch (month 1) | 20–60 | 4–8 hrs/wk | Lambert can absorb |
| Ramp (month 3) | 80–200 | 8–12 hrs/wk | Hire 1 part-time picker/packer ($700/mo) |
| Steady (month 6) | 300–600 | 16–24 hrs/wk | Same part-time person, or upgrade to half-time |
| Scale (month 12) | 800–1500 | Flip to 3PL (ShipBob LA) | Spillover only, keep warehouse for custom-label work |

---

## 10. Total Fulfillment OpEx (monthly, at each stage)

| Stage | Shopify + apps | Person | Materials | 3PL | Total |
|---|---|---|---|---|---|
| Launch | $60 | $0–250 (Lambert) | $50 | $0 | **$110–360/mo** |
| Ramp | $80 | $700 | $150 | $0 | **$930/mo** |
| Steady | $80 | $1,400 | $300 | $0 | **$1,780/mo** |
| Scale | $120 | $1,400 | $400 | $1,500 | **$3,420/mo** |

At 800 orders/mo with avg $80 AOV = $64K revenue, $3,420 fulfillment = 5.3% of revenue. Healthy.

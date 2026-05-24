# The Pack Guys — Shipping & Fulfillment Economics

**Date:** 2026-05-23
**Scope:** Real US shipping/3PL cost validation for an LA-based pre-roll-tube e-commerce brand (thepackguys.com).
**Origin assumed:** Los Angeles, CA (USPS Zone 1 / UPS+FedEx Zone 2 to local).
**SKUs:** 25-pack (~140g, ~5×3.5×2"), 100-pack (~430g, ~7×5×3"), 500-pack (~1.9kg, ~12×8×5"), 1K wholesale case (~3.8kg, ~14×10×8"), 5K+ palletized, 25K+ LTL.

---

## 1. USPS Ground Advantage — Weight-based commercial rates (2026)

Commercial (platform-discount) pricing from LA to each zone band. These are the rates merchants actually pay through Pirate Ship, Shippo, ShipStation, Pitney Bowes, etc. — they are *not* retail.

| Weight | Zone 1-2 (LA metro) | Zone 4 (PHX/LV/DEN) | Zone 6 (CHI/DAL) | Zone 8 (NYC/BOS/MIA) |
|--------|---------------------|---------------------|------------------|----------------------|
| 1 lb   | $4.50               | $5.20               | $6.00            | $6.70                |
| 2 lbs  | $5.30               | $6.40               | $7.80            | $9.10                |
| 5 lbs  | $7.70               | $10.00              | $13.20           | $16.30               |
| 10 lbs | $11.50              | $16.20              | $23.00           | $29.50               |

**Mapping to our SKUs (weight-based GA):**

| SKU | Billable lb | Zone 1-2 | Zone 4 | Zone 6 | Zone 8 |
|-----|-------------|----------|--------|--------|--------|
| 25-pack (140g = 0.31 lb → 1 lb) | 1 lb | $4.50 | $5.20 | $6.00 | $6.70 |
| 100-pack (430g = 0.95 lb → 1 lb) | 1 lb | $4.50 | $5.20 | $6.00 | $6.70 |
| 500-pack (1.9 kg = 4.19 lb → 5 lb) | 5 lb | $7.70 | $10.00 | $13.20 | $16.30 |
| 1K case (3.8 kg = 8.38 lb → 9 lb) | 9 lb | ~$10.80 | ~$15.10 | ~$21.40 | ~$27.40 |

**July 12 2026 alert:** 4-oz and 8-oz price points disappear, dimensions round UP to next whole inch, and the DIM divisor drops from 166 → **139** for any package over 1 cu ft. Average 11.8% increase on GA commercial. Plus the April 26 2026–Jan 17 2027 **8% fuel surcharge** is currently live on top.

---

## 2. USPS Ground Advantage **Cubic** — when small + heavy wins big

This is the single biggest carrier-arbitrage opportunity for our SKUs. Source: official USPS 2026 commercial cubic rate file ([CSV](https://www.usps.com/business/prices/2026/s-ground-advantage-com-cubic.csv)).

**Eligibility:** ≤1 cu ft, ≤20 lb, longest side ≤18" (going to **22"** in July 2026).

| Cubic tier | Zone 1 | Zone 4 | Zone 6 | Zone 8 |
|------------|--------|--------|--------|--------|
| 0.1 cu ft (~173 in³)  | **$7.45** | **$7.99**  | **$9.21**  | **$10.13** |
| 0.2 cu ft (~346 in³)  | $7.82 | $8.34  | $10.66 | $11.84 |
| 0.3 cu ft (~518 in³)  | $8.39 | $9.23  | $12.83 | $14.67 |
| 0.4 cu ft (~691 in³)  | $9.07 | $10.34 | $14.66 | $17.29 |
| 0.5 cu ft (~864 in³)  | $9.59 | $10.93 | $15.70 | $18.90 |

**Crossover analysis vs. weight-based GA:**

| SKU | Volume | Cubic tier | Cubic Zone 8 | Weight Zone 8 | Winner |
|-----|--------|------------|--------------|---------------|--------|
| 25-pack 5×3.5×2 = 35 in³  | 0.020 cu ft → tier 0.1 | $10.13 | $6.70 (1 lb) | **Weight wins** |
| 100-pack 7×5×3 = 105 in³  | 0.061 cu ft → tier 0.1 | $10.13 | $6.70 (1 lb) | **Weight wins** |
| 500-pack 12×8×5 = 480 in³ | 0.278 cu ft → tier 0.3 | $14.67 | $16.30 (5 lb) | **Cubic wins by $1.63** |
| 1K case 14×10×8 = 1,120 in³ | 0.648 cu ft → over 0.5, fails 18" rule **(both sides)** | n/a | $27.40 (9 lb) | Weight only |

**Key insight #1 — Cubic only meaningfully helps the 500-pack on long-zone deliveries** (saves ~$1.50–$3 to Zone 6/8). For the 25- and 100-pack, weight-based GA is already cheaper because the boxes are *light* (<1 lb). The team's assumption that "Cubic is for small heavy boxes" is correct, but our pre-rolls aren't heavy enough at the 25/100 tier for Cubic to pay off.

**Key insight #2 — 1K case fails Cubic on dim AND volume** (14" > 18" is okay, but 0.648 cu ft > 0.5 ceiling and 22-lb cap close). At 8.4 lb actual it goes weight-based. Re-spec'ing to 13×9×7 (819 in³ = 0.474 cu ft) brings it into Cubic 0.5 tier: $18.90 to Zone 8 vs. $27.40 weight — **saves $8.50/shipment**.

---

## 3. UPS Ground (2026 commercial / Daily Rates)

Pulled from UPS 2026 Daily Rate guide and ICC Logistics comparison data. Commercial address rates, no residential add. Add fuel ~18.5% and any DAS/AHS.

| Weight | Zone 2 (LA metro) | Zone 4 | Zone 6 | Zone 8 |
|--------|-------------------|--------|--------|--------|
| 1 lb   | ~$10.50 | ~$11.10 | ~$11.90 | ~$12.52 |
| 2 lbs  | ~$11.00 | ~$11.90 | ~$13.10 | ~$14.20 |
| 5 lbs  | ~$11.95 | ~$12.45 | ~$13.07 | ~$15.30 |
| 10 lbs | ~$13.80 | ~$14.60 | ~$15.55 | ~$16.50 |

**With residential ($6.50) + fuel (18.5%):** add ~$8.70 per residential package. A 5-lb 25-pack to Zone 8 residential = ~($15.30 + $6.50) × 1.185 = **~$25.83 all-in**, vs USPS GA $6.70 (or $6.70 × 1.08 fuel = $7.24). **USPS beats UPS by ~3.6×** on residential e-commerce for our SKUs in every zone, every weight tier under 10 lb.

UPS Ground only wins:
- B2B commercial deliveries >10 lb where USPS GA is hit by 22-lb cap or 130" girth limit
- 1K wholesale cases (9 lb) shipped to commercial addresses Zone 2-4: UPS Ground = $13.80 commercial vs. USPS GA $10.80 — **USPS still cheaper** but tighter
- Multi-piece B2B (≥3 cartons same destination) where UPS Ground rates per piece flatten

**Bottom line:** UPS Ground is a non-starter for retail DTC. Use only for wholesale B2B carton/multi-piece.

---

## 4. FedEx Ground / Home Delivery (2026 list)

| Weight | Zone 2 (LA metro) | Zone 4 | Zone 6 | Zone 8 |
|--------|-------------------|--------|--------|--------|
| 1 lb   | $11.99 | $11.99 | $13.20 | $15.40 |
| 2 lbs  | $12.75 | $12.75 | $14.60 | $17.10 |
| 5 lbs  | $15.25 | $15.25 | $18.80 | $23.90 |
| 10 lbs | $20.60 | $20.60 | $26.80 | $35.70 |

**Add:** Residential surcharge **$6.45/pkg** (Home Delivery), fuel ~20%+, DAS $4.40–$22.75 extended.

FedEx commercial rates (negotiated) typically discount **40–50%** off list. Even at 50% off, FedEx Ground 1-lb commercial to Zone 8 = $7.70 + fuel + residential, still ~2× USPS GA.

FedEx Ground beats USPS only in narrow cases:
- B2B commercial >10 lb where contract discount is heavy
- Multi-piece cartons same destination
- Specific zones where USPS Zone-based pricing is mis-aligned (rare)

**For our SKUs under 10 lb: skip FedEx unless we have a >40% negotiated rate.**

---

## 5. Shopify Shipping discounts (Basic plan)

Verified against Shopify's published commitments:

| Carrier / Service | Max discount across plans | Basic plan reality |
|---|---|---|
| USPS Priority Mail Cubic | up to 88% off retail | **Cubic available only on Shopify, Advanced, Plus** — **NOT Basic** |
| USPS First Class / Ground Advantage | up to 67% off retail | Basic gets ~30–50% off retail; effectively matches Pirate Ship/Shippo commercial rates |
| UPS Ground | up to 38% off retail | Basic gets similar |
| UPS 2nd Day | up to 41% off retail | Basic gets similar |

**Key finding for Basic plan:** Shopify Basic does **NOT** unlock USPS Cubic. To get Cubic pricing (which we just showed saves $1.50–$8.50 per 500-pack/1K case to long zones), we either need:
1. Upgrade to Shopify ($105/mo) — break-even at ~25–30 cubic-eligible long-zone packages/month
2. Use Pirate Ship (free) which offers full Cubic pricing on all accounts and pulls labels via API
3. ShipStation ($9.99–$29/mo)

**Recommendation: route labels through Pirate Ship, not Shopify Shipping.** Same commercial USPS rates, full Cubic access, no plan upgrade required. Connects to Shopify via free integration.

---

## 6. 3PL pricing reality check (LA market)

### ShipBob (verified 2026 pricing)

| Fee | Amount |
|---|---|
| Onboarding/setup | **$975 one-time** |
| Monthly minimum | **$275/mo** fulfillment only |
| Min orders/month | 400 (US) |
| Pick & pack | **$0.30/unit** (increased from $0.25 in 2025) |
| Pallet storage | **$40/month** (~60 cu ft) = **$0.67/cu ft/mo** |
| Shelf storage | **$10/month** (~7.1 cu ft) = **$1.41/cu ft/mo** |
| Bin storage | **$5/month** (~0.77 cu ft) = **$6.49/cu ft/mo** |
| Receiving | **$35/hr first 2 hrs, $45/hr after** per WRO (not per container, not per cu ft) |
| Returns | $3 per US return |
| Shipping markup | 15–30% over carrier rates |
| Credit-card surcharge | 3% on all invoices |
| B2B/FBA surcharge | $150–$200 per order |

**The team's working assumption was wrong.** ShipBob does **NOT** charge $35/cu ft receiving. It's **$35/hr** time-based. So a single 40-ft container received in 8 labor hours = ~$320 (2×$35 + 6×$45 = $340), not $83,000. The receiving fee panic is unfounded. *But* the 3% credit-card surcharge and B2B/FBA $150–$200/order surcharge are the hidden killers that the team should price in.

### ShipMonk

- Pick fee: **$2.50 first item, $0.50 each add'l** (with volume discounts down to $1.80)
- Inbound receiving: **flat first 2 hrs, then hourly**
- Storage: $25/pallet/mo; ~$1/small bin
- Monthly minimum: **$250** (or your storage, whichever higher)
- Not publishing detailed receiving/container rates publicly

### DCL Logistics LA, Saddle Creek (Buena Park/Ontario), Whiplash (Ryder)

None publish rate cards. Industry benchmarks for SoCal 3PLs (which run 30-50% premium over Inland Empire / secondary markets):

| Line item | LA benchmark range |
|---|---|
| Pick & pack | $2.00–$5.00 per order + $0.50–$1.50 per add'l item |
| Receiving | $25–$75 per pallet OR $0.25–$0.75 per unit OR $150–$400 flat per 40' container |
| Storage (cu ft) | $0.50–$2.00/cu ft/mo (shelf), $0.40–$1.00/cu ft/mo (pallet) |
| Storage (pallet) | $20–$45/pallet/mo |
| Monthly minimum | $500–$2,500 |
| Setup | $250–$1,500 |

### Cannabis-adjacent exposure

No traditional 3PL (ShipBob, ShipMonk, Whiplash, DCL, Saddle Creek) will touch *cannabis* product. But our SKU is **empty packaging** — explicitly not regulated, no THC/CBD content. We're a general e-commerce brand. Disclose only as "plastic packaging components / preroll accessories"; do not market the 3PL onboarding form with "cannabis" language. Marijuana Packaging.com, PackHit, SafeCare Packaging are cannabis-friendly options if a traditional 3PL ever balks, but their fulfillment rates are typically higher.

---

## 7. Full-container intake economics (40' HQ = ~2,390 cu ft)

**The "$83K receiving fee" fear is debunked** (see ShipBob analysis above — it's hourly, not per-cu-ft).

Realistic 40' HQ intake costs across paths:

| Path | Container intake cost | Notes |
|---|---|---|
| ShipBob LA (palletize at port + receive) | ~$300–$500 receiving + ~$400–$800 drayage | Need to palletize first; ShipBob receives palletized freight only |
| Independent transload (Olimp / Waterfront / Price Transfer LA) → palletized → ship to 3PL | $400–$900 transload + $250–$500 LTL to 3PL | Cleanest path |
| Local LA 3PL direct container drop | $150–$400 unload + included pallet receiving | If 3PL has dock + forklift access |
| Self-storage + manual transfer | $500/mo unit + $200 forklift + labor | Lowest cash, highest labor — viable for first container |

**Recommended path for 1.3M-unit (one full 40' HQ) intake:**
1. Use a port transloader (Olimp, Waterfront Logistics, or Price Transfer) at Port of LA/Long Beach: ~$400–$800 to unload, palletize, and shrink-wrap (~26 pallets out of one 40').
2. LTL or local drayage those pallets to chosen 3PL (~$300–$600 within SoCal).
3. 3PL receives palletized inventory at standard pallet receiving rates (~$25–$40/pallet × 26 = $650–$1,040).
4. **Total all-in container intake: $1,350–$2,440** — not $83K. Roughly **$0.001–$0.002 per tube** receiving cost.

---

## 8. Packaging optimization

### 25-pack (target retail $12.99)

Current spec (5×3.5×2" small box, 50g mailer): ships 1 lb, USPS GA $4.50 Zone 1, $6.70 Zone 8.

**Optimization: switch to poly mailer.**
- 6×9" or 7.5×10.5" Uline poly mailer (S-3352 family): **~$0.07/unit** at bulk
- 25 tubes can fit in a 6×9×2" form when stacked (loose fit ok — pre-rolls tubes don't need cushioning)
- Drops package weight ~30g, dims ~5×4×2 = 40 in³
- Same USPS GA price (still 1 lb tier) — **no shipping savings**
- But: mailer cost drops from $0.30-$0.50 box → **$0.07 mailer**. Saves **~$0.30–$0.40/order on packaging**.
- Caveat: mailers feel cheap — for a brand experience, use a small kraft box; for cost optimization on commodity reorders, mailer wins.

### 100-pack (target retail $29.99)

Current spec 7×5×3" = 105 in³ = 0.061 cu ft = Cubic tier 0.1.
- Weight tier wins: 1 lb GA = $4.50–$6.70.
- Optimization: keep current spec. Mailer not practical for 100 tubes (rigid form needed).
- ULINE 7×5×3 small box ~$0.30/each at 500-qty.

### 500-pack (target retail $84.99)

Current spec 12×8×5" = 480 in³ = 0.278 cu ft = **Cubic tier 0.3**.
- Cubic Zone 8 = $14.67 vs weight $16.30 → **Cubic saves $1.63 to East Coast**.
- **Optimization: redim to 11×8×5 = 440 in³ = 0.255 cu ft** → still tier 0.3, same cost
- Or push smaller: 10×7×4.5 = 315 in³ = 0.182 cu ft → **tier 0.2** → Zone 8 = **$11.84** (saves $4.46)
- **Action item:** test whether 500 tubes fits 10×7×4.5" (315 in³, ~21 in³ per 10 tubes vs tube physical 40 in³ each → no, 10×7×4.5 fits ~7-8 tubes only; **480 in³ box is the floor**). Stick with tier 0.3.

### 1K wholesale case (target $159.99)

Current spec 14×10×8 = 1,120 in³ = 0.648 cu ft. **Exceeds Cubic 0.5 ceiling AND 18" limit only matters for cubic.** Goes weight-based at 9 lb.
- USPS GA 9 lb Zone 8 = ~$27.40
- **Re-spec to 13×9×7 = 819 in³ = 0.474 cu ft = tier 0.5**: Cubic Zone 8 = **$18.90** (saves **$8.50/shipment**)
- 1,000 tubes occupy ~26,000 cm³ = ~1,586 in³ in physical tube volume; with packing inefficiency ~75% → need ~2,100 in³ in carton. **13×9×7 = 819 in³ is too small for 1K**. Realistic minimum = 16×11×8 = 1,408 in³ (still over 0.5 ceiling).
- **Conclusion: 1K case cannot hit Cubic. Stays weight-based.** Optimize by negotiating commercial UPS Ground contract for B2B addresses ($13.80 Zone 2 commercial) — saves ~$13/shipment vs USPS GA Zone 8.

### Mailer/box sourcing

| Vendor | 6×9 poly mailer (1K qty) | 5×3.5×2 small box (500 qty) | 12×8×5 box (250 qty) | 14×10×8 box (100 qty) |
|---|---|---|---|---|
| ULINE | $0.07 | $0.42 | $1.05 | $1.85 |
| EcoEnclose | $0.12 (recycled) | $0.55 | $1.30 | $2.20 |
| Packaging broker (Salazar, Pacific Crown Packaging, JCS Industries — all LA) | $0.05–$0.06 | $0.32–$0.38 | $0.85–$0.95 | $1.55–$1.70 |

**Action: switch from ULINE/EcoEnclose retail accounts to an LA packaging broker for >5K-unit reorders. Saves 25–35% on box COGS.**

---

## 9. LTL freight (25K+ unit wholesale)

Sourced from Sunset Pacific, Freightera, Freightquote benchmarks. **Single pallet from LA, 2026 mid-year:**

| Lane | Single pallet (~500 lb) | 2 pallets | Full LTL (10 pallet, ~5K lb) |
|---|---|---|---|
| LA → Oakland (Bay Area) | $195–$260 | $290–$380 | $750–$950 |
| LA → Las Vegas | $210–$280 | $310–$400 | $850–$1,100 |
| LA → Phoenix | $230–$310 | $340–$430 | $950–$1,250 |
| LA → Denver | $310–$420 | $480–$620 | $1,400–$1,800 |
| LA → NYC | $580–$780 | $850–$1,150 | $2,400–$3,200 |

**25K-unit shipment math:** 25K tubes × 3.5g = 87.5 kg + cartons + pallet wood = ~110 kg = 243 lb. Fits on ONE pallet, fills ~60% of pallet volume. Use single-pallet LTL rate.

**For 25K to NYC: ~$680 ÷ 25,000 = $0.027/unit shipping** — ~25% of the cost of shipping the same units in retail 25-packs. **Wholesale freight is dramatically cheaper per tube** than DTC; sales mix toward B2B is a massive margin lever.

**Best LTL brokers for SMB cannabis-adjacent:** Freightquote (KC Southern), Warp, FreightRun, FlexPort SMB. Avoid: large 3PL LTL captives (ShipBob Freight, etc.) which markup 20-40%.

---

## 10. Ship-cost-per-order sensitivity (baked-in free shipping)

Assumptions: COGS per tube = $0.08, packaging = $0.30–$1.85, fulfillment pick+pack = $1.50 (in-house) or $3 (3PL), payment processing 2.9%+$0.30. Target gross margin ≥40% pre-shipping.

| SKU | Retail | COGS+pack+fulfill | Avail for ship+GM | Ship breakeven (40% GM) | Ship breakeven (20% GM) |
|---|---|---|---|---|---|
| 25-pack | $12.99 | $2 + $0.07 + $1.50 = $3.57 | $9.42 | $4.22 | $7.02 |
| 100-pack | $29.99 | $8 + $0.30 + $1.50 = $9.80 | $20.19 | $8.20 | $14.20 |
| 500-pack | $84.99 | $40 + $1.05 + $1.50 = $42.55 | $42.44 | $8.44 | $25.44 |
| 1K case | $159.99 | $80 + $1.85 + $1.50 = $83.35 | $76.64 | $12.64 | $44.64 |

**Reality check:**
- **25-pack at $12.99 + free ship Zone 8 = $6.70 shipping → GM ~21%.** Tight but viable. Free-ship works only via USPS GA. If we use UPS Ground residential ($21.80 all-in to Zone 8) → **GM goes NEGATIVE -$10**.
- **100-pack at $29.99 free-ship Zone 8 = $6.70 ship → GM 45%.** Comfortable. Strong product.
- **500-pack at $84.99 free-ship Zone 8 Cubic = $14.67 → GM 33%.** Good.
- **1K wholesale case at $159.99 free-ship Zone 8 = $27.40 → GM 31%.** Acceptable but expose to B2B real-time shipping for better margin.

**B2B (1K+ cases): charge real-time shipping.** Wholesale buyers expect it, they have freight accounts of their own, they don't anchor to free-ship. Conversion impact is near-zero vs DTC where free-ship lifts conversion ~15–20%.

---

## 11. Hidden costs the team is probably missing

| Hidden cost | Carrier | 2026 amount | Impact on us |
|---|---|---|---|
| Address correction | USPS | $0 (returned undeliverable) | Inventory loss risk |
| Address correction | UPS | ~$23/pkg | Avoid UPS for residential |
| Address correction | FedEx | $24/pkg (up 6.25%) | Avoid FedEx for residential |
| Residential delivery surcharge | USPS GA | $0 (built in) | USPS huge advantage |
| Residential delivery surcharge | UPS Ground | $6.50/pkg | Kills UPS for DTC |
| Residential delivery surcharge | FedEx Ground | $6.45/pkg | Kills FedEx for DTC |
| Delivery Area Surcharge (DAS) | UPS/FedEx | $4.20–$22.75 (extended rural) | Watch rural DTC orders |
| Fuel surcharge | UPS | 18.5% minimum | Applied to base + accessorials |
| Fuel surcharge | FedEx Ground | ~20%+ | Applied to base + accessorials |
| Fuel surcharge | USPS | 8% (Apr 26 2026–Jan 17 2027) | Lower than competitors |
| DIM weight | UPS/FedEx | divisor 139 (all packages) | Our boxes density: 25-pack = 1 lb / 0.020 cu ft = 50 lb/cu ft → way over DIM trigger, no DIM penalty. **All our boxes are dense; no DIM hit.** |
| DIM weight | USPS GA | divisor 166 (drops to 139 July 2026) for >1 cu ft | Our 1K case is under 1 cu ft if re-spec; safe |
| Saturday delivery | UPS/FedEx | $16–$18/pkg | Don't offer |
| Signature Required | UPS/FedEx | $6.55–$7.20 / $8.30 indirect | Only for B2B high-value (1K+ cases) |
| Additional Handling | FedEx | $29.50–$40.75 | Trigger: longest side >48". Doesn't hit us. |
| Pickup fee | UPS daily | included if on schedule | Need daily pickup contract |
| Pickup fee | USPS | free (carrier pickup) | Use it |
| Credit card surcharge | ShipBob | **3% on all invoices** | Pay by ACH if going ShipBob |
| B2B/FBA surcharge | ShipBob | **$150–$200/order** | Wholesale via ShipBob is brutal — fulfill in-house |

---

## 12. Final recommended shipping strategy

### Phase 1 — Pre-launch through 1K orders/month (in-house, garage/co-warehouse)

- **Carrier mix:**
  - DTC 25-pack / 100-pack: **USPS Ground Advantage (weight-based) via Pirate Ship.** All zones, residential. Avg $4.50–$6.70/order.
  - DTC 500-pack: **USPS Ground Advantage Cubic via Pirate Ship.** Saves $1.50–$3 to Zone 6/8.
  - DTC 1K case: **USPS Ground Advantage (weight-based) via Pirate Ship.** ~$11–$27 depending on zone.
  - B2B 1K case: **UPS Ground commercial via Pirate Ship + Shopify integration**, real-time shipping at checkout (not free).
  - 5K+ wholesale: **Single-pallet LTL via Freightquote / Warp**.
- **Packaging:**
  - 25-pack: 6×9 poly mailer ($0.07) OR small kraft box ($0.42)
  - 100-pack: 7×5×3 small carton ($0.30)
  - 500-pack: 12×8×5 carton kept at tier 0.3 Cubic-eligible ($1.05)
  - 1K case: 16×11×8 carton ($1.85), accepts weight-based GA
- **Bake "free shipping" into 100-pack ($29.99) and 500-pack ($84.99) only.** Charge real-time on 25-pack OR set $15 min order for free ship to protect margin. B2B charges real-time.

### Phase 2 — 1K–5K orders/month (transition to 3PL or hire fulfillment lead)

- Run a 3-quote process: ShipBob LA, ShipMonk LA, one local LA 3PL via Fulfill.com (DCL or Saddle Creek Buena Park).
- **Negotiate on these levers (in order of impact):** (1) waive credit-card 3% surcharge, (2) drop B2B per-order surcharge, (3) cap pick-pack at $0.30/unit no add'l, (4) free first-2-hours receiving per WRO.
- Switch packaging sourcing from ULINE → LA packaging broker (Salazar / Pacific Crown / JCS) once volume hits 10K boxes/year.

### Phase 3 — Container intake (1.3M units / full 40' HQ)

- Use port transloader (Olimp, Waterfront, Price Transfer) at Port of LA: **~$1,400–$2,400 all-in**.
- Palletize at port (26 pallets out of one 40' HQ), then LTL to 3PL.
- ShipBob receives 26 pallets at $25–$40/pallet = $650–$1,040 receiving, NOT $83K.
- Total receiving cost per tube: **~$0.001–$0.002**.

### Cost-per-order summary (Phase 1, in-house)

| SKU | Retail | All-in COGS+pack+ship Zone 8 | GM |
|---|---|---|---|
| 25-pack | $12.99 | $3.57 + $6.70 = $10.27 | **21%** |
| 100-pack | $29.99 | $9.80 + $6.70 = $16.50 | **45%** |
| 500-pack | $84.99 | $42.55 + $14.67 = $57.22 | **33%** |
| 1K case (B2B) | $159.99 | $83.35 + real-time ship | **48%+** |

---

## Sources

- [USPS Ground Advantage CSV 2026 — commercial cubic rates](https://www.usps.com/business/prices/2026/s-ground-advantage-com-cubic.csv)
- [USPS Ground Advantage Rates 2026 — I'd Ship That](https://idshipthat.app/shipping-rates/usps-ground-advantage/)
- [USPS Ground Advantage Cubic — Pirate Ship](https://www.pirateship.com/usps/ground-advantage-cubic)
- [USPS 2026 Rate Hikes — Warp Speed](https://gowarpspeed.com/blog/usps-2026-rate-hikes)
- [USPS to Increase Ground Advantage Commercial Rates by 11.8% — Transimpact](https://transimpact.com/blog/usps-rate-to-increase-ground-advantage-commercial-rates-by-11.8)
- [USPS Cubic Pricing — Stamps.com](https://www.stamps.com/usps/cubic-pricing/)
- [USPS Shipping Rate Charts — EasyPost](https://www.easypost.com/usps-rate-chart/)
- [USPS Cubic Pricing — EasyPost](https://www.easypost.com/cubic-pricing/)
- [USPS Shipping Rates 2026 — atoship](https://atoship.com/blog/usps-shipping-rates-2026)
- [UPS 2026 Daily Rates PDF](https://assets.ups.com/adobe/assets/urn:aaid:aem:356d938a-4f0a-4c71-b50e-bdd890f50b47/original/as/daily-rates-us-en.pdf)
- [UPS 2026 Small Business Rate Guide PDF](https://assets.ups.com/adobe/assets/urn:aaid:aem:bbf2553c-15e5-4b2d-abcd-b7445b13daa0/original/as/small-business-rate-guide-us-en.pdf)
- [FedEx Standard List Rates 2026 PDF](https://www.fedex.com/content/dam/fedex/us-united-states/services/FedEx_Standard_List_Rates_2026.pdf)
- [FedEx Ground/Home Delivery Rates 2026 — I'd Ship That](https://idshipthat.app/shipping-rates/fedex-ground/)
- [FedEx 2026 Surcharge & Fee Changes PDF](https://www.fedex.com/content/dam/fedex/us-united-states/services/surcharge_and_fee_changes_2026.pdf)
- [2026 Parcel Surcharges Survival Guide — Pro Fulfill](https://www.profulfill.com/blog/2026-last-mile-surcharge-survival-guide)
- [FedEx vs UPS Residential Surcharge 2026 — Pro Fulfill](https://www.profulfill.com/blog/2026-fedex-ups-residential-surcharge-breakdown)
- [Shopify Shipping USPS Discounts](https://www.shopify.com/shipping/usps)
- [Shopify Shipping UPS Discounts](https://www.shopify.com/shipping/ups)
- [Save 88% on USPS, UPS, DHL via Shopify Shipping — AdsX](https://www.adsx.com/blog/shopify-shipping-labels-save-88-percent)
- [ShipBob Pricing 2026 Breakdown — Simpl Fulfillment](https://www.simplfulfillment.com/breakdowns/shipbob-pricing)
- [ShipBob Pricing Complete Fee Structure 2026 — CheckThat.ai](https://checkthat.ai/brands/shipbob/pricing)
- [ShipBob Storage & Pricing — ShipBob Support](https://support.shipbob.com/s/article/ShipBob-Storage)
- [ShipBob Freight FAQs](https://support.shipbob.com/s/article/Freight-FAQs)
- [ShipMonk Pricing](https://www.shipmonk.com/pricing)
- [3PL Pricing Guide 2026 — Worldwide Logistics](https://worldwidelogisticsltd.com/2026/02/10/3pl-cost-guide-what-youll-actually-pay-in-2026/)
- [3PL Fulfillment Cost Breakdown 2026 — Catalist AI](https://catalistai.com/blog/3pl-fulfillment-cost-breakdown-2026/)
- [3PL Companies in Los Angeles — Fulfill.com](https://www.fulfill.com/3pls/los-angeles-ca)
- [Los Angeles 3PL — Easyship](https://www.easyship.com/ecommerce-fulfillment/3pl-fulfillment-los-angeles-usa)
- [Saddle Creek Logistics LA / Buena Park](https://www.sclogistics.com/our-network/locations/buena-park-california/)
- [DCL Logistics](https://dclcorp.com/)
- [Whiplash (Ryder E-commerce) Reviews](https://www.warehousingandfulfillment.com/reviews/ryder-e-commerce-by-whiplash/)
- [LA Transloaders — Commtrex](https://www.commtrex.com/transloading/ca/los-angeles.html)
- [Olimp Warehousing LA Transloading](https://olimpwarehousing.com/service-locations/us-california/los-angeles/transloading-drayage/)
- [Freightquote — Los Angeles Lanes](https://www.freightquote.com/freight/rates/metro/los-angeles/)
- [Sunset Pacific LA Freight](https://sunsetpacific.com/freight-shipping-quotes-to-from-los-angeles-ca/)
- [DIM Weight 2026 — Sifted](https://sifted.com/resources/2025-2026-fedex-ups-changes-how-dim-rounding-and-cubic-volume-rules-will-impact-your-costs/)
- [DIM Weight Divisor 139 2026 — Scale Blog](https://scaleblog.com/what-is-dimensional-weight-shipping/)
- [Marijuana Packaging](https://marijuanapackaging.com/)
- [ULINE Poly Mailers](https://www.uline.com/Grp_191/Poly-Mailers)
- [EcoEnclose High-Volume Mailer Quote](https://www.ecoenclose.com/mailer-quote)

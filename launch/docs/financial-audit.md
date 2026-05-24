1.# Preroll Tube E-Commerce Startup Financial Audit

Date: 2026-05-23  
Prepared as an independent CFO / FP&A audit  
Scope: `china-supplier-setup.md`, `capability-reassessment.md`, `site-spec.md`, and `spend-strategy.md`

## 1. Executive Summary

The startup can have attractive product economics, especially in Shopify retail and Amazon FBA. The current plan, however, is not financeable as written. It mixes incompatible assumptions for supplier payment timing, tube cube, ShipBob receiving/storage, wholesale freight treatment, and CAC. The biggest failure is not gross margin. The biggest failure is working capital.

Top five errors:

1. **The container/carton volume math in the working assumptions is off by roughly 8x-10x.** A 116mm x 21mm tube physically occupies about **0.040 liters of cylinder volume** before carton void. A 1,000-unit carton cannot be 0.0063 m3. A realistic 1,000-unit carton is closer to **0.045-0.060 m3**, or **1.6-2.1 cu ft**. Therefore 1.3M tubes are roughly **58-78 m3 packed**, not 8 m3. The document's 52 m3 figure is not high; it is actually plausible and may be low after cartons.

2. **ShipBob receiving/storage economics are far worse than stated.** If 1,000 tubes are about 1.6-2.1 cu ft, then 100 cases are about **160-210 cu ft**, not 12 cu ft. At $35/cu ft, receiving one 100-case replenishment costs **$5,600-$7,350**, not $420. Weekly 100-case replenishment would be **$291K-$382K/year**, not $5K/year. This breaks the stated Path A cost model.

3. **Supplier payment timing is materially wrong.** `spend-strategy.md` treats supplier Net-60 as "$0 cash up front", but `china-supplier-setup.md` says 30% deposit and 70% balance net-60 from BL. On a $52,000 product order, Day 0 deposit is **$15,600**, before bond, broker, and insurance. The plan is short about **$14K-$17K immediately** and still faces a **$36,400 Day 60 balance**.

4. **Wholesale margin percentages likely include freight despite saying shipping is charged at checkout.** At $0.05/unit landed COGS, Tier 3 25K at $1,625 has about **17% margin before freight**, not 8%. Tier 4 50K at $3,000 has about **11% margin before freight**, not breakeven. If freight is absorbed, those tiers can become marginal or negative. The GM table needs two columns: before freight and after absorbed freight.

5. **The flat $30 CAC kill-switch is financially wrong.** Shopify 100-pack contribution margin is about **$16.02/order** at $0.05 COGS. With a 1.2x repeat factor, gross-margin LTV is only **$19.22**. A $30 retail CAC loses money even after repeat. Wholesale can tolerate $30-$60 CAC, but retail cannot.

Biggest cash risk: **placing a full 1.3M-unit PO without committed working capital.** The business needs funding availability for the full import cycle, not just a Shopify launch budget. Minimum inventory funding should be **$50K-$65K** before PO, or supplier terms must be renegotiated.

## 2. Section-by-Section Findings

### 2.1 Container Volume Math

**Check: Can 1.3M 116mm x 21mm CR tubes fit in a 40HQ container?**  
Verdict: ⚠️ Plausible, but tight. The 52 m3 document figure is not obviously high; it is close to raw tube displacement.

The core mistake is treating 1,000 tubes as fitting into a 220mm x 220mm x 130mm carton. That carton volume is:

```text
0.22m x 0.22m x 0.13m = 0.006292 m3
0.006292 m3 = 6.292 liters
```

But one tube's geometric cylinder envelope is:

```text
Diameter = 21mm = 0.021m
Radius = 0.0105m
Length = 116mm = 0.116m
Cylinder volume = pi x r^2 x length
= 3.1416 x (0.0105^2) x 0.116
= 0.00004016 m3/tube
= 0.04016 liters/tube
```

For 1,000 tubes:

```text
0.00004016 m3 x 1,000 = 0.04016 m3
= 40.16 liters
```

That is physical cylinder volume before carton void. A 6.3-liter carton cannot contain 40 liters of tube cylinder envelope. The 220mm x 220mm x 130mm carton would fit about one 10 x 10 standing layer:

```text
10 tubes x 10 tubes = 100 tubes
Footprint: 10 x 21mm = 210mm by 210mm
Height: about 116mm-121mm
```

To fit 1,000 standing tubes, the carton needs 10 such layers, or a much larger footprint. A simple square-grid carton estimate is:

```text
10 tubes wide x 10 tubes deep x 10 tube-length layers
Width: 10 x 21mm = 210mm
Depth: 10 x 21mm = 210mm
Height: 10 x 116mm = 1,160mm before carton allowance
Approx carton: 220mm x 220mm x 1,200mm
Volume: 0.22 x 0.22 x 1.20 = 0.0581 m3 per 1,000
```

A more efficient hex-packed estimate starts from the raw cylinder volume and divides by circle packing efficiency:

```text
Best circle packing efficiency: about 90.7%
0.04016 m3 / 0.907 = 0.0443 m3 per 1,000 before carton overhead
Add 10%-20% carton/void allowance: 0.049-0.053 m3 per 1,000
Conservative carton range: 0.045-0.060 m3 per 1,000
```

For 1.3M tubes:

```text
1,300 cartons x 0.045 m3 = 58.5 m3
1,300 cartons x 0.053 m3 = 68.9 m3
1,300 cartons x 0.060 m3 = 78.0 m3
```

A 40HQ internal cube is roughly:

```text
12.03m x 2.35m x 2.69m = 76.0 m3
```

Practical usable volume may be below the theoretical 76 m3 because of carton geometry, loading loss, bracing, and dunnage. Therefore:

- At **0.045-0.053 m3/carton**, 1.3M units are plausible in a 40HQ.
- At **0.060 m3/carton**, 1.3M units are at or above practical capacity.
- If palletized, the load may not fit efficiently.

Weight check:

```text
1,300,000 tubes x 3.5g = 4,550 kg
```

Weight is fine against a 40HQ payload around 26,000 kg. Volume is the constraint.

**Audit finding:** ⚠️ 1.3M tubes in a 40HQ is plausible only if the supplier packs efficiently and likely floor-loads cartons. The **52 m3** figure should not be flagged as high. It should be treated as a supplier packing-list number that must be verified before any 3PL cost model is finalized.

### 2.2 Per-Unit Landed COGS

**Scenario A: $0.04 includes duty.**  
Verdict: ✓ The arithmetic checks.

```text
Product: 1,300,000 x $0.04 = $52,000
Broker midpoint:               $300
Bond midpoint:                 $700
Insurance:                     $260
Drayage midpoint:              $550
Unload:                        $300
Total:                     $54,110
Per unit: $54,110 / 1,300,000 = $0.04162
```

The document's $0.0415 duty-in landed COGS is arithmetically reasonable if the $0.04 quote truly includes duty or captures the duty burden.

**Scenario B: duty not included in $0.04.**  
Verdict: ✓ Directionally right; ⚠️ duty estimate is slightly low.

If FOB is about $0.028/unit:

```text
FOB value: 1,300,000 x $0.028 = $36,400
Duty: $36,400 x 30.3% = $11,029
Ocean freight estimate: $4,000
Broker/bond/insurance/drayage/unload: $2,110
Total: $36,400 + $11,029 + $4,000 + $2,110 = $53,539
```

If the $0.04 quote is the product/import base and duty is added separately:

```text
Base: 1,300,000 x $0.04 = $52,000
Duty add: about $10,000-$11,800
Other import costs: about $2,110
Total: about $64,110-$65,910
Per unit: $64,000 / 1,300,000 = $0.04923
```

If FOB is closer to $0.03:

```text
FOB: 1,300,000 x $0.03 = $39,000
Duty: $39,000 x 30.3% = $11,817
```

**Audit finding:** ✓ Use **$0.05/unit** as the operating-case COGS and **$0.06/unit** as the downside case. Do not price wholesale off $0.0415 unless duty treatment is confirmed in writing by the broker.

### 2.3 DTC Retail Pricing: Shopify 100-Pack at $29.99

Verdict: ✗ The stated Shopify GM appears overstated by about $1.93/order.

Arithmetic at $0.05 COGS:

```text
Revenue:                         $29.99
COGS: 100 x $0.05 =               $5.00
Packaging/mailer:                 $0.80
USPS Ground Advantage average:    $7.00
Shopify Payments: 2.9% x $29.99 + $0.30 = $1.17
Total variable cost:             $13.97
Contribution margin: $29.99 - $13.97 = $16.02
Contribution margin %: $16.02 / $29.99 = 53.4%
```

The stated $17.95 margin implies shipping of about $5.07:

```text
$29.99 - $17.95 = $12.04 total cost
$12.04 - $5.00 COGS - $0.80 packaging - $1.17 fee = $5.07 shipping
```

But `site-spec.md` uses $7.00 for the 100-pack. The $17.95 figure uses the wrong shipping assumption.

**Audit finding:** ✗ Correct Shopify 100-pack margin to **$16.02/order at $0.05 COGS**. At $0.04 COGS it is **$17.02**, not $17.95.

### 2.4 Wholesale Tier Math

Verdict: ⚠️ Tier 1 can reconcile if fulfillment is included. Tiers 3-4 conflict with the statement that shipping is charged at checkout.

Wholesale assumptions:

```text
COGS: $0.05/unit
Payment fee: 2.9% + $0.30
Shipping: charged to customer, therefore excluded from product GM
```

**Tier 1: 1,000 units at $85.**

```text
Revenue: $85.00
COGS: 1,000 x $0.05 = $50.00
Payment fee: 2.9% x $85 + $0.30 = $2.765
3PL/handling estimate: $8.00
Margin: $85 - $50 - $2.765 - $8 = $24.235
GM%: $24.235 / $85 = 28.5%
```

The stated 29% GM is reasonable only if roughly $8 of handling/non-freight fulfillment is included.

**Tier 2: 5,000 units at $375.**

```text
Revenue: $375
COGS: 5,000 x $0.05 = $250
Payment fee: 2.9% x $375 + $0.30 = $11.175
3PL handling estimate: $20
Margin: $375 - $250 - $11.175 - $20 = $93.825
GM%: $93.825 / $375 = 25.0%
```

To get 20% GM:

```text
Target margin: $375 x 20% = $75
Allowed cost: $375 - $75 = $300
Other cost after COGS/payment: $300 - $250 - $11.175 = $38.825
```

That is plausible if handling/admin allocation is heavier, but it needs to be stated.

**Tier 3: 25,000 units at $1,625.**

```text
Revenue: $1,625
COGS: 25,000 x $0.05 = $1,250
Payment fee: 2.9% x $1,625 + $0.30 = $47.425
3PL handling estimate: $50
Margin before freight: $1,625 - $1,250 - $47.425 - $50 = $277.575
GM%: $277.575 / $1,625 = 17.1%
```

To get 8% GM:

```text
Target margin: $1,625 x 8% = $130
Allowed cost: $1,625 - $130 = $1,495
Other cost after COGS/payment: $1,495 - $1,250 - $47.425 = $197.575
```

The missing $198 looks like freight or heavy warehouse allocation. If freight is charged at checkout, it does not belong in product GM.

**Tier 4: 50,000 units at $3,000.**

```text
Revenue: $3,000
COGS: 50,000 x $0.05 = $2,500
Payment fee: 2.9% x $3,000 + $0.30 = $87.30
3PL handling estimate: $75
Margin before freight: $3,000 - $2,500 - $87.30 - $75 = $337.70
GM%: $337.70 / $3,000 = 11.3%
```

If the company absorbs $450 LTL freight:

```text
$3,000 - $2,500 - $87.30 - $75 - $450 = -$112.30
GM%: -3.7%
```

**Audit finding:** ✗ The wholesale table must show two versions: **contribution before freight** and **contribution after absorbed freight**. The current "breakeven" label is misleading.

### 2.5 Amazon FBA 100-Pack at $39.99

Verdict: ✓ Marketplace contribution math checks; ⚠️ "net margin" is the wrong label.

```text
Revenue:                         $39.99
FBA fee:                         $5.40
Referral fee: 15% x $39.99 =      $6.00
COGS: 100 x $0.05 =               $5.00
Packaging:                       $1.50
Total direct cost:               $17.90
Contribution: $39.99 - $17.90 =  $22.09
Contribution %: $22.09 / $39.99 = 55.2%
```

This is contribution before PPC, inbound FBA freight, returns, storage, insurance allocation, and Seller Central subscription allocation.

With $3.00 PPC and $0.50 inbound freight:

```text
$22.09 - $3.00 - $0.50 = $18.59
$18.59 / $39.99 = 46.5%
```

**Audit finding:** ⚠️ Call this **55% pre-ad contribution margin**, not net margin.

### 2.6 3PL Cost Stress Test: Path A Hybrid

Verdict: ✗ Path A's stated receiving and storage costs are not credible under correct tube cube.

Use the corrected carton range:

```text
1,000 tubes = 0.045-0.060 m3
0.045 m3 x 35.3147 = 1.59 cu ft
0.060 m3 x 35.3147 = 2.12 cu ft
```

100-case replenishment:

```text
100 cases x 1.59 cu ft = 159 cu ft
100 cases x 2.12 cu ft = 212 cu ft
Receiving at $35/cu ft:
159 x $35 = $5,565
212 x $35 = $7,420
```

The document's "100 cases = about 12 cu ft" is wrong by roughly:

```text
159 / 12 = 13.25x
212 / 12 = 17.67x
```

Annual receiving:

```text
Weekly 100-case replenishment:
$5,565 x 52 = $289,380/year
$7,420 x 52 = $385,840/year

Monthly 100-case replenishment:
$5,565 x 12 = $66,780/year
$7,420 x 12 = $89,040/year
```

To get $5,000/year receiving at $35/cu ft:

```text
$5,000 / $35 = 142.9 cu ft/year
At 1.59-2.12 cu ft per 1K case:
142.9 / 2.12 = 67 cases/year
142.9 / 1.59 = 90 cases/year
Capacity: 67,000-90,000 tubes/year
At 100 tubes/order: 670-900 100-pack orders/year
```

That is **annual** volume, not weekly or monthly scale.

Storage example at 200,000 tubes:

```text
200 cases x 1.59 cu ft = 318 cu ft
200 cases x 2.12 cu ft = 424 cu ft
Storage at $5/cu ft/mo:
318 x $5 = $1,590/mo
424 x $5 = $2,120/mo
```

The stated $200/month storage implies:

```text
$200 / $5 = 40 cu ft
40 cu ft / 1.59-2.12 cu ft per case = 19-25 cases
19,000-25,000 tubes
At 100 tubes/order = 190-250 orders of inventory
```

**Audit finding:** ✗ The hybrid model needs to be redesigned. ShipBob should not hold master-carton bulk at these rates. It should receive finished DTC-ready pack inventory only, or the company needs a different 3PL/warehouse pricing model.

### 2.7 Year 1 Revenue Projection Stress Test

Verdict: ⚠️ The revenue arc is possible only with immediate wholesale conversion or Amazon traction. It is too aggressive as a base case.

Midpoint revenue arc:

```text
Q1: $10,000
Q2: $37,500
Q3: $90,000
Q4: $150,000
Year 1 total: $287,500
```

At $80 AOV:

```text
Q1 orders: $10,000 / $80 = 125 orders, or 42/month
Q2 orders: $37,500 / $80 = 469 orders, or 156/month
Q3 orders: $90,000 / $80 = 1,125 orders, or 375/month
Q4 orders: $150,000 / $80 = 1,875 orders, or 625/month
Year 1 orders: $287,500 / $80 = 3,594 orders
```

Growth:

```text
Q1 to Q2: $37.5K / $10K = 3.75x
Q2 to Q3: $90K / $37.5K = 2.4x
Q3 to Q4: $150K / $90K = 1.67x
```

This is not supported by the stated marketing budget unless founder-led wholesale closes quickly. Q2 marketing of $200/month cannot be the driver of a 3.75x revenue increase. If Q1 starts from zero brand recognition, a more realistic no-proof base case is **$50K-$100K Year 1**, with $190K-$385K treated as upside.

**Audit finding:** ⚠️ Do not use the current revenue ramp to justify the initial container purchase or Day 60 supplier payment.

### 2.8 Cash Flow Timing: 30% Deposit Crisis

Verdict: ✗ This is the most serious financing error.

Day 0 cash:

```text
Product cost: $52,000
30% deposit: $52,000 x 30% = $15,600
Bond: $700
Insurance: $260
Broker/admin placeholder: $200
Minimum Day 0 cash: $15,600 + $700 + $260 + $200 = $16,760
```

If the pre-launch plan says $2,500 is enough:

```text
$16,760 - $2,500 = $14,260 immediate shortfall
```

Day 60 balance:

```text
70% supplier balance: $52,000 x 70% = $36,400
```

If inventory is ready around Day 44-50, the business has about 10-16 selling days before Day 60. Required revenue volume:

```text
At $85 wholesale 1K orders: $36,400 / $85 = 428 orders
At $29.99 retail 100-pack orders: $36,400 / $29.99 = 1,214 orders
At $375 wholesale 5K orders: $36,400 / $375 = 97 orders
```

That is not feasible from a standing start.

Also, revenue is not cash available for supplier payment. Contribution cash at $10K-$15K early revenue might be:

```text
Low: $10,000 x 30% = $3,000
High: $15,000 x 55% = $8,250
```

So the Day 60 gap may be closer to **$28K-$34K** after contribution, before fixed costs and marketing.

**Audit finding:** ✗ Require **$50K-$65K funding availability** before PO, or renegotiate supplier terms. Do not rely on launch sales to cover Day 60.

### 2.9 Break-Even Unit Count

Verdict: ⚠️ Formula is correct, but the blended metric is misleading.

The fixed-cost formula checks:

```text
$200 fixed cost / $0.06 per-unit GM = 3,333 units/month
```

But actual channel economics are not $0.06/unit.

Shopify 100-pack:

```text
Margin per order: $16.02
Margin per tube: $16.02 / 100 = $0.1602
Break-even units: $200 / $0.1602 = 1,249 tubes
Orders: 1,249 / 100 = 12.5 orders/month
```

Wholesale 1K:

```text
Margin per 1K case: $85 - $50 - $2.765 - $8 = $24.235
Margin per tube: $24.235 / 1,000 = $0.0242
Break-even units: $200 / $0.0242 = 8,264 tubes
Cases: 8.3 cases/month
```

The claim that 3 wholesale cases/month covers fixed cost is wrong:

```text
3 cases x $24.235 = $72.705 contribution
$72.705 < $200 fixed cost
```

**Audit finding:** ⚠️ Replace blended break-even with channel-specific break-even:

- Shopify 100-pack: about **13 orders/month**
- Wholesale 1K: about **9 cases/month**
- Mixed sales: calculate from actual order mix

### 2.10 CAC Kill-Switch Analysis

Verdict: ✗ A flat $30 CAC threshold is financially wrong.

Retail 100-pack:

```text
Contribution margin/order: $16.02
Repeat factor: 1.2x
Gross-margin LTV: $16.02 x 1.2 = $19.22
3:1 LTV:CAC max CAC: $19.22 / 3 = $6.41
1.5:1 aggressive max CAC: $19.22 / 1.5 = $12.81
```

A $30 retail CAC loses money:

```text
First order contribution after CAC: $16.02 - $30 = -$13.98
LTV contribution after CAC: $19.22 - $30 = -$10.78
```

Wholesale 1K:

```text
Contribution/order: about $24.24
Year 1 repeat factor: 4x
Gross-margin LTV: $24.24 x 4 = $96.96
3:1 max CAC: $96.96 / 3 = $32.32
```

Wholesale 5K:

```text
Contribution/order estimate: about $75-$95
Repeat factor: 2x
Gross-margin LTV: about $150-$190
3:1 max CAC: about $50-$63
```

**Audit finding:** ✗ Replace "$30 CAC kill-switch" with channel- and tier-specific CAC limits.

## 3. Sensitivity Table: Net Margin by COGS

These are contribution margins before fixed overhead. Wholesale shipping is assumed charged to the customer and excluded. Amazon is pre-ad contribution margin unless noted.

| Channel / tier | Price | Key variable assumptions | Margin at $0.04 COGS | Margin at $0.05 COGS | Margin at $0.06 COGS |
|---|---:|---|---:|---:|---:|
| Shopify 25-pack | $12.99 | USPS $5, packaging $0.60, payment fee $0.68 | $5.71 / 44.0% | $5.46 / 42.0% | $5.21 / 40.1% |
| Shopify 100-pack | $29.99 | USPS $7, packaging $0.80, payment fee $1.17 | $17.02 / 56.8% | $16.02 / 53.4% | $15.02 / 50.1% |
| Shopify 500-pack | $84.99 | USPS $14, packaging $1.50, payment fee $2.76 | $46.73 / 55.0% | $41.73 / 49.1% | $36.73 / 43.2% |
| Wholesale 1K | $85 | Payment fee $2.77, handling $8 | $34.24 / 40.3% | $24.24 / 28.5% | $14.24 / 16.7% |
| Wholesale 5K | $375 | Payment fee $11.18, handling $20 | $143.83 / 38.4% | $93.83 / 25.0% | $43.83 / 11.7% |
| Wholesale 25K | $1,625 | Payment fee $47.43, handling $50 | $527.58 / 32.5% | $277.58 / 17.1% | $27.58 / 1.7% |
| Wholesale 50K | $3,000 | Payment fee $87.30, handling $75 | $837.70 / 27.9% | $337.70 / 11.3% | -$162.30 / -5.4% |
| Amazon FBA 100-pack | $39.99 | FBA $5.40, referral $6.00, packaging $1.50, no ads | $23.09 / 57.7% | $22.09 / 55.2% | $21.09 / 52.7% |
| Amazon FBA 100-pack after $3 ads | $39.99 | Same + $3 PPC | $20.09 / 50.2% | $19.09 / 47.7% | $18.09 / 45.2% |

The wholesale ladder is highly exposed to COGS drift. At $0.06 COGS, the 25K tier is nearly breakeven before freight, and the 50K tier loses money before freight.

## 4. Top 5 Financial Assumptions Most Likely to Be Wrong

1. **1,000 tubes fit in a 0.0063 m3 carton.**  
Likely wrong by: **8x-10x on cube**.  
The raw cylinder volume alone is 0.040 m3 per 1,000 tubes. Corrected carton volume is closer to 0.045-0.060 m3. This changes 3PL receiving, storage, and container feasibility.

2. **Path A receiving is about $5K/year while replenishing 100-case batches.**  
Likely wrong by: **$60K-$380K/year**, depending cadence.  
One 100-case receipt alone may cost $5.6K-$7.4K. Monthly is $67K-$89K/year. Weekly is $289K-$386K/year.

3. **Net-60 means no cash up front.**  
Likely wrong by: **$15.6K-$16.8K immediately**, plus the Day 60 balance.  
The supplier terms require a 30% deposit. Launch cash is understated.

4. **Wholesale GM column.**  
Likely wrong by: **9-12 margin points** on large tiers if freight is excluded.  
Tier 3 appears to be 17% before freight, not 8%. Tier 4 appears to be 11% before freight, not breakeven.

5. **Flat $30 CAC kill-switch.**  
Likely wrong by: **$17-$24 per retail customer acquired**.  
Retail gross-margin LTV is about $19.22 for the 100-pack. A $30 CAC destroys contribution.

## 5. Concrete Corrections to Source Documents

1. **`china-supplier-setup.md`: Container volume / carton math**  
Change any assumption that 1,000 tubes occupy about 0.0063 m3.  
To: "A 116mm x 21mm tube has about 0.040 liters of cylinder envelope. 1,000 tubes require about 0.040 m3 raw cylinder volume and about 0.045-0.060 m3 packed carton volume. Supplier packing list required."

2. **`capability-reassessment.md`: Full-container ShipBob receiving**  
Change: "52 m3 appears high" or any conclusion that 1.3M tubes use only about 11% of a 40HQ.  
To: "52 m3 is plausible for raw packed tube cube. Full-container ShipBob receipt at 1,836 cu ft x $35 = $64,260 remains a valid red flag and may not be overstated."

3. **`capability-reassessment.md`: Path A replenishment volume**  
Change: "weekly 100-case replenishment batches (~12 cu ft each)"  
To: "100 cases are about 159-212 cu ft, depending carton cube. 12 cu ft is only about 6-8 cases."

4. **`capability-reassessment.md`: Path A annual receiving/storage cost**  
Change: "about $5K receiving + $200/mo storage = about $7,400/yr"  
To: "At corrected tube cube, $5K/year receiving only supports about 67-90 cases/year. 100-case monthly replenishment is about $67K-$89K/year in receiving. 200 cases in storage are about $1.6K-$2.1K/month, not $200/month."

5. **`spend-strategy.md`: Cash plan / supplier terms**  
Change: "supplier Net-60 = $0 cash up front"  
To: "Supplier requires 30% deposit and 70% balance net-60 from BL. For a $52,000 product order, Day 0 deposit is $15,600 plus setup costs, and Day 60 balance is $36,400."

6. **`spend-strategy.md`: Pre-launch cash requirement**  
Change: "$2,500 total pre-launch cash" as sufficient for container launch  
To: "Minimum Day 0 cash is about $16,760 before build/marketing. Prudent funding availability for the container strategy is $50K-$65K."

7. **`site-spec.md`: Shopify 100-pack margin**  
Change: GM after fees of about $17.95 at $29.99  
To: "At $0.05 COGS, $0.80 packaging, $7 USPS, and $1.17 payment fee, contribution margin is $16.02/order or 53.4%."

8. **`site-spec.md`: Wholesale pricing ladder GM labels**  
Change: Tier 3 "8%" and Tier 4 "breakeven" without context  
To: "Show two columns: contribution before freight and contribution after absorbed freight. At $0.05 COGS and freight charged to customer, Tier 3 is about 17% before freight and Tier 4 is about 11% before freight."

9. **`spend-strategy.md`: Break-even statement**  
Change: "3 wholesale cases per month covers fixed costs"  
To: "At about $24.24 contribution per 1K wholesale case, about 9 cases/month are required to cover $200 fixed cost. Shopify 100-pack requires about 13 orders/month."

10. **`spend-strategy.md`: CAC kill-switch**  
Change: "CAC > $30 = pause ads"  
To: "Retail 100-pack CAC cap: $8-$12. Wholesale 1K CAC cap: about $30. Wholesale 5K+ CAC cap: $50-$60 if repeat assumptions are validated."

## 6. Stress-Test Outcomes

### Scenario 1: Container volume is 52 m3 as stated

Outcome: The volume is plausible and the ShipBob warning remains severe.

```text
52 m3 x 35.3147 = 1,836 cu ft
1,836 cu ft x $35 = $64,260
$64,260 / 1,300,000 = $0.0494 per tube
```

Sending the full container through ShipBob receiving would nearly double unit cost. Do not do it.

### Scenario 2: Corrected carton cube is 0.045-0.060 m3 per 1,000

Outcome: 1.3M units may fit in a 40HQ, but only with efficient packing.

```text
1,300 cartons x 0.045 m3 = 58.5 m3
1,300 cartons x 0.060 m3 = 78.0 m3
40HQ theoretical cube = about 76.0 m3
```

The order needs a supplier packing list with carton dimensions and loading plan. Floor-loaded cartons may work. Palletized cartons may not.

### Scenario 3: Path A hybrid, monthly 100-case replenishment

Outcome: Not a $5K/year receiving model.

```text
100 cases = 159-212 cu ft
Receiving = $5,565-$7,420 per replenishment
Monthly annualized = $66,780-$89,040/year
```

This is too expensive for early-stage fulfillment unless the product is repacked into DTC units before ShipBob.

### Scenario 4: Path A hybrid, annual $5K receiving budget

Outcome: Volume capacity is tiny relative to the revenue plan.

```text
$5,000 / $35 = 142.9 cu ft/year
142.9 cu ft / 1.59-2.12 cu ft per case = 67-90 cases/year
67,000-90,000 tubes/year
At 100 tubes/order = 670-900 Shopify 100-pack orders/year
```

The midpoint Year 1 plan requires about 3,594 orders at $80 AOV. The $5K receiving budget does not support that order count if ShipBob receives case inventory.

### Scenario 5: Day 60 supplier balance funded from launch sales

Outcome: Fails under realistic order velocity.

```text
70% x $52,000 = $36,400
```

Required revenue volume in roughly 10-16 days after inventory readiness:

```text
428 x $85 wholesale 1K orders
1,214 x $29.99 retail 100-pack orders
97 x $375 wholesale 5K orders
```

This is not a credible financing plan. The company needs committed working capital before PO.

## 7. Tier-Specific CAC Kill-Switch Recommendations

CAC should be set from contribution margin, repeat rate, and payback period. Do not use one threshold across retail, wholesale, and Amazon.

| Segment | Contribution assumption | Repeat assumption | GM LTV | Recommended CAC kill-switch | Notes |
|---|---:|---:|---:|---:|---|
| Shopify 25-pack | $5.46/order at $0.05 COGS | 1.2x | $6.55 | $3-$5 | Use as trial/sample. Paid acquisition cannot scale here unless upsell is proven. |
| Shopify 100-pack | $16.02/order | 1.2x | $19.22 | $8-$12 | $30 CAC is value-destructive. |
| Shopify 500-pack | $41.73/order | 1.2x | $50.08 | $18-$25 | Better DTC paid-acquisition target. Watch shipping variance. |
| Wholesale 1K | $24.24/order | 4x/year | $96.96 | $25-$35 | $30 CAC works only if repeat ordering is real. |
| Wholesale 5K | $75-$95/order | 2x/year | $150-$190 | $50-$60 | Supports outbound and sample costs if repeat is validated. |
| Wholesale 25K | $275-$280/order before freight | 1.5x/year | $415+ | $100-$140 | Only if freight is charged separately and collection risk is low. |
| Amazon 100-pack | $22.09 pre-ad contribution | Marketplace repeat unknown | N/A | Manage by ACoS/TACoS | Start with target ACoS under 25%-30%; tighten after organic rank improves. |

Specific rules:

- Retail paid social/search: pause or rebuild campaigns if CAC exceeds **$12** for the 100-pack or **$25** for the 500-pack after a meaningful test.
- Wholesale lead generation: allow **$30** CAC for 1K case buyers only if repeat purchase rate is tracking toward 4x/year.
- Wholesale 5K+ outbound: allow **$50-$60** CAC where gross-margin LTV supports it.
- Amazon: treat $22.09 as pre-ad contribution. At $3 PPC, margin falls to about **$19.09** at $0.05 COGS.

## Bottom Line

The business should not order a full container based on the current plan. The corrected tube volume makes ShipBob bulk handling far more expensive than stated, and the supplier payment terms create a cash obligation that launch revenue cannot plausibly cover.

The corrected operating posture should be:

1. Get supplier carton dimensions and the 40HQ loading plan before committing to 1.3M units.
2. Plan at **$0.05/unit landed COGS**, stress at **$0.06**.
3. Do not send bulk master cartons to ShipBob under $35/cu ft receiving/storage economics.
4. Use a cheaper warehouse for bulk and send only DTC-ready finished packs to ShipBob/FBA.
5. Require **$50K-$65K committed inventory funding** or renegotiated supplier terms before PO.
6. Split CAC thresholds by segment; retail 100-pack CAC must be under **$8-$12**, not $30.

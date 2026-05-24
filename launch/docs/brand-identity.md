# The Pack Guys — Brand Identity Proposal

> Plan mode deliverable. Once approved, the full doc below will be written to `/Users/ratmouse/business/preroll-tubes/brand-identity.md` and the CSS variables block will be wired into the dev rebuild.

---

## Executive summary (≈400 words)

**The strategic move:** stop competing in the "industrial trade-shop" lane that every cannabis-adjacent supplier (Calyx, Hara, Custom Cones, Kush Supply) is already crowding. The Pack Guys' real white space is **"smuggler's logistics" — the look and language of an honest freight house that happens to traffic in plastic.** Think Flexport's clarity married to the rough-edged charm of a 1970s LA warehouse manifest. Not vintage hardware, not safety-yellow construction site, not Notion-grey SaaS. A buyer should hit the homepage and feel like they just opened a manila envelope from someone who actually moves freight for a living.

**The chosen wordmark** is **PACK GUYS** stacked in two lines, set in a customized **Authentic Sans 90** with the counter of the "A" notched flat — a small, defensible mark that reads as a stamped shipping label. Lockup includes a circular **"P/G" portmark** for box-tape, favicons, and CR-cert seals, plus a horizontal "THE PACK GUYS · LOS ANGELES" rule for trade-show one-pagers. No yellow period.

**The chosen palette** anchors on three ownable, non-default tones:

- **Manifest Cream** `#F2EAD3` (paper-stock background, not white)
- **Freight Ink** `#1A1F1A` (warm-black with green cast, not pure black)
- **Customs Orange** `#D9531E` (stamped-cert accent — the brand's color of record)
- **Bonded Olive** `#5C6B3A` (cannabis nod without the dispensary cliché)
- **Tag Tan** `#C8A87C` (kraft secondary)

This palette nods to **Flexport** (manifest clarity), **Aesop** (warm neutrals owning a category), and **Aplat** (LA craft-trade restraint). Zero overlap with current Pack Guys cream+brick, zero overlap with Calyx black/white, zero overlap with Hara navy/red.

**Typography pair:** **Authentic Sans 90** (display) + **Söhne Breit** alternative **Public Sans** (body) + **JetBrains Mono** (SKUs, prices, dims, cert numbers). All free / open-source. No Inter, no Manrope, no Jakarta. Authentic Sans is a Berlin-designed neo-grotesque used by Are.na and a handful of design publications — instantly recognizable to anyone who notices type, invisible to everyone else, and impossible to confuse with the LLM default sans.

**The single un-copyable element:** **the Pack Guys manifest receipt.** Every order ships with a 4×6 letterpress-style "Manifest" printed on kraft cardstock — handwritten ship-time, initials of the puller, weather that day, and a one-line dispatch. Customers photograph it. Competitors can't replicate it without rebuilding their entire fulfillment voice. It is the brand made physical and the moat at once.

---

## 1. Wordmark — 3 concepts

### Concept A — "MANIFEST" (chosen)
**PACK GUYS** stacked on two lines, set in Authentic Sans 90 Black, tracked tight (-15), with one custom notch: the apex of the "A" cut flat to mimic a stamped/punched label. A 2px rule sits beneath, optional "LOS ANGELES" set in JetBrains Mono 10pt all-caps with wide tracking (+120) sitting under the rule.

- **Why:** Reads as a shipping label first, logo second. Quietly distinctive (the notched A is the ownable detail). Stackable for box-tape and favicons. Scales from 12px favicon to 8-ft warehouse signage without breaking.
- **Lockups:** (1) Stacked primary, (2) Horizontal "THE PACK GUYS · LA" for headers, (3) Circular "P/G" portmark in a 1.5px ring for cert seals and box-tape, (4) "PG" monogram in JetBrains Mono Bold for app icons.
- **Accent strategy:** No accent color in the mark itself — the mark is always Freight Ink on Manifest Cream, or reversed. Customs Orange only appears in a stamped "INSPECTED" or "LA · STOCKED" badge that sits adjacent to the mark, never inside it. This avoids the "yellow period" trap and the "swap a letter for a product silhouette" cliché.

### Concept B — "CONSIGNMENT"
A custom monoline wordmark "thepackguys" set lowercase in a tightly drawn humanist sans with exaggerated terminals (think Stündenglass meets Aplat). Long underscore-rule under "guys" suggests a signature line on a consignment slip. Very confident, very lowercase, more DTC-leaning.

- **Why not chosen:** Beautiful but tips the brand too far toward boutique. Loses the trade-shop ops buyer. Hard to use at small sizes.

### Concept C — "STENCIL"
"PACK GUYS" set in a custom stencil sans inspired by mil-spec crate markings (think Marvin Visions or Druk Wide Super). Each letter has the stencil bridges intact, giving it instant industrial recognition.

- **Why not chosen:** Closest cousin to what competitors are already doing (Carhartt WIP, Best Made, every "elevated trade" brand of the last decade). Too easy to mistake for vintage-hardware costume — the lane Lambert just rejected.

**→ Recommendation: Concept A (Manifest).** Most ownable, most flexible, most scalable to a 200-SKU catalog where the mark has to coexist with category sub-marks (Tubes / Mylar / Jars / Cones / Labels).

---

## 2. Color palette

| Role | Token | Hex | OKLCH (approx) | Use |
|---|---|---|---|---|
| Surface (primary background) | `--paper` | `#F2EAD3` | `oklch(92% 0.04 88)` | Body backgrounds, card surfaces, hero |
| Ink (primary text + mark) | `--ink` | `#1A1F1A` | `oklch(22% 0.01 145)` | Headings, body, logo |
| Accent (brand color of record) | `--customs` | `#D9531E` | `oklch(62% 0.20 38)` | CTAs, badges, stamps, hover states, focus rings |
| Secondary (category + cannabis nod) | `--bonded` | `#5C6B3A` | `oklch(46% 0.07 122)` | Category chips, secondary CTAs, "In Stock LA" pill |
| Neutral warm (kraft/tape) | `--tag` | `#C8A87C` | `oklch(74% 0.07 75)` | Dividers, tags, secondary surface fills |
| Surface elevated | `--paper-2` | `#E8DEC2` | `oklch(88% 0.05 87)` | Hover surfaces, alternating table rows |
| Surface deep | `--paper-3` | `#DBCFAE` | `oklch(83% 0.06 86)` | Sticky bars, footer, dense data zones |
| Ink soft | `--ink-2` | `#3D423D` | `oklch(35% 0.01 145)` | Secondary text, captions |
| Ink mute | `--ink-3` | `#6B6F68` | `oklch(50% 0.01 130)` | Tertiary, helper text |
| Hairline | `--rule` | `#B8AC8A` | `oklch(72% 0.04 88)` | 1px borders, table rules |
| Stamp green (success) | `--stamp-ok` | `#3D6B2A` | `oklch(48% 0.11 138)` | Confirmations, "Shipped" |
| Stamp red (warn/error) | `--stamp-warn` | `#A8331E` | `oklch(46% 0.16 32)` | Errors, "Cutoff Passed" |
| Reverse white | `--paper-reverse` | `#FBF7EC` | `oklch(96% 0.02 88)` | For text on customs orange |

**Three real-brand references (nods, not copies):**

1. **Flexport** — for the "manifest paper" cream surface and the discipline of letting one accent color do all conversion work. Pack Guys' Customs Orange is to Flexport's freight blue what amber is to navy: same job, different planet.
2. **Aesop** — for warm neutrals owning an entire category without ever looking dispensary. Aesop proves you can run a retail brand on three cream tones and a single brown if the typography earns it. Pack Guys' Manifest Cream + Tag Tan owes the basic move to Aesop, but the orange + olive accent pair takes it somewhere Aesop wouldn't go.
3. **Aplat (SF/LA)** — for the "wholesale-feel premium" execution on warm paper stock with stamped orange marks. Closest spiritual cousin. Aplat sells canvas tote-bags; Pack Guys sells plastic tubes. Same restraint, different inventory.

**Why this clears the brief:**
- (a) **Not in current Pack Guys design** — current is cream + brick red + worn yellow. New palette drops the worn yellow entirely, swaps brick for a true Customs Orange (more chroma, more confidence), and adds Bonded Olive as a cannabis-aware secondary the current build has no equivalent for.
- (b) **Not standard SaaS** — zero blue, zero violet, zero "Notion grey." No Inter Blue (`#0070F3`). No Linear Purple. No GitHub Navy.
- (c) **Ownable** — no other cannabis-adjacent supplier runs cream + orange + olive. Calyx is monochrome. Hara is navy/red. Custom Cones is white/green. Kush is white/lime. The palette is uncontested in the category.
- (d) **Works for both buyers** — Customs Orange + Manifest Cream reads B2B-credible (Flexport vibes) AND retail-DTC (Aesop vibes). Bonded Olive lets the cannabis-native buyer feel seen without a single weed leaf on the page.

---

## 3. Typography

### Display: **Authentic Sans 90** (display + headlines)
A neo-grotesque drawn by ABYME Studio (Berlin), free for personal/commercial via the foundry's open license. Used by Are.na and a number of European design publications. Has a slightly squared geometry and high x-height that reads industrial without going stencil. **Not Inter, not Manrope, not Plus Jakarta, not Söhne** — and crucially, not yet metabolized by the LLM template economy.

- *Justification line 1:* The notched terminals and squared apertures give the brand a "stamped/punched" personality without resorting to literal stencil tropes.
- *Justification line 2:* Available in 60 / 90 / 130 weights, which gives a real type ramp for display vs sub-display vs micro-display without pulling in a second display face.

**Fallback if licensing concerns arise:** **Space Grotesk** (Google Fonts, free, by Florian Karsten). Less ownable but also far less LLM-default than Inter.

### Body: **Public Sans** (body + UI)
US Web Design System's open-source workhorse, maintained by GSA. A clean, lightly humanist sans designed for legibility at 14-16px in dense interfaces — exactly Pack Guys' PDP and pricing-table use case. Looks nothing like Inter; reads like a piece of government infrastructure (which is the joke).

- *Justification line 1:* Designed for forms, tables, and dense data — which is 70% of a B2B catalog site. It will hold up at 14px in a 12-row pricing table where Inter blurs.
- *Justification line 2:* Quiet enough to disappear behind Authentic Sans 90 in headers, distinctive enough (slightly flared terminals on the lowercase) that it doesn't read as the default sans-serif a buyer scrolled past on three other sites today.

### Mono: **JetBrains Mono** (SKUs, prices, dims, cert codes, manifest receipts)
The mono with the most personality of the free-tier monos. Slab-ish, slightly humanist, exceptional at distinguishing 0/O and 1/l/I — critical for SKU correctness. **Not IBM Plex Mono** (now too common in AI tool UIs).

- *Justification line 1:* Built for code editors, which is the closest cousin to a packaging catalog: long alphanumeric strings that must remain scannable at small sizes.
- *Justification line 2:* The ligatures (`->`, `=>`, `!=`) won't be used, but the slab-foot rhythm of the digits gives every price and dim a small piece of brand personality the body face can't carry alone.

**Type ramp (8 steps, modular at 1.25):**

| Token | Size | Line-height | Tracking | Use |
|---|---|---|---|---|
| `--text-xs` | 11px | 16px | +60 | Captions, micro-labels, manifest stamps |
| `--text-sm` | 13px | 20px | +20 | Body small, table cells, helper text |
| `--text-base` | 16px | 24px | 0 | Body default, form inputs |
| `--text-md` | 19px | 28px | -5 | Subheads, large body |
| `--text-lg` | 24px | 32px | -10 | H4, card headers |
| `--text-xl` | 32px | 40px | -15 | H3, section openers |
| `--text-2xl` | 48px | 56px | -20 | H2, hero subhead |
| `--text-3xl` | 72px | 76px | -25 | H1 desktop |
| `--text-display` | 112px | 108px | -30 | Hero billboard, dropdown-cap chapters |

Mobile: clamp from `--text-2xl` for H1, `--text-xl` for H2, scale shifts down one step.

---

## 4. Photography direction

**Discipline:** **"Manifest Light"** — a single hard north-window source from camera-left, no fill, props arranged on raw OSB plywood or a sun-bleached cream paper sweep. Shadows are sharp, slightly long, and intentional. Color treatment is warm-shifted by ~200K to live in the same paper-stock world as the cream UI, with a faint film grain (Kodak Portra 400 emulation, not Fuji) so digital iPhone shots feel like they were taken on a 35mm point-and-shoot in 1996.

**No:**
- Seamless white sweeps (Calyx territory)
- Black backgrounds (Stündenglass territory)
- Lifestyle "girl with tube at sunset" shots (cliché)
- Hand-and-product macro on marble (DTC default)
- Stock warehouse "forklift in golden hour"

**Yes:**
- Product on kraft paper with a deckle edge
- Product on plywood with one piece of orange shipping tape running through frame
- Product photographed mid-pack with the customs-orange ink-stamp visible
- Inventory cage shot through chain-link, slightly out of focus, with one in-focus case label
- Hands counting cases (no faces, just hands and motion blur)
- Receipts, manifests, packing slips photographed at a tilt, half on / half off the frame

**Hero shot — "First Drop":**

- **Frame:** 5:4 portrait crop, slightly elevated three-quarter angle, product 35% of frame.
- **Subject:** A single open case of black 116mm CR pre-roll tubes sitting on raw plywood. Three tubes pulled out and stood up vertically on a kraft envelope to the right. The case lid leans against the back of frame, showing the "PG-TUBE-116-BK-1K · LOT 2026-05" label in JetBrains Mono.
- **Props:**
  - 1 open case (1,000 ct) of black tubes
  - 3 standalone tubes pulled out
  - 1 kraft 9×12 envelope, slightly creased
  - 1 customs-orange rubber stamp resting on the envelope, ink-side down
  - 1 manifest receipt (the brand element from §7), partially visible at frame edge, dated TODAY, initialed
  - 1 roll of customs-orange shipping tape standing on end at the back-left of frame, slightly out of focus
- **Lighting:** North window at 10am, hard shadow falling camera-right. No reflector. No softbox.
- **Color treatment:** +200K warm white balance, +5 saturation on orange channel only, fine film grain.
- **Reproducible with iPhone:** Yes — shoot in Halide or built-in RAW, edit in Darkroom with the "Portra 400" preset, 15-minute setup, single window.

**System rules:**
- Every SKU gets the same five-angle treatment: (1) case hero on plywood, (2) single product on cream paper sweep with shadow, (3) in-hand counting shot, (4) catalog cutout on Paper-2 background for the PDP grid, (5) one process shot (label being applied, tape being torn, stamp being pressed).
- One in-focus subject per frame. The brand is not about abundance; it is about precision.
- Photography file naming: `pg-tube-116-bk-1k_01-hero.jpg` etc., archived per SKU under `/preview/assets/products/{sku}/`.

---

## 5. Voice & tone

### Voice pillars (7)

1. **Specific not vague.** "Ships from City of Industry by 6pm Pacific" beats "Fast shipping." Numbers, addresses, times. Always.
2. **Direct not curt.** We answer the question, then move on. We don't perform brevity ("We sell tubes. We're good at it." is over — that's the GPT cadence). We just don't pad.
3. **Confident not boastful.** We never say "the best," "industry-leading," or "premium." If we're good at something, the spec line proves it.
4. **Trade-fluent not insider.** A new buyer should understand every sentence. A veteran buyer should recognize that we know the difference between a 109mm and a 116mm tube. No 420 jokes. No "fire" or "gas" copy. The cannabis fluency shows in what we don't have to explain, not in slang we deploy.
5. **Human not chummy.** First-person plural ("we ship, we pack, we test") never first-person singular and never "your friends at." We're a crew, not a buddy.
6. **Useful not clever.** Every headline has to answer "what does the buyer get from reading this?" If it's a pun, it goes. If it's a number, it stays.
7. **Honest about limits.** "We don't make these in the USA. Our China factory does. Here's the cert." Trust compounds when the brand admits what it isn't.

### Voice in action

**Hero headline:**
> 116mm pre-roll tubes. Pulled from an LA warehouse today. Cert on file.

**Sub-headline:**
> Black, clear, smoke, white. From $0.05 a unit at 50K. Order before 1pm Pacific, ships before 6.

**Empty cart:**
> Your cart's empty. Most buyers start with the 25-pack ($9.99) or jump to a 1,000-ct case ($85). [Show me both →]

**Error — payment declined:**
> Card didn't go through. The processor returned: `CARD_DECLINED`. Try another card, or email orders@thepackguys.com and we'll invoice you direct.

**Confirmation email subject:**
> Order #PG-2026-04812 — pulled, packed, manifest #4812 attached

**Confirmation email body (excerpt):**
> Got it. Your 5 cases of `PG-TUBE-116-BK-1K` are pulled and packed. Pickup label is attached as a PDF.
>
> Tracking will fire from UPS in the next ~2 hours.
>
> Manifest #4812 is in the box on top of case 1. It's signed by whoever pulled the order. Save it for your records or send it to your compliance team — the CR cert PDF is linked from the bottom.
>
> — The crew, Los Angeles

**404 page:**
> This page is out of stock. The catalog lives over here → [Shop all]

**Out-of-stock state:**
> Sold through. Next case arrives Tuesday 5/28. Drop your email and we'll fire one message when it lands. No drip.

**Sticky cutoff bar (open):**
> Order in the next 2h 47m → pulled today, on a truck by 6pm Pacific.

**Sticky cutoff bar (closed):**
> Cutoff passed. Orders placed now ship Tuesday at 8am Pacific. (LA local pickup is still open until 4pm — use code `LAPICKUP`.)

---

## 6. Brand archetype + spirit animal

**Archetype:** **The Quartermaster.**

Not the Hero (Nike). Not the Outlaw (Harley). Not the Sage (Aesop). The Quartermaster — the person who runs the supply room, knows every part number by heart, never the loudest in the room, but the person every operator depends on to get the right thing on the truck before sunset. Quietly competent. Skeptical of theater. Allergic to fluff. Always has the receipt.

Adjacent reference: the Quartermaster in Bond films — terse, exact, knows the inventory, hands you exactly what you need, and gets back to work.

**Spirit animal:** **The longshoreman's dog.**

Specifically: a working dog at the Port of Long Beach. Not a mascot, not a logo — a posture. Knows the routes. Trusted by the crew. Doesn't bark unless something's actually wrong. Calm in a loud environment. This is the energy of the brand voice. (No actual dog appears in any creative — this is a north-star, not a deliverable.)

---

## 7. The single brand element no competitor can replicate

### **The Pack Guys Manifest Receipt.**

Every order — every retail 25-pack, every wholesale case, every custom run — ships with a **4×6 letterpress-style "Manifest" printed on kraft cardstock** and tucked face-up on top of the contents.

**What's on it:**
- A sequential manifest number (`MFST #4812`)
- The SKU(s) and quantities, set in JetBrains Mono
- The puller's initials, hand-written in pen in a dedicated box
- The pull date AND pull time (e.g. `2026-05-24 · 14:32 PT`)
- The weather in LA that day, one line (`74°F, marine layer until noon, NE wind 4mph`)
- The "Dispatch" — one hand-stamped or typewritten line of brand voice that rotates monthly:
  - "Counted twice. Sealed once."
  - "If anything's off, the number above is the same person to call."
  - "Tape's orange because cardboard's brown."
  - "Tubes go in. Tubes come out. We pack 'em in between."
- A small Customs Orange stamp: `PG · LA · INSPECTED`
- QR code in the bottom-right linking to the CR cert PDF + that specific order's tracking page

**Why competitors can't replicate it:**

1. **It requires a real human in the warehouse.** Calyx and Hara are too big to hand-initial every order. Custom Cones offshores fulfillment. Any incumbent who tries to copy this either lies (auto-generated "puller initials") or burns operational margin they don't have.
2. **It compounds across surfaces.** The manifest design language drives the website footer, the email confirmation layout, the Instagram grid (every post styled as a numbered dispatch), the trade-show one-pager, the box-tape pattern, the warehouse signage. One physical object generates an entire ecosystem of brand artifacts.
3. **It is photographable.** Customers will photograph the manifest and post it. The orange stamp + handwritten initials are the kind of detail that travels through Instagram and Reddit by itself. Free distribution.
4. **It is the brand voice made physical.** Every voice pillar in §5 is encoded in the manifest: specific (date, time, weather), direct (no marketing copy), confident (signed by name), trade-fluent (manifest number is real, not decorative), human (initials in pen), useful (QR to actual cert), honest (the weather line removes pretense — this is just a place).
5. **It is the moat at scale.** When Pack Guys hits 1,000 SKUs and three warehouses, the manifest still works (each warehouse has its own number prefix, `MFST-LA-`, `MFST-OKC-`, etc.). When competitors try to copy it three years from now, they're three years late to a ritual the buyers already trust.

**Production cost:** ~$0.04/unit at 50K pre-printed kraft 4×6 cards from a domestic letterpress shop. Stamp is one-time $90 from Acorn Sign Works. Pen + clipboard at every pull station: $20. Total launch cost under $2,500.

**This is the single thing the website is selling.** A box of tubes is a commodity. A box of tubes with a signed manifest from the guy who pulled it is a relationship.

---

## CSS variables (drop into `:root {}`)

```css
:root {
  /* ───────── Color ───────── */
  /* Surfaces (paper stock) */
  --paper:           #F2EAD3;
  --paper-2:         #E8DEC2;
  --paper-3:         #DBCFAE;
  --paper-reverse:   #FBF7EC;

  /* Ink */
  --ink:             #1A1F1A;
  --ink-2:           #3D423D;
  --ink-3:           #6B6F68;

  /* Accent (brand of record) */
  --customs:         #D9531E;
  --customs-hover:   #C04617;
  --customs-tint:    #F5C9B5;

  /* Secondary + utility */
  --bonded:          #5C6B3A;
  --bonded-tint:     #C7CFB2;
  --tag:             #C8A87C;
  --rule:            #B8AC8A;

  /* Semantic stamps */
  --stamp-ok:        #3D6B2A;
  --stamp-warn:      #A8331E;

  /* ───────── Typography ───────── */
  --font-display:    'Authentic Sans 90', 'Space Grotesk', system-ui, sans-serif;
  --font-body:       'Public Sans', system-ui, -apple-system, sans-serif;
  --font-mono:       'JetBrains Mono', ui-monospace, 'SF Mono', monospace;

  --text-xs:         11px;   --lh-xs:  16px;   --tr-xs:  0.06em;
  --text-sm:         13px;   --lh-sm:  20px;   --tr-sm:  0.02em;
  --text-base:       16px;   --lh-base:24px;   --tr-base:0;
  --text-md:         19px;   --lh-md:  28px;   --tr-md:  -0.005em;
  --text-lg:         24px;   --lh-lg:  32px;   --tr-lg:  -0.01em;
  --text-xl:         32px;   --lh-xl:  40px;   --tr-xl:  -0.015em;
  --text-2xl:        48px;   --lh-2xl: 56px;   --tr-2xl: -0.02em;
  --text-3xl:        72px;   --lh-3xl: 76px;   --tr-3xl: -0.025em;
  --text-display:    112px;  --lh-disp:108px;  --tr-disp:-0.03em;

  /* Weights */
  --w-regular:       400;
  --w-medium:        500;
  --w-bold:          700;
  --w-black:         900;

  /* ───────── Spacing (4px grid) ───────── */
  --space-1:         4px;
  --space-2:         8px;
  --space-3:         12px;
  --space-4:         16px;
  --space-5:         24px;
  --space-6:         32px;
  --space-7:         48px;
  --space-8:         64px;
  --space-9:         96px;
  --space-10:        128px;

  /* ───────── Radius ───────── */
  --r-none:          0;
  --r-sm:            2px;        /* default — keeps it stamped/label feeling */
  --r-md:            4px;
  --r-pill:          999px;      /* only for badges/stamps */

  /* ───────── Border + rule ───────── */
  --bw-hairline:     1px;
  --bw-rule:         2px;
  --bw-stamp:        3px;

  /* ───────── Motion ───────── */
  --ease-stamp:      cubic-bezier(0.2, 0.8, 0.2, 1);   /* press-and-release */
  --ease-pull:      cubic-bezier(0.4, 0.0, 0.2, 1);    /* drawer/pull */
  --dur-fast:        120ms;
  --dur-base:        220ms;
  --dur-slow:        420ms;

  /* ───────── Elevation (subtle, paper-stock appropriate) ───────── */
  --shadow-1:        0 1px 0 var(--rule);
  --shadow-2:        0 1px 2px rgba(26, 31, 26, 0.08), 0 0 0 1px var(--rule);
  --shadow-stamp:    inset 0 0 0 2px var(--customs);
}

/* Dark counter-mode (for sticky bars, footer, manifest stamps) */
[data-mode="ink"] {
  --paper:           #1A1F1A;
  --paper-2:         #232823;
  --paper-3:         #2D332D;
  --ink:             #F2EAD3;
  --ink-2:           #C7C2B0;
  --ink-3:           #908B7A;
  --rule:            #3D423D;
}
```

---

## Open questions for Lambert before execution

1. **Authentic Sans 90 license:** the free download is for personal + small commercial. At Pack Guys' projected scale ($1M+ revenue year-2) we may want to license the commercial pack (~€150). Alternative is Space Grotesk (Google Fonts, free, forever). Preference?
2. **Manifest receipt physical:** want me to spec out the actual letterpress vendor + cardstock + stamp order, or hold that until v1 of the site ships?
3. **Customs Orange `#D9531E` final-check on real paper:** the hex feels right on screen, but oranges shift hard under warehouse fluorescents. Recommend a small Pantone match test ($60) before any box-tape print run.
4. **Bonded Olive for cannabis nod — go or pull?** It's the one color in the palette doing double-duty (category color AND cannabis-aware signal). If Lambert wants the brand to read more agnostic (so it works for non-cannabis CPG buyers down the road), we drop Bonded and let Customs Orange + Tag Tan carry the secondary roles.
5. **Do we keep "The" in the wordmark?** Concept A is "PACK GUYS" stacked. The full legal/brand name "The Pack Guys" only appears in the horizontal lockup. Confirm that's acceptable.

---

## What happens next if approved

1. Write the full identity doc to `/Users/ratmouse/business/preroll-tubes/brand-identity.md` (this file, minus the plan-mode preface).
2. Wire the CSS variables block into the dev rebuild (`preview/assets/styles.css`), replacing the current cream+brick+yellow tokens.
3. Pull in Authentic Sans 90 + Public Sans + JetBrains Mono via `@font-face` + Google Fonts `display=swap`.
4. Mock the hero, PDP, and confirmation email against the new tokens (1-day spike) so Lambert can see it before the full rebuild commits.
5. Spec the manifest-receipt order: kraft cardstock 4×6, custom letterpress die from Studio On Fire or Mama's Sauce, customs-orange rubber stamp from Acorn — under $2,500 all-in.

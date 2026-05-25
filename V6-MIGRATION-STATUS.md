# Pack Guys v6 Migration — Status as of 2026-05-25

## ✅ Migrated to v6 (cobalt + cream + magenta + Cooper Black Italic)

### Top-level pages (13/13)
- index.html · catalog.html · wholesale.html · samples.html
- about.html · contact.html · payments.html
- shipping.html · returns.html · privacy.html · terms.html
- 404.html · thank-you.html · launch-status.html

### Assets
- styles-v6.css · styles-v6-components.css
- tube-outline.svg (squeeze pop-top, flat cap, no hinge)
- favicon.svg + logo-mark.svg + logo-mark-dark.svg + logo-stamp.svg
- logo-lockup.svg + logo-wordmark.svg
- packguys-shell.js (colors + fonts bulk-swapped, .pg-news rebuilt)
- palette-override-v6.css DELETED

---

## 🚨 NOT YET MIGRATED — old sage/Fraunces/cream still leaking

### Per-SKU product detail pages (5 files) — LINKED FROM CATALOG
- tubes/116mm-black.html
- tubes/116mm-clear.html
- tubes/116mm-silver.html
- tubes/116mm-smoke.html
- tubes/116mm-white.html
- **Visible to users**: every catalog row `→` link lands here
- **Action**: rebuild with v6 product-detail template

### Blog (6 files) — LINKED FROM SOME FOOTERS
- blog/index.html
- blog/california-buyers-framework.html
- blog/cr-certification-explained.html
- blog/la-warehouse-supply-chain.html
- blog/net-30-vs-upfront-buying-decisions.html
- blog/pre-roll-tube-pricing-2026.html
- **Action**: blog/index.html → catalog-grid pattern; posts → Hero-Small + .pg-prose template

### Asset HTML pages (3 files) — LINKED FROM EVERY FOOTER
- assets/spec-sheet.html ("Spec Sheet" link in footer)
- assets/cr-test-report.html ("CR Cert" link in footer)
- assets/packing-slip.html (internal/operational)
- **Action**: rebuild with v6 utility template

### Shell.js — partial cleanup
- Bulk-swapped: #7A8C6E→cobalt, sage rgba→cobalt rgba, FAF6EE→F2E8D5, Fraunces→Cooper, Inter→IBM Plex
- .pg-news newsletter card fully rebuilt v6
- **Still to audit**:
  - border-radius values throughout (v6 = 0, shell.js has rounded)
  - #2A2A2A (old ink) refs in drawer/promo banner
  - drawer slide-out panel structure (legacy v5 pattern)
  - promo-banner top strip might still be old
  - hamburger toggle visual style

### Dead code
- assets/mobile.css — targets v5 class names (.hero, .pill, .logo, .nav-links). No page loads it. **Action**: delete.

---

## Recommended approach for next session

1. **Don't whack-a-mole.** Pick one archetype at a time, rebuild fully:
   - Pass A: 5 tubes/*.html files (product-detail template)
   - Pass B: blog/index.html + 5 blog posts (post template)
   - Pass C: 3 assets/*.html files (utility template)
   - Pass D: shell.js drawer + promo banner full v6 rebuild
   - Pass E: delete mobile.css; final grep audit for any remaining
     `#7A8C6E`, `#FAF6EE`, `#C5D4B5`, `Fraunces`, `var(--sage)`, `#2A2A2A`

2. **Use one template per archetype.** Build it once, copy across.

3. **Final pass: load every page in browser and screenshot side-by-side
   with homepage.** Anything that doesn't visually match → flag.

4. **Commit pattern**: one commit per archetype pass, descriptive
   message. Don't bundle multiple archetypes.

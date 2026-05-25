/**
 * The Pack Guys — shared shell (v6).
 * Injects: top promo banner (auto-rotating) + left-side drawer menu + hamburger toggle
 *          + skip-link + cookie consent + newsletter modal + GA4 event tracking + web vitals.
 * Drop one line into each page: <script src="/assets/packguys-shell.js"></script>
 *
 * Brand v6 tokens used inline (must match styles-v6.css):
 *   cream   #F2E8D5    cobalt   #1E3A8A    magenta #E6357A
 *   sharp edges (border-radius 0) on all flat surfaces; only circles use 50%
 */
(function () {

  // Analytics gtag bootstrap is inline in each page's <head> (Consent Mode v2)

  // Granted by cookie banner → upgrade consent state to "granted"
  window.packguysGrantConsent = function() {
    if (!window.gtag) return;
    gtag('consent', 'update', {
      'ad_storage':         'granted',
      'ad_user_data':       'granted',
      'ad_personalization': 'granted',
      'analytics_storage':  'granted'
    });
    if (window.fbq) {
      fbq('consent', 'grant');
      fbq('track', 'PageView');
    }
    window.packguysHasConsent = true;
  };

  // Revoked / declined → downgrade consent
  window.packguysRevokeConsent = function() {
    if (!window.gtag) return;
    gtag('consent', 'update', {
      'ad_storage':         'denied',
      'ad_user_data':       'denied',
      'ad_personalization': 'denied',
      'analytics_storage':  'denied'
    });
    if (window.fbq) fbq('consent', 'revoke');
    window.packguysHasConsent = false;
  }

  // helper to fire conversion events from page code (e.g. form submit handler)
  // Events fire to gtag immediately; gtag respects consent mode state.
  // Until consent granted, GA receives cookieless aggregate pings only.
  window.packguysTrack = function(event, params) {
    params = params || {};
    if (window.gtag) gtag('event', event, params);
    if (window.fbq && window.packguysHasConsent) fbq('trackCustom', event, params);
  };


  const SHELL_CSS = `
  /* ===== SKIP LINK ===== */
  .pg-skip {
    position: absolute;
    left: -9999px;
    top: auto;
    padding: 13px 21px;
    background: #1E3A8A;
    color: #F2E8D5;
    font-family: 'IBM Plex Sans', 'Inter', sans-serif;
    font-weight: 700;
    font-size: 12px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    text-decoration: none;
    border-radius: 0;
    z-index: 9999;
  }
  .pg-skip:focus { left: 0; top: 0; }

  /* ===== TOP PROMO BANNER ===== */
  .promo-banner {
    position: fixed; top: 0; left: 0; right: 0;
    background: #1E3A8A;
    color: #F2E8D5;
    padding: 13px 55px 13px 21px;
    font-family: 'IBM Plex Sans', 'Inter', sans-serif;
    font-size: 11px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    font-weight: 600;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    min-height: 42px;
  }
  .promo-track {
    position: relative;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 14px;
  }
  .promo-msg {
    opacity: 0;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 4px);
    white-space: nowrap;
    transition: opacity .55s ease, transform .55s ease;
    pointer-events: none;
  }
  .promo-msg.active {
    opacity: 1;
    transform: translate(-50%, 0);
    pointer-events: auto;
  }
  .promo-msg a {
    color: #E6357A;
    text-decoration: none;
    border-bottom: 1px solid rgba(230,53,122,0.55);
    padding-bottom: 1px;
    transition: color .2s, border-color .2s;
  }
  .promo-msg a:hover { color: #F2E8D5; border-bottom-color: #F2E8D5; }
  .promo-msg .code {
    color: #E6357A;
    font-weight: 700;
    letter-spacing: 0.12em;
    background: rgba(230,53,122,0.16);
    padding: 3px 9px;
    border-radius: 0;
    margin: 0 4px;
  }
  .promo-close {
    position: absolute;
    right: 18px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #F2E8D5;
    font-size: 20px;
    line-height: 1;
    cursor: pointer;
    opacity: 0.55;
    transition: opacity .2s, transform .2s;
    width: 28px; height: 28px;
    display: flex; align-items: center; justify-content: center;
    border-radius: 50%;
  }
  .promo-close:hover { opacity: 1; transform: translateY(-50%) rotate(90deg); }

  body { padding-top: 42px; }
  body.no-promo { padding-top: 0; }
  .nav { top: 42px !important; transition: top .25s ease; }
  body.no-promo .nav { top: 0 !important; }
  body.no-promo .promo-banner { display: none; }

  /* dot pulse on promo */
  .promo-dot {
    display: inline-block; width: 6px; height: 6px;
    background: #E6357A; border-radius: 50%;
    margin: 0 12px; vertical-align: middle;
    animation: dotPulse 2s ease-in-out infinite;
  }
  @keyframes dotPulse {
    0%, 100% { opacity: 0.4; transform: scale(0.8); }
    50% { opacity: 1; transform: scale(1.2); }
  }

  /* ===== DRAWER TOGGLE (hamburger) ===== */
  .drawer-toggle {
    background: transparent;
    border: 1.5px solid rgba(30,58,138,0.32);
    border-radius: 50%;
    width: 42px; height: 42px;
    font-size: 16px;
    cursor: pointer;
    color: #1E3A8A;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all .2s ease;
    flex-shrink: 0;
    font-family: 'IBM Plex Sans', 'Inter', sans-serif;
  }
  .drawer-toggle::before {
    content: "";
    width: 16px;
    height: 12px;
    background:
      linear-gradient(#1E3A8A, #1E3A8A) center 0/100% 2px no-repeat,
      linear-gradient(#1E3A8A, #1E3A8A) center 5px/100% 2px no-repeat,
      linear-gradient(#1E3A8A, #1E3A8A) center 10px/100% 2px no-repeat;
    transition: background .2s;
  }
  .drawer-toggle:hover {
    border-color: #E6357A;
    transform: scale(1.06);
  }
  .drawer-toggle:hover::before {
    background:
      linear-gradient(#E6357A, #E6357A) center 0/100% 2px no-repeat,
      linear-gradient(#E6357A, #E6357A) center 5px/100% 2px no-repeat,
      linear-gradient(#E6357A, #E6357A) center 10px/100% 2px no-repeat;
  }
  .nav-left-group { display: flex; align-items: center; gap: 18px; }

  /* ===== BACKDROP ===== */
  /* z-index 101 / 102 sits above the fixed promo banner (z-index 100) so the
     drawer covers everything when open. Sticky nav (z-index 90) is hidden. */
  .drawer-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(30,58,138,0.42);
    backdrop-filter: blur(4px);
    z-index: 101;
    opacity: 0;
    visibility: hidden;
    transition: opacity .35s ease, visibility .35s ease;
  }
  .drawer-backdrop.open { opacity: 1; visibility: visible; }

  /* ===== DRAWER PANEL ===== */
  .drawer {
    position: fixed;
    top: 0; left: 0;
    width: min(480px, 92vw);
    height: 100vh;
    background: #F2E8D5;
    z-index: 102;
    transform: translateX(-100%);
    transition: transform .45s cubic-bezier(0.25, 0.6, 0.5, 1);
    overflow-y: auto;
    box-shadow: 6px 0 0 #1E3A8A, 12px 0 60px rgba(30,58,138,0.20);
    padding: 34px 34px 89px;
    display: flex;
    flex-direction: column;
    gap: 21px;
    border-right: 3px solid #1E3A8A;
  }
  .drawer.open { transform: translateX(0); }
  .drawer-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 13px;
    padding-bottom: 21px;
    border-bottom: 2px solid #1E3A8A;
  }
  .drawer-brand {
    font-family: 'Cooper Black Italic', 'Cooper Black', Georgia, serif;
    font-style: italic;
    font-weight: 900;
    font-size: 26px;
    letter-spacing: -0.02em;
    color: #1E3A8A;
    text-decoration: none;
  }
  .drawer-brand .dot { color: #E6357A; }
  .drawer-close {
    background: transparent;
    border: 2px solid #1E3A8A;
    width: 38px; height: 38px;
    border-radius: 50%;
    font-size: 18px;
    cursor: pointer;
    color: #1E3A8A;
    opacity: 0.85;
    transition: opacity .2s, transform .25s, background .2s, color .2s, border-color .2s;
    display: flex; align-items: center; justify-content: center;
  }
  .drawer-close:hover {
    opacity: 1;
    transform: rotate(90deg);
    background: #E6357A;
    color: #F2E8D5;
    border-color: #E6357A;
  }

  .drawer-section-label {
    font-family: 'JetBrains Mono', 'IBM Plex Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.20em;
    text-transform: uppercase;
    color: #E6357A;
    margin-bottom: 8px;
    font-weight: 700;
  }
  .drawer-nav {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .drawer-link {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 13px 16px;
    border-radius: 0;
    text-decoration: none;
    transition: background .2s, color .2s, transform .15s, border-color .2s;
    color: #1E3A8A;
    border: 2px solid transparent;
  }
  .drawer-link:hover {
    background: rgba(30,58,138,0.10);
    border-color: rgba(30,58,138,0.25);
    transform: translateX(5px);
  }
  .drawer-link--main {
    background: #F2E8D5;
    padding: 18px 21px;
    border: 2px solid #1E3A8A;
    border-radius: 0;
    box-shadow: 4px 4px 0 #1E3A8A;
    transition: background .2s, transform .2s, box-shadow .2s, border-color .2s;
  }
  .drawer-link--main:hover {
    background: #1E3A8A;
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0 #E6357A;
  }
  .drawer-link--main:hover strong,
  .drawer-link--main:hover small { color: #F2E8D5; }
  .drawer-link--main:hover .drawer-icon { background: #E6357A; color: #F2E8D5; }
  .drawer-link--main.coming { opacity: 0.65; box-shadow: none; }
  .drawer-link--main.coming:hover { opacity: 0.95; background: #F2E8D5; transform: none; box-shadow: 4px 4px 0 rgba(30,58,138,0.35); }
  .drawer-link--main.coming:hover strong,
  .drawer-link--main.coming:hover small { color: #1E3A8A; }
  .drawer-link--main.coming:hover .drawer-icon { background: rgba(30,58,138,0.04); color: rgba(30,58,138,0.45); }
  .drawer-link--main .drawer-icon {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(230,53,122,0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #E6357A;
    font-weight: 700;
    flex-shrink: 0;
    transition: background .2s, color .2s;
  }
  .drawer-link--main.coming .drawer-icon {
    background: rgba(30,58,138,0.04);
    color: rgba(30,58,138,0.45);
    border: 1.5px dashed rgba(30,58,138,0.25);
  }
  .drawer-link--main .drawer-text {
    display: flex;
    flex-direction: column;
    gap: 3px;
    min-width: 0;
  }
  .drawer-link--main strong {
    font-family: 'Cooper Black Italic', 'Cooper Black', Georgia, serif;
    font-style: italic;
    font-weight: 900;
    font-size: 18px;
    letter-spacing: -0.02em;
    text-transform: none;
    color: #1E3A8A;
    transition: color .2s;
  }
  .drawer-link--main small {
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 12px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: rgba(30,58,138,0.7);
    line-height: 1.3;
    font-weight: 600;
    transition: color .2s;
  }
  .drawer-link--sec {
    font-family: 'IBM Plex Sans', 'Inter', sans-serif;
    font-size: 14px;
    color: #1E3A8A;
    font-weight: 700;
    padding: 11px 16px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
  .drawer-link--sec::before {
    content: "→";
    color: #E6357A;
    margin-right: 8px;
    opacity: 0;
    transform: translateX(-6px);
    transition: opacity .2s, transform .2s;
    display: inline-block;
  }
  .drawer-link--sec:hover::before { opacity: 1; transform: translateX(0); }
  .drawer-link--featured {
    font-family: 'JetBrains Mono', monospace;
    background: #E6357A;
    color: #F2E8D5;
    font-weight: 700;
    font-size: 12px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    justify-content: center;
    padding: 17px;
    margin-top: 8px;
    border: 2px solid #E6357A;
    border-radius: 0;
    box-shadow: 4px 4px 0 #1E3A8A;
    transition: background .2s, color .2s, transform .2s, box-shadow .2s, border-color .2s;
  }
  .drawer-link--featured:hover {
    background: #1E3A8A;
    color: #F2E8D5;
    border-color: #1E3A8A;
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0 #E6357A;
  }
  .drawer-divider {
    border: none;
    border-top: 2px solid rgba(30,58,138,0.18);
    margin: 13px 0 8px;
  }
  .drawer-footer-line {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(30,58,138,0.7);
    text-align: center;
    margin-top: 21px;
    padding-top: 21px;
    border-top: 2px solid rgba(30,58,138,0.12);
    font-weight: 600;
  }

  /* lock body scroll while drawer open */
  body.drawer-open { overflow: hidden; }

  /* ===== MOBILE STICKY ACTION BAR =====
     Visible only on phones (≤768px) — desktop relies on the persistent
     .nav__cta in the header instead. z-index 75 sits BELOW the cookie
     banner (z 95) so cookie consent wins, and below the drawer (z 102). */
  .mobile-action-bar {
    display: none;
  }
  @media (max-width: 768px) {
    .mobile-action-bar {
      display: flex;
      position: fixed;
      bottom: 0; left: 0; right: 0;
      z-index: 75;
      background: #1E3A8A;
      color: #F2E8D5;
      padding: 11px 16px;
      box-shadow: 0 -4px 16px rgba(30,58,138,0.18);
      border-top: 2px solid #E6357A;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      font-family: 'IBM Plex Sans', sans-serif;
    }
    .mobile-action-bar .mab-label {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      font-weight: 700;
      color: #E6357A;
      line-height: 1.2;
    }
    .mobile-action-bar .mab-amount {
      display: block;
      font-family: 'Cooper Black Italic', 'Cooper Black', Georgia, serif;
      font-style: italic;
      font-weight: 900;
      font-size: 18px;
      color: #F2E8D5;
      letter-spacing: -0.01em;
      line-height: 1;
      margin-top: 2px;
    }
    .mobile-action-bar .mab-cta {
      flex-shrink: 0;
      background: #E6357A;
      color: #F2E8D5;
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.10em;
      text-transform: uppercase;
      padding: 11px 16px;
      text-decoration: none;
      border: 2px solid #E6357A;
      transition: background .15s, border-color .15s;
      white-space: nowrap;
    }
    .mobile-action-bar .mab-cta:hover,
    .mobile-action-bar .mab-cta:active {
      background: #F2E8D5;
      color: #E6357A;
    }
    /* Reserve bottom padding so footer + content don't sit behind the bar */
    body { padding-bottom: 68px; }
    body.no-promo { padding-bottom: 68px; }
  }
  `;

  const PROMO_HTML = `
  <div class="promo-banner" id="promo-banner" role="region" aria-label="Promotions">
    <div class="promo-track">
      <span class="promo-msg active">★ FREE SHIPPING ON ORDERS OVER $500<span class="promo-dot"></span><a href="/samples.html">$14.99 TRIAL CASE, ANY COLOR</a></span>
      <span class="promo-msg">★ TRY $14.99 FIRST<span class="promo-dot"></span>WE'LL CREDIT IT TOWARD YOUR FIRST WHOLESALE ORDER</span>
      <span class="promo-msg">★ STOCKED IN LA<span class="promo-dot"></span>SHIPS IN 5 DAYS<span class="promo-dot"></span>16 CFR 1700.20 CR-CERTIFIED</span>
    </div>
    <button class="promo-close" aria-label="Dismiss announcement">×</button>
  </div>
  `;

  const DRAWER_HTML = `
  <div class="drawer-backdrop" id="drawer-backdrop"></div>
  <aside class="drawer" id="drawer" aria-hidden="true" aria-label="Site navigation">
    <div class="drawer-head">
      <a href="/" class="drawer-brand">the pack guys<span class="dot">.</span></a>
      <button class="drawer-close" aria-label="Close menu">✕</button>
    </div>

    <div class="drawer-section-label">★ Shop</div>
    <div class="drawer-nav">
      <a href="/catalog.html" class="drawer-link drawer-link--main">
        <span class="drawer-icon">●</span>
        <span class="drawer-text">
          <strong>Catalog &amp; Order Builder</strong>
          <small>5 colors · live per-unit pricing</small>
        </span>
      </a>
      <a href="/wholesale.html" class="drawer-link drawer-link--main">
        <span class="drawer-icon">●</span>
        <span class="drawer-text">
          <strong>Wholesale</strong>
          <small>apply · Net-30 after order #2</small>
        </span>
      </a>
      <a href="/samples.html" class="drawer-link drawer-link--main">
        <span class="drawer-icon">●</span>
        <span class="drawer-text">
          <strong>Samples — $14.99</strong>
          <small>100-unit trial case · any color</small>
        </span>
      </a>
    </div>

    <hr class="drawer-divider">
    <div class="drawer-section-label">★ Read</div>
    <div class="drawer-nav">
      <a href="/blog/" class="drawer-link drawer-link--sec">Pack Notes</a>
      <a href="/assets/spec-sheet.html" class="drawer-link drawer-link--sec">Spec Sheet (PDF)</a>
      <a href="/assets/cr-test-report.html" class="drawer-link drawer-link--sec">CR Certification (PDF)</a>
    </div>

    <hr class="drawer-divider">
    <div class="drawer-section-label">★ Company</div>
    <div class="drawer-nav">
      <a href="/about.html" class="drawer-link drawer-link--sec">About</a>
      <a href="/contact.html" class="drawer-link drawer-link--sec">Contact</a>
      <a href="/payments.html" class="drawer-link drawer-link--sec">Payments</a>
    </div>

    <hr class="drawer-divider">
    <div class="drawer-nav">
      <a href="/wholesale.html" class="drawer-link drawer-link--featured">★ Apply for Wholesale →</a>
      <a href="/samples.html" class="drawer-link drawer-link--sec">try a $14.99 sample first</a>
    </div>

    <div class="drawer-footer-line">★ Stocked in LA · Ships from CA in 5 days ★</div>
  </aside>
  `;

  // Inject CSS
  const style = document.createElement('style');
  style.textContent = SHELL_CSS;
  document.head.appendChild(style);

  // Inject skip-link at very top of body
  document.body.insertAdjacentHTML('afterbegin',
    '<a class="pg-skip" href="#main-content">Skip to main content</a>');

  // Inject promo banner just after skip-link
  document.body.insertAdjacentHTML('afterbegin', PROMO_HTML);

  // Inject drawer + backdrop at end of body
  document.body.insertAdjacentHTML('beforeend', DRAWER_HTML);

  // Inject hamburger toggle as left-group with brand mark.
  // v6 pages use .nav__brand; legacy v5 pages used .logo. Support both.
  const nav = document.querySelector('.nav');
  if (nav) {
    const brand = nav.querySelector('.nav__brand') || nav.querySelector('.logo');
    if (brand) {
      const toggle = document.createElement('button');
      toggle.className = 'drawer-toggle';
      toggle.setAttribute('aria-label', 'Open menu');
      toggle.setAttribute('id', 'drawer-toggle');

      const leftGroup = document.createElement('div');
      leftGroup.className = 'nav-left-group';
      brand.parentNode.insertBefore(leftGroup, brand);
      leftGroup.appendChild(toggle);
      leftGroup.appendChild(brand);
    }
  }

  // Wire up drawer
  const drawer = document.getElementById('drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  const toggleBtn = document.getElementById('drawer-toggle');
  const closeBtn = document.querySelector('.drawer-close');

  function openDrawer() {
    drawer.classList.add('open');
    backdrop.classList.add('open');
    document.body.classList.add('drawer-open');
    drawer.setAttribute('aria-hidden', 'false');
    toggleBtn?.setAttribute('aria-expanded', 'true');
    // Move focus into the drawer for keyboard/screen-reader users
    setTimeout(() => closeBtn?.focus(), 100);
  }
  function closeDrawer() {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.classList.remove('drawer-open');
    drawer.setAttribute('aria-hidden', 'true');
    toggleBtn?.setAttribute('aria-expanded', 'false');
    // Return focus to the toggle button so keyboard nav resumes from the same place
    toggleBtn?.focus();
  }

  // Initialize ARIA state on the toggle button (created during inject)
  toggleBtn?.setAttribute('aria-expanded', 'false');
  toggleBtn?.setAttribute('aria-controls', 'drawer');

  toggleBtn?.addEventListener('click', openDrawer);
  closeBtn?.addEventListener('click', closeDrawer);
  backdrop?.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) closeDrawer();
  });

  // Promo rotation (every 5s, fade)
  const msgs = document.querySelectorAll('.promo-msg');
  let cur = 0;
  if (msgs.length > 1) {
    setInterval(() => {
      msgs[cur].classList.remove('active');
      cur = (cur + 1) % msgs.length;
      msgs[cur].classList.add('active');
    }, 5000);
  }

  // Promo dismiss
  document.querySelector('.promo-close')?.addEventListener('click', () => {
    document.body.classList.add('no-promo');
    try { sessionStorage.setItem('promo_dismissed', '1'); } catch (e) {}
  });
  try {
    if (sessionStorage.getItem('promo_dismissed') === '1') {
      document.body.classList.add('no-promo');
    }
  } catch (e) {}

  // ============================================================
  // MOBILE STICKY ACTION BAR — page-aware primary CTA on phones
  // ============================================================
  (function injectMobileActionBar() {
    const path = window.location.pathname;
    let label = '', amount = '', ctaText = '', ctaHref = '';

    if (path === '/' || path.endsWith('/index.html')) {
      label = 'Trial case';
      amount = '$14.99';
      ctaText = 'order now →';
      ctaHref = '/samples.html';
    } else if (path.endsWith('/catalog.html')) {
      label = 'Posted prices';
      amount = 'from $0.06/unit';
      ctaText = 'request quote →';
      ctaHref = '/wholesale.html';
    } else if (path.endsWith('/samples.html')) {
      label = 'Need bulk?';
      amount = '';
      ctaText = 'open wholesale →';
      ctaHref = '/wholesale.html';
    } else if (path.endsWith('/wholesale.html')) {
      label = 'Try first?';
      amount = '$14.99';
      ctaText = 'order a sample →';
      ctaHref = '/samples.html';
    } else if (path.endsWith('/thank-you.html')) {
      return;
    } else if (path.startsWith('/tubes/')) {
      // Tube SKU pages: deep-link directly to the catalog row for this color.
      // Static map — color URL segments don't match the catalog 3-letter abbrevs.
      const SKU_MAP = { black: 'BLK', clear: 'CLR', white: 'WHT', smoke: 'SMK', silver: 'SLV' };
      const skuMatch = path.match(/116mm-(\w+)/);
      const colorKey = skuMatch ? skuMatch[1].toLowerCase() : '';
      const skuAbbrev = SKU_MAP[colorKey] || '';
      const sku = skuAbbrev ? 'PG-TUBE-116-' + skuAbbrev : '';
      label = '1-click order';
      amount = '';
      ctaText = 'add to your order →';
      ctaHref = sku ? '/catalog.html#' + sku : '/catalog.html';
    } else if (path.startsWith('/blog/')) {
      label = 'Ready to order?';
      amount = '';
      ctaText = 'browse catalog →';
      ctaHref = '/catalog.html';
    } else {
      label = 'The Pack Guys';
      amount = '';
      ctaText = 'browse catalog →';
      ctaHref = '/catalog.html';
    }

    const bar = document.createElement('div');
    bar.className = 'mobile-action-bar';
    bar.innerHTML = `
      <div>
        <div class="mab-label">${label}</div>
        ${amount ? '<span class="mab-amount">' + amount + '</span>' : ''}
      </div>
      <a href="${ctaHref}" class="mab-cta">${ctaText}</a>
    `;
    document.body.appendChild(bar);
  })();

  // ============================================================
  // COOKIE CONSENT BANNER + CONSENT GATE FOR ANALYTICS
  // v6: cobalt panel, cream text, magenta accept, sharp edges
  // ============================================================
  (function consentLayer() {
    const KEY = 'pg_consent_v1';
    const stored = (function(){ try { return localStorage.getItem(KEY); } catch(e){ return null; } })();
    window.packguysHasConsent = (stored === 'all');
    if (stored === 'all') {
      setTimeout(() => {
        if (typeof window.packguysGrantConsent === 'function') window.packguysGrantConsent();
      }, 100);
    }

    if (!stored) {
      const css = document.createElement('style');
      css.textContent = `
        .pg-cookie {
          position: fixed; bottom: 21px; left: 21px; right: 21px;
          max-width: 520px; margin: 0 auto;
          background: #1E3A8A;
          color: #F2E8D5;
          padding: 21px;
          border: 3px solid #1E3A8A;
          border-radius: 0;
          z-index: 95;
          box-shadow: 8px 8px 0 #E6357A;
          font-family: 'IBM Plex Sans', 'Inter', sans-serif;
          font-size: 13px;
          line-height: 1.5;
          animation: pgCookieIn .35s cubic-bezier(.25,.6,.5,1) forwards;
          transform: translateY(34px);
          opacity: 0;
        }
        @keyframes pgCookieIn { from { transform: translateY(34px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .pg-cookie strong { font-family: 'Cooper Black Italic', 'Cooper Black', Georgia, serif; font-style: italic; font-weight: 900; color: #E6357A; font-size: 18px; letter-spacing: -0.02em; }
        .pg-cookie a {
          color: #E6357A;
          border-bottom: 1px solid #E6357A;
          padding-bottom: 1px;
          text-decoration: none;
          font-weight: 700;
        }
        .pg-cookie .pg-cookie-actions { display: flex; gap: 8px; margin-top: 13px; }
        .pg-cookie button {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-weight: 700;
          padding: 11px 21px;
          border-radius: 0;
          cursor: pointer;
          border: 2px solid #E6357A;
          transition: all .2s;
        }
        .pg-cookie .accept { background: #E6357A; color: #F2E8D5; }
        .pg-cookie .accept:hover { background: #F2E8D5; color: #E6357A; }
        .pg-cookie .decline { background: transparent; color: #F2E8D5; border-color: #F2E8D5; }
        .pg-cookie .decline:hover { background: #F2E8D5; color: #1E3A8A; }
        @media (max-width: 640px) { .pg-cookie { left: 13px; right: 13px; bottom: 75px; padding: 16px; font-size: 12px; } }
      `;
      document.head.appendChild(css);

      const banner = document.createElement('div');
      banner.className = 'pg-cookie';
      banner.setAttribute('role', 'dialog');
      banner.setAttribute('aria-label', 'Cookie preferences');
      banner.innerHTML = `
        <strong>Cookies for analytics.</strong><br>
        First-party cookies for session state + Google Analytics so we know which pages help buyers. No third-party tracking unless you opt in. <a href="/privacy.html">Read more</a>.
        <div class="pg-cookie-actions">
          <button class="accept">accept all</button>
          <button class="decline">necessary only</button>
        </div>
      `;
      document.body.appendChild(banner);

      banner.querySelector('.accept').addEventListener('click', () => {
        try { localStorage.setItem(KEY, 'all'); } catch(e){}
        banner.remove();
        if (typeof window.packguysGrantConsent === 'function') window.packguysGrantConsent();
      });
      banner.querySelector('.decline').addEventListener('click', () => {
        try { localStorage.setItem(KEY, 'necessary'); } catch(e){}
        banner.remove();
        if (typeof window.packguysRevokeConsent === 'function') window.packguysRevokeConsent();
      });
    }
  })();

  // ============================================================
  // NEWSLETTER SLIDE-UP — 30s delay, dismissible, once-per-session
  // ============================================================
  (function newsletterPrompt() {
    const KEY = 'pg_news_dismissed';
    const path = window.location.pathname;
    if (path.endsWith('/samples.html') || path.endsWith('/wholesale.html') || path.endsWith('/thank-you.html')) return;
    let dismissed;
    try { dismissed = localStorage.getItem(KEY); } catch(e){}
    if (dismissed) return;

    setTimeout(() => {
      const css = document.createElement('style');
      css.textContent = `
        .pg-news { position: fixed; bottom: 21px; right: 21px; width: 320px; background: #F2E8D5; color: #1E3A8A; padding: 21px; z-index: 78; box-shadow: 6px 6px 0 #1E3A8A; font-family: 'IBM Plex Sans', sans-serif; font-size: 13px; line-height: 1.5; border: 3px solid #1E3A8A; border-radius: 0; animation: pgNewsIn .45s cubic-bezier(.25,.6,.5,1) forwards; transform: translateY(34px); opacity: 0; }
        @keyframes pgNewsIn { from { transform: translateY(34px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .pg-news .pg-news-close { position: absolute; top: 6px; right: 6px; background: transparent; border: none; width: 26px; height: 26px; cursor: pointer; color: #1E3A8A; font-size: 18px; font-weight: 700; opacity: 0.7; border-radius: 50%; }
        .pg-news .pg-news-close:hover { opacity: 1; color: #E6357A; }
        .pg-news .pg-news-label { font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: #E6357A; font-weight: 700; margin-bottom: 6px; }
        .pg-news h4 { font-family: 'Cooper Black Italic', 'Cooper Black', Georgia, serif; font-style: italic; font-weight: 900; font-size: 22px; letter-spacing: -0.02em; margin-bottom: 8px; color: #1E3A8A; line-height: 1.1; }
        .pg-news h4 em { color: #E6357A; font-style: italic; }
        .pg-news p { color: #1E3A8A; font-size: 12px; margin-bottom: 13px; opacity: 0.85; }
        .pg-news form { display: flex; gap: 8px; }
        .pg-news input[type=email] { flex: 1; font-family: 'IBM Plex Sans', sans-serif; font-size: 14px; padding: 10px 12px; border: 1.5px solid #1E3A8A; background: #F2E8D5; color: #1E3A8A; border-radius: 0; }
        .pg-news input[type=email]:focus { outline: 2px solid #E6357A; outline-offset: 0; border-color: #E6357A; }
        .pg-news button[type=submit] { font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; padding: 10px 14px; background: #E6357A; color: #F2E8D5; border: 2px solid #E6357A; cursor: pointer; border-radius: 0; transition: all .15s; }
        .pg-news button[type=submit]:hover { background: #1E3A8A; border-color: #1E3A8A; }
        .pg-news .success { color: #E6357A; font-style: italic; font-family: 'Cooper Black Italic', 'Cooper Black', Georgia, serif; font-weight: 900; font-size: 16px; }
        @media (max-width: 640px) { .pg-news { width: auto; left: 13px; right: 13px; bottom: 80px; } }
      `;
      document.head.appendChild(css);

      const panel = document.createElement('div');
      panel.className = 'pg-news';
      panel.innerHTML = `
        <button class="pg-news-close" aria-label="Dismiss">×</button>
        <div class="pg-news-label">★ Pack Notes · Monthly</div>
        <h4>Get <em>Pack Notes</em> in your inbox.</h4>
        <p>One short note a month: pricing, compliance, supply chain. From operators, for operators. Zero spam, one-click unsubscribe.</p>
        <form action="#" method="post" onsubmit="return false;">
          <input type="email" required placeholder="you@yourbiz.com" name="email" autocomplete="email">
          <button type="submit">Subscribe</button>
        </form>
      `;
      document.body.appendChild(panel);

      panel.querySelector('.pg-news-close').addEventListener('click', () => {
        try { localStorage.setItem(KEY, '1'); } catch(e){}
        panel.remove();
      });
      panel.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = panel.querySelector('input[type=email]').value.trim();
        if (!email) return;
        const btn = panel.querySelector('button[type=submit]');
        const origLabel = btn ? btn.textContent : '';
        if (btn) { btn.disabled = true; btn.textContent = 'Subscribing…'; }
        const WORKER_URL = (window.PG_FORM_INTAKE_URL || 'https://pack-guys-form-intake.lamberthahm.workers.dev/');
        fetch(WORKER_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ form_type: 'newsletter', email: email, source: 'sliderup', page: location.pathname }),
          credentials: 'omit'
        }).then(r => {
          if (!r.ok) throw new Error('HTTP ' + r.status);
          return r.json();
        }).then(() => {
          try { localStorage.setItem(KEY, 'subscribed:' + email); } catch(_) {}
          panel.innerHTML = '<button class="pg-news-close" aria-label="Dismiss">×</button><div class="success">subscribed. you will hear from us monthly.</div>';
          panel.querySelector('.pg-news-close').addEventListener('click', () => panel.remove());
          if (window.packguysTrack) window.packguysTrack('newsletter_subscribe', { method: 'sliderup', email_domain: email.split('@')[1] || '' });
        }).catch(err => {
          if (btn) { btn.disabled = false; btn.textContent = origLabel || 'Subscribe'; }
          panel.querySelector('form').insertAdjacentHTML('afterbegin',
            '<div style="color:#E6357A;font-family:JetBrains Mono,monospace;font-size:11px;margin-bottom:8px;">Sorry — try again or email hello@thepackguys.com (' + err.message + ')</div>'
          );
        });
      });
    }, 30000);
  })();

  // ============================================================
  // GA4 EVENT TRACKING — runs only after consent (packguysTrack gated)
  // ============================================================
  (function eventTracking() {
    function track(event, params) {
      if (window.packguysTrack) window.packguysTrack(event, params || {});
      else if (window.gtag) gtag('event', event, params || {});
    }

    // ---- Scroll depth (25/50/75/100%) ----
    const milestones = [25, 50, 75, 100];
    const fired = new Set();
    let scrollTicking = false;
    function checkScroll() {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      if (docH <= 0) return;
      const pct = Math.round((window.scrollY / docH) * 100);
      milestones.forEach(m => {
        if (pct >= m && !fired.has(m)) {
          fired.add(m);
          track('scroll_depth', { percent: m, page: location.pathname });
        }
      });
      scrollTicking = false;
    }
    window.addEventListener('scroll', () => {
      if (!scrollTicking) { requestAnimationFrame(checkScroll); scrollTicking = true; }
    }, { passive: true });

    // ---- Outbound + special-protocol link clicks ----
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if (!a || !a.href) return;
      const href = a.href;
      try {
        const u = new URL(href, location.href);
        if (u.host && u.host !== location.host && u.protocol.startsWith('http')) {
          track('outbound_click', { url: href, text: (a.textContent || '').slice(0, 80).trim() });
        }
      } catch(e){}
      if (href.startsWith('mailto:')) {
        track('email_click', { address: href.replace('mailto:', '') });
      }
      if (href.startsWith('tel:')) {
        track('phone_click', { number: href.replace('tel:', '') });
      }
    }, { passive: true, capture: false });

    // ---- Primary CTA clicks (v5 .pill + v6 .btn) ----
    document.querySelectorAll('a.pill, a.btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const section = btn.closest('section, footer, nav, aside, .mobile-action-bar');
        const cls = section ? section.className.split(' ')[0] : (section ? section.tagName.toLowerCase() : 'unknown');
        track('cta_click', {
          target: btn.href,
          text: (btn.textContent || '').trim().slice(0, 60),
          section: cls || 'body'
        });
      });
    });

    // ---- Form submissions (samples + wholesale) ----
    document.querySelectorAll('form.form-card, form.pg-form').forEach(form => {
      form.addEventListener('submit', () => {
        const action = form.getAttribute('action') || '';
        let type = 'unknown';
        if (action.includes('type=sample')) type = 'sample';
        else if (action.includes('type=wholesale')) type = 'wholesale';
        const payment = form.querySelector('input[name="payment"]:checked, input[name="payment_pref"]:checked');
        const params = {
          form_type: type,
          payment_method: payment ? payment.value : 'unspecified',
        };
        if (type === 'sample') {
          const color = form.querySelector('input[name="color"]:checked');
          const qty = form.querySelector('input[name="qty"]:checked');
          if (color) params.color = color.value;
          if (qty) params.quantity = qty.value;
          track('begin_checkout', { currency: 'USD', value: qty ? (qty.value == '100' ? 14.99 : qty.value == '500' ? 60.00 : 85.00) : 14.99 });
        } else if (type === 'wholesale') {
          const volume = form.querySelector('select[name="volume"]');
          const biz_type = form.querySelector('select[name="biz_type"]');
          if (volume) params.expected_volume = volume.value;
          if (biz_type) params.business_type = biz_type.value;
          track('generate_lead', { currency: 'USD', value: 85.00 });
        }
        track(type === 'sample' ? 'sample_submit' : 'wholesale_submit', params);
      });
    });

    // ---- Catalog page: view_item_list + select_item ----
    if (location.pathname.endsWith('/catalog.html')) {
      const items = [];
      document.querySelectorAll('.product-row[data-sku]').forEach((row, i) => {
        items.push({
          item_id: row.dataset.sku,
          item_name: row.dataset.name,
          item_category: 'Pre-Roll Tubes',
          index: i + 1,
        });
      });
      if (items.length) {
        track('view_item_list', { item_list_name: 'Catalog', items: items });
      }
      document.querySelectorAll('.product-row[data-sku] input[type="radio"]').forEach(input => {
        input.addEventListener('change', () => {
          const row = input.closest('.product-row[data-sku]');
          const price = parseFloat(input.dataset.price) || 0;
          const caseSize = parseInt(input.value) || 0;
          track('select_item', {
            item_id: row.dataset.sku,
            item_name: row.dataset.name,
            case_size: caseSize,
            price: price,
            per_unit: caseSize > 0 ? (price / caseSize).toFixed(4) : 0,
          });
        });
      });
      document.querySelectorAll('.qty-input').forEach(input => {
        let last = parseInt(input.value) || 0;
        input.addEventListener('change', () => {
          const qty = parseInt(input.value) || 0;
          if (qty > last && qty > 0) {
            const row = input.closest('.product-row[data-sku]');
            const checked = row.querySelector('input[type="radio"]:checked');
            const price = checked ? parseFloat(checked.dataset.price) : 0;
            track('add_to_cart', {
              currency: 'USD',
              value: qty * price,
              items: [{
                item_id: row.dataset.sku,
                item_name: row.dataset.name,
                quantity: qty,
                price: price,
              }]
            });
          }
          last = qty;
        });
      });
    }

    // ---- Tube detail pages: view_item ----
    if (location.pathname.startsWith('/tubes/')) {
      // Static map — URL color segment ≠ 3-letter SKU abbrev (clear→CLR, etc.)
      const SKU_MAP = { black: 'BLK', clear: 'CLR', white: 'WHT', smoke: 'SMK', silver: 'SLV' };
      const skuMatch = location.pathname.match(/116mm-(\w+)/);
      if (skuMatch) {
        const color = skuMatch[1].toLowerCase();
        const skuAbbrev = SKU_MAP[color];
        if (skuAbbrev) {
          const sku = 'PG-TUBE-116-' + skuAbbrev;
          track('view_item', {
            currency: 'USD',
            value: 0.085,
            items: [{
              item_id: sku,
              item_name: '116mm ' + color.charAt(0).toUpperCase() + color.slice(1),
              item_category: 'Pre-Roll Tubes',
              item_variant: color,
            }]
          });
        }
      }
    }

    // ---- Thank-you page: purchase / conversion ----
    if (location.pathname.endsWith('/thank-you.html')) {
      const p = new URLSearchParams(location.search);
      const type = p.get('type');
      const payment = p.get('payment') || p.get('payment_pref') || 'unspecified';
      if (type === 'sample') {
        track('purchase', {
          currency: 'USD',
          value: 14.99,
          transaction_id: 'sample-' + Date.now(),
          payment_type: payment,
          items: [{ item_id: 'PG-TRIAL-100', item_name: '100-unit trial case', quantity: 1, price: 14.99 }]
        });
      } else if (type === 'wholesale') {
        track('wholesale_application_complete', {
          payment_type: payment,
          currency: 'USD',
          value: 100,
        });
      }
    }

    // ---- Drawer + promo banner interaction ----
    const drawerToggle = document.getElementById('drawer-toggle');
    if (drawerToggle) drawerToggle.addEventListener('click', () => track('drawer_open', { source: 'nav_hamburger' }));
    document.querySelectorAll('.promo-msg a').forEach(a => {
      a.addEventListener('click', () => track('promo_click', { destination: a.href }));
    });

    // ---- Pricing tier click on home ----
    document.querySelectorAll('.tier-grid .tier').forEach(tier => {
      tier.addEventListener('click', () => {
        const unit = tier.dataset.unit;
        const qty = tier.querySelector('.qty');
        track('pricing_tier_click', {
          tier: qty ? qty.textContent.trim() : 'unknown',
          per_unit: unit,
        });
      });
    });

    // ---- Time-on-page heartbeats (30s, 90s, 180s) ----
    [30, 90, 180].forEach(sec => {
      setTimeout(() => track('time_on_page', { seconds: sec, page: location.pathname }), sec * 1000);
    });

  })();

  // ============================================================
  // WEB VITALS
  // ============================================================
  (function webVitals() {
    if (!('PerformanceObserver' in window)) return;

    function send(name, value, rating) {
      if (window.packguysTrack) {
        window.packguysTrack('web_vitals', {
          metric_name: name,
          metric_value: Math.round(name === 'CLS' ? value * 1000 : value),
          metric_rating: rating,
          page_path: location.pathname,
        });
      }
    }

    function rate(name, value) {
      const thresholds = {
        CLS:  [0.1, 0.25],
        LCP:  [2500, 4000],
        INP:  [200, 500],
        FCP:  [1800, 3000],
        TTFB: [800, 1800],
      };
      const t = thresholds[name]; if (!t) return 'unknown';
      return value <= t[0] ? 'good' : value <= t[1] ? 'needs-improvement' : 'poor';
    }

    try {
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const last = entries[entries.length - 1];
        if (last) send('LCP', last.renderTime || last.loadTime, rate('LCP', last.renderTime || last.loadTime));
      }).observe({ type: 'largest-contentful-paint', buffered: true });
    } catch(e){}

    try {
      let cls = 0;
      new PerformanceObserver((list) => {
        for (const e of list.getEntries()) if (!e.hadRecentInput) cls += e.value;
      }).observe({ type: 'layout-shift', buffered: true });
      addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') send('CLS', cls, rate('CLS', cls));
      });
    } catch(e){}

    try {
      let maxINP = 0;
      new PerformanceObserver((list) => {
        for (const e of list.getEntries()) {
          if (e.interactionId && e.duration > maxINP) maxINP = e.duration;
        }
      }).observe({ type: 'event', buffered: true, durationThreshold: 16 });
      addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden' && maxINP > 0) {
          send('INP', maxINP, rate('INP', maxINP));
        }
      });
    } catch(e){}

    try {
      new PerformanceObserver((list) => {
        const fcp = list.getEntries().find(e => e.name === 'first-contentful-paint');
        if (fcp) send('FCP', fcp.startTime, rate('FCP', fcp.startTime));
      }).observe({ type: 'paint', buffered: true });
    } catch(e){}

    try {
      const nav = performance.getEntriesByType('navigation')[0];
      if (nav) {
        const ttfb = nav.responseStart;
        send('TTFB', ttfb, rate('TTFB', ttfb));
      }
    } catch(e){}
  })();

  // ---- Auto-TOC + h2 anchors (article pages only) -------------------
  // Slugifies each h2 + h3 inside .pg-prose, injects id="" so deep
  // links work, builds: (1) a sticky right-rail .toc-rail on viewports
  // ≥1200px (scrollspy-highlighted), and (2) a <details> "Jump to"
  // disclosure at top of article for narrower viewports.
  (function autoTOC() {
    if (typeof document === 'undefined') return;
    function slugify(s) {
      return (s || '').toLowerCase().trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
    }
    function init() {
      const article = document.querySelector('article.pg-prose');
      if (!article) return;
      const headings = Array.from(article.querySelectorAll('h2, h3'));
      if (headings.length < 3) return; // not worth a TOC under 3 sections
      const seen = new Set();
      const entries = headings.map(h => {
        let slug = slugify(h.textContent);
        if (!slug) slug = 'section';
        let unique = slug, n = 2;
        while (seen.has(unique)) { unique = slug + '-' + n; n++; }
        seen.add(unique);
        h.id = unique;
        return { id: unique, text: h.textContent.trim(), level: h.tagName === 'H3' ? 3 : 2 };
      });

      // Build mobile <details> jump
      const det = document.createElement('details');
      det.className = 'toc-jump';
      det.innerHTML = '<summary>Jump to section</summary>' +
        '<ol>' + entries.filter(e => e.level === 2).map(e =>
          `<li><a href="#${e.id}" data-toc-jump="${e.id}">${e.text}</a></li>`
        ).join('') + '</ol>';
      article.parentNode.insertBefore(det, article);

      // Build sticky right-rail TOC
      const rail = document.createElement('nav');
      rail.className = 'toc-rail';
      rail.setAttribute('aria-label', 'Article sections');
      rail.innerHTML = '<span class="toc-rail__label">On this page</span>' +
        '<ul class="toc-rail__list">' + entries.filter(e => e.level === 2).map(e =>
          `<li><a class="toc-rail__link" href="#${e.id}" data-toc-jump="${e.id}">${e.text}</a></li>`
        ).join('') + '</ul>';
      document.body.appendChild(rail);
      requestAnimationFrame(() => rail.classList.add('toc-rail--ready'));

      // Wire jump tracking
      document.addEventListener('click', (e) => {
        const a = e.target.closest('[data-toc-jump]');
        if (a && window.packguysTrack) {
          window.packguysTrack('toc_jump', { section: a.dataset.tocJump });
        }
      });

      // Scrollspy via IntersectionObserver
      if ('IntersectionObserver' in window) {
        const links = Array.from(rail.querySelectorAll('.toc-rail__link'));
        const linkById = new Map(links.map(a => [a.getAttribute('href').slice(1), a]));
        const visible = new Set();
        const io = new IntersectionObserver((items) => {
          items.forEach(i => {
            if (i.isIntersecting) visible.add(i.target.id);
            else visible.delete(i.target.id);
          });
          // Activate the highest visible heading
          links.forEach(a => a.classList.remove('toc-rail__link--active'));
          for (const e of entries) {
            if (e.level === 2 && visible.has(e.id)) {
              const link = linkById.get(e.id);
              if (link) link.classList.add('toc-rail__link--active');
              break;
            }
          }
        }, { rootMargin: '-80px 0px -65% 0px' });
        entries.filter(e => e.level === 2).forEach(e => {
          const h = document.getElementById(e.id);
          if (h) io.observe(h);
        });
      }
    }
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  })();

  // ---- Thumb-zone sticky CTA — mobile only, fades in after 30% scroll
  (function thumbCTA() {
    if (typeof document === 'undefined') return;
    function init() {
      // Only on pages explicitly opted-in via data attribute on body.
      // Set data-thumb-cta="/samples.html|Order Samples" to enable.
      const spec = document.body.dataset.thumbCta;
      if (!spec) return;
      if (window.matchMedia && window.matchMedia('(min-width: 769px)').matches) return;
      const [href, label] = spec.split('|');
      if (!href || !label) return;
      const a = document.createElement('a');
      a.className = 'thumb-cta';
      a.href = href;
      a.textContent = label + ' →';
      a.setAttribute('aria-label', label);
      document.body.appendChild(a);
      let visible = false;
      let ticking = false;
      const footer = document.querySelector('footer');
      function update() {
        const docH = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docH > 0 ? window.scrollY / docH : 0;
        const inFooter = footer && footer.getBoundingClientRect().top < window.innerHeight - 40;
        const shouldShow = pct > 0.3 && !inFooter;
        if (shouldShow !== visible) {
          visible = shouldShow;
          a.classList.toggle('thumb-cta--visible', visible);
          if (visible && window.packguysTrack) {
            window.packguysTrack('thumb_cta_view', { page: location.pathname });
          }
        }
        ticking = false;
      }
      window.addEventListener('scroll', () => {
        if (!ticking) { requestAnimationFrame(update); ticking = true; }
      }, { passive: true });
      a.addEventListener('click', () => {
        if (window.packguysTrack) {
          window.packguysTrack('thumb_cta_click', { page: location.pathname, href });
        }
      });
    }
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  })();

  // ---- Reading-progress bar -----------------------------------------
  // Tiny self-contained IIFE: adds a 3px magenta bar at viewport top
  // that scales with scroll. Skips short pages (under 1.5× viewport).
  // Fires packguysTrack('reading_progress_*') at 50% and 100% once each.
  (function readingProgress() {
    if (typeof document === 'undefined') return;
    function init() {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      if (docH < window.innerHeight * 0.5) return; // skip short pages
      const bar = document.createElement('div');
      bar.className = 'read-progress';
      bar.setAttribute('aria-hidden', 'true');
      document.body.appendChild(bar);
      let ticking = false;
      const milestones = { 50: 'reading_progress_50', 100: 'reading_progress_100' };
      const fired = new Set();
      function update() {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
        bar.style.width = Math.min(100, Math.max(0, pct)).toFixed(2) + '%';
        Object.keys(milestones).forEach(m => {
          const n = Number(m);
          if (pct >= n && !fired.has(n)) {
            fired.add(n);
            if (window.packguysTrack) {
              window.packguysTrack(milestones[m], { page: location.pathname });
            }
          }
        });
        ticking = false;
      }
      window.addEventListener('scroll', () => {
        if (!ticking) { requestAnimationFrame(update); ticking = true; }
      }, { passive: true });
      update();
    }
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  })();

})();

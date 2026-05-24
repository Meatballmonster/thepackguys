/**
 * The Pack Guys — shared shell.
 * Injects: top promo banner (auto-rotating) + left-side drawer menu + hamburger toggle.
 * Drop one line into each page: <script src="assets/packguys-shell.js"></script>
 */
(function () {

  /* ============================================================
   * ANALYTICS — replace placeholder IDs with real values:
   *   GA_MEASUREMENT_ID  → your GA4 ID (e.g. G-ABC1234XYZ)
   *   AW-CONVERSION_ID   → Google Ads conversion ID (e.g. AW-1234567)
   *   FB_PIXEL_ID        → Facebook Pixel ID (numeric)
   * ============================================================ */
  (function injectAnalytics() {
    const GA_ID  = 'GA_MEASUREMENT_ID';
    const AW_ID  = 'AW-CONVERSION_ID';
    const FB_ID  = 'FB_PIXEL_ID';

    // skip if placeholders not replaced
    const realGA = GA_ID && !GA_ID.includes('MEASUREMENT');
    const realAW = AW_ID && !AW_ID.includes('CONVERSION');
    const realFB = FB_ID && !FB_ID.includes('PIXEL');

    if (realGA || realAW) {
      const tag = document.createElement('script');
      tag.async = true;
      tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + (realGA ? GA_ID : AW_ID);
      document.head.appendChild(tag);
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      window.gtag = gtag;
      gtag('js', new Date());
      if (realGA) gtag('config', GA_ID, { anonymize_ip: true });
      if (realAW) gtag('config', AW_ID);
    }

    if (realFB) {
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', FB_ID);
      fbq('track', 'PageView');
    }
  })();

  // helper to fire conversion events from page code (e.g. form submit handler)
  window.packguysTrack = function(event, params) {
    params = params || {};
    if (window.gtag) gtag('event', event, params);
    if (window.fbq) fbq('trackCustom', event, params);
  };


  const SHELL_CSS = `
  /* ===== TOP PROMO BANNER ===== */
  .promo-banner {
    position: fixed; top: 0; left: 0; right: 0;
    background: #2A2A2A;
    color: #FAF6EE;
    padding: 13px 55px 13px 21px;
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    letter-spacing: 2px;
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
    color: #C5D4B5;
    text-decoration: none;
    border-bottom: 1px solid rgba(197,212,181,0.55);
    padding-bottom: 1px;
    transition: color .2s, border-color .2s;
  }
  .promo-msg a:hover { color: #fff; border-bottom-color: #fff; }
  .promo-msg .code {
    color: #C5D4B5;
    font-weight: 700;
    letter-spacing: 1.5px;
    background: rgba(197,212,181,0.18);
    padding: 3px 9px;
    border-radius: 4px;
    margin: 0 4px;
  }
  .promo-close {
    position: absolute;
    right: 18px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #FAF6EE;
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
    background: #C5D4B5; border-radius: 50%;
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
    border: 1.5px solid rgba(42,42,42,0.16);
    border-radius: 50%;
    width: 42px; height: 42px;
    font-size: 16px;
    cursor: pointer;
    color: #2A2A2A;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all .2s ease;
    flex-shrink: 0;
    font-family: 'Inter', sans-serif;
  }
  .drawer-toggle::before {
    content: "";
    width: 16px;
    height: 12px;
    background:
      linear-gradient(#2A2A2A, #2A2A2A) center 0/100% 2px no-repeat,
      linear-gradient(#2A2A2A, #2A2A2A) center 5px/100% 2px no-repeat,
      linear-gradient(#2A2A2A, #2A2A2A) center 10px/100% 2px no-repeat;
    transition: background .2s;
  }
  .drawer-toggle:hover {
    border-color: #7A8C6E;
    transform: scale(1.06);
  }
  .drawer-toggle:hover::before {
    background:
      linear-gradient(#7A8C6E, #7A8C6E) center 0/100% 2px no-repeat,
      linear-gradient(#7A8C6E, #7A8C6E) center 5px/100% 2px no-repeat,
      linear-gradient(#7A8C6E, #7A8C6E) center 10px/100% 2px no-repeat;
  }
  .nav-left-group { display: flex; align-items: center; gap: 18px; }

  /* ===== BACKDROP ===== */
  .drawer-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(42,42,42,0.42);
    backdrop-filter: blur(4px);
    z-index: 90;
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
    background: #FAF6EE;
    z-index: 95;
    transform: translateX(-100%);
    transition: transform .45s cubic-bezier(0.25, 0.6, 0.5, 1);
    overflow-y: auto;
    box-shadow: 0 0 60px rgba(42,42,42,0.20);
    padding: 34px 34px 89px;
    display: flex;
    flex-direction: column;
    gap: 21px;
  }
  .drawer.open { transform: translateX(0); }
  .drawer-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 13px;
    padding-bottom: 21px;
    border-bottom: 1.5px solid rgba(42,42,42,0.10);
  }
  .drawer-brand {
    font-family: 'Fraunces', serif;
    font-style: italic;
    font-weight: 600;
    font-size: 26px;
    letter-spacing: -0.5px;
    color: #2A2A2A;
    text-decoration: none;
  }
  .drawer-brand .dot { color: #7A8C6E; }
  .drawer-close {
    background: rgba(42,42,42,0.06);
    border: none;
    width: 38px; height: 38px;
    border-radius: 50%;
    font-size: 18px;
    cursor: pointer;
    color: #2A2A2A;
    opacity: 0.75;
    transition: opacity .2s, transform .25s, background .2s;
    display: flex; align-items: center; justify-content: center;
  }
  .drawer-close:hover { opacity: 1; transform: rotate(90deg); background: rgba(122,140,110,0.18); }

  .drawer-section-label {
    font-family: 'Inter', sans-serif;
    font-size: 10px;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: rgba(42,42,42,0.55);
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
    border-radius: 13px;
    text-decoration: none;
    transition: background .2s, color .2s, transform .15s;
    color: #2A2A2A;
  }
  .drawer-link:hover {
    background: rgba(122,140,110,0.14);
    transform: translateX(5px);
  }
  .drawer-link--main {
    background: #fff;
    padding: 18px 21px;
    border: 1px solid rgba(42,42,42,0.08);
    border-radius: 16px;
  }
  .drawer-link--main:hover {
    background: rgba(122,140,110,0.10);
    border-color: rgba(122,140,110,0.5);
  }
  .drawer-link--main.coming { opacity: 0.65; }
  .drawer-link--main.coming:hover { opacity: 0.95; }
  .drawer-link--main .drawer-icon {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(122,140,110,0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #7A8C6E;
    font-weight: 700;
    flex-shrink: 0;
  }
  .drawer-link--main.coming .drawer-icon {
    background: rgba(42,42,42,0.04);
    color: rgba(42,42,42,0.45);
    border: 1.5px dashed rgba(42,42,42,0.25);
  }
  .drawer-link--main .drawer-text {
    display: flex;
    flex-direction: column;
    gap: 3px;
    min-width: 0;
  }
  .drawer-link--main strong {
    font-family: 'Fraunces', serif;
    font-weight: 500;
    font-size: 18px;
    letter-spacing: -0.3px;
    text-transform: lowercase;
    color: #2A2A2A;
  }
  .drawer-link--main small {
    font-family: 'Fraunces', serif;
    font-style: italic;
    font-size: 13px;
    color: rgba(42,42,42,0.6);
    line-height: 1.3;
  }
  .drawer-link--sec {
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    color: #2A2A2A;
    font-weight: 500;
    padding: 11px 16px;
  }
  .drawer-link--sec::before {
    content: "→";
    color: #7A8C6E;
    margin-right: 8px;
    opacity: 0;
    transform: translateX(-6px);
    transition: opacity .2s, transform .2s;
    display: inline-block;
  }
  .drawer-link--sec:hover::before { opacity: 1; transform: translateX(0); }
  .drawer-link--featured {
    font-family: 'Inter', sans-serif;
    background: #7A8C6E;
    color: #fff;
    font-weight: 600;
    font-size: 14px;
    justify-content: center;
    padding: 17px;
    margin-top: 8px;
    border-radius: 100px;
    box-shadow: 0 6px 16px rgba(122,140,110,0.32);
    letter-spacing: 0.3px;
  }
  .drawer-link--featured:hover {
    background: #2A2A2A;
    color: #fff;
    transform: translateY(-2px);
  }
  .drawer-divider {
    border: none;
    border-top: 1px solid rgba(42,42,42,0.10);
    margin: 13px 0 8px;
  }
  .drawer-footer-line {
    font-family: 'Fraunces', serif;
    font-style: italic;
    font-size: 13px;
    color: rgba(42,42,42,0.55);
    text-align: center;
    margin-top: 21px;
    padding-top: 21px;
    border-top: 1px solid rgba(42,42,42,0.08);
  }

  /* lock body scroll while drawer open */
  body.drawer-open { overflow: hidden; }
  `;

  const PROMO_HTML = `
  <div class="promo-banner" id="promo-banner" role="region" aria-label="Promotions">
    <div class="promo-track">
      <span class="promo-msg active">FREE SHIPPING ON ORDERS OVER $500<span class="promo-dot"></span><a href="samples.html">$14.99 TRIAL CASE, ANY COLOR</a></span>
      <span class="promo-msg">TRY $14.99 FIRST<span class="promo-dot"></span>WE'LL CREDIT IT TOWARD YOUR FIRST WHOLESALE ORDER</span>
      <span class="promo-msg">STOCKED IN LA<span class="promo-dot"></span>SHIPS IN 5 DAYS<span class="promo-dot"></span>16 CFR 1700.20 CR-CERTIFIED<span class="promo-dot"></span>STOCKED IN CALIFORNIA</span>
    </div>
    <button class="promo-close" aria-label="Dismiss announcement">×</button>
  </div>
  `;

  const DRAWER_HTML = `
  <div class="drawer-backdrop" id="drawer-backdrop"></div>
  <aside class="drawer" id="drawer" aria-hidden="true" aria-label="Site navigation">
    <div class="drawer-head">
      <a href="index.html" class="drawer-brand">the pack guys<span class="dot">.</span></a>
      <button class="drawer-close" aria-label="Close menu">✕</button>
    </div>

    <div class="drawer-section-label">PRODUCT LINES</div>
    <div class="drawer-nav">
      <a href="catalog.html" class="drawer-link drawer-link--main">
        <span class="drawer-icon">●</span>
        <span class="drawer-text">
          <strong>116mm pre-roll tubes</strong>
          <small>5 colors · CR-certified · in stock today</small>
        </span>
      </a>
      <a href="index.html#catalog" class="drawer-link drawer-link--main coming">
        <span class="drawer-icon">○</span>
        <span class="drawer-text">
          <strong>cones · king size</strong>
          <small>coming Q3 2026</small>
        </span>
      </a>
      <a href="index.html#catalog" class="drawer-link drawer-link--main coming">
        <span class="drawer-icon">○</span>
        <span class="drawer-text">
          <strong>mylar exit bags</strong>
          <small>coming Q3 2026</small>
        </span>
      </a>
      <a href="index.html#catalog" class="drawer-link drawer-link--main coming">
        <span class="drawer-icon">○</span>
        <span class="drawer-text">
          <strong>storage jars</strong>
          <small>coming late 2026</small>
        </span>
      </a>
    </div>

    <hr class="drawer-divider">
    <div class="drawer-section-label">RESOURCES</div>
    <div class="drawer-nav">
      <a href="index.html#how" class="drawer-link drawer-link--sec">how it works</a>
      <a href="index.html#faq" class="drawer-link drawer-link--sec">FAQ</a>
      <a href="index.html#why" class="drawer-link drawer-link--sec">why us</a>
      <a href="catalog.html" class="drawer-link drawer-link--sec">build an order</a>
    </div>

    <hr class="drawer-divider">
    <div class="drawer-nav">
      <a href="samples.html" class="drawer-link drawer-link--sec">try a $14.99 sample</a>
      <a href="wholesale.html" class="drawer-link drawer-link--featured">open a wholesale account →</a>
    </div>

    <div class="drawer-footer-line">stocked in california · ships from LA in 5 days</div>
  </aside>
  `;

  // Inject CSS
  const style = document.createElement('style');
  style.textContent = SHELL_CSS;
  document.head.appendChild(style);

  // Inject promo banner at top of body
  document.body.insertAdjacentHTML('afterbegin', PROMO_HTML);

  // Inject drawer + backdrop at end of body
  document.body.insertAdjacentHTML('beforeend', DRAWER_HTML);

  // Inject hamburger toggle as left-group with logo
  const nav = document.querySelector('.nav');
  if (nav) {
    const logo = nav.querySelector('.logo');
    if (logo) {
      const toggle = document.createElement('button');
      toggle.className = 'drawer-toggle';
      toggle.setAttribute('aria-label', 'Open menu');
      toggle.setAttribute('id', 'drawer-toggle');

      const leftGroup = document.createElement('div');
      leftGroup.className = 'nav-left-group';
      logo.parentNode.insertBefore(leftGroup, logo);
      leftGroup.appendChild(toggle);
      leftGroup.appendChild(logo);
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
  }
  function closeDrawer() {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.classList.remove('drawer-open');
    drawer.setAttribute('aria-hidden', 'true');
  }

  toggleBtn?.addEventListener('click', openDrawer);
  closeBtn?.addEventListener('click', closeDrawer);
  backdrop?.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDrawer(); });

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
    // remember in session so it stays dismissed during browsing
    try { sessionStorage.setItem('promo_dismissed', '1'); } catch (e) {}
  });
  try {
    if (sessionStorage.getItem('promo_dismissed') === '1') {
      document.body.classList.add('no-promo');
    }
  } catch (e) {}

})();

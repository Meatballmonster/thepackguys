/**
 * The Pack Guys — shared shell.
 * Injects: top promo banner (auto-rotating) + left-side drawer menu + hamburger toggle.
 * Drop one line into each page: <script src="assets/packguys-shell.js"></script>
 */
(function () {

  // Analytics gtag bootstrap is inline in each page\'s <head> (Consent Mode v2)

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
      label = '116mm CR tubes';
      amount = 'from $85/1K';
      ctaText = 'request quote →';
      ctaHref = '/wholesale.html';
    } else if (path.endsWith('/samples.html')) {
      // sample form has its own submit; show a "need bulk?" prompt instead
      label = 'Need bulk pricing?';
      amount = '';
      ctaText = 'open wholesale account →';
      ctaHref = '/wholesale.html';
    } else if (path.endsWith('/wholesale.html')) {
      // wholesale form has its own submit; show "try sample first" hint
      label = 'Not ready to commit?';
      amount = '';
      ctaText = 'try a $14.99 sample →';
      ctaHref = '/samples.html';
    } else if (path.endsWith('/thank-you.html')) {
      return; // don't show on confirmation
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
  // ============================================================
  (function consentLayer() {
    const KEY = 'pg_consent_v1';
    const stored = (function(){ try { return localStorage.getItem(KEY); } catch(e){ return null; } })();
    window.packguysHasConsent = (stored === 'all');
    // Returning visitor with prior 'all' consent → fire grant immediately
    if (stored === 'all') {
      setTimeout(() => {
        if (typeof window.packguysGrantConsent === 'function') window.packguysGrantConsent();
      }, 100);
    }

    // Inject banner if no decision yet
    if (!stored) {
      const css = document.createElement('style');
      css.textContent = `
        .pg-cookie { position: fixed; bottom: 21px; left: 21px; right: 21px; max-width: 520px; margin: 0 auto; background: #2A2A2A; color: #FAF6EE; padding: 21px; border-radius: 16px; z-index: 95; box-shadow: 0 21px 55px rgba(42,42,42,0.42); font-family: 'Inter', sans-serif; font-size: 13px; line-height: 1.5; animation: pgCookieIn .35s cubic-bezier(.25,.6,.5,1) forwards; }
        @keyframes pgCookieIn { from { transform: translateY(34px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .pg-cookie a { color: #C5D4B5; border-bottom: 1px solid #C5D4B5; padding-bottom: 1px; text-decoration: none; }
        .pg-cookie .pg-cookie-actions { display: flex; gap: 8px; margin-top: 13px; }
        .pg-cookie button { font-family: 'Inter', sans-serif; font-size: 12px; letter-spacing: 0.5px; font-weight: 600; padding: 11px 21px; border-radius: 100px; cursor: pointer; border: 1.5px solid #C5D4B5; transition: all .2s; }
        .pg-cookie .accept { background: #C5D4B5; color: #2A2A2A; }
        .pg-cookie .accept:hover { background: #fff; }
        .pg-cookie .decline { background: transparent; color: #C5D4B5; }
        .pg-cookie .decline:hover { background: rgba(197,212,181,0.16); }
        @media (max-width: 640px) { .pg-cookie { left: 13px; right: 13px; bottom: 75px; padding: 16px; font-size: 12px; } }
      `;
      document.head.appendChild(css);

      const banner = document.createElement('div');
      banner.className = 'pg-cookie';
      banner.setAttribute('role', 'dialog');
      banner.setAttribute('aria-label', 'Cookie preferences');
      banner.innerHTML = `
        <strong style="font-weight:600;color:#fff;">cookies for analytics</strong><br>
        We use first-party cookies for session state + Google Analytics to understand which pages help buyers. No third-party tracking unless you opt in. <a href="/privacy.html">Read more</a>.
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
    // Suppress on conversion + form pages
    if (path.endsWith('/samples.html') || path.endsWith('/wholesale.html') || path.endsWith('/thank-you.html')) return;
    let dismissed;
    try { dismissed = localStorage.getItem(KEY); } catch(e){}
    if (dismissed) return;

    setTimeout(() => {
      const css = document.createElement('style');
      css.textContent = `
        .pg-news { position: fixed; bottom: 21px; right: 21px; width: 320px; background: #FAF6EE; color: #2A2A2A; padding: 21px; border-radius: 16px; z-index: 78; box-shadow: 0 21px 55px rgba(42,42,42,0.22); font-family: 'Inter', sans-serif; font-size: 13px; line-height: 1.5; border: 1px solid rgba(122,140,110,0.32); animation: pgNewsIn .45s cubic-bezier(.25,.6,.5,1) forwards; transform: translateY(34px); opacity: 0; }
        @keyframes pgNewsIn { from { transform: translateY(34px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .pg-news .pg-news-close { position: absolute; top: 8px; right: 8px; background: rgba(42,42,42,0.06); border: none; width: 26px; height: 26px; border-radius: 50%; cursor: pointer; color: #2A2A2A; font-size: 14px; opacity: 0.6; }
        .pg-news .pg-news-close:hover { opacity: 1; }
        .pg-news h4 { font-family: 'Fraunces', serif; font-style: italic; font-weight: 600; font-size: 20px; letter-spacing: -0.3px; margin-bottom: 8px; color: #2A2A2A; }
        .pg-news h4 em { color: #7A8C6E; }
        .pg-news p { color: #5A5A5A; font-size: 12px; margin-bottom: 13px; }
        .pg-news form { display: flex; gap: 8px; }
        .pg-news input[type=email] { flex: 1; font-family: 'Inter', sans-serif; font-size: 14px; padding: 10px 13px; border: 1.5px solid rgba(42,42,42,0.18); border-radius: 8px; background: #fff; color: #2A2A2A; }
        .pg-news input[type=email]:focus { outline: none; border-color: #7A8C6E; }
        .pg-news button[type=submit] { font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 700; padding: 10px 13px; background: #7A8C6E; color: #fff; border: none; border-radius: 8px; cursor: pointer; }
        .pg-news .success { color: #7A8C6E; font-style: italic; font-family: 'Fraunces', serif; font-size: 15px; }
        @media (max-width: 640px) { .pg-news { width: auto; left: 13px; right: 13px; bottom: 80px; } }
      `;
      document.head.appendChild(css);

      const panel = document.createElement('div');
      panel.className = 'pg-news';
      panel.innerHTML = `
        <button class="pg-news-close" aria-label="Dismiss">×</button>
        <h4>get <em>pack notes</em> monthly.</h4>
        <p>One short note a month: pricing, compliance, supply chain. From operators, for operators. Zero spam, one-click unsubscribe.</p>
        <form action="#" method="post" onsubmit="return false;">
          <input type="email" required placeholder="you@yourbiz.com" name="email" autocomplete="email">
          <button type="submit">subscribe</button>
        </form>
      `;
      document.body.appendChild(panel);

      panel.querySelector('.pg-news-close').addEventListener('click', () => {
        try { localStorage.setItem(KEY, '1'); } catch(e){}
        panel.remove();
      });
      panel.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = panel.querySelector('input[type=email]').value;
        // TODO: replace with real Formspree / Mailchimp / Beehiiv endpoint
        // For now: persist + show success
        try { localStorage.setItem(KEY, 'subscribed:' + email); } catch(e){}
        panel.innerHTML = '<button class="pg-news-close" aria-label="Dismiss">×</button><div class="success">subscribed. you will hear from us monthly.</div>';
        panel.querySelector('.pg-news-close').addEventListener('click', () => panel.remove());
        if (window.packguysTrack) window.packguysTrack('newsletter_subscribe', { method: 'sliderup' });
      });
    }, 30000); // 30 seconds
  })();

  // ============================================================
  // GA4 EVENT TRACKING — runs only after consent (packguysTrack gated)
  // Comprehensive funnel + engagement tracking
  // ============================================================
  (function eventTracking() {
    function track(event, params) {
      if (window.packguysTrack) window.packguysTrack(event, params || {});
      else if (window.gtag) gtag('event', event, params || {});
    }

    // ---- 1. Scroll depth (25/50/75/100%) ----
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

    // ---- 2. Outbound + special-protocol link clicks ----
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if (!a || !a.href) return;
      const href = a.href;
      // Outbound (external) link
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

    // ---- 3. Primary CTA clicks (by location) ----
    document.querySelectorAll('a.pill').forEach(btn => {
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

    // ---- 4. Form submissions (samples + wholesale) ----
    document.querySelectorAll('form.form-card').forEach(form => {
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

    // ---- 5. Catalog page: view_item_list + select_item ----
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
      // case-size selection → select_item
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
      // qty input change → add_to_cart proxy
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

    // ---- 6. Tube detail pages: view_item ----
    if (location.pathname.startsWith('/tubes/')) {
      const skuMatch = location.pathname.match(/116mm-(\w+)/);
      if (skuMatch) {
        const color = skuMatch[1];
        const sku = 'PG-TUBE-116-' + color.substring(0, 3).toUpperCase();
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

    // ---- 7. Thank-you page: purchase / conversion ----
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

    // ---- 8. Drawer + promo banner interaction ----
    const drawerToggle = document.getElementById('drawer-toggle');
    if (drawerToggle) drawerToggle.addEventListener('click', () => track('drawer_open', { source: 'nav_hamburger' }));
    document.querySelectorAll('.promo-msg a').forEach(a => {
      a.addEventListener('click', () => track('promo_click', { destination: a.href }));
    });

    // ---- 9. Pricing tier click on home ----
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

    // ---- 10. Time-on-page heartbeats (30s, 90s, 180s) ----
    [30, 90, 180].forEach(sec => {
      setTimeout(() => track('time_on_page', { seconds: sec, page: location.pathname }), sec * 1000);
    });

  })();

  // ============================================================
  // WEB VITALS — Core Web Vitals collected from real visitors
  // Captures CLS / LCP / INP / FCP / TTFB → GA4 as web_vitals events
  // ~50 lines vs full web-vitals library (3KB CDN) — same accuracy
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
        CLS:  [0.1, 0.25],     // good < 0.1, poor > 0.25
        LCP:  [2500, 4000],    // ms
        INP:  [200, 500],      // ms
        FCP:  [1800, 3000],    // ms
        TTFB: [800, 1800],     // ms
      };
      const t = thresholds[name]; if (!t) return 'unknown';
      return value <= t[0] ? 'good' : value <= t[1] ? 'needs-improvement' : 'poor';
    }

    // LCP — Largest Contentful Paint
    try {
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const last = entries[entries.length - 1];
        if (last) send('LCP', last.renderTime || last.loadTime, rate('LCP', last.renderTime || last.loadTime));
      }).observe({ type: 'largest-contentful-paint', buffered: true });
    } catch(e){}

    // CLS — Cumulative Layout Shift
    try {
      let cls = 0;
      new PerformanceObserver((list) => {
        for (const e of list.getEntries()) if (!e.hadRecentInput) cls += e.value;
      }).observe({ type: 'layout-shift', buffered: true });
      addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') send('CLS', cls, rate('CLS', cls));
      });
    } catch(e){}

    // INP — Interaction to Next Paint (replaces FID)
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

    // FCP — First Contentful Paint
    try {
      new PerformanceObserver((list) => {
        const fcp = list.getEntries().find(e => e.name === 'first-contentful-paint');
        if (fcp) send('FCP', fcp.startTime, rate('FCP', fcp.startTime));
      }).observe({ type: 'paint', buffered: true });
    } catch(e){}

    // TTFB — Time to First Byte
    try {
      const nav = performance.getEntriesByType('navigation')[0];
      if (nav) {
        const ttfb = nav.responseStart;
        send('TTFB', ttfb, rate('TTFB', ttfb));
      }
    } catch(e){}
  })();

})();

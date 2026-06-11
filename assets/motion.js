/* motion.js — The Pack Guys scroll-reveal + count-up. Reduced-motion + no-IO safe.
   Usage: add data-reveal (or data-reveal="left|right|scale") to any element.
   For staggered groups, add data-reveal-group to a parent; its [data-reveal]
   children get an incremental delay. Count-up: <span data-countup="1625" data-prefix="$">. */
(function () {
  'use strict';
  var root = document.documentElement;
  root.classList.remove('no-js');

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var supportsIO = 'IntersectionObserver' in window;

  function revealNow(el) { el.classList.add('is-revealed'); }

  function init() {
    // Stagger grouped children
    document.querySelectorAll('[data-reveal-group]').forEach(function (group) {
      var step = parseInt(group.getAttribute('data-reveal-step') || '90', 10);
      var kids = group.querySelectorAll('[data-reveal]');
      kids.forEach(function (kid, i) {
        if (!kid.style.getPropertyValue('--reveal-delay')) {
          kid.style.setProperty('--reveal-delay', (i * step) + 'ms');
        }
      });
    });

    var targets = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));

    if (reduce || !supportsIO) { targets.forEach(revealNow); initCountups(true); return; }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { revealNow(e.target); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

    targets.forEach(function (t) {
      // Already-in-view-on-load elements reveal immediately (above the fold)
      var r = t.getBoundingClientRect();
      if (r.top < (window.innerHeight || 0) * 0.92 && r.bottom > 0) { revealNow(t); }
      else { io.observe(t); }
    });

    initCountups(false);
  }

  // ── Count-up numbers ──────────────────────────────────────────────────────
  function initCountups(instant) {
    var nums = Array.prototype.slice.call(document.querySelectorAll('[data-countup]'));
    if (!nums.length) return;

    function run(el) {
      var target = parseFloat(el.getAttribute('data-countup')) || 0;
      var prefix = el.getAttribute('data-prefix') || '';
      var suffix = el.getAttribute('data-suffix') || '';
      var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
      var fmt = function (n) {
        return prefix + n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
      };
      if (instant || reduce) { el.textContent = fmt(target); return; }
      var dur = 1100, start = null;
      function tick(ts) {
        if (start === null) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
        el.textContent = fmt(target * eased);
        if (p < 1) requestAnimationFrame(tick); else el.textContent = fmt(target);
      }
      requestAnimationFrame(tick);
    }

    if (instant || reduce || !supportsIO) { nums.forEach(run); return; }
    var io2 = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { run(e.target); io2.unobserve(e.target); } });
    }, { threshold: 0.6 });
    nums.forEach(function (n) { io2.observe(n); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();

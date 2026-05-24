// The Pack Guys — shared cutoff timer
// Single source extracted from prior per-page inline duplication.
// Counts down to 2 PM Pacific cutoff for same-day shipping.
// Loaded with <script src="cutoff.js" defer></script> on every page.

(function () {
  var el = document.getElementById('cutoff');
  if (!el) return;

  var msgEl = el.querySelector('[data-msg]');
  var countEl = el.querySelector('[data-count]');
  if (!msgEl || !countEl) return;

  var cutoffHour = parseInt(el.getAttribute('data-cutoff') || '14', 10);
  var tz = el.getAttribute('data-tz') || 'America/Los_Angeles';

  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function ptNow() {
    return new Date(new Date().toLocaleString('en-US', { timeZone: tz }));
  }

  function tick() {
    var t = ptNow();
    var dow = t.getDay();
    var hour = t.getHours();
    var weekend = dow === 0 || dow === 6;
    var past = hour >= cutoffHour;

    if (weekend) {
      el.classList.add('cutoff--closed');
      msgEl.innerHTML = 'Order now — ships first thing Monday from LA';
      countEl.textContent = '';
      return;
    }

    if (past) {
      el.classList.add('cutoff--closed');
      msgEl.innerHTML = 'Cutoff passed — orders placed now ship tomorrow morning from LA';
      countEl.textContent = '';
      return;
    }

    el.classList.remove('cutoff--closed');
    var h = cutoffHour - hour - 1;
    var m = 59 - t.getMinutes();
    var s = 60 - t.getSeconds();
    if (s === 60) { s = 0; m += 1; }
    if (m === 60) { m = 0; h += 1; }
    countEl.textContent = pad(h) + ':' + pad(m) + ':' + pad(s);
    msgEl.innerHTML = 'Order within <strong data-count>' + countEl.textContent + '</strong> for same-day shipping from LA';
    // re-query because msgEl innerHTML replaced
    countEl = el.querySelector('[data-count]');
  }

  tick();
  setInterval(tick, 1000);
})();

// === Mobile nav drawer toggle ===
(function () {
  var btn = document.querySelector('.hamburger');
  var drawer = document.querySelector('.nav-drawer');
  if (!btn || !drawer) return;

  btn.addEventListener('click', function () {
    var open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', open ? 'false' : 'true');
    drawer.setAttribute('data-open', open ? 'false' : 'true');
    document.body.style.overflow = open ? '' : 'hidden';
  });

  // Close drawer on link click
  drawer.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      btn.setAttribute('aria-expanded', 'false');
      drawer.setAttribute('data-open', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
      btn.setAttribute('aria-expanded', 'false');
      drawer.setAttribute('data-open', 'false');
      document.body.style.overflow = '';
      btn.focus();
    }
  });
})();

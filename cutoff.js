// The Pack Guys — V3 cutoff timer + nav
// State machine: pre-cutoff (live countdown) → post-cutoff (next-window) → weekend
// Avoids loss-frame copy on the post state per UX spec.

(function () {
  var el = document.getElementById('cutoff');
  if (!el) return;
  var msgEl = el.querySelector('.cutoff__time');
  var metaEl = el.querySelector('.cutoff__meta');
  var countEl = el.querySelector('#cutoff-countdown');
  if (!msgEl || !countEl) return;

  var cutoffHour = parseInt(el.getAttribute('data-cutoff') || '14', 10);
  var tz = el.getAttribute('data-tz') || 'America/Los_Angeles';

  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function ptNow() {
    return new Date(new Date().toLocaleString('en-US', { timeZone: tz }));
  }

  function nextWeekdayDate(d) {
    // returns label like "Tue 8am PT"
    var weekdays = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    var dd = new Date(d.getTime());
    dd.setDate(dd.getDate() + 1);
    while (dd.getDay() === 0 || dd.getDay() === 6) {
      dd.setDate(dd.getDate() + 1);
    }
    return weekdays[dd.getDay()] + ' 8am PT';
  }

  function tick() {
    var t = ptNow();
    var dow = t.getDay();
    var hour = t.getHours();
    var weekend = dow === 0 || dow === 6;
    var past = hour >= cutoffHour;

    if (weekend) {
      el.classList.add('cutoff--closed');
      msgEl.innerHTML = '<span class="cutoff__time-icon" aria-hidden="true"></span> Warehouse opens <strong class="cutoff__countdown">Mon 8am&nbsp;PT</strong> · orders queue now';
      if (metaEl) metaEl.textContent = 'Closed today · weekend';
      return;
    }

    if (past) {
      el.classList.add('cutoff--closed');
      msgEl.innerHTML = '<span class="cutoff__time-icon" aria-hidden="true"></span> Next ship window <strong class="cutoff__countdown">' + nextWeekdayDate(t) + '</strong> · order now to be first out';
      if (metaEl) metaEl.textContent = 'Cutoff 14:00 PT · daily';
      return;
    }

    el.classList.remove('cutoff--closed');
    var h = cutoffHour - hour - 1;
    var m = 59 - t.getMinutes();
    var s = 60 - t.getSeconds();
    if (s === 60) { s = 0; m += 1; }
    if (m === 60) { m = 0; h += 1; }
    countEl.textContent = pad(h) + ':' + pad(m) + ':' + pad(s);
  }

  tick();
  setInterval(tick, 1000);
})();

// Slash key opens search (placeholder until real command bar is wired)
(function () {
  document.addEventListener('keydown', function (e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if ((e.key === '/' || (e.metaKey && e.key === 'k') || (e.ctrlKey && e.key === 'k'))) {
      e.preventDefault();
      var btn = document.querySelector('.cmdbar__search');
      if (btn) {
        btn.focus();
        btn.style.borderColor = 'var(--customs)';
        setTimeout(function () { btn.style.borderColor = ''; }, 400);
      }
    }
  });
})();

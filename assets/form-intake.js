/* Pack Guys async form intake — posts to Cloudflare Worker, redirects to success URL.
   Forms opt in via class="pg-async-form" + data-form-type + data-success-url. */
(function () {
  var WORKER_URL = 'https://pack-guys-form-intake.lamberthahm.workers.dev/';

  function setSubmitting(form, on) {
    var btn = form.querySelector('button[type=submit], input[type=submit]');
    if (!btn) return;
    if (on) {
      btn.dataset.origLabel = btn.dataset.origLabel || (btn.textContent || btn.value);
      btn.disabled = true;
      if ('value' in btn && btn.tagName === 'INPUT') btn.value = 'Sending…';
      else btn.textContent = 'Sending…';
    } else {
      btn.disabled = false;
      if (btn.dataset.origLabel) {
        if (btn.tagName === 'INPUT') btn.value = btn.dataset.origLabel;
        else btn.textContent = btn.dataset.origLabel;
      }
    }
  }

  function serialize(form) {
    var data = {};
    var fd = new FormData(form);
    fd.forEach(function (value, key) {
      if (data[key] === undefined) data[key] = value;
      else if (Array.isArray(data[key])) data[key].push(value);
      else data[key] = [data[key], value];
    });
    return data;
  }

  function attach(form) {
    if (form.dataset.pgWired) return;
    form.dataset.pgWired = '1';
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var formType = form.dataset.formType || 'unknown';
      var successUrl = form.dataset.successUrl || 'thank-you.html?type=' + formType;
      var payload = serialize(form);
      payload.form_type = formType;
      setSubmitting(form, true);

      fetch(WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'omit'
      }).then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      }).then(function () {
        // Best-effort GA4 conversion ping (if gtag is loaded)
        try {
          if (typeof window.gtag === 'function') {
            window.gtag('event', formType + '_submitted', { event_category: 'form', event_label: formType });
          }
        } catch (_) {}
        location.assign(successUrl);
      }).catch(function (err) {
        setSubmitting(form, false);
        alert('Sorry — submission failed. Please email hello@thepackguys.com directly. (' + err.message + ')');
      });
    });
  }

  function init() {
    var forms = document.querySelectorAll('form.pg-async-form');
    for (var i = 0; i < forms.length; i++) attach(forms[i]);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

/* Pack Guys async form intake — posts to Cloudflare Worker, redirects to success URL.
   Forms opt in via class="pg-async-form" + data-form-type + data-success-url. */
(function () {
  var WORKER_URL = 'https://pack-guys-form-intake.lamberthahm.workers.dev/';

  // Map our internal form_type values to the GA4 key events Lambert
  // already marked as conversions in the GA4 admin. Using the standard
  // Google ecommerce/lead-gen event names so Google Ads can import them
  // as conversions natively, and Looker Studio/standard reports work.
  var GA4_KEY_EVENT = {
    wholesale:            'wholesale_application_complete',
    sample:               'purchase',         // $14.99 sample kit IS a transaction
    contact:              'generate_lead',
    catalog_quote:        'qualify_lead',
    toolkit_request:      'generate_lead',    // brand-toolkit email capture
    newsletter:           'sign_up',          // newsletter slider-up
    preorder_reservation: 'purchase'          // 20% deposit IS a transaction
  };
  // Extra params for ecommerce-style events that need value/currency.
  // For preorder_reservation, deposit_amount is read from the form's hidden
  // input at submit time and overrides the static value.
  // For sample, the conversion value is now dynamic per qty (100/500/1000 tier).
  var GA4_KEY_EVENT_PARAMS = {};
  function dynamicParams(formType, form) {
    if (formType === 'preorder_reservation') {
      var dep = parseFloat((form.querySelector('input[name=deposit_amount]') || {}).value || '0');
      return { currency: 'USD', value: dep || 0 };
    }
    if (formType === 'sample') {
      var qty = (form.querySelector('input[name=qty]:checked') || {}).value;
      var v = qty === '100' ? 14.99 : qty === '500' ? 60 : qty === '1000' ? 85 : 0;
      return { currency: 'USD', value: v };
    }
    return null;
  }

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

  function clearInvalidState(form) {
    var marked = form.querySelectorAll('.pg-form__field--invalid');
    for (var i = 0; i < marked.length; i++) marked[i].classList.remove('pg-form__field--invalid');
    var banner = form.querySelector('.pg-form__validation-banner');
    if (banner) banner.remove();
  }

  function markInvalidFields(form) {
    var invalids = form.querySelectorAll(':invalid');
    var firstFocusable = null;
    var count = 0;
    for (var i = 0; i < invalids.length; i++) {
      var el = invalids[i];
      if (el === form) continue;
      // climb to the nearest .pg-form__field wrapper for visual treatment
      var wrap = el.closest('.pg-form__field');
      if (wrap) wrap.classList.add('pg-form__field--invalid');
      if (!firstFocusable && el.focus) firstFocusable = el;
      count++;
    }
    return { count: count, first: firstFocusable };
  }

  function showValidationBanner(form, count) {
    var existing = form.querySelector('.pg-form__validation-banner');
    if (existing) existing.remove();
    var banner = document.createElement('div');
    banner.className = 'pg-form__validation-banner';
    banner.setAttribute('role', 'alert');
    banner.textContent = count === 1
      ? '1 field needs attention'
      : count + ' fields need attention';
    form.insertBefore(banner, form.firstChild);
  }

  function attach(form) {
    if (form.dataset.pgWired) return;
    form.dataset.pgWired = '1';

    // Live-clear invalid state once the user starts fixing a field
    form.addEventListener('input', function (e) {
      var wrap = e.target.closest('.pg-form__field--invalid');
      if (wrap && e.target.checkValidity && e.target.checkValidity()) {
        wrap.classList.remove('pg-form__field--invalid');
      }
    }, true);
    form.addEventListener('change', function (e) {
      var wrap = e.target.closest('.pg-form__field--invalid');
      if (wrap && e.target.checkValidity && e.target.checkValidity()) {
        wrap.classList.remove('pg-form__field--invalid');
      }
    }, true);

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      clearInvalidState(form);

      // Explicit validity check — give user clear visual feedback before fetch
      if (typeof form.checkValidity === 'function' && !form.checkValidity()) {
        var result = markInvalidFields(form);
        showValidationBanner(form, result.count);
        if (result.first) {
          var rect = result.first.getBoundingClientRect();
          var targetY = window.scrollY + rect.top - 120; // offset for sticky nav + progress bar
          window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
          // Focus after the smooth scroll settles so the cursor lands in the field
          setTimeout(function () { try { result.first.focus({ preventScroll: true }); } catch(_) { result.first.focus(); } }, 350);
        }
        if (window.packguysTrack) {
          window.packguysTrack('form_validation_fail', { form: form.dataset.formType || 'unknown', missing: result.count });
        }
        return;
      }

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
        try {
          if (typeof window.gtag === 'function') {
            // Standard GA4 key event (mapped) — these are the ones Lambert
            // configured as conversions in GA4 admin + that Google Ads
            // imports natively.
            var keyEvent = GA4_KEY_EVENT[formType];
            if (keyEvent) {
              var params = Object.assign(
                { event_category: 'form', event_label: formType },
                GA4_KEY_EVENT_PARAMS[formType] || {},
                dynamicParams(formType, form) || {}
              );
              // Transaction ID for purchase + lead dedup
              params.transaction_id = formType + '-' + Date.now();
              window.gtag('event', keyEvent, params);
            }
            // Also keep the granular event so per-form dashboards still work
            window.gtag('event', formType + '_submitted', { event_category: 'form', event_label: formType });
          }
        } catch (_) {}
        location.assign(successUrl);
      }).catch(function (err) {
        setSubmitting(form, false);
        showValidationBanner(form, 0);
        var banner = form.querySelector('.pg-form__validation-banner');
        if (banner) banner.textContent = 'Submission failed — please email hello@thepackguys.com directly.';
        window.scrollTo({ top: form.getBoundingClientRect().top + window.scrollY - 120, behavior: 'smooth' });
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

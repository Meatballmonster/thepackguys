// The Pack Guys — lead form tracking + submit. dataLayer-driven (GTM-ready) + GA4/Ads enhanced conversions.
window.dataLayer = window.dataLayer || [];
document.querySelectorAll('form[action*="workers.dev"]:not(#subForm)').forEach(function(f){
  var started=false, ft=(f.querySelector('[name=form_type]')||{}).value||'contact';
  // funnel: form_start on first interaction
  f.addEventListener('focusin',function(){ if(started)return; started=true;
    dataLayer.push({event:'form_start', form_type:ft});
    if(window.gtag) gtag('event','form_start',{form_type:ft});
  });
  f.addEventListener('submit',function(e){
    e.preventDefault();
    var btn=f.querySelector('[type=submit]'); if(btn){btn.disabled=true;btn.textContent='Sending…';}
    var data={}; new FormData(f).forEach(function(v,k){data[k]=v;});
    if(data._gotcha){return;} // honeypot
    // enhanced conversions: hashed user-provided data (Google hashes client-side)
    if(window.gtag && data.email){ gtag('set','user_data',{email:data.email}); }
    dataLayer.push({event:'generate_lead', form_type:ft, value:1, currency:'USD'});
    if(window.gtag){ gtag('event','generate_lead',{form_type:ft, value:1, currency:'USD'}); }
    fetch(f.action,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)})
      .then(function(r){return r.ok?r:Promise.reject(r);})
      .then(function(){ window.location.href='/thank-you.html'; })
      .catch(function(){ if(btn){btn.disabled=false;btn.textContent='Try again →';}
        alert('Something went wrong — email sales@thepackguys.com and we\'ll handle it direct.'); });
  });
});
// CTA click tracking (key conversion paths) — dataLayer + GA4
document.addEventListener('click',function(e){
  var a=e.target.closest('a'); if(!a)return; var h=a.getAttribute('href')||'';
  var map={'/samples.html':'order_sample','/wholesale.html':'apply_wholesale','/catalog.html':'view_catalog','/calculator.html':'use_calculator','/cert/':'view_cert'};
  var label = h.indexOf('mailto:')===0 ? 'email_click' : map[h];
  if(label){ dataLayer.push({event:'cta_click', cta:label, href:h}); if(window.gtag) gtag('event','cta_click',{cta:label}); }
},true);

document.querySelectorAll('form[action*="workers.dev"]:not(#subForm)').forEach(function(f){
  f.addEventListener('submit',function(e){
    e.preventDefault();
    var btn=f.querySelector('[type=submit]'); if(btn){btn.disabled=true;btn.textContent='Sending…'}
    var data={}; new FormData(f).forEach(function(v,k){data[k]=v});
    if(data._gotcha){return} // honeypot
    if(window.gtag)gtag('event','generate_lead',{form_type:data.form_type||'contact'});
    fetch(f.action,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)})
      .then(function(r){return r.ok?r:Promise.reject(r)})
      .then(function(){window.location.href='/thank-you.html'})
      .catch(function(){if(btn){btn.disabled=false;btn.textContent='Try again →'}
        alert('Something went wrong — email sales@thepackguys.com and we\'ll handle it direct.')});
  });
});

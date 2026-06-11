(function(){
  var CK='pg_consent', SUB='pg_sub';
  function setConsent(g){ if(window.gtag) gtag('consent','update',{analytics_storage:g?'granted':'denied',ad_storage:g?'granted':'denied',ad_user_data:g?'granted':'denied',ad_personalization:g?'granted':'denied'}); }
  var bar=document.getElementById('cookieBar');
  var pop=document.getElementById('subPop'), fired=false;
  function maybeSub(){
    if(!pop||localStorage.getItem(SUB)||!localStorage.getItem(CK))return;
    setTimeout(function(){ if(!localStorage.getItem(SUB)) pop.hidden=false; },12000);
  }
  // cookie consent
  var saved=localStorage.getItem(CK);
  if(saved){ setConsent(saved==='granted'); }
  else if(bar){ bar.hidden=false; }
  function choose(g){ localStorage.setItem(CK,g?'granted':'denied'); setConsent(g); if(bar)bar.hidden=true; maybeSub(); }
  var a=document.getElementById('ckAccept'),d=document.getElementById('ckDecline');
  a&&a.addEventListener('click',function(){choose(true)});
  d&&d.addEventListener('click',function(){choose(false)});
  // subscribe popup — also trigger at 45% scroll once consent chosen
  window.addEventListener('scroll',function(){
    if(fired||!pop||localStorage.getItem(SUB)||!localStorage.getItem(CK))return;
    if((window.scrollY+window.innerHeight)/document.body.scrollHeight>0.45){fired=true;pop.hidden=false;}
  },{passive:true});
  maybeSub();
  var x=document.getElementById('subClose');
  x&&x.addEventListener('click',function(){pop.hidden=true;localStorage.setItem(SUB,'dismissed');});
  var form=document.getElementById('subForm');
  form&&form.addEventListener('submit',function(e){
    e.preventDefault();
    var data={};new FormData(form).forEach(function(v,k){data[k]=v});
    if(data._gotcha)return;
    if(window.gtag)gtag('event','generate_lead',{form_type:'subscribe'});
    fetch(form.action,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}).catch(function(){});
    localStorage.setItem(SUB,'subscribed');
    form.hidden=true; document.getElementById('subOk').hidden=false;
    setTimeout(function(){pop.hidden=true},3800);
  });
})();

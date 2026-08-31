
(function(){
  const here = location.pathname.split('/').pop();
  document.querySelectorAll('[data-day-link]').forEach(a=>{if(a.getAttribute('href')===here)a.style.color='var(--accent)'});
})();

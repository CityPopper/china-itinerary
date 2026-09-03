// Language is part of the URL, so navigation and shared links keep the chosen language.
(function(){
  const link=document.querySelector('[data-language-switch]');
  if(!link)return;
  function sync(){
    let hash=location.hash;
    const active=document.querySelector('[data-day-target][aria-current="date"]');
    const section=active&&document.getElementById(active.dataset.dayTarget);
    if(section&&section.getBoundingClientRect().top<=window.innerHeight/2)hash=active.hash;
    link.hash=hash;
  }
  link.addEventListener('click',sync);
  link.addEventListener('focus',sync);
  window.addEventListener('hashchange',sync);
  sync();
})();

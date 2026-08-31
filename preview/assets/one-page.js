(function () {
  const timeline = document.querySelector('.date-timeline');
  const timelineScroll = document.querySelector('[data-timeline-scroll]');
  const links = [...document.querySelectorAll('[data-day-target]')];
  const sections = links.map((link) => document.getElementById(link.dataset.dayTarget)).filter(Boolean);
  const locationStage = document.querySelector('[data-location-stage]');
  const locationArtwork = [...document.querySelectorAll('[data-location-art]')];

  if (!timeline || !timelineScroll || !links.length || !sections.length) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let activeId = '';
  let activeLocation = '';
  let frame = 0;

  function stickyOffset() {
    const topbar = document.querySelector('.topbar');
    return (topbar?.offsetHeight || 0) + timeline.offsetHeight + 24;
  }

  function keepDateVisible(link) {
    if (timelineScroll.scrollWidth <= timelineScroll.clientWidth) return;
    const left = link.offsetLeft - (timelineScroll.clientWidth - link.offsetWidth) / 2;
    timelineScroll.scrollTo({
      left: Math.max(0, left),
      behavior: reducedMotion.matches ? 'auto' : 'smooth'
    });
  }

  function setActiveArtwork(location) {
    if (!location || location === activeLocation) return;
    activeLocation = location;

    if (locationStage) locationStage.dataset.activeLocation = location;
    locationArtwork.forEach((artwork) => {
      const selected = artwork.dataset.locationArt === location;
      artwork.classList.toggle('active', selected);
      if (selected) artwork.removeAttribute('aria-hidden');
      else artwork.setAttribute('aria-hidden', 'true');
    });
  }

  function setActive(id, center = true) {
    if (!id || id === activeId) return;
    activeId = id;

    const section = document.getElementById(id);
    setActiveArtwork(section?.dataset.location);

    links.forEach((link) => {
      const selected = link.dataset.dayTarget === id;
      link.classList.toggle('active', selected);
      if (selected) link.setAttribute('aria-current', 'date');
      else link.removeAttribute('aria-current');
      if (selected && center) keepDateVisible(link);
    });
  }

  function updateActiveDate() {
    frame = 0;
    const marker = stickyOffset();
    let current = sections[0];

    for (const section of sections) {
      if (section.getBoundingClientRect().top <= marker) current = section;
      else break;
    }

    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) {
      current = sections[sections.length - 1];
    }

    setActive(current.id);
  }

  function queueUpdate() {
    if (!frame) frame = requestAnimationFrame(updateActiveDate);
  }

  links.forEach((link) => {
    link.addEventListener('click', () => setActive(link.dataset.dayTarget));
  });

  window.addEventListener('scroll', queueUpdate, { passive: true });
  window.addEventListener('resize', queueUpdate, { passive: true });
  window.addEventListener('load', () => {
    const hashTarget = location.hash ? document.querySelector(location.hash) : null;
    if (hashTarget?.classList.contains('itinerary-day')) {
      requestAnimationFrame(() => {
        const previousScrollBehavior = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = 'auto';
        hashTarget.scrollIntoView({ block: 'start' });
        document.documentElement.style.scrollBehavior = previousScrollBehavior;
        queueUpdate();
      });
    } else {
      queueUpdate();
    }
  }, { once: true });

  queueUpdate();
})();

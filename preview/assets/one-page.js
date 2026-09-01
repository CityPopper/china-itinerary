(function () {
  const timeline = document.querySelector('.date-timeline');
  const timelineScroll = document.querySelector('[data-timeline-scroll]');
  const links = [...document.querySelectorAll('[data-day-target]')];
  const sections = links.map((link) => document.getElementById(link.dataset.dayTarget)).filter(Boolean);
  const locationStage = document.querySelector('[data-location-stage]');
  const locationArtwork = [...document.querySelectorAll('[data-location-art]')];

  if (!timeline || !timelineScroll || !links.length || !sections.length) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobileArtwork = window.matchMedia('(max-width: 900px)');
  let activeId = '';
  let activeArtworkId = '';
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

  function artworkFor(location) {
    return locationArtwork.find((artwork) => artwork.dataset.location === location);
  }

  function syncArtworkAccessibility() {
    const reel = mobileArtwork.matches;
    locationArtwork.forEach((artwork) => {
      const selected = artwork.dataset.locationArt === activeArtworkId;
      if (reel || selected) artwork.removeAttribute('aria-hidden');
      else artwork.setAttribute('aria-hidden', 'true');
    });
    if (locationStage) {
      locationStage.dataset.mobileMode = reel ? 'reel' : 'sticky';
      if (reel) locationStage.tabIndex = 0;
      else locationStage.removeAttribute('tabindex');
    }
  }

  function setActiveArtwork(location) {
    if (!location) return;
    const selectedArtwork = artworkFor(location);
    if (!selectedArtwork) return;

    if (selectedArtwork.dataset.locationArt !== activeArtworkId) {
      activeArtworkId = selectedArtwork.dataset.locationArt;

      if (locationStage) {
        locationStage.dataset.activeLocation = location;
        locationStage.dataset.activeEra = selectedArtwork.dataset.era || '';
      }
      locationArtwork.forEach((artwork) => {
        artwork.classList.toggle('active', artwork === selectedArtwork);
      });
    }
    syncArtworkAccessibility();
  }

  function setActive(id, center = true) {
    if (!id) return;
    const section = document.getElementById(id);
    setActiveArtwork(section?.dataset.location);
    if (id === activeId) return;
    activeId = id;

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

    setActive(current.id, true);
  }

  function queueUpdate() {
    if (!frame) frame = requestAnimationFrame(updateActiveDate);
  }

  links.forEach((link) => {
    link.addEventListener('click', () => setActive(link.dataset.dayTarget));
  });

  window.addEventListener('scroll', queueUpdate, { passive: true });
  window.addEventListener('resize', queueUpdate, { passive: true });
  mobileArtwork.addEventListener('change', () => {
    syncArtworkAccessibility();
    queueUpdate();
  });
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

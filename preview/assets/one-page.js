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

  function artworkFor(location, marker) {
    const portraits = locationArtwork.filter((artwork) => artwork.dataset.location === location);
    if (portraits.length <= 1) return portraits[0];

    const locationSections = sections.filter((section) => section.dataset.location === location);
    const first = locationSections[0];
    const last = locationSections[locationSections.length - 1];
    if (!first || !last) return portraits[0];

    const groupTop = first.getBoundingClientRect().top + window.scrollY;
    const groupBottom = last.getBoundingClientRect().bottom + window.scrollY;
    const progress = Math.max(0, Math.min(1, (window.scrollY + marker - groupTop) / Math.max(1, groupBottom - groupTop)));
    return portraits[progress >= (locationSections.length === 1 ? .36 : .48) ? portraits.length - 1 : 0];
  }

  function setActiveArtwork(location, marker = stickyOffset()) {
    if (!location) return;
    const selectedArtwork = artworkFor(location, marker);
    if (!selectedArtwork || selectedArtwork.dataset.locationArt === activeArtworkId) return;

    activeArtworkId = selectedArtwork.dataset.locationArt;

    if (locationStage) {
      locationStage.dataset.activeLocation = location;
      locationStage.dataset.activeEra = selectedArtwork.dataset.era || '';
    }
    locationArtwork.forEach((artwork) => {
      const selected = artwork === selectedArtwork;
      artwork.classList.toggle('active', selected);
      if (selected) artwork.removeAttribute('aria-hidden');
      else artwork.setAttribute('aria-hidden', 'true');
    });
  }

  function setActive(id, center = true, marker = stickyOffset()) {
    if (!id) return;
    const section = document.getElementById(id);
    setActiveArtwork(section?.dataset.location, marker);
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

    setActive(current.id, true, marker);
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

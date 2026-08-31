import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const previewDirectory = path.dirname(fileURLToPath(import.meta.url));

const locations = {
  shenzhen: {
    name: 'Shenzhen',
    art: 'assets/pixel-art/shenzhen.png',
    alt: 'Pastel pixel-art view of an ancient Lingnan harbor with pavilions, sailboats, mangroves, and distant hills'
  },
  guangzhou: {
    name: 'Guangzhou',
    art: 'assets/pixel-art/guangzhou.png',
    alt: 'Pastel pixel-art view of an ancient Cantonese city along the broad Pearl River with arcades, boats, a pagoda, and kapok trees'
  },
  guilin: {
    name: 'Guilin',
    art: 'assets/pixel-art/guilin.png',
    alt: 'Pastel pixel-art view of Guilin karst peaks, misty water, twin pagodas, and a bamboo raft'
  },
  xingping: {
    name: 'Xingping',
    art: 'assets/pixel-art/xingping.png',
    alt: 'Pastel pixel-art view of Xingping Ancient Town, the Li River, karst peaks, a bamboo raft, and a hanfu-clad traveler'
  },
  chongqing: {
    name: 'Chongqing',
    art: 'assets/pixel-art/chongqing.png',
    alt: 'Pastel pixel-art view of an ancient Chongqing river city with layered hillside buildings, bridges, boats, and lanterns'
  },
  chengdu: {
    name: 'Chengdu',
    art: 'assets/pixel-art/chengdu.png',
    alt: 'Pastel pixel-art view of a Chengdu bamboo grove, panda, teahouse courtyard, temple roofs, and misty hills'
  }
};

const days = [
  {
    number: '01', date: '08', weekday: 'Sunday', city: 'shenzhen', title: 'Arrival in Shenzhen', theme: 'A soft landing',
    summary: 'Land, transfer to Futian, and keep the first evening intentionally easy. If energy allows, step out for a relaxed dinner or a short wander before an early night.',
    beats: ['Arrive and settle in', 'Orient around Futian', 'Choose an easy nearby dinner'], stay: 'Shenzhen', move: 'Airport → Futian · 35–60 min'
  },
  {
    number: '02', date: '09', weekday: 'Monday', city: 'shenzhen', title: 'Shenzhen Shopping Day', theme: 'Electronics to street style',
    summary: 'Spend a full day moving through Shenzhen’s most energetic shopping districts, from electronics and anime merchandise to fashion, snacks, and night-market browsing.',
    beats: ['Huaqiangbei electronics', 'BitCity anime mall', 'Dongmen after dark'], stay: 'Shenzhen', move: 'Metro day · minimal backtracking'
  },
  {
    number: '03', date: '10', weekday: 'Tuesday', city: 'shenzhen', title: 'Design, Waterfront & Books', theme: 'Modern Shenzhen',
    summary: 'Pair futuristic architecture with the bay and the old lanes of Nantou, then finish among the sculptural shelves of Zhongshuge at Happy Harbor.',
    beats: ['MOCAPE architecture', 'Shenzhen Bay + Nantou', 'Zhongshuge at sunset'], stay: 'Shenzhen', move: 'Metro + short DiDi hops'
  },
  {
    number: '04', date: '11', weekday: 'Wednesday', city: 'guangzhou', title: 'Guangzhou Day Trip', theme: 'Shopping and Cantonese food',
    summary: 'Ride the high-speed train to Guangzhou for dim sum and a focused shopping day between Tianhe and Beijing Road, then return to the same Shenzhen hotel.',
    beats: ['Dim sum breakfast', 'Tianhe and Taikoo Hui', 'Beijing Road food walk'], stay: 'Shenzhen', move: 'HSR · 30–45 min each way'
  },
  {
    number: '05', date: '12', weekday: 'Thursday', city: 'guilin', title: 'Shenzhen → Guilin', theme: 'Into the karst landscape',
    summary: 'Take the morning train inland, settle near Guilin’s central lakes, and ease into the scenery with an illuminated waterfront walk and a simple local dinner.',
    beats: ['High-speed rail to Guilin', 'Check in near the lakes', 'Two Rivers & Four Lakes'], stay: 'Guilin', move: 'HSR · about 3 hr'
  },
  {
    number: '06', date: '13', weekday: 'Friday', city: 'xingping', title: 'Xingping + Hanfu Day', theme: 'Ancient lanes and river light',
    summary: 'Make a day trip to Xingping for stone lanes, the famous Li River view, a hanfu photo session, and sunset among the karst peaks before returning to Guilin.',
    beats: ['Xingping Ancient Town', 'Hanfu styling and photos', 'Li River sunset'], stay: 'Guilin', move: 'HSR + taxi · about 1 hr each way'
  },
  {
    number: '07', date: '14', weekday: 'Saturday', city: 'guilin', title: 'A Slow Guilin Day', theme: 'Space to wander',
    summary: 'Use this buffer day for Guilin’s classic riverside scenery, an optional cave visit, and an unhurried evening around the lakes and pedestrian streets.',
    beats: ['Elephant Trunk Hill', 'Optional Reed Flute Cave', 'Lakeside cafés and snacks'], stay: 'Guilin', move: 'Walk + short DiDi rides'
  },
  {
    number: '08', date: '15', weekday: 'Sunday', city: 'chongqing', title: 'Guilin → Chongqing', theme: 'Arrive for the night skyline',
    summary: 'Travel north by direct train, check in around Jiefangbei, and save your energy for Chongqing after dark—when the riverfront, hills, and lanterns feel most dramatic.',
    beats: ['Direct train north', 'Settle near Jiefangbei', 'Hongya Cave after dark'], stay: 'Chongqing', move: 'HSR · about 4–5 hr'
  },
  {
    number: '09', date: '16', weekday: 'Monday', city: 'chongqing', title: 'Full Chongqing Day', theme: 'A city built in layers',
    summary: 'Follow Chongqing’s vertical streets from the Liziba monorail to Shibati and the river cableway, then finish with a proper hotpot dinner.',
    beats: ['Liziba monorail', 'Shibati hillside streets', 'Cableway + hotpot'], stay: 'Chongqing', move: 'Metro, walking, and cableway'
  },
  {
    number: '10', date: '17', weekday: 'Tuesday', city: 'chengdu', title: 'Chongqing → Chengdu', theme: 'A gentler pace',
    summary: 'Make the short rail hop to Chengdu, settle near Chunxi Road, and spend the afternoon easing into the city through Taikoo Li, shops, and Sichuan food.',
    beats: ['Short high-speed train', 'Taikoo Li and Chunxi Road', 'Relaxed Sichuan dinner'], stay: 'Chengdu', move: 'HSR · about 1–1.5 hr'
  },
  {
    number: '11', date: '18', weekday: 'Wednesday', city: 'chengdu', title: 'Pandas + Wenshu', theme: 'A classic Chengdu day',
    summary: 'Reach the panda base near opening time, then slow the pace at Wenshu Monastery with temple courtyards, tea, and traditional snacks.',
    beats: ['Early Panda Base visit', 'Wenshu Monastery', 'Optional night-market food'], stay: 'Chengdu', move: 'Early DiDi + metro return'
  },
  {
    number: '12', date: '19', weekday: 'Thursday', city: 'chengdu', title: 'Tea, Alleys + Opera', theme: 'Culture at Chengdu speed',
    summary: 'Let the day unfold slowly through People’s Park, a traditional teahouse, Kuanzhai Alleys, and an evening Sichuan Opera performance.',
    beats: ['People’s Park teahouse', 'Kuanzhai Alleys', 'Face-changing opera'], stay: 'Chengdu', move: 'Metro + walking'
  },
  {
    number: '13', date: '20', weekday: 'Friday', city: 'chengdu', title: 'Spa / Bathhouse Day', theme: 'A deliberately slow finale',
    summary: 'Keep the final full day restorative with a long urban spa or bathhouse session, good food, and an easy last evening with no ambitious sightseeing.',
    beats: ['Slow breakfast', 'Spa or bathhouse afternoon', 'Final-night food crawl'], stay: 'Chengdu', move: 'Local DiDi or metro only'
  },
  {
    number: '14', date: '21', weekday: 'Saturday', city: 'chengdu', title: 'Fly Home to Vancouver', theme: 'Departure day',
    summary: 'Keep the morning simple, confirm which Chengdu airport the flight uses, and leave a generous transfer buffer before beginning the journey home.',
    beats: ['Easy morning', 'Confirm TFU or CTU', 'Airport with time to spare'], stay: 'Vancouver next', move: 'Airport transfer · 30–75 min'
  }
];

const timeline = days.map((day, index) => {
  const location = locations[day.city];
  return `<a class="date-link city-${day.city}${index === 0 ? ' active' : ''}" href="#day-${day.date}" data-day-target="day-${day.date}" aria-label="${day.weekday}, November ${Number(day.date)} — ${location.name}: ${day.title}"${index === 0 ? ' aria-current="date"' : ''}><span class="date-weekday">${day.weekday.slice(0, 3)}</span><strong class="date-number">${day.date}</strong><span class="date-city">${location.name}</span></a>`;
}).join('');

const locationArtwork = Object.entries(locations).map(([key, location], index) => `
      <figure class="location-art${index === 0 ? ' active' : ''}" data-location-art="${key}"${index === 0 ? '' : ' aria-hidden="true"'}>
        <img src="${location.art}" alt="${location.alt}" ${index === 0 ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"/>
        <figcaption><span>${String(index + 1).padStart(2, '0')} · ${location.name}</span><small>Original pastel pixel art</small></figcaption>
      </figure>`).join('');

const chapters = days.map((day) => {
  const location = locations[day.city];
  const beats = day.beats.map((beat) => `<li>${beat}</li>`).join('');
  return `<section class="itinerary-day day-chapter city-${day.city}" id="day-${day.date}" data-date="2026-11-${day.date}" data-location="${day.city}" aria-labelledby="day-${day.date}-title">
    <div class="chapter-copy">
        <div class="chapter-overline"><span>Day ${day.number}</span><time datetime="2026-11-${day.date}">${day.weekday} · Nov ${Number(day.date)}</time></div>
        <p class="chapter-location">${location.name}</p>
        <h2 id="day-${day.date}-title">${day.title}</h2>
        <p class="chapter-theme">${day.theme}</p>
        <p class="chapter-summary">${day.summary}</p>
        <ul class="chapter-beats" aria-label="Day highlights">${beats}</ul>
        <div class="chapter-meta"><div><span>Stay</span><strong>${day.stay}</strong></div><div><span>Move</span><strong>${day.move}</strong></div></div>
    </div>
  </section>`;
}).join('\n');

const output = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta content="width=device-width,initial-scale=1" name="viewport"/>
  <meta name="theme-color" content="#fff8ec"/>
  <title>China 2026 · Shenzhen to Chengdu</title>
  <link href="assets/one-page.css" rel="stylesheet"/>
</head>
<body id="top">
  <header class="topbar">
    <div class="wrap topbar-inner">
      <a class="brand" href="#top" aria-label="China itinerary, back to top"><span class="seal">中</span><span>China · Nov 2026</span></a>
      <nav class="main-nav" aria-label="Page sections"><a href="#overview">Overview</a><a href="#itinerary">14 days</a><a href="#essentials">Essentials</a></nav>
    </div>
  </header>

  <nav class="date-timeline" aria-label="Daily itinerary timeline">
    <div class="timeline-scroll" data-timeline-scroll><div class="date-track">${timeline}</div></div>
  </nav>

  <main>
    <section class="journey-hero" id="overview">
      <div class="hero-grid wrap">
        <div class="hero-copy"><p class="pixel-label">8–21 November 2026 · 14 days</p><h1>South China<br/><em>to</em> Sichuan</h1><p class="hero-lead">A rail-first journey through six places, told as one continuous scroll.</p><div class="hero-stats"><span><b>13</b> nights</span><span><b>4</b> bases</span><span><b>0</b> domestic flights</span></div></div>
        <aside class="hero-note" aria-label="Journey direction"><span>South → West</span><strong>22°N<br/>to 30°N</strong><p>Six location portraits appear once, then hold their place while each day unfolds.</p></aside>
      </div>
    </section>

    <section class="route-ribbon" aria-labelledby="route-title">
      <div class="wrap"><p class="pixel-label">The route</p><h2 id="route-title">Six places, four hotel bases</h2><div class="route-stops"><span>Shenzhen<small>4 nights</small></span><i>→</i><span>Guangzhou<small>day trip</small></span><i>→</i><span>Guilin<small>3 nights</small></span><i>→</i><span>Xingping<small>day trip</small></span><i>→</i><span>Chongqing<small>2 nights</small></span><i>→</i><span>Chengdu<small>4 nights</small></span></div></div>
    </section>

    <section class="itinerary-intro" id="itinerary"><div class="wrap"><p class="pixel-label">Scroll the journey</p><div><h2>Day by day</h2><p>Each location portrait stays pinned while its days move alongside it, then gives way to the next place on the route.</p></div></div></section>

    <div class="itinerary-stage">
      <div class="location-visuals">
        <div class="location-stage" data-location-stage aria-label="Location artwork">
${locationArtwork}
        </div>
      </div>
      <div class="day-stream">
${chapters}
      </div>
    </div>

    <section class="essentials" id="essentials">
      <div class="wrap"><p class="pixel-label">Before booking</p><h2>Trip essentials</h2><div class="essentials-grid">
        <article><span>01 · Bases</span><h3>Four hotels</h3><p>Futian in Shenzhen, central lakes in Guilin, Jiefangbei in Chongqing, and Chunxi Road / Taikoo Li in Chengdu.</p></article>
        <article><span>02 · Rail</span><h3>Travel by train</h3><p>Use high-speed rail between every Chinese base and for both day trips. Exact November 2026 inventory opens closer to departure.</p></article>
        <article><span>03 · Flight</span><h3>Check the airport</h3><p>Confirm whether the flight home leaves from Tianfu (TFU) or Shuangliu (CTU) before arranging the final transfer.</p></article>
      </div></div>
    </section>
  </main>

  <footer class="footer"><div class="wrap"><span>China · 8–21 November 2026</span><a href="#top">Back to top ↑</a></div></footer>
  <script src="assets/one-page.js"></script>
</body>
</html>`;

await writeFile(path.join(previewDirectory, 'index.html'), output);
console.log(`Built preview/index.html with ${days.length} concise day chapters and ${Object.keys(locations).length} single-use location artworks.`);

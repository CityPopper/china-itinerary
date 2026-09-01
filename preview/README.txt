China itinerary website — one-page preview

1. Open index.html in Safari, Chrome, Edge, or Firefox.
2. Use the sticky date timeline to jump to any day. It scrolls horizontally and keeps the active date visible on mobile.
3. The overview, route, all 14 daily summaries, hotel bases, transport, and booking notes are included on index.html.
4. The one-page preview uses six original pastel pixel-art scenes. Shenzhen, Guangzhou, Chongqing, and Chengdu use present-day city portraits; Guilin and Xingping remain landscape interludes.
5. On larger screens, the current location artwork stays pinned beside its daily summaries. On mobile, all six scenes become a normal-flow swipeable route reel so the itinerary keeps the full viewport.
6. Four regional taste notes use lightweight original pixel-art food illustrations.
7. Every breakfast, lunch, and dinner has its own swipeable three-frame original pixel-art gallery: 126 distinct illustrations across the 14 days, with no gallery asset reused. The one-page preview, including its panoramic rail hero, works locally and offline.

The individual files in days/ remain available as source/reference pages. To edit the
one-page experience, update the day summaries in build-one-page.mjs, then run:

  node build-one-page.mjs

Generated location art is stored in assets/pixel-art/.
Generated food art is stored in assets/pixel-food/.

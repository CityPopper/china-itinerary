China itinerary website — one-page preview

1. Open index.html in Safari, Chrome, Edge, or Firefox.
2. Use the sticky date timeline to jump to any day. It scrolls horizontally and keeps the active date visible on mobile.
3. The overview, route, all 14 daily summaries, hotel bases, transport, and booking notes are included on index.html.
4. The one-page preview uses six original pastel pixel-art scenes: one image element for each distinct location in a sticky artwork stage.
5. The artwork stays pinned while that location's daily summaries scroll beside or beneath it, then transitions when the location changes.
6. Everything required by the one-page preview works locally and offline.

The individual files in days/ remain available as source/reference pages. To edit the
one-page experience, update the day summaries in build-one-page.mjs, then run:

  node build-one-page.mjs

Generated location art is stored in assets/pixel-art/.

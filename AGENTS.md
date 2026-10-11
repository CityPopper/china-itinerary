# Project requirements

- The final deliverable is a single, standalone static HTML file.
- Use `public/index.html` as the webpage and final output.
- The final HTML must work when opened directly in a browser, without a server.
- Do not include JavaScript, script tags, event-handler attributes, or runtime dependencies in the final output.
- Keep any styling inside the HTML using a `<style>` element; do not require external CSS, fonts, or other asset files.
- Node and BrowserSync are development tools only. Their hot-reload script must not be included in the saved final HTML.
- Keep project instructions in this file instead of a README.
- All dependency installation, builds, generation, and development tooling must run inside the Docker container. Do not install dependencies or run project tooling on the host; use Docker Compose to invoke it in the container.
- Never add tests, test files, test suites, or test infrastructure.

# Local development

Run `docker compose up --build` and open http://localhost:3000.
Edit `src/index.html` for the page layout, `src/cards/ca1307.html` for the shared
CA 1307 flight card, and `src/cards/airport-transfer.html` for the shared airport
transfer card. The shared CZ 8118 flight card is in `src/cards/cz8118.html`.
Arrival-specific transfer details live in `src/transfers.json`.
Chinese card text lives in `src/chinese.json`, with source references in
`src/chinese-sources.json`. `tools/translate-cards.mjs` generates independent
CSS-only English/Chinese switches for every card. Add or update the Chinese
text whenever changing card content; the build rejects untranslated English.
The container regenerates `public/index.html` and refreshes the browser when
these sources change. Do not edit the generated HTML directly. File watching
uses polling for Docker bind mounts.

To regenerate the standalone deliverable without starting the server, run
`docker compose run --rm --no-deps website node tools/build.mjs`.

Press Ctrl+C to stop the foreground server. Run `docker compose down` to remove
the container.

# Verification

Before delivering, open `public/index.html` directly in a browser and check that
the content and layout work without JavaScript or external resources. Deliver
the file from disk, since the development server injects its reload script into
HTTP responses.

# Publishing

GitHub Pages uses `.github/workflows/pages.yml` to publish the contents of
`public/` from `main` at https://citypopper.github.io/china-itinerary/.
The generated `public/index.html` is served as the site's root `index.html`.
Regenerate it in Docker and commit it alongside source changes before pushing.
Do not restore the old root website or publish the repository root.

# Restaurant research

An earlier search omitted Flavorz and Paletto because it treated Tripadvisor's
listed distance as uncertain and excluded them before checking the hotel's
Tripadvisor page. That page explicitly lists Flavorz as a four-minute walk and
Paletto as a five-minute walk. This was an incomplete verification step, not
an inability to find the restaurants.

- Read the full nearby-restaurant list for the exact hotel, including highly
  rated hotel restaurants, before finalizing a shortlist.
- Check the hotel's Tripadvisor page for explicit walking-time estimates.
  Do not exclude a candidate solely by converting listed distance to minutes.
- Distinguish Tripadvisor's published walking times from your own estimates;
  nearby-list distances alone do not establish a verified walking route.
- Verify the exact branch and address before adding review or map links.
  Mall entrances, crossings and elevators can affect the actual walk.

# Chinese translations

- Prefer official Chinese names and official descriptions that convey the
  relevant information. Check operator websites, hotel or restaurant brand
  websites, mall directories, and government visitor guides first.
- When an official source is unavailable, use a reliable venue listing or
  travel source and record that distinction in `src/chinese-sources.json`.
- Translations need not be word-for-word. Use concise, natural Simplified
  Chinese while preserving the meaning, qualifications, dates, flight numbers,
  phone numbers, prices, and destinations. Do not invent official wording.
- Keep map links, review links, and booking details unchanged when switching
  language. Every card must have its own accessible top-right language control
  and work without JavaScript, network access, or a translation API.

# Destination cards

Use `src/cards/destination.html` for future destination cards. Add a record to
`src/destinations.json` under a unique lowercase slug, then include
`{{card:destination:slug}}` at the desired location in `src/index.html`.

Each record needs English fields `name`, `summary`, `address`, `transport`,
`origin`, and `journeyTime`, plus a Chinese counterpart for each with the `Zh`
suffix (for example, `nameZh`). Add `directions` as an array of `{ "en": "...",
"zh": "..." }` steps, `driverTextZh` as the Chinese request to show a driver,
and `sourceUrl` for the official destination information. Optional `mapQuery`
can specify the exact map search; otherwise the Chinese name and address are
used. Use the real address and verify journey estimates from the stated origin.

The template includes destination information, how to get there, an inset
Chinese driver card, source/map links, and the automatic language switch.
Do not show empty example destinations on the published itinerary.

# China itinerary

A static travel website with two designs and two languages.

- Live English: [index.html](index.html)
- Live 简体中文: [zh/index.html](zh/index.html)
- Preview English: [preview/index.html](preview/index.html)
- Preview 简体中文: [preview/zh/index.html](preview/zh/index.html)
- Use the **中文 / English** link in the header to switch the same page. Daily navigation stays in that language; section anchors are carried across.
- Both languages share templates, photos, itinerary structure, and interactions. English remains the default at every existing URL.

## Edit text

All editable copy lives in **content/**:

| File | What to edit |
| --- | --- |
| `content/en/site.json` | English page copy: navigation, headings, itinerary, notes, dates, image descriptions |
| `content/zh-CN/site.json` | Matching Simplified Chinese page copy |
| `content/en/meals.json` | English meal titles, descriptions, and meal labels, grouped by date |
| `content/zh-CN/meals.json` | Matching Chinese meal copy |
| `content/en/ui.json` | English gallery controls, meal section labels, and language switch |
| `content/zh-CN/ui.json` | Matching Chinese interface labels |

1. Search for the current wording in the appropriate JSON file.
2. Edit the value while keeping its key unchanged. Identical shared wording uses one key, so an edit updates every place using it.
3. Edit the matching key in the other language too. In meals, keep date filenames, `set`, `ig`, and `night` aligned between languages: these control images, links, and layout.
4. Rebuild using Docker:

```sh
docker compose run --rm build
```

The build creates ready-to-host HTML and small language-specific assets. It rejects missing translations and mismatched placeholders. Do not edit generated HTML or `assets/text.*` files; rebuilding replaces those edits.

- Text is escaped when rendered. Existing HTML entities such as `&amp;` are supported; do not put HTML tags in copy values.
- Keep named variables such as `{title}` and `{number}` in interface labels. Their order can change in Chinese.
- To add a text block, add a descriptive, permanent key to both site catalogs and use `{{copy.your-key}}` in its template under `templates/`. Use `{{attr.your-key}}` inside an alt, title, or aria-label attribute.
- Layout and markup live in `templates/index.html`, `templates/days/`, and `templates/preview/`. Each template produces both languages. Keep IDs, links, and gallery keys stable when changing copy.
- New page templates produce English and Chinese pages automatically; add navigation links as needed.
- `preview/build-one-page.mjs` is a compatibility entry point for the full build. It no longer contains separate copy or replaces the preview with an older layout.

## Local preview and checks

Any server runs in Docker:

```sh
docker compose up -d preview
docker compose run --rm build node --test tests/i18n.test.mjs
docker compose down
```

Open [the live design](http://localhost:4173/) or [the preview design](http://localhost:4173/preview/).

- Docker Compose uses shared SELinux volume labels for compatibility with the Docker-compatible Podman setup.
- No production server, database, framework, or backend is required. Deploy the generated HTML, CSS, JavaScript, and images to the existing static host.
- The HTML and local assets also open directly from disk. External traveler photos and social links require internet access.
- Commit the edited catalogs/templates and generated outputs together so the published site matches the editable source.

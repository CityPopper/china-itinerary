import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import { root, templateFiles, readJSON, renderCopy, pageOutput, buildPage } from '../scripts/build.mjs';

const files = await templateFiles();
const content = {};
for (const locale of ['en', 'zh-CN']) {
  content[locale] = {};
  for (const name of ['site', 'meals', 'ui']) content[locale][name] = await readJSON(path.join(root, 'content', locale, name + '.json'));
}
const relative = file => path.relative(path.join(root, 'templates'), file).split(path.sep).join('/');
const decode = value => value.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#39;', "'");
const attributes = (html, name) => [...html.matchAll(new RegExp('\\b' + name + '="([^"]*)"', 'g'))].map(m => decode(m[1]));
const read = file => readFile(path.join(root, file), 'utf8');

test('all 30 templates produce both complete static languages', async () => {
  assert.equal(files.length, 30);
  assert.deepEqual(Object.keys(content.en.site).sort(), Object.keys(content['zh-CN'].site).sort());
  for (const file of files) {
    const source = relative(file);
    const template = await readFile(file, 'utf8');
    for (const locale of ['en', 'zh-CN']) {
      const output = await read(pageOutput(source, locale));
      assert.equal(output, buildPage(template, source, locale, content[locale]), 'Stale output: ' + source);
      assert.ok(output.includes('<html lang="' + locale + '">'));
      assert.ok(!output.includes('{{copy.') && !output.includes('{{attr.'));
      assert.equal((output.match(/data-language-switch/g) || []).length, 1);
    }
  }
});

test('English migration preserves original text and markup, apart from gallery lookup attributes', {
  skip: !process.env.BASELINE_DIR
}, async () => {
  const normalize = html => html.replace(/ data-gallery-key="[^"]*"/g, '').replaceAll('&amp;', '&');
  for (const file of files) {
    const original = await readFile(path.join(process.env.BASELINE_DIR, relative(file)), 'utf8');
    assert.equal(normalize(renderCopy(await readFile(file, 'utf8'), content.en.site)), normalize(original), relative(file));
  }
  const original = await readFile(path.join(process.env.BASELINE_DIR, 'preview/assets/site.js'), 'utf8');
  const start = original.indexOf('const F=');
  const end = original.indexOf('  function gallery', start);
  const originalMeals = vm.runInNewContext(original.slice(start, end) + ';plans');
  assert.equal(JSON.stringify(content.en.meals), JSON.stringify(originalMeals), 'English meal copy changed');
});

test('Chinese covers every string while preserving meal images and destinations', () => {
  const unchanged = Object.keys(content.en.site).filter(key => content.en.site[key] === content['zh-CN'].site[key]);
  assert.deepEqual(unchanged, ['riad-by-the-theatre']); // Venue has no supplied Chinese name.
  assert.deepEqual(Object.keys(content.en.meals), Object.keys(content['zh-CN'].meals));
  for (const [date, meals] of Object.entries(content.en.meals)) {
    assert.equal(meals.length, 3);
    meals.forEach((meal, i) => {
      const translated = content['zh-CN'].meals[date][i];
      for (const field of ['set', 'ig', 'night']) assert.equal(translated[field], meal[field]);
      for (const field of ['meal', 'title', 'desc']) assert.match(translated[field], /\p{Script=Han}/u);
    });
  }
});

test('all page and asset links resolve, and switching keeps the same page and design', async () => {
  for (const file of files) {
    for (const locale of ['en', 'zh-CN']) {
      const source = relative(file);
      const output = pageOutput(source, locale);
      const html = await read(output);
      const base = new URL(output, 'https://itinerary.test/');
      for (const value of [...attributes(html, 'src'), ...attributes(html, 'href')]) {
        if (!value || /^(?:[a-z]+:|\/\/|#)/i.test(value)) continue;
        const url = new URL(value, base);
        if (url.origin !== base.origin) continue;
        await access(path.join(root, decodeURIComponent(url.pathname)));
      }
      const switchTag = html.match(/<a [^>]*data-language-switch[^>]*>/)?.[0];
      assert.ok(switchTag);
      const switchURL = new URL(attributes(switchTag, 'href')[0], base);
      assert.equal(switchURL.pathname.slice(1), pageOutput(source, locale === 'en' ? 'zh-CN' : 'en'));
      if (locale === 'zh-CN') {
        for (const value of attributes(html.replace(switchTag, ''), 'href')) {
          if (!value.endsWith('.html') || /^(?:[a-z]+:|\/\/)/i.test(value)) continue;
          // Alternate-language metadata is intentionally outside zh/.
          if (html.includes('hreflang="en" href="' + value + '"')) continue;
          assert.ok(new URL(value, base).pathname.includes('/zh/'), value);
        }
      }
    }
  }
});

test('generated language data works without network requests, including interpolation', async () => {
  for (const flavor of ['', 'preview/']) {
    for (const locale of ['en', 'zh-CN']) {
      const context = { window: {} };
      vm.runInNewContext(await read(flavor + 'assets/text.' + locale + '.js'), context);
      const data = context.window.ItineraryText;
      assert.equal(data.locale, locale);
      assert.equal(JSON.stringify(data.meals), JSON.stringify(content[locale].meals));
      assert.equal(data.t('traveler_photo_alt', { title: 'Sample', number: 2 }),
        content[locale].ui.traveler_photo_alt.replace('{title}', 'Sample').replace('{number}', '2'));
      assert.throws(() => data.t('not_a_key'));
      assert.throws(() => data.t('photo_gallery'));
    }
  }
});

test('all changed browser scripts parse', async () => {
  for (const flavor of ['', 'preview/']) {
    for (const file of ['site.js', 'social-galleries.js', 'language-switch.js']) {
      new vm.Script(await read(flavor + 'assets/' + file), { filename: flavor + file });
    }
  }
});

test('preview retains all 126 local food illustrations', async () => {
  for (const date of Object.keys(content.en.meals)) {
    const day = date.match(/2026-11-(\d{2})/)[1];
    for (let i = 0; i < 9; i++) await access(path.join(root, 'preview/assets/pixel-food/daily/day' + day + '-' + String(i).padStart(2, '0') + '.webp'));
  }
});

test('copy edits are escaped, missing copy fails, and gallery keys do not change with headings', () => {
  assert.equal(renderCopy('<p>{{copy.sample}}</p>', { sample: '<script> & tea' }), '<p>&lt;script&gt; &amp; tea</p>');
  assert.equal(renderCopy('<img alt="{{attr.sample}}">', { sample: '"Tea"' }), '<img alt="&quot;Tea&quot;">');
  assert.throws(() => renderCopy('{{copy.missing}}', {}), /Missing copy/);
  const template = '<h3 data-gallery-key="Huaqiangbei">{{copy.heading}}</h3>';
  assert.equal(renderCopy(template, { heading: 'New headline' }), '<h3 data-gallery-key="Huaqiangbei">New headline</h3>');
});

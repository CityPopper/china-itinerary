import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const locales = ['en', 'zh-CN'];
export async function templateFiles(directory = path.join(root, 'templates')) {
  const files = [];
  for (const entry of (await readdir(directory, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await templateFiles(full));
    else if (entry.name.endsWith('.html')) files.push(full);
  }
  return files;
}
export const readJSON = async file => JSON.parse(await readFile(file, 'utf8'));
export function escapeText(value) {
  return value.replace(/&(?!(?:#\d+|#x[\da-f]+|[a-z][a-z\d]+);)/gi, '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}
export const escapeAttribute = value => escapeText(value).replaceAll('"', '&quot;');
export function renderCopy(template, copy) {
  return template.replace(/\{\{(copy|attr)\.([a-z0-9-]+)\}\}/g, (_, context, key) => {
    if (typeof copy[key] !== 'string' || !copy[key].trim()) throw new Error('Missing copy: ' + key);
    return context === 'attr' ? escapeAttribute(copy[key]) : escapeText(copy[key]);
  });
}
function assertSameShape(reference, translated, name) {
  if (typeof reference === 'string') {
    if (typeof translated !== 'string' || !translated.trim()) throw new Error('Missing translation: ' + name);
    const tokens = s => [...s.matchAll(/\{([a-z]+)\}/g)].map(m => m[1]).sort().join(',');
    if (tokens(reference) !== tokens(translated)) throw new Error('Placeholder mismatch: ' + name);
    return;
  }
  if (reference && typeof reference === 'object') {
    if (!translated || Object.keys(reference).sort().join() !== Object.keys(translated).sort().join()) throw new Error('Key mismatch: ' + name);
    for (const key of Object.keys(reference)) assertSameShape(reference[key], translated[key], name + '.' + key);
  } else if (reference !== translated) throw new Error('Data mismatch: ' + name);
}
export function pageOutput(source, locale) {
  if (locale === 'en') return source;
  return source.startsWith('preview/') ? 'preview/zh/' + source.slice(8) : 'zh/' + source;
}
const relativeURL = (from, to) => path.posix.relative(path.posix.dirname(from), to) || path.posix.basename(to);
export function buildPage(template, source, locale, content) {
  const output = pageOutput(source, locale);
  const flavor = source.startsWith('preview/') ? 'preview/' : '';
  const assets = relativeURL(output, flavor + 'assets');
  const alternate = relativeURL(output, pageOutput(source, locale === 'en' ? 'zh-CN' : 'en'));
  let html = renderCopy(template, content.site).replace('<html lang="en">', '<html lang="' + locale + '">');
  if (locale !== 'en') {
    // Only asset paths move out of zh/. Page links remain inside the same language.
    html = html.replace(/\b(src|href)="((?:\.\.\/)?assets\/[^"#]+)"/g, (_, attribute, value) => attribute + '="../' + value + '"');
  }
  const switchLink = '<a class="language-switch" data-language-switch href="' + alternate + '" lang="' + (locale === 'en' ? 'zh-CN' : 'en') + '" hreflang="' + (locale === 'en' ? 'zh-CN' : 'en') + '" aria-label="' + escapeAttribute(content.ui.language_switch_label) + '">' + escapeText(content.ui.language_switch) + '</a>';
  html = html.replace(/(<nav class="(?:nav|main-nav)"[^>]*>[\s\S]*?<\/nav>)/, '<div class="header-actions">$1' + switchLink + '</div>');
  const additions = '\n<link rel="stylesheet" href="' + assets + '/languages.css"/>' +
    '\n<link rel="stylesheet" href="' + assets + '/text.' + locale + '.css"/>' +
    locales.map(lang => '\n<link rel="alternate" hreflang="' + lang + '" href="' + relativeURL(output, pageOutput(source, lang)) + '"/>').join('') +
    '\n<script src="' + assets + '/text.' + locale + '.js"></script>\n';
  html = html.replace('</head>', additions + '</head>');
  html = html.replace('</body>', '<script src="' + assets + '/language-switch.js"></script></body>');
  return html;
}
export async function build() {
  const content = {};
  for (const locale of locales) {
    content[locale] = {};
    for (const name of ['site', 'meals', 'ui']) content[locale][name] = await readJSON(path.join(root, 'content', locale, name + '.json'));
  }
  assertSameShape(content.en, content['zh-CN'], 'content');
  const files = await templateFiles();
  for (const file of files) {
    const source = path.relative(path.join(root, 'templates'), file).split(path.sep).join('/');
    const template = await readFile(file, 'utf8');
    for (const locale of locales) {
      const output = path.join(root, pageOutput(source, locale));
      const html = buildPage(template, source, locale, content[locale]);
      if (/\{\{(?:copy|attr)\./.test(html)) throw new Error('Unresolved copy in ' + output);
      await mkdir(path.dirname(output), { recursive: true });
      await writeFile(output, html);
    }
  }
  for (const flavor of ['', 'preview/']) {
    for (const locale of locales) {
      const { ui, meals } = content[locale];
      const data = JSON.stringify({ locale, ui, meals }).replaceAll('<', '\\u003c');
      const script = '// Generated from content/' + locale + '/. Run the Docker build after editing.\n(function(){\n  const data=' + data + ';\n  data.t=function(key, values={}){\n    if(typeof data.ui[key]!=="string")throw new Error("Unknown text key: "+key);\n    return data.ui[key].replace(/\\{([a-z]+)\\}/g,function(_,name){\n      if(!(name in values))throw new Error("Missing text variable: "+name);\n      return String(values[name]);\n    });\n  };\n  window.ItineraryText=data;\n})();\n';
      await writeFile(path.join(root, flavor, 'assets', 'text.' + locale + '.js'), script);
      await writeFile(path.join(root, flavor, 'assets', 'text.' + locale + '.css'), '/* Generated from content/' + locale + '/ui.json */\n:root{--meal-prefix:' + JSON.stringify(ui.food_prefix) + '}\n');
    }
    for (const name of ['languages.css', 'language-switch.js']) {
      await writeFile(path.join(root, flavor, 'assets', name), await readFile(path.join(root, 'scripts', name)));
    }
  }
  console.log('Built ' + files.length * locales.length + ' static pages in English and Simplified Chinese.');
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await build();

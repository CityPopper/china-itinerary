import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const read = path => fs.readFileSync(new URL(path, root), 'utf8');
const escape = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);

export function build() {
  const flight = read('src/cards/ca1307.html').trim();
  const czFlight = read('src/cards/cz8118.html').trim();
  const restaurants = read('src/cards/nearby-restaurants.html').trim();
  const transfer = read('src/cards/airport-transfer.html').trim();
  const arrivals = JSON.parse(read('src/transfers.json'));
  const html = read('src/index.html').replace(/\{\{card:([\w-]+)(?::([\w-]+))?\}\}/g, (_, card, arrival) => {
    if (card === 'ca1307') return flight;
    if (card === 'cz8118') return czFlight;
    if (card === 'nearby-restaurants') return restaurants;
    if (card !== 'airport-transfer' || !arrivals[arrival]) throw new Error(`Unknown card: ${card}:${arrival}`);
    return transfer.replace(/\{\{(\w+)\}\}/g, (_, key) => {
      if (!(key in arrivals[arrival])) throw new Error(`Missing transfer value: ${arrival}.${key}`);
      return escape(arrivals[arrival][key]);
    });
  });
  if (/\{\{[^}]+\}\}/.test(html)) throw new Error('Unresolved template placeholder');
  if (/<script\b|\son[a-z]+\s*=/i.test(html)) throw new Error('The final HTML must not contain JavaScript');
  const output = new URL('public/index.html', root);
  if (!fs.existsSync(output) || fs.readFileSync(output, 'utf8') !== html) {
    fs.mkdirSync(new URL('public/', root), { recursive: true });
    fs.writeFileSync(output, html);
    console.log('Generated public/index.html');
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) build();

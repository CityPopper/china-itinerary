import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { translateCards } from './translate-cards.mjs';

const root = new URL('../', import.meta.url);
const read = path => fs.readFileSync(new URL(path, root), 'utf8');
const escape = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);

export function build() {
  const dictionary = JSON.parse(read('src/chinese.json'));
  const destinations = JSON.parse(read('src/destinations.json'));
  const flight = read('src/cards/ca1307.html').trim();
  const czFlight = read('src/cards/cz8118.html').trim();
  const restaurants = read('src/cards/nearby-restaurants.html').trim();
  const transfer = read('src/cards/airport-transfer.html').trim();
  const arrivals = JSON.parse(read('src/transfers.json'));
  const page = read('src/index.html').replace(/\{\{card:([\w-]+)(?::([\w-]+))?\}\}/g, (_, card, arrival) => {
    if (card === 'ca1307') return flight;
    if (card === 'cz8118') return czFlight;
    if (card === 'nearby-restaurants') return restaurants;
    if (card === 'destination') {
      const destination = destinations[arrival];
      if (!destination || !/^[a-z0-9-]+$/.test(arrival)) throw new Error(`Unknown destination: ${arrival}`);
      const values = { id: arrival, ...destination };
      for (const key of ['name', 'summary', 'address', 'transport', 'origin', 'journeyTime']) {
        if (!destination[key] || !destination[`${key}Zh`]) throw new Error(`Missing bilingual destination field: ${arrival}.${key}`);
        dictionary[destination[key]] = destination[`${key}Zh`];
      }
      if (!destination.driverTextZh || !/[\u3400-\u9fff]/.test(destination.driverTextZh)) throw new Error(`Missing Chinese driver instructions: ${arrival}`);
      if (!Array.isArray(destination.directions) || !destination.directions.length) throw new Error(`Missing destination directions: ${arrival}`);
      values.directions = destination.directions.map(step => {
        if (!step.en || !step.zh) throw new Error(`Missing bilingual direction: ${arrival}`);
        dictionary[step.en] = step.zh;
        return `<li>${escape(step.en)}</li>`;
      }).join('');
      if (!/^https:\/\//.test(destination.sourceUrl)) throw new Error(`Missing destination source URL: ${arrival}`);
      const query = encodeURIComponent(destination.mapQuery || `${destination.nameZh} ${destination.addressZh}`);
      values.googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;
      values.appleMapsUrl = `https://maps.apple.com/?q=${query}`;
      return read('src/cards/destination.html').trim().replace(/\{\{(\w+)\}\}/g, (_, key) => {
        if (!(key in values)) throw new Error(`Missing destination field: ${arrival}.${key}`);
        return key === 'directions' ? values[key] : escape(values[key]);
      });
    }
    if (card !== 'airport-transfer' || !arrivals[arrival]) throw new Error(`Unknown card: ${card}:${arrival}`);
    return transfer.replace(/\{\{(\w+)\}\}/g, (_, key) => {
      if (!(key in arrivals[arrival])) throw new Error(`Missing transfer value: ${arrival}.${key}`);
      return escape(arrivals[arrival][key]);
    });
  });
  const html = translateCards(page, dictionary);
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

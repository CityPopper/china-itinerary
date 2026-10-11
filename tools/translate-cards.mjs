const escape = text => text.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
const decode = text => text.replace(/&(amp|lt|gt|quot|apos|#39);/g, (_, entity) => ({ amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", '#39': "'" })[entity]);

function translate(text, dictionary) {
  if (Object.hasOwn(dictionary, text)) return dictionary[text];
  const date = text.match(/^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d+) November (\d{4})$/);
  if (date) {
    const weekdays = { Monday: '一', Tuesday: '二', Wednesday: '三', Thursday: '四', Friday: '五', Saturday: '六', Sunday: '日' };
    return `${date[3]}年11月${date[2]}日 · 星期${weekdays[date[1]]}`;
  }
  const reviews = text.match(/^Tripadvisor: ([\d.]+\/5) · (\d+) reviews$/);
  if (reviews) return `Tripadvisor 评分：${reviews[1]} · ${reviews[2]} 条点评`;
  const walk = text.match(/^(\d+) m · (\d+)-minute walk$/);
  if (walk) return `${walk[1]} 米 · 步行 ${walk[2]} 分钟`;
  const distance = text.match(/^([\d–]+) m nearby$/);
  if (distance) return `距酒店约 ${distance[1]} 米`;
  if (!/[a-z]/i.test(text) || /^(AR|CZ|CZ \+ AR|YVR|PEK|SZX|SIN|TFU)$/.test(text) || /[\u3400-\u9fff]/.test(text)) return text;
  throw new Error(`Missing Chinese card translation: ${text}`);
}

export function translateCards(html, dictionary) {
  let cardNumber = 0;
  return html.replace(/(<article\b[^>]*>)([\s\S]*?)(<\/article>)/g, (_, opening, body, closing) => {
    const id = `card-language-${++cardNumber}`;
    const title = decode((body.match(/<h3\b[^>]*>([\s\S]*?)<\/h3>/)?.[1] || 'card').replace(/<[^>]+>/g, '').trim());
    const translated = body.split(/(<[^>]+>)/g).map(part => {
      if (part.startsWith('<') || !part.trim()) return part;
      const text = decode(part.trim());
      const chinese = translate(text, dictionary);
      if (chinese === text) return part;
      const leading = part.match(/^\s*/)[0];
      const trailing = part.match(/\s*$/)[0];
      return `${leading}<span class="card-en" lang="en">${part.trim()}</span><span class="card-zh" lang="zh-CN">${escape(chinese)}</span>${trailing}`;
    }).join('');
    return `${opening}\n<input class="card-language-choice" type="checkbox" id="${id}" aria-label="${escape(`Chinese version of ${title}`)}" aria-controls="${id}-content">\n<label class="card-language-toggle" for="${id}"><span class="card-en" lang="zh-CN">中文</span><span class="card-zh" lang="en">English</span></label>\n<div class="card-content" id="${id}-content">${translated}</div>\n${closing}`;
  });
}

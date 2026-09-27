// ============================================================
// ДВИЖОК СТАТЕЙ — сборка из блоков
// ============================================================

// ---------- Утилиты ----------
function slug(text) {
    return String(text)
        .toLowerCase()
        .replace(/[^\wа-яё\s-]/gi, '')
        .replace(/\s+/g, '-')
        .slice(0, 60);
}

// ---------- Блоки ----------

function paragraph({ text }) {
    return `<p>${text}</p>`;
}

function heading({ level = 2, text }) {
    const id = slug(text);
    return `<h${level} id="${id}">${text}</h${level}>`;
}

function list({ ordered = false, items = [] }) {
    const tag = ordered ? 'ol' : 'ul';
    return `<${tag}>${items.map(i => `<li>${i}</li>`).join('')}</${tag}>`;
}

function quote({ text, author, source }) {
    return `
    <blockquote class="quote">
      <p class="quote__text">«${text}»</p>
      <footer class="quote__footer">
        — <strong>${author}</strong>${source ? `, ${source}` : ''}
      </footer>
    </blockquote>
  `;
}

function formula({ source, legend }) {
    if (!legend || !legend.length) {
        return `<div class="formula-block"><div class="formula-body">${source}</div></div>`;
    }

    const legendHtml = legend.map(v => `
    <li>
      <span class="formula-legend__sym">${v.symbol}</span>
      <span class="formula-legend__dash">—</span>
      <span class="formula-legend__text">${v.meaning}</span>
      ${v.unit ? `<span class="formula-legend__unit">[${v.unit}]</span>` : ''}
    </li>
  `).join('');

    return `
    <div class="formula-block">
      <div class="formula-body">${source}</div>
      <ul class="formula-legend">${legendHtml}</ul>
    </div>
  `;
}

function diagram({ svg, caption }, article) {
    const content = typeof svg === 'string' && article?.diagrams?.[svg]
        ? article.diagrams[svg]
        : svg;

    return `
    <figure class="diagram">
      ${content}
      ${caption ? `<figcaption>${caption}</figcaption>` : ''}
    </figure>
  `;
}

const NOTE_KINDS = {
    info:    { icon: '💡', title: 'Интересно', cls: 'note--info' },
    warn:    { icon: '⚠️', title: 'Важно',     cls: 'note--warn' },
    danger:  { icon: '🚫', title: 'Ошибка',    cls: 'note--danger' },
    success: { icon: '✅', title: 'Совет',     cls: 'note--success' }
};

function note({ kind = 'info', title, text, items }) {
    const style = NOTE_KINDS[kind] || NOTE_KINDS.info;
    const body = items
        ? `<ul>${items.map(i => `<li>${i}</li>`).join('')}</ul>`
        : `<p>${text}</p>`;

    return `
    <div class="note ${style.cls}">
      <div class="note__head">
        <span class="note__icon">${style.icon}</span>
        <span>${title || style.title}</span>
      </div>
      <div class="note__body">${body}</div>
    </div>
  `;
}

// ---------- Реестр блоков ----------

const blocks = {
    paragraph,
    heading,
    list,
    quote,
    formula,
    diagram,
    note
};

// ---------- Публичное API ----------

export function buildArticle(article) {
    if (!article?.content) return '';
    return article.content
        .map(block => renderBlock(block, article))
        .join('\n');
}

function renderBlock(block, article) {
    const fn = blocks[block.type];
    if (!fn) {
        console.warn(`[article] Неизвестный блок: ${block.type}`);
        return '';
    }
    return fn(block, article);
}
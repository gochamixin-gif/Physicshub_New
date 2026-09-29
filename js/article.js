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

/**
 * Таблица.
 * { type: 'table', caption, headers: [...], rows: [[...], ...] }
 * Первая ячейка каждой строки — заголовок строки (<th scope="row">),
 * если у таблицы есть строка заголовков.
 */
function table({ caption, headers = [], rows = [] }) {
    const hasHead = headers.length > 0;

    const thead = hasHead
        ? `<thead><tr>${headers.map(h => `<th scope="col">${h}</th>`).join('')}</tr></thead>`
        : '';

    const tbody = rows.map(row => {
        const cells = row.map((cell, i) =>
            hasHead && i === 0
                ? `<th scope="row">${cell}</th>`
                : `<td>${cell}</td>`
        ).join('');
        return `<tr>${cells}</tr>`;
    }).join('');

    return `
    <div class="data-table-wrap">
      <table class="data-table">
        ${caption ? `<caption>${caption}</caption>` : ''}
        ${thead}
        <tbody>${tbody}</tbody>
      </table>
    </div>
  `;
}

/**
 * Разобранный пример задачи.
 * { type: 'example', title?, task, given, solution, answer }
 * Любое поле можно опустить — пустые строки не выводятся.
 */
function example({ title = 'Пример', task, given, solution, answer }) {
    const row = (mod, label, value) => value
        ? `
      <div class="example__row example__row--${mod}">
        <div class="example__label">${label}</div>
        <div class="example__value">${value}</div>
      </div>`
        : '';

    return `
    <div class="example">
      <div class="example__head">
        <span class="example__icon">📝</span>
        <span>${title}</span>
      </div>
      ${row('task',     'Задача',  task)}
      ${row('given',    'Дано',    given)}
      ${row('solution', 'Решение', solution)}
      ${row('answer',   'Ответ',   answer)}
    </div>
  `;
}

/**
 * Хронология.
 * { type: 'timeline', events: [{ year, text }, ...] }
 */
function timeline({ events = [] }) {
    const items = events.map(e => `
      <li class="timeline__item">
        <span class="timeline__year">${e.year}</span>
        <span class="timeline__text">${e.text}</span>
      </li>
    `).join('');

    return `<ol class="timeline">${items}</ol>`;
}

// ---------- Реестр блоков ----------

const blocks = {
    paragraph,
    heading,
    list,
    quote,
    formula,
    diagram,
    note,
    table,
    example,
    timeline
};

// ---------- Публичное API ----------

export function buildArticle(article) {
    if (!article?.content) return '';
    return article.content
        .map(block => renderBlock(block, article))
        .join('\n');
}

const IS_LOCAL = typeof location !== 'undefined'
    && ['localhost', '127.0.0.1', ''].includes(location.hostname);

function renderBlock(block, article) {
    const fn = blocks[block.type];
    if (!fn) {
        console.warn(`[article] Неизвестный блок: ${block.type}`);
        // На локальной машине показываем заметную плашку,
        // чтобы пропущенный блок нельзя было не заметить.
        return IS_LOCAL
            ? `<div class="block-unknown">Неизвестный блок: <code>${block.type}</code></div>`
            : '';
    }
    return fn(block, article);
}
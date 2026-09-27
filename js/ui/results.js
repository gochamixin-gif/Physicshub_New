// ============================================================
// РЕЗУЛЬТАТЫ ПОИСКА — рендер + фильтры
// ============================================================

import { searchArticles } from '../core/search.js';
import { database } from '../data/database.js';
import { clockIcon, bookIcon, telescopeIcon } from '../icons.js';
import { isArticleRead } from '../core/progress.js';

let activeCategory = 'all';

function getCategories() {
    const set = new Set();
    database.forEach(a => a.category && set.add(a.category));
    return ['all', ...Array.from(set).sort()];
}

function filterByCategory(items, category) {
    if (category === 'all') return items;
    return items.filter(a => a.category === category);
}

function renderFilters(categories, counts) {
    return `
    <div class="results-filters" id="resultsFilters">
      ${categories.map(cat => {
        const label = cat === 'all' ? 'Все разделы' : cat;
        const count = counts[cat] || 0;
        const active = cat === activeCategory ? ' results-filter--active' : '';
        const disabled = count === 0 ? ' results-filter--empty' : '';
        return `
          <button class="results-filter${active}${disabled}"
                  data-category="${cat}"
                  ${count === 0 ? 'disabled' : ''}>
            ${label}
            ${cat !== 'all' ? `<span class="results-filter__count">${count}</span>` : ''}
          </button>
        `;
    }).join('')}
    </div>
  `;
}

function countByCategory(items) {
    const counts = { all: items.length };
    items.forEach(a => {
        counts[a.category] = (counts[a.category] || 0) + 1;
    });
    return counts;
}

export function renderResults(query) {
    const container = document.getElementById('results');
    const allFound = searchArticles(query);

    if (!allFound.length) {
        container.innerHTML = `
      <div class="results-empty">
        <div class="results-empty__icon">${telescopeIcon(80)}</div>
        <h2 class="results-empty__title">Ничего не найдено по запросу «${query}»</h2>
        <p class="results-empty__hint">Попробуй: гравитация, энергия, электричество...</p>
      </div>
    `;
        return;
    }

    const categories = getCategories();
    const counts = countByCategory(allFound);
    const filtered = filterByCategory(allFound, activeCategory);

    container.innerHTML = `
    ${renderFilters(categories, counts)}
    <div class="results-list" id="resultsList">
      ${renderItems(filtered)}
    </div>
  `;

    bindFilterEvents(container, query);
}

function renderItems(items) {
    if (!items.length) {
        return `
      <div class="results-empty" style="padding:40px 20px;">
        <p class="results-empty__hint">В этой категории нет результатов.</p>
      </div>
    `;
    }

    return items.map(item => {
        const read = isArticleRead(item.id);
        return `
      <a class="result-item${read ? ' result-item--read' : ''}" data-id="${item.id}" href="#${item.id}">
        <div class="result-title">
          ${item.title}
          ${read ? '<span class="result-read-mark" title="Прочитано">✓</span>' : ''}
        </div>
        <div class="result-desc">${item.desc}</div>
        <div class="result-meta">
          <span class="result-meta__item">${bookIcon(14)} ${item.category}</span>
          <span class="result-meta__item">${clockIcon(14)} ${item.readTime}</span>
        </div>
      </a>
    `;
    }).join('');
}

function bindFilterEvents(container, query) {
    container.querySelectorAll('.results-filter').forEach(btn => {
        btn.addEventListener('click', () => {
            activeCategory = btn.dataset.category;
            renderResults(query);
        });
    });
}

export function resetFilter() {
    activeCategory = 'all';
}
// ============================================================
// ВКЛАДКА «ЛАБОРАТОРНЫЕ» — список
// ============================================================

import { labDatabase, getLabCategories, getLabCounts } from '../data/labs/index.js';

let activeFilter = 'all';

function levelStars(level) {
    return '⭐'.repeat(level);
}

function filterLabs() {
    if (activeFilter === 'all') return labDatabase;
    return labDatabase.filter(l => l.category === activeFilter);
}

function renderFilters() {
    const counts = getLabCounts();
    const cats = ['all', ...getLabCategories()];

    return `
    <div class="labs-filters" id="labsFilters">
      ${cats.map(cat => {
        const label = cat === 'all' ? 'Все работы' : cat;
        const count = counts[cat] || 0;
        const active = cat === activeFilter ? ' labs-filter--active' : '';
        return `
          <button class="labs-filter${active}" data-category="${cat}" type="button">
            ${label}
            <span class="labs-filter__count">${count}</span>
          </button>
        `;
    }).join('')}
    </div>
  `;
}

function renderList() {
    const items = filterLabs();

    if (!items.length) {
        return `<div class="labs-empty">🧪 Нет работ в этой категории</div>`;
    }

    return `
    <div class="labs-list">
      ${items.map(l => `
        <a class="lab-item" data-lab-id="${l.id}" href="#">
          <div class="lab-item__meta">
            <span class="lab-item__level">${levelStars(l.level)}</span>
            <span class="lab-item__category">${l.category}</span>
            <span>·</span>
            <span class="lab-item__topic">${l.topic}</span>
            <span>·</span>
            <span class="lab-item__duration">⏱ ${l.duration}</span>
          </div>
          <h3 class="lab-item__title">🧪 ${l.title}</h3>
          <p class="lab-item__desc">${l.desc}</p>
          <div class="lab-item__footer">
            <span class="lab-item__goal">🎯 ${l.goal}</span>
            <span class="lab-item__arrow">Открыть →</span>
          </div>
        </a>
      `).join('')}
    </div>
  `;
}

export function renderLabs() {
    const container = document.getElementById('labs');
    const total = labDatabase.length;

    container.innerHTML = `
    <div class="labs-page">
      <section class="labs-intro">
        <div class="labs-intro__label">ЛАБОРАТОРНЫЕ РАБОТЫ</div>
        <h1 class="labs-intro__title">${total} работ по школьному курсу</h1>
        <p class="labs-intro__desc">
          Пошаговые инструкции: цель, оборудование, ход работы, таблица результатов, вывод
        </p>
      </section>

      ${renderFilters()}

      <div id="labsListContainer">
        ${renderList()}
      </div>
    </div>
  `;

    bindFilters();
}

function bindFilters() {
    const container = document.getElementById('labsFilters');
    if (!container) return;

    container.addEventListener('click', e => {
        const btn = e.target.closest('.labs-filter');
        if (!btn) return;
        activeFilter = btn.dataset.category;
        renderLabs();
    });
}

export function resetLabFilter() {
    activeFilter = 'all';
}
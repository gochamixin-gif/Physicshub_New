// ============================================================
// РЕЗУЛЬТАТЫ ПОИСКА — с фильтрами, сортировкой и группировкой
// ============================================================

import { searchArticles } from '../core/search.js';
import { database } from '../data/database.js';
import { clockIcon, bookIcon, telescopeIcon } from '../icons.js';
import { isArticleRead } from '../core/progress.js';
import {
    renderGradeFilter,
    countByGrade,
    getGrade
} from '../core/grade-filter.js';

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

function renderCategoryFilters(categories, counts) {
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

// ============================================================
// СОРТИРОВКА ПО ХРОНОЛОГИИ
// ============================================================

function sortByChronology(items) {
    return [...items].sort((a, b) => {
        const ga = a.grade || 7;
        const gb = b.grade || 7;

        if (ga !== gb) return ga - gb;

        const oa = a.order || 999;
        const ob = b.order || 999;

        return oa - ob;
    });
}

// ============================================================
// ГЛАВНЫЙ РЕНДЕР
// ============================================================

export function renderResults(query) {
    const container = document.getElementById('results');
    const q = query ? query.trim() : '';

    // Получаем статьи
    let allFound;
    if (!q) {
        const grade = getGrade();
        allFound = grade === 'all'
            ? database
            : database.filter(a => !a.grade || a.grade === grade);
    } else {
        allFound = searchArticles(q);
    }

    // Сортируем по хронологии
    allFound = sortByChronology(allFound);

    const categories = getCategories();
    const counts = countByCategory(allFound);
    const gradeCounts = countByGrade(allFound);
    const filtered = filterByCategory(allFound, activeCategory);

    container.innerHTML = `
    ${renderGradeFilter({ showCounts: gradeCounts })}
    ${renderCategoryFilters(categories, counts)}
    <div class="results-list" id="resultsList">
      ${renderItems(filtered)}
    </div>
  `;

    bindFilterEvents(container, query);
    bindGradeEvents(container, query);
}

// ============================================================
// РЕНДЕР СПИСКА С ГРУППИРОВКОЙ ПО КЛАССАМ
// ============================================================

function renderItems(items) {
    if (!items.length) {
        return `
      <div class="results-empty" style="padding:40px 20px;">
        <p class="results-empty__hint">Ничего не найдено. Попробуй сменить класс или раздел.</p>
      </div>
    `;
    }

    // Группируем по классу
    const byGrade = {};
    items.forEach(item => {
        const g = item.grade || 7;
        if (!byGrade[g]) byGrade[g] = [];
        byGrade[g].push(item);
    });

    const grades = Object.keys(byGrade).map(Number).sort((a, b) => a - b);

    // Заголовки классов показываем только если классов больше одного
    const showGradeHeaders = grades.length > 1;

    return grades.map(g => {
        const header = showGradeHeaders
            ? `<div class="results-grade-header">🎓 ${g} класс</div>`
            : '';

        const itemsHtml = byGrade[g].map(item => {
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

        return header + itemsHtml;
    }).join('');
}

// ============================================================
// ОБРАБОТЧИКИ ФИЛЬТРОВ
// ============================================================

function bindFilterEvents(container, query) {
    container.querySelectorAll('.results-filter').forEach(btn => {
        btn.addEventListener('click', () => {
            activeCategory = btn.dataset.category;
            renderResults(query);
        });
    });
}

function bindGradeEvents(container, query) {
    container.querySelectorAll('.grade-filter__btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const val = btn.dataset.grade;
            import('../core/grade-filter.js').then(({ setGrade }) => {
                setGrade(val === 'all' ? 'all' : parseInt(val, 10));
                renderResults(query);
            });
        });
    });
}

export function resetFilter() {
    activeCategory = 'all';
}
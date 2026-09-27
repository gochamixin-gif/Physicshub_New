// ============================================================
// ВКЛАДКА «ЗАДАЧИ» — список задач + фильтры
// ============================================================

import { taskDatabase, getTaskCategories, getTaskCounts } from '../data/tasks/index.js';

let activeFilter = 'all';

/**
 * Уровень сложности значками
 */
function levelStars(level) {
    return '⭐'.repeat(level);
}

/**
 * Фильтрация задач
 */
function filterTasks() {
    if (activeFilter === 'all') return taskDatabase;
    return taskDatabase.filter(t => t.category === activeFilter);
}

/**
 * Рендер панели фильтров
 */
function renderFilters() {
    const counts = getTaskCounts();
    const cats = ['all', ...getTaskCategories()];

    return `
    <div class="tasks-filters" id="tasksFilters">
      ${cats.map(cat => {
        const label = cat === 'all' ? 'Все задачи' : cat;
        const count = counts[cat] || 0;
        const active = cat === activeFilter ? ' tasks-filter--active' : '';
        return `
          <button class="tasks-filter${active}" data-category="${cat}" type="button">
            ${label}
            <span class="tasks-filter__count">${count}</span>
          </button>
        `;
    }).join('')}
    </div>
  `;
}

/**
 * Рендер списка задач
 */
function renderList() {
    const items = filterTasks();

    if (!items.length) {
        return `
      <div class="tasks-empty">
        <div class="tasks-empty__icon">📭</div>
        <p>В этой категории пока нет задач</p>
      </div>
    `;
    }

    return `
    <div class="tasks-list">
      ${items.map(t => `
        <a class="task-item" data-task-id="${t.id}" href="#">
          <div class="task-item__meta">
            <span class="task-item__level">${levelStars(t.level)}</span>
            <span class="task-item__category">${t.category}</span>
            <span>·</span>
            <span class="task-item__topic">${t.topic}</span>
          </div>
          <div class="task-item__task">${t.task}</div>
          <div class="task-item__arrow">Решить →</div>
        </a>
      `).join('')}
    </div>
  `;
}

/**
 * Главный рендер страницы «Задачи»
 */
export function renderTasks() {
    const container = document.getElementById('tasks');
    const total = taskDatabase.length;
    const sections = getTaskCategories().length;

    container.innerHTML = `
    <div class="tasks-page">
      <section class="tasks-intro">
        <div class="tasks-intro__label">ЗАДАЧИ ПО ФИЗИКЕ</div>
        <h1 class="tasks-intro__title">
          ${total} задач по ${sections} разделам
        </h1>
        <p class="tasks-intro__desc">
          Условие, дано, решение и ответ — по каждому разделу школьного курса
        </p>
      </section>

      ${renderFilters()}

      <div id="tasksListContainer">
        ${renderList()}
      </div>
    </div>
  `;

    bindFilters();
}

/**
 * Обработчики кликов по фильтрам
 */
function bindFilters() {
    const container = document.getElementById('tasksFilters');
    if (!container) return;

    container.addEventListener('click', e => {
        const btn = e.target.closest('.tasks-filter');
        if (!btn) return;

        activeFilter = btn.dataset.category;
        renderTasks();
    });
}

/**
 * Сброс фильтра при входе во вкладку
 */
export function resetTaskFilter() {
    activeFilter = 'all';
}
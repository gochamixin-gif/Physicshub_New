// ============================================================
// ВКЛАДКА «ТЕСТЫ» — список
// ============================================================

import { quizDatabase, getQuizCategories, getQuizCounts } from '../data/tasks/quizzes/index.js';

let activeFilter = 'all';

/**
 * Уровень сложности значками
 */
function levelStars(level) {
    return '⭐'.repeat(level);
}

/**
 * Фильтрация по категории
 */
function filterQuizzes() {
    if (activeFilter === 'all') return quizDatabase;
    return quizDatabase.filter(q => q.category === activeFilter);
}

/**
 * Панель фильтров
 */
function renderFilters() {
    const counts = getQuizCounts();
    const cats = ['all', ...getQuizCategories()];

    return `
    <div class="quizzes-filters" id="quizzesFilters">
      ${cats.map(cat => {
        const label = cat === 'all' ? 'Все тесты' : cat;
        const count = counts[cat] || 0;
        const active = cat === activeFilter ? ' quizzes-filter--active' : '';
        return `
          <button class="quizzes-filter${active}" data-category="${cat}" type="button">
            ${label}
            <span class="quizzes-filter__count">${count}</span>
          </button>
        `;
    }).join('')}
    </div>
  `;
}

/**
 * Список тестов
 */
function renderList() {
    const items = filterQuizzes();

    if (!items.length) {
        return `
      <div class="quizzes-empty">
        <div class="quizzes-empty__icon">📭</div>
        <p>В этой категории пока нет тестов</p>
      </div>
    `;
    }

    return `
    <div class="quizzes-list">
      ${items.map(q => `
        <a class="quiz-item" data-quiz-id="${q.id}" href="#">
          <div class="quiz-item__meta">
            <span class="quiz-item__level">${levelStars(q.level)}</span>
            <span class="quiz-item__category">${q.category}</span>
            <span>·</span>
            <span class="quiz-item__topic">${q.topic}</span>
          </div>
          <h3 class="quiz-item__title">${q.title}</h3>
          <p class="quiz-item__desc">${q.description}</p>
          <div class="quiz-item__footer">
            <span class="quiz-item__questions">${q.questions.length} вопросов</span>
            <span class="quiz-item__arrow">Начать →</span>
          </div>
        </a>
      `).join('')}
    </div>
  `;
}

/**
 * Главный рендер страницы «Тесты»
 */
export function renderQuizzes() {
    const container = document.getElementById('quizzes');
    const total = quizDatabase.length;
    const totalQuestions = quizDatabase.reduce((sum, q) => sum + q.questions.length, 0);

    container.innerHTML = `
    <div class="quizzes-page">
      <section class="quizzes-intro">
        <div class="quizzes-intro__label">ТЕСТЫ</div>
        <h1 class="quizzes-intro__title">
          ${total} тестов · ${totalQuestions} вопросов
        </h1>
        <p class="quizzes-intro__desc">
          Проверь знания — выбор ответа из 4 вариантов, объяснения к каждому вопросу
        </p>
      </section>

      ${renderFilters()}

      <div id="quizzesListContainer">
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
    const container = document.getElementById('quizzesFilters');
    if (!container) return;

    container.addEventListener('click', e => {
        const btn = e.target.closest('.quizzes-filter');
        if (!btn) return;
        activeFilter = btn.dataset.category;
        renderQuizzes();
    });
}

/**
 * Сброс фильтра
 */
export function resetQuizFilter() {
    activeFilter = 'all';
}
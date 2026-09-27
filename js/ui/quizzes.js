// ============================================================
// ВКЛАДКА «ТЕСТЫ» — список с отметками о прохождении
// ============================================================

import { quizDatabase, getQuizCategories, getQuizCounts } from '../data/tasks/quizzes/index.js';
import { getQuizResult, getQuizStats } from '../core/progress.js';

let activeFilter = 'all';

function levelStars(level) {
    return '⭐'.repeat(level);
}

function filterQuizzes() {
    if (activeFilter === 'all') return quizDatabase;
    return quizDatabase.filter(q => q.category === activeFilter);
}

/**
 * Формат времени ММ:СС
 */
function formatTime(sec) {
    if (!sec && sec !== 0) return '—';
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

/**
 * Бейдж статуса теста
 */
function renderStatusBadge(q) {
    const result = getQuizResult(q.id);
    if (!result) {
        return `<span class="quiz-item__status quiz-item__status--none">🕐 Не пройден</span>`;
    }

    const isPerfect = result.correct === result.total;
    const cls = isPerfect ? 'quiz-item__status--perfect' : 'quiz-item__status--partial';
    const icon = isPerfect ? '✅' : '⚠️';

    return `
    <span class="quiz-item__status ${cls}">
      ${icon} ${result.correct}/${result.total}
    </span>
  `;
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
      ${items.map(q => {
        const result = getQuizResult(q.id);
        let itemClass = 'quiz-item';
        if (result) {
            itemClass += result.correct === result.total
                ? ' quiz-item--perfect'
                : ' quiz-item--partial';
        }

        return `
          <a class="${itemClass}" data-quiz-id="${q.id}" href="#">
            <div class="quiz-item__meta">
              <span class="quiz-item__level">${levelStars(q.level)}</span>
              <span class="quiz-item__category">${q.category}</span>
              <span>·</span>
              <span class="quiz-item__topic">${q.topic}</span>
            </div>
            <div class="quiz-item__head">
              <h3 class="quiz-item__title">${q.title}</h3>
              ${renderStatusBadge(q)}
            </div>
            <p class="quiz-item__desc">${q.description}</p>
            <div class="quiz-item__footer">
              <span class="quiz-item__questions">${q.questions.length} вопросов</span>
              ${result ? `
                <span class="quiz-item__best">
                  Рекорд: ${result.correct}/${result.total} · ${formatTime(result.timeSpent)}
                </span>
              ` : ''}
              <span class="quiz-item__arrow">${result ? 'Пройти снова' : 'Начать'} →</span>
            </div>
          </a>
        `;
    }).join('')}
    </div>
  `;
}

/**
 * Главный рендер
 */
export function renderQuizzes() {
    const container = document.getElementById('quizzes');
    const total = quizDatabase.length;
    const totalQuestions = quizDatabase.reduce((sum, q) => sum + q.questions.length, 0);
    const stats = getQuizStats();

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

        ${stats.attempted > 0 ? `
          <div class="quizzes-stats">
            <div class="quizzes-stats__item">
              <span class="quizzes-stats__value">${stats.attempted}</span>
              <span class="quizzes-stats__label">пройдено</span>
            </div>
            <div class="quizzes-stats__item">
              <span class="quizzes-stats__value">${stats.perfect}</span>
              <span class="quizzes-stats__label">идеально</span>
            </div>
            <div class="quizzes-stats__item">
              <span class="quizzes-stats__value">${stats.percent}%</span>
              <span class="quizzes-stats__label">правильных</span>
            </div>
          </div>
        ` : ''}
      </section>

      ${renderFilters()}

      <div id="quizzesListContainer">
        ${renderList()}
      </div>
    </div>
  `;

    bindFilters();
}

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

export function resetQuizFilter() {
    activeFilter = 'all';
}
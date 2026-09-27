// ============================================================
// ГЛАВНЫЙ ЭКРАН + ШАПКА С ВКЛАДКАМИ
// ============================================================

import { searchIcon } from '../icons.js';
import { database } from '../data/database.js';
import { countReadInCategory } from '../core/progress.js';

const SECTION_INFO = {
    'Введение в физику':  { num: '01', icon: '📖', desc: 'Основы и научный метод' },
    'Строение вещества':  { num: '02', icon: '⚛️', desc: 'Молекулы, атомы, состояния' },
    'Взаимодействие тел': { num: '03', icon: '🎯', desc: 'Силы, движение, масса' },
    'Давление':           { num: '04', icon: '💧', desc: 'Жидкости, газы, атмосфера' },
    'Работа и энергия':   { num: '05', icon: '⚡', desc: 'Механизмы и превращения' }
};

function getStats() {
    const counts = {};
    database.forEach(a => {
        counts[a.category] = (counts[a.category] || 0) + 1;
    });
    return counts;
}

function plural(n, one, few, many) {
    const mod10 = n % 10;
    const mod100 = n % 100;
    if (mod10 === 1 && mod100 !== 11) return one;
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few;
    return many;
}

/**
 * Шапка сайта
 */
export function renderHeader() {
    const header = document.getElementById('appHeader');
    if (!header) return;
    header.className = 'site-header';
    header.innerHTML = `
    <a class="site-logo" href="#" id="logoLink">
      <span class="site-logo__mark">⚛</span>
      <span class="site-logo__text">Phyzzy</span>
    </a>

          <nav class="site-tabs" id="siteTabs">
      <button class="site-tab site-tab--active" data-tab="articles" type="button">
        <span class="site-tab__icon">📚</span>
        <span class="site-tab__text">Энциклопедия</span>
      </button>
      <button class="site-tab" data-tab="tasks" type="button">
        <span class="site-tab__icon">🎯</span>
        <span class="site-tab__text">Задачи</span>
      </button>
    </nav>

    <div class="site-search">
      <span class="site-search__icon">${searchIcon(18)}</span>
      <input type="text" class="site-search__input" id="search"
             placeholder="Найти тему…" autocomplete="off">
    </div>

    <button class="site-btn site-btn--random" id="randomBtn" type="button">
      <span class="site-btn__icon">🎲</span>
      <span class="site-btn__text">Случайная</span>
    </button>
  `;
}

export function setActiveTab(tabName) {
    document.querySelectorAll('.site-tab').forEach(tab => {
        tab.classList.toggle('site-tab--active', tab.dataset.tab === tabName);
    });
}

function renderIntro() {
    const total = database.length;
    const sections = Object.keys(getStats()).length;
    return `
    <section class="intro">
      <div class="intro__label">ЭНЦИКЛОПЕДИЯ ФИЗИКИ</div>
      <h1 class="intro__title">
        ${total} статей по&nbsp;${sections} разделам
      </h1>
      <p class="intro__desc">
        От строения вещества до квантовой механики — понятно, с формулами и схемами
      </p>

      <button class="intro-cta" data-open-article="si-system" type="button">
        <span class="intro-cta__icon">📐</span>
        <span class="intro-cta__text">
          <span class="intro-cta__title">Справочник СИ</span>
          <span class="intro-cta__hint">Все единицы, приставки и переводы в одной статье</span>
        </span>
        <span class="intro-cta__arrow">→</span>
      </button>
    </section>
  `;
}

function renderSections() {
    const stats = getStats();
    const order = Object.keys(SECTION_INFO);

    const cards = order
        .filter(cat => stats[cat])
        .map(cat => {
            const info = SECTION_INFO[cat] || { num: '—', icon: '📚', desc: '' };
            const count = stats[cat];
            const readCount = countReadInCategory(database, cat);
            const isDone = readCount > 0;

            return `
        <a class="section-card" data-category="${cat}" href="#">
          <div class="section-card__top">
            <span class="section-card__num">${info.num}</span>
            <span class="section-card__icon">${info.icon}</span>
          </div>
          <h3 class="section-card__title">${cat}</h3>
          <p class="section-card__desc">${info.desc}</p>
          <div class="section-card__foot">
            <span class="section-card__count">
              ${count} ${plural(count, 'статья', 'статьи', 'статей')}
              ${isDone ? `<span class="section-card__progress">· ✓ ${readCount}</span>` : ''}
            </span>
            <span class="section-card__arrow">→</span>
          </div>
        </a>
      `;
        }).join('');

    return `
    <section class="sections">
      <div class="sections__head">
        <h2 class="sections__title">Разделы</h2>
        <span class="sections__hint">Нажми, чтобы отфильтровать</span>
      </div>
      <div class="sections__grid">
        ${cards}
      </div>
    </section>
  `;
}

export function renderHero() {
    const hero = document.getElementById('hero');
    hero.innerHTML = `
    <div class="page">
      ${renderIntro()}
      ${renderSections()}
    </div>
  `;
}

export function getRandomArticle() {
    const idx = Math.floor(Math.random() * database.length);
    return database[idx];
}
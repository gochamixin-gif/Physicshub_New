// ============================================================
// ГЛАВНЫЙ ЭКРАН + ШАПКА С ВКЛАДКАМИ
// ============================================================

import { searchIcon } from '../icons.js';
import { database } from '../data/database.js';
import { taskDatabase } from '../data/tasks/index.js';
import { quizDatabase } from '../data/tasks/quizzes/index.js';
import { labDatabase } from '../data/labs/index.js';
import { countReadInCategory } from '../core/progress.js';
import { GRADES, getGrade } from '../core/grade-filter.js';

const SECTION_INFO = {
    'Введение в физику':       { num: '01', icon: '📖', desc: 'Основы и научный метод' },
    'Строение вещества':       { num: '02', icon: '⚛️', desc: 'Молекулы, атомы, состояния' },
    'Взаимодействие тел':      { num: '03', icon: '🎯', desc: 'Силы, движение, масса' },
    'Давление':                { num: '04', icon: '💧', desc: 'Жидкости, газы, атмосфера' },
    'Работа и энергия':        { num: '05', icon: '⚡', desc: 'Механизмы и превращения' },
    'Тепловые явления':        { num: '06', icon: '🌡️', desc: 'Теплота и фазовые переходы' },
    'Электрические явления':   { num: '07', icon: '⚡', desc: 'Заряды, ток, напряжение' },
    'Электромагнитные явления':{ num: '08', icon: '🧲', desc: 'Магниты, индукция, двигатели' }
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
      <button class="site-tab" data-tab="quizzes" type="button">
        <span class="site-tab__icon">📝</span>
        <span class="site-tab__text">Тесты</span>
      </button>
      <button class="site-tab" data-tab="labs" type="button">
        <span class="site-tab__icon">🔬</span>
        <span class="site-tab__text">Лабораторные</span>
      </button>
    </nav>

    <div class="site-search">
      <span class="site-search__icon">${searchIcon(18)}</span>
      <input type="text" class="site-search__input" id="search"
             placeholder="Найти тему…" autocomplete="off">
      <div class="search-suggestions hidden" id="searchSuggestions"></div>
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
    const tasksCount = taskDatabase.length;
    const quizzesCount = quizDatabase.length;
    const labsCount = labDatabase.length;
    const currentGrade = getGrade();

    const gradeButtons = GRADES
        .filter(g => g.value !== 'all')
        .map(g => {
            const active = currentGrade === g.value ? ' intro-grade--active' : '';
            return `
              <button class="intro-grade${active}" data-grade="${g.value}" type="button">
                <span class="intro-grade__num">${g.value}</span>
                <span class="intro-grade__label">класс</span>
              </button>
            `;
        }).join('');

    return `
    <section class="intro">
      <div class="intro__label">ЭНЦИКЛОПЕДИЯ ФИЗИКИ</div>
      <h1 class="intro__title">
        ${total} статей по&nbsp;${sections} разделам
      </h1>
      <p class="intro__desc">
        От строения вещества до квантовой механики — понятно, с формулами и схемами
      </p>

      <div class="intro-grades">
        ${gradeButtons}
      </div>

      <div class="intro-stats">
        <button class="intro-stat" data-nav="articles" type="button">
          <span class="intro-stat__icon">📚</span>
          <span class="intro-stat__value">${total}</span>
          <span class="intro-stat__label">статей</span>
        </button>

        <button class="intro-stat" data-nav="tasks" type="button">
          <span class="intro-stat__icon">🎯</span>
          <span class="intro-stat__value">${tasksCount}</span>
          <span class="intro-stat__label">задач</span>
        </button>

        <button class="intro-stat" data-nav="quizzes" type="button">
          <span class="intro-stat__icon">📝</span>
          <span class="intro-stat__value">${quizzesCount}</span>
          <span class="intro-stat__label">тестов</span>
        </button>

        <button class="intro-stat" data-nav="labs" type="button">
          <span class="intro-stat__icon">🔬</span>
          <span class="intro-stat__value">${labsCount}</span>
          <span class="intro-stat__label">лабораторных</span>
        </button>
      </div>

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
    const total = database.length;

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

      <button class="all-topics-btn" data-show-all-topics="1" type="button">
        <span class="all-topics-btn__icon">📚</span>
        <span class="all-topics-btn__text">
          <span class="all-topics-btn__title">Все темы</span>
          <span class="all-topics-btn__hint">Показать все ${total} статей без фильтра</span>
        </span>
        <span class="all-topics-btn__arrow">→</span>
      </button>

      <div class="sections__grid">
        ${cards}
      </div>
    </section>
  `;
}

export function renderHero() {
    const hero = document.getElementById('hero');
    hero.innerHTML = `
    <div class="hero-atom" aria-hidden="true">
      <svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="orbitGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#7c3aed" stop-opacity="0.7"/>
            <stop offset="50%" stop-color="#a78bfa" stop-opacity="0.4"/>
            <stop offset="100%" stop-color="#c4b5fd" stop-opacity="0.2"/>
          </linearGradient>
          <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#a78bfa"/>
            <stop offset="50%" stop-color="#7c3aed"/>
            <stop offset="100%" stop-color="#5b21b6" stop-opacity="0.3"/>
          </radialGradient>
          <filter id="glowFilter">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <g class="hero-atom__orbit hero-atom__orbit--1">
          <ellipse cx="300" cy="300" rx="260" ry="90"
                   fill="none" stroke="url(#orbitGrad)" stroke-width="2"
                   transform="rotate(0 300 300)"/>
          <circle class="hero-atom__electron hero-atom__electron--1"
                  cx="560" cy="300" r="8" fill="#a78bfa" filter="url(#glowFilter)"/>
        </g>

        <g class="hero-atom__orbit hero-atom__orbit--2">
          <ellipse cx="300" cy="300" rx="260" ry="90"
                   fill="none" stroke="url(#orbitGrad)" stroke-width="2"
                   transform="rotate(60 300 300)"/>
          <circle class="hero-atom__electron hero-atom__electron--2"
                  cx="560" cy="300" r="8" fill="#c4b5fd" filter="url(#glowFilter)"/>
        </g>

        <g class="hero-atom__orbit hero-atom__orbit--3">
          <ellipse cx="300" cy="300" rx="260" ry="90"
                   fill="none" stroke="url(#orbitGrad)" stroke-width="2"
                   transform="rotate(-60 300 300)"/>
          <circle class="hero-atom__electron hero-atom__electron--3"
                  cx="560" cy="300" r="8" fill="#8b5cf6" filter="url(#glowFilter)"/>
        </g>

        <circle class="hero-atom__core" cx="300" cy="300" r="22"
                fill="url(#coreGrad)" filter="url(#glowFilter)"/>
        <circle class="hero-atom__core-pulse" cx="300" cy="300" r="22"
                fill="none" stroke="#7c3aed" stroke-width="1.5" opacity="0.5"/>
      </svg>
    </div>

    <div class="page">
      ${renderIntro()}
      ${renderSections()}
    </div>
  `;

    const cards = hero.querySelectorAll('.section-card');
    cards.forEach((card, i) => {
        card.classList.add('reveal');
        card.style.transitionDelay = `${i * 0.06}s`;
    });

    const intro = hero.querySelector('.intro');
    if (intro) intro.classList.add('anim-fade-in-up');

    import('../core/animations.js').then(({ observeNewElements }) => {
        observeNewElements();
    });
}

export function getRandomArticle() {
    const idx = Math.floor(Math.random() * database.length);
    return database[idx];
}
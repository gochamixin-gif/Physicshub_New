// ============================================================
// ЖИВОЙ ПОИСК — выпадающие подсказки
// ============================================================

import { database } from '../data/database.js';
import { taskDatabase } from '../data/tasks/index.js';
import { quizDatabase } from '../data/tasks/quizzes/index.js';
import { labDatabase } from '../data/labs/index.js';

const MAX_SUGGESTIONS = 6;

let activeIndex = -1;
let currentSuggestions = [];

/**
 * Собирает все элементы поиска
 */
function getAllItems() {
    const items = [];

    // Статьи
    database.forEach(a => {
        items.push({
            type: 'article',
            icon: '📚',
            id: a.id,
            title: a.title,
            subtitle: a.category,
            keywords: (a.keywords || []).join(' ').toLowerCase(),
            searchText: (a.title + ' ' + (a.desc || '') + ' ' + a.category).toLowerCase()
        });
    });

    // Задачи
    taskDatabase.forEach(t => {
        items.push({
            type: 'task',
            icon: '🎯',
            id: t.id,
            title: t.task.length > 80 ? t.task.slice(0, 80) + '…' : t.task,
            subtitle: t.category + ' · ' + t.topic,
            keywords: '',
            searchText: (t.task + ' ' + t.topic + ' ' + t.category).toLowerCase()
        });
    });

    // Тесты
    quizDatabase.forEach(q => {
        items.push({
            type: 'quiz',
            icon: '📝',
            id: q.id,
            title: q.title,
            subtitle: q.category + ' · ' + q.questions.length + ' вопросов',
            keywords: '',
            searchText: (q.title + ' ' + q.description + ' ' + q.category).toLowerCase()
        });
    });

    // Лабораторные
    labDatabase.forEach(l => {
        items.push({
            type: 'lab',
            icon: '🔬',
            id: l.id,
            title: l.title,
            subtitle: l.category + ' · ' + l.duration,
            keywords: '',
            searchText: (l.title + ' ' + l.desc + ' ' + l.category).toLowerCase()
        });
    });

    return items;
}

/**
 * Ищет подсказки по запросу
 */
function findSuggestions(query) {
    const q = query.toLowerCase().trim();
    if (q.length < 2) return [];

    const items = getAllItems();

    return items
        .map(item => {
            let score = 0;
            const titleLower = item.title.toLowerCase();

            // Совпадение в начале названия — высокий приоритет
            if (titleLower.startsWith(q)) score += 100;
            // Вхождение в название
            else if (titleLower.includes(q)) score += 50;
            // В подписи
            if (item.subtitle.toLowerCase().includes(q)) score += 20;
            // В ключевых словах
            if (item.keywords.includes(q)) score += 10;
            // В полном тексте
            if (item.searchText.includes(q)) score += 5;

            return { item, score };
        })
        .filter(x => x.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, MAX_SUGGESTIONS)
        .map(x => x.item);
}

/**
 * Рендер выпадающего списка
 */
export function renderSuggestions(query) {
    const container = document.getElementById('searchSuggestions');
    if (!container) return;

    const suggestions = findSuggestions(query);
    currentSuggestions = suggestions;
    activeIndex = -1;

    if (!suggestions.length) {
        container.innerHTML = `
      <div class="search-suggestions__empty">
        Ничего не найдено по запросу «${query}»
      </div>
    `;
        container.classList.remove('hidden');
        return;
    }

    container.innerHTML = `
    <ul class="search-suggestions__list">
      ${suggestions.map((s, i) => `
        <li class="search-suggestions__item" data-index="${i}" data-type="${s.type}" data-id="${s.id}">
          <span class="search-suggestions__icon">${s.icon}</span>
          <div class="search-suggestions__content">
            <div class="search-suggestions__title">${highlightMatch(s.title, query)}</div>
            <div class="search-suggestions__subtitle">${s.subtitle}</div>
          </div>
        </li>
      `).join('')}
    </ul>
    <button class="search-suggestions__all" data-show-all="1" type="button">
      Показать все результаты →
    </button>
  `;

    container.classList.remove('hidden');
}

/**
 * Подсвечивает совпадение в тексте
 */
function highlightMatch(text, query) {
    const q = query.trim();
    if (!q) return text;

    const regex = new RegExp(`(${escapeRegex(q)})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Скрыть подсказки
 */
export function hideSuggestions() {
    const container = document.getElementById('searchSuggestions');
    if (!container) return;
    container.classList.add('hidden');
    activeIndex = -1;
}

/**
 * Навигация клавиатурой
 */
export function handleSuggestionsKey(e) {
    const container = document.getElementById('searchSuggestions');
    if (!container || container.classList.contains('hidden')) {
        return false;
    }

    const items = container.querySelectorAll('.search-suggestions__item');
    if (!items.length) return false;

    if (e.key === 'ArrowDown') {
        e.preventDefault();
        activeIndex = (activeIndex + 1) % items.length;
        updateActive(items);
        return true;
    }

    if (e.key === 'ArrowUp') {
        e.preventDefault();
        activeIndex = (activeIndex - 1 + items.length) % items.length;
        updateActive(items);
        return true;
    }

    if (e.key === 'Enter') {
        e.preventDefault();
        if (activeIndex >= 0 && items[activeIndex]) {
            items[activeIndex].click();
        } else if (items[0]) {
            items[0].click();
        }
        return true;
    }

    if (e.key === 'Escape') {
        hideSuggestions();
        return true;
    }

    return false;
}

function updateActive(items) {
    items.forEach((item, i) => {
        item.classList.toggle('search-suggestions__item--active', i === activeIndex);
    });

    // Скролл к активному
    if (activeIndex >= 0 && items[activeIndex]) {
        items[activeIndex].scrollIntoView({ block: 'nearest' });
    }
}

/**
 * Получить активную подсказку
 */
export function getActiveSuggestion() {
    if (activeIndex >= 0 && currentSuggestions[activeIndex]) {
        return currentSuggestions[activeIndex];
    }
    return null;
}
// ============================================================
// ОБРАБОТЧИКИ СОБЫТИЙ
// ============================================================

import {
    showResults,
    showHero,
    showArticle,
    showTasks,
    showTaskView,
    showQuizzes,
    showQuizView,
    showLabs,
    showLabView
} from '../core/router.js';
import { renderResults, resetFilter } from './results.js';
import { renderArticle } from './article.js';
import { renderTasks, resetTaskFilter } from './tasks.js';
import { renderTaskView } from './task-view.js';
import { renderQuizzes, resetQuizFilter } from './quizzes.js';
import { renderQuizView } from './quiz-view.js';
import { renderLabs, resetLabFilter } from './labs.js';
import { renderLabView } from './lab-view.js';
import {
    renderSuggestions,
    hideSuggestions,
    handleSuggestionsKey
} from './search-suggestions.js';
import { getRandomArticle } from './hero.js';
import { state } from '../core/state.js';

let debounceTimer;

export function initEvents() {

    // ============================================================
    // ВВОД В ПОИСК + ЖИВЫЕ ПОДСКАЗКИ
    // ============================================================
    document.addEventListener('input', e => {
        if (!e.target.classList.contains('site-search__input')) return;

        clearTimeout(debounceTimer);
        const q = e.target.value.trim();

        // Подсказки появляются сразу
        if (q.length >= 2) {
            renderSuggestions(q);
        } else {
            hideSuggestions();
        }

        // Основной поиск — с задержкой
        debounceTimer = setTimeout(() => {
            if (!q) {
                hideSuggestions();
                return showHero();
            }
            if (q.length >= 2) {
                resetFilter();
                showResults(q);
                renderResults(q);
                hideSuggestions();
            }
        }, 250);
    });

    // ============================================================
    // КЛАВИАТУРА В ПОИСКЕ
    // ============================================================
    document.addEventListener('keydown', e => {
        if (!e.target.classList.contains('site-search__input')) return;

        // Навигация в подсказках (↑ ↓ Enter Esc)
        if (handleSuggestionsKey(e)) return;
    });

    // ============================================================
    // КЛИКИ
    // ============================================================
    document.addEventListener('click', e => {

        // ============================================================
        // ПОДСКАЗКИ ПОИСКА
        // ============================================================

        // --- Клик по подсказке ---
        const suggestionItem = e.target.closest('.search-suggestions__item');
        if (suggestionItem) {
            e.preventDefault();
            const type = suggestionItem.dataset.type;
            const id = suggestionItem.dataset.id;

            hideSuggestions();

            // Очищаем поиск
            const input = document.getElementById('search');
            if (input) input.value = '';

            // Открываем нужный раздел
            if (type === 'article') {
                showArticle(id);
                renderArticle(id);
            } else if (type === 'task') {
                showTaskView(id);
                renderTaskView(id);
            } else if (type === 'quiz') {
                showQuizView(id);
                renderQuizView(id);
            } else if (type === 'lab') {
                showLabView(id);
                renderLabView(id);
            }
            return;
        }

        // --- «Показать все результаты» ---
        if (e.target.closest('[data-show-all]')) {
            e.preventDefault();
            const input = document.getElementById('search');
            const q = input ? input.value.trim() : '';
            hideSuggestions();
            if (q.length >= 2) {
                resetFilter();
                showResults(q);
                renderResults(q);
            }
            return;
        }

        // --- Клик вне поиска — закрыть подсказки ---
        if (!e.target.closest('.site-search')) {
            hideSuggestions();
        }

        // ============================================================
        // ЛОГОТИП
        // ============================================================
        if (e.target.closest('#logoLink')) {
            e.preventDefault();
            const input = document.getElementById('search');
            if (input) input.value = '';
            hideSuggestions();
            showHero();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        // ============================================================
        // ВКЛАДКИ В ШАПКЕ
        // ============================================================
        const tab = e.target.closest('.site-tab');
        if (tab) {
            e.preventDefault();
            const name = tab.dataset.tab;

            if (name === 'tasks') {
                resetTaskFilter();
                showTasks();
                renderTasks();
            } else if (name === 'quizzes') {
                resetQuizFilter();
                showQuizzes();
                renderQuizzes();
            } else if (name === 'labs') {
                resetLabFilter();
                showLabs();
                renderLabs();
            } else {
                // articles
                const input = document.getElementById('search');
                if (input) input.value = '';
                showHero();
            }
            return;
        }

        // ============================================================
        // ЭНЦИКЛОПЕДИЯ
        // ============================================================

        // --- Кнопка «Справочник СИ» на главной ---
        const ctaBtn = e.target.closest('[data-open-article]');
        if (ctaBtn) {
            e.preventDefault();
            const id = ctaBtn.dataset.openArticle;
            showArticle(id);
            renderArticle(id);
            return;
        }

        // --- Случайная статья ---
        if (e.target.closest('#randomBtn')) {
            const item = getRandomArticle();
            if (!item) return;
            showArticle(item.id);
            renderArticle(item.id);
            return;
        }

        // --- Карточка раздела ---
        const sectionCard = e.target.closest('.section-card');
        if (sectionCard) {
            e.preventDefault();
            const cat = sectionCard.dataset.category;
            const input = document.getElementById('search');
            if (input) input.value = cat;
            resetFilter();
            showResults(cat);
            renderResults(cat);

            setTimeout(() => {
                const filterBtn = document.querySelector(`.results-filter[data-category="${cat}"]`);
                if (filterBtn) filterBtn.click();
            }, 50);

            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        // --- Открытие статьи ---
        const articleItem = e.target.closest('.result-item');
        if (articleItem) {
            e.preventDefault();
            const id = articleItem.dataset.id;
            showArticle(id);
            renderArticle(id);
            return;
        }

        // --- Кнопка «Назад к поиску» ---
        if (e.target.closest('#articleBack')) {
            const q = state.query || '';
            if (q) {
                showResults(q);
                renderResults(q);
            } else {
                showHero();
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        // ============================================================
        // ЗАДАЧИ
        // ============================================================

        // --- Открытие задачи ---
        const taskItem = e.target.closest('.task-item');
        if (taskItem) {
            e.preventDefault();
            const id = taskItem.dataset.taskId;
            showTaskView(id);
            renderTaskView(id);
            return;
        }

        // --- Кнопка «Назад к задачам» ---
        if (e.target.closest('#taskBackBtn')) {
            showTasks();
            renderTasks();
            return;
        }

        // ============================================================
        // ТЕСТЫ
        // ============================================================

        // --- Открытие теста ---
        const quizItem = e.target.closest('.quiz-item');
        if (quizItem) {
            e.preventDefault();
            const id = quizItem.dataset.quizId;
            showQuizView(id);
            renderQuizView(id);
            return;
        }

        // --- Кнопка «Назад к тестам» ---
        if (e.target.closest('#quizBackBtn')) {
            showQuizzes();
            renderQuizzes();
            return;
        }

        // ============================================================
        // ЛАБОРАТОРНЫЕ
        // ============================================================

        // --- Открытие лабораторной ---
        const labItem = e.target.closest('.lab-item');
        if (labItem) {
            e.preventDefault();
            const id = labItem.dataset.labId;
            showLabView(id);
            renderLabView(id);
            return;
        }

        // --- Кнопка «Назад к лабораторным» ---
        if (e.target.closest('#labBackBtn')) {
            showLabs();
            renderLabs();
            return;
        }
    });

    // ============================================================
    // КНОПКА «НАВЕРХ»
    // ============================================================
    const scrollBtn = document.getElementById('scrollTopBtn');
    if (scrollBtn) {
        // Показать/скрыть при прокрутке
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                scrollBtn.classList.remove('hidden');
            } else {
                scrollBtn.classList.add('hidden');
            }
        }, { passive: true });

        // Клик — наверх
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}
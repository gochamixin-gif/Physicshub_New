// ============================================================
// ОБРАБОТЧИКИ СОБЫТИЙ
// ============================================================

import {
    showResults,
    showHero,
    showArticle,
    showTasks,
    showTaskView,
    showSi
} from '../core/router.js';
import { renderResults, resetFilter } from './results.js';
import { renderArticle } from './article.js';
import { renderTasks, resetTaskFilter } from './tasks.js';
import { renderTaskView } from './task-view.js';
import { renderSi } from './si-view.js';
import { getRandomArticle } from './hero.js';
import { state } from '../core/state.js';

let debounceTimer;

export function initEvents() {

    // ============================================================
    // ВВОД В ПОИСК
    // ============================================================
    document.addEventListener('input', e => {
        if (!e.target.classList.contains('site-search__input')) return;

        clearTimeout(debounceTimer);
        const q = e.target.value.trim();

        debounceTimer = setTimeout(() => {
            if (!q) return showHero();
            if (q.length >= 2) {
                resetFilter();
                showResults(q);
                renderResults(q);
            }
        }, 200);
    });

    // ============================================================
    // КЛИКИ
    // ============================================================
    document.addEventListener('click', e => {

        // --- Логотип — на главную ---
        if (e.target.closest('#logoLink')) {
            e.preventDefault();
            const input = document.getElementById('search');
            if (input) input.value = '';
            showHero();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        // --- Вкладки в шапке ---
        const tab = e.target.closest('.site-tab');
        if (tab) {
            e.preventDefault();
            const name = tab.dataset.tab;

            if (name === 'tasks') {
                resetTaskFilter();
                showTasks();
                renderTasks();
            } else if (name === 'si') {
                showSi();
                renderSi();
            } else {
                // articles
                const input = document.getElementById('search');
                if (input) input.value = '';
                showHero();
            }
            return;
        }

        // --- 🎲 Случайная статья ---
        if (e.target.closest('#randomBtn')) {
            const item = getRandomArticle();
            if (!item) return;
            showArticle(item.id);
            renderArticle(item.id);
            return;
        }

        // --- Карточка раздела энциклопедии ---
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

        // --- Открытие статьи (результат поиска) ---
        const articleItem = e.target.closest('.result-item');
        if (articleItem) {
            e.preventDefault();
            const id = articleItem.dataset.id;
            showArticle(id);
            renderArticle(id);
            return;
        }

        // --- Кнопка «Назад к поиску» в статье ---
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

        // --- Открытие задачи из списка ---
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
    });
}
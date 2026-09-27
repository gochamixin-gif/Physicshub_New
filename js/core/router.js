// ============================================================
// РОУТЕР — переключение экранов
// ============================================================

import { setView, setQuery, setArticle } from './state.js';
import { setActiveTab } from '../ui/hero.js';

const $ = id => document.getElementById(id);

// Все возможные экраны приложения
const ALL_VIEWS = ['hero', 'results', 'article', 'tasks', 'taskView'];

/**
 * Скрывает все экраны
 */
function hideAll() {
    ALL_VIEWS.forEach(id => {
        const el = $(id);
        if (el) el.classList.add('hidden');
    });
}

/**
 * Главный экран — энциклопедия
 */
export function showHero() {
    setView('hero');
    hideAll();
    $('hero').classList.remove('hidden');
    setActiveTab('articles');
}

/**
 * Результаты поиска
 */
export function showResults(query) {
    setView('results');
    setQuery(query);
    hideAll();
    $('results').classList.remove('hidden');
    setActiveTab('articles');
}

/**
 * Одна статья
 */
export function showArticle(id) {
    setView('article');
    setArticle(id);
    hideAll();
    $('article').classList.remove('hidden');
    setActiveTab('articles');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Вкладка «Задачи» — список
 */
export function showTasks() {
    setView('tasks');
    hideAll();
    $('tasks').classList.remove('hidden');
    setActiveTab('tasks');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Просмотр одной задачи
 */
export function showTaskView(id) {
    setView('taskView');
    setArticle(id); // используем то же поле для id
    hideAll();
    $('taskView').classList.remove('hidden');
    setActiveTab('tasks');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
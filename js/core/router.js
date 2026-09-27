// ============================================================
// РОУТЕР — переключение экранов
// ============================================================

import { setView, setQuery, setArticle } from './state.js';
import { setActiveTab } from '../ui/hero.js';

const $ = id => document.getElementById(id);

const ALL_VIEWS = ['hero', 'results', 'article', 'tasks', 'taskView'];

function hideAll() {
    ALL_VIEWS.forEach(id => {
        const el = $(id);
        if (el) el.classList.add('hidden');
    });
}

export function showHero() {
    setView('hero');
    hideAll();
    $('hero').classList.remove('hidden');
    setActiveTab('articles');
}

export function showResults(query) {
    setView('results');
    setQuery(query);
    hideAll();
    $('results').classList.remove('hidden');
    setActiveTab('articles');
}

export function showArticle(id) {
    setView('article');
    setArticle(id);
    hideAll();
    $('article').classList.remove('hidden');
    setActiveTab('articles');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function showTasks() {
    setView('tasks');
    hideAll();
    $('tasks').classList.remove('hidden');
    setActiveTab('tasks');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function showTaskView(id) {
    setView('taskView');
    setArticle(id);
    hideAll();
    $('taskView').classList.remove('hidden');
    setActiveTab('tasks');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
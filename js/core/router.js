// ============================================================
// РОУТЕР — переключение экранов
// ============================================================

import { setView, setQuery, setArticle } from './state.js';
import { setActiveTab } from '../ui/hero.js';
import { animateScreen } from './animations.js';

const $ = id => document.getElementById(id);

const ALL_VIEWS = [
    'hero', 'results', 'article',
    'tasks', 'taskView',
    'quizzes', 'quizView',
    'labs', 'labView'
];

function hideAll() {
    ALL_VIEWS.forEach(id => {
        const el = $(id);
        if (el) el.classList.add('hidden');
    });
}

function show(id) {
    const el = $(id);
    if (!el) return;
    el.classList.remove('hidden');
    animateScreen(el);
}

// ============================================================
// ЭНЦИКЛОПЕДИЯ
// ============================================================

export function showHero() {
    setView('hero');
    hideAll();
    show('hero');
    setActiveTab('articles');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function showResults(query) {
    setView('results');
    setQuery(query);
    hideAll();
    show('results');
    setActiveTab('articles');
}

export function showArticle(id) {
    setView('article');
    setArticle(id);
    hideAll();
    show('article');
    setActiveTab('articles');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================================
// ЗАДАЧИ
// ============================================================

export function showTasks() {
    setView('tasks');
    hideAll();
    show('tasks');
    setActiveTab('tasks');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function showTaskView(id) {
    setView('taskView');
    setArticle(id);
    hideAll();
    show('taskView');
    setActiveTab('tasks');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================================
// ТЕСТЫ
// ============================================================

export function showQuizzes() {
    setView('quizzes');
    hideAll();
    show('quizzes');
    setActiveTab('quizzes');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function showQuizView(id) {
    setView('quizView');
    setArticle(id);
    hideAll();
    show('quizView');
    setActiveTab('quizzes');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================================
// ЛАБОРАТОРНЫЕ
// ============================================================

export function showLabs() {
    setView('labs');
    hideAll();
    show('labs');
    setActiveTab('labs');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function showLabView(id) {
    setView('labView');
    setArticle(id);
    hideAll();
    show('labView');
    setActiveTab('labs');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
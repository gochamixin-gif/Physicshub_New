// ============================================================
// РОУТЕР — переключение экранов
// ============================================================

import { setView, setQuery, setArticle } from './state.js';
import { setActiveTab } from '../ui/hero.js';

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

// --- Энциклопедия ---

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

// --- Задачи ---

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

// --- Тесты ---

export function showQuizzes() {
    setView('quizzes');
    hideAll();
    $('quizzes').classList.remove('hidden');
    setActiveTab('quizzes');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function showQuizView(id) {
    setView('quizView');
    setArticle(id);
    hideAll();
    $('quizView').classList.remove('hidden');
    setActiveTab('quizzes');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- Лабораторные ---

export function showLabs() {
    setView('labs');
    hideAll();
    $('labs').classList.remove('hidden');
    setActiveTab('labs');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function showLabView(id) {
    setView('labView');
    setArticle(id);
    hideAll();
    $('labView').classList.remove('hidden');
    setActiveTab('labs');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
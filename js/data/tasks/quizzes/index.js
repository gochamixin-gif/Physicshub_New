// ============================================================
// РЕЕСТР ТЕСТОВ
// ============================================================

import { mechanicsQuizzes } from './mechanics.js';

export const quizDatabase = [
    ...mechanicsQuizzes
];

export function getQuizById(id) {
    return quizDatabase.find(q => q.id === id);
}

export function getQuizCategories() {
    const set = new Set();
    quizDatabase.forEach(q => q.category && set.add(q.category));
    return Array.from(set).sort();
}

export function getQuizCounts() {
    const counts = { all: quizDatabase.length };
    quizDatabase.forEach(q => {
        counts[q.category] = (counts[q.category] || 0) + 1;
    });
    return counts;
}
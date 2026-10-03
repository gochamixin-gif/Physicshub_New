// ============================================================
// ПОИСК ПО БАЗЕ СТАТЕЙ + ФИЛЬТР ПО КЛАССУ
// ============================================================

import { database } from '../data/database.js';
import { getGrade } from './grade-filter.js';

export function searchArticles(query) {
    const q = query.toLowerCase().trim();
    const grade = getGrade();

    let results;

    if (!q) {
        // Пустой запрос — все статьи (с учётом класса)
        results = database;
    } else {
        const words = q.split(/\s+/).filter(Boolean);

        results = database
            .map(article => ({ article, score: scoreArticle(article, words) }))
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score)
            .map(item => item.article);
    }

    // Фильтр по классу
    if (grade !== 'all') {
        results = results.filter(a => !a.grade || a.grade === grade);
    }

    return results;
}

function scoreArticle(article, words) {
    let score = 0;
    const title = article.title.toLowerCase();
    const desc = (article.desc || '').toLowerCase();
    const kw = (article.keywords || []).map(k => k.toLowerCase());

    for (const w of words) {
        if (title.includes(w)) score += 10;
        if (kw.some(k => k.includes(w))) score += 5;
        if (desc.includes(w)) score += 3;
    }
    return score;
}
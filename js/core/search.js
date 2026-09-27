// ============================================================
// ПОИСК ПО БАЗЕ СТАТЕЙ
// ============================================================

import { database } from '../data/database.js';

export function searchArticles(query) {
    const q = query.toLowerCase().trim();
    if (!q) return [];

    const words = q.split(/\s+/).filter(Boolean);

    return database
        .map(article => ({ article, score: scoreArticle(article, words) }))
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .map(item => item.article);
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
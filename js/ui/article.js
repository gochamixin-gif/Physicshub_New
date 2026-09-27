// ============================================================
// СТАТЬЯ — рендер
// ============================================================

import { database } from '../data/database.js';
import { buildArticle } from '../article.js';
import { arrowBackIcon, clockIcon, bookIcon } from '../icons.js';

export function renderArticle(id) {
    const container = document.getElementById('article');
    const item = database.find(a => a.id === id);

    if (!item) {
        container.innerHTML = `<p>Статья не найдена</p>`;
        return;
    }

    container.innerHTML = `
    <button class="article__back" id="articleBack">
      ${arrowBackIcon(16)} Назад к поиску
    </button>

    <header class="article-header">
      <span class="article-header__badge">${item.category}</span>
      <h1 class="article-header__title">${item.title}</h1>
      <div class="article-header__meta">
        <span class="article-header__meta-item">${bookIcon(14)} ${item.category}</span>
        <span class="article-header__meta-item">${clockIcon(14)} ${item.readTime}</span>
      </div>
    </header>

    <div class="article-body">
      ${buildArticle(item)}
    </div>
  `;
}
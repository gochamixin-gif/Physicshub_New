// ============================================================
// СТАТЬЯ — рендер + отметка «прочитано» + печать
// ============================================================

import { database } from '../data/database.js';
import { buildArticle } from '../article.js';
import { arrowBackIcon, clockIcon, bookIcon } from '../icons.js';
import { isArticleRead, toggleArticleRead } from '../core/progress.js';

export function renderArticle(id) {
    const container = document.getElementById('article');
    const item = database.find(a => a.id === id);

    if (!item) {
        container.innerHTML = `<p>Статья не найдена</p>`;
        return;
    }

    const read = isArticleRead(id);

    container.innerHTML = `
    <div class="article-inner">
      <div class="article-toolbar">
        <button class="article__back" id="articleBack">
          ${arrowBackIcon(16)} Назад к поиску
        </button>

        <div class="article-toolbar__actions">
          <button class="article-read-btn${read ? ' article-read-btn--done' : ''}"
                  id="articleReadBtn" type="button">
            ${read ? '✓ Прочитано' : '○ Отметить как прочитанное'}
          </button>

          <button class="article-print-btn" id="articlePrintBtn" type="button" title="Распечатать или сохранить в PDF">
            🖨 Печать
          </button>
        </div>
      </div>

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

      <div class="article-footer">
        <button class="article-read-btn${read ? ' article-read-btn--done' : ''}"
                id="articleReadBtnBottom" type="button">
          ${read ? '✓ Прочитано' : '○ Отметить как прочитанное'}
        </button>
      </div>
    </div>
  `;

    bindArticleActions(id);
}

/**
 * Обработчики кнопок статьи
 */
function bindArticleActions(id) {
    // Кнопки «Прочитано»
    const readButtons = [
        document.getElementById('articleReadBtn'),
        document.getElementById('articleReadBtnBottom')
    ];

    readButtons.forEach(btn => {
        if (!btn) return;
        btn.addEventListener('click', () => {
            const nowRead = toggleArticleRead(id);
            updateReadButtons(nowRead);
        });
    });

    // Кнопка «Печать»
    const printBtn = document.getElementById('articlePrintBtn');
    printBtn?.addEventListener('click', () => {
        window.print();
    });
}

/**
 * Обновляет текст и стиль кнопок «Прочитано»
 */
function updateReadButtons(read) {
    const buttons = [
        document.getElementById('articleReadBtn'),
        document.getElementById('articleReadBtnBottom')
    ];

    buttons.forEach(btn => {
        if (!btn) return;
        btn.textContent = read ? '✓ Прочитано' : '○ Отметить как прочитанное';
        btn.classList.toggle('article-read-btn--done', read);
    });
}
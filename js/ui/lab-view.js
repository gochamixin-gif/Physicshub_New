// ============================================================
// ПРОСМОТР ОДНОЙ ЛАБОРАТОРНОЙ РАБОТЫ
// ============================================================

import { getLabById } from '../data/labs/index.js';
import { arrowBackIcon } from '../icons.js';

function levelStars(level) {
    return '⭐'.repeat(level);
}

export function renderLabView(id) {
    const container = document.getElementById('labView');
    const lab = getLabById(id);

    if (!lab) {
        container.innerHTML = `<p style="padding:40px">Работа не найдена</p>`;
        return;
    }

    container.innerHTML = `
    <div class="lab-view-inner">
      <button class="lab-view__back" id="labBackBtn" type="button">
        ${arrowBackIcon(16)} Назад к списку
      </button>

      <header class="lab-view__header">
        <div class="lab-view__badges">
          <span class="lab-view__badge lab-view__badge--level">${levelStars(lab.level)}</span>
          <span class="lab-view__badge lab-view__badge--category">${lab.category}</span>
          <span class="lab-view__badge lab-view__badge--topic">${lab.topic}</span>
          <span class="lab-view__badge lab-view__badge--duration">⏱ ${lab.duration}</span>
        </div>
        <h1 class="lab-view__title">🧪 ${lab.title}</h1>
        <p class="lab-view__desc">${lab.desc}</p>
      </header>

      <section class="lab-block lab-block--goal">
        <div class="lab-block__label">🎯 Цель работы</div>
        <p class="lab-block__body">${lab.goal}</p>
      </section>

      <section class="lab-block lab-block--equipment">
        <div class="lab-block__label">🧰 Оборудование</div>
        <ul class="lab-list">
          ${lab.equipment.map(e => `<li>${e}</li>`).join('')}
        </ul>
      </section>

      ${lab.theory ? `
        <section class="lab-block lab-block--theory">
          <div class="lab-block__label">📖 Теория</div>
          <div class="lab-block__content">
            ${lab.theory.map(t => {
        if (t.type === 'paragraph') return `<p>${t.text}</p>`;
        if (t.type === 'formula') {
            return `
                  <div class="formula-block">
                    <div class="formula-body">${t.source}</div>
                    ${t.legend ? `
                      <ul class="formula-legend">
                        ${t.legend.map(v => `
                          <li>
                            <span class="formula-legend__sym">${v.symbol}</span>
                            <span class="formula-legend__dash">—</span>
                            <span class="formula-legend__text">${v.meaning}</span>
                            ${v.unit ? `<span class="formula-legend__unit">[${v.unit}]</span>` : ''}
                          </li>
                        `).join('')}
                      </ul>
                    ` : ''}
                  </div>
                `;
        }
        return '';
    }).join('')}
          </div>
        </section>
      ` : ''}

      <section class="lab-block lab-block--steps">
        <div class="lab-block__label">📝 Ход работы</div>
        <ol class="lab-steps">
          ${lab.steps.map(s => `<li>${s.replace(/^\d+\.\s*/, '')}</li>`).join('')}
        </ol>
      </section>

      ${lab.table ? `
        <section class="lab-block lab-block--table">
          <div class="lab-block__label">📊 Таблица результатов</div>
          <div class="lab-table-wrap">
            <table class="lab-table">
              <thead>
                <tr>${lab.table.headers.map(h => `<th>${h}</th>`).join('')}</tr>
              </thead>
              <tbody>
                ${lab.table.rows.map(r => `
                  <tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </section>
      ` : ''}

      ${lab.conclusion ? `
        <section class="lab-block lab-block--conclusion">
          <div class="lab-block__label">💡 Вывод</div>
          <p class="lab-block__body">${lab.conclusion}</p>
        </section>
      ` : ''}

      ${lab.notes && lab.notes.length ? `
        <section class="lab-block lab-block--notes">
          <div class="lab-block__label">⚠️ Важно</div>
          <ul class="lab-list">
            ${lab.notes.map(n => `<li>${n}</li>`).join('')}
          </ul>
        </section>
      ` : ''}
    </div>
  `;
}
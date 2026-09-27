// ============================================================
// СПРАВОЧНИК СИ — страница
// ============================================================

import { siData } from '../data/si-units.js';

/**
 * Рендер таблицы основных единиц
 */
function renderBasicUnits() {
    return `
    <section class="si-section">
      <h2 class="si-section__title">
        <span class="si-section__num">01</span>
        Основные единицы СИ
      </h2>
      <p class="si-section__desc">
        7 базовых единиц, из которых выводятся все остальные
      </p>

      <div class="si-table-wrap">
        <table class="si-table">
          <thead>
            <tr>
              <th>Величина</th>
              <th>Обозначение</th>
              <th>Единица</th>
              <th>Символ</th>
              <th>Примечание</th>
            </tr>
          </thead>
          <tbody>
            ${siData.basicUnits.map(u => `
              <tr>
                <td><strong>${u.name}</strong></td>
                <td><span class="si-symbol">${u.symbol}</span></td>
                <td>${u.unit}</td>
                <td><span class="si-short">${u.short}</span></td>
                <td class="si-note">${u.note}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

/**
 * Рендер производных единиц
 */
function renderDerivedUnits() {
    return `
    <section class="si-section">
      <h2 class="si-section__title">
        <span class="si-section__num">02</span>
        Производные единицы
      </h2>
      <p class="si-section__desc">
        Получаются из основных через физические формулы
      </p>

      <div class="si-table-wrap">
        <table class="si-table">
          <thead>
            <tr>
              <th>Величина</th>
              <th>Обозначение</th>
              <th>Единица</th>
              <th>Символ</th>
              <th>Через основные</th>
            </tr>
          </thead>
          <tbody>
            ${siData.derivedUnits.map(u => `
              <tr>
                <td><strong>${u.name}</strong></td>
                <td><span class="si-symbol">${u.symbol}</span></td>
                <td>${u.unit}</td>
                <td><span class="si-short">${u.short}</span></td>
                <td><span class="si-formula">${u.formula}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

/**
 * Рендер приставок
 */
function renderPrefixes() {
    return `
    <section class="si-section">
      <h2 class="si-section__title">
        <span class="si-section__num">03</span>
        Приставки СИ
      </h2>
      <p class="si-section__desc">
        Меняют единицу в 10ⁿ раз — удобно для больших и малых значений
      </p>

      <div class="si-prefixes">
        ${siData.prefixes.map(p => `
          <div class="si-prefix">
            <div class="si-prefix__head">
              <span class="si-prefix__name">${p.name}</span>
              <span class="si-prefix__symbol">${p.symbol}</span>
            </div>
            <div class="si-prefix__factor">${p.factor}</div>
            <div class="si-prefix__value">${p.value}</div>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

/**
 * Рендер переводов
 */
function renderConversions() {
    return `
    <section class="si-section">
      <h2 class="si-section__title">
        <span class="si-section__num">04</span>
        Полезные переводы
      </h2>
      <p class="si-section__desc">
        Часто нужны при решении задач
      </p>

      <div class="si-conversions">
        ${siData.conversions.map(c => `
          <div class="si-conversion">
            <div class="si-conversion__from">${c.from}</div>
            <div class="si-conversion__arrow">→</div>
            <div class="si-conversion__to">${c.to}</div>
            <div class="si-conversion__note">${c.note}</div>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

/**
 * Главный рендер
 */
export function renderSi() {
    const container = document.getElementById('si');
    container.innerHTML = `
    <div class="si-page">
      <section class="si-intro">
        <div class="si-intro__label">СПРАВОЧНИК</div>
        <h1 class="si-intro__title">${siData.title}</h1>
        <p class="si-intro__desc">${siData.description}</p>
      </section>

      ${renderBasicUnits()}
      ${renderDerivedUnits()}
      ${renderPrefixes()}
      ${renderConversions()}
    </div>
  `;
}
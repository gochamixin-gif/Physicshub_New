// ============================================================
// ПРОСМОТР ОДНОЙ ЗАДАЧИ — ученик решает сам
// ============================================================

import { getTaskById } from '../data/tasks/index.js';
import { arrowBackIcon } from '../icons.js';
import { isTaskSolved, markTaskSolved } from '../core/progress.js';

function levelStars(level) {
    const labels = { 1: 'Базовая', 2: 'Средняя', 3: 'Олимпиадная' };
    return `${'⭐'.repeat(level)} ${labels[level] || ''}`.trim();
}

function normalize(str) {
    return String(str)
        .toLowerCase()
        .trim()
        .replace(/\s+/g, ' ')
        .replace(/,/g, '.');
}

function checkAnswer(input, task) {
    if (!input) return false;
    const user = normalize(input);
    const variants = (task.answerCheck || []).map(normalize);

    if (variants.includes(user)) return true;

    const userNum = parseFloat(user.replace(/[^\d.\-]/g, ''));
    if (!isNaN(userNum)) {
        for (const v of variants) {
            const vNum = parseFloat(v.replace(/[^\d.\-]/g, ''));
            if (!isNaN(vNum) && Math.abs(userNum - vNum) < 0.01) return true;
        }
    }
    return false;
}

export function renderTaskView(id) {
    const container = document.getElementById('taskView');
    const t = getTaskById(id);

    if (!t) {
        container.innerHTML = `
      <div class="task-view-inner">
        <p style="padding:40px 0;color:#a0a0b0;">Задача не найдена</p>
      </div>
    `;
        return;
    }

    const solved = isTaskSolved(id);

    container.innerHTML = `
    <div class="task-view-inner">
      <button class="task-view__back" id="taskBackBtn" type="button">
        ${arrowBackIcon(16)} Назад к задачам
      </button>

      <header class="task-view__header">
        <div class="task-view__badges">
          <span class="task-view__badge task-view__badge--level">
            ${levelStars(t.level)}
          </span>
          <span class="task-view__badge task-view__badge--category">${t.category}</span>
          <span class="task-view__badge task-view__badge--topic">${t.topic}</span>
          ${solved ? `<span class="task-view__badge task-view__badge--solved">✓ Решена</span>` : ''}
        </div>
        <h1 class="task-view__task">${t.task}</h1>
      </header>

      ${t.given ? `
        <div class="task-block task-block--given">
          <div class="task-block__label">Дано</div>
          <div class="task-block__body">${t.given}</div>
        </div>
      ` : ''}

      <div class="task-actions" id="taskActions">
        <button class="task-action task-action--hint" id="hintBtn" type="button">
          💡 Подсказка
        </button>
        <button class="task-action task-action--solve" id="showSolutionBtn" type="button">
          👁 Показать решение
        </button>
      </div>

      <div class="task-hint hidden" id="hintBlock">
        <div class="task-hint__label">💡 Подсказка</div>
        <div class="task-hint__body">${t.hint || 'Подумай, какую формулу здесь применить.'}</div>
      </div>

      <div class="task-answer-input" id="answerInputBlock">
        <label class="task-answer-input__label" for="answerField">
          ✏️ Твой ответ ${t.answerUnit ? `<span class="task-answer-input__unit">(${t.answerUnit})</span>` : ''}
        </label>
        <div class="task-answer-input__row">
          <input type="text" class="task-answer-input__field" id="answerField"
                 placeholder="Введи ответ…" autocomplete="off">
          <button class="task-answer-input__btn" id="checkAnswerBtn" type="button">
            Проверить
          </button>
        </div>
        <div class="task-answer-input__result hidden" id="answerResult"></div>
      </div>

      <div class="task-solution hidden" id="solutionBlock">
        <div class="task-block task-block--solution">
          <div class="task-block__label">Решение</div>
          <div class="task-block__body">${t.solution}</div>
        </div>
        <div class="task-block task-block--answer">
          <div class="task-block__label">Ответ</div>
          <div class="task-block__body">${t.answer}</div>
        </div>
      </div>
    </div>
  `;

    bindTaskActions(t, id);
}

function bindTaskActions(task, id) {
    const hintBtn = document.getElementById('hintBtn');
    const hintBlock = document.getElementById('hintBlock');
    const showSolutionBtn = document.getElementById('showSolutionBtn');
    const solutionBlock = document.getElementById('solutionBlock');
    const answerField = document.getElementById('answerField');
    const checkBtn = document.getElementById('checkAnswerBtn');
    const resultEl = document.getElementById('answerResult');

    hintBtn?.addEventListener('click', () => {
        hintBlock.classList.toggle('hidden');
        hintBtn.classList.toggle('task-action--active');
    });

    showSolutionBtn?.addEventListener('click', () => {
        solutionBlock.classList.remove('hidden');
        showSolutionBtn.disabled = true;
        showSolutionBtn.textContent = '✅ Решение показано';
        showSolutionBtn.classList.add('task-action--done');
        document.getElementById('answerInputBlock')?.classList.add('hidden');
    });

    function doCheck() {
        const val = answerField.value.trim();
        if (!val) {
            resultEl.className = 'task-answer-input__result task-answer-input__result--warn';
            resultEl.textContent = 'Сначала введи ответ';
            resultEl.classList.remove('hidden');
            return;
        }

        const correct = checkAnswer(val, task);

        if (correct) {
            resultEl.className = 'task-answer-input__result task-answer-input__result--ok';
            resultEl.textContent = '✅ Верно! Отличная работа.';
            // Сохраняем прогресс
            markTaskSolved(id);
            // Раскрываем решение
            solutionBlock.classList.remove('hidden');
            showSolutionBtn.disabled = true;
            showSolutionBtn.textContent = '✅ Решение показано';
        } else {
            resultEl.className = 'task-answer-input__result task-answer-input__result--fail';
            resultEl.textContent = '❌ Не совсем. Попробуй ещё раз или посмотри подсказку.';
        }
        resultEl.classList.remove('hidden');
    }

    checkBtn?.addEventListener('click', doCheck);

    answerField?.addEventListener('keydown', e => {
        if (e.key === 'Enter') doCheck();
    });
}
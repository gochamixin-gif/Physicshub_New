// ============================================================
// ПРОХОЖДЕНИЕ ТЕСТА — 5 вопросов последовательно
// ============================================================

import { getQuizById } from '../data/tasks/quizzes/index.js';
import { arrowBackIcon } from '../icons.js';

// Состояние текущего теста
let state = {
    quizId: null,
    current: 0,
    answers: [],   // индекс выбранного ответа для каждого вопроса
    checked: []    // были ли проверены ответы
};

function levelStars(level) {
    return '⭐'.repeat(level);
}

/**
 * Начать тест
 */
export function renderQuizView(quizId) {
    state = {
        quizId,
        current: 0,
        answers: [],
        checked: []
    };
    renderCurrentQuestion();
}

/**
 * Отрисовка текущего вопроса
 */
function renderCurrentQuestion() {
    const container = document.getElementById('quizView');
    const quiz = getQuizById(state.quizId);
    if (!quiz) {
        container.innerHTML = `<p style="padding:40px">Тест не найден</p>`;
        return;
    }

    const q = quiz.questions[state.current];
    const total = quiz.questions.length;
    const progress = Math.round((state.current / total) * 100);
    const userAnswer = state.answers[state.current];
    const isChecked = state.checked[state.current];

    container.innerHTML = `
    <div class="quiz-view-inner">
      <div class="quiz-view-toolbar">
        <button class="quiz-view__back" id="quizBackBtn" type="button">
          ${arrowBackIcon(16)} Назад к тестам
        </button>
        <div class="quiz-view__counter">
          Вопрос <strong>${state.current + 1}</strong> из ${total}
        </div>
      </div>

      <div class="quiz-view__progress">
        <div class="quiz-view__progress-bar" style="width: ${progress}%"></div>
      </div>

      <div class="quiz-view__badges">
        <span class="quiz-view__badge quiz-view__badge--level">${levelStars(quiz.level)}</span>
        <span class="quiz-view__badge quiz-view__badge--category">${quiz.category}</span>
        <span class="quiz-view__badge quiz-view__badge--topic">${quiz.topic}</span>
      </div>

      <h2 class="quiz-view__question">${q.question}</h2>

      <div class="quiz-view__options" id="quizOptions">
        ${q.options.map((opt, i) => {
        const isSelected = userAnswer === i;
        let cls = 'quiz-option';
        if (isSelected) cls += ' quiz-option--selected';

        if (isChecked) {
            if (i === q.correct) cls += ' quiz-option--correct';
            else if (i === userAnswer) cls += ' quiz-option--wrong';
        }

        return `
            <button class="${cls}" data-option-index="${i}" type="button">
              <span class="quiz-option__letter">${String.fromCharCode(65 + i)}</span>
              <span class="quiz-option__text">${opt}</span>
            </button>
          `;
    }).join('')}
      </div>

      <div class="quiz-view__explanation hidden" id="quizExplanation">
        <div class="quiz-view__explanation-label">Объяснение</div>
        <p>${q.explanation}</p>
      </div>

      <div class="quiz-view__actions" id="quizActions">
        ${!isChecked ? `
          <button class="quiz-btn quiz-btn--check" id="checkBtn" type="button" ${userAnswer === undefined ? 'disabled' : ''}>
            Проверить ответ
          </button>
        ` : `
          <button class="quiz-btn quiz-btn--next" id="nextBtn" type="button">
            ${state.current < total - 1 ? 'Следующий вопрос →' : 'Завершить тест'}
          </button>
        `}
      </div>
    </div>
  `;

    bindQuestionEvents(quiz);
}

/**
 * Обработчики кнопок
 */
function bindQuestionEvents(quiz) {
    const container = document.getElementById('quizView');
    const isChecked = state.checked[state.current];

    // Клик по опции (пока не проверено)
    if (!isChecked) {
        container.querySelectorAll('.quiz-option').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.dataset.optionIndex, 10);
                state.answers[state.current] = idx;
                renderCurrentQuestion();
            });
        });

        const checkBtn = document.getElementById('checkBtn');
        checkBtn?.addEventListener('click', () => {
            state.checked[state.current] = true;
            renderCurrentQuestion();
        });
    } else {
        // Показать объяснение
        const expl = document.getElementById('quizExplanation');
        expl?.classList.remove('hidden');

        const nextBtn = document.getElementById('nextBtn');
        nextBtn?.addEventListener('click', () => {
            if (state.current < quiz.questions.length - 1) {
                state.current++;
                renderCurrentQuestion();
            } else {
                renderResult(quiz);
            }
        });
    }
}

/**
 * Итоговый результат
 */
function renderResult(quiz) {
    const container = document.getElementById('quizView');
    const total = quiz.questions.length;
    let correct = 0;
    quiz.questions.forEach((q, i) => {
        if (state.answers[i] === q.correct) correct++;
    });
    const percent = Math.round((correct / total) * 100);

    let medal, title, message;
    if (percent === 100) {
        medal = '🏆';
        title = 'Идеально!';
        message = 'Все ответы верные — ты отлично знаешь тему!';
    } else if (percent >= 80) {
        medal = '🎉';
        title = 'Отлично!';
        message = 'Почти всё правильно — небольшие доработки, и будет идеально.';
    } else if (percent >= 60) {
        medal = '👍';
        title = 'Хорошо!';
        message = 'Основы усвоены. Посмотри объяснения к ошибкам.';
    } else if (percent >= 40) {
        medal = '📖';
        title = 'Неплохо';
        message = 'Стоит повторить тему и попробовать снова.';
    } else {
        medal = '📚';
        title = 'Надо подтянуть';
        message = 'Прочитай статью по теме и вернись к тесту.';
    }

    container.innerHTML = `
    <div class="quiz-view-inner">
      <div class="quiz-result">
        <div class="quiz-result__medal">${medal}</div>
        <h2 class="quiz-result__title">${title}</h2>
        <div class="quiz-result__score">
          <span class="quiz-result__correct">${correct}</span>
          <span class="quiz-result__divider">/</span>
          <span class="quiz-result__total">${total}</span>
        </div>
        <div class="quiz-result__percent">${percent}%</div>
        <p class="quiz-result__message">${message}</p>

        <div class="quiz-result__answers">
          ${quiz.questions.map((q, i) => {
        const userIdx = state.answers[i];
        const isCorrect = userIdx === q.correct;
        return `
              <div class="quiz-result__item ${isCorrect ? 'quiz-result__item--ok' : 'quiz-result__item--fail'}">
                <div class="quiz-result__item-head">
                  <span class="quiz-result__item-num">Вопрос ${i + 1}</span>
                  <span class="quiz-result__item-mark">${isCorrect ? '✓' : '✗'}</span>
                </div>
                <div class="quiz-result__item-question">${q.question}</div>
                <div class="quiz-result__item-answer">
                  Правильный ответ: <strong>${q.options[q.correct]}</strong>
                </div>
              </div>
            `;
    }).join('')}
        </div>

        <div class="quiz-result__actions">
          <button class="quiz-btn quiz-btn--check" id="retryBtn" type="button">
            🔄 Пройти заново
          </button>
          <button class="quiz-btn quiz-btn--next" id="backToListBtn" type="button">
            К списку тестов →
          </button>
        </div>
      </div>
    </div>
  `;

    // Обработчики
    document.getElementById('retryBtn')?.addEventListener('click', () => {
        renderQuizView(quiz.id);
    });

    document.getElementById('backToListBtn')?.addEventListener('click', () => {
        import('../core/router.js').then(({ showQuizzes }) => {
            showQuizzes();
            import('./quizzes.js').then(({ renderQuizzes }) => {
                renderQuizzes();
            });
        });
    });
}
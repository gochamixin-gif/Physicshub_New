// ============================================================
// ПРОХОЖДЕНИЕ ТЕСТА — с таймером и сохранением результата
// ============================================================

import { getQuizById } from '../data/tasks/quizzes/index.js';
import { saveQuizResult } from '../core/progress.js';
import { arrowBackIcon } from '../icons.js';

// Время по уровням сложности (в секундах)
const TIME_BY_LEVEL = {
    1: 5 * 60,   // 5 минут
    2: 7 * 60,   // 7 минут
    3: 10 * 60   // 10 минут
};

// Состояние текущего теста
let state = {
    quizId: null,
    current: 0,
    answers: [],
    checked: [],
    timeLeft: 0,
    timerId: null,
    timeUp: false
};

function levelStars(level) {
    return '⭐'.repeat(level);
}

/**
 * Форматирует секунды в ММ:СС
 */
function formatTime(sec) {
    if (sec < 0) sec = 0;
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

/**
 * Останавливает таймер
 */
function stopTimer() {
    if (state.timerId) {
        clearInterval(state.timerId);
        state.timerId = null;
    }
}

/**
 * Запускает таймер
 */
function startTimer() {
    stopTimer();
    state.timerId = setInterval(() => {
        state.timeLeft--;
        if (state.timeLeft <= 0) {
            state.timeLeft = 0;
            state.timeUp = true;
            stopTimer();
            const quiz = getQuizById(state.quizId);
            renderResult(quiz);
            return;
        }
        updateTimerDisplay();
    }, 1000);
}

/**
 * Обновляет блок таймера без перерисовки всего
 */
function updateTimerDisplay() {
    const el = document.getElementById('quizTimer');
    if (!el) return;

    el.textContent = `⏱ ${formatTime(state.timeLeft)}`;

    el.classList.remove('quiz-timer--warn', 'quiz-timer--danger');

    if (state.timeLeft <= 20) {
        el.classList.add('quiz-timer--danger');
    } else if (state.timeLeft <= 60) {
        el.classList.add('quiz-timer--warn');
    }
}

/**
 * Начать тест
 */
export function renderQuizView(quizId) {
    const quiz = getQuizById(quizId);
    const totalTime = TIME_BY_LEVEL[quiz.level] || TIME_BY_LEVEL[1];

    state = {
        quizId,
        current: 0,
        answers: [],
        checked: [],
        timeLeft: totalTime,
        timerId: null,
        timeUp: false
    };

    stopTimer();
    renderCurrentQuestion();
    startTimer();
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

    let timerClass = 'quiz-timer';
    if (state.timeLeft <= 20) timerClass += ' quiz-timer--danger';
    else if (state.timeLeft <= 60) timerClass += ' quiz-timer--warn';

    container.innerHTML = `
    <div class="quiz-view-inner">
      <div class="quiz-view-toolbar">
        <button class="quiz-view__back" id="quizBackBtn" type="button">
          ${arrowBackIcon(16)} Назад к тестам
        </button>
        <div class="quiz-view-toolbar__right">
          <div class="quiz-view__counter">
            Вопрос <strong>${state.current + 1}</strong> из ${total}
          </div>
          <div class="${timerClass}" id="quizTimer">⏱ ${formatTime(state.timeLeft)}</div>
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
        const expl = document.getElementById('quizExplanation');
        expl?.classList.remove('hidden');

        const nextBtn = document.getElementById('nextBtn');
        nextBtn?.addEventListener('click', () => {
            if (state.current < quiz.questions.length - 1) {
                state.current++;
                renderCurrentQuestion();
            } else {
                stopTimer();
                renderResult(quiz);
            }
        });
    }
}

/**
 * Итоговый результат
 */
function renderResult(quiz) {
    stopTimer();
    const container = document.getElementById('quizView');
    const total = quiz.questions.length;

    // Считаем правильные
    let correct = 0;
    quiz.questions.forEach((q, i) => {
        if (state.answers[i] === q.correct) correct++;
    });
    const percent = Math.round((correct / total) * 100);

    // Время
    const totalTime = TIME_BY_LEVEL[quiz.level] || TIME_BY_LEVEL[1];
    const timeSpent = totalTime - state.timeLeft;

    // Сохраняем результат
    const saveInfo = saveQuizResult(quiz.id, {
        correct,
        total,
        timeSpent,
        timeUp: state.timeUp
    });

    let medal, title, message;
    if (state.timeUp) {
        medal = '⏰';
        title = 'Время вышло!';
        message = 'Попробуй ещё раз — в следующий раз получится быстрее.';
    } else if (percent === 100) {
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

        ${saveInfo.isNewRecord ? `
          <div class="quiz-result__record">
            🎯 Новый рекорд!
          </div>
        ` : saveInfo.previous ? `
          <div class="quiz-result__record quiz-result__record--old">
            Рекорд: ${saveInfo.previous.correct}/${saveInfo.previous.total}
            · ${formatTime(saveInfo.previous.timeSpent)}
          </div>
        ` : ''}

        <div class="quiz-result__score">
          <span class="quiz-result__correct">${correct}</span>
          <span class="quiz-result__divider">/</span>
          <span class="quiz-result__total">${total}</span>
        </div>
        <div class="quiz-result__percent">${percent}%</div>
        <div class="quiz-result__time">
          ⏱ Время: <strong>${formatTime(timeSpent)}</strong>
          ${state.timeUp ? ' (вышло)' : ''}
        </div>
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

    document.getElementById('retryBtn')?.addEventListener('click', () => {
        renderQuizView(quiz.id);
    });

    document.getElementById('backToListBtn')?.addEventListener('click', () => {
        stopTimer();
        import('../core/router.js').then(({ showQuizzes }) => {
            showQuizzes();
            import('./quizzes.js').then(({ renderQuizzes }) => {
                renderQuizzes();
            });
        });
    });
}
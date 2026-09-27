// ============================================================
// ПРОГРЕСС — сохранение в localStorage
// ============================================================

const STORAGE_KEY = 'physicshub_progress';

/**
 * Читает прогресс
 */
function load() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const data = raw ? JSON.parse(raw) : {};
        return {
            articles: data.articles || [],
            tasks: data.tasks || [],
            quizzes: data.quizzes || {}   // { quizId: { correct, total, timeSpent, date, attempts } }
        };
    } catch (e) {
        console.warn('[progress] ошибка чтения:', e);
        return { articles: [], tasks: [], quizzes: {} };
    }
}

/**
 * Сохраняет прогресс
 */
function save(data) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
        console.warn('[progress] ошибка записи:', e);
    }
}

// ============================================================
// СТАТЬИ
// ============================================================

export function markArticleRead(id) {
    const data = load();
    if (!data.articles.includes(id)) {
        data.articles.push(id);
        save(data);
    }
}

export function unmarkArticleRead(id) {
    const data = load();
    data.articles = data.articles.filter(x => x !== id);
    save(data);
}

export function toggleArticleRead(id) {
    const data = load();
    if (data.articles.includes(id)) {
        unmarkArticleRead(id);
        return false;
    } else {
        markArticleRead(id);
        return true;
    }
}

export function isArticleRead(id) {
    return load().articles.includes(id);
}

export function countReadInCategory(allArticles, category) {
    const data = load();
    return allArticles.filter(
        a => a.category === category && data.articles.includes(a.id)
    ).length;
}

// ============================================================
// ЗАДАЧИ
// ============================================================

export function markTaskSolved(id) {
    const data = load();
    if (!data.tasks.includes(id)) {
        data.tasks.push(id);
        save(data);
    }
}

export function isTaskSolved(id) {
    return load().tasks.includes(id);
}

export function countSolvedTasks() {
    return load().tasks.length;
}

export function countSolvedInCategory(allTasks, category) {
    const data = load();
    return allTasks.filter(
        t => t.category === category && data.tasks.includes(t.id)
    ).length;
}

// ============================================================
// ТЕСТЫ
// ============================================================

/**
 * Сохраняет результат прохождения теста
 * @param {string} quizId — id теста
 * @param {object} result — { correct, total, timeSpent, timeUp }
 * @returns {object} — { isNewRecord, previous }
 */
export function saveQuizResult(quizId, result) {
    const data = load();
    const prev = data.quizzes[quizId];

    const now = Date.now();

    // Проверяем, лучше ли новый результат
    let isNewRecord = false;
    if (!prev) {
        isNewRecord = true;
    } else {
        // Лучше, если больше правильных
        // Или столько же, но быстрее
        if (result.correct > prev.correct) {
            isNewRecord = true;
        } else if (result.correct === prev.correct && result.timeSpent < prev.timeSpent) {
            isNewRecord = true;
        }
    }

    // Обновляем запись
    data.quizzes[quizId] = {
        correct: isNewRecord ? result.correct : prev.correct,
        total: result.total,
        timeSpent: isNewRecord ? result.timeSpent : prev.timeSpent,
        date: isNewRecord ? now : prev.date,
        lastAttempt: now,
        attempts: (prev?.attempts || 0) + 1,
        lastCorrect: result.correct,
        lastTimeSpent: result.timeSpent
    };

    save(data);
    return { isNewRecord, previous: prev };
}

/**
 * Получить результат теста
 */
export function getQuizResult(quizId) {
    return load().quizzes[quizId] || null;
}

/**
 * Пройден ли тест (полностью или частично)
 */
export function isQuizAttempted(quizId) {
    return !!load().quizzes[quizId];
}

/**
 * Пройден ли тест идеально (все верные)
 */
export function isQuizPerfect(quizId) {
    const r = load().quizzes[quizId];
    if (!r) return false;
    return r.correct === r.total;
}

/**
 * Статистика по всем тестам
 */
export function getQuizStats() {
    const data = load();
    const quizzes = data.quizzes;
    const ids = Object.keys(quizzes);

    let attempted = ids.length;
    let perfect = 0;
    let totalCorrect = 0;
    let totalQuestions = 0;

    ids.forEach(id => {
        const q = quizzes[id];
        if (q.correct === q.total) perfect++;
        totalCorrect += q.correct;
        totalQuestions += q.total;
    });

    return {
        attempted,
        perfect,
        totalCorrect,
        totalQuestions,
        percent: totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0
    };
}

/**
 * Сбрасывает весь прогресс
 */
export function resetProgress() {
    save({ articles: [], tasks: [], quizzes: {} });
}
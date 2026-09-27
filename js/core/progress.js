// ============================================================
// ПРОГРЕСС — сохранение в localStorage
// ============================================================

const STORAGE_KEY = 'Phyzzy_progress';

/**
 * Читает прогресс из localStorage
 */
function load() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : { articles: [], tasks: [] };
    } catch (e) {
        console.warn('[progress] ошибка чтения:', e);
        return { articles: [], tasks: [] };
    }
}

/**
 * Сохраняет прогресс в localStorage
 */
function save(data) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
        console.warn('[progress] ошибка записи:', e);
    }
}

/**
 * Помечает статью как прочитанную
 */
export function markArticleRead(id) {
    const data = load();
    if (!data.articles.includes(id)) {
        data.articles.push(id);
        save(data);
    }
}

/**
 * Снимает отметку «прочитано» со статьи
 */
export function unmarkArticleRead(id) {
    const data = load();
    data.articles = data.articles.filter(x => x !== id);
    save(data);
}

/**
 * Переключает статус «прочитано»
 */
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

/**
 * Проверяет, прочитана ли статья
 */
export function isArticleRead(id) {
    return load().articles.includes(id);
}

/**
 * Помечает задачу как решённую верно
 */
export function markTaskSolved(id) {
    const data = load();
    if (!data.tasks.includes(id)) {
        data.tasks.push(id);
        save(data);
    }
}

/**
 * Проверяет, решена ли задача
 */
export function isTaskSolved(id) {
    return load().tasks.includes(id);
}

/**
 * Сбрасывает весь прогресс
 */
export function resetProgress() {
    save({ articles: [], tasks: [] });
}

/**
 * Считает прочитанные статьи в категории
 */
export function countReadInCategory(allArticles, category) {
    const data = load();
    return allArticles.filter(
        a => a.category === category && data.articles.includes(a.id)
    ).length;
}

/**
 * Считает решённые задачи
 */
export function countSolvedTasks() {
    return load().tasks.length;
}

/**
 * Считает решённые задачи в категории
 */
export function countSolvedInCategory(allTasks, category) {
    const data = load();
    return allTasks.filter(
        t => t.category === category && data.tasks.includes(t.id)
    ).length;
}
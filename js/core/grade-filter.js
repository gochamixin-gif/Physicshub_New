// ============================================================
// ФИЛЬТР ПО КЛАССАМ
// ============================================================

const STORAGE_KEY = 'phyzzy_grade';

let currentGrade = 'all';

/**
 * Доступные классы
 */
export const GRADES = [
    { value: 'all', label: 'Все классы', icon: '🎓' },
    { value: 7,     label: '7 класс',    icon: '7️⃣' },
    { value: 8,     label: '8 класс',    icon: '8️⃣' },
    { value: 9,     label: '9 класс',    icon: '9️⃣' },
    { value: 10,    label: '10 класс',   icon: '🔟' },
    { value: 11,    label: '11 класс',   icon: '1️⃣1️⃣' }
];

/**
 * Загружает выбранный класс из localStorage
 */
export function loadGrade() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved === 'all' || saved === null) {
            currentGrade = 'all';
        } else {
            const num = parseInt(saved, 10);
            currentGrade = isNaN(num) ? 'all' : num;
        }
    } catch (e) {
        currentGrade = 'all';
    }
    return currentGrade;
}

/**
 * Сохраняет класс в localStorage
 */
export function saveGrade(value) {
    try {
        localStorage.setItem(STORAGE_KEY, String(value));
    } catch (e) {
        console.warn('[grade] ошибка сохранения:', e);
    }
}

/**
 * Возвращает текущий класс
 */
export function getGrade() {
    return currentGrade;
}

/**
 * Устанавливает класс
 */
export function setGrade(value) {
    currentGrade = value;
    saveGrade(value);
}

/**
 * Проверяет, подходит ли элемент под текущий класс
 */
export function matchesGrade(item) {
    if (currentGrade === 'all') return true;
    if (!item || item.grade === undefined) return true; // если нет grade — показываем всем
    return item.grade === currentGrade;
}

/**
 * Фильтрует массив по классу
 */
export function filterByGrade(items) {
    if (currentGrade === 'all') return items;
    return items.filter(matchesGrade);
}

/**
 * Рендер панели выбора класса
 */
export function renderGradeFilter(options = {}) {
    const { showCounts = null, compact = false } = options;

    const buttons = GRADES.map(g => {
        const active = g.value === currentGrade ? ' grade-filter__btn--active' : '';

        let count = '';
        if (showCounts && g.value !== 'all') {
            const c = showCounts[g.value] || 0;
            if (c > 0) {
                count = `<span class="grade-filter__count">${c}</span>`;
            }
        }

        return `
      <button class="grade-filter__btn${active}"
              data-grade="${g.value}"
              type="button">
        <span class="grade-filter__icon">${g.icon}</span>
        <span class="grade-filter__label">${g.label}</span>
        ${count}
      </button>
    `;
    }).join('');

    return `
    <div class="grade-filter${compact ? ' grade-filter--compact' : ''}" id="gradeFilter">
      <span class="grade-filter__title">Класс:</span>
      ${buttons}
    </div>
  `;
}

/**
 * Считает количество элементов по классам
 */
export function countByGrade(items) {
    const counts = {};
    items.forEach(item => {
        const g = item.grade || 7;
        counts[g] = (counts[g] || 0) + 1;
    });
    return counts;
}
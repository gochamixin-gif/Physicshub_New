// ============================================================
// РЕЕСТР ЗАДАЧ
// ============================================================

import { speedTasks }      from './mechanics/speed.js';
import { massTasks }       from './mechanics/mass.js';
import { densityTasks }    from './mechanics/density.js';
import { pressureTasks }   from './pressure/pressure.js';
import { workTasks }       from './energy/work.js';
import { extraTasks }      from './mixed/tasks-10.js';

export const taskDatabase = [
    ...speedTasks,
    ...massTasks,
    ...densityTasks,
    ...pressureTasks,
    ...workTasks,
    ...extraTasks
];

export function getTaskById(id) {
    return taskDatabase.find(t => t.id === id);
}

/**
 * Все категории (уникальные)
 */
export function getTaskCategories() {
    const set = new Set();
    taskDatabase.forEach(t => t.category && set.add(t.category));
    return Array.from(set).sort();
}

/**
 * Считает задачи по категориям
 */
export function getTaskCounts() {
    const counts = { all: taskDatabase.length };
    taskDatabase.forEach(t => {
        counts[t.category] = (counts[t.category] || 0) + 1;
    });
    return counts;
}
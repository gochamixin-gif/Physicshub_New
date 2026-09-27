// ============================================================
// РЕЕСТР ЛАБОРАТОРНЫХ РАБОТ
// ============================================================

import { labSmallBodies }  from './mechanics/lab-small-bodies.js';
import { labMassScales }   from './mechanics/lab-mass-scales.js';
import { labVolume }       from './mechanics/lab-volume.js';

export const labDatabase = [
    labSmallBodies,
    labMassScales,
    labVolume
];

export function getLabById(id) {
    return labDatabase.find(l => l.id === id);
}

export function getLabCategories() {
    const set = new Set();
    labDatabase.forEach(l => l.category && set.add(l.category));
    return Array.from(set).sort();
}

export function getLabCounts() {
    const counts = { all: labDatabase.length };
    labDatabase.forEach(l => {
        counts[l.category] = (counts[l.category] || 0) + 1;
    });
    return counts;
}
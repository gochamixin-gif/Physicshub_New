// ============================================================
// РЕЕСТР ЛАБОРАТОРНЫХ РАБОТ
// ============================================================

import { labSmallBodies }  from './mechanics/lab-small-bodies.js';
import { labMassScales }   from './mechanics/lab-mass-scales.js';
import { labVolume }       from './mechanics/lab-volume.js';
import { labDensity }      from './mechanics/lab-density.js';
import { labFriction }     from './mechanics/lab-friction.js';

import { labArchimedes }    from './pressure/lab-archimedes.js';
import { labPressureLiquid } from './pressure/lab-pressure-liquid.js';

import { labLever }        from './energy/lab-lever.js';
import { labWorkPower }    from './energy/lab-work-power.js';

export const labDatabase = [
    // Механика
    labSmallBodies,
    labMassScales,
    labVolume,
    labDensity,
    labFriction,

    // Давление
    labArchimedes,
    labPressureLiquid,

    // Работа и энергия
    labLever,
    labWorkPower
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
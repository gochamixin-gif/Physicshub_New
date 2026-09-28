// ============================================================
// РЕЕСТР ЛАБОРАТОРНЫХ РАБОТ (Перышкин, 7 класс)
// ============================================================

import { labMeasurementPrice } from './mechanics/lab-measurement-price.js';
import { labSmallBodies }      from './mechanics/lab-small-bodies.js';
import { labMassScales }       from './mechanics/lab-mass-scales.js';
import { labVolume }           from './mechanics/lab-volume.js';
import { labDensity }          from './mechanics/lab-density.js';
import { labDynamometer }      from './mechanics/lab-dynamometer.js';
import { labFriction }         from './mechanics/lab-friction.js';
import { labArchimedes }       from './pressure/lab-archimedes.js';
import { labFloating }         from './pressure/lab-floating.js';
import { labLever }            from './energy/lab-lever.js';
import { labEfficiency }       from './energy/lab-efficiency.js';

export const labDatabase = [
    labMeasurementPrice,  // №1
    labSmallBodies,       // №2
    labMassScales,        // №3
    labVolume,            // №4
    labDensity,           // №5
    labDynamometer,       // №6
    labFriction,          // №7
    labArchimedes,        // №8
    labFloating,          // №9
    labLever,             // №10
    labEfficiency         // №11
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
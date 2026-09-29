// ============================================================
// ТОЧКА ВХОДА — Phyzzy
// ============================================================

import { renderHero, renderHeader } from './ui/hero.js';
import { initEvents } from './ui/events.js';
import {
    initScrollAnimations,
    attachRipplesToButtons
} from './core/animations.js';

function bootstrap() {
    renderHeader();
    renderHero();
    initEvents();

    // Анимации
    initScrollAnimations();
    attachRipplesToButtons();

    // Перезапуск при навигации
    window.addEventListener('click', () => {
        setTimeout(() => {
            attachRipplesToButtons();
        }, 100);
    });

    console.log(
        '%c⚛️ Phyzzy запущен',
        'color:#7c3aed;font-size:14px;font-weight:bold'
    );
}

document.addEventListener('DOMContentLoaded', bootstrap);
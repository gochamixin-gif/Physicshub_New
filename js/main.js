// ============================================================
// ТОЧКА ВХОДА
// ============================================================

import { renderHero, renderHeader } from './ui/hero.js';
import { initEvents } from './ui/events.js';

function bootstrap() {
    renderHeader();
    renderHero();
    initEvents();

    console.log(
        '%c⚛️ PhysicsHub запущен',
        'color:#4facfe;font-size:14px;font-weight:bold'
    );
}

document.addEventListener('DOMContentLoaded', bootstrap);
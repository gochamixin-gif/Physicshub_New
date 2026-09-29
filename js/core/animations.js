// ============================================================
// АНИМАЦИИ — появление при скролле, ripple-эффект
// ============================================================

let observer = null;

/**
 * Инициализирует IntersectionObserver для .reveal элементов
 */
export function initScrollAnimations() {
    if (observer) observer.disconnect();

    observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal--visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -60px 0px'
        }
    );

    // Наблюдаем за всеми .reveal
    observeNewElements();
}

/**
 * Подписаться на новые .reveal элементы (после рендера страниц)
 */
export function observeNewElements() {
    if (!observer) return;

    document.querySelectorAll('.reveal:not(.reveal--visible)').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Автоматически добавляет .reveal к карточкам и блокам
 * @param {string|Element} selectorOrEl — селектор или элемент
 * @param {string} [variant] — доп. класс: left / right / scale
 */
export function markReveal(selectorOrEl, variant) {
    const els = typeof selectorOrEl === 'string'
        ? document.querySelectorAll(selectorOrEl)
        : [selectorOrEl];

    els.forEach((el, i) => {
        el.classList.add('reveal');
        if (variant) el.classList.add(`reveal--${variant}`);
        el.style.transitionDelay = `${Math.min(i * 0.06, 0.5)}s`;
    });

    // Наблюдаем
    requestAnimationFrame(() => observeNewElements());
}

/**
 * Ripple-эффект на кнопке
 */
export function attachRipple(btn) {
    if (!btn || btn.dataset.rippleAttached) return;
    btn.dataset.rippleAttached = '1';
    btn.classList.add('ripple-btn');

    btn.addEventListener('click', (e) => {
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        btn.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
}

/**
 * Применить ripple ко всем кнопкам на странице
 */
export function attachRipplesToButtons() {
    document.querySelectorAll(
        '.site-btn, .quiz-btn, .task-action, .article-print-btn, .article-read-btn'
    ).forEach(attachRipple);
}

/**
 * Эффект «плавного появления» для целого экрана
 */
export function animateScreen(element) {
    if (!element) return;
    element.classList.remove('anim-fade-in');
    // Форсируем reflow
    void element.offsetWidth;
    element.classList.add('anim-fade-in');
}

/**
 * Плавная прокрутка к элементу
 */
export function scrollToElement(el, offset = 80) {
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
}

/**
 * Кратковременная «тряска» элемента (для неверного ответа)
 */
export function shake(element) {
    if (!element) return;
    element.classList.add('anim-shake');
    setTimeout(() => element.classList.remove('anim-shake'), 500);
}

/**
 * Всплеск «успеха» — зелёная галочка с анимацией
 */
export function popSuccess(element) {
    if (!element) return;
    element.classList.add('anim-check');
    setTimeout(() => element.classList.remove('anim-check'), 500);
}
// ============================================================
// СТАТЬЯ: Сила притяжения (гравитация)
// ============================================================

export const gravity = {
    id: 'gravity',
    title: 'Сила притяжения (гравитация)',
    desc: 'Фундаментальное взаимодействие, из-за которого все тела притягиваются друг к другу.',
    keywords: ['сила притяжения', 'гравитация', 'тяготение', 'ньютон', 'земля', 'g', 'вес'],
    category: 'Механика',
  grade: 7,
  order: 44,
    readTime: '6 мин',
    tags: ['ньютон', 'всемирное тяготение'],

    diagrams: {
        interaction: `
      <svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="100" r="35" fill="#4facfe" opacity="0.8"/>
        <text x="100" y="105" text-anchor="middle" fill="#fff"
              font-size="16" font-weight="bold">m₁</text>

        <circle cx="400" cy="100" r="50" fill="#a78bfa" opacity="0.8"/>
        <text x="400" y="105" text-anchor="middle" fill="#fff"
              font-size="16" font-weight="bold">m₂</text>

        <line x1="140" y1="100" x2="230" y2="100" stroke="#4facfe" stroke-width="3"/>
        <polygon points="230,95 245,100 230,105" fill="#4facfe"/>
        <text x="185" y="90" fill="#4facfe" font-size="14" text-anchor="middle">F₁</text>

        <line x1="360" y1="100" x2="270" y2="100" stroke="#a78bfa" stroke-width="3"/>
        <polygon points="270,95 255,100 270,105" fill="#a78bfa"/>
        <text x="315" y="90" fill="#a78bfa" font-size="14" text-anchor="middle">F₂</text>

        <line x1="100" y1="170" x2="400" y2="170"
              stroke="#fff" stroke-width="1" stroke-dasharray="5,5"/>
        <text x="250" y="190" fill="#fff" font-size="14" text-anchor="middle">r</text>
      </svg>
    `
    },

    content: [
        {
            type: 'paragraph',
            text: '<strong>Гравитация</strong> — универсальное фундаментальное взаимодействие, которому подвержены все материальные тела во Вселенной.'
        },

        { type: 'heading', level: 2, text: 'Закон всемирного тяготения' },

        {
            type: 'paragraph',
            text: 'Открыт Исааком Ньютоном в 1687 году. Это один из краеугольных законов классической физики:'
        },

        {
            type: 'formula',
            source: 'F = G · m₁ · m₂ / r²',
            legend: [
                { symbol: 'F',   meaning: 'Сила притяжения',            unit: 'Н' },
                { symbol: 'G',   meaning: 'Гравитационная постоянная',  unit: 'Н·м²/кг²' },
                { symbol: 'm₁',  meaning: 'Масса первого тела',         unit: 'кг' },
                { symbol: 'm₂',  meaning: 'Масса второго тела',         unit: 'кг' },
                { symbol: 'r',   meaning: 'Расстояние между центрами',  unit: 'м' }
            ]
        },

        { type: 'heading', level: 2, text: 'Схема взаимодействия' },

        {
            type: 'diagram',
            svg: 'interaction',
            caption: 'Силы равны по модулю и противоположны по направлению'
        },

        {
            type: 'note',
            kind: 'info',
            title: 'Третий закон Ньютона',
            text: 'Силы F₁ и F₂ равны по модулю, но противоположны по направлению — это следствие третьего закона Ньютона.'
        },

        { type: 'heading', level: 2, text: 'Ускорение свободного падения' },

        {
            type: 'paragraph',
            text: 'Вблизи поверхности Земли все тела падают с одинаковым ускорением:'
        },

        {
            type: 'formula',
            source: 'g = G · M / R² ≈ 9.81 м/с²',
            legend: [
                { symbol: 'g', meaning: 'Ускорение свободного падения', unit: 'м/с²' },
                { symbol: 'M', meaning: 'Масса Земли',                  unit: 'кг' },
                { symbol: 'R', meaning: 'Радиус Земли',                 unit: 'м' }
            ]
        },

        {
            type: 'note',
            kind: 'warn',
            title: 'Почему все тела падают одинаково?',
            text: 'Потому что инертная масса (в F=ma) равна гравитационной (в законе тяготения). Это принцип эквивалентности Эйнштейна.'
        },

        { type: 'heading', level: 2, text: 'Интересные факты' },

        {
            type: 'list',
            items: [
                'Гравитация распространяется со скоростью света',
                'На Луне g ≈ 1.62 м/с² — в 6 раз меньше земного',
                'На Юпитере g ≈ 24.8 м/с² — вы бы весили в 2.5 раза больше',
                'Чёрные дыры — объекты, у которых вторая космическая скорость больше скорости света'
            ]
        },

        {
            type: 'quote',
            text: 'Если я видел дальше других, то потому, что стоял на плечах гигантов.',
            author: 'Исаак Ньютон'
        }
    ]
};
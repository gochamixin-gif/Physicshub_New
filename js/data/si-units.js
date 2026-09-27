// ============================================================
// СПРАВОЧНИК СИ — единицы измерения
// ============================================================

export const siData = {
    title: 'Международная система единиц (СИ)',
    shortTitle: 'СИ',
    description: 'Основные и производные единицы, приставки и переводы',

    // Основные единицы
    basicUnits: [
        { name: 'Длина',            symbol: 'l',  unit: 'метр',      short: 'м',    note: 'Эталон — путь света за 1/299792458 с' },
        { name: 'Масса',            symbol: 'm',  unit: 'килограмм', short: 'кг',   note: 'Эталон — цилиндр из Pt-Ir во Франции' },
        { name: 'Время',            symbol: 't',  unit: 'секунда',   short: 'с',    note: 'Эталон — 9 192 631 770 периодов Cs-133' },
        { name: 'Сила тока',        symbol: 'I',  unit: 'ампер',     short: 'А',    note: 'Определяется через заряд электрона' },
        { name: 'Температура',      symbol: 'T',  unit: 'кельвин',   short: 'К',    note: '0 K = −273,15 °C' },
        { name: 'Кол-во вещества',  symbol: 'ν',  unit: 'моль',      short: 'моль', note: '6,022·10²³ частиц' },
        { name: 'Сила света',       symbol: 'J',  unit: 'кандела',   short: 'кд',   note: 'Сила света источника' }
    ],

    // Производные единицы
    derivedUnits: [
        { name: 'Площадь',           symbol: 'S',  unit: 'квадратный метр',  short: 'м²',    formula: 'м · м' },
        { name: 'Объём',             symbol: 'V',  unit: 'кубический метр',  short: 'м³',    formula: 'м · м · м' },
        { name: 'Скорость',          symbol: 'v',  unit: 'метр в секунду',   short: 'м/с',   formula: 'м / с' },
        { name: 'Ускорение',         symbol: 'a',  unit: 'метр на сек²',     short: 'м/с²',  formula: 'м/с / с' },
        { name: 'Сила',              symbol: 'F',  unit: 'ньютон',           short: 'Н',     formula: 'кг · м/с²' },
        { name: 'Давление',          symbol: 'p',  unit: 'паскаль',          short: 'Па',    formula: 'Н / м²' },
        { name: 'Работа, энергия',   symbol: 'A, E', unit: 'джоуль',         short: 'Дж',    formula: 'Н · м' },
        { name: 'Мощность',          symbol: 'P',  unit: 'ватт',             short: 'Вт',    formula: 'Дж / с' },
        { name: 'Плотность',         symbol: 'ρ',  unit: 'кг на м³',         short: 'кг/м³', formula: 'кг / м³' },
        { name: 'Частота',           symbol: 'ν',  unit: 'герц',             short: 'Гц',    formula: '1 / с' },
        { name: 'Кол-во теплоты',    symbol: 'Q',  unit: 'джоуль',           short: 'Дж',    formula: '—' },
        { name: 'Уд. теплоёмкость',  symbol: 'c',  unit: 'Дж на кг·°C',      short: 'Дж/(кг·°C)', formula: 'Дж / (кг · °C)' }
    ],

    // Приставки СИ
    prefixes: [
        { name: 'тера',  symbol: 'Т',  factor: '10¹²',  value: '1 000 000 000 000' },
        { name: 'гига',  symbol: 'Г',  factor: '10⁹',   value: '1 000 000 000' },
        { name: 'мега',  symbol: 'М',  factor: '10⁶',   value: '1 000 000' },
        { name: 'кило',  symbol: 'к',  factor: '10³',   value: '1 000' },
        { name: 'гекто', symbol: 'г',  factor: '10²',   value: '100' },
        { name: 'деци',  symbol: 'д',  factor: '10⁻¹',  value: '0,1' },
        { name: 'санти', symbol: 'с',  factor: '10⁻²',  value: '0,01' },
        { name: 'милли', symbol: 'м',  factor: '10⁻³',  value: '0,001' },
        { name: 'микро', symbol: 'мк', factor: '10⁻⁶',  value: '0,000 001' },
        { name: 'нано',  symbol: 'н',  factor: '10⁻⁹',  value: '0,000 000 001' },
        { name: 'пико',  symbol: 'п',  factor: '10⁻¹²', value: '0,000 000 000 001' }
    ],

    // Полезные переводы
    conversions: [
        { from: '1 км/ч',      to: '0,278 м/с',       note: 'разделить на 3,6' },
        { from: '1 м/с',       to: '3,6 км/ч',        note: 'умножить на 3,6' },
        { from: '1 л',         to: '0,001 м³ = 1 дм³', note: 'литр = кубический дециметр' },
        { from: '1 г/см³',     to: '1000 кг/м³',      note: 'плотность' },
        { from: '1 кПа',       to: '1000 Па',         note: 'давление' },
        { from: '1 ч',         to: '3600 с',          note: 'время' },
        { from: '1 мин',       to: '60 с',            note: 'время' },
        { from: '1 т',         to: '1000 кг',         note: 'масса' },
        { from: '1 ц',         to: '100 кг',          note: 'центнер' },
        { from: '1 мм рт. ст.', to: '≈ 133,3 Па',     note: 'атмосферное давление' }
    ]
};
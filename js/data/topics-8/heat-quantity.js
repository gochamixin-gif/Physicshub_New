export const heatQuantity = {
  id: 'heat-quantity',
  title: 'Количество теплоты. Единицы количества теплоты',
  desc: 'Что такое количество теплоты и как его измеряют.',
  keywords: ['количество теплоты', 'джоуль', 'калория', 'теплопередача', 'энергия'],
  category: 'Тепловые явления',
  grade: 8,
  order: 10,
  readTime: '5 мин',
  tags: ['теплота', 'энергия'],

  content: [
    {
      type: 'paragraph',
      text: '<strong>Количество теплоты</strong> (Q) — энергия, которую тело получает или отдаёт при теплопередаче.'
    },
    { type: 'heading', level: 2, text: 'Обозначение и единицы' },
    {
      type: 'formula',
      source: '[Q] = 1 Дж (джоуль)',
      legend: [
        { symbol: 'Q', meaning: 'Количество теплоты', unit: 'Дж' }
      ]
    },
    {
      type: 'paragraph',
      text: 'Также используют <strong>калорию</strong>: 1 кал = 4,18 Дж. На продуктах пишут «ккал» — килокалории.'
    },
    { type: 'heading', level: 2, text: 'Формула для нагревания' },
    {
      type: 'formula',
      source: 'Q = c · m · Δt',
      legend: [
        { symbol: 'Q',   meaning: 'Количество теплоты',      unit: 'Дж' },
        { symbol: 'c',   meaning: 'Удельная теплоёмкость',   unit: 'Дж/(кг·°C)' },
        { symbol: 'm',   meaning: 'Масса тела',              unit: 'кг' },
        { symbol: 'Δt',  meaning: 'Изменение температуры',   unit: '°C' }
      ]
    },
    {
      type: 'note',
      kind: 'info',
      title: 'Что такое Δt',
      text: 'Δt = t_конечная − t_начальная. Нагрев — Δt > 0. Охлаждение — Δt < 0.'
    },
    { type: 'heading', level: 2, text: 'Примеры' },
    {
      type: 'example',
      task: 'Сколько теплоты нужно, чтобы нагреть 2 кг воды на 30 °C?',
      given: 'm = 2 кг\nΔt = 30 °C\nc = 4200 Дж/(кг·°C)',
      solution: 'Q = c · m · Δt = 4200 · 2 · 30',
      answer: 'Q = 252 000 Дж = 252 кДж'
    },
    { type: 'heading', level: 2, text: 'Тепловой баланс' },
    {
      type: 'paragraph',
      text: 'При смешивании горячей и холодной воды теплота, отданная горячей, равна теплоте, полученной холодной:'
    },
    {
      type: 'formula',
      source: 'Q_отданное = Q_полученное',
      legend: [
        { symbol: 'Q_отд', meaning: 'Теплота от горячего тела',  unit: 'Дж' },
        { symbol: 'Q_пол', meaning: 'Теплота для холодного тела', unit: 'Дж' }
      ]
    },
    {
      type: 'quote',
      text: 'Теплота никогда не исчезает — она только переходит от одних тел к другим.',
      author: 'Из термодинамики'
    }
  ]
};

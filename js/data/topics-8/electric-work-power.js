export const electricWorkPower = {
  id: 'electric-work-power',
  title: 'Работа и мощность электрического тока',
  desc: 'Как рассчитать работу и мощность тока в цепи.',
  keywords: ['работа тока', 'мощность тока', 'ватт', 'киловатт-час', 'энергия'],
  category: 'Электрические явления',
  grade: 8,
  order: 46,
  readTime: '6 мин',
  tags: ['электричество', 'энергия'],

  content: [
    {
      type: 'paragraph',
      text: 'Электрический ток <strong>совершает работу</strong> — нагревает, светит, двигает. Работу и мощность тока можно рассчитать.'
    },

    { type: 'heading', level: 2, text: 'Работа тока' },

    {
      type: 'formula',
      source: 'A = U · I · t',
      legend: [
        { symbol: 'A', meaning: 'Работа тока', unit: 'Дж' },
        { symbol: 'U', meaning: 'Напряжение',  unit: 'В' },
        { symbol: 'I', meaning: 'Сила тока',    unit: 'А' },
        { symbol: 't', meaning: 'Время',        unit: 'с' }
      ]
    },

    {
      type: 'note',
      kind: 'info',
      title: 'Откуда формула',
      text: 'Работа A = U·q. Так как q = I·t, получаем A = U·I·t.'
    },

    { type: 'heading', level: 2, text: 'Мощность тока' },

    {
      type: 'formula',
      source: 'P = U · I',
      legend: [
        { symbol: 'P', meaning: 'Мощность', unit: 'Вт' },
        { symbol: 'U', meaning: 'Напряжение', unit: 'В' },
        { symbol: 'I', meaning: 'Сила тока', unit: 'А' }
      ]
    },

    { type: 'heading', level: 2, text: 'Через закон Ома' },

    {
      type: 'list',
      items: [
        '<strong>P = U · I</strong> — основная',
        '<strong>P = I² · R</strong> — через ток и сопротивление',
        '<strong>P = U² / R</strong> — через напряжение и сопротивление'
      ]
    },

    { type: 'heading', level: 2, text: 'Единицы энергии' },

    {
      type: 'list',
      items: [
        '<strong>1 Дж = 1 Вт · с</strong> — основная единица',
        '<strong>1 кВт·ч</strong> = 3 600 000 Дж — бытовая единица',
        '<strong>Счётчик</strong> считает в кВт·ч'
      ]
    },

    {
      type: 'note',
      kind: 'success',
      title: 'Что такое 1 кВт·ч',
      text: 'Работа прибора мощностью 1000 Вт за 1 час. Так измеряют потребление электроэнергии в быту.'
    },

    { type: 'heading', level: 2, text: 'Мощности бытовых приборов' },

    {
      type: 'table',
      caption: 'Мощность приборов',
      headers: ['Прибор', 'Мощность, Вт'],
      rows: [
        ['LED-лампа',        '10'],
        ['Лампа накаливания','60'],
        ['Ноутбук',          '50–100'],
        ['Телевизор',        '100–200'],
        ['Холодильник',      '150'],
        ['Стиральная машина','2000'],
        ['Электрочайник',    '2000'],
        ['Утюг',             '1800'],
        ['Электроплита',     '3000–6000'],
        ['Кондиционер',      '1500–3000']
      ]
    },

    {
      type: 'example',
      task: 'Найти работу тока в лампе за 30 минут. U = 220 В, I = 0,5 А.',
      given: 'U = 220 В\nI = 0,5 А\nt = 1800 с',
      solution: 'A = U · I · t = 220 · 0,5 · 1800',
      answer: 'A = 198 000 Дж = 198 кДж'
    },

    {
      type: 'example',
      task: 'Какую мощность потребляет чайник при U = 220 В и I = 9 А?',
      given: 'U = 220 В\nI = 9 А',
      solution: 'P = U · I = 220 · 9',
      answer: 'P = 1980 Вт ≈ 2 кВт'
    },

    {
      type: 'note',
      kind: 'warn',
      title: 'Считай расход',
      text: 'Если чайник 2 кВт работает 15 минут, он потратит 0,5 кВт·ч. Умножь на тариф и узнаешь стоимость.'
    },

    {
      type: 'quote',
      text: 'Работа тока — это то, за что мы платим в квитанции ЖКХ.',
      author: 'Из быта'
    }
  ]
};

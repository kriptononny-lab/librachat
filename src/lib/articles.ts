// ── Типы ──────────────────────────────────────────
export type ArticleType = "кейс" | "статья" | "гайд" | "новость";

export interface ArticleCard {
  slug: string;
  type: ArticleType;
  title: string;
  excerpt: string;
  author: string;
  authorRole?: string;
  photo?: string; // путь к фото /public/...
  photoPos?: string; // objectPosition для обложки кейса
  readTime: number;
  views: string;
  tags: string[];
  featured?: boolean;
  gradient?: string;
}

// ── Цвет бейджа по типу ──────────────────────────
export const TYPE_COLOR: Record<
  ArticleType,
  { bg: string; text: string; border: string }
> = {
  кейс: {
    bg: "rgba(167,139,250,0.15)",
    text: "#C4B5FD",
    border: "rgba(167,139,250,0.3)",
  },
  статья: {
    bg: "rgba(167,139,250,0.15)",
    text: "#C4B5FD",
    border: "rgba(167,139,250,0.3)",
  },
  гайд: {
    bg: "rgba(167,139,250,0.15)",
    text: "#C4B5FD",
    border: "rgba(167,139,250,0.3)",
  },
  новость: {
    bg: "rgba(245,166,35,0.15)",
    text: "#A78BFA",
    border: "rgba(245,166,35,0.3)",
  },
};

// ── Моковые статьи ────────────────────────────────
export const ARTICLES: ArticleCard[] = [
  {
    slug: "techstart-3-chasa",
    type: "кейс",
    title: "TechStart: экономия 3 часа в день — полный разбор внедрения",
    excerpt:
      "Как команда из 47 человек интегрировала LibraChat в рабочие процессы и автоматизировала рутину.",
    author: "Алексей",
    readTime: 8,
    views: "3.2K",
    tags: ["кейс", "бизнес", "команды"],
    featured: true,
    gradient: "linear-gradient(135deg,rgba(167,139,250,0.3),rgba(123,47,190,0.1))",
  },
  {
    slug: "50-promptov-dlya-raboty",
    type: "гайд",
    title: "50 промптов для работы: от написания писем до анализа данных",
    excerpt:
      "Готовые шаблоны для самых частых рабочих задач. Просто скопируйте, замените, отправьте.",
    author: "Мария",
    readTime: 12,
    views: "100K",
    tags: ["промпты", "продуктивность"],
    featured: true,
    gradient: "linear-gradient(135deg,rgba(167,139,250,0.2),rgba(16,185,129,0.05))",
  },
  {
    slug: "retailpro-snizhenie-nagruzki",
    type: "кейс",
    title: "RetailPro: снижение нагрузки на службу поддержки на 40%",
    excerpt:
      "Как интернет-магазин с 500 менеджерами автоматизировал ответы на типовые вопросы.",
    author: "Алексей",
    readTime: 6,
    views: "500",
    tags: ["кейс", "поддержка", "автоматизация"],
  },
  {
    slug: "5-metrik-posle-vnedreniya",
    type: "статья",
    title: "5 метрик которые стоит отслеживать после внедрения ИИ",
    excerpt:
      "Какие показатели действительно покажут, приносит ли LibraChat пользу вашей команде.",
    author: "Мария",
    readTime: 5,
    views: "1.1K",
    tags: ["аналитика", "метрики", "бизнес"],
  },
  {
    slug: "kak-napisat-prompt",
    type: "гайд",
    title: "Как написать промпт: полное руководство для начинающих",
    excerpt:
      "От простых вопросов до сложных инструкций — освойте искусство общения с ИИ за один вечер.",
    author: "Мария",
    readTime: 10,
    views: "8K",
    tags: ["промпты", "гайд", "начинающим"],
  },
  {
    slug: "medcenter-avtomatizatsiya",
    type: "кейс",
    title: "MedCenter: автоматизация документооборота и клиенты",
    excerpt: "Медицинский центр сократил время на оформление документов с 40 минут до 5.",
    author: "Алексей",
    readTime: 7,
    views: "500",
    tags: ["кейс", "медицина", "документы"],
  },
  {
    slug: "librachat-vs-chatgpt",
    type: "статья",
    title: "LibraChat vs ChatGPT: честное сравнение для бизнеса",
    excerpt:
      "Тест на 30 задачах: скорость, качество ответов, работа с русским языком, стоимость.",
    author: "Алексей",
    readTime: 9,
    views: "500",
    tags: ["сравнение", "ChatGPT", "обзор"],
  },
  {
    slug: "10-sposobov-ispolzovat",
    type: "гайд",
    title: "10 способов использовать LibraChat в HR и рекрутинге",
    excerpt:
      "Шаблоны вакансий, автоматическая оценка резюме, подготовка к интервью — всё в одном гайде.",
    author: "Мария",
    readTime: 8,
    views: "2.5K",
    tags: ["HR", "рекрутинг", "гайд"],
  },
  {
    slug: "startap-devflow",
    type: "кейс",
    title: "Стартап DevFlow: от идеи до MVP за 3 недели с LibraChat",
    excerpt:
      "Основатель-одиночка рассказывает как использовал ИИ для разработки, маркетинга и продаж одновременно.",
    author: "Алексей",
    readTime: 11,
    views: "500",
    tags: ["стартап", "разработка", "MVP"],
  },
  {
    slug: "ii-assistent-v-smartfone",
    type: "новость",
    title: "ИИ-ассистент в смартфоне: как изменилась работа за месяц",
    excerpt:
      "Личный эксперимент: неделя без ноутбука, только телефон и LibraChat. Что получилось?",
    author: "Мария",
    readTime: 6,
    views: "500",
    tags: ["мобильное", "эксперимент", "продуктивность"],
  },
];

export const FEATURED = ARTICLES.filter((a) => a.featured);

// Добавляем реальные кейсы в общий список
export const ALL_ARTICLES = [
  {
    slug: "keys-shishakova",
    type: "кейс" as ArticleType,
    title: "Либрачат забрал на себя огромный объём «операционки»",
    excerpt:
      "Как LibraChat стал «единым окном» для управления маркетингом малого бизнеса.",
    author: "Юлия Шишакова",
    authorRole: "ИП, Магазин отделочных материалов из дерева",
    photo: "/case-shishakova.jpg",
    photoPos: "center 40%",
    readTime: 6,
    views: "1.2K",
    tags: ["кейс", "малый бизнес", "маркетинг"],
    featured: true,
    gradient: "linear-gradient(135deg,rgba(167,139,250,0.25),rgba(167,139,250,0.1))",
  },
  {
    slug: "keys-ozherelyev",
    type: "кейс" as ArticleType,
    title: "Как вывести товары на маркетплейсы в 5 раз быстрее с ИИ",
    excerpt: "Адаптация трендовых товаров с Amazon на WB/Ozon — без ручной рутины.",
    author: "Василий Ожерельев",
    authorRole: "Компания «Вуди», e-commerce",
    photo: "/case-ozherelyev.jpg",
    photoPos: "center 15%",
    readTime: 7,
    views: "2.3K",
    tags: ["кейс", "e-commerce", "маркетплейсы"],
    featured: true,
    gradient: "linear-gradient(135deg,rgba(167,139,250,0.2),rgba(167,139,250,0.1))",
  },
  {
    slug: "keys-bazarkulova",
    type: "кейс" as ArticleType,
    title: "LibraChat как «гоночный болид» для маркетинговых стратегий",
    excerpt:
      "Профессиональная рабочая среда для ведения 10+ клиентских проектов без хаоса.",
    author: "Марианна Базаркулова",
    authorRole: "Профессиональный маркетолог",
    photo: "/case-bazarkulova.jpg",
    photoPos: "center 20%",
    readTime: 5,
    views: "1.8K",
    tags: ["кейс", "маркетинг", "аналитика"],
    featured: true,
    gradient: "linear-gradient(135deg,rgba(167,139,250,0.25),rgba(167,139,250,0.1))",
  },
  ...ARTICLES,
];

export const ALL_TAGS = [
  "Все",
  "Статьи",
  "Кейсы",
  "Гайды",
  "Для бизнеса",
  "Продуктивность",
  "ИИ-инструменты",
];

// ── Реальные кейсы из PDF ─────────────────────────
export interface ArticleFull extends ArticleCard {
  content?: string; // Полный текст кейса (markdown-like HTML строки)
  results?: { label: string; value: string }[];
  quote?: { text: string; author: string; role: string };
}

export const ARTICLES_FULL: Record<string, ArticleFull> = {
  "keys-shishakova": {
    slug: "keys-shishakova",
    type: "кейс",
    title: "Либрачат забрал на себя огромный объём «операционки» при нехватке времени",
    excerpt:
      "ИП Шишакова Юлия Г., Магазин отделочных материалов из дерева — как LibraChat стал «единым окном» для управления маркетингом малого бизнеса.",
    author: "Юлия Шишакова",
    readTime: 6,
    views: "1.2K",
    tags: ["кейс", "малый бизнес", "маркетинг", "e-commerce"],
    featured: true,
    gradient: "linear-gradient(135deg,rgba(167,139,250,0.25),rgba(167,139,250,0.1))",
    results: [
      { label: "Задач в месяц", value: "20+" },
      { label: "Экономия времени", value: "80%" },
      { label: "Тестировщик №", value: "1-й" },
    ],
    quote: {
      text: "LibraChat — это не просто чат-бот, это напарник, который понимает задачи реального бизнеса. Он помог мне взглянуть на мой магазин со стороны и внедрить практики, о которых я раньше только читала.",
      author: "Юлия Шишакова",
      role: "ИП, Магазин отделочных материалов из дерева",
    },
  },
  "keys-ozherelyev": {
    slug: "keys-ozherelyev",
    type: "кейс",
    title: "Как вывести товары на маркетплейсы в 5 раз быстрее с помощью ИИ",
    excerpt:
      "Ожерельев Василий Сергеевич, компания «Вуди» — поиск и адаптация трендовых товаров с Amazon на российские маркетплейсы в разы быстрее.",
    author: "Василий Ожерельев",
    readTime: 7,
    views: "2.3K",
    tags: ["кейс", "e-commerce", "маркетплейсы", "WB", "Ozon"],
    featured: true,
    gradient: "linear-gradient(135deg,rgba(167,139,250,0.2),rgba(167,139,250,0.1))",
    results: [
      { label: "Быстрее запуск товара", value: "5×" },
      { label: "Снижение ДРР", value: "−30%" },
      { label: "Этапов автоматизировано", value: "4 из 4" },
    ],
    quote: {
      text: "С LibraChat мы перестали гадать, «зайдёт» товар или нет. Я просто даю ему данные, а он выдаёт готовую стратегию: от SEO-описания до рекламных связок. Это освободило мне руки для главного — масштабирования бизнеса.",
      author: "Василий Ожерельев",
      role: "Компания «Вуди», e-commerce",
    },
  },
  "keys-bazarkulova": {
    slug: "keys-bazarkulova",
    type: "кейс",
    title: "LibraChat как «гоночный болид» для маркетинговых стратегий и Big Data",
    excerpt:
      "Марианна Базаркулова, профессиональный маркетолог — как LibraChat стал профессиональной рабочей средой для ведения нескольких клиентских проектов.",
    author: "Марианна Базаркулова",
    readTime: 5,
    views: "1.8K",
    tags: ["кейс", "маркетинг", "аналитика", "Big Data"],
    featured: true,
    gradient: "linear-gradient(135deg,rgba(167,139,250,0.25),rgba(167,139,250,0.1))",
    results: [
      { label: "Клиентов в одном окне", value: "10+" },
      { label: "Переделок и правок", value: "0" },
      { label: "Работа без VPN", value: "100%" },
    ],
    quote: {
      text: "Либрачат — это первый сервис, который не врёт, особо не тупит и помнит всё о моих клиентах благодаря разделению на проекты. Это теперь мой главный инструмент для аналитики и стратегий.",
      author: "Марианна Базаркулова",
      role: "Профессиональный маркетолог",
    },
  },
};

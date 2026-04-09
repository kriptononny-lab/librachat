# Librachat — Публичный сайт

Публичный маркетинговый сайт ИИ-сервиса Librachat.

## Технологический стек

| Категория | Технология |
|-----------|-----------|
| Фреймворк | Next.js 15 (App Router) |
| UI | React 19 + TypeScript 5 |
| Стили | Tailwind CSS 4 |
| Компоненты | shadcn/ui (Radix UI) |
| Анимации | Motion (Framer Motion) |
| Формы | React Hook Form + Zod |
| Данные | TanStack Query |
| CMS | Strapi 5 (Headless) |
| i18n | next-intl (RU / EN) |
| Деплой | Vercel |

## Структура проекта

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Корневой layout (метаданные, шрифты)
│   ├── page.tsx            # Главная страница
│   ├── not-found.tsx       # 404
│   ├── error.tsx           # Error boundary
│   ├── loading.tsx         # Loading skeleton
│   └── api/                # API routes
│       ├── contact/        # Форма обратной связи
│       └── revalidate/     # ISR webhook от Strapi
├── components/
│   ├── ui/                 # Базовые компоненты (Button, Typography, Container)
│   ├── layout/             # Шапка, подвал, навигация
│   ├── sections/           # Секции страниц (Hero, Features, Pricing...)
│   └── chat/               # Компоненты чат-интерфейса
├── hooks/                  # Кастомные React-хуки
├── lib/                    # Утилиты, клиенты API, константы
├── messages/               # Переводы (ru.json, en.json)
├── types/                  # TypeScript-типы
├── styles/                 # Глобальные стили (globals.css)
└── i18n/                   # Конфигурация next-intl
```

## Быстрый старт

```bash
# 1. Установить зависимости
npm install

# 2. Скопировать переменные окружения
cp .env.example .env.local
# Заполнить .env.local нужными значениями

# 3. Запустить dev-сервер
npm run dev
# → http://localhost:3000
```

## Доступные команды

```bash
npm run dev          # Запуск dev-сервера (Turbopack)
npm run build        # Production сборка
npm run start        # Запуск production сервера
npm run lint         # Проверка ESLint
npm run format       # Форматирование Prettier
npm run format:check # Проверка форматирования
```

## Этапы разработки

- [x] **Шаг 1** — Инициализация проекта, структура, конфигурация
- [ ] **Шаг 2** — Дизайн-система: компоненты Button, Typography, Cards
- [ ] **Шаг 3** — Шапка и подвал сайта
- [ ] **Шаг 4** — Главная страница
- [ ] **Шаг 5** — Страница тарифов
- [ ] **Шаг 6** — Остальные страницы (Возможности, Бизнес, Скачать, Статьи)
- [ ] **Шаг 7** — Подключение CMS, SEO, аналитика, деплой

## Переменные окружения

| Переменная | Описание |
|-----------|---------|
| `NEXT_PUBLIC_SITE_URL` | URL сайта |
| `NEXT_PUBLIC_STRAPI_URL` | URL Strapi CMS |
| `STRAPI_API_TOKEN` | API-токен Strapi |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 ID |
| `NEXT_PUBLIC_YM_COUNTER_ID` | Яндекс.Метрика ID |
| `RESEND_API_KEY` | Ключ для email-сервиса |
| `CONTACT_EMAIL` | Email для получения заявок |
| `REVALIDATION_SECRET` | Секрет для ISR-вебхука |

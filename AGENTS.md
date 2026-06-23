<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# GP Avto Lab — сайт испытательных автолабораторий КР

## О проекте
Официальный сайт государственных испытательных автолабораторий Кыргызской Республики.
Заказчик: ГП «Институт допуска к дорожному движению» при ГЦ по регистрации ТС и ВС.

## Стек
- **Фреймворк:** Next.js 16 (App Router, Turbopack)
- **Язык:** TypeScript
- **Стили:** Tailwind CSS v4 (сборка через CLI: `pnpm css`)
- **UI:** shadcn/ui v4 + base-ui + lucide-react
- **i18n:** next-intl (3 языка: kg, ru, en) — локаль по умолчанию `kg`
- **Анимации:** framer-motion
- **Карты:** 2GIS MapGL (@2gis/mapgl)
- **БД:** SQLite (better-sqlite3)
- **Админка:** кастомная на Next.js API routes + SQLite
- **Формы:** react-hook-form + zod (пока не используется)
- **Темы:** next-themes (светлая/тёмная)

## Архитектура
```
src/
├── app/
│   ├── layout.tsx          # Корневой layout (<html>, <body>)
│   ├── globals.css         # Импортирует tailwind-built.css
│   ├── tailwind-source.css # Исходник для Tailwind CLI
│   ├── tailwind-built.css  # Собранный CSS (112KB, авто-генерируется)
│   ├── [locale]/           # Локализованные страницы
│   │   ├── layout.tsx      # ThemeProvider + next-intl + Header/Footer
│   │   └── page.tsx        # Главная страница
│   └── admin/              # Админ-панель (вне [locale], не конфликтует с i18n)
│       ├── page.tsx        # Дашборд
│       ├── login/page.tsx  # Страница входа
│       └── api/[...slug]/route.ts  # API: GET/POST/PATCH/DELETE
├── components/
│   ├── layout/             # Container, Section, Header, Footer
│   ├── sections/           # Hero, Services, News, Documents, Pricing, Labs, Map, Contacts
│   ├── shared/             # LanguageSwitcher, ThemeToggle, ThemeProvider
│   └── ui/                 # shadcn/ui компоненты
├── lib/
│   ├── db/index.ts         # SQLite: таблицы users/news/documents/services/faq/feedback
│   ├── routing.ts          # next-intl настройка маршрутов
│   ├── i18n.ts             # next-intl загрузка сообщений
│   └── utils.ts            # cn() утилита
├── proxy.ts                # middleware для next-intl (Next.js 16)
└── messages/               # kg.json, ru.json, en.json
```

## Ключевые особенности настройки (Windows)
- **CSS:** Tailwind CLI вместо Turbopack PostCSS (баг с `nul` device на Windows)
  - `pnpm css` — разовая сборка
  - `pnpm css:watch` — автосборка при изменениях
- **Proxy:** `src/proxy.ts` (не middleware.ts!) — Next.js 16 депрекейтил middleware
- **Маппинг локалей:** `/(kg|ru|en)/:path*` — админка `/admin/*` вне матчера

## Доступы
- **Сайт:** http://localhost:3000
- **Админка:** http://localhost:3000/admin
- **Логин:** admin / admin123

## Конвенции
- Ответы агенту — на русском
- Коммиты: conventional commits (feat:/fix:/refactor:/docs:/chore:)
- Именование веток: main (не master)
- Ключи в .env.local, не в коде
- Все новые страницы — в `[locale]` с i18n-ключами

## Что сделано (Фазы 1-4)
- [x] Фаза 1: Дизайн-система (Container, Section, тема, LanguageSwitcher, ThemeToggle)
- [x] Фаза 2: Главная страница (8 секций: Hero, Услуги, Новости, Документы, Цены, Лабы, Карта 2ГИС, Контакты)
- [x] Фаза 4: Админ-панель (SQLite + API + UI)
- [ ] Фаза 3: Страницы разделов (пропущена)
- [ ] Фаза 5: Мультиязычность (переводы неполные)
- [ ] Фаза 6: SEO, карта сайта
- [ ] Фаза 7: Безопасность, Turnstile
- [ ] Фаза 8: Тестирование

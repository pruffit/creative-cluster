# 🎨 Creative Cluster

> Творческое пространство: Йога • Чай • Музыка • Искусство

Монорепозиторий для управления творческим кластером в Самаре, включающий интернет-магазин чая, систему бронирования йога-классов, медиа-платформу и многое другое.

## 🚀 Быстрый старт

```bash
# 1. Клонируйте репозиторий
git clone https://github.com/your-username/creative-cluster.git
cd creative-cluster

# 2. Установите зависимости
pnpm install

# 3. Настройте окружение
cp apps/backend/.env.example apps/backend/.env
cp apps/frontend/.env.example apps/frontend/.env.local

# 4. Запустите базы данных
pnpm docker:dev

# 5. Инициализируйте БД
cd apps/backend
pnpm prisma:generate
pnpm prisma:migrate
pnpm prisma:seed
cd ../..

# 6. Запустите приложение
pnpm dev:all
```

📖 **Полная инструкция**: [docs/SETUP.md](docs/SETUP.md)

## 🛠️ Технологический стек

### Frontend
- **React 19** + TypeScript
- **Vite** - сборщик
- **Tailwind CSS v4** - стилизация
- **Zustand** - state management
- **TanStack Query** - серверное состояние
- **React Router v7** - роутинг
- **i18next** - локализация (RU/EN)
- **Framer Motion** - анимации

### Backend
- **Node.js** + **Express** + TypeScript
- **Prisma ORM** - работа с БД
- **PostgreSQL** - основная база данных
- **Redis** - кеширование и сессии
- **JWT** - аутентификация
- **Zod** - валидация
- **Helmet** - безопасность

### Infrastructure
- **Docker** + **Docker Compose**
- **pnpm workspaces** - монорепозиторий
- **GitHub Actions** - CI/CD

## 📁 Структура проекта

```
creative-cluster/
├── apps/
│   ├── frontend/          # React приложение (FSD)
│   │   ├── src/
│   │   │   ├── app/       # Инициализация, провайдеры, роутинг
│   │   │   ├── pages/     # Страницы приложения
│   │   │   ├── widgets/   # Композитные блоки (Header, Footer)
│   │   │   ├── features/  # Бизнес-функции
│   │   │   ├── entities/  # Бизнес-сущности
│   │   │   └── shared/    # UI Kit, утилиты, конфиги
│   │   └── ...
│   └── backend/           # Node.js API
│       ├── src/
│       │   ├── common/    # Middleware, утилиты
│       │   ├── modules/   # Бизнес-модули
│       │   └── main.ts
│       └── prisma/
├── infrastructure/
│   └── docker/
├── docs/
└── .vscode/               # VSCode конфигурация
```

## 📜 Доступные команды

```bash
# Разработка
pnpm dev:all              # Frontend + Backend
pnpm dev:frontend         # Только frontend
pnpm dev:backend          # Только backend

# Сборка
pnpm build                # Собрать всё
pnpm build:frontend
pnpm build:backend

# Линтинг и форматирование
pnpm lint                 # Проверить код
pnpm lint:fix             # Исправить ошибки
pnpm format               # Prettier

# База данных
cd apps/backend
pnpm prisma:generate      # Сгенерировать Prisma Client
pnpm prisma:migrate       # Миграции
pnpm prisma:seed          # Тестовые данные
pnpm prisma:studio        # GUI для БД

# Docker
pnpm docker:dev           # PostgreSQL + Redis
pnpm docker:down          # Остановить

# Очистка
pnpm clean                # Удалить build и node_modules
```

## 🎯 Roadmap

### ✅ Phase 1 - MVP (В разработке)
- [x] Монорепозиторий + Infrastructure
- [x] UI Kit + Design System
- [x] Темная/светлая тема
- [x] Локализация RU/EN
- [x] Базовая аутентификация
- [ ] Йога: расписание и бронирование
- [ ] Магазин чая: каталог и корзина

### 🔜 Phase 2
- Система абонементов
- Платежи (Stripe/ЮKassa)
- Личный кабинет
- Админ-панель

### 📅 Phase 3
- Медиа-платформа
- Фотогалерея
- Обучающие курсы
- Мобильное приложение

## 🏗️ Архитектура

- **Frontend**: Feature-Sliced Design (FSD)
- **Backend**: Модульная архитектура
- **Стили**: Utility-first CSS (Tailwind)
- **Типизация**: Strict TypeScript везде

📚 Подробнее: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)

## 🤝 Контрибуция

Мы открыты для вклада! См. [CONTRIBUTING.md](CONTRIBUTING.md)

1. Форкните репозиторий
2. Создайте feature-ветку (`git checkout -b feature/AmazingFeature`)
3. Коммитьте изменения (`git commit -m 'feat: add AmazingFeature'`)
4. Пушьте в ветку (`git push origin feature/AmazingFeature`)
5. Откройте Pull Request

## 📄 Лицензия

MIT License - см. [LICENSE](LICENSE)

## 📞 Контакты

- **Email**: kotlaevdanil@gmail.com
- **Telegram**: @userpruffit
- **Instagram**: @pruffit

---

Создано с ❤️ в Самаре, Россия 🇷🇺

**Creative Cluster © 2025**
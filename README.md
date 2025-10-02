# 🎨 Creative Cluster

> Творческое пространство: Йога • Чай • Музыка • Искусство

Монорепозиторий для управления творческим кластером в Самаре, включающий интернет-магазин чая, систему бронирования йога-классов, медиа-платформу и многое другое.

## 🚀 Технологический стек

### Frontend
- **React 18** + TypeScript
- **Vite** - сборщик
- **Tailwind CSS** - стилизация
- **Zustand** - state management
- **TanStack Query** - серверное состояние
- **React Router** - роутинг
- **i18next** - локализация (RU/EN)
- **Framer Motion** - анимации

### Backend
- **Node.js** + **Express** + TypeScript
- **Prisma ORM** - работа с БД
- **PostgreSQL** - основная база данных
- **Redis** - кеширование и сессии
- **JWT** - аутентификация
- **Zod** - валидация

### Infrastructure
- **Docker** + **Docker Compose**
- **Kubernetes** (для production)
- **pnpm** - монорепозиторий
- **GitHub Actions** - CI/CD

## 📁 Структура проекта
creative-cluster/
├── apps/
│   ├── frontend/          # React приложение
│   └── backend/           # Node.js API
├── packages/
│   ├── shared-types/      # Общие TypeScript типы
│   └── eslint-config/     # Общие конфиги ESLint
├── infrastructure/
│   ├── docker/            # Docker конфигурация
│   ├── kubernetes/        # K8s манифесты
│   └── nginx/             # Nginx конфиги
└── docs/                  # Документация

## 🛠️ Установка и запуск

### Требования

- **Node.js** >= 18.0.0
- **pnpm** >= 8.0.0
- **Docker Desktop** (для БД)

### Установка
```bash
# Клонируйте репозиторий
git clone https://github.com/ваш-username/creative-cluster.git
cd creative-cluster

# Установите зависимости
pnpm install

# Скопируйте файлы окружения
cp apps/frontend/.env.example apps/frontend/.env.local
cp apps/backend/.env.example apps/backend/.env

# Запустите Docker с базами данных
pnpm docker:dev

# В новом терминале: инициализируйте БД
cd apps/backend
pnpm prisma:generate
pnpm prisma:migrate
cd ../..

# Запустите dev серверы
pnpm dev:all
```
### Доступные URL

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3000/api
- **Prisma Studio:** http://localhost:5555 (запустить: cd apps/backend && pnpm prisma:studio)

## 📜 Доступные команды
```bash
# Разработка
pnpm dev:all              # Запустить frontend + backend
pnpm dev:frontend         # Только frontend
pnpm dev:backend          # Только backend

# Сборка
pnpm build                # Собрать все приложения
pnpm build:frontend       # Только frontend
pnpm build:backend        # Только backend

# Тестирование
pnpm test                 # Запустить тесты во всех пакетах
pnpm test:watch           # Тесты в watch режиме

# Линтинг и форматирование
pnpm lint                 # Проверить код
pnpm lint:fix             # Исправить ошибки линтера
pnpm format               # Форматировать код (Prettier)

# База данных
pnpm prisma:generate      # Сгенерировать Prisma Client
pnpm prisma:migrate       # Применить миграции
pnpm prisma:studio        # Открыть Prisma Studio

# Docker
pnpm docker:dev           # Запустить PostgreSQL + Redis
pnpm docker:down          # Остановить контейнеры

# Очистка
pnpm clean                # Удалить node_modules и build файлы
```

## 🏗️ Архитектура Frontend (FSD)
### Проект использует Feature-Sliced Design архитектуру:
src/
├── app/           # Инициализация приложения
├── pages/         # Страницы приложения
├── widgets/       # Композитные блоки
├── features/      # Бизнес-функции
├── entities/      # Бизнес-сущности
└── shared/        # Переиспользуемый код

https://feature-sliced.design/

## 🎯 Roadmap

### MVP (Phase 1) ✅ В разработке
- Настройка монорепозитория
- Базовая инфраструктура (Docker, PostgreSQL, Redis)
- UI Kit компоненты
- Аутентификация и авторизация
- Йога: расписание и бронирование
- Магазин чая: каталог и корзина

### Phase 2 🔜 Скоро
- Система абонементов
- Платежи (интеграция с платежной системой)
- Личный кабинет пользователя
- Административная панель

### Phase 3 📅 В планах
- Медиа-платформа (аудио/видео плееры)
- Фотогалерея
- Обучающая платформа
- Геймификация
- Мобильное приложение

### 🌍 Локализация

### Приложение поддерживает:

- 🇷🇺 Русский (по умолчанию)
- en English

## 🎨 Дизайн-система

Цветовая палитра: Теплые, минималистичные оттенки
Темы: Светлая и тёмная
Типографика: Inter (основной), Crimson Pro (акценты)
Анимации: Плавные, ненавязчивые

## 🤝 Контрибьюция
Мы открыты для вклада в проект! См. CONTRIBUTING.md
Процесс разработки

Форкните репозиторий
Создайте feature ветку (git checkout -b feature/AmazingFeature)
Коммитьте изменения (git commit -m 'Add some AmazingFeature')
Пушьте в ветку (git push origin feature/AmazingFeature)
Откройте Pull Request

## 📄 Лицензия
MIT License. См. LICENSE

## 📞 Контакты

Email: kotlaevdanil@gmail.com
Telegram: @userpruffit
Instagram: @pruffit

## 💖 Команда
Создано с любовью в Самаре, Россия 🇷🇺

## Creative Cluster © 2025
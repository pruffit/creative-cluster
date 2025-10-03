# 🚀 Complete Setup Guide

## 📋 Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- Docker Desktop
- VSCode (рекомендуется)

## 1️⃣ Клонирование и установка

```bash
# Клонируйте репозиторий
git clone https://github.com/your-username/creative-cluster.git
cd creative-cluster

# Установите зависимости
pnpm install
```

## 2️⃣ Настройка окружения

```bash
# Backend
cp apps/backend/.env.example apps/backend/.env

# Frontend
cp apps/frontend/.env.example apps/frontend/.env.local

# Сгенерируйте JWT секреты
node -e "console.log('JWT_SECRET=' + require('crypto').randomBytes(64).toString('hex'))"
node -e "console.log('JWT_REFRESH_SECRET=' + require('crypto').randomBytes(64).toString('hex'))"

# Вставьте их в apps/backend/.env
```

## 3️⃣ Запуск базы данных

```bash
# Запустите PostgreSQL и Redis
pnpm docker:dev

# Проверьте, что контейнеры запущены
docker ps
```

## 4️⃣ Инициализация БД

```bash
cd apps/backend

# Сгенерируйте Prisma Client
pnpm prisma:generate

# Примените миграции
pnpm prisma:migrate

# Заполните тестовыми данными
pnpm prisma:seed

# Откройте Prisma Studio (опционально)
pnpm prisma:studio
```

## 5️⃣ Запуск приложения

```bash
# Вернитесь в корень
cd ../..

# Запустите всё сразу
pnpm dev:all

# Или по отдельности в разных терминалах:
pnpm dev:frontend  # Terminal 1
pnpm dev:backend   # Terminal 2
```

## 6️⃣ Проверка

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000/api
- Health check: http://localhost:3000/health
- Prisma Studio: http://localhost:5555

## 7️⃣ VSCode Extensions

Установите рекомендуемые расширения:

1. Откройте VSCode
2. Нажмите `Ctrl/Cmd + Shift + P`
3. Выберите "Extensions: Show Recommended Extensions"
4. Установите все

## 8️⃣ Тестовые учетные записи

После seed:

### Администратор
- Email: `admin@creativecluster.ru`
- Password: `admin123`

### Пользователь
- Email: `user@example.com`
- Password: `user123`

## 🔧 Troubleshooting

### Проблема: "Port 5432 already in use"
```bash
# Остановите локальный PostgreSQL
sudo systemctl stop postgresql  # Linux
brew services stop postgresql   # macOS
```

### Проблема: "Cannot connect to database"
```bash
# Проверьте статус Docker
docker ps
docker logs cc-postgres

# Пересоздайте контейнеры
docker-compose -f infrastructure/docker/docker-compose.dev.yml down -v
pnpm docker:dev
```

### Проблема: "Module not found"
```bash
# Очистите и переустановите
pnpm clean
pnpm install
```

## 📚 Следующие шаги

1. Прочитайте [CONTRIBUTING.md](../CONTRIBUTING.md)
2. Изучите [архитектуру](./ARCHITECTURE.md)
3. Начните разработку!
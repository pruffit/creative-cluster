# 🔐 Environment Variables Setup

## Генерация безопасных секретов

```bash
# Для JWT_SECRET и JWT_REFRESH_SECRET
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## Backend (.env)

```env
# Server Configuration
NODE_ENV=development
PORT=3000
HOST=0.0.0.0

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/creative_cluster

# Redis
REDIS_URL=redis://localhost:6379
REDIS_TTL=3600

# JWT Authentication (СГЕНЕРИРУЙТЕ НОВЫЕ!)
JWT_SECRET=your-generated-secret-here
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=your-generated-refresh-secret-here
JWT_REFRESH_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=http://localhost:5173

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_DIR=./uploads
```

## Frontend (.env.local)

```env
# API Configuration
VITE_API_URL=http://localhost:3000
VITE_API_TIMEOUT=30000

# App Configuration
VITE_APP_NAME=Creative Cluster
VITE_APP_URL=http://localhost:5173

# Features Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_SENTRY=false

# Storage
VITE_STORAGE_PREFIX=cc_
```

## Production Tips

1. **НЕ коммитьте .env файлы!**
2. Используйте менеджер секретов (AWS Secrets Manager, HashiCorp Vault)
3. Ротируйте JWT секреты каждые 90 дней
4. Используйте разные секреты для dev/staging/prod

## Проверка конфигурации

```bash
# Backend
cd apps/backend
node -e "require('dotenv').config(); console.log('✅ Env loaded:', Object.keys(process.env).filter(k => !k.startsWith('npm_')).length, 'variables')"

# Frontend
cd apps/frontend
cat .env.local | grep -v '^#' | grep -v '^$'
```
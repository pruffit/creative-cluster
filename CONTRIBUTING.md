# 🤝 Руководство по контрибуции

Спасибо за интерес к проекту Creative Cluster!

## 📋 Процесс разработки

### 1. Подготовка окружения

```bash
# Форкните репозиторий и клонируйте свой форк
git clone https://github.com/YOUR-USERNAME/creative-cluster.git
cd creative-cluster

# Добавьте upstream репозиторий
git remote add upstream https://github.com/ORIGINAL-OWNER/creative-cluster.git

# Установите зависимости
pnpm install
```

### 2. Создание новой фичи

```bash
# Обновите main ветку
git checkout main
git pull upstream main

# Создайте feature ветку
git checkout -b feature/your-feature-name
```

### 3. Разработка

- Следуйте существующему стилю кода
- Пишите осмысленные commit сообщения
- Добавляйте тесты для новой функциональности
- Обновляйте документацию при необходимости

### 4. Commit Guidelines

#### Используйте Conventional Commits:

- feat: добавить новую фичу
- fix: исправить баг
- docs: обновить документацию
- style: форматирование, отступы
- refactor: рефакторинг кода
- test: добавить тесты
- chore: обновление зависимостей

#### Примеры:

```bash
git commit -m "feat(yoga): добавить календарь бронирования"
git commit -m "fix(shop): исправить подсчёт корзины"
git commit -m "docs: обновить README с новыми командами"
```

### 5. Перед созданием PR

```bash
# Проверьте линтер
pnpm lint

# Исправьте ошибки
pnpm lint:fix

# Отформатируйте код
pnpm format

# Запустите тесты
pnpm test

# Проверьте что всё собирается
pnpm build
```

### 6. Создание Pull Request6. Создание Pull Request

1. Пушьте в свой форк:

```bash
git push origin feature/your-feature-name
```

2. Откройте PR на GitHub
3. Заполните template PR
4. Дождитесь review

### 🎨 Стандарты кода

#### TypeScript

Используйте строгий режим TypeScript
Избегайте any, используйте конкретные типы
Экспортируйте типы из модулей

#### React

Используйте функциональные компоненты
Следуйте правилам hooks
Мемоизируйте дорогие вычисления

#### Именование

Компоненты: PascalCase
Функции: camelCase
Константы: UPPER_SNAKE_CASE
Файлы: kebab-case или PascalCase для компонентов

#### 🧪 Тестирование

Покрывайте тестами новую функциональность
Используйте осмысленные названия тестов
Тестируйте edge cases

#### 📝 Документация

Обновляйте README при добавлении новых фич
Комментируйте сложную логику
Документируйте API endpoints

### ❓ Вопросы?

Создайте Issue или напишите в Telegram.

## Спасибо за вклад в проект! 🎉

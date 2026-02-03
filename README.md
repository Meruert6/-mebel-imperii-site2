# Мебель Империи — каталог кухонь

Каталог кухонь с заявками и админ‑панелью. Проект состоит из `frontend` (React/Vite) и `backend` (Node.js/Express + Prisma).

## Быстрый запуск локально

### Backend
1. Откройте папку `backend`
2. Создайте `.env` на базе `.env.example`
3. Установите зависимости и запустите миграции:
   - `npm install`
   - `npx prisma generate`
   - `npx prisma migrate dev`
4. Запуск сервера:
   - `npm run dev`

API будет доступен на `http://localhost:5000/api`.

### Frontend
1. Откройте папку `frontend`
2. Создайте `.env` на базе `.env.example`
3. Установите зависимости и запустите:
   - `npm install`
   - `npm run dev`

Сайт будет доступен на `http://localhost:5173`.

## Переменные окружения

### Backend (`backend/.env`)
- `PORT=5000`
- `DATABASE_URL="file:./dev.db"`
- `JWT_SECRET=your-secret-key-here`
- `ALLOW_ADMIN_REGISTER=true`
- `CORS_ORIGIN=http://localhost:5173`

### Frontend (`frontend/.env`)
- `VITE_API_URL=http://localhost:5000/api`

## Деплой (рекомендуемый вариант)

### Backend на Render
1. Создайте новый **Web Service** из репозитория
2. Build command:
   - `npm install && npx prisma generate && npx prisma migrate deploy`
3. Start command:
   - `npm start`
4. Добавьте переменные окружения:
   - `DATABASE_URL=file:/var/data/dev.db`
   - `JWT_SECRET=...`
   - `ALLOW_ADMIN_REGISTER=false` (после создания админа)
   - `CORS_ORIGIN=https://ВАШ-ДОМЕН`
5. Подключите **Persistent Disk** и укажите путь `/var/data`

### Frontend на Vercel
1. Импортируйте проект из репозитория
2. Root directory: `frontend`
3. Build command: `npm run build`
4. Output directory: `dist`
5. Переменная окружения:
   - `VITE_API_URL=https://URL-ВАШЕГО-BACKEND/api`

## SEO и домен

- Обновите домен в `frontend/public/sitemap.xml` и `frontend/public/robots.txt`
- Замените `og:image` в `frontend/index.html` и добавьте файл `frontend/public/og-image.png`
- Подключите домен в Vercel и укажите его в `CORS_ORIGIN`

## Структура проекта

- `frontend/` — клиентская часть (каталог, заявки, админка)
- `backend/` — API, авторизация админа, CRUD, заявки, загрузка изображений

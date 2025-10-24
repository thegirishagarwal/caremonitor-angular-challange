# Project Overview

This app demonstrates a typical Angular interview task:

- Login with email/password and cookie-based auth
- Route guards for authenticated and unauthenticated flows
- Dashboard showing logged-in user’s email and navigation
- Items list fetched from a mock API, with state management and loading/error states
- 404 page with a polished, responsive design

---

# Setup Instructions

- Prerequisites
  - Node.js 18+
  - npm 9+
  - Angular CLI: `npm i -g @angular/cli`

- Install
  - `npm install`

- Run (development)
  - `npm start`
  - App: `http://localhost:4200`

- Build
  - `npm run build` (output in `dist/`)

- Test
  - `npm test`

- Credentials (mock login)
  - Email: `test@example.com`
  - Password: `pass@123`

---

# Architecture & Approach

- Framework & Libraries
  - Angular 20 (standalone components)
  - RxJS 7
  - Angular Material (selective use)
  - Cookies via `ngx-cookie-service`
  - State via `@ngrx/signals` (Signal Store)

- Routing (`src/app/app.routes.ts`)
  - `''` → Shell (`src/app/layout/layout.routes.ts`), guarded by `authGuard`
  - `'login'` → `Login`, guarded by `loginGuard`
  - `'**'` → `Page404`

- Shell & Lazy Loading (`src/app/layout/layout.routes.ts`)
  - Redirects `''` → `'dashboard'`
  - Lazy loads `dashboard` and `items` features from `src/app/features/`

- Guards (`src/app/core/guards/`)
  - `authGuard`: Blocks access if cookie `token` is missing, redirects to `/login`
  - `loginGuard`: Prevents visiting `/login` if already authenticated, redirects to `/dashboard`

- Authentication (`src/app/core/services/auth.ts`)
  - Mock login validates static credentials, stores a base64 token in cookie `token`
  - `getLoggedInUser()` decodes token to show email on the Dashboard
  - `logout()` clears cookie

- HTTP & API
  - `ApiInterceptors` (`src/app/core/interceptors/api.interceptor.ts`) prefixes all requests with `environment.API_BASE_URL`
  - `ROUTES_CONFIG` (`src/app/core/routes/index.ts`) centralizes path fragments like `items`
  - `environment.ts` sets `API_BASE_URL` to a public mock backend

- Items Feature (`src/app/features/items/`)
  - `ItemService` calls `GET {API_BASE_URL}/items`
  - `ItemSearchStore` manages `items`, `isLoaded`, and `error` with `@ngrx/signals`
  - `ItemsList` renders list and handles loading/error states

- UI/Styling
  - Angular Material for forms/cards
  - Polished `Page404` with `routerLink` actions
  - Global styles in `src/styles/`

---

# API Endpoints (Mock)

- Login: handled locally by `Auth.login()` (replace with real `POST /api/login` as needed)
- Items: `GET {API_BASE_URL}/items`
  - Base URL: `src/environments/environment.ts`
  - Paths: `src/app/core/routes/index.ts`

---

# Switching to a Real Auth API

- Replace logic inside `Auth.login()` to call your backend (`POST /api/login`)
- Store the returned token in the cookie (`CookieService.set('token', token)`) 
- Optionally expand guards to handle token expiry/refresh

---

# Scripts Quick Reference

- `npm start` start dev server
- `npm run build` production build
- `npm run watch` dev build in watch mode
- `npm test` run unit tests

---

# Future Enhancements

- Replace mock login with backend API and JWT validation
- Add refresh token handling and automatic re-authentication
- Add E2E tests (Cypress) and improve unit test coverage
- Centralized error handling and retry/backoff for HTTP calls

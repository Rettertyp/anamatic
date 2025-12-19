# Copilot instructions (anamatic)

## Repo shape (Nx monorepo)
- Nx workspace with Angular frontend in `apps/anamatic/` and NestJS backend in `apps/api/`.
- Shared TS types live in `libs/api-interfaces/` (import via `@retter/api-interfaces`). Shared pure utils live in `libs/util/` (import via `@retter/util`). Path aliases are defined in `tsconfig.base.json`.

## How to run (local)
- Install: `yarn install` (Yarn 4 / Corepack).
- Dev (both): `yarn start` (runs frontend + backend concurrently; see `package.json`).
- Dev (one side): `yarn start:frontend` or `yarn start:backend`.
- Tests: `yarn test` (Nx run-many). Backend unit tests use Jest via Nx (`apps/api/jest.config.ts`), workspace Jest runs via `jest.config.ts`.

## Frontend ↔ backend contract
- The backend serves under the global prefix `/api` (see `apps/api/src/main.ts`).
- In dev, Angular proxies `/api` to `http://localhost:3000` (see `apps/anamatic/proxy.conf.json`).
- In prod, the Angular `ApiService` points at `https://anamatic.onrender.com/api/`, otherwise it uses the dev proxy (`/api/`) (see `apps/anamatic/src/app/services/api.service.ts`).
- Keep request/response DTOs in `libs/api-interfaces/` and use them from both sides.

## Backend architecture & conventions (NestJS)
- Module boundaries: `AuthModule`, `UserModule`, `WordModule`, `GameModule`, `CoreModule` are composed in `apps/api/src/app/app.module.ts`.
- Validation is enforced globally with `ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true })` (see `apps/api/src/main.ts`). When adding controllers/DTOs, decorate DTO fields with `class-validator` so requests pass validation.
- Auth patterns:
  - Access JWT is `Authorization: Bearer <token>` (`JwtStrategy` in `apps/api/src/app/auth/jwt.strategy.ts`).
  - Refresh JWT is stored in an httpOnly cookie named `studybuddy_session` (`REFRESH_COOKIE_NAME` in `apps/api/src/app/auth/auth.service.ts` and `JwtRefreshStrategy`).
- Word checking uses the external DWDS API (`https://www.dwds.de/api/`) inside `apps/api/src/app/word/word.service.ts`.

## Frontend patterns (Angular)
- Game flow is service-driven: `GameService.processInput()` -> `WordCheckerService.checkWord()` -> `ApiService.getWord()`; list state is managed in `WordListService` via RxJS subjects (see `apps/anamatic/src/app/services/`).
- `ApiService` sets `withCredentials` only when `StorageService.isLoggedIn()` is true; keep this behavior when adding auth’d endpoints.

## When changing code
- If you add or change an API response shape, update `libs/api-interfaces/` and adjust both the Nest controller/service and Angular service usage.
- Prefer using `@retter/util` helpers for shared logic (e.g., character checks) rather than duplicating code across app/api.

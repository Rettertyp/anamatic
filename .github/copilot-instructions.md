# Copilot instructions (anamatic)

## Repo shape (Nx monorepo)
- Nx workspace with **Angular standalone frontend** in `apps/anamatic/` and **NestJS backend** in `apps/api/`.
- Shared TS types in `libs/api-interfaces/` (import via `@retter/api-interfaces`). Shared pure utils in `libs/util/` (import via `@retter/util`). Path aliases defined in `tsconfig.base.json`.

## How to run (local)
- **Install**: `yarn install` (Yarn 4 / Corepack).
- **Dev (both)**: `yarn start` (runs frontend + backend concurrently via concurrently).
- **Dev (one side)**: `yarn start:frontend` or `yarn start:backend`.
- **Tests**: `yarn test` (Nx run-many; backend uses Jest, frontend Karma setup exists but has no `.spec.ts` files).
- **Build**: `yarn build:frontend` or `yarn build:backend` (Nx targets).

## Frontend ↔ backend contract
- Backend serves under global prefix `/api` (see `apps/api/src/main.ts`).
- **Dev**: Angular proxies `/api` → `http://localhost:3000` (see `apps/anamatic/proxy.conf.json`).
- **Prod**: `ApiService` targets `https://anamatic.onrender.com/api/` when `environment.production === true`.
- **Critical**: All API calls use `withCredentials: true` to send/receive httpOnly refresh cookies (previously broken when set conditionally).
- **DTOs**: Keep request/response shapes in `libs/api-interfaces/` and use from both sides; export via `libs/api-interfaces/src/index.ts`.

## Backend architecture & conventions (NestJS)
- **Module boundaries**: `AuthModule`, `UserModule`, `WordModule`, `GameModule`, `CoreModule` in `apps/api/src/app/`.
- **Validation**: Global `ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true })` enforced in `main.ts`. Use `class-validator` decorators on all DTO fields.
- **Auth flow**:
  - Access JWT via `Authorization: Bearer <token>` (15m TTL; `JwtStrategy`).
  - Refresh JWT stored in httpOnly cookie `studybuddy_session` (3d TTL; `JwtRefreshStrategy` reads from `req.cookies` via `cookie-parser` middleware).
  - Cookie options: `httpOnly: true`, `secure: isProd`, `sameSite: isProd ? 'none' : 'lax'`, `path: '/api'`.
  - Endpoints: `POST /api/auth/login`, `GET /api/auth/refresh`, `POST /api/auth/logout`.
- **Database**: Mongoose + MongoDB; supports both `MONGODB_URI` env var (direct connection string) or separate `DB_HOST/DB_USER/DB_PASSWORD` (constructs `mongodb+srv://...`). Config in `apps/api/src/app/core/db.config.ts` + `core.module.ts`.
- **Word checking**: External DWDS API (`https://www.dwds.de/api/`) called in `apps/api/src/app/word/word.service.ts`. Two endpoints:
  - `GET /api/word/:word` (public, no auth)
  - `GET /api/word/:word/:gameId` (auth required; adds word to game if valid)
- **Game endpoints**: `POST /api/game` (create), `GET /api/game/best`, `GET /api/game/last`, `GET /api/game/:gameId` (load/resume), `DELETE /api/game/:gameId`.

## Frontend patterns (Angular standalone)
- **Bootstrap**: Uses `bootstrapApplication(AppComponent, appConfig)` in `main.ts` (no NgModule). All components are `standalone: true` with explicit `imports` arrays.
- **Routing**: Defined in `apps/anamatic/src/app/app.routes.ts`; routes are `/`, `/login`, `/game`, `/game/:gameId`, `/personal`.
- **Auth interceptor**: `AuthInterceptor` adds `Authorization: Bearer ...` header and auto-refreshes on 401 via `GET /api/auth/refresh` (see `apps/anamatic/src/app/services/auth.interceptor.ts`).
- **State management**:
  - **Auth**: `AuthService` stores access token in sessionStorage (`StorageService`); exposes `loggedIn$` BehaviorSubject.
  - **Game session**: `GameSessionService` tracks current `gameId` (null for anonymous play).
  - **Word lists**: `WordListService` manages pending/correct/wrong words via RxJS `BehaviorSubject`s.
  - **Score**: `ScoreService` tracks `currentScore` via `BehaviorSubject`.
  - **Characters**: `CharacterService` generates/stores 9 random letters (dice strategy).
- **Game flow** (logged-out): User enters word → `GameService.processInput()` → `WordCheckerService.checkWord()` (validates chars via `@retter/util`) → `ApiService.getWordPublic()` → updates word lists & score.
- **Game flow** (logged-in): Same flow but uses `ApiService.getWordForGame(word, gameId)` which persists to backend; game can be resumed via `GET /api/game/:gameId`.
- **Component imports**: Each standalone component must explicitly import `CommonModule`, `FormsModule`, `RouterModule`, Material modules, and child components it uses.

## Critical patterns when changing code
1. **Adding API endpoints**:
   - Define request/response DTOs in `libs/api-interfaces/src/lib/*.dto.ts` with `class-validator` decorators.
   - Export from `libs/api-interfaces/src/index.ts`.
   - Use DTOs in both NestJS controller AND Angular service.
   - Set `withCredentials: true` in Angular `HttpClient` calls if endpoint needs auth cookies.
2. **Adding Angular components**:
   - Set `standalone: true` and explicitly list all dependencies in `imports: [...]` array.
   - Import `CommonModule` if using `*ngIf`, `*ngFor`, `@for`, `AsyncPipe`, etc.
   - Import `FormsModule` for `[(ngModel)]`, Material modules for `<mat-*>` components.
3. **Shared utilities**:
   - Pure functions → `libs/util/src/lib/` (e.g., `checkWordConsistsOfChars`).
   - Type definitions → `libs/api-interfaces/src/lib/` (e.g., `GameDto`, `wordAnswer`).
4. **Database schemas**: Use Mongoose decorators; apply `defaultSchemaOptions` from `apps/api/src/app/util/schemaOptions.util.ts` to remove `__v` and `id` fields, enable getters/virtuals.

## Key architectural decisions (the "why")
- **Standalone Angular**: Migrated from NgModule to reduce boilerplate, improve tree-shaking, simplify lazy loading.
- **Dual game modes**: Anonymous users generate random letters client-side; logged-in users create persistent games server-side tied to MongoDB `_id` (enables save/resume/leaderboard).
- **Refresh token in cookie**: More secure than localStorage (httpOnly prevents XSS); access token in sessionStorage (cleared on tab close).
- **Word validation split**: Frontend checks character validity (`@retter/util`) to fail fast; backend calls DWDS API and persists result to avoid duplicate API calls.

# Аудит конфигурации монорепозитория

Дата: 2026-11-07
Ветка: `chore/update-dependencies`

Проверены все конфигурационные файлы проекта: `package.json` (корень и оба пакета), `pnpm-workspace.yaml`, `tsconfig.json` обоих пакетов, `eslint.config.cjs`, `.prettierrc.json`, `.prettierignore`, `.gitignore` (все три), `.dockerignore` (все три), `Dockerfile.dev`, `packages/*/Dockerfile`, `infra/nginx/Dockerfile`, `docker-compose.yml`, `codegen.ts`, `.graphqlrc.json`, `next.config.js`, `nest-cli.json`, `.storybook/main.ts`, `.github/workflows/` (`ci.yaml`, `deploy-to-dokploy.yaml`), `.vscode/settings.json`.

Каждая находка ниже проверена запуском команд, а не только чтением файлов.

---

## 🔴 Критично — сломано прямо сейчас

### 1. `pnpm frontend:dev` не работает

```
$ pnpm frontend:dev
$ pnpm --filter frontend dev
No projects matched the filters in "/home/pavel/Coding/Go_With_Me"
```

Пакет называется `@go-with-me/web-frontend`, а фильтр ищет `frontend`. При этом `pnpm --filter web-frontend` работает, `pnpm --filter backend` — тоже (пакет называется `@go-with-me/backend`, короткое имя совпадает).

Ломается:

- `package.json` (корень), скрипт `frontend:dev`
- `AGENTS.md` строка 13

При этом `packages/frontend/Dockerfile` и `docker-compose.yml` используют корректный `--filter web-frontend` и работают.

**Фикс (реализован):** в корневом `package.json` скрипт переведён на `-C`:

```json
"frontend:dev": "pnpm -C packages/frontend dev"
```

`-C` (он же `--dir`) переключает рабочую директорию до разрешения пакета, поэтому имя пакета роли не играет — скрипт не сломается ни при переименовании, ни при смене scope. Аргументы пробрасываются как есть: `pnpm frontend:dev --port 3998` → `next dev --turbo --port 3998`. Проверено.

⚠️ Форма с `--` здесь не работает: `pnpm -C packages/frontend run dev -- --port 3999` даёт `Invalid project directory ... /--port`, потому что Next.js принимает первый позиционный аргумент как каталог проекта.

#### Альтернатива: переименовать пакет в `@go-with-me/frontend`

Даёт симметрию `backend` / `frontend`, но это не одна правка. `pnpm --filter` сопоставляет имя пакета (без scope), а не имя каталога — проверено:

```
$ pnpm --filter backend      → packages/backend   (пакет @go-with-me/backend)
$ pnpm --filter web-frontend → packages/frontend  (пакет @go-with-me/web-frontend)
$ pnpm --filter frontend     → No projects matched
```

Поэтому после переименования **все текущие `--filter web-frontend` сломаются** — включая те, что сейчас работают. Затронуто 11 мест в 6 файлах:

| Файл                             | Строка      | Сейчас                               | После переименования                     |
| -------------------------------- | ----------- | ------------------------------------ | ---------------------------------------- |
| `packages/frontend/package.json` | 2           | `"name": "@go-with-me/web-frontend"` | `"name": "@go-with-me/frontend"`         |
| `packages/frontend/Dockerfile`   | 15          | `--filter web-frontend run build`    | `--filter frontend run build`            |
| `docker-compose.yml`             | 36          | `--filter web-frontend dev ...`      | `--filter frontend dev ...`              |
| `AGENTS.md`                      | 3, 22       | описание пакета и команда запуска    | обновить                                 |
| `README.md`                      | 31, 293–295 | `pnpm --filter web-frontend ...`     | `pnpm --filter frontend ...`             |
| `README.md`                      | 7           | `packages/web-frontend`              | `packages/frontend` (устарело и сейчас)  |
| `docs/local-dev-docker.md`       | 35          | `packages/web-frontend/`             | `packages/frontend/` (устарело и сейчас) |

`pnpm-lock.yaml` править не нужно — имена пакетов там не хранятся, только пути (`packages/frontend:`). Нужен `pnpm install` для обновления `node_modules`.

⚠️ Пересборка Docker-образов обязательна: `docker-compose.yml:36` — это команда запуска dev-контейнера фронтенда. Если поменять имя пакета и забыть про неё, контейнер упадёт с `No projects matched`.

Рекомендация: для починки скрипта достаточно минимального фикса. Переименование — отдельная задача, его стоит делать вместе с чисткой документации (пункт 9), которая уже содержит устаревший путь `packages/web-frontend`.

### 2. `class-validator` не работает — DTO не валидируются

В проекте 3 DTO с декораторами валидации:

```
packages/backend/src/modules/comment/dto/create-comment.input.ts
packages/backend/src/modules/role/dto/create-role.input.ts
packages/backend/src/modules/storage/dto/upload-file.input.ts
```

Используются `@IsString`, `@IsNotEmpty`, `@IsMongoId`, `@IsEnum`, `@IsOptional`, `@Matches`. Но `ValidationPipe` нигде не зарегистрирован:

```
$ grep -rn "ValidationPipe|useGlobalPipes" packages/backend/src --include='*.ts'
(0 совпадений)

$ grep -rn "@UsePipes|Pipes" packages/backend/src --include='*.ts'
(0 совпадений)
```

Следствия:

- входные данные в `createComment`, `createRole`, `uploadFile` **не проверялись вообще**;
- `class-validator` и `class-transformer` были мёртвым весом в `dependencies`;
- например, `@Matches(/\.(jpg|jpeg|png|webp|gif)$/i)` в `UploadFileInput.fileName` не применялся, проходила любая строка.

Статус: **исправлено** в коммите `fix: включить валидацию DTO на backend`. Проверено на живом API: пустой `content` → `"content should not be empty"`, невалидный `ownerId` → `"ownerId must be a mongodb id"`, DTO без декораторов (`createCategories`, `createTag`) получают данные как раньше, скалярные `ID`-аргументы работают.

**Фикс** (реализован в `main.ts`):

```ts
app.useGlobalPipes(
    new ValidationPipe({
        transform: true,
        exceptionFactory: (errors) => {
            const collect = (list: ValidationError[]): string[] =>
                list.flatMap((error) => [
                    ...Object.values(error.constraints ?? {}),
                    ...collect(error.children ?? []),
                ]);

            return new BadRequestException(collect(errors).join('; '));
        },
    })
);
```

⚠️ **`whitelist: true` добавлять нельзя.** Ранняя версия этого отчёта рекомендовала его — это была ошибка. В проекте **29 из 32 DTO не размечены `class-validator`**, и `whitelist` стирает все незадекорированные поля. Проверено эмпирически: `ValidationPipe({ whitelist: true })` для класса без декораторов возвращает `{}`:

```
вход:  {"name":"test","ownerId":"507f...","description":"desc"}
выход: {}
```

То есть включение `whitelist` обнулило бы payload у `createEvent`, `createCategories`, `createTag`, `toggleLike` и других. Отдельной защиты `whitelist` здесь не требуется: GraphQL сам отклоняет неизвестные поля (`GRAPHQL_VALIDATION_FAILED`, проверено на живом API).

⚠️ **`exceptionFactory` обязателен из-за NestJS 12.** `HttpException.initMessage()` присваивает `message`, только если `response` — строка. `ValidationPipe` по умолчанию кладёт массив, поэтому клиент видит generic `"Bad Request Exception"` без деталей:

```
без exceptionFactory: "Bad Request Exception"
с exceptionFactory:   "content should not be empty"
```

Рекурсивный сбор по `children` нужен для вложенных DTO: их ошибки лежат не в `constraints` родителя.

### 3. `next-env.d.ts` закоммичен, и опечатка в `.gitignore`

`packages/frontend/.gitignore` содержит `.next-env.d.ts` (с точкой в начале), а файл называется `next-env.d.ts`. Правило не срабатывает:

```
$ git check-ignore -v packages/frontend/next-env.d.ts
(не игнорируется)

$ git ls-files packages/frontend/next-env.d.ts
packages/frontend/next-env.d.ts
```

Файл отслеживается git и перезаписывается при каждой сборке. `pnpm build` уже внёс в него правку:

```diff
-import "./.next/dev/types/routes.d.ts";
-import "./.next/dev/types/root-params.d.ts";
+import "./.next/types/routes.d.ts";
+import "./.next/types/root-params.d.ts";
```

**Фикс (реализован):**

```bash
sed -i 's/^\.next-env\.d\.ts$/next-env.d.ts/' packages/frontend/.gitignore
git rm --cached packages/frontend/next-env.d.ts
```

Дополнительно убран хвостовой пробел, из-за которого правило в `.gitignore` могло не срабатывать (`next-env.d.ts ` с пробелом на конце — git такое правило всё равно применяет, но пробел остаётся источником путаницы).

Статус: **исправлено** в коммите `chore: убрать next-env.d.ts из репозитория`. Файл остаётся на диске (его генерирует Next.js), но больше не отслеживается:

```
$ git check-ignore -v packages/frontend/next-env.d.ts
packages/frontend/.gitignore:5:next-env.d.ts   packages/frontend/next-env.d.ts
$ git ls-files packages/frontend/next-env.d.ts
(пусто)
```

### 4. Контейнеры: том `pnpm_store` бесполезен

В `docker-compose.yml` смонтированы тома в `/home/node/.local/share/pnpm` для обоих сервисов. Но pnpm 12 при недоступном store молча уходит в fallback:

```
$ docker exec gwm-backend pnpm store path
/workspace/node_modules/.pnpm-store/v11       ← 853 МБ здесь

$ docker run --rm -v go_with_me_backend_pnpm_store:/mnt alpine ls -A /mnt
(пусто)
owner=0:0 mode=755                             ← root-owned, не пишется
```

Причина: `Dockerfile.dev` делает `mkdir` для `${PNPM_HOME}` **до** `USER node`, а Docker при создании named volume копирует владельца из образа — но каталог `/home/node/.local/share/pnpm` создаётся неявно при монтировании, уже как root.

Итог: кеш пакетов живёт внутри `node_modules` (тоже volume) и теряется при `docker compose down -v`. Тома `pnpm_store` только занимают место.

**Варианты фикса:**

1. Убрать оба тома `backend_pnpm_store` / `frontend_pnpm_store` — store и так в `node_modules`, который уже смонтирован.
2. Оставить тома, но добавить в `Dockerfile.dev` после `USER node` явное создание каталога с правами, либо задать `store-dir` через `ENV npm_config_store_dir=/home/node/.local/share/pnpm/store`.

**Выбран вариант 1, реализован** в коммите `chore: убрать бесполезные тома pnpm_store из compose`.

Попутно уточнена причина. Права были только одним из двух условий; главное — pnpm вообще не использует `PNPM_HOME/store` для этого проекта. Из документации pnpm:

> If no directory above the project accepts a hard link at all (an agent sandbox that grants write access only to the project, or a container with just the project bind-mounted writable), the store is created inside the project instead: at `node_modules/.pnpm-store`.

Здесь именно этот случай: `/workspace` — bind-mount с хоста, остальная ФС контейнера для проекта чужая, а hard links работают только в пределах одной ФС. Store в `node_modules/.pnpm-store` — не аварийный fallback, а штатное поведение. Поэтому после удаления томов `PNPM_HOME` стал `node:node 2755` (права починились сами), но `pnpm store path` остался тем же:

```
$ docker exec gwm-backend stat -c '%U:%G %a' /home/node/.local/share/pnpm
node:node 2755

$ docker exec gwm-backend pnpm store path
/workspace/node_modules/.pnpm-store/v11
```

Это подтверждает: вариант 2 (починить права и оставить тома) не дал бы ничего — store всё равно ушёл бы в `node_modules`. Том `pnpm_store` был бесполезен по архитектурным причинам, а не из-за прав.

Проверено после пересоздания контейнеров: `docker compose up -d --force-recreate backend frontend`, `pnpm install` в контейнере проходит, backend отвечает на `/graphql` (200), frontend на `/` (200), nginx на `https://localhost/` (200). `docker compose config --volumes` показывает ровно три тома: `backend_node_modules`, `frontend_node_modules`, `mongo_data`.

Также обновлён `docs/local-dev-docker.md` — там упоминался удалённый том `gwm_pnpm_store` и «pnpm store directories ... persisted via named volumes».

---

## 🟠 Высокий приоритет — ощутимый эффект

### 5. 11 МБ JavaScript на странице `/generator`

`world_cities.json` — 15 МБ, 151 539 записей — импортируется напрямую в клиентский хук:

```ts
// packages/frontend/src/app/generator/hooks/useGeneratorLocation.ts
import cities from '../world_cities.json';
```

Хук используется в `useGenerator.ts`, `useGeneratorUser.ts`, `useGeneratorEvents.ts`, которые рендерятся из `generator/page.tsx` (`'use client'`).

Замер после `pnpm build`:

```
11M   .next/static/chunks/14d40j3cw1oxc.js
224K  следующий по размеру чанк
197K  третий
```

**85% всего клиентского JS проекта — это список городов**, который нужен, чтобы выбрать один случайный город.

**Варианты:**

| Подход                                               | Эффект                                              |
| ---------------------------------------------------- | --------------------------------------------------- |
| API-маршрут в Next.js, отдаёт один случайный город   | чанк исчезает, +1 serverless-вызов на генерацию     |
| GraphQL-запрос к бэкенду, случайная выборка из Mongo | данные уходят в БД, нужна миграция                  |
| Динамический `import()` в отдельный чанк             | грузится только на `/generator`, но всё равно 11 МБ |
| Держать в памяти бэкенда, отдавать по HTTP           | 15 МБ RAM, мгновенный ответ                         |

Рекомендую первый вариант как минимальный по изменениям: `app/api/cities/random/route.ts` читает JSON на сервере (файл остаётся в репозитории, но не попадает в клиентский бандл).

**Реализовано иначе, по решению владельца проекта:** файл сокращён до 1000 случайных записей (коммит `perf: сократить world_cities.json до 1000 случайных городов`).

```
было:  15 290 469 байт, 151 539 записей, 245 стран
стало:    120 817 байт,   1 000 записей, 130 стран
```

Выборка детерминированная: сид `20261107`, mulberry32 + тасование Фишера—Йетса, затем индексы отсортированы — файл остаётся упорядоченным, как исходный. Дубликатов нет, все записи сохраняют 4 поля (`country`, `name`, `lat`, `lng`), формат — prettier, как было.

Эффект на бандл:

|                            | До                           | После                       |
| -------------------------- | ---------------------------- | --------------------------- |
| Крупнейший клиентский чанк | 11,2 МБ (`14d40j3cw1oxc.js`) | 515 КБ                      |
| Чанк с данными городов     | —                            | 504 КБ (`36rrapvqun1mh.js`) |

Чанк на 11 МБ исчез; города теперь лежат в общем чанке 504 КБ. `useGeneratorLocation.ts` не менялся — `faker.helpers.arrayElement(cities)` работает с любым размером массива.

⚠️ Компромисс: генератор теперь может выдать только 130 стран вместо 245. Если нужна полная география — правильный путь из таблицы выше (API-маршрут), файл при этом можно вернуть в полном размере.

### 6. `yarn.lock` (553 КБ) и `.yarn/install-state.gz` (1,6 МБ) в git

Проект полностью на pnpm (12.16.1). Следов yarn в `docs/`, `README.md`, `AGENTS.md`, `.github/` нет. Последний коммит в `yarn.lock` — декабрь 2025 (`376c077 Config deploy`).

Помимо мусора в репозитории, наличие `yarn.lock` может сбить с толку инструменты, которые автоматически определяют пакетный менеджер.

**Фикс (реализован):**

```bash
git rm --cached yarn.lock .yarn/install-state.gz
printf '\nyarn.lock\n.yarn/\n' >> .gitignore
```

Дополнительно проверено, что на yarn ничего не завязано: в `.github/workflows/deploy-to-dokploy.yaml`, `Dockerfile*`, `docker-compose.yml` и документации упоминаний нет; `packageManager` в корне — `pnpm@12.16.1`.

Статус: **исправлено** в коммите `chore: убрать yarn.lock и .yarn из репозитория`. `pnpm install --frozen-lockfile` и `pnpm build` проходят. Файлы остались на диске (удалять их не обязательно — git их теперь игнорирует), из истории никуда не делись.

### 7. `next` 16.4.5, а `eslint-config-next` 16.1.0

```json
// package.json (корень)
"eslint-config-next": "16.1.0"     ← зафиксирован без ^

// packages/frontend/package.json
"next": "^16.4.5"                  ← фактически 16.4.5
```

`eslint-config-next` отстаёт на 3 минорные версии. Версия `16.4.5` опубликована. Правила линтера могут не знать о новых API Next 16.4.

**Фикс:** `"eslint-config-next": "^16.4.5"`.

**Реализовано** в коммите `chore: обновить eslint-config-next до 16.4.5`. `16.4.5` — последняя стабильная версия, `^` выровнен с `next`.

Обновление добавило ровно одно правило (сравнил конфиги 16.1.0 и 16.4.5 программно: было 66 правил, стало 67):

```
@next/next/no-location-assign-relative-destination: warn   ← новое
```

Оно нашло одно срабатывание — `window.location.href = '/'` в фолбеке `logout()` (`authActions.ts:57`). Здесь это ложное срабатывание **по смыслу**: после логаута нужен полный hard reload, чтобы сбросить кеш Apollo, а не клиентская навигация через `router.push('/')`, которую советует правило. Подавлено точечно, в том же стиле, что уже есть в `useLocalStorage.ts`:

```ts
// eslint-disable-next-line @next/next/no-location-assign-relative-destination -- осознанный hard reload после логаута
window.location.href = '/';
```

Конфиг `eslint.config.cjs` менять не потребовалось: структура `core-web-vitals` осталась прежней (массив из 4 блоков, те же плагины `react`, `react-hooks`, `import`, `jsx-a11y`, `@next/next`).

Проверено: `pnpm frontend:lint` и `pnpm backend:lint` — 0 проблем, `tsc --noEmit` (frontend) — чисто, `pnpm build` проходит.

### 8. Бэкенд собирается без `strict` ✅

```json
// packages/backend/tsconfig.json — было
"strictNullChecks": true,
"noImplicitAny": false,
"strictBindCallApply": false,
"strictPropertyInitialization": false
```

Фронтенд — `"strict": true`. Бэкенд включал только `strictNullChecks`.

**Сделано:** все четыре флага включены. Порядок был важен: `noImplicitAny` вскрыл ошибки, которые меняли форму данных, а `strictPropertyInitialization` — 147 чисто механических.

**`noImplicitAny: true`** давал **7 ошибок** в 3 файлах.

| Файл                                 | Ошибка                                                                      | Что сделано                                                                                              |
| ------------------------------------ | --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `common/guards/permission.guard.ts`  | `role`, `p` — неявный `any` в `flatMap`/`map`                               | контекст типизирован `getContext<GqlContext>()`; добавлены `PopulatedRole`/`PopulatedPermission`         |
| `config/graphql.config.ts`           | нет типов для `cookie-signature`; `req`/`extra` в `context` — неявный `any` | добавлен `@types/cookie-signature`; контекст размечен `ReqWithPassport` + `SubscriptionContext['extra']` |
| `modules/comment/comment.service.ts` | `parent` — TS7022 (ссылается на себя через `.lean()`)                       | явная аннотация `Pick<Comment, 'parent'> \| null` и типизированный `.lean<>()`                           |

Про `permission.guard.ts`: в сущности `Permission.resource` объявлен как `Types.ObjectId`, но в рантайме после `populate({ path: 'permissions', populate: { path: 'resource' } })` там лежит документ с полем `slug`. Поэтому вместо приведения к типу сущности введены `PopulatedRole` / `PopulatedPermission`, отражающие реальную форму данных. Это не косметика: раньше обращение к `.resource.slug` не проверялось вообще.

**`strictBindCallApply: true`** — 0 ошибок, включён без правок кода.

**`strictPropertyInitialization: true`** — 147 ошибок TS2564 (90 в `entities/`, 55 в `dto/`, 2 в прочих), закрыты не-null assertion `!` у объявления поля, 47 файлов.

Почему `!`, а не `declare` и не инициализатор:

- `target: ES2023` уже включает `useDefineForClassFields`, поэтому tsc и так эмитит поля как `_id;`. `_id!` даёт **байт-в-байт тот же JS** — проверено компиляцией: `x!: string` и `x: string` дают одинаковый `x;`. То есть рантайм-поведение не меняется вовсе.
- `declare` убрал бы эмиссию полей совсем — это изменило бы вывод tsc и потребовало бы отдельной проверки, что декораторы и Mongoose не полагаются на собственные свойства.
- Инициализаторы (`= undefined`) сломали бы `useDefineForClassFields`: поле с `undefined` перезаписало бы значение, присвоенное декоратором.

Отдельно проверено, что `!` не влияет на GraphQL-схему: поля, объявленные с `!`, остались `NON_NULL` (`_id`, `categories`), nullable — nullable (`ownerId`, `ownerType`). `schema.gql` после пересборки не изменился.

**Проверено:** `tsc -p tsconfig.build.json --noEmit` (0 ошибок), `tsc -p tsconfig.spec.json --noEmit` (0), `pnpm --filter backend build`, `pnpm --filter backend test`, `pnpm backend:lint`, `prettier --check`, `pnpm codegen` — схема и типы фронтенда не изменились, Docker-образ пересобран, бэкенд стартует, `POST /graphql` → 200, DTO-валидация отвечает `content should not be empty; ownerId must be a mongodb id`.

---

## 🟡 Средний приоритет — гигиена

### 9. Мёртвые пути и мёртвые конфиги

| Что                                                               | Проблема                                                                                                       | Статус     |
| ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ---------- |
| `codegen.ts`: `./packages/backend/src/backend/**/*.gql`           | каталога `packages/backend/src/backend` **не существует**                                                      | ✅ убрано  |
| `packages/frontend/tsconfig.json`: `"../../Autocomplete_old.tsx"` | файла **нет**, ссылка ведёт за пределы репозитория                                                             | ✅ убрано  |
| `packages/frontend/tsconfig.json`: `"svgr.d.ts"`                  | файла **нет**                                                                                                  | ✅ убрано  |
| `packages/frontend/vercel.json`                                   | зовёт `npm run build-storybook`, но такого скрипта **нет**; `outputDirectory: ./storybook-static` не создаётся | ✅ удалён  |
| `.husky/_/`                                                       | хуков нет, `husky` не установлен — каталог мёртвый                                                             | ✅ удалён  |
| `packages/backend/src/modules/*/**.graphql`                       | placeholder-схема (`exampleField`), не подключена ни к одному модулю                                           | ✅ удалено |
| `pnpm-workspace.yaml`: `onlyBuiltDependencies`                    | удалён в pnpm 11, заменён на `allowBuilds`; дублировал его                                                     | ✅ убрано  |
| `packages/backend/test/`                                          | каталога нет, скрипт `test:e2e` битый                                                                          | ⏳ см. #13 |

**Реализовано** в коммите `chore: убрать мёртвые пути и конфиги`.

⚠️ **Одно утверждение отчёта оказалось неверным: `minimumReleaseAgeExclude` трогать нельзя.**

Отчёт утверждал, что список мёртвый, потому что «`minimumReleaseAge` не задан». На самом деле в pnpm 12 `minimumReleaseAge` имеет **дефолт 1440 минут**. Проверено удалением — установка падает:

```
$ pnpm install --frozen-lockfile     # без minimumReleaseAgeExclude
ERR_PNPM_LOCKFILE_SUPPLY_CHAIN_POLICY  (не дословно)
  @graphql-codegen/cli@8.0.0 was published at ..., within the minimumReleaseAge cutoff
  @types/google.maps@3.66.10 was published at ..., within the minimumReleaseAge cutoff
```

Список — не мусор, а рабочий обход однодневного карантина для свежих версий codegen. Оставлен без изменений, восстановлен из резервной копии после проверки.

**Как проверялось, что `.graphql` можно удалить:**

- ни один модуль не передаёт `typePaths`/`typeDefs` — поиск по `packages/backend/src` даёт 0 совпадений;
- схема генерируется только код-фёрст (`autoSchemaFile`), `exampleField` в `schema.gql` отсутствует;
- бэкенд перезапущен после удаления — `Nest application successfully started`, `POST /graphql` → 200.

**`.husky`:** каталог не отслеживался git (внутри `_/.gitignore` со `*`), `husky` нет в `pnpm-lock.yaml`, все 17 файлов — заглушки, делегирующие в `h` и завершающиеся `exit 0`. Удалён вместе с `git config --unset core.hooksPath` (было прописано `.husky/_`).

Проверено: `pnpm install --frozen-lockfile`, `pnpm codegen`, `pnpm build`, `pnpm frontend:lint`, `pnpm backend:lint`, `tsc --noEmit` — всё проходит, `types.ts`/`operations.ts`/`schema.gql` не изменились.

### 10. Jest-инфраструктура бэкенда полностью отсутствует ✅

```
packages/backend/jest.config.*        → нет
секция "jest" в package.json          → нет
packages/backend/test/                → нет

$ pnpm --filter backend test
testRegex:  - 0 matches
Pattern:    - 0 matches
[ELIFECYCLE] Test failed
```

При этом в `devDependencies` висели 7 пакетов без применения:

```
jest, ts-jest, ts-node, tsconfig-paths, supertest, @types/jest, @types/supertest
```

**Сделано:** конфиг добавлен, первый тест написан, пакеты востребованы (`jest`, `ts-jest`, `@types/jest`). `pnpm --filter backend test` запускает тесты.

Новые файлы:

| Файл                             | Назначение                                                                                         |
| -------------------------------- | -------------------------------------------------------------------------------------------------- |
| `jest.config.js`                 | ESM-конфиг: `createDefaultEsmPreset`, `testRegex: .*\.spec\.ts$`, маппинг `@/*` из `tsconfig.json` |
| `tsconfig.spec.json`             | `types: [..., "jest"]`, чтобы spec-файлы видели `describe`/`it`/`expect`                           |
| `tsconfig.build.json`            | исключает `**/*.spec.ts` из `nest build` (`nest` подхватывает его автоматически)                   |
| `src/utils/is-dev.utils.spec.ts` | первый тест, 3 кейса, 100 % покрытие утилиты                                                       |

**Три нетривиальных момента, выясненных эмпирически:**

1. **ESM требует флаг `--experimental-vm-modules`.** Бэкенд — `"type": "module"`, поэтому `jest` без флага падает с `Must use import to load ES Module`. Скрипты переписаны на `node --experimental-vm-modules node_modules/jest/bin/jest.js` (запускать шим `node_modules/.bin/jest` напрямую нельзя — это shell-обёртка). Добавлен `--disable-warning=ExperimentalWarning`, иначе каждый прогон печатает предупреждение.

2. **Цикл `require(esm)` в `graphql@17`.** `graphql` объявляет условие `module-sync`, из-за чего `require('graphql')` резолвится в `index.mjs`. CJS-пакеты `graphql-tag` (тянется `@nestjs/graphql`) и `graphql-ws` требуют его через `require()`, а Jest запрещает `require(esm)` в цикле:

    ```
    Cannot require() ES Module graphql/index.mjs in a cycle
      (from graphql-tag/lib/graphql-tag.umd.js)
    ```

    Лечится маппингом на CJS-сборку того же пакета — путь вычисляется через `createRequire(...).resolve('graphql')`, без хардкода `.pnpm`:

    ```js
    '^graphql$': require.resolve('graphql').replace(/([\\/])index\.mjs$/, '$1index.js')
    ```

3. **В ESM-режиме нет глобального `jest`.** `jest.fn()` в тестах нужно импортировать явно: `import { jest } from '@jest/globals'`.

**Убрано:** скрипт `test:e2e` ссылался на несуществующий `./test/jest-e2e.json`. Заменён на `--passWithNoTests --testRegex '.*\.e2e-spec\.ts$'` — работает без отдельного конфига и не падает, когда e2e-тестов нет. `test:debug` больше не использует `-r tsconfig-paths/register -r ts-node/register` (для ESM бесполезны).

**Проверено:** `pnpm --filter backend test`, `test:cov` (покрытие в `packages/backend/coverage`, добавлен в `.gitignore`), `pnpm --filter backend build` (spec-файлы в `dist` не попадают), `pnpm backend:lint`, `tsc -p tsconfig.spec.json --noEmit`. Отдельно проверены NestJS DI (`Test.createTestingModule`) и импорт `graphql` внутри тестов.

`supertest`, `@types/supertest`, `ts-node`, `tsconfig-paths` пока не используются — это кандидаты в #12.

### 11. Неиспользуемые зависимости ✅

Проверено grep по `src` и по всему проекту, плюс `pnpm why` и чтение `peerDependencies`.

**Backend — удалено:**

| Пакет                           | Почему                                                                                                       |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `@nestjs/mapped-types`          | `PartialType` берётся из `@nestjs/graphql`; пакет и так остаётся транзитивной зависимостью `@nestjs/graphql` |
| `graphql-upload-ts`             | загрузка через presigned URL в S3, скаляра `Upload` в схеме нет                                              |
| `source-map-support`            | нет ни одного импорта                                                                                        |
| `ts-loader`                     | `nest-cli.json` без `builder`, сборка через `tsc`                                                            |
| `ts-node`                       | был нужен только битому `test:debug`; для ESM бесполезен (Jest использует `ts-jest`)                         |
| `tsconfig-paths`                | то же; `@nestjs/cli` тянет свою копию как зависимость                                                        |
| `supertest`, `@types/supertest` | e2e-тестов нет; при появлении — вернуть                                                                      |

**Backend — оставлено осознанно:**

| Пакет                       | Почему                                                                                              |
| --------------------------- | --------------------------------------------------------------------------------------------------- |
| `rxjs`                      | peer `@nestjs/core` и `@nestjs/common` (не optional)                                                |
| `reflect-metadata`          | peer Nest, нужен в рантайме для декораторов                                                         |
| `pino`, `pino-http`         | обязательные peer `nestjs-pino` (`peerDependenciesMeta` пустой)                                     |
| `pino-pretty`               | используется строкой `target: 'pino-pretty'` в `logger.config.ts` — grep по импортам его не находит |
| `@as-integrations/express5` | обязательный peer `@nestjs/apollo`                                                                  |
| `@nestjs/schematics`        | используется `@nestjs/cli` при генерации; в `scripts` напрямую не виден                             |

**Frontend — удалено:**

| Пакет                       | Почему                                                                                                                   |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `@googlemaps/js-api-loader` | `@vis.gl/react-google-maps` объявляет его своей зависимостью; в store была одна копия, прямая зависимость дублировала её |
| `next-auth`                 | **не был настроен вообще** (см. ниже)                                                                                    |

**Frontend — оставлено осознанно:**

| Пакет | Почему                                      |
| ----- | ------------------------------------------- |
| `zod` | по решению пользователя оставлен на будущее |

**Корень — удалено:**

| Пакет                                  | Почему                                                              |
| -------------------------------------- | ------------------------------------------------------------------- |
| `class-validator`, `class-transformer` | нужны только бэкенду, там и объявлены; в корне никто не импортирует |

#### Отдельная находка: `next-auth` не работал

Пакет присутствовал ради одного вызова в `Footer.tsx`:

```tsx
import { signOut } from 'next-auth/react';
...
<Button onClick={() => signOut()}>Выйти</Button>
```

Но NextAuth в проекте **не настроен**:

- нет ни одного API route — каталога `packages/frontend/src/app/api/` не существует вовсе;
- нет `NEXTAUTH_*` в `.env.local`;
- нет `SessionProvider`/`authOptions`/`getServerSession` — только собственный `SessionProviderGQL`.

`signOut()` из `next-auth@4` делает POST на `${baseUrl}/api/auth/signout` (см. `signOut` → `getCsrfToken` → `fetch`). Эндпоинта нет → 404 и необработанное исключение, сессия не очищается. То есть кнопка «Выйти» в футере была нерабочей.

При этом рядом уже был рабочий механизм — `logout()` в `authActions.ts`, дергающий бэкенд через `NEXT_PUBLIC_AUTH_LOGOUT_URL` (переменная задана в `.env.local`). Им же пользуется `AuthPanel.tsx`.

**Сделано:** `next-auth` удалён, кнопка переведена на `logout()`. Это не только чистка зависимости, но и фикс сломанного логаута.

**Итог:** `pnpm install` убрал 34 пакета (−59 записей в `pnpm-lock.yaml`, включая транзитивные `openid-client`, `jose`, `preact`, `superagent`).

**Проверено:** `pnpm install --frozen-lockfile`, `pnpm codegen` (схема и типы не изменились), `pnpm build`, `pnpm --filter backend test`, `tsc --noEmit`, оба линтера, `prettier --check`, пересборка Docker-образов `--no-cache` и запуск стенда (`GraphQL` → 200, фронтенд → 200).

**Побочно исправлено:** в `packages/{backend,frontend}/node_modules` оставались 70 файлов, принадлежащих `root` (наследие dev-контейнера до коммита `41ef453`). Из-за них `pnpm install` падал с `ERR_PNPM_PACKAGE_MANAGER_PRUNE_DIRECT_DEPS_REMOVE_LINK: Permission denied`. Владелец исправлен через `docker run --rm -v "$PWD:/w" alpine chown -R 1000:1000 ...`.

### 12. Дублирование настроек и версий

```yaml
# pnpm-workspace.yaml — было два одинаковых списка, 8 пакетов дважды
allowBuilds:               # актуальный синтаксис pnpm 12
  '@apollo/protobufjs': true
  '@nestjs/core': true
  ...8 записей

onlyBuiltDependencies:     # legacy-формат, дублировал allowBuilds — ✅ убран в #9
  - '@apollo/protobufjs'
  - '@nestjs/core'
  ...8 записей
```

Версии продублированы между пакетами:

```
typescript:       root 6.0.3    |  backend ^6.0.3       |  frontend ^6.0.3
class-validator:  root 0.15.1   |  backend ^0.15.1      ✅ убран из корня (#12)
class-transformer: root 0.5.1   |  backend ^0.5.1       ✅ убран из корня (#12)
@types/node:      backend ^26.6.6 | frontend ^26.6.6
```

### 13. Нет базовых скриптов и файлов

| Отсутствует                       | Зачем нужно                           |
| --------------------------------- | ------------------------------------- |
| ~~`.nvmrc` / `.node-version`~~ ✅ | при требовании `node >= 26`           |
| ~~`.editorconfig`~~ ✅            | `tabWidth: 4` задан только в prettier |

Закрыто позже: `typecheck` и `lint` в корне (раздел D), `turbo` (раздел C), `.nvmrc` и `.editorconfig` (раздел 15).

### 14. `.prettierignore` не покрывает генерируемые файлы ✅

`codegen.ts` пишет в:

```
packages/shared/graphql.ts
packages/frontend/src/app/graphql/operations.ts
```

Эти пути есть в `eslint.config.cjs` (ignores), но **не было** в `.prettierignore`. Форматирование их переписывало, следующий `pnpm codegen` возвращал обратно — флапающий дифф.

**Сделано:** оба пути добавлены в `.prettierignore` (вместе с переносом `types.ts` → `packages/shared/graphql.ts`, см. раздел B).

---

### 15. Нет `.nvmrc` и `.editorconfig` ✅

Требование `engines.node: ">=26"` нигде не зафиксировано версией, а `tabWidth: 4` задан только в prettier — редакторы о нём не знают.

**Сделано:**

- `.nvmrc` → `26` (совпадает с `engines` во всех трёх `package.json`, с `node-version: 26` в CI и с `FROM node:26-alpine` в Dockerfile'ах);
- `.editorconfig` → `indent_size = 4`, `end_of_line = lf`, `charset = utf-8`, финальный перевод строки, обрезка пробелов.

Два отличия от «просто 4 везде»:

| Секция           | Значение                           | Почему                                                                                                                          |
| ---------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `[*.{yml,yaml}]` | `indent_size = 2`                  | `docker-compose.yml` и `pnpm-workspace.yaml` написаны с 2 пробелами; при 4 редактор переформатировал бы их на каждом сохранении |
| `[*.md]`         | `trim_trailing_whitespace = false` | в markdown два пробела в конце строки — значимый перенос строки                                                                 |

Известное расхождение: `.prettierrc.json` задаёт `tabWidth: 4` для всех файлов, включая YAML, поэтому `pnpm-workspace.yaml` и `docker-compose.yml` не проходят `prettier --check`. Это было и до `.editorconfig` — правило для YAML его не создаёт, но и не решает: prettier не читает `.editorconfig`.

Второе расхождение, тоже предсуществующее: 63 из 78 CSS-файлов написаны с отступом в 2 пробела, то есть не проходят `prettier --check` при `tabWidth: 4`. Специальное правило для CSS не добавлял — это увеличило бы область задачи, а не уменьшило расхождение.

**Оба расхождения закрыты** отдельным коммитом, см. раздел 16.

---

### 16. YAML и CSS не проходили `prettier --check` ✅

`prettier --check .` падал на **127 файлах**. По типам:

| Тип              | Файлов | Что менялось                                   |
| ---------------- | ------ | ---------------------------------------------- |
| `css`            | 63     | отступ 2 → 4                                   |
| `tsx`            | 37     | отступ 2 → 4, перенос строк, порядок импортов  |
| `ts`             | 20     | то же                                          |
| `yaml` / `yml`   | 3      | отступ и кавычки                               |
| `md`             | 3      | отступ в списках, пустые строки перед списками |
| `json`           | 2      | отступ 2 → 4                                   |
| `pnpm-lock.yaml` | 1      | генерируемый — **исключён**                    |

**Три отдельные причины, а не одна.**

1. **`pnpm-lock.yaml` нельзя форматировать.** Prettier переписывает в нём 38 606 строк, а следующий `pnpm install` возвращает файл обратно — флапающий дифф, как в разделе 14. Добавлен в `.prettierignore`.

2. **`next-env.d.ts` генерируется `next typegen`.** Тоже добавлен в `.prettierignore` (в git его нет, `.gitignore` фронтенда его исключает, но `prettier --check .` его видел).

3. **YAML: конфликт `tabWidth`.** Prettier не читает `.editorconfig`, поэтому правило `[*.{yml,yaml}] indent_size = 2` из раздела 15 не влияло на проверку. Замер двух вариантов:

| Вариант                          | Изменённых строк |
| -------------------------------- | ---------------- |
| `overrides` → YAML `tabWidth: 2` | 244              |
| YAML при общем `tabWidth: 4`     | 212              |

Объём почти одинаковый, но второй вариант переиндентировал бы YAML в 4 пробела и разошёлся бы с `.editorconfig`. Выбран **YAML = 2** через `overrides`:

```json
"overrides": [
    {
        "files": ["*.{yml,yaml}"],
        "options": { "tabWidth": 2 }
    }
]
```

**Заодно `endOfLine: auto` → `lf`.** В репозитории было 6 файлов с CRLF (`NavTabs`, `CardEventMap`, `constants/map.ts`), а `.editorconfig` уже требовал LF. `auto` сохранял CRLF в этих файлах, то есть editorconfig нарушался. После перехода на `lf` все 6 нормализованы, `editorconfig-checker` даёт 0 нарушений по всему репозиторию (было 1274).

**Проверено, что это только форматирование:**

| Проверка                                           | Результат                                                                                                      |
| -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| CSS: сравнение без пробельных символов             | 63/63 файла идентичны — менялись только отступы                                                                |
| TS/TSX: сравнение как множества непробельных строк | 38/57 идентичны; 19 — перенос строк внутри выражений (`Like`, `EventForm`, `Notifications`) и порядок импортов |
| Саид-эффект-импорты (`import '...'`)               | ни один не переставлен                                                                                         |
| `pnpm typecheck`                                   | `rc=0`                                                                                                         |
| `pnpm lint`                                        | `rc=0`                                                                                                         |
| `pnpm check:codegen`                               | `rc=0`, генераты не изменились                                                                                 |
| `pnpm build`                                       | `rc=0` (2 задачи)                                                                                              |
| `pnpm --filter backend test`                       | 3/3                                                                                                            |
| `pnpm install --frozen-lockfile`                   | `rc=0`, `pnpm-lock.yaml` не изменился                                                                          |
| `prettier --check .`                               | **зелёный**                                                                                                    |
| YAML распарсен (`yaml.safe_load`)                  | 4/4 ок, `docker compose config` валиден                                                                        |

Отдельно про GraphQL-запросы: prettier переносил аргументы в `getChildrenCommentsByParentId(...)` на отдельные строки. Это могло повлиять на codegen, поэтому `pnpm check:codegen` прогнан после форматирования — `operations.ts` и `graphql.ts` побайтно не изменились.

**`README.md` не тронут:** prettier его не переформатировал (файл уже соответствовал), в дифф попала только правка `packages/web-frontend` → `packages/frontend`.

---

## 💡 Предложения по архитектуре монорепы

### A. `catalog:` в `pnpm-workspace.yaml` ✅

Избавиться от рассинхрона версий:

```yaml
catalog:
    typescript: 6.0.3
    graphql: ^17.1.0
    class-validator: ^0.15.1
    class-transformer: ^0.5.1
    '@types/node': ^26.6.6

packages:
    - packages/*
```

В пакетах: `"typescript": "catalog:"`. Одно место правки вместо трёх.

**Сделано.** После #12 (`class-validator`/`class-transformer` уже убраны из корня) дублей осталось ровно 4:

| Зависимость   | Было                                              | Стало                                                                     |
| ------------- | ------------------------------------------------- | ------------------------------------------------------------------------- |
| `typescript`  | root `6.0.3`, backend `^6.0.3`, frontend `^6.0.3` | `catalog: 6.0.3` (точный пин по решению — TypeScript обновляется вручную) |
| `graphql`     | backend `^17.1.0`, frontend `^17.1.0`             | `catalog: ^17.1.0`                                                        |
| `graphql-ws`  | backend `^6.4.1`, frontend `^6.4.1`               | `catalog: ^6.4.1`                                                         |
| `@types/node` | backend `^26.6.6`, frontend `^26.6.6`             | `catalog: ^26.6.6`                                                        |

Важно: `typescript` в корне был запинен точно (`6.0.3`), а в пакетах — диапазоном `^6.0.3`. Каталог требует одно значение, выбран точный пин, чтобы не ослабить существующее ограничение.

`pnpm install` записал в `pnpm-lock.yaml` секцию `catalogs.default` и заменил `specifier` у затронутых записей на `'catalog:'`, при этом `version` остались прежними — фактически установленные версии не поменялись (`typescript 6.0.3`, `graphql 17.1.0`, `graphql-ws 6.4.1`, `@types/node 26.6.6`).

**Проверено:** `pnpm install --frozen-lockfile`, `pnpm build`, `pnpm --filter backend test`, оба линтера, `pnpm codegen` — схема и типы фронтенда не изменились.

### B. Вынести общие типы в `packages/shared` ✅

Сгенерированные типы схемы лежали внутри фронтенд-приложения (`packages/frontend/src/app/graphql/types.ts`). При появлении третьего потребителя (мобильный клиент, e2e-тесты) их пришлось бы копировать.

**Сделано.** Создан `packages/shared` с единственным полем `exports`:

```json
{
    "name": "@go-with-me/shared",
    "private": true,
    "exports": { "./graphql": "./graphql.ts" }
}
```

Файл `graphql.ts` — это бывший `types.ts`, перенесён через `git mv` (история сохранена), генерируется туда же codegen'ом. Пакет поставляется **TS-исходниками без шага сборки**: своего `build` у него нет, а `pnpm --filter "*" build` пакеты без этого скрипта просто пропускает, поэтому в существующем порядке сборки ничего не меняется и добавлять зависимости в Docker/CI не пришлось.

Что подкручено:

| Файл                               | Изменение                                                  |
| ---------------------------------- | ---------------------------------------------------------- |
| `codegen.ts`                       | выход `typescript`-плагина → `packages/shared/graphql.ts`  |
| `packages/frontend/next.config.js` | `transpilePackages: ['@go-with-me/shared']`                |
| `packages/frontend/package.json`   | `"@go-with-me/shared": "workspace:*"`                      |
| 38 импортов                        | `@/app/graphql/types` → `@go-with-me/shared/graphql`       |
| `eslint.config.cjs`                | ignore переехал на новый путь                              |
| `.prettierignore`                  | добавлены оба сгенерированных файла                        |
| `package.json`                     | `check:codegen` сравнивает конкретные файлы, а не каталоги |

Границы решения:

- Типы **схемы** переехали, `operations.ts` (140 КБ типов запросов фронтенда) остался на месте — он к схеме не относится и другим потребителям не нужен.
- Бэкенд не тронут: enum'ы объявлены там руками и регистрируются через `registerEnumType`, переносить их в общий пакет пришлось бы вместе с шагом сборки в `dist` (для `nodenext` TS-исходники из `node_modules` не компилируются), а это усложнило бы Docker и порядок сборки. Пока у общего enum'а нет второго потребителя, выгоды нет.
- `check:codegen` пришлось сузить с каталогов до трёх файлов: `packages/frontend/src/app/graphql` содержит ещё и `queries/`/`mutations/`, то есть руки, а не только генерацию. С каталогом проверка падала на любой правке запроса.

**Побочный эффект:** `.prettierignore` теперь покрывает оба сгенерированных файла — раньше `prettier -w` переформатировал их в 4 пробела, а следующий `pnpm codegen` возвращал 2, давая флапающий дифф.

**Проверено:** `pnpm install --frozen-lockfile`, `pnpm typecheck`, `pnpm lint`, `pnpm build`, `pnpm check:codegen`, тесты бэкенда (3/3), `next dev` (200 на `/` и `/events`), Docker-образ и запуск контейнера (200), standalone-сервер из `.next/standalone` (200). Детектор дрейфа codegen проверен искусственной правкой схемы → `rc=1`.

### C. Turbo для кеширования сборки ✅

Было:

```
$ pnpm build
packages/backend  build → всегда полная сборка
packages/frontend build → всегда полная сборка
```

**Сделано.** Добавлен `turbo` (2.11.10) и `turbo.json`:

```json
{
    "tasks": {
        "build": {
            "dependsOn": ["^build"],
            "outputs": ["dist/**", ".next/**", "!.next/cache/**", "!.next/dev/**"]
        },
        "dev": { "cache": false, "persistent": true }
    }
}
```

Корневой `build` заменён на `turbo run build`.

| Сценарий                         | Было   | Стало                    |
| -------------------------------- | ------ | ------------------------ |
| холодная сборка                  | ~8.8 с | ~3.9 с                   |
| повторная без изменений          | ~3.9 с | **~0.13 с** (FULL TURBO) |
| `.next`+`dist` удалены, кеш есть | ~8.8 с | **~0.27 с**              |

Кеш восстанавливает артефакты целиком — проверено удалением `.next` и `dist`: после `turbo run build` на месте и `.next/standalone/.../server.js`, и `dist/main.js`.

Настройка `outputs` важна: без неё Turbo не кеширует файлы вообще, только логи. Next-специфичные исключения `!.next/cache/**` и `!.next/dev/**` не дают кешу раздуваться внутренним кешем самого Next.

Тонкость, которую пришлось выяснить: `.turbo/` создаётся **внутри каждого пакета**, и пока он не был в `.gitignore`, Turbo хешировал свои же кеш-файлы, из-за чего хеш менялся на каждом прогоне и кеш не срабатывал никогда (`0 cached`). Достаточно добавить `.turbo/` в `.gitignore` (и в `.dockerignore`, чтобы не тащить кеш в контекст сборки).

Проверено, что инвалидация корректна:

- правка `packages/shared/graphql.ts` (файл **вне** каталога фронтенда) → кеш фронтенда сбрасывается, бэкенд остаётся `HIT`;
- правка файла фронтенда → сбрасывается только фронтенд.

Docker не тронут: `packages/*/Dockerfile` собирают напрямую через `pnpm --filter … run build`, Turbo в образы не попадает — там кеша между слоями всё равно нет.

### D. CI-проверки перед деплоем ✅

`.github/workflows/deploy-to-dokploy.yaml` раньше **только деплоил**: `checkout` → `paths-filter` → `curl`. В `main` мог уехать код, который не собирается.

**Сделано.** Добавлен `.github/workflows/ci.yaml` с одним джобом `check`:

```yaml
on:
    pull_request:
    workflow_call: # переиспользуется деплоем
```

Шаги: `pnpm install --frozen-lockfile` → `pnpm typecheck` → `pnpm lint` → `pnpm build` → `pnpm check:codegen`.

Связка с деплоем — через reusable workflow, потому что `needs` не работает между разными файлами workflow. В `deploy-to-dokploy.yaml` появился первый джоб:

```yaml
jobs:
  check:
    uses: ./.github/workflows/ci.yaml

  deploy-backend:
    needs: check
    ...
  deploy-frontend:
    needs: check
```

Итого: на PR гоняется только CI, на push в `main` и на теги — сначала CI, и деплой стартует только при успехе. Отдельного триггера `push: main` у `ci.yaml` нет — иначе на `main` проверки шли бы дважды (самостоятельно и внутри деплоя).

Новые скрипты в корневом `package.json`:

| Скрипт               | Что делает                                                                                                |
| -------------------- | --------------------------------------------------------------------------------------------------------- |
| `lint`               | `eslint packages/frontend packages/backend` — без `--fix`, чтобы в CI падало, а не молча правило за собой |
| `typegen`            | `next typegen` — генерирует `next-env.d.ts` и `.next/types`                                               |
| `typecheck`          | `typecheck:backend` + `typecheck:frontend`                                                                |
| `typecheck:backend`  | `tsc -p tsconfig.build.json --noEmit`                                                                     |
| `typecheck:frontend` | `typegen` + `tsc --noEmit`                                                                                |
| `check:codegen`      | `pnpm codegen` + `git diff --exit-code` по сгенерированным путям                                          |

Два неочевидных момента, без которых CI не работает:

1. **`typegen` обязателен перед `tsc` на фронтенде.** В чистом клоне `next-env.d.ts` отсутствует (он в `.gitignore`), а именно он подтягивает `next/image-types/global.d.ts` с объявлениями для `*.svg`. Без него `tsc` падает с `TS2307: Cannot find module '@/assets/icons/spinner.svg'` — проверено на клоне без файла.
2. **`check:codegen` сравнивает только сгенерированные пути**, а не весь репозиторий: `packages/backend/src/schema` и `packages/frontend/src/app/graphql`. Детектор проверен искусственным дрейфом — дописанный в `schema.gql` тип даёт `rc=1`.

Обновлены также версии actions в деплое: `actions/checkout@v4 → v7`, `dorny/paths-filter@v3 → v4`.

### E. Автоматизировать codegen ✅

Добавить `prepare` или git-hook:

```json
"prepare": "pnpm codegen"
```

Либо pre-commit через husky: если `packages/backend/src/schema/schema.gql` изменился — запустить codegen.

**Сделано** первым вариантом: `"prepare": "pnpm codegen"` (husky из репозитория удалён в #8, возвращать его ради этого не стали).

Уточнение по поведению pnpm, которое важно понимать: `prepare` запускается при **свежей** установке (новый клон, CI, `docker build`), но пропускается при повторной, если манифесты не менялись — это `optimisticRepeatInstall` (в pnpm включён по умолчанию). Для задачи это ровно то, что нужно: типы обновляются там, где `node_modules` ставится с нуля.

Проверено на реальных продакшн-образах (`packages/*/Dockerfile`, `--no-cache`):

```
#11 [builder 2/3] RUN pnpm install --frozen-lockfile
#11 . prepare$ pnpm codegen
#11 . prepare: ❯ Generate to packages/shared/graphql.ts
#11 . prepare: ❯ Generate to packages/frontend/src/app/graphql/operations.ts
```

То есть к моменту `next build` / `nest build` типы уже соответствуют схеме, и `check:codegen` в CI перестаёт быть единственной защитой.

---

## Приоритетный план

| #      | Задача                                                                  | Эффект             | Риск              |
| ------ | ----------------------------------------------------------------------- | ------------------ | ----------------- |
| ~~1~~  | ~~Починить `frontend:dev`~~ ✅ `c81cff0`                                | Разработка         | —                 |
| ~~2~~  | ~~`ValidationPipe` в `main.ts`~~ ✅ `881ec1b`                           | Безопасность       | —                 |
| ~~3~~  | ~~`next-env.d.ts` из git + опечатка в `.gitignore`~~ ✅ `0560e39`       | Чистота диффа      | —                 |
| ~~4~~  | ~~Убрать `yarn.lock`, `.yarn/`~~ ✅ `331ac2d`                           | −2 МБ, чистота     | —                 |
| ~~5~~  | ~~Тома `pnpm_store`~~ ✅ `215917f`                                      | Чистота compose    | —                 |
| ~~6~~  | ~~`world_cities.json` 15 МБ → 1000 городов~~ ✅ `2a367cf`               | −11 МБ JS          | принят компромисс |
| ~~7~~  | ~~`eslint-config-next` → 16.4.5~~ ✅ `a470e12`                          | Актуальные правила | —                 |
| ~~8~~  | ~~Убрать мёртвые пути и конфиги~~ ✅ `9ab5b43`                          | Чистота            | —                 |
| ~~9~~  | ~~`noImplicitAny: true`~~ ✅ `5534ab5`                                  | Типобезопасность   | —                 |
| ~~10~~ | ~~`catalog:` в pnpm-workspace.yaml~~ ✅ `471bf5f`                       | Единые версии      | —                 |
| ~~11~~ | ~~CI с проверками~~ ✅                                                  | Не ломать main     | —                 |
| ~~12~~ | ~~Убрать неиспользуемые зависимости~~ ✅ −34 пакета                     | −размер, ясность   | —                 |
| ~~13~~ | ~~Решить судьбу Jest (починить или удалить)~~ ✅ починено               | Ясность            | —                 |
| ~~14~~ | ~~`strictBindCallApply` + `strictPropertyInitialization`~~ ✅ `408a62a` | Типобезопасность   | —                 |
| ~~15~~ | ~~`.nvmrc` + `.editorconfig`~~ ✅                                       | Гигиена            | —                 |
| ~~16~~ | ~~YAML, CSS и конфиги приведены к prettier~~ ✅                         | Чистота диффа      | —                 |

---

## Что уже исправлено в этой сессии

| Коммит    | Что                                                                                                                                              |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `41ef453` | dev-контейнеры работают от пользователя `node` (uid 1000)                                                                                        |
| `5fdb0f1` | относительные импорты → алиас `@/` (301 спецификатор, 92 файла)                                                                                  |
| `80cd1d5` | prettier: `importOrderParserPlugins` с `decorators-legacy`; `schema.gql` в `.prettierignore`                                                     |
| `54d22f4` | backend приведён к `tabWidth: 4` (137 файлов)                                                                                                    |
| `725e199` | `.DS_Store` удалён из индекса (9 файлов), добавлен в `.gitignore`                                                                                |
| `881ec1b` | `ValidationPipe` включён (`transform` + `exceptionFactory`), DTO валидируются                                                                    |
| `0560e39` | `next-env.d.ts` убран из индекса, правило в `.gitignore` исправлено                                                                              |
| `f5e70b5` | `removeTag` возвращает `Boolean` вместо `Tag` (схема + типы фронтенда)                                                                           |
| `c81cff0` | `frontend:dev` запускается через `-C packages/frontend` вместо `--filter`                                                                        |
| `331ac2d` | `yarn.lock` и `.yarn/` убраны из репозитория, добавлены в `.gitignore`                                                                           |
| `20e7f5f` | правила yarn убраны из `.gitignore`, файлы удалены с диска                                                                                       |
| `215917f` | тома `pnpm_store` убраны из compose, `docs/local-dev-docker.md` обновлён                                                                         |
| `2a367cf` | `world_cities.json` сокращён с 15 МБ / 151 539 записей до 121 КБ / 1 000                                                                         |
| `a470e12` | `eslint-config-next` 16.1.0 → `^16.4.5` (появилось правило `no-location-assign-relative-destination`)                                            |
| `ddb4b2d` | точечное подавление нового правила в фолбеке `logout()`                                                                                          |
| `9ab5b43` | мёртвые пути и конфиги убраны: `codegen.ts`, `tsconfig.json` фронтенда, `vercel.json`, `.husky`, `onlyBuiltDependencies`, placeholder-`.graphql` |
| `e3206f7` | конфиг Jest в ESM-режиме, первый тест на `formatDate` (3 кейса)                                                                                  |
| `4605f32` | 34 неиспользуемые зависимости убраны (−336 строк lockfile)                                                                                       |
| `3911097` | неработающий `signOut` из `next-auth` заменён на `logout()`                                                                                      |
| `5534ab5` | `noImplicitAny: true` на backend, 147 мест явно типизированы                                                                                     |
| `471bf5f` | общие версии вынесены в `catalog:` (`typescript`, `graphql`, `graphql-ws`, `@types/node`)                                                        |
| `598cf42` | CI на PR и перед деплоем (reusable workflow), `check:codegen`                                                                                    |
| `e0151c5` | типы GraphQL-схемы вынесены в `packages/shared`                                                                                                  |
| `1f6bd10` | сборка кешируется через Turborepo (`.turbo/` в ignore)                                                                                           |
| `408a62a` | `strictPropertyInitialization` и `strictBindCallApply` включены (147 `!`)                                                                        |
| `09ce2f5` | `.nvmrc` и `.editorconfig` добавлены                                                                                                             |
| `PENDING` | YAML и CSS приведены к prettier, `endOfLine: lf`, lock и `next-env.d.ts` в `.prettierignore`                                                     |

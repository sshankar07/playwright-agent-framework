# playwright-agent-framework

A layered Playwright test framework: environment and tenant configuration, a small core runtime of
fixtures and helpers, reusable "skills" for common business actions, and worked examples to copy
from.

Every test enters through a single extended `test` object in `src/core/baseTest.ts`, which supplies
the environment, test data, database, and logging fixtures.

## Requirements

- Node.js 18 or newer
- npm

## Quick start

```bash
npm install
npx playwright install   # download browsers, needed before the first test run
npm run typecheck
npm run lint
```

## Scripts

| Script | Command | What it does |
| --- | --- | --- |
| `npm test` | `npx playwright test` | Runs the Playwright suite |
| `npm run typecheck` | `tsc --noEmit` | Type-checks `src` and `examples` |
| `npm run lint` | `eslint src examples` | Lints with the ESLint 9 flat config |

## Project structure

```
config/
  env/            dev.ts, qa.ts, prod.ts — base URLs and feature flags per environment
  tenants/        tenants.schema.ts — TenantDefinition contract
  db/             mysql.config.ts — connection settings from DB_* variables
src/
  core/           baseTest.ts and the primitives its fixtures depend on
  fixtures/       extension point for project-specific fixtures
  skills/         reusable business actions (login, navigation)
  types/          EnvName, EnvConfig, UserRecord, TestDataBundle
  data/           testData.<env>.json — per-environment fixture data
examples/
  pages/          page objects
  tests/sample/   illustrative specs
docs/
  project-map.html   annotated map of every file and its role
```

An annotated, shareable version of this map — with a one-line description of what each file does —
is in [`docs/project-map.html`](docs/project-map.html).

## Configuration

Configuration is read from environment variables at run time.

| Variable | Default | Purpose |
| --- | --- | --- |
| `ENV` | `dev` | Selects `config/env/dev.ts`, `qa.ts`, or `prod.ts` |
| `BASE_URL` | `https://example.test` | Base URL used by `playwright.config.base.ts` |
| `DB_HOST` | `localhost` | MySQL host |
| `DB_PORT` | `3306` | MySQL port |
| `DB_USER` | `test` | MySQL user |
| `DB_PASSWORD` | `test` | MySQL password |
| `DB_NAME` | `test_db` | MySQL database |

```bash
ENV=qa npm test
```

## Fixtures

`src/core/baseTest.ts` extends Playwright's `test` with four fixtures, available alongside the
built-in ones such as `page`:

| Fixture | Type | Description |
| --- | --- | --- |
| `envContext` | `EnvContext` | Resolved environment name and its config |
| `testData` | `TestDataBundle` | Data loaded from `src/data/testData.<env>.json`, cached per environment |
| `mysql` | `MysqlClient` | Pooled `mysql2` client; closed automatically after each test |
| `logger` | `Logger` | `info` / `warn` / `error` with optional metadata |

### How a test resolves

A spec imports `test` from `baseTest.ts`. That builds `envContext` from `ENV`, which selects a
`config/env` module. The resolved environment name then decides which `src/data` bundle
`dataLoader` reads. The database and logger fixtures are built independently, and `mysql` is torn
down when the test ends.

## Writing a test

Import `test` and `expect` from the framework rather than from `@playwright/test` directly —
that is what makes the custom fixtures available.

```ts
import { test, expect } from '../../src/core/baseTest';
import { performLogin } from '../../src/skills/authSkill';
import { goTo } from '../../src/skills/navigationSkill';

test('a user can sign in', async ({ page, envContext, testData, logger }) => {
  const user = testData.users[0];
  logger.info('Signing in', { user: user.username });

  await goTo(page, envContext.config.baseURL, '/login');
  await performLogin(page, user.username, user.password ?? '');

  await expect(page).toHaveURL(/dashboard/);
});
```

Adjust the import depth to match where your spec lives.

## Core helpers

| Module | Exports |
| --- | --- |
| `src/core/pageActionHelpers.ts` | `clickByRole()`, `fillByPlaceholder()` |
| `src/core/waitHelpers.ts` | `waitForNetworkIdle()` |
| `src/core/assertionHelpers.ts` | `expectTextEquals()`, `expectUrlMatches()` |
| `src/core/apiIntercept.ts` | `mockApiResponse()`, `captureRequests()` |
| `src/skills/authSkill.ts` | `performLogin()` |
| `src/skills/navigationSkill.ts` | `goTo()` |

## Extending the framework

- **New environment** — add a module under `config/env/`, add its name to `EnvName` in
  `src/types/environment.ts`, and handle it in `resolveEnv()` in `src/core/envContext.ts`.
- **New test data** — add `src/data/testData.<env>.json`. It is picked up automatically; a missing
  file falls back to an empty bundle rather than failing.
- **New fixture** — define it in `src/fixtures/coreFixtures.ts` and merge it into `baseTest.ts`.
- **New skill** — compose the existing core helpers in a module under `src/skills/`, the way
  `authSkill.ts` builds on `pageActionHelpers.ts`.

## Before running the suite

Two things are not wired up yet:

1. **Browsers are not installed.** Run `npx playwright install` first.
2. **`playwright.config.base.ts` is a base config only.** No `playwright.config.ts` extends it yet,
   so `npm test` will not pick up its `testDir`, retry, reporter, and trace settings. Add a root
   `playwright.config.ts` that imports and extends it before relying on the suite.

The example specs under `examples/tests/sample/` are templates rather than real coverage —
`sample-api.spec.ts` skips itself by design.

# Holyrics Config Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build hybrid Holyrics URL/token configuration through the Fastify server and React settings UI.

**Architecture:** Environment variables remain the priority source for `HOLYRICS_BASE_URL` and `HOLYRICS_TOKEN`. If env config is incomplete, the server reads a local JSON config file saved by the web UI. The browser only talks to `/api/holyrics/config` endpoints and never receives the raw token.

**Tech Stack:** Fastify 5, React 19, Vite, TypeScript, Node test runner, `tsx`, shared workspace package types.

---

## File Structure

- Modify `packages/shared/src/index.ts`: add request/response types for Holyrics config APIs.
- Create `apps/server/src/modules/holyrics/config.ts`: pure config loading, validation, masking, and persistence helpers.
- Create `apps/server/src/modules/holyrics/config.test.ts`: Node test runner tests for config behavior.
- Modify `apps/server/src/modules/holyrics/index.ts`: register Fastify routes for config read/save/test.
- Modify `apps/server/src/index.ts`: register Holyrics routes.
- Modify `apps/web/src/pages/SettingsPage.tsx`: implement config form, status display, save action, and test action.
- Modify `apps/web/src/pages/HomePage.tsx`: show integration status from server.
- Modify `.gitignore`: ignore `.holyrics-config.json`.
- Modify `.env.example`: document `HOLYRICS_BASE_URL`, `HOLYRICS_TOKEN`, and optional `HOLYRICS_CONFIG_FILE`.

### Task 1: Shared API Types

**Files:**
- Modify: `packages/shared/src/index.ts`

- [ ] **Step 1: Add shared Holyrics config types**

```ts
export type HealthStatus = {
  status: "ok";
};

export type HolyricsConfigSource = "env" | "local" | "none";

export type HolyricsConfigStatus = {
  configured: boolean;
  source: HolyricsConfigSource;
  baseUrl: string | null;
  tokenConfigured: boolean;
  tokenPreview: string | null;
};

export type SaveHolyricsConfigRequest = {
  baseUrl: string;
  token: string;
};

export type HolyricsConfigTestResult = {
  ok: boolean;
  version: string | null;
  permissions: string | null;
};
```

- [ ] **Step 2: Run shared build**

Run: `pnpm --filter @holyrics-control/shared build`

Expected: exit code 0.

### Task 2: Server Config Module With TDD

**Files:**
- Create: `apps/server/src/modules/holyrics/config.test.ts`
- Create: `apps/server/src/modules/holyrics/config.ts`

- [ ] **Step 1: Write failing tests**

```ts
import { mkdtemp, readFile } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { describe, test } from "node:test";
import assert from "node:assert/strict";

import {
  getHolyricsConfigStatus,
  resolveHolyricsConfig,
  saveLocalHolyricsConfig
} from "./config.js";

async function tempConfigPath() {
  const dir = await mkdtemp(join(tmpdir(), "holyrics-config-"));
  return join(dir, "config.json");
}

describe("Holyrics config", () => {
  test("uses complete environment config before local config", async () => {
    const configPath = await tempConfigPath();
    await saveLocalHolyricsConfig(
      { baseUrl: "http://local:8091", token: "local-token" },
      { configPath }
    );

    const resolved = await resolveHolyricsConfig({
      env: {
        HOLYRICS_BASE_URL: "http://env:8091/",
        HOLYRICS_TOKEN: "env-token"
      },
      configPath
    });

    assert.equal(resolved.source, "env");
    assert.equal(resolved.config?.baseUrl, "http://env:8091");
    assert.equal(resolved.config?.token, "env-token");
  });

  test("uses local config when environment config is missing", async () => {
    const configPath = await tempConfigPath();
    await saveLocalHolyricsConfig(
      { baseUrl: "http://127.0.0.1:8091/", token: "local-token" },
      { configPath }
    );

    const resolved = await resolveHolyricsConfig({
      env: {},
      configPath
    });

    assert.equal(resolved.source, "local");
    assert.equal(resolved.config?.baseUrl, "http://127.0.0.1:8091");
  });

  test("returns safe unconfigured status when no config exists", async () => {
    const status = await getHolyricsConfigStatus({
      env: {},
      configPath: await tempConfigPath()
    });

    assert.deepEqual(status, {
      configured: false,
      source: "none",
      baseUrl: null,
      tokenConfigured: false,
      tokenPreview: null
    });
  });

  test("rejects invalid URLs", async () => {
    await assert.rejects(
      () =>
        saveLocalHolyricsConfig(
          { baseUrl: "ftp://127.0.0.1:8091", token: "token" },
          { configPath: "/tmp/unused-holyrics-config.json" }
        ),
      /URL/
    );
  });

  test("saves normalized local config without losing the token", async () => {
    const configPath = await tempConfigPath();
    await saveLocalHolyricsConfig(
      { baseUrl: " http://127.0.0.1:8091/ ", token: "  secret-token  " },
      { configPath }
    );

    const rawFile = JSON.parse(await readFile(configPath, "utf8")) as {
      baseUrl: string;
      token: string;
    };
    const status = await getHolyricsConfigStatus({ env: {}, configPath });

    assert.equal(rawFile.baseUrl, "http://127.0.0.1:8091");
    assert.equal(rawFile.token, "secret-token");
    assert.equal(status.tokenPreview, "se********en");
  });
});
```

- [ ] **Step 2: Run tests to verify RED**

Run: `pnpm --filter @holyrics-control/server exec node --import tsx --test src/modules/holyrics/config.test.ts`

Expected: FAIL because `config.ts` does not exist yet.

- [ ] **Step 3: Implement config helpers**

Create `config.ts` with:

```ts
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

import type {
  HolyricsConfigSource,
  HolyricsConfigStatus,
  SaveHolyricsConfigRequest
} from "@holyrics-control/shared";

export type HolyricsConfig = {
  baseUrl: string;
  token: string;
};

export type ResolveHolyricsConfigOptions = {
  env?: NodeJS.ProcessEnv;
  configPath?: string;
};

export type ResolvedHolyricsConfig = {
  source: HolyricsConfigSource;
  config: HolyricsConfig | null;
};

const DEFAULT_CONFIG_FILE = ".holyrics-config.json";

export function getHolyricsConfigFilePath(env: NodeJS.ProcessEnv = process.env) {
  return resolve(env.HOLYRICS_CONFIG_FILE ?? DEFAULT_CONFIG_FILE);
}

export function normalizeHolyricsBaseUrl(baseUrl: string) {
  const trimmed = baseUrl.trim();

  if (!trimmed) {
    throw new Error("URL do Holyrics e obrigatoria.");
  }

  const parsed = new URL(trimmed);

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new Error("URL do Holyrics deve usar http ou https.");
  }

  return parsed.toString().replace(/\/$/, "");
}

export function normalizeHolyricsToken(token: string) {
  const trimmed = token.trim();

  if (!trimmed) {
    throw new Error("Token do Holyrics e obrigatorio.");
  }

  return trimmed;
}

export function normalizeHolyricsConfig(input: SaveHolyricsConfigRequest): HolyricsConfig {
  return {
    baseUrl: normalizeHolyricsBaseUrl(input.baseUrl),
    token: normalizeHolyricsToken(input.token)
  };
}

export function maskHolyricsToken(token: string) {
  if (token.length <= 4) {
    return "*".repeat(token.length);
  }

  return `${token.slice(0, 2)}${"*".repeat(Math.max(token.length - 4, 4))}${token.slice(-2)}`;
}

async function readLocalHolyricsConfig(configPath: string): Promise<HolyricsConfig | null> {
  try {
    const raw = JSON.parse(await readFile(configPath, "utf8")) as Partial<HolyricsConfig>;

    if (typeof raw.baseUrl !== "string" || typeof raw.token !== "string") {
      return null;
    }

    return normalizeHolyricsConfig({
      baseUrl: raw.baseUrl,
      token: raw.token
    });
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      return null;
    }

    throw error;
  }
}

export async function resolveHolyricsConfig(
  options: ResolveHolyricsConfigOptions = {}
): Promise<ResolvedHolyricsConfig> {
  const env = options.env ?? process.env;
  const configPath = options.configPath ?? getHolyricsConfigFilePath(env);

  if (env.HOLYRICS_BASE_URL && env.HOLYRICS_TOKEN) {
    return {
      source: "env",
      config: normalizeHolyricsConfig({
        baseUrl: env.HOLYRICS_BASE_URL,
        token: env.HOLYRICS_TOKEN
      })
    };
  }

  const localConfig = await readLocalHolyricsConfig(configPath);

  if (localConfig) {
    return {
      source: "local",
      config: localConfig
    };
  }

  return {
    source: "none",
    config: null
  };
}

export async function getHolyricsConfigStatus(
  options: ResolveHolyricsConfigOptions = {}
): Promise<HolyricsConfigStatus> {
  const resolvedConfig = await resolveHolyricsConfig(options);

  return {
    configured: resolvedConfig.config !== null,
    source: resolvedConfig.source,
    baseUrl: resolvedConfig.config?.baseUrl ?? null,
    tokenConfigured: resolvedConfig.config?.token ? true : false,
    tokenPreview: resolvedConfig.config?.token ? maskHolyricsToken(resolvedConfig.config.token) : null
  };
}

export async function saveLocalHolyricsConfig(
  input: SaveHolyricsConfigRequest,
  options: ResolveHolyricsConfigOptions = {}
) {
  const env = options.env ?? process.env;
  const configPath = options.configPath ?? getHolyricsConfigFilePath(env);
  const config = normalizeHolyricsConfig(input);

  await mkdir(dirname(configPath), { recursive: true });
  await writeFile(configPath, `${JSON.stringify(config, null, 2)}\n`, "utf8");

  return config;
}
```

- [ ] **Step 4: Run tests to verify GREEN**

Run: `pnpm --filter @holyrics-control/server exec node --import tsx --test src/modules/holyrics/config.test.ts`

Expected: PASS.

### Task 3: Server Routes

**Files:**
- Modify: `apps/server/src/modules/holyrics/index.ts`
- Modify: `apps/server/src/index.ts`

- [ ] **Step 1: Register config routes**

`apps/server/src/modules/holyrics/index.ts` should export a Fastify plugin that registers `GET`, `PUT`, and `POST /config/test` under the prefix used by `index.ts`.

- [ ] **Step 2: Register plugin in app**

`apps/server/src/index.ts` should import `holyricsRoutes` and register it with prefix `/api/holyrics`.

- [ ] **Step 3: Build server**

Run: `pnpm --filter @holyrics-control/server build`

Expected: exit code 0.

### Task 4: Settings UI

**Files:**
- Modify: `apps/web/src/pages/SettingsPage.tsx`

- [ ] **Step 1: Replace placeholder with functional form**

Implement loading, configured, error, save, and test states using existing `PageHeader` and `Button` components.

- [ ] **Step 2: Build web**

Run: `pnpm --filter @holyrics-control/web build`

Expected: exit code 0.

### Task 5: Home Status

**Files:**
- Modify: `apps/web/src/pages/HomePage.tsx`

- [ ] **Step 1: Fetch config status**

Show whether the Holyrics integration is configured, using the existing status card.

- [ ] **Step 2: Build web**

Run: `pnpm --filter @holyrics-control/web build`

Expected: exit code 0.

### Task 6: Environment and Ignore Rules

**Files:**
- Modify: `.gitignore`
- Modify: `.env.example`

- [ ] **Step 1: Ignore local config file**

Add `.holyrics-config.json` to `.gitignore`.

- [ ] **Step 2: Document env variables**

Add `HOLYRICS_BASE_URL`, `HOLYRICS_TOKEN`, and `HOLYRICS_CONFIG_FILE` examples to `.env.example`.

### Task 7: Final Verification

**Files:**
- All changed files

- [ ] **Step 1: Run focused server test**

Run: `pnpm --filter @holyrics-control/server exec node --import tsx --test src/modules/holyrics/config.test.ts`

Expected: PASS.

- [ ] **Step 2: Run full build**

Run: `pnpm build`

Expected: exit code 0.

- [ ] **Step 3: Run lint**

Run: `pnpm lint`

Expected: exit code 0.

- [ ] **Step 4: Commit implementation**

```bash
git add .
git commit -m "feat: configure holyrics connection"
```

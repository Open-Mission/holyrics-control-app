# Sidebar Holyrics Connection Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a footer card to the desktop sidebar showing whether the local app server and the configured Holyrics API are reachable.

**Architecture:** Keep Holyrics connectivity checks centralized through the existing Fastify API. The web app will call `GET /api/health` to confirm the local control server is running, then `GET /api/holyrics/config` to confirm configuration exists, then `POST /api/holyrics/config/test` to ask the server to validate Holyrics through `GetTokenInfo`. A small web library will convert those responses into UI states, and a focused sidebar card component will render the status and refresh it.

**Tech Stack:** React 19, React Router 7, Vite, TypeScript, Tailwind CSS 4, lucide-react, Fastify, Node test runner with `tsx`.

---

## File Structure

- Create: `apps/web/src/lib/holyrics-connection.ts`
  - Browser-safe functions for checking local server health and Holyrics connectivity through existing API endpoints.
  - Pure display-state mapping for deterministic tests.
- Create: `apps/web/src/lib/holyrics-connection.test.ts`
  - Unit tests for the status mapping and endpoint decision flow using a fake `fetch`.
- Create: `apps/web/src/components/HolyricsConnectionCard.tsx`
  - Sidebar footer card with status dot, concise state text, base URL/version detail, and refresh icon button.
- Modify: `apps/web/src/components/DesktopSidebar.tsx`
  - Replace the current `Desktop` footer text with `HolyricsConnectionCard`.
- Modify: `apps/web/package.json`
  - Add a `test` script and `tsx` dev dependency for the new web unit test.
- Verify: `pnpm --filter @holyrics-control/web test`, `pnpm --filter @holyrics-control/web build`, `pnpm lint`.

---

## Verification Model

The footer card should distinguish these cases:

- Local app server unavailable:
  - Check: `GET /api/health`.
  - UI state: `Servidor offline`.
- App server available, but Holyrics config missing:
  - Check: `GET /api/holyrics/config`.
  - UI state: `Configurar Holyrics`.
- App server available and config exists, but Holyrics rejects or does not answer:
  - Check: `POST /api/holyrics/config/test`.
  - Backend behavior: `apps/server/src/modules/holyrics/index.ts:90` calls `testHolyricsConfig`, which uses `POST {baseUrl}/api/GetTokenInfo?token={token}`.
  - UI state: `Holyrics indisponivel`.
- App server available and Holyrics validates the token:
  - Check: `POST /api/holyrics/config/test` returns `{ ok: true, version, permissions }`.
  - UI state: `Conectado`.

---

### Task 1: Add Web Connection Status Library

**Files:**
- Create: `apps/web/src/lib/holyrics-connection.ts`

- [ ] **Step 1: Write the connection library**

Create `apps/web/src/lib/holyrics-connection.ts` with:

```ts
import type {
  HealthStatus,
  HolyricsConfigStatus,
  HolyricsConfigTestResult
} from "@holyrics-control/shared";

type ApiError = {
  error?: string;
};

export type HolyricsConnectionStatus =
  | {
      state: "checking";
      message: "Verificando conexao";
      detail: "Consultando servidor local";
    }
  | {
      state: "server-offline";
      message: "Servidor offline";
      detail: string;
    }
  | {
      state: "not-configured";
      message: "Configurar Holyrics";
      detail: "URL e token ainda nao foram definidos";
    }
  | {
      state: "holyrics-offline";
      message: "Holyrics indisponivel";
      detail: string;
      baseUrl: string | null;
    }
  | {
      state: "connected";
      message: "Conectado";
      detail: string;
      baseUrl: string;
      version: string | null;
    };

export type HolyricsConnectionTone = "neutral" | "success" | "warning" | "danger";

export type HolyricsConnectionViewModel = {
  tone: HolyricsConnectionTone;
  label: string;
  detail: string;
  dotClassName: string;
};

const checkingStatus: HolyricsConnectionStatus = {
  state: "checking",
  message: "Verificando conexao",
  detail: "Consultando servidor local"
};

async function readApiError(response: Response) {
  try {
    const payload = (await response.json()) as ApiError;
    return payload.error ?? `HTTP ${response.status}`;
  } catch {
    return `HTTP ${response.status}`;
  }
}

async function readJsonResponse<T>(response: Response) {
  if (!response.ok) {
    throw new Error(await readApiError(response));
  }

  return (await response.json()) as T;
}

function errorDetail(error: unknown, fallback: string) {
  return error instanceof Error && error.message ? error.message : fallback;
}

export function getInitialHolyricsConnectionStatus(): HolyricsConnectionStatus {
  return checkingStatus;
}

export async function fetchHolyricsConnectionStatus(
  fetcher: typeof fetch = fetch
): Promise<HolyricsConnectionStatus> {
  try {
    const healthResponse = await fetcher("/api/health");
    const health = await readJsonResponse<HealthStatus>(healthResponse);

    if (health.status !== "ok") {
      return {
        state: "server-offline",
        message: "Servidor offline",
        detail: "O servidor local nao confirmou o health check"
      };
    }
  } catch (error) {
    return {
      state: "server-offline",
      message: "Servidor offline",
      detail: errorDetail(error, "Nao foi possivel acessar /api/health")
    };
  }

  let config: HolyricsConfigStatus;

  try {
    const configResponse = await fetcher("/api/holyrics/config");
    config = await readJsonResponse<HolyricsConfigStatus>(configResponse);
  } catch (error) {
    return {
      state: "server-offline",
      message: "Servidor offline",
      detail: errorDetail(error, "Nao foi possivel ler /api/holyrics/config")
    };
  }

  if (!config.configured) {
    return {
      state: "not-configured",
      message: "Configurar Holyrics",
      detail: "URL e token ainda nao foram definidos"
    };
  }

  try {
    const testResponse = await fetcher("/api/holyrics/config/test", {
      method: "POST"
    });
    const result = await readJsonResponse<HolyricsConfigTestResult>(testResponse);

    return {
      state: "connected",
      message: "Conectado",
      detail: result.version ? `Holyrics ${result.version}` : "GetTokenInfo validado",
      baseUrl: config.baseUrl ?? "",
      version: result.version
    };
  } catch (error) {
    return {
      state: "holyrics-offline",
      message: "Holyrics indisponivel",
      detail: errorDetail(error, "GetTokenInfo nao respondeu com status ok"),
      baseUrl: config.baseUrl
    };
  }
}

export function getHolyricsConnectionViewModel(
  status: HolyricsConnectionStatus
): HolyricsConnectionViewModel {
  if (status.state === "connected") {
    return {
      tone: "success",
      label: status.message,
      detail: status.detail,
      dotClassName: "bg-emerald-500 shadow-[0_0_0_3px_rgb(16_185_129_/_0.16)]"
    };
  }

  if (status.state === "not-configured") {
    return {
      tone: "warning",
      label: status.message,
      detail: status.detail,
      dotClassName: "bg-amber-500 shadow-[0_0_0_3px_rgb(245_158_11_/_0.16)]"
    };
  }

  if (status.state === "server-offline" || status.state === "holyrics-offline") {
    return {
      tone: "danger",
      label: status.message,
      detail: status.detail,
      dotClassName: "bg-destructive shadow-[0_0_0_3px_rgb(220_38_38_/_0.14)]"
    };
  }

  return {
    tone: "neutral",
    label: status.message,
    detail: status.detail,
    dotClassName: "bg-muted-foreground/55"
  };
}
```

- [ ] **Step 2: Run TypeScript build to verify expected unresolved test script gap only**

Run:

```bash
pnpm --filter @holyrics-control/web build
```

Expected: `tsc -b && vite build` completes successfully.

- [ ] **Step 3: Commit**

```bash
git add apps/web/src/lib/holyrics-connection.ts
git commit -m "feat(web): add Holyrics connection status client"
```

---

### Task 2: Add Unit Tests for Connection Status Decisions

**Files:**
- Create: `apps/web/src/lib/holyrics-connection.test.ts`
- Modify: `apps/web/package.json`

- [ ] **Step 1: Add `tsx` and a web test script**

Run:

```bash
pnpm --filter @holyrics-control/web add -D tsx
```

Expected: `apps/web/package.json` gains `tsx` in `devDependencies` and `pnpm-lock.yaml` is updated.

Then edit `apps/web/package.json` so `scripts` contains:

```json
{
  "dev": "vite --host 0.0.0.0 --port 5173",
  "build": "tsc -b && vite build",
  "preview": "vite preview",
  "lint": "eslint .",
  "test": "node --import tsx --test src/lib/holyrics-connection.test.ts"
}
```

- [ ] **Step 2: Write the failing tests**

Create `apps/web/src/lib/holyrics-connection.test.ts` with:

```ts
import assert from "node:assert/strict";
import { describe, test } from "node:test";

import {
  fetchHolyricsConnectionStatus,
  getHolyricsConnectionViewModel,
  type HolyricsConnectionStatus
} from "./holyrics-connection.js";

function jsonResponse(body: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(body), {
    status: init.status ?? 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
}

function createFetch(responses: Response[]) {
  const calls: Array<[RequestInfo | URL, RequestInit | undefined]> = [];
  const fetcher: typeof fetch = async (input, init) => {
    calls.push([input, init]);
    const response = responses.shift();

    if (!response) {
      throw new Error("Unexpected fetch call");
    }

    return response;
  };

  return { fetcher, calls };
}

describe("Holyrics connection status", () => {
  test("reports connected when health, config, and GetTokenInfo checks pass", async () => {
    const { fetcher, calls } = createFetch([
      jsonResponse({ status: "ok" }),
      jsonResponse({
        configured: true,
        source: "local",
        baseUrl: "http://127.0.0.1:8091",
        tokenConfigured: true,
        tokenPreview: "to*******en"
      }),
      jsonResponse({
        ok: true,
        version: "2.24.0",
        permissions: "GetTokenInfo"
      })
    ]);

    const status = await fetchHolyricsConnectionStatus(fetcher);

    assert.equal(status.state, "connected");
    assert.deepEqual(
      calls.map(([input]) => input),
      ["/api/health", "/api/holyrics/config", "/api/holyrics/config/test"]
    );
    assert.equal(calls[2][1]?.method, "POST");
  });

  test("stops at config when Holyrics is not configured", async () => {
    const { fetcher, calls } = createFetch([
      jsonResponse({ status: "ok" }),
      jsonResponse({
        configured: false,
        source: "none",
        baseUrl: null,
        tokenConfigured: false,
        tokenPreview: null
      })
    ]);

    const status = await fetchHolyricsConnectionStatus(fetcher);

    assert.equal(status.state, "not-configured");
    assert.equal(calls.length, 2);
  });

  test("reports Holyrics offline when config test returns an API error", async () => {
    const { fetcher } = createFetch([
      jsonResponse({ status: "ok" }),
      jsonResponse({
        configured: true,
        source: "env",
        baseUrl: "http://127.0.0.1:8091",
        tokenConfigured: true,
        tokenPreview: "en*******en"
      }),
      jsonResponse({ error: "Holyrics respondeu com HTTP 401." }, { status: 502 })
    ]);

    const status = await fetchHolyricsConnectionStatus(fetcher);

    assert.equal(status.state, "holyrics-offline");
    assert.equal(status.detail, "Holyrics respondeu com HTTP 401.");
  });

  test("reports server offline when the app health check fails", async () => {
    const fetcher: typeof fetch = async () => {
      throw new Error("Failed to fetch");
    };

    const status = await fetchHolyricsConnectionStatus(fetcher);

    assert.equal(status.state, "server-offline");
    assert.equal(status.detail, "Failed to fetch");
  });

  test("maps status states to footer labels and tones", () => {
    const statuses: HolyricsConnectionStatus[] = [
      {
        state: "checking",
        message: "Verificando conexao",
        detail: "Consultando servidor local"
      },
      {
        state: "connected",
        message: "Conectado",
        detail: "Holyrics 2.24.0",
        baseUrl: "http://127.0.0.1:8091",
        version: "2.24.0"
      },
      {
        state: "not-configured",
        message: "Configurar Holyrics",
        detail: "URL e token ainda nao foram definidos"
      },
      {
        state: "holyrics-offline",
        message: "Holyrics indisponivel",
        detail: "Holyrics respondeu com HTTP 401.",
        baseUrl: "http://127.0.0.1:8091"
      }
    ];

    assert.deepEqual(
      statuses.map((status) => getHolyricsConnectionViewModel(status).tone),
      ["neutral", "success", "warning", "danger"]
    );
  });
});
```

- [ ] **Step 3: Run the test and verify it passes**

Run:

```bash
pnpm --filter @holyrics-control/web test
```

Expected: Node's test runner reports all five tests passing.

- [ ] **Step 4: Commit**

```bash
git add apps/web/package.json pnpm-lock.yaml apps/web/src/lib/holyrics-connection.test.ts
git commit -m "test(web): cover Holyrics connection status decisions"
```

---

### Task 3: Add Sidebar Footer Connection Card

**Files:**
- Create: `apps/web/src/components/HolyricsConnectionCard.tsx`
- Modify: `apps/web/src/components/DesktopSidebar.tsx`

- [ ] **Step 1: Create the sidebar card component**

Create `apps/web/src/components/HolyricsConnectionCard.tsx` with:

```tsx
import { RefreshCw, Server, Settings } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import {
  fetchHolyricsConnectionStatus,
  getHolyricsConnectionViewModel,
  getInitialHolyricsConnectionStatus,
  type HolyricsConnectionStatus
} from "@/lib/holyrics-connection";
import { cn } from "@/lib/utils";

const REFRESH_INTERVAL_MS = 30_000;

export function HolyricsConnectionCard() {
  const [status, setStatus] = useState<HolyricsConnectionStatus>(() =>
    getInitialHolyricsConnectionStatus()
  );
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refresh = useCallback(async () => {
    setIsRefreshing(true);

    try {
      setStatus(await fetchHolyricsConnectionStatus());
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    let active = true;

    async function refreshIfActive() {
      setIsRefreshing(true);

      try {
        const nextStatus = await fetchHolyricsConnectionStatus();

        if (active) {
          setStatus(nextStatus);
        }
      } finally {
        if (active) {
          setIsRefreshing(false);
        }
      }
    }

    void refreshIfActive();

    const intervalId = window.setInterval(() => {
      void refreshIfActive();
    }, REFRESH_INTERVAL_MS);

    return () => {
      active = false;
      window.clearInterval(intervalId);
    };
  }, []);

  const viewModel = getHolyricsConnectionViewModel(status);
  const showSettingsLink = status.state === "not-configured";

  return (
    <div className="rounded-lg border border-sidebar-border bg-sidebar-accent/55 p-3 text-sidebar-accent-foreground">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-2.5">
          <span
            aria-hidden="true"
            className={cn("mt-1 size-2.5 shrink-0 rounded-full", viewModel.dotClassName)}
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold leading-5">{viewModel.label}</p>
            <p className="line-clamp-2 text-xs leading-5 text-sidebar-foreground/70">
              {viewModel.detail}
            </p>
          </div>
        </div>
        <Button
          aria-label="Atualizar status da conexao"
          className="size-8 shrink-0 text-sidebar-foreground/70 hover:text-sidebar-foreground"
          disabled={isRefreshing}
          onClick={() => void refresh()}
          size="icon"
          type="button"
          variant="ghost"
        >
          <RefreshCw className={cn("size-4", isRefreshing && "animate-spin")} />
        </Button>
      </div>

      <div className="mt-3 flex items-center justify-between gap-2 text-xs text-sidebar-foreground/60">
        <span className="inline-flex min-w-0 items-center gap-1.5">
          <Server className="size-3.5 shrink-0" />
          <span className="truncate">
            {status.state === "connected" || status.state === "holyrics-offline"
              ? status.baseUrl ?? "URL configurada"
              : "API local"}
          </span>
        </span>

        {showSettingsLink ? (
          <Link
            className="inline-flex shrink-0 items-center gap-1 rounded-md px-1.5 py-1 font-medium text-sidebar-primary transition hover:bg-sidebar-accent"
            to="/settings"
          >
            <Settings className="size-3.5" />
            Ajustes
          </Link>
        ) : null}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Replace the existing sidebar footer text**

Edit `apps/web/src/components/DesktopSidebar.tsx`:

```tsx
import { Radio } from "lucide-react";
import { NavLink, useLocation } from "react-router";

import { HolyricsConnectionCard } from "@/components/HolyricsConnectionCard";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";

import { navItems } from "./nav-items";

export function DesktopSidebar() {
  const location = useLocation();

  return (
    <Sidebar
      className="hidden border-r border-sidebar-border bg-sidebar text-sidebar-foreground md:flex md:h-dvh md:sticky md:top-0"
      collapsible="offcanvas"
    >
      <SidebarHeader className="border-b border-sidebar-border px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
            <Radio aria-hidden="true" className="size-5" strokeWidth={2.2} />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold leading-5">Holyrics Control</p>
            <p className="truncate text-xs text-sidebar-foreground/65">Controle local</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel>Navegacao</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton
                    asChild
                    isActive={
                      item.to === "/" ? location.pathname === "/" : location.pathname.startsWith(item.to)
                    }
                    tooltip={item.label}
                  >
                    <NavLink end={item.to === "/"} to={item.to}>
                      <item.icon aria-hidden="true" className="size-4" strokeWidth={2.2} />
                      <span>{item.label}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border px-3 py-3">
        <HolyricsConnectionCard />
      </SidebarFooter>
    </Sidebar>
  );
}
```

- [ ] **Step 3: Run web test and build**

Run:

```bash
pnpm --filter @holyrics-control/web test
pnpm --filter @holyrics-control/web build
```

Expected: the tests pass and `tsc -b && vite build` completes successfully.

- [ ] **Step 4: Commit**

```bash
git add apps/web/src/components/HolyricsConnectionCard.tsx apps/web/src/components/DesktopSidebar.tsx
git commit -m "feat(web): show Holyrics connection in sidebar"
```

---

### Task 4: Final Verification

**Files:**
- Verify only.

- [ ] **Step 1: Run targeted web test**

Run:

```bash
pnpm --filter @holyrics-control/web test
```

Expected: all `Holyrics connection status` tests pass.

- [ ] **Step 2: Run full build**

Run:

```bash
pnpm build
```

Expected: shared, web, and server builds all complete successfully.

- [ ] **Step 3: Run lint**

Run:

```bash
pnpm lint
```

Expected: ESLint completes with no errors.

- [ ] **Step 4: Manual browser check**

Run:

```bash
pnpm dev
```

Open `http://127.0.0.1:5173` on a desktop-width viewport.

Expected:

- The sidebar footer shows a bordered card, not the old `Desktop` label.
- With no Holyrics config, the card shows `Configurar Holyrics` and an `Ajustes` link.
- With a valid config and Holyrics running, the card shows `Conectado` and the Holyrics version when `GetTokenInfo` returns one.
- With the local app server stopped, the card shows `Servidor offline`.
- With the local app server running but Holyrics stopped or refusing the token, the card shows `Holyrics indisponivel`.
- The refresh icon re-runs the checks without changing the sidebar layout size.

- [ ] **Step 5: Commit verification notes if docs were changed**

No docs commit is required unless implementation adds user-facing documentation. If docs are changed, commit them with:

```bash
git add docs
git commit -m "docs: document Holyrics connection status checks"
```

---

## Self-Review

- Spec coverage: The plan adds a card in the sidebar footer and explains how connectivity is verified through `/api/health`, `/api/holyrics/config`, and `/api/holyrics/config/test`, which delegates to Holyrics `GetTokenInfo`.
- Placeholder scan: The plan contains concrete file paths, code, commands, and expected outcomes.
- Type consistency: `HolyricsConnectionStatus`, `HolyricsConnectionViewModel`, and all imported shared types are defined before use and reused consistently in the component and tests.

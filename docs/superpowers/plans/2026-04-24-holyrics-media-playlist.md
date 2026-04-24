# Holyrics Media Playlist Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mostrar a playlist de mídia do Holyrics na tela de culto, com evento ativo, itens agrupados por títulos, confirmação para apresentar itens executáveis e navegação por seções da letra via `ActionGoToIndex`.

**Architecture:** O server ganha um cliente pequeno para executar ações HTTP do Holyrics usando a configuração existente, e expõe endpoints normalizados para o web. O web consome esses endpoints por helpers testáveis e renderiza a experiência na página `Culto`: evento ativo, lista de mídia, dialog de confirmação para apresentar, e sheet para música com blocos da letra.

**Tech Stack:** Fastify 5, TypeScript, React 19, Vite, Tailwind 4, Radix Dialog via `radix-ui`, Node test runner.

---

## File Structure

- Modify: `packages/shared/src/index.ts`
  - Add shared API contracts for schedule, media playlist, song detail, presentation commands, and normalized API errors.
- Create: `apps/server/src/modules/holyrics/client.ts`
  - Reusable Holyrics action executor that appends `token`, POSTs JSON, validates `status`, and returns `data`.
- Create: `apps/server/src/modules/holyrics/client.test.ts`
  - Unit tests for URL construction, HTTP/API error handling, and unconfigured state.
- Create: `apps/server/src/modules/playlist/service.ts`
  - Server-side normalization of `GetCurrentSchedule`, `GetMediaPlaylist`, `GetLyrics`, `MediaPlaylistAction`, `ShowSong`, and `ActionGoToIndex`.
- Create: `apps/server/src/modules/playlist/service.test.ts`
  - Tests for title grouping, executable item detection, lyrics slide extraction, and action payloads.
- Modify: `apps/server/src/modules/holyrics/index.ts`
  - Register playlist endpoints under `/api/holyrics`.
- Modify: `apps/server/package.json`
  - Add `test` script for server unit tests.
- Create: `apps/web/src/lib/holyrics-playlist.ts`
  - Fetch helpers and view-model helpers for playlist rendering.
- Create: `apps/web/src/lib/holyrics-playlist.test.ts`
  - Tests for API helpers and title grouping labels used by UI.
- Create: `apps/web/src/components/ui/dialog.tsx`
  - Minimal Radix dialog component matching existing shadcn-style components.
- Create: `apps/web/src/components/MediaPlaylistPanel.tsx`
  - List UI for active event and grouped media playlist.
- Create: `apps/web/src/components/PresentationConfirmDialog.tsx`
  - Confirmation modal for presenting executable playlist items.
- Create: `apps/web/src/components/SongSectionsSheet.tsx`
  - Responsive bottom sheet / desktop side sheet with song sections; clicking a block calls `gotoIndex`.
- Modify: `apps/web/src/pages/ServicePage.tsx`
  - Replace placeholder with live playlist UI.
- Modify: `apps/web/package.json`
  - Include the new web test file in the `test` script.

Reference docs already in repo:

- `apps/server/docs/holyrics-api/actions-schedules-history-groups.md`: `GetCurrentSchedule`
- `apps/server/docs/holyrics-api/actions-playlists.md`: `GetMediaPlaylist`, `MediaPlaylistAction`
- `apps/server/docs/holyrics-api/actions-songs-lyrics-texts.md`: `GetLyrics`, `ShowSong`
- `apps/server/docs/holyrics-api/actions-presentation-control.md`: `ActionGoToIndex`
- `apps/server/docs/holyrics-api/classes-content-and-library.md`: `Item`, `Schedule`

---

### Task 1: Shared API Contracts

**Files:**
- Modify: `packages/shared/src/index.ts`

- [ ] **Step 1: Add shared playlist types**

Replace `packages/shared/src/index.ts` with:

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

export type HolyricsMediaPlaylistItemType =
  | "title"
  | "song"
  | "verse"
  | "text"
  | "audio"
  | "video"
  | "image"
  | "file"
  | "announcement"
  | "automatic_presentation"
  | "countdown"
  | "countdown_cp"
  | "cp_text"
  | "plain_text"
  | "uri"
  | "actions"
  | "global_action"
  | "alert"
  | "cp_alert"
  | "theme_background"
  | "api"
  | "script"
  | "module_action"
  | string;

export type HolyricsMediaPlaylistItem = {
  id: string;
  type: HolyricsMediaPlaylistItemType;
  name: string;
  index: number;
  title: string | null;
  executable: boolean;
};

export type HolyricsMediaPlaylistGroup = {
  title: string | null;
  items: HolyricsMediaPlaylistItem[];
};

export type HolyricsActiveSchedule = {
  type: "temporary" | "service" | "event" | string;
  name: string;
  datetime: string | null;
  notes: string;
};

export type HolyricsMediaPlaylistResponse = {
  schedule: HolyricsActiveSchedule | null;
  groups: HolyricsMediaPlaylistGroup[];
  items: HolyricsMediaPlaylistItem[];
};

export type PresentMediaPlaylistItemRequest = {
  id: string;
};

export type PresentSongRequest = {
  id: string;
  initialIndex?: number;
};

export type HolyricsSongSection = {
  index: number;
  name: string;
  tag: string | null;
  text: string;
};

export type HolyricsSongDetail = {
  id: string;
  title: string;
  artist: string;
  author: string;
  key: string;
  bpm: number | null;
  sections: HolyricsSongSection[];
};

export type GoToPresentationIndexRequest = {
  index: number;
};
```

- [ ] **Step 2: Build shared package**

Run:

```bash
pnpm --filter @holyrics-control/shared build
```

Expected: TypeScript build completes without errors and refreshes generated shared outputs.

- [ ] **Step 3: Commit**

```bash
git add packages/shared/src/index.ts packages/shared/src/index.js packages/shared/src/index.d.ts packages/shared/src/index.d.ts.map packages/shared/tsconfig.tsbuildinfo
git commit -m "feat: add Holyrics playlist contracts"
```

---

### Task 2: Holyrics Action Client

**Files:**
- Create: `apps/server/src/modules/holyrics/client.ts`
- Create: `apps/server/src/modules/holyrics/client.test.ts`
- Modify: `apps/server/package.json`

- [ ] **Step 1: Add server test script**

In `apps/server/package.json`, add:

```json
"test": "node --import tsx --test src/**/*.test.ts"
```

Expected scripts block:

```json
"scripts": {
  "dev": "tsx watch src/index.ts",
  "build": "tsc -p tsconfig.json",
  "start": "node dist/index.js",
  "lint": "eslint .",
  "test": "node --import tsx --test src/**/*.test.ts"
}
```

- [ ] **Step 2: Write failing Holyrics client tests**

Create `apps/server/src/modules/holyrics/client.test.ts`:

```ts
import assert from "node:assert/strict";
import { describe, test } from "node:test";

import { executeHolyricsAction } from "./client.js";

function jsonResponse(body: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(body), {
    status: init.status ?? 200,
    headers: { "Content-Type": "application/json" }
  });
}

describe("executeHolyricsAction", () => {
  test("posts action body with configured token", async () => {
    const calls: Array<[RequestInfo | URL, RequestInit | undefined]> = [];
    const fetcher: typeof fetch = async (input, init) => {
      calls.push([input, init]);
      return jsonResponse({ status: "ok", data: [{ id: "abc" }] });
    };

    const data = await executeHolyricsAction("GetMediaPlaylist", { include: true }, {
      fetcher,
      configResolver: async () => ({
        source: "local",
        config: { baseUrl: "http://127.0.0.1:8091", token: "secret token" }
      })
    });

    assert.deepEqual(data, [{ id: "abc" }]);
    assert.equal(String(calls[0][0]), "http://127.0.0.1:8091/api/GetMediaPlaylist?token=secret+token");
    assert.equal(calls[0][1]?.method, "POST");
    assert.equal(calls[0][1]?.body, JSON.stringify({ include: true }));
  });

  test("rejects when Holyrics is not configured", async () => {
    await assert.rejects(
      () =>
        executeHolyricsAction("GetMediaPlaylist", {}, {
          configResolver: async () => ({ source: "none", config: null })
        }),
      /Configure a URL e o token/
    );
  });

  test("maps non-ok HTTP responses to useful errors", async () => {
    await assert.rejects(
      () =>
        executeHolyricsAction("GetMediaPlaylist", {}, {
          fetcher: async () => jsonResponse({ error: "Unauthorized" }, { status: 401 }),
          configResolver: async () => ({
            source: "env",
            config: { baseUrl: "http://localhost:8091", token: "bad" }
          })
        }),
      /Holyrics respondeu com HTTP 401/
    );
  });

  test("maps Holyrics API status errors", async () => {
    await assert.rejects(
      () =>
        executeHolyricsAction("GetMediaPlaylist", {}, {
          fetcher: async () => jsonResponse({ status: "error", error: "Invalid action" }),
          configResolver: async () => ({
            source: "env",
            config: { baseUrl: "http://localhost:8091", token: "token" }
          })
        }),
      /Invalid action/
    );
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run:

```bash
pnpm --filter @holyrics-control/server test -- client.test.ts
```

Expected: FAIL because `./client.js` does not exist.

- [ ] **Step 4: Implement Holyrics client**

Create `apps/server/src/modules/holyrics/client.ts`:

```ts
import { resolveHolyricsConfig, type ResolvedHolyricsConfig } from "./config.js";

type HolyricsActionResponse<T> = {
  status?: unknown;
  data?: T;
  error?: unknown;
};

export type ExecuteHolyricsActionOptions = {
  fetcher?: typeof fetch;
  configResolver?: () => Promise<ResolvedHolyricsConfig>;
};

function errorMessage(error: unknown) {
  if (typeof error === "string" && error.trim()) {
    return error;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Erro inesperado do Holyrics.";
}

export async function executeHolyricsAction<T = unknown>(
  action: string,
  body: Record<string, unknown> = {},
  options: ExecuteHolyricsActionOptions = {}
): Promise<T> {
  const resolvedConfig = await (options.configResolver ?? resolveHolyricsConfig)();

  if (!resolvedConfig.config) {
    throw new Error("Configure a URL e o token do Holyrics antes de acessar a playlist.");
  }

  const requestUrl = new URL(`${resolvedConfig.config.baseUrl}/api/${action}`);
  requestUrl.searchParams.set("token", resolvedConfig.config.token);

  const response = await (options.fetcher ?? fetch)(requestUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    throw new Error(`Holyrics respondeu com HTTP ${response.status}.`);
  }

  const payload = (await response.json()) as HolyricsActionResponse<T>;

  if (payload.status !== "ok") {
    throw new Error(errorMessage(payload.error));
  }

  return payload.data as T;
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run:

```bash
pnpm --filter @holyrics-control/server test -- client.test.ts
```

Expected: PASS for all `executeHolyricsAction` tests.

- [ ] **Step 6: Commit**

```bash
git add apps/server/package.json apps/server/src/modules/holyrics/client.ts apps/server/src/modules/holyrics/client.test.ts
git commit -m "feat: add Holyrics action client"
```

---

### Task 3: Server Playlist Service

**Files:**
- Create: `apps/server/src/modules/playlist/service.ts`
- Create: `apps/server/src/modules/playlist/service.test.ts`

- [ ] **Step 1: Write failing playlist service tests**

Create `apps/server/src/modules/playlist/service.test.ts`:

```ts
import assert from "node:assert/strict";
import { describe, test } from "node:test";

import {
  getHolyricsMediaPlaylist,
  getHolyricsSongDetail,
  goToPresentationIndex,
  presentMediaPlaylistItem,
  presentSong
} from "./service.js";

describe("Holyrics playlist service", () => {
  test("normalizes active schedule media playlist with title groups", async () => {
    const calls: Array<[string, Record<string, unknown>]> = [];
    const playlist = await getHolyricsMediaPlaylist({
      executeAction: async (action, body) => {
        calls.push([action, body]);
        return {
          type: "event",
          name: "Culto Domingo",
          datetime: "2026-04-26 19:00",
          notes: "Santa ceia",
          media_playlist: [
            { id: "t1", type: "title", name: "Abertura" },
            { id: "s1", type: "song", name: "Grandioso Es Tu" },
            { id: "i1", type: "image", name: "aviso.jpg" },
            { id: "t2", type: "title", name: "Palavra" },
            { id: "f1", type: "file", name: "roteiro.pdf" }
          ]
        };
      }
    });

    assert.deepEqual(calls, [["GetCurrentSchedule", {}]]);
    assert.equal(playlist.schedule?.name, "Culto Domingo");
    assert.equal(playlist.items.length, 5);
    assert.equal(playlist.groups[0].title, "Abertura");
    assert.deepEqual(
      playlist.groups[0].items.map((item) => item.name),
      ["Grandioso Es Tu", "aviso.jpg"]
    );
    assert.equal(playlist.items[0].executable, false);
    assert.equal(playlist.items[1].executable, true);
    assert.equal(playlist.items[4].executable, false);
  });

  test("falls back to GetMediaPlaylist when current schedule has no media_playlist", async () => {
    const actions: string[] = [];
    const playlist = await getHolyricsMediaPlaylist({
      executeAction: async (action) => {
        actions.push(action);
        if (action === "GetCurrentSchedule") {
          return null;
        }

        return [{ id: "v1", type: "video", name: "entrada.mp4" }];
      }
    });

    assert.deepEqual(actions, ["GetCurrentSchedule", "GetMediaPlaylist"]);
    assert.equal(playlist.schedule, null);
    assert.equal(playlist.items[0].type, "video");
  });

  test("extracts song sections from lyrics slides", async () => {
    const song = await getHolyricsSongDetail("s1", {
      executeAction: async () => ({
        id: "s1",
        title: "Grandioso Es Tu",
        artist: "Tradicional",
        author: "Autor",
        key: "G",
        bpm: 72,
        slides: [
          { text: "Verso linha 1\nVerso linha 2", description: { name: "Verse 1", tag: "V1" } },
          { text: "Coro linha 1", description: { name: "Chorus", tag: "C" } }
        ]
      })
    });

    assert.equal(song.title, "Grandioso Es Tu");
    assert.deepEqual(
      song.sections.map((section) => [section.index, section.name, section.tag, section.text]),
      [
        [0, "Verse 1", "V1", "Verso linha 1\nVerso linha 2"],
        [1, "Chorus", "C", "Coro linha 1"]
      ]
    );
  });

  test("sends action payloads for presentation commands", async () => {
    const calls: Array<[string, Record<string, unknown>]> = [];
    const executeAction = async (action: string, body: Record<string, unknown>) => {
      calls.push([action, body]);
      return null;
    };

    await presentMediaPlaylistItem("abc", { executeAction });
    await presentSong("s1", 2, { executeAction });
    await goToPresentationIndex(3, { executeAction });

    assert.deepEqual(calls, [
      ["MediaPlaylistAction", { id: "abc" }],
      ["ShowSong", { id: "s1", initial_index: 2 }],
      ["ActionGoToIndex", { index: 3 }]
    ]);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
pnpm --filter @holyrics-control/server test -- service.test.ts
```

Expected: FAIL because `./service.js` does not exist.

- [ ] **Step 3: Implement playlist service**

Create `apps/server/src/modules/playlist/service.ts`:

```ts
import type {
  HolyricsActiveSchedule,
  HolyricsMediaPlaylistItem,
  HolyricsMediaPlaylistResponse,
  HolyricsSongDetail,
  HolyricsSongSection
} from "@holyrics-control/shared";

import { executeHolyricsAction } from "../holyrics/client.js";

type ExecuteAction = <T = unknown>(action: string, body?: Record<string, unknown>) => Promise<T>;

export type HolyricsPlaylistServiceOptions = {
  executeAction?: ExecuteAction;
};

type RawSchedule = {
  type?: unknown;
  name?: unknown;
  datetime?: unknown;
  notes?: unknown;
  media_playlist?: unknown;
};

type RawPlaylistItem = {
  id?: unknown;
  type?: unknown;
  name?: unknown;
};

type RawSong = {
  id?: unknown;
  title?: unknown;
  artist?: unknown;
  author?: unknown;
  key?: unknown;
  bpm?: unknown;
  slides?: unknown;
};

type RawSlide = {
  text?: unknown;
  description?: {
    name?: unknown;
    tag?: unknown;
  };
};

const executableTypes = new Set([
  "song",
  "verse",
  "text",
  "audio",
  "video",
  "image",
  "announcement",
  "automatic_presentation",
  "countdown",
  "countdown_cp",
  "cp_text",
  "plain_text",
  "uri",
  "actions",
  "global_action",
  "alert",
  "cp_alert",
  "theme_background",
  "api",
  "script",
  "module_action"
]);

function asString(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function normalizeSchedule(raw: RawSchedule | null): HolyricsActiveSchedule | null {
  if (!raw) {
    return null;
  }

  return {
    type: asString(raw.type, "temporary"),
    name: asString(raw.name),
    datetime: typeof raw.datetime === "string" && raw.datetime ? raw.datetime : null,
    notes: asString(raw.notes)
  };
}

function normalizeItem(raw: RawPlaylistItem, index: number, title: string | null): HolyricsMediaPlaylistItem {
  const type = asString(raw.type, "unknown");

  return {
    id: asString(raw.id),
    type,
    name: asString(raw.name, asString(raw.id)),
    index,
    title,
    executable: executableTypes.has(type)
  };
}

function normalizePlaylist(rawItems: unknown): HolyricsMediaPlaylistResponse["items"] {
  if (!Array.isArray(rawItems)) {
    return [];
  }

  let currentTitle: string | null = null;

  return rawItems.map((raw, index) => {
    const rawItem = raw as RawPlaylistItem;
    const type = asString(rawItem.type, "unknown");

    if (type === "title") {
      currentTitle = asString(rawItem.name, "Sem titulo");
    }

    return normalizeItem(rawItem, index, type === "title" ? null : currentTitle);
  });
}

function groupPlaylist(items: HolyricsMediaPlaylistItem[]): HolyricsMediaPlaylistResponse["groups"] {
  const groups: HolyricsMediaPlaylistResponse["groups"] = [];

  for (const item of items) {
    if (item.type === "title") {
      continue;
    }

    const lastGroup = groups.at(-1);

    if (!lastGroup || lastGroup.title !== item.title) {
      groups.push({ title: item.title, items: [item] });
    } else {
      lastGroup.items.push(item);
    }
  }

  return groups;
}

function getExecutor(options: HolyricsPlaylistServiceOptions): ExecuteAction {
  return options.executeAction ?? executeHolyricsAction;
}

export async function getHolyricsMediaPlaylist(
  options: HolyricsPlaylistServiceOptions = {}
): Promise<HolyricsMediaPlaylistResponse> {
  const executeAction = getExecutor(options);
  const rawSchedule = await executeAction<RawSchedule | null>("GetCurrentSchedule", {});
  const rawScheduleItems = rawSchedule?.media_playlist;
  const rawItems = Array.isArray(rawScheduleItems)
    ? rawScheduleItems
    : await executeAction<unknown[]>("GetMediaPlaylist", {});
  const items = normalizePlaylist(rawItems);

  return {
    schedule: normalizeSchedule(rawSchedule),
    items,
    groups: groupPlaylist(items)
  };
}

function normalizeSections(rawSlides: unknown): HolyricsSongSection[] {
  if (!Array.isArray(rawSlides)) {
    return [];
  }

  return rawSlides.map((raw, index) => {
    const slide = raw as RawSlide;
    const name = asString(slide.description?.name, `Bloco ${index + 1}`);
    const tag = typeof slide.description?.tag === "string" && slide.description.tag ? slide.description.tag : null;

    return {
      index,
      name,
      tag,
      text: asString(slide.text)
    };
  });
}

export async function getHolyricsSongDetail(
  id: string,
  options: HolyricsPlaylistServiceOptions = {}
): Promise<HolyricsSongDetail> {
  const executeAction = getExecutor(options);
  const rawSong = await executeAction<RawSong | null>("GetLyrics", {
    id,
    fields: "id,title,artist,author,key,bpm,slides"
  });

  if (!rawSong) {
    throw new Error("Musica nao encontrada no Holyrics.");
  }

  return {
    id: asString(rawSong.id, id),
    title: asString(rawSong.title, "Musica sem titulo"),
    artist: asString(rawSong.artist),
    author: asString(rawSong.author),
    key: asString(rawSong.key),
    bpm: typeof rawSong.bpm === "number" ? rawSong.bpm : null,
    sections: normalizeSections(rawSong.slides)
  };
}

export async function presentMediaPlaylistItem(id: string, options: HolyricsPlaylistServiceOptions = {}) {
  await getExecutor(options)("MediaPlaylistAction", { id });
}

export async function presentSong(id: string, initialIndex = 0, options: HolyricsPlaylistServiceOptions = {}) {
  await getExecutor(options)("ShowSong", { id, initial_index: initialIndex });
}

export async function goToPresentationIndex(index: number, options: HolyricsPlaylistServiceOptions = {}) {
  await getExecutor(options)("ActionGoToIndex", { index });
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run:

```bash
pnpm --filter @holyrics-control/server test -- service.test.ts
```

Expected: PASS for all playlist service tests.

- [ ] **Step 5: Commit**

```bash
git add apps/server/src/modules/playlist/service.ts apps/server/src/modules/playlist/service.test.ts
git commit -m "feat: normalize Holyrics media playlist"
```

---

### Task 4: Server Playlist Routes

**Files:**
- Modify: `apps/server/src/modules/holyrics/index.ts`

- [ ] **Step 1: Add route helpers and endpoints**

Modify `apps/server/src/modules/holyrics/index.ts` to import playlist service functions:

```ts
import {
  getHolyricsMediaPlaylist,
  getHolyricsSongDetail,
  goToPresentationIndex,
  presentMediaPlaylistItem,
  presentSong
} from "../playlist/service.js";
```

Add these type guards near `isSaveConfigRequest`:

```ts
function hasStringId(body: unknown): body is { id: string } {
  return typeof body === "object" && body !== null && typeof (body as { id?: unknown }).id === "string";
}

function isPresentSongRequest(body: unknown): body is { id: string; initialIndex?: number } {
  if (!hasStringId(body)) {
    return false;
  }

  const initialIndex = (body as { initialIndex?: unknown }).initialIndex;
  return initialIndex === undefined || (Number.isInteger(initialIndex) && initialIndex >= 0);
}

function isGoToIndexRequest(body: unknown): body is { index: number } {
  return (
    typeof body === "object" &&
    body !== null &&
    Number.isInteger((body as { index?: unknown }).index) &&
    Number((body as { index?: unknown }).index) >= 0
  );
}
```

Inside `holyricsRoutes`, after `/config/test`, add:

```ts
  app.get("/media-playlist", async (_request, reply) => {
    try {
      return await getHolyricsMediaPlaylist();
    } catch (error) {
      return reply.code(502).send({ error: errorMessage(error) });
    }
  });

  app.get<{ Params: { id: string } }>("/songs/:id", async (request, reply) => {
    try {
      return await getHolyricsSongDetail(request.params.id);
    } catch (error) {
      return reply.code(502).send({ error: errorMessage(error) });
    }
  });

  app.post("/media-playlist/present", async (request, reply) => {
    if (!hasStringId(request.body)) {
      return reply.code(400).send({ error: "Informe o ID do item da playlist." });
    }

    try {
      await presentMediaPlaylistItem(request.body.id);
      return { ok: true };
    } catch (error) {
      return reply.code(502).send({ error: errorMessage(error) });
    }
  });

  app.post("/songs/present", async (request, reply) => {
    if (!isPresentSongRequest(request.body)) {
      return reply.code(400).send({ error: "Informe o ID da musica e um indice inicial valido." });
    }

    try {
      await presentSong(request.body.id, request.body.initialIndex ?? 0);
      return { ok: true };
    } catch (error) {
      return reply.code(502).send({ error: errorMessage(error) });
    }
  });

  app.post("/presentation/goto-index", async (request, reply) => {
    if (!isGoToIndexRequest(request.body)) {
      return reply.code(400).send({ error: "Informe um indice de slide valido." });
    }

    try {
      await goToPresentationIndex(request.body.index);
      return { ok: true };
    } catch (error) {
      return reply.code(502).send({ error: errorMessage(error) });
    }
  });
```

- [ ] **Step 2: Run server checks**

Run:

```bash
pnpm --filter @holyrics-control/server test
pnpm --filter @holyrics-control/server build
```

Expected: tests and TypeScript build pass.

- [ ] **Step 3: Commit**

```bash
git add apps/server/src/modules/holyrics/index.ts apps/server/tsconfig.tsbuildinfo
git commit -m "feat: expose Holyrics playlist endpoints"
```

---

### Task 5: Web Playlist API Helpers

**Files:**
- Create: `apps/web/src/lib/holyrics-playlist.ts`
- Create: `apps/web/src/lib/holyrics-playlist.test.ts`
- Modify: `apps/web/package.json`

- [ ] **Step 1: Expand web test script**

In `apps/web/package.json`, change:

```json
"test": "node --import tsx --test src/lib/*.test.ts"
```

- [ ] **Step 2: Write failing web helper tests**

Create `apps/web/src/lib/holyrics-playlist.test.ts`:

```ts
import assert from "node:assert/strict";
import { describe, test } from "node:test";

import {
  fetchHolyricsMediaPlaylist,
  getMediaItemLabel,
  getMediaItemTone,
  presentHolyricsPlaylistItem
} from "./holyrics-playlist.js";

function jsonResponse(body: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(body), {
    status: init.status ?? 200,
    headers: { "Content-Type": "application/json" }
  });
}

describe("Holyrics playlist web helpers", () => {
  test("fetches the media playlist from the server", async () => {
    const calls: Array<[RequestInfo | URL, RequestInit | undefined]> = [];
    const fetcher: typeof fetch = async (input, init) => {
      calls.push([input, init]);
      return jsonResponse({
        schedule: { type: "event", name: "Culto", datetime: null, notes: "" },
        groups: [],
        items: []
      });
    };

    const playlist = await fetchHolyricsMediaPlaylist(fetcher);

    assert.equal(playlist.schedule?.name, "Culto");
    assert.equal(calls[0][0], "/api/holyrics/media-playlist");
  });

  test("posts presentation action with JSON payload", async () => {
    const calls: Array<[RequestInfo | URL, RequestInit | undefined]> = [];
    const fetcher: typeof fetch = async (input, init) => {
      calls.push([input, init]);
      return jsonResponse({ ok: true });
    };

    await presentHolyricsPlaylistItem("abc", fetcher);

    assert.equal(calls[0][0], "/api/holyrics/media-playlist/present");
    assert.equal(calls[0][1]?.method, "POST");
    assert.equal(calls[0][1]?.body, JSON.stringify({ id: "abc" }));
  });

  test("maps item types to labels and tones", () => {
    assert.equal(getMediaItemLabel("song"), "Musica");
    assert.equal(getMediaItemLabel("automatic_presentation"), "Apresentacao");
    assert.equal(getMediaItemLabel("file"), "Arquivo");
    assert.equal(getMediaItemTone("song"), "primary");
    assert.equal(getMediaItemTone("file"), "muted");
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run:

```bash
pnpm --filter @holyrics-control/web test -- holyrics-playlist.test.ts
```

Expected: FAIL because `./holyrics-playlist.js` does not exist.

- [ ] **Step 4: Implement web helpers**

Create `apps/web/src/lib/holyrics-playlist.ts`:

```ts
import type {
  GoToPresentationIndexRequest,
  HolyricsMediaPlaylistItemType,
  HolyricsMediaPlaylistResponse,
  HolyricsSongDetail,
  PresentMediaPlaylistItemRequest,
  PresentSongRequest
} from "@holyrics-control/shared";

type ApiError = {
  error?: string;
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

async function postJson<TBody extends object>(
  url: string,
  body: TBody,
  fetcher: typeof fetch = fetch
) {
  const response = await fetcher(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  await readJsonResponse<{ ok: true }>(response);
}

export async function fetchHolyricsMediaPlaylist(fetcher: typeof fetch = fetch) {
  const response = await fetcher("/api/holyrics/media-playlist");
  return readJsonResponse<HolyricsMediaPlaylistResponse>(response);
}

export async function fetchHolyricsSongDetail(id: string, fetcher: typeof fetch = fetch) {
  const response = await fetcher(`/api/holyrics/songs/${encodeURIComponent(id)}`);
  return readJsonResponse<HolyricsSongDetail>(response);
}

export async function presentHolyricsPlaylistItem(id: string, fetcher: typeof fetch = fetch) {
  await postJson<PresentMediaPlaylistItemRequest>("/api/holyrics/media-playlist/present", { id }, fetcher);
}

export async function presentHolyricsSong(id: string, initialIndex = 0, fetcher: typeof fetch = fetch) {
  await postJson<PresentSongRequest>("/api/holyrics/songs/present", { id, initialIndex }, fetcher);
}

export async function goToHolyricsPresentationIndex(index: number, fetcher: typeof fetch = fetch) {
  await postJson<GoToPresentationIndexRequest>("/api/holyrics/presentation/goto-index", { index }, fetcher);
}

export function getMediaItemLabel(type: HolyricsMediaPlaylistItemType) {
  const labels: Record<string, string> = {
    title: "Titulo",
    song: "Musica",
    verse: "Versiculo",
    text: "Texto",
    audio: "Audio",
    video: "Video",
    image: "Imagem",
    announcement: "Aviso",
    automatic_presentation: "Apresentacao",
    countdown: "Contagem",
    countdown_cp: "Contagem CP",
    cp_text: "Texto CP",
    plain_text: "Texto",
    uri: "Link",
    actions: "Acoes",
    global_action: "Acao global",
    alert: "Alerta",
    cp_alert: "Alerta CP",
    theme_background: "Tema",
    api: "API",
    script: "Script",
    module_action: "Modulo",
    file: "Arquivo"
  };

  return labels[type] ?? type;
}

export function getMediaItemTone(type: HolyricsMediaPlaylistItemType) {
  if (type === "song") {
    return "primary";
  }

  if (type === "video" || type === "image" || type === "audio" || type === "automatic_presentation") {
    return "media";
  }

  return "muted";
}
```

- [ ] **Step 5: Run web helper tests**

Run:

```bash
pnpm --filter @holyrics-control/web test -- holyrics-playlist.test.ts
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add apps/web/package.json apps/web/src/lib/holyrics-playlist.ts apps/web/src/lib/holyrics-playlist.test.ts
git commit -m "feat: add web playlist API helpers"
```

---

### Task 6: Dialog and Playlist UI Components

**Files:**
- Create: `apps/web/src/components/ui/dialog.tsx`
- Create: `apps/web/src/components/PresentationConfirmDialog.tsx`
- Create: `apps/web/src/components/MediaPlaylistPanel.tsx`

- [ ] **Step 1: Create shadcn-style dialog wrapper**

Create `apps/web/src/components/ui/dialog.tsx`:

```tsx
import * as React from "react";
import { X } from "lucide-react";
import { Dialog as DialogPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

function Dialog({ ...props }: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({ ...props }: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({ ...props }: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({ ...props }: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      className={cn(
        "fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )}
      data-slot="dialog-overlay"
      {...props}
    />
  );
}

function DialogContent({ className, children, ...props }: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        className={cn(
          "fixed left-1/2 top-1/2 z-50 grid w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 gap-4 rounded-lg border bg-background p-5 shadow-xl outline-none data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          className
        )}
        data-slot="dialog-content"
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-md p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
          <X className="size-4" />
          <span className="sr-only">Fechar</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("grid gap-1.5 text-left", className)} data-slot="dialog-header" {...props} />;
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)} data-slot="dialog-footer" {...props} />;
}

function DialogTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return <DialogPrimitive.Title className={cn("text-lg font-semibold", className)} data-slot="dialog-title" {...props} />;
}

function DialogDescription({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      className={cn("text-sm leading-6 text-muted-foreground", className)}
      data-slot="dialog-description"
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
};
```

- [ ] **Step 2: Create presentation confirmation dialog**

Create `apps/web/src/components/PresentationConfirmDialog.tsx`:

```tsx
import { Loader2, Play } from "lucide-react";

import type { HolyricsMediaPlaylistItem } from "@holyrics-control/shared";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { getMediaItemLabel } from "@/lib/holyrics-playlist";

type PresentationConfirmDialogProps = {
  item: HolyricsMediaPlaylistItem | null;
  open: boolean;
  pending: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

export function PresentationConfirmDialog({
  item,
  open,
  pending,
  onOpenChange,
  onConfirm
}: PresentationConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Apresentar na tela?</DialogTitle>
          <DialogDescription>
            {item
              ? `Deseja apresentar "${item.name}" agora? Tipo: ${getMediaItemLabel(item.type)}.`
              : "Selecione um item da playlist para apresentar."}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button disabled={pending} onClick={() => onOpenChange(false)} type="button" variant="outline">
            Cancelar
          </Button>
          <Button disabled={!item || pending} onClick={onConfirm} type="button">
            {pending ? <Loader2 className="size-4 animate-spin" /> : <Play className="size-4" />}
            Sim, apresentar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

- [ ] **Step 3: Create media playlist panel**

Create `apps/web/src/components/MediaPlaylistPanel.tsx`:

```tsx
import { CalendarClock, FileX2, Music2, Play, RefreshCw } from "lucide-react";

import type { HolyricsMediaPlaylistItem, HolyricsMediaPlaylistResponse } from "@holyrics-control/shared";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getMediaItemLabel, getMediaItemTone } from "@/lib/holyrics-playlist";

type MediaPlaylistPanelProps = {
  playlist: HolyricsMediaPlaylistResponse | null;
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
  onPresent: (item: HolyricsMediaPlaylistItem) => void;
  onOpenSong: (item: HolyricsMediaPlaylistItem) => void;
};

function formatScheduleDate(value: string | null) {
  if (!value) {
    return "Sem data definida";
  }

  return value;
}

function ItemBadge({ type }: { type: string }) {
  const tone = getMediaItemTone(type);

  return (
    <span
      className={cn(
        "inline-flex h-6 shrink-0 items-center rounded-md border px-2 text-xs font-medium",
        tone === "primary" && "border-primary/25 bg-primary/10 text-primary",
        tone === "media" && "border-emerald-500/20 bg-emerald-500/10 text-emerald-700",
        tone === "muted" && "border-border bg-muted text-muted-foreground"
      )}
    >
      {getMediaItemLabel(type)}
    </span>
  );
}

export function MediaPlaylistPanel({
  playlist,
  loading,
  error,
  onRefresh,
  onPresent,
  onOpenSong
}: MediaPlaylistPanelProps) {
  const hasItems = Boolean(playlist?.items.some((item) => item.type !== "title"));

  return (
    <div className="space-y-4">
      <div className="rounded-lg border bg-card p-4 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-medium text-muted-foreground">Evento ativo</p>
            <h2 className="mt-1 truncate text-xl font-semibold text-card-foreground">
              {playlist?.schedule?.name || "Nenhum evento selecionado"}
            </h2>
            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarClock className="size-4" />
              <span>{formatScheduleDate(playlist?.schedule?.datetime ?? null)}</span>
            </div>
          </div>
          <Button disabled={loading} onClick={onRefresh} size="icon" type="button" variant="outline">
            <RefreshCw className={cn("size-4", loading && "animate-spin")} />
            <span className="sr-only">Atualizar playlist</span>
          </Button>
        </div>
        {playlist?.schedule?.notes ? (
          <p className="mt-3 rounded-md bg-muted px-3 py-2 text-sm leading-6 text-muted-foreground">
            {playlist.schedule.notes}
          </p>
        ) : null}
      </div>

      {error ? (
        <div className="rounded-lg border border-destructive/25 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      {!loading && !hasItems ? (
        <div className="rounded-lg border bg-card p-6 text-center">
          <FileX2 className="mx-auto size-8 text-muted-foreground" />
          <p className="mt-3 text-sm font-medium">Playlist de midia vazia</p>
          <p className="mt-1 text-sm text-muted-foreground">Adicione itens no Holyrics para controlar por aqui.</p>
        </div>
      ) : null}

      <div className="space-y-5">
        {playlist?.groups.map((group, groupIndex) => (
          <section className="space-y-2" key={`${group.title ?? "sem-titulo"}-${groupIndex}`}>
            <h3 className="text-sm font-semibold text-foreground">{group.title ?? "Sem titulo"}</h3>
            <div className="divide-y rounded-lg border bg-card shadow-sm">
              {group.items.map((item) => (
                <div className="flex items-center gap-3 p-3" key={`${item.id}-${item.index}`}>
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                    <Music2 className="size-4" />
                  </div>
                  <button
                    className="min-w-0 flex-1 text-left"
                    onClick={() => (item.type === "song" ? onOpenSong(item) : item.executable ? onPresent(item) : undefined)}
                    type="button"
                  >
                    <p className="truncate text-sm font-medium text-card-foreground">{item.name}</p>
                    <div className="mt-1">
                      <ItemBadge type={item.type} />
                    </div>
                  </button>
                  {item.executable ? (
                    <Button onClick={() => onPresent(item)} size="icon-sm" type="button" variant="outline">
                      <Play className="size-4" />
                      <span className="sr-only">Apresentar {item.name}</span>
                    </Button>
                  ) : null}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Run web build**

Run:

```bash
pnpm --filter @holyrics-control/web build
```

Expected: build passes.

- [ ] **Step 5: Commit**

```bash
git add apps/web/src/components/ui/dialog.tsx apps/web/src/components/PresentationConfirmDialog.tsx apps/web/src/components/MediaPlaylistPanel.tsx
git commit -m "feat: add media playlist UI components"
```

---

### Task 7: Song Sections Sheet

**Files:**
- Create: `apps/web/src/components/SongSectionsSheet.tsx`

- [ ] **Step 1: Create song sections sheet**

Create `apps/web/src/components/SongSectionsSheet.tsx`:

```tsx
import { Loader2, Mic2, Play, SkipForward } from "lucide-react";

import type { HolyricsMediaPlaylistItem, HolyricsSongDetail } from "@holyrics-control/shared";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";

type SongSectionsSheetProps = {
  item: HolyricsMediaPlaylistItem | null;
  song: HolyricsSongDetail | null;
  open: boolean;
  loading: boolean;
  pendingIndex: number | null;
  error: string | null;
  onOpenChange: (open: boolean) => void;
  onPresentSong: () => void;
  onGoToSection: (index: number) => void;
};

export function SongSectionsSheet({
  item,
  song,
  open,
  loading,
  pendingIndex,
  error,
  onOpenChange,
  onPresentSong,
  onGoToSection
}: SongSectionsSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="md:max-w-2xl">
        <SheetHeader>
          <SheetTitle>{song?.title ?? item?.name ?? "Musica"}</SheetTitle>
          <SheetDescription>
            {song
              ? [song.artist, song.author, song.key ? `Tom ${song.key}` : null].filter(Boolean).join(" • ") || "Letra do Holyrics"
              : "Carregando letra do Holyrics"}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-5 pb-5">
          {loading ? (
            <div className="flex min-h-48 items-center justify-center text-sm text-muted-foreground">
              <Loader2 className="mr-2 size-4 animate-spin" />
              Carregando musica
            </div>
          ) : null}

          {error ? (
            <div className="rounded-lg border border-destructive/25 bg-destructive/10 p-4 text-sm text-destructive">
              {error}
            </div>
          ) : null}

          {song ? (
            <div className="space-y-3">
              <Button className="w-full" onClick={onPresentSong} type="button">
                <Play className="size-4" />
                Apresentar musica
              </Button>

              {song.sections.length === 0 ? (
                <div className="rounded-lg border bg-card p-5 text-sm text-muted-foreground">
                  O Holyrics nao retornou secoes para esta musica.
                </div>
              ) : null}

              {song.sections.map((section) => (
                <button
                  className="w-full rounded-lg border bg-card p-4 text-left shadow-sm transition hover:bg-muted/60 focus:outline-none focus:ring-2 focus:ring-ring"
                  key={section.index}
                  onClick={() => onGoToSection(section.index)}
                  type="button"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-2">
                      <Mic2 className="size-4 shrink-0 text-primary" />
                      <p className="truncate text-sm font-semibold text-card-foreground">
                        {section.tag ? `${section.tag} - ${section.name}` : section.name}
                      </p>
                    </div>
                    {pendingIndex === section.index ? (
                      <Loader2 className="size-4 shrink-0 animate-spin text-muted-foreground" />
                    ) : (
                      <SkipForward className="size-4 shrink-0 text-muted-foreground" />
                    )}
                  </div>
                  <p className="mt-3 whitespace-pre-line text-sm leading-6 text-muted-foreground">{section.text}</p>
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </SheetContent>
    </Sheet>
  );
}
```

- [ ] **Step 2: Run web build**

Run:

```bash
pnpm --filter @holyrics-control/web build
```

Expected: build passes.

- [ ] **Step 3: Commit**

```bash
git add apps/web/src/components/SongSectionsSheet.tsx
git commit -m "feat: add song sections sheet"
```

---

### Task 8: Wire Service Page

**Files:**
- Modify: `apps/web/src/pages/ServicePage.tsx`

- [ ] **Step 1: Replace placeholder page with live playlist state**

Replace `apps/web/src/pages/ServicePage.tsx` with:

```tsx
import { useCallback, useEffect, useState } from "react";

import type { HolyricsMediaPlaylistItem, HolyricsMediaPlaylistResponse, HolyricsSongDetail } from "@holyrics-control/shared";

import { HolyricsConnectionIndicator } from "@/components/HolyricsConnectionIndicator";
import { MediaPlaylistPanel } from "@/components/MediaPlaylistPanel";
import { PageHeader } from "@/components/PageHeader";
import { PresentationConfirmDialog } from "@/components/PresentationConfirmDialog";
import { SongSectionsSheet } from "@/components/SongSectionsSheet";
import {
  fetchHolyricsMediaPlaylist,
  fetchHolyricsSongDetail,
  goToHolyricsPresentationIndex,
  presentHolyricsPlaylistItem,
  presentHolyricsSong
} from "@/lib/holyrics-playlist";

const MOBILE_REFRESH_INTERVAL_MS = 60_000;

function getErrorMessage(error: unknown) {
  return error instanceof Error && error.message ? error.message : "Erro inesperado.";
}

export function ServicePage() {
  const [playlist, setPlaylist] = useState<HolyricsMediaPlaylistResponse | null>(null);
  const [playlistLoading, setPlaylistLoading] = useState(true);
  const [playlistError, setPlaylistError] = useState<string | null>(null);
  const [confirmItem, setConfirmItem] = useState<HolyricsMediaPlaylistItem | null>(null);
  const [presenting, setPresenting] = useState(false);
  const [songItem, setSongItem] = useState<HolyricsMediaPlaylistItem | null>(null);
  const [song, setSong] = useState<HolyricsSongDetail | null>(null);
  const [songLoading, setSongLoading] = useState(false);
  const [songError, setSongError] = useState<string | null>(null);
  const [pendingSectionIndex, setPendingSectionIndex] = useState<number | null>(null);

  const loadPlaylist = useCallback(async () => {
    setPlaylistLoading(true);
    setPlaylistError(null);

    try {
      setPlaylist(await fetchHolyricsMediaPlaylist());
    } catch (error) {
      setPlaylistError(getErrorMessage(error));
    } finally {
      setPlaylistLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadPlaylist();
  }, [loadPlaylist]);

  async function handleConfirmPresentation() {
    if (!confirmItem) {
      return;
    }

    setPresenting(true);

    try {
      await presentHolyricsPlaylistItem(confirmItem.id);
      setConfirmItem(null);
    } catch (error) {
      setPlaylistError(getErrorMessage(error));
    } finally {
      setPresenting(false);
    }
  }

  async function handleOpenSong(item: HolyricsMediaPlaylistItem) {
    setSongItem(item);
    setSong(null);
    setSongError(null);
    setSongLoading(true);

    try {
      setSong(await fetchHolyricsSongDetail(item.id));
    } catch (error) {
      setSongError(getErrorMessage(error));
    } finally {
      setSongLoading(false);
    }
  }

  async function handlePresentSong() {
    if (!songItem) {
      return;
    }

    setPresenting(true);

    try {
      await presentHolyricsSong(songItem.id, 0);
    } catch (error) {
      setSongError(getErrorMessage(error));
    } finally {
      setPresenting(false);
    }
  }

  async function handleGoToSection(index: number) {
    setPendingSectionIndex(index);

    try {
      await goToHolyricsPresentationIndex(index);
    } catch (error) {
      setSongError(getErrorMessage(error));
    } finally {
      setPendingSectionIndex(null);
    }
  }

  return (
    <section className="space-y-6">
      <PageHeader
        title="Culto"
        description="Controle a playlist de midia do evento ativo e navegue pelas letras em apresentacao."
      />
      <HolyricsConnectionIndicator refreshIntervalMs={MOBILE_REFRESH_INTERVAL_MS} variant="mini" />
      <MediaPlaylistPanel
        error={playlistError}
        loading={playlistLoading}
        onOpenSong={handleOpenSong}
        onPresent={setConfirmItem}
        onRefresh={loadPlaylist}
        playlist={playlist}
      />
      <PresentationConfirmDialog
        item={confirmItem}
        onConfirm={handleConfirmPresentation}
        onOpenChange={(open) => {
          if (!open) {
            setConfirmItem(null);
          }
        }}
        open={Boolean(confirmItem)}
        pending={presenting}
      />
      <SongSectionsSheet
        error={songError}
        item={songItem}
        loading={songLoading}
        onGoToSection={handleGoToSection}
        onOpenChange={(open) => {
          if (!open) {
            setSongItem(null);
            setSong(null);
            setSongError(null);
          }
        }}
        onPresentSong={handlePresentSong}
        open={Boolean(songItem)}
        pendingIndex={pendingSectionIndex}
        song={song}
      />
    </section>
  );
}
```

- [ ] **Step 2: Run web checks**

Run:

```bash
pnpm --filter @holyrics-control/web test
pnpm --filter @holyrics-control/web build
```

Expected: tests and build pass.

- [ ] **Step 3: Commit**

```bash
git add apps/web/src/pages/ServicePage.tsx
git commit -m "feat: wire media playlist service page"
```

---

### Task 9: Final Verification

**Files:**
- Verify all changed files.

- [ ] **Step 1: Run full build**

Run:

```bash
pnpm build
```

Expected: shared, web, and server builds all pass.

- [ ] **Step 2: Run unit tests**

Run:

```bash
pnpm --filter @holyrics-control/server test
pnpm --filter @holyrics-control/web test
```

Expected: all tests pass.

- [ ] **Step 3: Run lint**

Run:

```bash
pnpm lint
```

Expected: no lint errors.

- [ ] **Step 4: Manual API smoke test with local server**

Start dev servers:

```bash
pnpm dev
```

Then in another terminal, with Holyrics configured:

```bash
curl -s http://127.0.0.1:3000/api/holyrics/media-playlist
```

Expected: JSON with `schedule`, `groups`, and `items`. If Holyrics is not configured, expected HTTP 502 with a JSON `error`.

- [ ] **Step 5: Manual UI smoke test**

Open:

```text
http://127.0.0.1:5173/culto
```

Expected:
- The page shows the active event name and datetime from `GetCurrentSchedule`.
- Title items are shown as section headings; they are not presented directly.
- Executable items show a play icon.
- Clicking a play icon opens a confirmation dialog.
- Clicking "Sim, apresentar" calls `/api/holyrics/media-playlist/present`.
- Clicking a song opens the sheet with song sections.
- Clicking "Apresentar musica" calls `/api/holyrics/songs/present`.
- Clicking a section calls `/api/holyrics/presentation/goto-index` with the section index.

- [ ] **Step 6: Commit final verification fixes if needed**

If verification required any fixes:

```bash
git add <fixed-files>
git commit -m "fix: stabilize media playlist flow"
```

If no fixes were needed, skip this commit.

---

## Self-Review

**Spec coverage:**
- Mostrar media playlist no server: Tasks 2, 3, and 4 add Holyrics action client, normalization service, and HTTP endpoints.
- Mostrar media playlist no web: Tasks 5, 6, 7, and 8 add fetch helpers and UI.
- Mostrar evento ativo: `GetCurrentSchedule` is used in Task 3 and rendered in Task 6.
- Puxar itens de mídia da playlist: Task 3 reads `media_playlist` from current schedule and falls back to `GetMediaPlaylist`.
- Apresentar titles de acordo: Task 3 converts title items into group boundaries; Task 6 renders group headings and does not present title items.
- Mostrar apenas itens que podem ser apresentados: Task 3 marks executable types; Task 6 only shows presentation action for executable items.
- Botão com dialog de confirmação: Task 6 adds `PresentationConfirmDialog`; Task 8 wires it to POST presentation.
- Ao clicar em música abrir bottom sheet/sheet: Task 7 implements responsive sheet; Task 8 opens it for `song`.
- Mostrar música e seções: Task 3 fetches `GetLyrics` with slides; Task 7 renders sections.
- Clicar em bloco muda letra para aquela parte: Tasks 3 and 4 expose `ActionGoToIndex`; Task 8 calls it with the section index.

**Placeholder scan:** No `TBD`, `TODO`, "implement later", or vague "add appropriate" steps remain.

**Type consistency:** Shared request/response names match server routes and web helpers: `PresentMediaPlaylistItemRequest`, `PresentSongRequest`, `GoToPresentationIndexRequest`, `HolyricsMediaPlaylistResponse`, and `HolyricsSongDetail`.

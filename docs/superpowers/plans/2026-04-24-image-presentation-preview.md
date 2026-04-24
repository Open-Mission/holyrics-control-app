# Image Presentation Preview Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the "Item not found" error raised when the user opens an image item from the media playlist, and make the `ImagePresentationSheet` show real previews (up to 640x360) for each slide instead of the 80x45 Holyrics thumbnail — reusing the same Holyrics call for both problems.

**Background / Root cause:** items from the Holyrics media playlist carry only the bare file name (e.g. `IMG-20260412-WA0008.jpg`), never the subfolder (`02 - Agenda/IMG-20260412-WA0008.jpg`). The current server path (`GetImage`/`GetImages` by name) therefore fails for anything inside a subfolder. Because `MediaPlaylistAction` executes the item by its ID (which Holyrics resolves internally), the playlist-action route already works; we pivot to using it as the source of truth and read previews from the presentation that is now active.

**Architecture:**
- Drop the "resolve file path and call `GetImage`/`GetImages`/`GetThumbnail`" flow.
- When the user taps an image item, the server runs `MediaPlaylistAction` (presents the item), then calls `GetCurrentPresentation` with `include_slides=true`, `include_slide_preview=true`, `slide_preview_size="640x360"` and returns the slide list with 640x360 base64 previews.
- The web uses the returned slide list to populate the sheet directly; the state `imagePresentationActive` starts true, and `handleShowImageSlide` just calls `ActionGoToIndex`. The existing "stop presentation on close" behaviour already cleans up when the sheet is dismissed.
- The existing per-file image lookup (`GET /images?...`) becomes unused and is removed.

**Tech Stack:** Fastify (server), React + Vite + TypeScript (web), `@holyrics-control/shared` types, `node --test` with `tsx` for the server tests, `vitest` for the web tests.

---

## File Structure

- **Modify** `packages/shared/src/index.ts`
  - `HolyricsImageSlide` keeps the same field names but `thumbnail` now carries the 640x360 base64 (still nullable). Same shape → web doesn't change its type imports.
  - Add `HolyricsImagePresentationRequest` type for the POST body.
  - Drop the `PresentImageRequest` type only if unused after cleanup (check callers before removing — keep if anything still references it).
- **Modify** `apps/server/src/modules/playlist/service.ts`
  - Replace the body of `getHolyricsImagePresentation(name, options)` with a playlist-driven resolver: accept `{ id }` instead of `name`, call `MediaPlaylistAction` with that id, call `GetCurrentPresentation` with the preview flags, normalize the result into `HolyricsImagePresentation` (index = slide number − 1, name = slide description or presentation name, thumbnail = preview base64).
  - Remove the now-unused `RawImage` type and the `GetImage`/`GetImages`/`GetThumbnail` calls for images.
- **Modify** `apps/server/src/modules/playlist/service.test.ts`
  - Rewrite the two image tests to assert the new `MediaPlaylistAction` + `GetCurrentPresentation` sequence and the normalized slide shape.
- **Modify** `apps/server/src/modules/holyrics/index.ts`
  - Replace `GET /images/:name` with `POST /images/present-and-preview` that accepts `{ id }` in the body and returns the `HolyricsImagePresentation`. The existing `POST /images/present` endpoint is unused by the image sheet after this change — audit it and remove it if nothing else calls it.
- **Modify** `apps/web/src/lib/holyrics-playlist.ts`
  - Replace `fetchHolyricsImagePresentation(name)` with `presentAndPreviewHolyricsImage(id)` that POSTs to the new endpoint and returns the `HolyricsImagePresentation`.
  - Remove `presentHolyricsImage` if nothing else calls it (keep otherwise).
- **Modify** `apps/web/src/lib/holyrics-playlist.test.ts`
  - Rewrite the image test to cover `presentAndPreviewHolyricsImage`.
- **Modify** `apps/web/src/pages/ServicePage.tsx`
  - `handleOpenImage(item)` calls `presentAndPreviewHolyricsImage(item.id)` (the presentation is already active after this call), stores the result, sets `imagePresentationActive=true` from the start.
  - `handleShowImageSlide(index)` always calls `goToHolyricsPresentationIndex(index)` — no more "present on first click" branch.
- **Modify** `apps/web/src/components/ImagePresentationSheet.tsx`
  - Enlarge the preview image (`max-h-[360px] aspect-video object-contain`) so the 640x360 base64 is shown at real size.
  - Keep the fallback icon for null previews.

---

### Task 1: Server — rewrite `getHolyricsImagePresentation` to use MediaPlaylistAction + GetCurrentPresentation (failing tests first)

**Files:**
- Test: `apps/server/src/modules/playlist/service.test.ts`
- Modify: `apps/server/src/modules/playlist/service.ts`

- [ ] **Step 1: Rewrite the failing tests**

Open `apps/server/src/modules/playlist/service.test.ts`. Delete the two existing tests that cover `getHolyricsImagePresentation` (the one titled `"returns a single image preview when playlist item is an image file"` and `"returns folder image previews as a sequence"`). In their place add:

```ts
test("presents the playlist item and returns the current presentation preview", async () => {
  const actions: Array<[string, Record<string, unknown>]> = [];
  const image = await getHolyricsImagePresentation("playlist-item-42", {
    executeAction: async (action, body) => {
      actions.push([action, body ?? {}]);

      if (action === "MediaPlaylistAction") {
        return null;
      }

      if (action === "GetCurrentPresentation") {
        return {
          id: "pres-1",
          type: "image",
          name: "02 - Agenda",
          slide_number: 1,
          total_slides: 2,
          slides: [
            { number: 1, text: "IMG-20260412-WA0008.jpg", preview: "base64-1" },
            { number: 2, text: "IMG-20260412-WA0009.jpg", preview: "base64-2" }
          ]
        };
      }

      return null;
    }
  });

  assert.deepEqual(actions, [
    ["MediaPlaylistAction", { id: "playlist-item-42" }],
    [
      "GetCurrentPresentation",
      {
        include_slides: true,
        include_slide_preview: true,
        slide_preview_size: "640x360"
      }
    ]
  ]);
  assert.equal(image.name, "02 - Agenda");
  assert.deepEqual(image.slides, [
    { index: 0, name: "IMG-20260412-WA0008.jpg", thumbnail: "base64-1", width: null, height: null },
    { index: 1, name: "IMG-20260412-WA0009.jpg", thumbnail: "base64-2", width: null, height: null }
  ]);
});

test("returns an empty slide list when nothing is being presented", async () => {
  const image = await getHolyricsImagePresentation("playlist-item-42", {
    executeAction: async (action) => {
      if (action === "MediaPlaylistAction") {
        return null;
      }
      if (action === "GetCurrentPresentation") {
        return null;
      }
      return null;
    }
  });

  assert.equal(image.name, "");
  assert.deepEqual(image.slides, []);
});
```

Also remove the `presentImage` entry from the test that asserts the full action-payload list (near the top of the file), since `presentImage` is about to be deleted. Find the block:

```ts
await presentMediaPlaylistItem("abc", { executeAction });
await presentSong("s1", 2, { executeAction });
await presentImage("Avisos", { executeAction });
await goToPresentationIndex(3, { executeAction });
await stopPresentation({ executeAction });

assert.deepEqual(calls, [
  ["MediaPlaylistAction", { id: "abc" }],
  ["ShowSong", { id: "s1", initial_index: 2 }],
  ["ShowImage", { file: "Avisos" }],
  ["ActionGoToIndex", { index: 3 }],
  ["CloseCurrentPresentation", {}]
]);
```

Replace with:

```ts
await presentMediaPlaylistItem("abc", { executeAction });
await presentSong("s1", 2, { executeAction });
await goToPresentationIndex(3, { executeAction });
await stopPresentation({ executeAction });

assert.deepEqual(calls, [
  ["MediaPlaylistAction", { id: "abc" }],
  ["ShowSong", { id: "s1", initial_index: 2 }],
  ["ActionGoToIndex", { index: 3 }],
  ["CloseCurrentPresentation", {}]
]);
```

Also remove `presentImage` from the import block at the top of the test file.

- [ ] **Step 2: Run the failing tests**

Run: `pnpm --filter @holyrics-control/server test`
Expected: the two rewritten image tests fail (signature mismatch / old behaviour).

- [ ] **Step 3: Rewrite the service**

In `apps/server/src/modules/playlist/service.ts`:

1. Delete the existing `RawImage` type (around lines 43-49) and the entire `getHolyricsImagePresentation` function (lines 367-443) and `presentImage` function (lines 445-447).
2. Add these types near the other `Raw*` types at the top of the file:

```ts
type RawPresentationSlide = {
  number?: unknown;
  text?: unknown;
  slide_description?: unknown;
  preview?: unknown;
};

type RawCurrentPresentation = {
  id?: unknown;
  type?: unknown;
  name?: unknown;
  slides?: unknown;
};
```

3. Add the new function in place of the deleted one (keep the export position so diffs stay small):

```ts
export async function getHolyricsImagePresentation(
  id: string,
  options: HolyricsPlaylistServiceOptions = {}
): Promise<HolyricsImagePresentation> {
  const executeAction = getExecutor(options);
  await executeAction("MediaPlaylistAction", { id });

  const raw = (await executeAction("GetCurrentPresentation", {
    include_slides: true,
    include_slide_preview: true,
    slide_preview_size: "640x360"
  })) as RawCurrentPresentation | null;

  if (!raw) {
    return { name: "", slides: [] };
  }

  const rawSlides = Array.isArray(raw.slides) ? (raw.slides as RawPresentationSlide[]) : [];

  const slides = rawSlides.map((slide, fallbackIndex) => {
    const number = typeof slide.number === "number" ? slide.number : fallbackIndex + 1;
    const nameSource = asString(slide.slide_description) || asString(slide.text);
    return {
      index: number - 1,
      name: nameSource || `Slide ${number}`,
      thumbnail: typeof slide.preview === "string" && slide.preview.length > 0 ? slide.preview : null,
      width: null,
      height: null
    };
  });

  return {
    name: asString(raw.name),
    slides
  };
}
```

4. Remove the `HolyricsImagePresentation` import only if the above still compiles — it remains used, so keep it.

- [ ] **Step 4: Re-run tests**

Run: `pnpm --filter @holyrics-control/server test`
Expected: all tests pass (including the two rewritten ones and the trimmed presentation-payload test).

- [ ] **Step 5: Commit**

```bash
git add apps/server/src/modules/playlist/service.ts apps/server/src/modules/playlist/service.test.ts
git commit -m "fix(server): resolve image previews via MediaPlaylistAction + GetCurrentPresentation"
```

---

### Task 2: Server — replace the `/images` route with `POST /images/present-and-preview`

**Files:**
- Modify: `apps/server/src/modules/holyrics/index.ts`

- [ ] **Step 1: Replace the image-related routes**

Open `apps/server/src/modules/holyrics/index.ts`. Remove the existing block:

```ts
  app.get<{ Params: { name: string } }>("/images/:name", async (request, reply) => {
    try {
      return await getHolyricsImagePresentation(request.params.name);
    } catch (error) {
      return reply.code(502).send({ error: errorMessage(error) });
    }
  });
```

Also remove the block:

```ts
  app.post("/images/present", async (request, reply) => {
    const file = typeof (request.body as { file?: unknown } | null)?.file === "string"
      ? (request.body as { file: string }).file
      : "";

    if (!file.trim()) {
      // …existing handling…
    }
    // …
  });
```

(Delete the whole `/images/present` handler, including any body-validation helpers inside that block. Leave the other routes untouched.)

Add this new route in the same region where the old image route lived:

```ts
  app.post("/images/present-and-preview", async (request, reply) => {
    if (!hasStringId(request.body)) {
      return reply.code(400).send({ error: "Informe o ID do item da playlist." });
    }

    try {
      return await getHolyricsImagePresentation(request.body.id);
    } catch (error) {
      return reply.code(502).send({ error: errorMessage(error) });
    }
  });
```

- [ ] **Step 2: Update the import block**

Change the import from `../playlist/service.js` to drop `presentImage`:

```ts
import {
  getHolyricsMediaPlaylist,
  getHolyricsImagePresentation,
  getHolyricsSongDetail,
  goToPresentationIndex,
  presentMediaPlaylistItem,
  presentSong,
  stopPresentation
} from "../playlist/service.js";
```

- [ ] **Step 3: Type-check the server**

Run: `pnpm --filter @holyrics-control/server build`
Expected: compiles with no TypeScript errors. If anything else in the server still imports `presentImage`, fix those imports (should be none after Task 1).

- [ ] **Step 4: Commit**

```bash
git add apps/server/src/modules/holyrics/index.ts
git commit -m "feat(server): expose present-and-preview route for image playlist items"
```

---

### Task 3: Web — replace `fetchHolyricsImagePresentation` with `presentAndPreviewHolyricsImage` (failing tests first)

**Files:**
- Test: `apps/web/src/lib/holyrics-playlist.test.ts`
- Modify: `apps/web/src/lib/holyrics-playlist.ts`
- Modify: `packages/shared/src/index.ts`

- [ ] **Step 1: Add the shared request type**

Open `packages/shared/src/index.ts`. Find the `HolyricsImagePresentation` type. Immediately after it, add:

```ts
export type PresentAndPreviewImageRequest = {
  id: string;
};
```

Also, if `PresentImageRequest` is defined in this file and nothing else exports use it after Task 2, remove that type too. Verify by searching the repository before deleting; if any other file still imports `PresentImageRequest`, keep it and add a TODO comment is unnecessary — just keep it. Do not delete speculatively.

Run: `pnpm --filter @holyrics-control/shared build`
Expected: compiles cleanly.

- [ ] **Step 2: Rewrite the client-library test**

Open `apps/web/src/lib/holyrics-playlist.test.ts`. Find the test that currently covers `fetchHolyricsImagePresentation`. Replace it with:

```ts
test("presentAndPreviewHolyricsImage posts the item id and returns the image presentation", async () => {
  const calls: Array<{ url: string; init?: RequestInit }> = [];
  const fetcher: typeof fetch = async (input, init) => {
    calls.push({ url: typeof input === "string" ? input : input.toString(), init });
    return new Response(
      JSON.stringify({
        name: "02 - Agenda",
        slides: [{ index: 0, name: "aviso.jpg", thumbnail: "big-base64", width: null, height: null }]
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  };

  const image = await presentAndPreviewHolyricsImage("playlist-item-42", fetcher);

  assert.equal(calls[0]?.url, "/api/holyrics/images/present-and-preview");
  assert.equal(calls[0]?.init?.method, "POST");
  assert.equal(calls[0]?.init?.headers && (calls[0].init.headers as Record<string, string>)["Content-Type"], "application/json");
  assert.equal(calls[0]?.init?.body, JSON.stringify({ id: "playlist-item-42" }));
  assert.equal(image.name, "02 - Agenda");
  assert.equal(image.slides[0]?.thumbnail, "big-base64");
});
```

Update the imports at the top of the same file, replacing `fetchHolyricsImagePresentation` with `presentAndPreviewHolyricsImage`:

```ts
import {
  fetchHolyricsMediaPlaylist,
  fetchHolyricsSongDetail,
  getImagePresentationIndex,
  getMediaItemLabel,
  getMediaItemTone,
  getSongPresentationIndex,
  goToHolyricsPresentationIndex,
  presentAndPreviewHolyricsImage,
  presentHolyricsPlaylistItem,
  presentHolyricsSong,
  stopHolyricsPresentation
} from "./holyrics-playlist";
```

Also remove any test that asserts `presentHolyricsImage` behaviour (it is being deleted). If no dedicated test covers `presentHolyricsImage`, there is nothing to remove here.

- [ ] **Step 3: Run the failing test**

Run: `pnpm --filter @holyrics-control/web test -- --run src/lib/holyrics-playlist.test.ts`
Expected: the new test fails (`presentAndPreviewHolyricsImage is not exported`).

- [ ] **Step 4: Implement the client changes**

In `apps/web/src/lib/holyrics-playlist.ts`:

1. Update the shared-type import block to drop `PresentImageRequest` (only if the shared file removed it) and add `PresentAndPreviewImageRequest`:

```ts
import type {
  GoToPresentationIndexRequest,
  HolyricsImagePresentation,
  HolyricsMediaPlaylistItemType,
  HolyricsMediaPlaylistResponse,
  HolyricsSongDetail,
  PresentAndPreviewImageRequest,
  PresentMediaPlaylistItemRequest,
  PresentSongRequest
} from "@holyrics-control/shared";
```

2. Remove the old `fetchHolyricsImagePresentation` function and the `presentHolyricsImage` function.

3. Add the new function right where `fetchHolyricsImagePresentation` used to be:

```ts
export async function presentAndPreviewHolyricsImage(id: string, fetcher: typeof fetch = fetch) {
  const response = await fetcher("/api/holyrics/images/present-and-preview", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id } satisfies PresentAndPreviewImageRequest)
  });

  return readJsonResponse<HolyricsImagePresentation>(response);
}
```

- [ ] **Step 5: Re-run lib tests**

Run: `pnpm --filter @holyrics-control/web test -- --run src/lib/holyrics-playlist.test.ts`
Expected: all tests pass.

- [ ] **Step 6: Commit**

```bash
git add apps/web/src/lib/holyrics-playlist.ts apps/web/src/lib/holyrics-playlist.test.ts packages/shared/src/index.ts packages/shared/tsconfig.tsbuildinfo
git commit -m "feat(web): present-and-preview client for image playlist items"
```

---

### Task 4: Web — wire the new client call into `ServicePage`

**Files:**
- Modify: `apps/web/src/pages/ServicePage.tsx`

- [ ] **Step 1: Swap the import**

Replace `fetchHolyricsImagePresentation` with `presentAndPreviewHolyricsImage` in the `@/lib/holyrics-playlist` import block at the top of the file.

- [ ] **Step 2: Rewrite `handleOpenImage`**

Replace the existing function body with:

```ts
async function handleOpenImage(item: HolyricsMediaPlaylistItem) {
  setImageItem(item);
  setImagePresentation(null);
  setImageError(null);
  setImageLoading(true);
  setImagePresentationActive(false);

  try {
    const presentation = await presentAndPreviewHolyricsImage(item.id);
    setImagePresentation(presentation);
    setImagePresentationActive(true);
  } catch (error) {
    setImageError(getErrorMessage(error));
  } finally {
    setImageLoading(false);
  }
}
```

- [ ] **Step 3: Simplify `handleShowImageSlide`**

Replace the existing function body with:

```ts
async function handleShowImageSlide(index: number) {
  if (!imageItem) {
    return;
  }

  setPendingImageIndex(index);
  setImageError(null);

  try {
    await goToHolyricsPresentationIndex(getImagePresentationIndex(index));
  } catch (error) {
    setImageError(getErrorMessage(error));
  } finally {
    setPendingImageIndex(null);
  }
}
```

- [ ] **Step 4: Type-check the web app**

Run: `pnpm --filter @holyrics-control/web build`
Expected: compiles with no TypeScript errors.

- [ ] **Step 5: Commit**

```bash
git add apps/web/src/pages/ServicePage.tsx
git commit -m "feat(web): open image sheet via present-and-preview flow"
```

---

### Task 5: Enlarge the slide preview in `ImagePresentationSheet`

**Files:**
- Modify: `apps/web/src/components/ImagePresentationSheet.tsx`

- [ ] **Step 1: Replace the image/placeholder block**

In `apps/web/src/components/ImagePresentationSheet.tsx`, replace lines 87-97 (the `{thumbnailSrc ? (<img ...>) : (<div ...>)}` ternary) with:

```tsx
{thumbnailSrc ? (
  <img
    alt={slide.name}
    className="aspect-video w-full max-h-[360px] bg-muted object-contain"
    loading="lazy"
    src={thumbnailSrc}
  />
) : (
  <div className="flex aspect-video w-full max-h-[360px] items-center justify-center bg-muted text-muted-foreground">
    <ImageIcon className="size-8" />
  </div>
)}
```

- [ ] **Step 2: Manual verification**

If a dev server is available:
1. Run `pnpm --filter @holyrics-control/server dev` and `pnpm --filter @holyrics-control/web dev`.
2. In the web app, open an image playlist item whose file lives in a subfolder (e.g. `02 - Agenda/IMG-20260412-WA0008.jpg`).
3. Confirm the sheet opens without the "Item not found" error and each slide card renders a clearly visible 640x360 preview.
4. Click a slide card and confirm the projector/Holyrics advances to that slide.

If the dev server cannot be started in this environment, say so explicitly in the final report.

- [ ] **Step 3: Commit**

```bash
git add apps/web/src/components/ImagePresentationSheet.tsx
git commit -m "feat(web): show full-size image previews in presentation sheet"
```

---

## Self-Review

- **Spec coverage:** Task 1 eliminates the "Item not found" error by never relying on file-path lookup; Tasks 2-4 plumb the new id-based call through server and web; Task 5 surfaces the 640x360 preview in the UI. Both user asks are covered.
- **Placeholder scan:** each step contains exact code, file paths, commands and expected output.
- **Type consistency:** `HolyricsImagePresentation.slides[]` still carries `{ index, name, thumbnail, width, height }` (thumbnail now holds 640x360 base64 instead of 80x45). The web types and UI consume the same shape — no renames downstream. `PresentAndPreviewImageRequest` is introduced once in `shared` and consumed once in the web client.
- **Dead-code risk:** `presentImage` / `presentHolyricsImage` / the `PresentImageRequest` type are removed as part of their tasks; each step explicitly checks for remaining imports before deleting.

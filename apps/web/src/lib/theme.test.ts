import assert from "node:assert/strict";
import { test } from "node:test";

import {
  applyTheme,
  getStoredTheme,
  isThemeMode,
  resolveTheme,
  setStoredTheme,
  THEME_STORAGE_KEY,
  type ThemeMode
} from "./theme";

function createWindowMock(prefersDark: boolean) {
  return {
    matchMedia: () => ({
      matches: prefersDark
    })
  } as unknown as Pick<Window, "matchMedia">;
}

function createDocumentMock() {
  const classes = new Set<string>();
  const root = {
    classList: {
      toggle: (className: string, enabled?: boolean) => {
        if (enabled) {
          classes.add(className);
        } else {
          classes.delete(className);
        }
      }
    },
    dataset: {} as Record<string, string>,
    style: {} as Record<string, string>
  };

  return {
    classes,
    document: {
      documentElement: root
    } as unknown as Pick<Document, "documentElement">,
    root
  };
}

test("theme mode guard only accepts supported modes", () => {
  assert.equal(isThemeMode("light"), true);
  assert.equal(isThemeMode("dark"), true);
  assert.equal(isThemeMode("system"), true);
  assert.equal(isThemeMode("auto"), false);
  assert.equal(isThemeMode(null), false);
});

test("resolveTheme follows system preference only for system mode", () => {
  assert.equal(resolveTheme("light", createWindowMock(true)), "light");
  assert.equal(resolveTheme("dark", createWindowMock(false)), "dark");
  assert.equal(resolveTheme("system", createWindowMock(true)), "dark");
  assert.equal(resolveTheme("system", createWindowMock(false)), "light");
});

test("stored theme falls back to system for missing or invalid values", () => {
  const storage = {
    value: null as string | null,
    getItem: () => storage.value,
    setItem: (_key: string, value: string) => {
      storage.value = value;
    }
  };

  assert.equal(getStoredTheme(storage), "system");
  storage.value = "dark";
  assert.equal(getStoredTheme(storage), "dark");
  storage.value = "invalid";
  assert.equal(getStoredTheme(storage), "system");

  setStoredTheme("light", storage);
  assert.equal(storage.value, "light");
});

test("applyTheme updates html class, data attribute, and color scheme", () => {
  const { classes, document, root } = createDocumentMock();

  const resolvedDark = applyTheme("system", document, createWindowMock(true));

  assert.equal(resolvedDark, "dark");
  assert.equal(classes.has("dark"), true);
  assert.equal(root.dataset.theme, "system");
  assert.equal(root.style.colorScheme, "dark");

  const resolvedLight = applyTheme("light", document, createWindowMock(true));

  assert.equal(resolvedLight, "light");
  assert.equal(classes.has("dark"), false);
  assert.equal(root.dataset.theme, "light");
  assert.equal(root.style.colorScheme, "light");
});

test("theme storage uses the expected key", () => {
  const writes: Array<[string, ThemeMode]> = [];

  setStoredTheme("dark", {
    setItem: (key, value) => {
      writes.push([key, value as ThemeMode]);
    }
  });

  assert.deepEqual(writes, [[THEME_STORAGE_KEY, "dark"]]);
});

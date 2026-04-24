export type ThemeMode = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

export const THEME_STORAGE_KEY = "holyrics-control-theme";

export function isThemeMode(value: string | null): value is ThemeMode {
  return value === "light" || value === "dark" || value === "system";
}

export function getSystemTheme(targetWindow: Pick<Window, "matchMedia"> = window): ResolvedTheme {
  return targetWindow.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function resolveTheme(mode: ThemeMode, targetWindow: Pick<Window, "matchMedia"> = window): ResolvedTheme {
  return mode === "system" ? getSystemTheme(targetWindow) : mode;
}

export function getStoredTheme(storage: Pick<Storage, "getItem"> = window.localStorage): ThemeMode {
  try {
    const storedTheme = storage.getItem(THEME_STORAGE_KEY);
    return isThemeMode(storedTheme) ? storedTheme : "system";
  } catch {
    return "system";
  }
}

export function setStoredTheme(mode: ThemeMode, storage: Pick<Storage, "setItem"> = window.localStorage) {
  try {
    storage.setItem(THEME_STORAGE_KEY, mode);
  } catch {
    // Ignore unavailable storage, for example in private browsing modes.
  }
}

export function applyTheme(
  mode: ThemeMode,
  targetDocument: Pick<Document, "documentElement"> = document,
  targetWindow: Pick<Window, "matchMedia"> = window
) {
  const resolvedTheme = resolveTheme(mode, targetWindow);
  const root = targetDocument.documentElement;

  root.classList.toggle("dark", resolvedTheme === "dark");
  root.dataset.theme = mode;
  root.style.colorScheme = resolvedTheme;

  return resolvedTheme;
}

export function initializeTheme() {
  return applyTheme(getStoredTheme());
}

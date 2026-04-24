import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";

import { ThemeContext } from "@/components/theme-context";
import {
  applyTheme,
  getStoredTheme,
  resolveTheme,
  setStoredTheme,
  type ResolvedTheme,
  type ThemeMode
} from "@/lib/theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>(() => getStoredTheme());
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() => resolveTheme(getStoredTheme()));

  useEffect(() => {
    function syncTheme() {
      setResolvedTheme(applyTheme(theme));
    }

    syncTheme();

    if (theme !== "system") {
      return undefined;
    }

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", syncTheme);

    return () => {
      media.removeEventListener("change", syncTheme);
    };
  }, [theme]);

  const setTheme = useCallback((nextTheme: ThemeMode) => {
    setStoredTheme(nextTheme);
    setThemeState(nextTheme);
  }, []);

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme
    }),
    [resolvedTheme, setTheme, theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

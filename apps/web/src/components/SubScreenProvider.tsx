import { useCallback, useMemo, useState } from "react";
import type { ReactNode } from "react";

import { SubScreenContext } from "@/components/sub-screen-context";

type SubScreenProviderProps = {
  children: ReactNode;
};

export function SubScreenProvider({ children }: SubScreenProviderProps) {
  const [content, setContent] = useState<ReactNode | null>(null);
  const [title, setTitle] = useState("");

  const isOpen = content !== null;

  const openSubScreen = useCallback((newTitle: string, newContent: ReactNode) => {
    setTitle(newTitle);
    setContent(newContent);
  }, []);

  const closeSubScreen = useCallback(() => {
    setContent(null);
    setTitle("");
  }, []);

  const value = useMemo(
    () => ({ content, title, isOpen, openSubScreen, closeSubScreen }),
    [content, title, isOpen, openSubScreen, closeSubScreen]
  );

  return (
    <SubScreenContext.Provider value={value}>
      {children}
    </SubScreenContext.Provider>
  );
}

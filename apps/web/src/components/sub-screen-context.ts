import { createContext, useContext } from "react";
import type { ReactNode } from "react";

export type SubScreenState = {
  content: ReactNode | null;
  title: string;
  isOpen: boolean;
  openSubScreen: (title: string, content: ReactNode) => void;
  closeSubScreen: () => void;
};

export const SubScreenContext = createContext<SubScreenState | null>(null);

export function useSubScreen() {
  const context = useContext(SubScreenContext);

  if (!context) {
    throw new Error("useSubScreen must be used within a SubScreenProvider.");
  }

  return context;
}

import { X } from "lucide-react";

import { useSubScreen } from "@/components/sub-screen-context";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";

export function SubScreenPanel() {
  const { content, title, isOpen, closeSubScreen } = useSubScreen();
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={(open) => { if (!open) closeSubScreen(); }}>
        <SheetContent className="h-dvh max-h-dvh">
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
            <SheetDescription className="sr-only">Sub-tela de conteúdo</SheetDescription>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto">
            {content}
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  if (!isOpen) {
    return null;
  }

  return (
    <aside className="sub-screen-panel hidden w-[var(--sub-screen-width)] shrink-0 border-l border-border bg-background md:flex md:flex-col">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <h2 className="truncate text-base font-semibold text-foreground">{title}</h2>
        <button
          className="flex size-7 items-center justify-center rounded-md text-muted-foreground transition hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          onClick={closeSubScreen}
          type="button"
        >
          <X className="size-4" />
          <span className="sr-only">Fechar</span>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {content}
      </div>
    </aside>
  );
}

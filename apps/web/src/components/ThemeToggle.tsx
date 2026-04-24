import { Monitor, Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useTheme } from "@/components/theme-context";
import { cn } from "@/lib/utils";
import type { ThemeMode } from "@/lib/theme";

const options: Array<{
  value: ThemeMode;
  label: string;
  icon: typeof Sun;
}> = [
  {
    value: "light",
    label: "Tema claro",
    icon: Sun
  },
  {
    value: "dark",
    label: "Tema escuro",
    icon: Moon
  },
  {
    value: "system",
    label: "Tema do sistema",
    icon: Monitor
  }
];

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  return (
    <div
      aria-label="Selecionar tema"
      className={cn("inline-flex rounded-md border bg-card p-0.5 shadow-sm", className)}
      role="radiogroup"
    >
      {options.map((option) => {
        const Icon = option.icon;
        const active = theme === option.value;

        return (
          <Tooltip key={option.value}>
            <TooltipTrigger asChild>
              <Button
                aria-checked={active}
                aria-label={option.label}
                className={cn(
                  "size-8 text-muted-foreground hover:text-foreground",
                  active && "bg-primary text-primary-foreground shadow-xs hover:bg-primary hover:text-primary-foreground"
                )}
                onClick={() => setTheme(option.value)}
                role="radio"
                size="icon-sm"
                type="button"
                variant="ghost"
              >
                <Icon aria-hidden="true" className="size-4" strokeWidth={2.2} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{option.label}</TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
}

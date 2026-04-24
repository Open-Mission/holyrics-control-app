import { Image as ImageIcon, MonitorOff, RectangleEllipsis } from "lucide-react";

import type {
  HolyricsPresentationModifierKey,
  HolyricsPresentationModifiers
} from "@holyrics-control/shared";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type MediaPresentationControlsProps = {
  modifiers: HolyricsPresentationModifiers;
  disabled?: boolean;
  pendingKey?: HolyricsPresentationModifierKey | null;
  onToggle: (key: HolyricsPresentationModifierKey, enable: boolean) => void;
};

const buttons: Array<{
  key: HolyricsPresentationModifierKey;
  label: string;
  icon: typeof ImageIcon;
}> = [
  { key: "wallpaper", label: "Mostrar logo", icon: ImageIcon },
  { key: "blank", label: "Tela vazia", icon: RectangleEllipsis },
  { key: "black", label: "Ocultar tela", icon: MonitorOff }
];

export function MediaPresentationControls({
  modifiers,
  disabled = false,
  pendingKey = null,
  onToggle
}: MediaPresentationControlsProps) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
      {buttons.map((button) => {
        const Icon = button.icon;
        const active = modifiers[button.key];
        const pending = pendingKey === button.key;

        return (
          <Button
            className={cn(active && "border-primary bg-primary/10 text-primary")}
            disabled={disabled || pending}
            key={button.key}
            onClick={() => onToggle(button.key, !active)}
            type="button"
            variant="outline"
          >
            <Icon className="size-4" />
            {button.label}
          </Button>
        );
      })}
    </div>
  );
}

import { Home, MonitorPlay, Settings, SlidersHorizontal } from "lucide-react";
import { NavLink } from "react-router";

import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "Início", icon: Home },
  { to: "/culto", label: "Culto", icon: MonitorPlay },
  { to: "/admin", label: "Admin", icon: SlidersHorizontal },
  { to: "/settings", label: "Ajustes", icon: Settings }
];

export function MobileBottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t bg-background/94 px-3 pb-[max(env(safe-area-inset-bottom),0.75rem)] pt-2 backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-4 gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              cn(
                "flex h-14 flex-col items-center justify-center gap-1 rounded-md text-xs font-medium text-muted-foreground transition-colors",
                isActive && "bg-primary text-primary-foreground shadow-sm"
              )
            }
          >
            <item.icon aria-hidden="true" className="h-5 w-5" strokeWidth={2.2} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

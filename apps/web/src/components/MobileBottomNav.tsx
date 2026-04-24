import { NavLink } from "react-router";

import { cn } from "@/lib/utils";
import { navItems, menuNavItem } from "@/components/nav-items";

export function MobileBottomNav() {
  const displayItems = [
    navItems[0], // Inicio
    navItems[1], // Culto
    menuNavItem, // Menu (includes Media, Admin, Settings)
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t bg-background/94 px-3 pb-[max(env(safe-area-inset-bottom),0.75rem)] pt-2 backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-3 gap-1">
        {displayItems.map((item) => (
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

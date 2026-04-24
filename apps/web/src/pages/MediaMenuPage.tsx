import { NavLink } from "react-router";
import { ChevronRight } from "lucide-react";

import { PageHeader } from "@/components/PageHeader";
import { mediaItems, navItems } from "@/components/nav-items";
import { cn } from "@/lib/utils";

export function MediaMenuPage() {
  const allMenuItems = [
    ...mediaItems,
    navItems[2], // Admin
    navItems[3], // Ajustes
  ];

  return (
    <div className="flex min-h-[calc(100dvh-160px)] flex-col gap-6">
      <PageHeader title="Menu" description="Gerencie as mídias e conteúdos do Holyrics" />
      
      <div className="grid flex-1 content-start gap-2">
        {allMenuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                "flex items-center justify-between rounded-lg border bg-card p-4 text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
                isActive && "bg-accent"
              )
            }
          >
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                <item.icon className="size-5" />
              </div>
              <span className="font-medium">{item.label}</span>
            </div>
            <ChevronRight className="size-5 text-muted-foreground" />
          </NavLink>
        ))}
      </div>
    </div>
  );
}

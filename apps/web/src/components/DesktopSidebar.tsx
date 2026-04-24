import { Radio } from "lucide-react";
import { NavLink, useLocation } from "react-router";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";

import { HolyricsConnectionCard } from "./HolyricsConnectionCard";
import { navItems } from "./nav-items";

export function DesktopSidebar() {
  const location = useLocation();

  return (
    <Sidebar
      className="hidden border-r border-sidebar-border bg-sidebar text-sidebar-foreground md:flex md:h-dvh"
      collapsible="offcanvas"
    >
      <SidebarHeader className="border-b border-sidebar-border px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
            <Radio aria-hidden="true" className="size-5" strokeWidth={2.2} />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold leading-5">Holyrics Control</p>
            <p className="truncate text-xs text-sidebar-foreground/65">Controle local</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel>Navegacao</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton
                    asChild
                    isActive={
                      item.to === "/" ? location.pathname === "/" : location.pathname.startsWith(item.to)
                    }
                    tooltip={item.label}
                  >
                    <NavLink end={item.to === "/"} to={item.to}>
                      <item.icon aria-hidden="true" className="size-4" strokeWidth={2.2} />
                      <span>{item.label}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border px-3 py-3">
        <HolyricsConnectionCard />
      </SidebarFooter>
    </Sidebar>
  );
}

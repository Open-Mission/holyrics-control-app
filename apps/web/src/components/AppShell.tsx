import { Outlet } from "react-router";

import { DesktopSidebar } from "@/components/DesktopSidebar";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { SubScreenPanel } from "@/components/SubScreenPanel";
import { SubScreenProvider } from "@/components/SubScreenProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export function AppShell() {
  return (
    <SidebarProvider>
      <SubScreenProvider>
        <div className="min-h-dvh bg-transparent text-foreground">
          <div className="md:flex md:min-h-dvh">
            <DesktopSidebar />
            <div className="flex min-w-0 flex-1">
              <main className="mx-auto flex min-h-dvh w-full min-w-0 flex-1 flex-col px-4 pb-28 pt-5 sm:px-6 sm:pb-8 md:mx-0 md:max-w-none md:px-8 md:pb-10 lg:px-10">
                <div className="mx-auto w-full">
                  <div className="flex items-center justify-end pb-3 md:justify-between">
                    <SidebarTrigger className="hidden text-muted-foreground md:inline-flex" />
                    <ThemeToggle />
                  </div>
                  <Outlet />
                </div>
              </main>
              <SubScreenPanel />
            </div>
          </div>
          <MobileBottomNav />
        </div>
      </SubScreenProvider>
    </SidebarProvider>
  );
}

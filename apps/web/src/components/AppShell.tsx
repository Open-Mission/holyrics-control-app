import { Outlet } from "react-router";

import { MobileBottomNav } from "@/components/MobileBottomNav";

export function AppShell() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <main className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col px-4 pb-28 pt-5 sm:px-6 sm:pb-8">
        <Outlet />
      </main>
      <MobileBottomNav />
    </div>
  );
}

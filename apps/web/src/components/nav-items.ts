import { Home, MonitorPlay, Settings, SlidersHorizontal } from "lucide-react";

export const navItems = [
  { to: "/", label: "Inicio", icon: Home },
  { to: "/culto", label: "Culto", icon: MonitorPlay },
  { to: "/admin", label: "Admin", icon: SlidersHorizontal },
  { to: "/settings", label: "Ajustes", icon: Settings }
] as const;

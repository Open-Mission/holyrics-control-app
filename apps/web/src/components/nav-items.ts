import {
  FileText,
  Home,
  Image,
  LayoutGrid,
  MonitorPlay,
  Music,
  Settings,
  SlidersHorizontal,
  Video
} from "lucide-react";

export const navItems = [
  { to: "/", label: "Inicio", icon: Home },
  { to: "/culto", label: "Culto", icon: MonitorPlay },
  { to: "/admin", label: "Admin", icon: SlidersHorizontal },
  { to: "/settings", label: "Ajustes", icon: Settings }
] as const;

export const mediaItems = [
  { to: "/musicas", label: "Musicas", icon: Music },
  { to: "/imagens", label: "Imagens", icon: Image },
  { to: "/videos", label: "Videos", icon: Video },
  { to: "/arquivos", label: "Arquivos", icon: FileText }
] as const;

export const menuNavItem = { to: "/menu", label: "Menu", icon: LayoutGrid } as const;

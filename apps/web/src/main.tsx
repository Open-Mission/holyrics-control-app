import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import { AppShell } from "@/components/AppShell";
import { ThemeProvider } from "@/components/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AdminPage } from "@/pages/AdminPage";
import { FilesPage } from "@/pages/FilesPage";
import { HomePage } from "@/pages/HomePage";
import { ImagesPage } from "@/pages/ImagesPage";
import { MediaMenuPage } from "@/pages/MediaMenuPage";
import { ServicePage } from "@/pages/ServicePage";
import { SettingsPage } from "@/pages/SettingsPage";
import { SongsPage } from "@/pages/SongsPage";
import { VideosPage } from "@/pages/VideosPage";
import { initializeTheme } from "@/lib/theme";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "culto",
        element: <ServicePage />
      },
      {
        path: "musicas",
        element: <SongsPage />
      },
      {
        path: "imagens",
        element: <ImagesPage />
      },
      {
        path: "videos",
        element: <VideosPage />
      },
      {
        path: "arquivos",
        element: <FilesPage />
      },
      {
        path: "menu",
        element: <MediaMenuPage />
      },
      {
        path: "admin",
        element: <AdminPage />
      },
      {
        path: "settings",
        element: <SettingsPage />
      }
    ]
  }
]);

initializeTheme();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <TooltipProvider>
        <RouterProvider router={router} />
      </TooltipProvider>
    </ThemeProvider>
  </StrictMode>
);

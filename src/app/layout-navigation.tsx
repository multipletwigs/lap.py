"use client";

import { usePathname } from "next/navigation";
import { ContentRailNavigation } from "../components/navigation/content-rail";
import { ThemeSwitcher, TimeWidget, SpotifyWidget } from "../components/widgets/user-info";
import { MobileSidebar } from "@/components/mobile-sidebar";

export function LayoutNavigation() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <nav className={isHomePage ? "" : "mb-2 lg:mb-8"}>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-4">
        <div className="fixed bottom-6 left-4 right-4 z-50 lg:static lg:w-full lg:shadow-none pointer-events-none">
          <div className="pointer-events-auto shadow-2xl lg:shadow-none rounded-xl w-full">
            <ContentRailNavigation
              label="Navigate"
              className="bg-background backdrop-blur-md border-border/50 lg:bg-background/40 lg:backdrop-blur-none lg:border-border/40"
            >
              <div className="flex items-center gap-2 pl-2">
                <SpotifyWidget />
                <div className="hidden lg:block"><TimeWidget /></div>
                <ThemeSwitcher />
                <div className="lg:hidden"><MobileSidebar /></div>
              </div>
            </ContentRailNavigation>
          </div>
        </div>
      </div>
    </nav>
  );
}


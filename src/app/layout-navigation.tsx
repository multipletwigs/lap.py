"use client";

import { usePathname } from "next/navigation";
import { ContentRailNavigation } from "../components/navigation/content-rail";
import { ThemeSwitcher, TimeWidget, SpotifyWidget } from "../components/widgets/user-info";

export function LayoutNavigation() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <nav className={isHomePage ? "" : "mb-2 lg:mb-8"}>
      {/* Mobile Header Row */}
      <div className="flex lg:hidden items-center justify-between mb-4">
        <h1 className="font-playfair font-bold text-xl tracking-tight">nightly.ink</h1>
        <div className="flex items-center gap-2">
          <div className="scale-90">
            <ThemeSwitcher />
          </div>
        </div>
      </div>

      <div className="flex flex-row lg:items-center lg:justify-between gap-4 lg:gap-4">
        {/* Content Rail - Order 2 on mobile (below spotify), Order 1 on desktop */}
        <div className="w-fit overflow-x-auto scrollbar-hidden -mx-4 px-4 lg:mx-0 lg:px-0 order-2 lg:order-1">
          <ContentRailNavigation label="Navigate" />
        </div>

        {/* Widgets - Order 1 on mobile (top), Order 2 on desktop */}
        <div className="flex items-center gap-2 order-1 lg:order-2 min-w-0 overflow-hidden">
          <SpotifyWidget />
          <div className="hidden lg:block"><TimeWidget /></div>
          <div className="hidden lg:block"><ThemeSwitcher /></div>
        </div>
      </div>
    </nav>
  );
}

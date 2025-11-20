"use client";

import { usePathname } from "next/navigation";
import { ContentRailNavigation } from "../components/navigation/content-rail";
import { ThemeSwitcher, TimeWidget, SpotifyWidget } from "../components/widgets/user-info";

export function LayoutNavigation() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <nav className={isHomePage ? "" : "m-4 lg:m-0 lg:mb-8"}>
      <div className="flex items-center justify-between gap-4">
        <div className="max-w-fit overflow-x-auto scrollbar-hidden -mx-4 px-4 lg:mx-0 lg:px-0">
          <ContentRailNavigation label="Navigate" />
        </div>
        <div className="hidden lg:flex items-center gap-2">
          <SpotifyWidget />
          <TimeWidget />
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
}

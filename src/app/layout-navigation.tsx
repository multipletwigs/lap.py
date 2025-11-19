"use client";

import { usePathname } from "next/navigation";
import { ContentRailNavigation } from "../components/navigation/content-rail";
import { TimeWidget } from "../components/widgets/user-info";

export function LayoutNavigation() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <nav className={isHomePage ? "" : "mb-8"}>
      <div className="flex items-center justify-between gap-4">
        <div className="max-w-fit">
          <ContentRailNavigation label="Navigate" />
        </div>
        <div className="flex items-center gap-2">
          <TimeWidget />
        </div>
      </div>
    </nav>
  );
}

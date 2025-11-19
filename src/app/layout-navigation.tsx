"use client";

import { usePathname } from "next/navigation";
import { ContentRailNavigation } from "../components/navigation/content-rail";

export function LayoutNavigation() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <nav className={isHomePage ? "" : "mb-8"}>
      <ContentRailNavigation label="Navigate" />
    </nav>
  );
}

"use client";

import { usePathname } from "next/navigation";
import { LayoutNavigation } from "./layout-navigation";

export function LayoutNavigationWrapper() {
  const pathname = usePathname();
  
  return <LayoutNavigation pathname={pathname} />;
}

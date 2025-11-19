"use client";

import Link from "next/link";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import NavBarCopy from "./labels";
import { cn } from "../../lib/utils";

export type ContentRailNavItem = {
  href: string;
  text: string;
  description?: string;
};

interface ContentRailNavigationProps {
  label?: string;
  description?: string;
  items?: ContentRailNavItem[];
  className?: string;
}

export function ContentRailNavigation({
  label = "Browse",
  description = "Jump between the core spaces of this site without leaving the story.",
  items,
  className,
}: ContentRailNavigationProps) {
  const pathname = usePathname();
  const currentSection = `/${pathname.split("/")[1] ?? ""}`;

  const navigationItems = useMemo(() => {
    if (items?.length) return items;

    return Object.values(NavBarCopy)
      .map((item) => item.link)
      .filter((link): link is NonNullable<typeof link> => Boolean(link));
  }, [items]);

  if (!navigationItems.length) return null;

  return (
    <section
      aria-label="Primary content navigation"
      className={cn(
        "rounded-xl border border-border/40 bg-background/40 px-3 py-3 flex flex-row items-center gap-3",
        className
      )}
    >
      <div className="flex flex-wrap gap-1.5">
        {navigationItems.map((item) => {
          const isActive = currentSection === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "inline-flex items-center rounded-md px-2.5 py-1 text-xs transition-all duration-150",
                isActive
                  ? "bg-foreground/10 text-foreground font-medium"
                  : "text-muted-foreground/80 hover:text-foreground hover:bg-foreground/5"
              )}
            >
              {item.text}
            </Link>
          );
        })}
      </div>
    </section>
  );
}

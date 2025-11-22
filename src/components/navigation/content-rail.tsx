"use client";

import { Link } from "next-view-transitions";
import { useMemo, useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
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
  children?: React.ReactNode;
}

export function ContentRailNavigation({
  items,
  className,
  children,
}: ContentRailNavigationProps) {
  const pathname = usePathname();
  const currentSection = `/${pathname.split("/")[1] ?? ""}`;

  const containerRef = useRef<HTMLDivElement>(null);
  const [activeRect, setActiveRect] = useState({ x: 0, y: 0, width: 0, height: 0, opacity: 0 });

  const navigationItems = useMemo(() => {
    if (items?.length) return items;

    return Object.values(NavBarCopy)
      .map((item) => item.link)
      .filter((link): link is NonNullable<typeof link> => Boolean(link));
  }, [items]);

  useEffect(() => {
    const updateRect = () => {
      requestAnimationFrame(() => {
        if (!containerRef.current) return;
        const activeEl = containerRef.current.querySelector(`[data-active="true"]`) as HTMLElement;

        if (activeEl) {
          const containerRect = containerRef.current.getBoundingClientRect();
          const itemRect = activeEl.getBoundingClientRect();

          setActiveRect({
            x: itemRect.left - containerRect.left,
            y: itemRect.top - containerRect.top,
            width: itemRect.width,
            height: itemRect.height,
            opacity: 1
          });
        } else {
          setActiveRect(prev => ({ ...prev, opacity: 0 }));
        }
      });
    };

    // Run initially
    updateRect();

  }, [pathname]);

  if (!navigationItems.length) return null;

  return (
    <section
      aria-label="Primary content navigation"
      className={cn(
        "relative w-full rounded-xl border border-border/40 bg-background/40 p-2 flex flex-row items-center justify-between gap-3 isolate overflow-hidden",
        className
      )}
    >
      <div className="overflow-x-auto scrollbar-hidden -my-2 py-2 -ml-2 pl-2 mask-linear-fade">
        <div ref={containerRef} className="relative flex flex-nowrap gap-1.5 pr-4">
          {/* Animated background indicator */}
          <motion.div
            className="absolute rounded-md bg-foreground/10 pointer-events-none"
            initial={false}
            animate={{
              x: activeRect.x,
              y: activeRect.y,
              width: activeRect.width,
              height: activeRect.height,
              opacity: activeRect.opacity
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 35,
              mass: 0.6,
              velocity: 2
            }}
          />

          {/* Navigation items */}
          {navigationItems.map((item) => {
            const isActive = currentSection === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                data-active={isActive}
                className={cn(
                  "relative inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium whitespace-nowrap transition-colors duration-100 z-10 active:scale-[0.97]",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground/60 hover:text-muted-foreground active:text-foreground"
                )}
                prefetch={true}
              >
                {item.text}
              </Link>
            );
          })}
        </div>
      </div>

      {children && (
        <div className="flex items-center gap-2 pl-2 shrink-0">
          {children}
        </div>
      )}
    </section>
  );
}

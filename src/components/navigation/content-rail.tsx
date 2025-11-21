"use client";

import { Link } from "next-view-transitions";
import { useMemo, useState, useEffect, useRef, useLayoutEffect } from "react";
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

// Safe usage of useLayoutEffect to avoid SSR warnings
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function ContentRailNavigation({
  items,
  className,
  children,
}: ContentRailNavigationProps) {
  const pathname = usePathname();
  const currentSection = `/${pathname.split("/")[1] ?? ""}`;

  const containerRef = useRef<HTMLDivElement>(null);
  const [activeRect, setActiveRect] = useState({ top: 0, height: 0, left: 0, width: 0, opacity: 0 });

  const navigationItems = useMemo(() => {
    if (items?.length) return items;

    return Object.values(NavBarCopy)
      .map((item) => item.link)
      .filter((link): link is NonNullable<typeof link> => Boolean(link));
  }, [items]);

  useIsomorphicLayoutEffect(() => {
    const updateRect = () => {
      if (!containerRef.current) return;

      // Find the active element using the data attribute
      const activeEl = containerRef.current.querySelector(`[data-active="true"]`) as HTMLElement;

      if (activeEl) {
        // Calculate positions relative to the container
        const containerRect = containerRef.current.getBoundingClientRect();
        const itemRect = activeEl.getBoundingClientRect();

        setActiveRect({
          top: itemRect.top - containerRect.top,
          height: itemRect.height,
          left: itemRect.left - containerRect.left,
          width: itemRect.width,
          opacity: 1
        });
      } else {
        setActiveRect(prev => ({ ...prev, opacity: 0 }));
      }
    };

    // Run initially
    updateRect();

    // Add resize listener
    window.addEventListener('resize', updateRect);

    // Use ResizeObserver for more robust size change detection
    const resizeObserver = new ResizeObserver(updateRect);
    if (containerRef.current === null) return;
    resizeObserver.observe(containerRef.current);

    return () => {
      window.removeEventListener('resize', updateRect);
      resizeObserver.disconnect();
    };
  }, [pathname, navigationItems]);

  if (!navigationItems.length) return null;

  const containerWidth = containerRef.current?.offsetWidth || 0;
  const containerHeight = containerRef.current?.offsetHeight || 0;

  // Calculate inset values for clip-path
  const insetTop = activeRect.top;
  const insetRight = containerWidth - (activeRect.left + activeRect.width);
  const insetBottom = containerHeight - (activeRect.top + activeRect.height);
  const insetLeft = activeRect.left;

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
          {/* Base Layer (Inactive State) */}
          {navigationItems.map((item) => {
            const isActive = currentSection === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                data-active={isActive}
                className="inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium text-muted-foreground/60 hover:text-muted-foreground transition-colors duration-200 whitespace-nowrap"
              >
                {item.text}
              </Link>
            );
          })}

          {/* Active Layer (Active State + Background) - Masked by clip-path */}
          <motion.div
            className="absolute inset-0 flex flex-nowrap gap-1.5 pointer-events-none bg-foreground/10 text-foreground z-10"
            initial={false}
            animate={{
              clipPath: `inset(${insetTop}px ${insetRight}px ${insetBottom}px ${insetLeft}px round 6px)`
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              mass: 1
            }}
            style={{ opacity: activeRect.opacity }}
          >
            {navigationItems.map((item) => (
              <span
                key={item.href}
                className="inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium whitespace-nowrap"
              >
                {item.text}
              </span>
            ))}
          </motion.div>
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

"use client";

import { Sidebar } from "../app/sidebar";
import { Drawer } from "vaul";
import { Button } from "./ui/button";
import { Flower2, SmileIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface MobileSidebarProps {
  className?: string;
}

export function MobileSidebar({ className }: MobileSidebarProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Open drawer on first visit
  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisitedBefore');
    if (!hasVisited) {
      setOpen(true);
      localStorage.setItem('hasVisitedBefore', 'true');
    }
  }, []);

  // Close drawer when path changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      <Drawer.Trigger asChild>
        <button
          className="inline-flex items-center justify-center rounded-lg w-8 h-8 bg-background/60 border border-border/50 text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <SmileIcon className="w-4 h-4" />
          <span className="sr-only">Open Menu</span>
        </button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50" />
        <Drawer.Content className="bg-background flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0 z-50 outline-none">
          <div className="p-4 bg-background rounded-t-[10px] flex-1 overflow-y-auto">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-muted mb-8" />
            <div className="max-w-md mx-auto px-2">
              <Sidebar />
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}


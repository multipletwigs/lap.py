"use client";

import { Sidebar } from "../app/sidebar";
import { Drawer } from "vaul";
import { Button } from "./ui/button";
import { Flower2 } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export function MobileSidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close drawer when path changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      <Drawer.Trigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="lg:hidden fixed bottom-6 right-6 h-14 w-14 rounded-2xl shadow-xl z-50 bg-background/80 backdrop-blur-sm border-border text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:-translate-y-1 active:translate-y-0 active:scale-95"
        >
          <Flower2 className="w-6 h-6" />
          <span className="sr-only">Open Menu</span>
        </Button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50" />
        <Drawer.Content className="bg-background flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0 z-50 outline-none">
          <div className="p-4 bg-background rounded-t-[10px] flex-1 overflow-y-auto">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-muted mb-8" />
            <div className="max-w-md mx-auto h-full px-2">
              <Sidebar />
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

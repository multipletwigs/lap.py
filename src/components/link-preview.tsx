"use client";

import React, { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Drawer } from "vaul";
import { AnimatePresence, motion, HTMLMotionProps } from "framer-motion";
import { X, ExternalLink, Loader2, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "usehooks-ts";

interface LinkPreviewProps extends HTMLMotionProps<"a"> {
  children: React.ReactNode;
  className?: string;
  href: string;
}

// List of domains that are known to block iframes
const BLOCKED_DOMAINS = [
  "dev.to",
  "github.com",
  "twitter.com",
  "x.com",
  "linkedin.com",
  "youtube.com",
  "youtu.be",
  "facebook.com",
  "instagram.com",
  "vercel.com",
  "nextjs.org",
  "kiyotaka.ai",
  "monash.edu",
];

export function LinkPreview({
  children,
  href,
  className,
  ...props
}: LinkPreviewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const hostname = href ? new URL(href).hostname : "";
  const isBlocked = BLOCKED_DOMAINS.some((domain) => hostname.includes(domain));

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
    }
  }, [isOpen, href]);

  if (!href) {
    return <span className={className}>{children}</span>;
  }

  const PreviewContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header - Arc Style */}
        <div className={cn("flex items-center justify-between px-4 py-3 border-b", isMobile ? "border-border" : "border-white/20 dark:border-white/10")}>
          {/* Simple URL Display */}
          <div className="flex items-center justify-center flex-1 mx-4">
            <div className="px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 text-xs font-medium text-muted-foreground/70 truncate max-w-[300px] text-center">
              {hostname}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 absolute right-4">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-muted-foreground"
              title="Open in new tab"
            >
              <ArrowUpRight className="h-4 w-4" />
            </a>
            {!isMobile ? (
              <Dialog.Close asChild>
                <button className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-muted-foreground">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </button>
              </Dialog.Close>
            ) : (
              <Drawer.Close asChild>
                <button className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-muted-foreground">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </button>
              </Drawer.Close>
            )}
          </div>
        </div>

        {/* Iframe Area */}
        <div className={cn("flex-1 w-full h-full relative", !isMobile ? "bg-white/50 dark:bg-black/20 p-2" : "bg-background")}>
          <div className={cn("w-full h-full overflow-hidden relative", !isMobile ? "bg-white dark:bg-neutral-950 shadow-inner rounded-xl border border-black/5 dark:border-white/5" : "bg-background")}>
            {isBlocked ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-white dark:bg-neutral-950 text-center p-8">
                <div className="rounded-full bg-muted p-4 mb-4">
                  <ArrowUpRight className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Preview Unavailable</h3>
                <p className="text-muted-foreground text-sm mb-6 max-w-md">
                  This website ({hostname}) does not allow embedding. You can open it in a new tab.
                </p>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity text-sm font-medium"
                >
                  Open Website <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            ) : (
              <>
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center z-10 bg-white dark:bg-neutral-950">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground/50" />
                  </div>
                )}
                <iframe
                  src={href}
                  className="w-full h-full border-0"
                  onLoad={() => setIsLoading(false)}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );

  if (isDesktop) {
    return (
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Trigger asChild>
          <motion.a
            href={href}
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(true);
            }}
            className={cn("cursor-pointer inline-block", className)}
            layoutId={`link-${href}`}
            {...props}
          >
            {children}
          </motion.a>
        </Dialog.Trigger>
        <AnimatePresence mode="wait">
          {isOpen && (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
                  onClick={() => setIsOpen(false)}
                />
              </Dialog.Overlay>
              <Dialog.Content asChild>
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center"
                  onClick={(e) => {
                    if (e.target === e.currentTarget) {
                      setIsOpen(false);
                    }
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="relative w-[95vw] h-[85vh] max-w-6xl overflow-hidden rounded-xl border bg-white/80 dark:bg-neutral-900/80 shadow-2xl backdrop-blur-xl"
                  >
                    <PreviewContent />
                  </motion.div>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    );
  }

  return (
    <Drawer.Root open={isOpen} onOpenChange={setIsOpen}>
      <Drawer.Trigger asChild>
        <motion.a
          href={href}
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(true);
          }}
          className={cn("cursor-pointer inline-block", className)}
          layoutId={`link-${href}`}
          {...props}
        >
          {children}
        </motion.a>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-black/40" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 mt-24 flex h-[95vh] flex-col rounded-t-[10px] bg-background outline-none">
          <div className="flex-1 overflow-hidden relative bg-background rounded-t-[10px]">
            <div className="absolute top-0 left-0 right-0 z-20 flex justify-center pt-4 pb-2 bg-background">
              <div className="h-1.5 w-12 rounded-full bg-muted" />
            </div>
            <div className="h-full pt-8">
              <PreviewContent isMobile={true} />
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

"use client";

import * as React from "react";
import { CheckIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ToggleModes: Record<
  string,
  {
    name: string;
    themeName: string;
  }
> = {
  light: {
    name: "Light",
    themeName: "light",
  },
  dark: {
    name: "Dark",
    themeName: "dark",
  },
  system: {
    name: "System",
    themeName: "system",
  },
};

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover:outline hover:bg-none"
        >
          <SunIcon className="h-[1rem] w-[1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1em] w-[1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {Object.keys(ToggleModes).map((key, idx) => {
          return (
            <DropdownMenuItem
              key={key + idx}
              onClick={() => setTheme(ToggleModes[key].themeName)}
              className="flex flex-row gap-2"
            >
              {ToggleModes[key].name}
              {theme === ToggleModes[key].themeName ? <CheckIcon /> : <></>}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function SimpleToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-foreground/5 hover:bg-foreground/10 transition-colors"
      style={{ fontSize: 'clamp(12px, 1.1vw, 13px)', fontWeight: 400 }}
    >
      <div className="flex items-center gap-1.5">
        <SunIcon className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="text-muted-foreground">Light</span>
      </div>
      <div 
        className={`relative w-9 h-5 rounded-full transition-colors ${
          isDark ? 'bg-foreground/20' : 'bg-foreground/10'
        }`}
      >
        <div 
          className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-foreground transition-transform ${
            isDark ? 'translate-x-4' : 'translate-x-0'
          }`}
        />
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-muted-foreground">Dark</span>
        <MoonIcon className="h-3.5 w-3.5 text-muted-foreground" />
      </div>
    </button>
  );
}

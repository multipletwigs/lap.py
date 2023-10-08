"use client";

import * as React from "react";
import {
  CheckIcon,
  MoonIcon,
  SunIcon,
  ThickArrowUpIcon,
} from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect } from "react";

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

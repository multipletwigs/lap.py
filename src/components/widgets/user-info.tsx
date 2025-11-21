"use client";

import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { Clock, Sun, CloudSun, CloudRain, CloudSnow, Cloud, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import Image from "next/image";
import { DiscordLogoIcon } from "@radix-ui/react-icons";

interface SpotifyData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImageUrl?: string;
  songUrl?: string;
}

export function SpotifyWidget() {
  const [data, setData] = useState<SpotifyData>({ isPlaying: false });

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const response = await fetch("/api/spotify");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching Spotify data:", error);
      }
    };

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!data.isPlaying) {
    return (
      <>
        {/* Mobile View: Icon Dropdown */}
        <div className="lg:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <div className="inline-flex items-center justify-center rounded-lg w-8 h-8 bg-background/60 border border-border/50 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuItem disabled>
                Zach is currently not playing anything
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Desktop View: Full Pill (Gray) */}
        <div className="hidden lg:inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm bg-background/60 border border-border/50 text-muted-foreground font-medium animate-in fade-in slide-in-from-right-2 duration-500 delay-300 max-w-[300px]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-muted-foreground shrink-0">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
          <span className="truncate text-muted-foreground text-xs">
            Zach is currently not playing anything
          </span>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Mobile View: Icon Dropdown */}
      <div className="lg:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <div className="inline-flex items-center justify-center rounded-lg w-8 h-8 bg-background/60 border border-border/50 text-foreground hover:bg-accent hover:text-accent-foreground transition-colors animate-in fade-in slide-in-from-right-2 duration-500 delay-300">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-green-600 dark:text-green-400 shrink-0">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <div className="p-3">
              <div className="flex gap-3">
                {data.albumImageUrl && (
                  <img
                    src={data.albumImageUrl}
                    alt={data.album || "Album cover"}
                    className="w-16 h-16 rounded-md object-cover shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-muted-foreground mb-1">Listening to</div>
                  <div className="font-medium text-sm truncate">{data.title}</div>
                  <div className="text-xs text-muted-foreground truncate">{data.artist}</div>
                </div>
              </div>
              <Link
                href={data.songUrl || "#"}
                target="_blank"
                className="text-[10px] text-green-600 dark:text-green-400 hover:underline mt-3 block"
              >
                Open in Spotify ↗
              </Link>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Desktop View: Full Pill */}
      <Link
        href={data.songUrl || "#"}
        target="_blank"
        className="hidden lg:inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm bg-background/60 border border-border/50 text-foreground font-medium animate-in fade-in slide-in-from-right-2 duration-500 delay-300 hover:bg-accent hover:text-accent-foreground transition-colors max-w-[300px]"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-green-600 dark:text-green-400 shrink-0">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
        </svg>
        <span className="truncate">
          Zach is listening to <span className="font-bold">{data.title}</span>
        </span>
      </Link>
    </>
  );
}


export function TimeWidget() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!time) return null;

  return (
    <div className="inline-flex items-center gap-2 text-xs rounded-lg px-3 py-2 bg-background/60 border border-border/50 text-foreground font-medium animate-in fade-in slide-in-from-right-2 duration-500">
      {time}
    </div>
  );
}

export function ThemeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    const isDark = resolvedTheme === "dark";
    const newTheme = isDark ? "light" : "dark";

    // @ts-ignore
    if (!document.startViewTransition) {
      setTheme(newTheme);
      return;
    }

    document.documentElement.classList.add("theme-transition");

    // @ts-ignore
    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setTheme(newTheme);
      });
    });

    transition.finished.then(() => {
      document.documentElement.classList.remove("theme-transition");
    });
  };

  return (
    <button
      onClick={toggleTheme}
      className="inline-flex items-center justify-center rounded-lg w-8 h-8 bg-background/60 border border-border/50 text-foreground hover:bg-accent hover:text-accent-foreground transition-colors animate-in fade-in slide-in-from-right-2 duration-500 delay-200"
    >
      {resolvedTheme === "dark" ? (
        <Moon className="w-4 h-4" />
      ) : (
        <Sun className="w-4 h-4" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}

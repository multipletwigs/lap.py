"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon, ExternalLinkIcon } from "@radix-ui/react-icons";

interface SpotifyData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImageUrl?: string;
  songUrl?: string;
  playlistName?: string;
  playlistUrl?: string;
  durationMs?: number;
  progressMs?: number;
  releaseDate?: string;
}

export function NowPlaying() {
  const [data, setData] = useState<SpotifyData>({ isPlaying: false });
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastSongRef = useRef<string | null>(null);

  const formatTime = (ms?: number) => {
    if (!ms) return "0:00";
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const formatYear = (date?: string) => {
    if (!date) return "";
    return new Date(date).getFullYear();
  };

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const response = await fetch("/api/spotify");
        const result = await response.json();
        setData(result);

        // If song changed, reset progress
        if (result.isPlaying && result.title !== lastSongRef.current) {
          lastSongRef.current = result.title;
          setCurrentProgress(result.progressMs || 0);
        }
      } catch (error) {
        console.error("Error fetching Spotify data:", error);
      }
    };

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 30000);

    return () => clearInterval(interval);
  }, []);

  // Update progress every second
  useEffect(() => {
    if (data?.isPlaying && data.durationMs) {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }

      progressIntervalRef.current = setInterval(() => {
        setCurrentProgress((prev) => {
          const next = prev + 1000;
          return next >= (data.durationMs || 0) ? data.durationMs || 0 : next;
        });
      }, 1000);

      return () => {
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
        }
      };
    }
  }, [data?.isPlaying, data?.durationMs]);

  return (
    <motion.div
      layout
      transition={{
        type: "spring",
        bounce: 0.35,
        stiffness: 260,
        damping: 20,
      }}
      style={{ borderRadius: 12 }}
      className="bg-foreground/5 border border-border/40 overflow-hidden"
    >
      {!data.isPlaying ? (
        <a
          href="https://open.spotify.com/user/bashtwigs"
          target="_blank"
          rel="noopener noreferrer"
          className="block p-4 hover:bg-foreground/8 transition-colors"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-muted-foreground/40" />
            <p
              className="text-muted-foreground"
              style={{ fontSize: 'clamp(11px, 1vw, 12px)', fontWeight: 400 }}
            >
              Not listening to Spotify
            </p>
          </div>
        </a>
      ) : (
        <>
          <motion.div
            layout="position"
            transition={{
              type: "spring",
              bounce: 1,
              stiffness: 260,
              damping: 10,
            }}
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-3 cursor-pointer hover:bg-foreground/8 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-green-500/80"
                  animate={{
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <p
                  className="text-muted-foreground uppercase"
                  style={{ fontSize: 'clamp(9px, 0.9vw, 10px)', fontWeight: 500, letterSpacing: '0.1em' }}
                >
                  Listening
                </p>
              </div>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{
                  type: "spring",
                  bounce: 0.5,
                  stiffness: 300,
                  damping: 25,
                }}
              >
                <ChevronDownIcon className="w-3 h-3 text-muted-foreground" />
              </motion.div>
            </div>

            <div className="flex gap-3 items-center">
              {data.albumImageUrl && (
                <motion.div
                  className="relative w-12 h-12 rounded-full flex-shrink-0 overflow-hidden"
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  {/* Vinyl record effect */}
                  <div className="absolute inset-0 rounded-full border-2 border-black/10" />

                  {/* Center hole */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-background/80 z-10" />
                  </div>

                  {/* Album art */}
                  <Image
                    src={data.albumImageUrl}
                    alt={data.album || "Album cover"}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              )}

              <div className="flex-1 min-w-0">
                <p
                  className="text-foreground font-medium truncate mb-0.5"
                  style={{ fontSize: 'clamp(12px, 1.1vw, 13px)', fontWeight: 500 }}
                >
                  {data.title}
                </p>
                <p
                  className="text-muted-foreground truncate"
                  style={{ fontSize: 'clamp(11px, 1vw, 12px)', fontWeight: 400 }}
                >
                  {data.artist}
                </p>
              </div>

              <div className="flex items-end gap-0.5 h-4">
                {[0, 0.15, 0.3].map((delay, i) => (
                  <motion.div
                    key={i}
                    className="w-0.5 bg-muted-foreground/40 rounded-full"
                    animate={{
                      height: ["30%", "70%", "50%", "30%"],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                initial={{
                  height: 0,
                  opacity: 0,
                }}
                animate={{
                  height: "auto",
                  opacity: 1,
                  transition: {
                    height: { type: "spring", bounce: 0.35, stiffness: 260, damping: 20 },
                    opacity: { duration: 0.25, delay: 0.1 },
                  }
                }}
                exit={{
                  height: 0,
                  opacity: 0,
                  transition: {
                    opacity: { duration: 0.15 },
                    height: { type: "spring", bounce: 0, stiffness: 300, damping: 30, delay: 0.15 },
                  }
                }}
                className="border-t border-border/40 overflow-hidden"
              >
                <motion.div
                  className="p-3 space-y-2"
                  initial={{ y: -10 }}
                  animate={{ y: 0, transition: { type: "spring", bounce: 0.3 } }}
                  exit={{ y: -5 }}
                >
                  {/* Playlist row with Spotify icon */}
                  <div className="flex items-end justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      {data.playlistName && (
                        <>
                          <p
                            className="text-muted-foreground/60 mb-0.5"
                            style={{ fontSize: 'clamp(9px, 0.9vw, 10px)', fontWeight: 400 }}
                          >
                            Playing from
                          </p>
                          <p
                            className="text-foreground truncate"
                            style={{ fontSize: 'clamp(11px, 1vw, 12px)', fontWeight: 400 }}
                          >
                            {data.playlistName}
                          </p>
                        </>
                      )}
                    </div>

                    {/* Spotify Icon Link */}
                    <a
                      href={data.songUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex-shrink-0 w-7 h-7 rounded-md bg-green-500/10 hover:bg-green-500/20 flex items-center justify-center transition-colors ml-auto"
                      aria-label="Open in Spotify"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-green-600 dark:text-green-400">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                      </svg>
                    </a>
                  </div>

                  <div className="flex gap-6">
                    <div className="">
                      <p
                        className="text-muted-foreground/60 mb-0.5"
                        style={{ fontSize: 'clamp(9px, 0.9vw, 10px)', fontWeight: 400 }}
                      >
                        Artist
                      </p>
                      <p
                        className="text-foreground truncate"
                        style={{ fontSize: 'clamp(11px, 1vw, 12px)', fontWeight: 400 }}
                      >
                        {data.artist}
                      </p>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p
                        className="text-muted-foreground/60 mb-0.5"
                        style={{ fontSize: 'clamp(9px, 0.9vw, 10px)', fontWeight: 400 }}
                      >
                        Album
                      </p>
                      <p
                        className="text-foreground truncate"
                        style={{ fontSize: 'clamp(11px, 1vw, 12px)', fontWeight: 400 }}
                      >
                        {data.album}
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {data.durationMs && data.progressMs !== undefined && (
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <p
                          className="text-muted-foreground/60"
                          style={{ fontSize: 'clamp(9px, 0.9vw, 10px)', fontWeight: 400 }}
                        >
                          {formatTime(currentProgress)}
                        </p>
                        <p
                          className="text-muted-foreground/60"
                          style={{ fontSize: 'clamp(9px, 0.9vw, 10px)', fontWeight: 400 }}
                        >
                          {formatTime(data.durationMs)}
                        </p>
                      </div>
                      <div className="w-full h-1 bg-foreground/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-green-500/60"
                          style={{
                            width: `${(currentProgress / data.durationMs) * 100}%`,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 100,
                            damping: 15,
                          }}
                        />
                      </div>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </motion.div>
  );
}

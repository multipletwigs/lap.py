"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon, PlayIcon, PauseIcon, SpeakerLoudIcon, SpeakerOffIcon, ListBulletIcon } from "@radix-ui/react-icons";
import { SkipForward, SkipBack } from "lucide-react";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player/youtube"), { ssr: false });

const VIDEO_URL = "https://www.youtube.com/watch?v=9kzE8isXlQY";

interface Chapter {
  startTime: number;
  title: string;
  artist: string;
}

const CHAPTERS: Chapter[] = [
  { startTime: 0, title: "Do More Say Less", artist: "Lofi Mix" },
  { startTime: 137, title: "Action Speaks The Beat", artist: "Lofi Mix" },
  { startTime: 377, title: "Quiet Moves Build Momentum", artist: "Lofi Mix" },
  { startTime: 617, title: "Talking Doesn’t Build Tracks", artist: "Lofi Mix" },
  { startTime: 810, title: "Your Steps Say Enough", artist: "Lofi Mix" },
  { startTime: 881, title: "Movement Creates The Rhythm", artist: "Lofi Mix" },
  { startTime: 1050, title: "Lo-fi Doesn’t Talk Much", artist: "Lofi Mix" },
  { startTime: 1274, title: "Progress Lives In Silence", artist: "Lofi Mix" },
  { startTime: 1495, title: "Let Action Set The Tone", artist: "Lofi Mix" },
  { startTime: 1654, title: "One Move Beats Ten Words", artist: "Lofi Mix" },
  { startTime: 1894, title: "Focus Beats Noise", artist: "Lofi Mix" },
  { startTime: 2134, title: "Still Work Builds Legacy", artist: "Lofi Mix" },
  { startTime: 2280, title: "Work In Silence Always", artist: "Lofi Mix" },
  { startTime: 2520, title: "No Need To Explain", artist: "Lofi Mix" },
  { startTime: 2738, title: "Results Don’t Need Talking", artist: "Lofi Mix" },
  { startTime: 2978, title: "Less Noise More Motion", artist: "Lofi Mix" },
  { startTime: 3218, title: "Real Ones Just Move", artist: "Lofi Mix" },
  { startTime: 3458, title: "Say Nothing Show Everything", artist: "Lofi Mix" },
  { startTime: 3698, title: "Effort Over Echoes", artist: "Lofi Mix" },
  { startTime: 3938, title: "Work Speaks Louder Here", artist: "Lofi Mix" },
  { startTime: 4178, title: "Let Beats Do The Talking", artist: "Lofi Mix" },
  { startTime: 4418, title: "Keep Building Don’t Brag", artist: "Lofi Mix" },
  { startTime: 4658, title: "Create Before You Speak", artist: "Lofi Mix" },
  { startTime: 4898, title: "Motion Over Mouth", artist: "Lofi Mix" },
  { startTime: 5138, title: "Your Grind Is The Message", artist: "Lofi Mix" },
  { startTime: 5358, title: "Speak Through The Loops", artist: "Lofi Mix" },
  { startTime: 5579, title: "Results Come Without Words", artist: "Lofi Mix" },
  { startTime: 5816, title: "Let The Rhythm Answer", artist: "Lofi Mix" },
  { startTime: 5994, title: "Proof Lives In The Repetition", artist: "Lofi Mix" },
  { startTime: 6182, title: "Work Hard Stay Quiet", artist: "Lofi Mix" },
  { startTime: 6422, title: "Progress Talks For You", artist: "Lofi Mix" },
  { startTime: 6577, title: "Consistency Over Conversation", artist: "Lofi Mix" },
  { startTime: 6817, title: "Silence Is Your Power", artist: "Lofi Mix" },
  { startTime: 7038, title: "Still Beats Win More", artist: "Lofi Mix" },
  { startTime: 7254, title: "Lo-fi Moves In Shadows", artist: "Lofi Mix" },
  { startTime: 7383, title: "Build In Quiet Patterns", artist: "Lofi Mix" },
  { startTime: 7585, title: "Keep Going Without Announcements", artist: "Lofi Mix" },
  { startTime: 7767, title: "No Need To Announce Effort", artist: "Lofi Mix" },
  { startTime: 7987, title: "Make It Before You Mention It", artist: "Lofi Mix" },
  { startTime: 8218, title: "Step Forward Say Less", artist: "Lofi Mix" },
  { startTime: 8434, title: "Peace Found In Progress", artist: "Lofi Mix" },
  { startTime: 8649, title: "Hands Move While Words Rest", artist: "Lofi Mix" },
  { startTime: 8889, title: "Sound Comes From Still Effort", artist: "Lofi Mix" },
  { startTime: 9129, title: "Work More Speak Softer", artist: "Lofi Mix" },
  { startTime: 9332, title: "Discipline Doesn’t Shout", artist: "Lofi Mix" },
  { startTime: 9521, title: "Echoes Follow Action", artist: "Lofi Mix" },
  { startTime: 9738, title: "Talk Less Build More", artist: "Lofi Mix" },
  { startTime: 9967, title: "Results Live In Motion", artist: "Lofi Mix" },
  { startTime: 10174, title: "Silent Work Feels Stronger", artist: "Lofi Mix" },
  { startTime: 10390, title: "Keep The Talk On Mute", artist: "Lofi Mix" },
  { startTime: 10590, title: "Effort Echoes Without Words", artist: "Lofi Mix" },
  { startTime: 10811, title: "Grind Without The Hype", artist: "Lofi Mix" },
  { startTime: 11039, title: "Start Before You Say It", artist: "Lofi Mix" },
  { startTime: 11279, title: "Do It Then Reflect", artist: "Lofi Mix" },
  { startTime: 11510, title: "Let Motion Lead You", artist: "Lofi Mix" },
  { startTime: 11645, title: "Waves Don’t Talk Back", artist: "Lofi Mix" },
  { startTime: 11859, title: "Track Progress Not Words", artist: "Lofi Mix" },
  { startTime: 12092, title: "Still Lo-fi Does More", artist: "Lofi Mix" },
];

export function LofiPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isReady, setIsReady] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);

  // We track the current chapter index based on playback time
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0); // Current time in seconds
  const [totalDuration, setTotalDuration] = useState(0); // Total video duration
  const playerRef = useRef<any>(null); // Reference to ReactPlayer to allow seeking

  const currentChapter = CHAPTERS[currentChapterIndex];
  const nextChapterStartTime = CHAPTERS[currentChapterIndex + 1]?.startTime || totalDuration;
  const chapterDuration = nextChapterStartTime - currentChapter.startTime;
  const chapterProgress = currentTime - currentChapter.startTime;

  // Ensure 0-1 range for progress bar relative to CHAPTER
  const progressPercentage = Math.min(100, Math.max(0, (chapterProgress / chapterDuration) * 100)) || 0;

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
    if (!hasStarted) setHasStarted(true);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  const seekToChapter = (index: number) => {
    if (!playerRef.current) return;
    const time = CHAPTERS[index].startTime;
    playerRef.current.seekTo(time, 'seconds');
    setCurrentChapterIndex(index);
    setCurrentTime(time);
    // Reset played state visuals if needed
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const nextIndex = (currentChapterIndex + 1) % CHAPTERS.length;
    seekToChapter(nextIndex);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    // If we are more than 3 seconds into the song, restart it. Otherwise go to prev.
    if (chapterProgress > 3) {
      seekToChapter(currentChapterIndex);
    } else {
      const prevIndex = (currentChapterIndex - 1 + CHAPTERS.length) % CHAPTERS.length;
      seekToChapter(prevIndex);
    }
  };

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative w-full z-30 h-[84px]">
      {/* Hidden Player - using position absolute instead of display:none to ensure YouTube API works */}
      <div className="absolute opacity-0 pointer-events-none">
        <ReactPlayer
          ref={playerRef}
          url={VIDEO_URL}
          playing={isPlaying}
          muted={isMuted}
          volume={volume}
          width="0"
          height="0"
          onReady={() => {
            setIsReady(true);
            if (isPlaying) setHasStarted(true);
          }}
          onPlay={() => {
            setIsPlaying(true);
            setHasStarted(true);
          }}
          pip={false}
          onPause={() => setIsPlaying(false)}
          onProgress={({ playedSeconds }: { playedSeconds: number }) => {
            setCurrentTime(playedSeconds);
            const index = CHAPTERS.findLastIndex(c => c.startTime <= playedSeconds);
            if (index !== -1 && index !== currentChapterIndex) {
              setCurrentChapterIndex(index);
            }
          }}
          onDuration={(d: number) => setTotalDuration(d)}
          config={{
            playerVars: { showinfo: 0, controls: 0 },
          }
          }
        />
      </div>

      <motion.div
        transition={{
          type: "spring",
          bounce: 0.35,
          stiffness: 260,
          damping: 20,
        }}
        style={{ borderRadius: 12 }}
        className={`border border-border/40 overflow-hidden bg-background w-full absolute bottom-0 left-0 right-0 ${isExpanded ? 'shadow-lg' : ''}`}
      >
        {(!hasStarted && !isPlaying) ? (
          <div
            onClick={(e) => togglePlay(e)}
            className="flex items-center gap-2 p-4 cursor-pointer hover:bg-foreground/8 transition-colors"
          >
            <div className="w-2 h-2 rounded-full bg-muted-foreground/40" />
            <p
              className="text-muted-foreground"
              style={{ fontSize: 'clamp(11px, 1vw, 12px)', fontWeight: 400 }}
            >
              Click to start Lofi Radio
            </p>
            <PlayIcon className="ml-auto w-3 h-3 text-muted-foreground" />
          </div>
        ) : (
          <>
            <motion.div
              transition={{
                type: "spring",
                bounce: 1,
                stiffness: 260,
                damping: 10,
              }}
              onClick={(e) => {
                if (!hasStarted) {
                  togglePlay(e);
                } else {
                  setIsExpanded(!isExpanded);
                }
              }}
              className="p-3 cursor-pointer hover:bg-foreground/8 transition-colors relative z-20 bg-background"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <motion.div
                    className={`w-1.5 h-1.5 rounded-full ${isPlaying ? "bg-green-500/80" : "bg-orange-500/80"}`}
                    animate={isPlaying ? {
                      opacity: [1, 0.5, 1],
                    } : { opacity: 1 }}
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
                    {!hasStarted ? "Ready to Play" : (isPlaying ? "Now Playing" : "Paused")}
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
                <motion.div
                  className="relative w-10 h-10 rounded-full flex-shrink-0 overflow-hidden bg-zinc-800"
                  animate={{
                    rotate: isPlaying ? 360 : 0,
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    animationPlayState: isPlaying ? "running" : "paused"
                  }}
                >
                  {/* Vinyl record effect */}
                  <div className="absolute inset-0 rounded-full border-2 border-black/10 z-10" />
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="w-2.5 h-2.5 rounded-full bg-background/80" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500" />
                </motion.div>

                <div className="flex-1 min-w-0">
                  <p
                    className="text-foreground font-medium truncate mb-0.5"
                    style={{ fontSize: 'clamp(12px, 1.1vw, 13px)', fontWeight: 500 }}
                  >
                    {currentChapter.title}
                  </p>
                  <p
                    className="text-muted-foreground truncate"
                    style={{ fontSize: 'clamp(11px, 1vw, 12px)', fontWeight: 400 }}
                  >
                    {currentChapter.artist}
                  </p>
                </div>

                {isPlaying ? (
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
                ) : (
                  <div className="flex items-center justify-center h-4 w-4">
                    <PlayIcon className="w-4 h-4 text-muted-foreground" />
                  </div>
                )}
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
                    className="p-3 pt-0 space-y-3"
                    initial={{ y: -10 }}
                    animate={{ y: 0, transition: { type: "spring", bounce: 0.3 } }}
                    exit={{ y: -5 }}
                  >
                    {/* Playlist Toggle (only shown if not already showing playlist) */}
                    {!showPlaylist && (
                      <>
                        {/* Progress Bar */}
                        <div className="w-full pt-2">
                          <div className="flex items-center justify-between mb-1.5">
                            <p className="text-[10px] font-medium text-muted-foreground tabular-nums">
                              {formatTime(chapterProgress)}
                            </p>
                            <p className="text-[10px] font-medium text-muted-foreground tabular-nums">
                              {formatTime(chapterDuration)}
                            </p>
                          </div>
                          <div className="relative h-1 w-full bg-foreground/10 rounded-full overflow-hidden">
                            <motion.div
                              className="absolute top-0 left-0 bottom-0 bg-foreground/80"
                              style={{ width: `${progressPercentage}%` }}
                              transition={{ ease: "linear", duration: 0.1 }}
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-3">
                          {/* Controls */}
                          <div className="flex items-center gap-1 flex-1">
                            <button
                              onClick={handlePrev}
                              className="p-2 rounded-full hover:bg-foreground/10 transition-colors text-muted-foreground hover:text-foreground"
                            >
                              <SkipBack className="w-4 h-4 fill-current" />
                            </button>

                            <button
                              onClick={togglePlay}
                              className="p-2 rounded-full hover:bg-foreground/10 transition-colors text-foreground"
                            >
                              {isPlaying ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
                            </button>

                            <button
                              onClick={handleNext}
                              className="p-2 rounded-full hover:bg-foreground/10 transition-colors text-muted-foreground hover:text-foreground"
                            >
                              <SkipForward className="w-4 h-4 fill-current" />
                            </button>
                          </div>

                          <div className="flex items-center gap-2 border-l border-border/40 pl-3">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowPlaylist(true);
                              }}
                              className="p-2 rounded-full hover:bg-foreground/10 transition-colors text-muted-foreground hover:text-foreground"
                            >
                              <ListBulletIcon className="w-4 h-4" />
                            </button>

                            <button
                              onClick={toggleMute}
                              className="p-2 rounded-full hover:bg-foreground/10 transition-colors text-muted-foreground hover:text-foreground"
                            >
                              {isMuted ? <SpeakerOffIcon className="w-4 h-4" /> : <SpeakerLoudIcon className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Playlist View */}
                    {showPlaylist && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="pt-2"
                      >
                        <div className="flex items-center justify-between mb-3 px-1">
                          <p className="text-xs font-medium text-muted-foreground">Playlist</p>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowPlaylist(false);
                            }}
                            className="text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors"
                          >
                            Back to controls
                          </button>
                        </div>
                        <div className="space-y-1 max-h-[150px] overflow-y-auto pr-1">
                          {CHAPTERS.map((chapter, i) => (
                            <button
                              key={i}
                              onClick={(e) => {
                                e.stopPropagation();
                                seekToChapter(i);
                                setShowPlaylist(false);
                                if (!isPlaying) {
                                  setIsPlaying(true);
                                  setHasStarted(true);
                                }
                              }}
                              className={`w-full text-left p-2 rounded-lg transition-colors flex items-center gap-3 ${currentChapterIndex === i
                                ? "bg-foreground/10 text-foreground"
                                : "hover:bg-foreground/5 text-muted-foreground hover:text-foreground"
                                }`}
                            >
                              <div className="w-4 flex justify-center">
                                {currentChapterIndex === i && isPlaying ? (
                                  <div className="flex items-end gap-0.5 h-3">
                                    {[0, 0.2].map((d, j) => (
                                      <motion.div
                                        key={j}
                                        className="w-0.5 bg-current rounded-full"
                                        animate={{ height: ["30%", "100%", "30%"] }}
                                        transition={{ duration: 0.8, repeat: Infinity, delay: d }}
                                      />
                                    ))}
                                  </div>
                                ) : (
                                  <span className="text-[10px] opacity-50">{i + 1}</span>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium truncate">{chapter.title}</p>
                                <p className="text-[10px] opacity-70 truncate">{chapter.artist}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </motion.div>
    </div>
  );
}

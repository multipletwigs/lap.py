"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CanvasWrapper from "../react-fiber-experiment/canvas-wrapper";
import { DotsHorizontalIcon, StackIcon } from "@radix-ui/react-icons";
import {
  SkipBack,
  SkipForward,
  Heart,
  Repeat2,
  Shuffle,
  PlayIcon,
  AlignJustify,
} from "lucide-react";
import { useOnClickOutside } from "usehooks-ts";

interface PlaylistItem {
  name: string;
  artist: string;
  cover_url: string;
  playlist: string;
  description: string;
  duration: string;
}

const PLAYLIST_ITEMS = [
  {
    name: "帶你飛",
    artist: "告五人",
    cover_url: "https://i.kfs.io/album/global/224955642,2v1/fit/500x500.jpg",
    description: "I like the melody of this song!",
    playlist: "帶你飛",
    duration: "4:30",
  },
  {
    name: "披星戴月的想你",
    artist: "告五人",
    cover_url: "https://i.kfs.io/album/global/97939752,1v1/fit/500x500.jpg",
    description: "I like the melody of this song!",
    playlist: "在幾百年前就說過愛你",
    duration: "5:50",
  },
  {
    name: "tlit21c",
    artist: "Lyn Lapid",
    cover_url:
      "https://i.scdn.co/image/ab67616d0000b273262f7f972fcb6f52b0500576",
    description: "I like the melody of this song!",
    playlist: "to love in the 21st century",
    duration: "1:06",
  },
  {
    name: "如果愛忘了",
    artist: "單依純, Silence Wang",
    cover_url: "https://i.kfs.io/album/global/157010545,0v1/fit/500x500.jpg",
    description: "I like the melody of this song!",
    playlist: "中國好聲音",
    duration: "4:05",
  },
  {
    name: "感謝你曾來過",
    artist: "啊涵, Ayo97",
    cover_url: "https://i.kfs.io/album/global/67159591,2v1/fit/500x500.jpg",
    description: "I like the melody of this song!",
    playlist: "感謝你曾來過",
    duration: "4:10",
  },
  {
    name: "If I Weren't Me",
    artist: "Katherine Li",
    cover_url:
      "https://i.scdn.co/image/ab67616d0000b273416574586c08a29c3a492a64",
    description: "I like the melody of this song!",
    playlist: "If I Weren't Me",
    duration: "2:32",
  },
];

function MusicPlayer(
  props: PlaylistItem & { index: number; setIsSelected: any },
) {
  const { artist, name, cover_url, duration, playlist, index, setIsSelected } =
    props;
  const outsideRef = useRef(null);
  useOnClickOutside(outsideRef, () => {
    setIsSelected(false);
  });

  const layoutIds = {
    coverImg: `cover_img-${name}`,
    artist: `playlist-item-artist-${artist}-${index}`,
    name: `playlist-item-name-${name}`,
    playlist: `playlist-item-playlist-${playlist}-${index}`,
    duration: `playlist-item-duration-${name}-${index}`,
  };

  return (
    <>
      <motion.div
        className="z-10 w-full h-full inset-0 absolute bg-slate-900/70 rounded-lg overflow-clip"
        id="player-overlay"
      />

      <motion.div className="absolute inset-0 w-full h-full z-20 rounded-lg">
        <div className="flex h-full w-full items-center justify-center rounded-lg">
          <motion.div
            key={`playlist-item-${props.name}-${props.index}`}
            layoutId={`playlist-item-${props.name}-${props.index}`}
            ref={outsideRef}
            className="bg-slate-950 p-8 pt-6 px-6 rounded-lg relative h-72 z-30 shadow"
          >
            <div className="flex justify-between gap-4 h-full flex-col max-w-64">
              <div className="inline-flex justify-between align-center items-center">
                <div className="rounded-full inline-flex items-center justify-center w-8 h-8 bg-slate-700">
                  <Heart className="w-3 h-3 fill-slate-200 text-slate-200" />
                </div>
                <AlignJustify fill="white" className="w-4 h-4" />
              </div>

              <div className="flex gap-4 mt-auto">
                <motion.img
                  src={cover_url}
                  className="w-28 h-28 aspect-square rounded-lg shadow-2xl"
                  alt="Album cover"
                  layoutId={layoutIds.coverImg}
                />
                <div className="flex flex-col">
                  <div className="max-w-64">
                    <motion.p
                      layoutId={layoutIds.artist}
                      className="text-md text-slate-400"
                    >
                      {artist}
                    </motion.p>
                    <motion.p
                      layoutId={layoutIds.name}
                      className="text-2xl font-medium text-wrap"
                    >
                      {name}
                    </motion.p>
                    <motion.p
                      layoutId={layoutIds.playlist}
                      className="text-xs text-slate-400"
                    >
                      {playlist}
                    </motion.p>
                  </div>
                  <div className="mt-auto gap-1 flex flex-row items-center">
                    <div className="rounded-full inline-flex items-center justify-center w-8 h-8 bg-slate-700">
                      <PlayIcon className="w-3 h-3 fill-slate-200 text-slate-200" />
                    </div>
                    <div className="rounded-full inline-flex items-center justify-center w-6 h-6 bg-slate-700">
                      <SkipBack className="w-3 h-3 fill-slate-200 text-slate-200" />
                    </div>
                    <div className="rounded-full inline-flex items-center justify-center w-6 h-6 bg-slate-700">
                      <SkipForward className="w-3 h-3 fill-slate-200 text-slate-200" />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-gray-600 h-1 mt-1 w-96 rounded-full"></div>
                <div className="flex justify-between mt-3 text-slate-600">
                  <div className="text-xs">0:00</div>
                  <div className="flex gap-2">
                    <Repeat2 className="h-4 w-4" />
                    <Shuffle className="h-4 w-4" />
                  </div>
                  <motion.p
                    layoutId={layoutIds["duration"]}
                    className="text-xs"
                  >
                    {duration}
                  </motion.p>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 h-full -z-10 w-full rounded-lg">
              <div className="h-[65%] relative overflow-clip rounded-t-lg">
                <img
                  className="absolute blur-3xl inset-0 bg-cover bg-center opacity-30"
                  src={cover_url}
                  alt="Blurred background"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}

function PlaylistItem(props: PlaylistItem & { index: number }) {
  const [isHover, setIsHover] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const layoutIds = {
    coverImg: `cover_img-${props.name}`,
    artist: `playlist-item-artist-${props.artist}-${props.index}`,
    name: `playlist-item-name-${props.name}`,
    playlist: `playlist-item-playlist-${props.playlist}-${props.index}`,
    duration: `playlist-item-duration-${props.name}-${props.index}`,
  };

  return (
    <>
      {isSelected && (
        <MusicPlayer
          {...props}
          index={props.index}
          setIsSelected={setIsSelected}
        />
      )}
      <AnimatePresence>
        <motion.div
          key={`playlist-item-${props.name}`}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          onClick={() => setIsSelected(true)}
          whileTap={{ scale: 0.98 }}
          className="relative flex w-full items-center px-0 sm:px-4 py-2 cursor-pointer"
        >
          {isHover && (
            <motion.div
              key={`highlight-${props.name}-${props.index}`}
              className="inset-0 bg-slate-700/30 hidden sm:block absolute"
              layoutId="playlist-hover"
            />
          )}
          <motion.div
            layoutId={`playlist-item-${props.name}-${props.index}`}
            className="grid grid-cols-[1fr,1fr,auto] gap-4 items-center w-full z-10"
          >
            <div className="flex items-center gap-4">
              <motion.img
                src={props.cover_url}
                className="h-10 w-10 rounded-md"
                alt="Album cover"
                layoutId={layoutIds["coverImg"]}
              />
              <div>
                <motion.p
                  layout
                  layoutId={layoutIds["name"]}
                  className="text-sm font-medium"
                >
                  {props.name}
                </motion.p>
                <motion.p
                  layoutId={layoutIds["artist"]}
                  layout
                  className="text-xs text-gray-600"
                >
                  {props.artist}
                </motion.p>
              </div>
            </div>

            <motion.p
              layoutId={layoutIds["playlist"]}
              className="text-xs text-slate-500 text-left"
            >
              {props.playlist}
            </motion.p>

            <div className="flex items-center gap-4">
              <motion.p layoutId={layoutIds["duration"]} className="text-xs">
                {props.duration}
              </motion.p>
              <DotsHorizontalIcon className="h-5 w-5" />
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default function AnimatedLayout() {
  return (
    <CanvasWrapper
      background="bg-slate-900/50"
      height="fit"
      caption="Framer Motion Magic ✨ Powerful Illusions"
    >
      <div className="w-full h-full sm:p-4 flex flex-col relative">
        {PLAYLIST_ITEMS.map((item, index) => (
          <PlaylistItem
            key={`playlist-item-${index}`}
            {...item}
            index={index}
          />
        ))}
      </div>
    </CanvasWrapper>
  );
}

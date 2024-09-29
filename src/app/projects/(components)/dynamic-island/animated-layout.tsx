"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CanvasWrapper from "../react-fiber-experiment/canvas-wrapper";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

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
    name: "Item 1",
    artist: "告五人",
    cover_url: "https://i.kfs.io/album/global/224955642,2v1/fit/500x500.jpg",
    description: "I like the melody of this song!",
    playlist: "We will be fine",
    duration: "4:30",
  },
  {
    name: "item 2",
    artist: "告五人",
    cover_url: "https://i.kfs.io/album/global/224955642,2v1/fit/500x500.jpg",
    description: "I like the melody of this song!",
    playlist: "We will be fine",
    duration: "4:30",
  },
  {
    name: "item 3",
    artist: "告五人",
    cover_url: "https://i.kfs.io/album/global/224955642,2v1/fit/500x500.jpg",
    description: "I like the melody of this song!",
    playlist: "We will be fine",
    duration: "4:30",
  },
];

function PlaylistItem(props: PlaylistItem & { index: number }) {
  const [isHover, setIsHover] = useState(false);

  return (
    <motion.div
      key={`playlist-item-${props.name}`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="relative flex items-center justify-between px-4 py-2 cursor-pointer"
    >
      <div className="flex gap-4 items-center">
        <p>{props.index + 1}</p>
        <img
          src={props.cover_url}
          className="h-16 w-16 rounded-lg"
          alt="Album cover"
        />
        <div>
          <p className="text-base font-medium">{props.name}</p>
          <p className="text-sm text-gray-600">{props.artist}</p>
        </div>
      </div>
      <p className="text-sm text-slate-500">{props.playlist}</p>
      <p className="text-sm">{props.duration}</p> <DotsHorizontalIcon />
      {isHover && (
        <motion.div
          key={`highlight-${props.name}`}
          layoutId="playlist-selected"
          className="absolute inset-0 bg-slate-700/40 -z-10"
        />
      )}
    </motion.div>
  );
}

export default function AnimatedLayout() {
  return (
    <CanvasWrapper background="bg-transparent" height="medium">
      <div className="w-full h-full p-4 flex flex-col relative">
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

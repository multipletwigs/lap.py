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
    playlist: "We will",
    duration: "4:30",
  },
  {
    name: "item 3",
    artist: "告五人",
    cover_url: "https://i.kfs.io/album/global/224955642,2v1/fit/500x500.jpg",
    description: "I like the melody of this song!",
    playlist: "告五人",
    duration: "4:30",
  },
  {
    name: "item 5",
    artist: "告五人",
    cover_url: "https://i.kfs.io/album/global/224955642,2v1/fit/500x500.jpg",
    description: "I like the melody of this song!",
    playlist: "告五人",
    duration: "4:30",
  },
  {
    name: "item 7",
    artist: "告五人",
    cover_url: "https://i.kfs.io/album/global/224955642,2v1/fit/500x500.jpg",
    description: "I like the melody of this song!",
    playlist: "告五人",
    duration: "4:30",
  },
];

function MusicPlayer(props: PlaylistItem & { index: number }) {
  return (
    <>
      <motion.div
        className="z-10 w-full h-full inset-0 absolute bg-slate-900/40"
        id="player-overlay"
      />

      <motion.div className="absolute inset-0 w-full h-full z-20">
        <div className="flex h-full w-full items-center align-center justify-center">
          <motion.div
            layoutId="playlist-selected"
            className=" bg-slate-950 p-6 rounded-md"
          >
            <div className="flex gap-4 h-full">
              <motion.img
                src={props.cover_url}
                className="h-24 w-24 rounded-md"
                alt="Album cover"
                layoutId={`cover_img-${props.name}`}
              />
              <div className="flex flex-col">
                <div>
                  <motion.p
                    layoutId={`playlist-item-name-${props.name}`}
                    className="text-2xl font-medium"
                  >
                    {props.name}
                  </motion.p>
                  <motion.p
                    layoutId={`playlist-item-artist-${props.artist}-${props.index}`}
                    className="text-lg text-gray-600"
                  >
                    {props.artist}
                  </motion.p>
                </div>
                <div className="rounded-full w-[350px] mt-auto bg-gray-600 h-2"></div>
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

  return (
    <>
      {isSelected && <MusicPlayer {...props} index={props.index} />}
      <motion.div
        key={`playlist-item-${props.name}`}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onClick={() => setIsSelected(true)}
        className="relative flex gap-4 w-full items-center px-0 sm:px-4 py-2 cursor-pointer"
      >
        {isHover && (
          <motion.div
            key={`highlight-${props.name}`}
            layoutId="playlist-selected"
            className="inset-0 bg-slate-700/40 -z-10 hidden sm:block absolute"
          />
        )}
        <div className="flex gap-4 items-center">
          <p className="text-sm">{props.index + 1}</p>
          <motion.img
            src={props.cover_url}
            className="h-10 w-10 rounded-md"
            alt="Album cover"
            layoutId={`cover_img-${props.name}`}
          />
          <div>
            <motion.p
              layoutId={`playlist-item-name-${props.name}`}
              className="text-sm font-medium"
            >
              {props.name}
            </motion.p>
            <motion.p
              layoutId={`playlist-item-artist-${props.artist}-${props.index}`}
              className="text-xs text-gray-600"
            >
              {props.artist}
            </motion.p>
          </div>
        </div>
        <p className="text-xs text-slate-500 ml-4 sm:ml-36">{props.playlist}</p>
        <div className="flex gap-4 sm:gap-16 ml-auto">
          <p className="text-xs">{props.duration}</p> <DotsHorizontalIcon />
        </div>
      </motion.div>
    </>
  );
}

export default function AnimatedLayout() {
  return (
    <CanvasWrapper background="bg-slate-900/50" height="fit">
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

"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import CanvasWrapper from "../react-fiber-experiment/canvas-wrapper";
import { DotsHorizontalIcon, StackIcon } from "@radix-ui/react-icons";
import {
  SkipBack,
  SkipForward,
  Repeat2,
  Shuffle,
  PlayIcon,
} from "lucide-react";
import { useOnClickOutside } from "usehooks-ts";
import SpotifyExternalLink from "./external-spotify";

interface PlaylistItem {
  name: string;
  artist: string;
  cover_url: string;
  playlist: string;
  description: string;
  duration: string;
  spotify_link: string;
}

const PLAYLIST_ITEMS: PlaylistItem[] = [
  {
    name: "帶你飛",
    artist: "告五人",
    cover_url: "https://i.kfs.io/album/global/224955642,2v1/fit/500x500.jpg",
    description: "I like the melody of this song!",
    playlist: "帶你飛",
    spotify_link:
      "https://open.spotify.com/track/0jnDl8pm20nRBkXzMgL5Fv?si=51d2210c82db42c7",
    duration: "4:30",
  },
  {
    name: "披星戴月的想你",
    artist: "告五人",
    cover_url: "https://i.kfs.io/album/global/97939752,1v1/fit/500x500.jpg",
    description: "I like the melody of this song!",
    playlist: "在幾百年前就說過愛你",
    duration: "5:50",
    spotify_link:
      "https://open.spotify.com/track/7tgzj2IqzSgUpxUhjmcF5m?si=9d1b6edbfc8b482e",
  },
  {
    name: "tlit21c",
    artist: "Lyn Lapid",
    cover_url:
      "https://i.scdn.co/image/ab67616d0000b273262f7f972fcb6f52b0500576",
    description: "I like the melody of this song!",
    playlist: "to love in the 21st century",
    duration: "1:06",
    spotify_link:
      "https://open.spotify.com/track/0etGeOL33kfAw2iuTKPF3z?si=5dd1970e8e2b49a8",
  },
  {
    name: "如果愛忘了",
    artist: "單依純, Silence Wang",
    cover_url: "https://i.kfs.io/album/global/157010545,0v1/fit/500x500.jpg",
    description: "I like the melody of this song!",
    playlist: "中國好聲音",
    duration: "4:05",
    spotify_link:
      "https://open.spotify.com/track/4JBZuPALOvU2PC8E7t02vY?si=f56d3356756c4ec9",
  },
  {
    name: "感謝你曾來過",
    artist: "啊涵, Ayo97",
    cover_url: "https://i.kfs.io/album/global/67159591,2v1/fit/500x500.jpg",
    description: "I like the melody of this song!",
    playlist: "感謝你曾來過",
    duration: "4:10",
    spotify_link:
      "https://open.spotify.com/track/1JLtvvPsHwLyd2ufASdkWV?si=d1385482960547af",
  },
  {
    name: "Champagne Shots",
    artist: "Sainte",
    cover_url:
      "https://i.scdn.co/image/ab67616d0000b273c8eaf2ad9b478ea68c0370a5",
    description: "i like the melody of this song!",
    playlist: "Local Mvp",
    spotify_link:
      "https://open.spotify.com/track/7dbyaRWWFvB9UG2vcwTd3J?si=84cc385ca82b43b7",
    duration: "2:24",
  },
  {
    name: "tip toe",
    artist: "HYBS",
    cover_url:
      "https://i.scdn.co/image/ab67616d0000b2734125c81788ae43053829ceb0",
    description: "i like the melody of this song!",
    playlist: "Tip Toe",
    spotify_link:
      "https://open.spotify.com/track/0jnDl8pm20nRBkXzMgL5Fv?si=51d2210c82db42c7",
    duration: "3:44",
  },
  {
    name: "if i weren't me",
    artist: "katherine li",
    cover_url:
      "https://i.scdn.co/image/ab67616d0000b273416574586c08a29c3a492a64",
    description: "i like the melody of this song!",
    playlist: "if i weren't me",
    spotify_link:
      "https://open.spotify.com/track/0jnDl8pm20nRBkXzMgL5Fv?si=51d2210c82db42c7",
    duration: "2:32",
  },
];

function MusicPlayer(
  props: PlaylistItem & { index: number; setIsSelected: any },
) {
  const { artist, name, cover_url, duration, playlist, index, setIsSelected } =
    props;
  const outsideRef = useRef(null);
  useOnClickOutside(outsideRef as any, () => {
    setIsSelected(false);
  });

  const layoutIds = {
    coverImg: `cover_img-${name}`,
    artist: `playlist-item-artist-${artist}-${index}`,
    name: `playlist-item-name-${name}`,
    playlist: `playlist-item-playlist-${props.playlist}-${props.index}`,
    playlist_mobile: `playlist-item-playlist-mobile-${props.playlist}-${props.index}`,
    duration: `playlist-item-duration-${name}-${index}`,
  };

  return (
    <>
      <motion.div
        className="z-20 w-full h-full inset-0 absolute bg-slate-300/50 dark:bg-slate-900/70 rounded-lg overflow-clip"
        id="player-overlay"
      />

      <motion.div className="absolute inset-0 w-full h-full z-20 rounded-lg">
        <div className="flex h-full w-full items-center justify-center rounded-lg">
          <motion.div
            key={`music-player-item-${props.name}-${props.index}`}
            layoutId={`playlist-item-${props.name}-${props.index}`}
            ref={outsideRef}
            className="bg-slate-100 dark:bg-slate-950 p-8 pt-6 px-6 rounded-lg relative h-[410px] sm:h-72 z-30 shadow"
          >
            <div className="flex sm:justify-between gap-2 h-full flex-col max-w-64">
              <div className="hidden sm:inline-flex justify-between align-center items-center">
                <motion.p
                  key={`playlist-item-index-${props.index}`}
                  layoutId={`music-player-item-index-${props.index}`}
                  className="text-sm"
                >
                  {props.index + 1}
                </motion.p>
                <SpotifyExternalLink href={props.spotify_link} />
              </div>

              <div className="flex sm:flex-row sm:h-44 h-full flex-col gap-4 sm:mt-8 justify-start">
                <motion.p
                  layoutId={layoutIds["playlist_mobile"]}
                  key={`mobile-player-${props.playlist}-${props.index}`}
                  className="sm:hidden block text-xs text-center"
                >
                  {playlist}
                </motion.p>
                <motion.img
                  src={cover_url}
                  className="sm:w-28 sm:h-28 w-44 h-44 aspect-square mx-auto sm:mx-0 rounded-lg shadow-2xl"
                  alt="Album cover"
                  layoutId={layoutIds.coverImg}
                />
                <div className="flex flex-row sm:flex-col sm:text-left text-left sm:mt-2 mt-10">
                  <div className="max-w-64 flex flex-col">
                    <motion.p
                      layoutId={layoutIds.artist}
                      className="text-xs sm:text-md dark:text-slate-300"
                    >
                      {artist}
                    </motion.p>
                    <motion.p
                      layoutId={layoutIds.name}
                      className="text-xl font-medium text-wrap sm:text-2xl"
                    >
                      {name}
                    </motion.p>
                    <motion.p
                      key={`web-player-${props.playlist}-${props.index}`}
                      layoutId={layoutIds["playlist"]}
                      className="text-xs dark:text-slate-300 sm:block hidden"
                    >
                      {playlist}
                    </motion.p>
                  </div>
                  <div className="mt-auto gap-1 flex flex-row ml-auto sm:ml-0 items-center">
                    <div className="rounded-full inline-flex items-center justify-center w-6 h-6 bg-slate-700">
                      <SkipBack className="w-3 h-3 fill-slate-200 text-slate-200" />
                    </div>
                    <div className="rounded-full inline-flex items-center justify-center w-8 h-8 bg-slate-700">
                      <PlayIcon className="w-3 h-3 fill-slate-200 text-slate-200" />
                    </div>
                    <div className="rounded-full inline-flex items-center justify-center w-6 h-6 bg-slate-700">
                      <SkipForward className="w-3 h-3 fill-slate-200 text-slate-200" />
                    </div>
                    <div className="sm:hidden block ml-1">
                      <SpotifyExternalLink href={props.spotify_link} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gray-600 h-1 mt-3 sm:mt-6 sm:w-96 w-72 rounded-full"></div>
                <div className="flex justify-between mt-3 text-slate-600">
                  <div className="text-xs">0:00</div>
                  <div className="flex gap-2">
                    <Repeat2 className="h-4 w-4" />
                    <Shuffle className="h-4 w-4" />
                  </div>
                  <motion.p className="text-xs">{duration}</motion.p>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 h-full -z-10 w-full rounded-lg">
              <div className="h-[65%] sm:h-[66%] relative overflow-clip rounded-t-lg">
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
    playlist_mobile: `playlist-item-playlist-mobile-${props.playlist}-${props.index}`,
    duration: `playlist-item-duration-${props.name}-${props.index}`,
  };

  return (
    <LayoutGroup>
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
            className="inset-0 absolute bg-transparent -z-50 h-full w-full"
          />
          <motion.div className="grid grid-cols-custom-3 sm:grid-cols-custom-4 gap-4 items-center w-full z-10">
            <motion.p
              key={`playlist-item-index-${props.index}`}
              layoutId={`music-player-item-index-${props.index}`}
              className="hidden sm:block sm:text-sm"
            >
              {props.index + 1}
            </motion.p>
            <div className="flex items-center gap-4">
              <motion.img
                src={props.cover_url}
                className="h-10 w-10 rounded-md"
                alt="Album cover"
                layoutId={layoutIds["coverImg"]}
              />{" "}
              <div>
                <motion.p
                  layout
                  layoutId={layoutIds["name"]}
                  className="text-xs sm:text-sm font-medium"
                >
                  {props.name}
                </motion.p>
                <motion.p
                  layoutId={layoutIds["artist"]}
                  className="text-xs text-gray-600"
                >
                  {props.artist}
                </motion.p>
              </div>
            </div>
            <motion.p
              layoutId={layoutIds["playlist_mobile"]}
              className="sm:hidden block text-xs text-slate-500 text-left"
            >
              {props.playlist}
            </motion.p>
            <motion.p
              layoutId={layoutIds["playlist"]}
              className="sm:block hidden text-xs text-slate-500 text-left"
            >
              {props.playlist}
            </motion.p>
            {!isSelected && (
              <>
                <div className="flex items-center gap-6">
                  <motion.p className="text-xs">{props.duration}</motion.p>
                  <DotsHorizontalIcon className="h-5 w-5 sm:block hidden" />
                </div>
              </>
            )}{" "}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </LayoutGroup>
  );
}

export default function AnimatedLayout() {
  return (
    <CanvasWrapper
      background="bg-slate-100 dark:bg-slate-900/50"
      height="fit"
      caption="Framer Motion Magic ✨ Powerful Illusions"
    >
      <div className="w-full h-full px-4 py-2 sm:p-4 flex flex-col relative">
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

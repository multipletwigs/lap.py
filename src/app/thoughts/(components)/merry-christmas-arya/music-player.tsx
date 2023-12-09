"use client";
import React from "react";
import ReactPlayer from "react-player/youtube";

const MusicPlayer = () => {
  return (
    <ReactPlayer
      playing
      volume={0.1}
      url={["https://www.youtube.com/watch?v=bZzEBEgEplM"]}
      style={{ display: "none" }}
      pip={false}
    />
  );
};

export default MusicPlayer;

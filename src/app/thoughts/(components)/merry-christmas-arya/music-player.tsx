import React from "react";

const MusicPlayer = () => {
  return (
    <audio controls>
      <source src={"../../public/arya-christmas/arya-secret-santa-music.mp3"} />
      Your browser does not support the audio element.
    </audio>
  );
};

export default MusicPlayer;

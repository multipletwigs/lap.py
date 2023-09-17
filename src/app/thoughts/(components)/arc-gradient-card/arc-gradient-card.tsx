import React from "react";

const svg = `<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
  <filter id="noiseFilter">
    <feTurbulence
      type="fractalNoise"
      baseFrequency="0.65"
      numOctaves="3"
      stitchTiles="stitch"
    />
  </filter>

  <rect width="100%" height="100%" filter="url(#noiseFilter)" />
</svg>`;

const dataUrl = `data:image/svg+xml;base64,${btoa(svg)}`;

const ArcGradientCards = () => {
  return (
    <div className="flex flex-col justify-center items-center my-24">
      <div
        className={`bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 h-24 w-24 blur-xl rounded-full animate-bounce hover:[animation-play-state:paused]`}
      ></div>
    </div>
  );
};

export default ArcGradientCards;

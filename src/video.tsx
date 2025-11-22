"use client"

import { useState } from "react";
import { useEffect } from "react";

// Custom video component that handles mobile properly
export function CustomVideo(props: React.VideoHTMLAttributes<HTMLVideoElement>) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <video
      {...props}
      autoPlay={isMobile ? false : props.autoPlay}
      playsInline
      controls={isMobile ? true : props.controls}
      preload="metadata"
      className="w-full rounded-lg my-4"
      style={{ maxHeight: '70vh' }}
    />
  );
}

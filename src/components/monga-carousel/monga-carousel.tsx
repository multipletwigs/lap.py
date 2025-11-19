"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "next-view-transitions";

const projects = [
  {
    name: "Pinata Hackathon",
    media: "/projects/pinata-hackathon/pinata-hackathon.gif",
    type: "image" as const,
    href: "/projects/devto-pinata-hackathon",
  },
  {
    name: "Taylor's Hackathon",
    media: "/projects/taylors-hackathon/resumetry-demo.gif",
    type: "image" as const,
    href: "/projects/taylors-hackathon",
  },
  {
    name: "Dell Hackathon",
    media: "/projects/dell-hackathon/demo.png",
    type: "image" as const,
    href: "/projects/dell-hackathon",
  },
  {
    name: "SprintMaster",
    media: "/projects/sprintmaster/sprintmaster_demo.mp4",
    type: "video" as const,
    href: "/projects/sprintmaster",
  },
  {
    name: "Supabase CTF",
    media: "/projects/supabase-ctf/ctf-flags.png",
    type: "image" as const,
    href: "/projects/supabase-ctf",
  },
];

export function MongaCarousel() {
  return (
    <div className="-mx-6 lg:-mx-12 my-6 overflow-hidden">
      <div className="overflow-x-auto snap-x snap-mandatory scrollbar-hidden">
        <div className="flex gap-6 px-6 lg:px-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
          {/* Spacer for right padding */}
          <div className="flex-shrink-0 w-6 lg:w-12" />
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <Link href={project.href} prefetch={true}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group flex-shrink-0 w-[400px] snap-center rounded-2xl overflow-hidden bg-background border border-border shadow-xl cursor-pointer"
      >
        <div className="relative w-full aspect-video overflow-hidden">
          {project.type === "video" ? (
            <video
              ref={videoRef}
              src={project.media}
              loop
              muted
              playsInline
              preload="metadata"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
            />
          ) : (
            <Image
              src={project.media}
              alt={project.name}
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
              sizes="400px"
              priority={index < 2}
              unoptimized
            />
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 pointer-events-none" />
          
          {/* Title */}
          <div className="absolute bottom-0 left-0 right-0 p-5 pointer-events-none">
            <h3 className="text-white font-semibold text-base tracking-tight drop-shadow-lg">{project.name}</h3>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

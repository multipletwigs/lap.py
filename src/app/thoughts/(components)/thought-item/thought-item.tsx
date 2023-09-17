"use client";

import { metadata } from "@/app/thoughts/(thoughts)/directory";
import { MDXMetaData } from "@/app/thoughts/page";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLayoutEffect, useRef, useState } from "react";

export const ThoughtItem = (thought: MDXMetaData) => {
  // get current mouse position
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const itemRef = useRef<HTMLAnchorElement>(null);

  useLayoutEffect(() => {
    // Get position of current element
    const updateMousePosition = (ev: MouseEvent) => {
      const rect = itemRef.current?.getBoundingClientRect();

      // calculate position of mouse relative to element
      const x = ev.clientX - (rect?.left ?? 0);
      const y = ev.clientY - (rect?.top ?? 0);

      setMousePosition({ x: x, y: y });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  });

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <a
            ref={itemRef}
            key={thought.title}
            className="flex flex-row justify-between hover:text-slate-500 transition-colors duration-300 hover:cursor-pointer"
            href={`/thoughts/${thought.title}`}
          >
            <h2 className="text-lg font-bold">
              {metadata[thought.title].displayTitle}
            </h2>
            <p className="text-sm">{thought.createdAt}</p>
          </a>
        </TooltipTrigger>
        <TooltipContent
          align="start"
          alignOffset={mousePosition.x - 50}
          sideOffset={-mousePosition.y + 5}
        >
          {metadata[thought.title].description}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

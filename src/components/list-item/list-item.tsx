"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLayoutEffect, useRef, useState } from "react";
import { MDXDirMetadata } from "@/app/thoughts/(thoughts)/directory";

export interface ListItemProp {
  MDXMetadata: MDXDirMetadata;
  route: "projects" | "thoughts";
}

export const ListItem = (props: ListItemProp) => {

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

  // return null if no mdx metadata is provided
  if (!props.MDXMetadata) return null;

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <a
            ref={itemRef}
            key={props.MDXMetadata.title}
            className="flex flex-row items-center justify-between hover:text-slate-500 transition-colors duration-300 hover:cursor-pointer"
            href={`/${props.route}/${props.MDXMetadata.title}`}
          >
            <h2 className="text-lg font-semibold">
              {props.MDXMetadata.displayTitle}
            </h2>
            <p className="text-sm">{props.MDXMetadata.cdate}</p>
          </a>
        </TooltipTrigger>
        <TooltipContent
          align="start"
          alignOffset={mousePosition.x - 50}
          sideOffset={-mousePosition.y + 5}
        >
          {props.MDXMetadata.description}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

"use client";

import React, { useEffect, useState } from "react";
import CanvasWrapper from "../react-fiber-experiment/canvas-wrapper";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface AnimationRichButtonProps {
  beforeIcon: LucideIcon; // Icon before action (default: CopyIcon)
  afterIcon: LucideIcon; // Icon after action (default: CheckIcon)
  loopIcons: boolean; // If true, loop the icon change
  customClassName?: string; // Custom class name for the button
  customStyle?: React.CSSProperties; // Custom inline styles for the button
  customBeforeIcon?: JSX.Element; // Custom before-action icon
  customAfterIcon?: JSX.Element; // Custom after-action icon
  onClick: any;
}

export const AnimationRichButton = (
  props: Partial<AnimationRichButtonProps>,
) => {
  const [copied, setCopied] = useState<boolean>(false);
  const variants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
  };

  useEffect(() => {
    if (props.loopIcons && copied) {
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    }
  }, [copied]);

  const BeforeIcon = props.customBeforeIcon || <CopyIcon />;
  const AfterIcon = props.customAfterIcon || <CheckIcon />;

  return (
    <button
      onClick={() => {
        setCopied((prev) => !prev);
        if (props.onClick) props.onClick();
      }}
      className={`h-8 w-8 flex items-center justify-center rounded-lg dark:bg-slate-900 bg-slate-200 border-slate-300 text-slate-400 dark:border-slate-800 border ${
        props.customClassName || ""
      }`}
      style={props.customStyle}
    >
      <AnimatePresence mode={"wait"} initial={false}>
        {copied ? (
          <motion.span
            key="checkmark"
            variants={{ ...variants }}
            initial={"hidden"}
            animate={"visible"}
            exit={"hidden"}
          >
            {AfterIcon}
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            variants={{ ...variants }}
            initial={"hidden"}
            animate={"visible"}
            exit={"hidden"}
          >
            {BeforeIcon}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
};

const AnimatedIcons = () => {
  return (
    <CanvasWrapper
      caption="Animated Copy Buttons"
      height="100px"
      background="bg-transparent dark:bg-transparent"
    >
      <div className="flex flex-row h-full gap-2 justify-center items-center">
        <AnimationRichButton />
        <AnimationRichButton />
        <AnimationRichButton />
        <AnimationRichButton />
        <AnimationRichButton />
        <AnimationRichButton />
      </div>
    </CanvasWrapper>
  );
};
export default AnimatedIcons;

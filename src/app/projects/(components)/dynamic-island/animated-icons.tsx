"use client";

import React, { useEffect, useState } from "react";
import CanvasWrapper from "../react-fiber-experiment/canvas-wrapper";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";


const AnimationRichButton = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const variants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
  };

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    }
  }, [copied]);

  return (
    <button
      onClick={() => setCopied(true)}
      className="h-8 w-8 flex items-center justify-center rounded-lg dark:bg-slate-900 bg-slate-200 border-slate-300 text-slate-400 dark:border-slate-800 border"
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
            <CheckIcon />
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            variants={{ ...variants }}
            initial={"hidden"}
            animate={"visible"}
            exit={"hidden"}
          >
            <CopyIcon />
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
      background="bg-transparent"
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

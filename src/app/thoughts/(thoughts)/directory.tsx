import { ReactNode } from "react";
import Beginning from "@/app/thoughts/(thoughts)/the-beginning.mdx";
import IGraduated from "@/app/thoughts/(thoughts)/i-graduated.mdx";
import Photoshoot from "@/app/thoughts/(thoughts)/photoshoot.mdx";
import Frustrated from "@/app/thoughts/(thoughts)/frustrated.mdx";
import Summer from "@/app/thoughts/(thoughts)/500-days-of-summer.mdx";
import FailedBlogs from "@/app/thoughts/(thoughts)/why-i-failed-at-building-blogs.mdx";

type Title = string;

export interface MDXDirMetadata {
  title: string;
  displayTitle: string;
  component: ReactNode;
  cdate: string;
  description?: string;
  label?: string;
}

export type ThoughtsDirectory = Record<Title, MDXDirMetadata>;

const metadata: ThoughtsDirectory = {
  "why-i-failed-at-building-blogs": {
    title: "why-i-failed-at-building-blogs",
    displayTitle: "Why I failed at building blogs",
    component: <FailedBlogs />,
    cdate: "2024-08-24",
    description: "Scope creep is a horrible thing to see.",
  },
  "the-beginning": {
    title: "the-beginning",
    displayTitle: "第 N 個開始",
    component: <Beginning />,
    cdate: "2023-09-18",
    description:
      "Some of the reasons on why I started building this again? Maybe it's time for me to start writing again.",
  },
  "500-days-of-summer": {
    title: "500-days-of-summer",
    displayTitle: "(500) Days of Summer thoughts",
    component: <Summer />,
    cdate: "2024-05-19",
    description: "An honest review about a story about love (not a love story)",
  },
  "i-graduated": {
    title: "i-graduated",
    displayTitle: "Graduation hurts",
    component: <IGraduated />,
    cdate: "2023-09-22",
    description: "How I wish I didn't try so hard.",
  },
  photoshoot: {
    title: "photoshoot",
    displayTitle: "Photoshoot for myself",
    component: <Photoshoot />,
    cdate: "2023-10-08",
    description: "I'm not a model, but I can pretend to be one.",
  },
  frustrated: {
    title: "frustrated",
    displayTitle: "Frustrations",
    component: <Frustrated />,
    cdate: "2024-03-07",
    description: "A beginning of the year retrospect",
  },
};

export default metadata;

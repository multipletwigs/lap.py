import { ReactNode } from "react";
import Beginning from "@/app/thoughts/(thoughts)/the-beginning.mdx";
import IGraduated from "@/app/thoughts/(thoughts)/i-graduated.mdx";
import Photoshoot from "@/app/thoughts/(thoughts)/photoshoot.mdx";
import Frustrated from "@/app/thoughts/(thoughts)/frustrated.mdx";

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
  "the-beginning": {
    title: "the-beginning",
    displayTitle: "第 N 個開始",
    component: <Beginning />,
    cdate: "2023-09-18",
    description:
      "Some of the reasons on why I started building this again? Maybe it's time for me to start writing again.",
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
  "frustrated":{
    title: "frustrated",
    displayTitle: "Frustrations",
    component: <Frustrated />,
    cdate: "2024-03-07",
    description: "A beginning of the year retrospect",
  }
};

export default metadata;

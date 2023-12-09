import { ReactNode } from "react";
import Beginning from "@/app/thoughts/(thoughts)/the-beginning.mdx";
import IGraduated from "@/app/thoughts/(thoughts)/i-graduated.mdx";
import Photoshoot from "@/app/thoughts/(thoughts)/photoshoot.mdx";
import MerryChristmas from "@/app/thoughts/(thoughts)/merry-christmas-arya.mdx";

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
  "merry-christmas-arya": {
    title: "merry-christmas-arya",
    displayTitle: "Merry Christmas Arya",
    component: <MerryChristmas />,
    cdate: "2023-12-25",
    description: "I'm not a model, but I can pretend to be one.",
  },
};

export default metadata;

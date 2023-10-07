import { ReactNode } from "react";
import Beginning from "@/app/thoughts/(thoughts)/the-beginning.mdx";
import IGraduated from "@/app/thoughts/(thoughts)/i-graduated.mdx";

type Title = string;

export interface MDXDirMetadata {
  title: string;
  displayTitle: string;
  component: ReactNode;
  cdate: string;
  description?: string;
}

export type ThoughtsDirectory = Record<Title, MDXDirMetadata>;

const metadata: ThoughtsDirectory = {
  "the-beginning": {
    title: "the-beginning",
    displayTitle: "第 N 個開始",
    component: <Beginning />,
    cdate: "17/09/2023",
    description:
      "Some of the reasons on why I started building this again? Maybe it's time for me to start writing again.",
  },
  "i-graduated": {
    title: "i-graduated",
    displayTitle: "Graduation sucks",
    component: <IGraduated />,
    cdate: "22/09/2023",
    description: "How I wish I didn't try so hard.",
  },
};

export default metadata;

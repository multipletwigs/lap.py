import { ReactNode } from "react";
import Beginning from "@/app/thoughts/(thoughts)/the-beginning.mdx";

interface MDXMetadata {
  title: string;
  displayTitle: string;
  component: ReactNode;
}

export const metadata: Record<string, MDXMetadata> = {
  "the-beginning": {
    title: "the-beginning",
    displayTitle: "开始？",
    component: <Beginning />,
  },
};

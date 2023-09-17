import { ReactNode } from "react";
import Beginning from "@/app/thoughts/(thoughts)/the-beginning.mdx";
import OnLife from "@/app/thoughts/(thoughts)/on-life.mdx";
import ArcGradientCards from "@/app/thoughts/(thoughts)/arc-gradient-cards.mdx";

interface MDXMetadata {
  title: string;
  displayTitle: string;
  component: ReactNode;
  description?: string;
}

export const metadata: Record<string, MDXMetadata> = {
  "the-beginning": {
    title: "the-beginning",
    displayTitle: "第 N 個開始",
    component: <Beginning />,
    description:
      "Some of the reasons on why I started building this again? Maybe it's time for me to start writing again.",
  },
  "on-life": {
    title: "on-life",
    displayTitle: "關於生活",
    component: <OnLife />,
    description: "想成功，就要先失敗，想失敗，就要先開始。",
  },
  "arc-gradient-cards": {
    title: "arc-gradient-cards",
    displayTitle: "Arc Gradient Cards",
    component: <ArcGradientCards />,
    description: "A simple card component with an arc gradient background.",
  },
};

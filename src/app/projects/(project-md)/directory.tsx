import { MDXDirMetadata } from "@/app/thoughts/(thoughts)/directory";
import ArcGradientCards from "@/app/projects/(project-md)/arc-gradient-cards.mdx";

type Category = string;
type Title = string;
export type DirectoryMetadataWCat = Record<
  Category,
  Record<Title, MDXDirMetadata>
>;

const metadata: DirectoryMetadataWCat = {
  "Design Projects": {
    "arc-gradient-cards": {
      title: "arc-gradient-cards",
      displayTitle: "Arc Gradient Cards",
      component: <ArcGradientCards />,
      description: "A simple card component with an arc gradient background.",
      cdate: "19/09/2023",
    },
  },
};

export default metadata;

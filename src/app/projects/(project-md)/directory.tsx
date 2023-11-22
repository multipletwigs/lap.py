import { MDXDirMetadata } from "@/app/thoughts/(thoughts)/directory";

// Design Experiments
import ArcGradientCards from "@/projects/arc-gradient-cards.mdx";
import ReactFibreExperiment from "@/projects/react-three-fiber-playground.mdx";

// Hackathons
import DellHackathon from "@/projects/dell-hackathon.mdx";
import TaylorsHackathon from "@/projects/taylors-hackathon.mdx";

// Academic and School
import FYP from "@/projects/final-year-project.mdx";
import UReview from "@/projects/ureview.mdx";

export type Category =
  | "Design Experiments"
  | "Hackathons"
  | "Open Source Work and Projects"
  | "Academics and School";
type Title = string;
export type DirectoryMetadataWCat = Record<
  Category,
  Record<Title, MDXDirMetadata>
>;

const metadata: DirectoryMetadataWCat = {
  "Design Experiments": {
    "arc-gradient-cards": {
      title: "arc-gradient-cards",
      displayTitle: "Arc Gradient Cards",
      component: <ArcGradientCards key={"arc-gradient-cards"} />,
      description: "A simple card component with an arc gradient background.",
      cdate: "2023-09-19",
    },
    "react-three-fiber-playground": {
      title: "react-three-fiber-playground",
      displayTitle: "Experimental Playground",
      component: <ReactFibreExperiment key={"React-fibre"} />,
      description: "Playing with 3D designs using react-three-fiber.",
      cdate: "2023-10-19",
    },
  },
  Hackathons: {
    "dell-hackathon": {
      title: "dell-hackathon",
      displayTitle: "Dell Hack2Hire",
      component: <DellHackathon key={"Dell-Hackathon"} />,
      description: "A hackathon hosted by Dell Malaysia.",
      cdate: "2023-06-11",
    },
    "taylor-hackathon": {
      title: "taylor-hackathon",
      displayTitle: "Taylor's Impact Hackathon",
      component: <TaylorsHackathon key={"Taylors-Hackathon"} />,
      description: "How Vercel and OpenAI won me the competition.",
      cdate: "2023-07-11",
    },
  },
  "Open Source Work and Projects": {
    sprintmaster: {
      title: "sprintmaster",
      displayTitle: "SprintMaster",
      component: <DellHackathon key={"SprintMaster"} />,
      description: "A hackathon hosted by Dell Malaysia.",
      cdate: "2023-06-11",
    },
    satori: {
      title: "satori",
      displayTitle: "Satori",
      component: <DellHackathon key={"Satori"} />,
      description: "A hackathon hosted by Dell Malaysia.",
      cdate: "2023-06-11",
    },
  },
  "Academics and School": {
    "final-year-project": {
      title: "final-year-project",
      displayTitle: "Getting the highest for my FYP",
      component: <FYP key={"final-year-project"} />,
      description: "Final grade of 92, highest in my cohort.",
      cdate: "2023-07-10",
    },
    ureview: {
      title: "ureview",
      displayTitle: "How I manage UReview while studying full-time",
      component: <UReview key={"ureview"} />,
      description: "Managing unit feedback for Monash.",
      cdate: "2023-07-10",
    },
  },
};

export default metadata;

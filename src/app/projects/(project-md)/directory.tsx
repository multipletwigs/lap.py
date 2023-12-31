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

// Open source work and projects
import SprintMaster from "@/projects/sprintmaster.mdx";
import Satori from "@/projects/satori.mdx";

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
      displayTitle: "🥉 Event Dashboard - Dell Hack2Hire",
      component: <DellHackathon key={"Dell-Hackathon"} />,
      description:
        "A 24HR hackathon to build a dashboard to manage internal events for Dell",
      cdate: "2023-06-11",
    },
    "taylor-hackathon": {
      title: "taylor-hackathon",
      displayTitle: "🥈 Resumetry - ImpactHack",
      component: <TaylorsHackathon key={"Taylors-Hackathon"} />,
      description: "How Vercel and OpenAI won me a brief two day competition.",
      cdate: "2023-07-11",
    },
  },
  "Open Source Work and Projects": {
    sprintmaster: {
      title: "sprintmaster",
      displayTitle: "SprintMaster, AI Jira Helper",
      component: <SprintMaster key={"SprintMaster"} />,
      description: "An AI Jira helper to write sprints",
      cdate: "2023-06-11",
    },
    satori: {
      title: "satori",
      displayTitle: "Satori and Vercel OG",
      component: <Satori key={"Satori"} />,
      description: "A small contribution to a beautifully written library.",
      cdate: "2023-06-11",
    },
    "zach-khong-info": {
      title: "zach-khong-info",
      displayTitle: "Portfolio site v1",
      component: <Satori key={"zach-khong-info"} />,
      description: "my old portfolio site using Notion API with Next JS.",
      cdate: "2022-11-30",
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
      displayTitle: "Managing UReview and University",
      component: <UReview key={"ureview"} />,
      description: "Managing unit feedback for Monash.",
      cdate: "2023-07-10",
    },
    "about-monash": {
      title: "about-monash",
      displayTitle: "Thoughts on Monash Malaysia",
      component: <UReview key={"about-monash"} />,
      description: "Managing unit feedback for Monash.",
      cdate: "2023-07-10",
    },
  },
};

export default metadata;

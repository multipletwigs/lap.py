import { MDXDirMetadata } from "@/app/thoughts/(thoughts)/directory";

// Design Experiments
import ArcGradientCards from "@/projects/arc-gradient-cards.mdx";
// import ReactFibreExperiment from "@/projects/react-three-fiber-playground.mdx";

// Hackathons
import DellHackathon from "@/projects/dell-hackathon.mdx";
import TaylorsHackathon from "@/projects/taylors-hackathon.mdx";

// Academic and School
import FYP from "@/projects/final-year-project.mdx";
import UReview from "@/projects/ureview.mdx";

// Open source work and projects
import SprintMaster from "@/projects/sprintmaster.mdx";
import OSS from "@/projects/open-source-work.mdx";

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
  },
  Hackathons: {
    "dell-hackathon": {
      title: "dell-hackathon",
      displayTitle: "🥉 Dell Hack2Hire",
      component: <DellHackathon key={"Dell-Hackathon"} />,
      description:
        "A 24HR hackathon to build a dashboard to manage internal events for Dell",
      cdate: "2023-06-11",
    },
    "taylor-hackathon": {
      title: "taylor-hackathon",
      displayTitle: "🥈 ImpactHack",
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
    "open-source-work": {
      title: "open-source-work",
      displayTitle: "OSS!? Me?",
      component: <OSS key={"Satori"} />,
      description: "RAHHHH WHAT IS OPEN SOURCE?!?!?",
      cdate: "2023-06-11",
    },
    "zach-khong-info": {
      title: "zach-khong-info",
      displayTitle: "Portfolio site v1",
      component: <OSS key={"zach-khong-info"} />,
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
      displayTitle: "UReview and University",
      component: <UReview key={"ureview"} />,
      description: "Managing unit feedback for Monash.",
      cdate: "2023-07-10",
    },
  },
};

export default metadata;

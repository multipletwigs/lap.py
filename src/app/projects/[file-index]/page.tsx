import React from "react";
import fs from "fs";
import metadata, { Category } from "../(project-md)/directory";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { "file-index": string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // Use find() to stop at the first match
  const page_metadata: any = Object.keys(metadata).find(
    (category) => metadata[category as Category][params["file-index"]],
  );

  if (!page_metadata) {
    return {
      title: ">ᴗ< Nightly | Does not exist :(",
    };
  }

  // Now fetch the correct metadata based on the found category
  const metadataDetails =
    metadata[page_metadata as Category][params["file-index"]];

  return {
    title: `>ᴗ< Nightly | ${metadataDetails.displayTitle}`,
    description: `${metadataDetails.description}`,
  };
}

export async function generateStaticParams() {
  const projects = fs
    .readdirSync("./src/app/projects/(project-md)")
    .filter((project) => {
      return project.includes(".mdx");
    });

  return projects.map((project) => ({
    "file-index": project.replace(".mdx", ""),
  }));
}

const ProjectsContent = ({ params }: { params: { "file-index": string } }) => {
  return (
    <div>
      {Object.keys(metadata).map((category) => {
        // ignore if undefined
        if (metadata[category as Category][params["file-index"]])
          return metadata[category as Category][params["file-index"]].component;
      })}
    </div>
  );
};

export default ProjectsContent;

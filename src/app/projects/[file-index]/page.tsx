import React from "react";
import fs from "fs";
import metadata, { Category } from "../(project-md)/directory";
import { Metadata } from "next";
import { ContentRailNavigation, AutoBreadcrumbs } from "@/components/navigation";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ "file-index": string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
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

const ProjectsContent = async ({ params }: Props) => {
  const resolvedParams = await params;
  const slug = resolvedParams["file-index"];

  // Find the project across all categories
  let project = null;
  let projectCategory = null;

  for (const category of Object.keys(metadata)) {
    const found = metadata[category as Category][slug];
    if (found) {
      project = found;
      projectCategory = category;
      break;
    }
  }

  if (!project) {
    notFound();
  }

  return (
    <article className="flex flex-col gap-4">
      <AutoBreadcrumbs
        customTitle={project.displayTitle}
        customDescription={project.description}
      />
      <div className="space-y-4">{project.component}</div>
    </article>
  );
};

export default ProjectsContent;

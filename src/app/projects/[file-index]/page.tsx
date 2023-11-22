import React from "react";
import fs from "fs";
import metadata, { Category } from "../(project-md)/directory";

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

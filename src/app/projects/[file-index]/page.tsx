import React from "react";
import fs from "fs";
import metadata from "../(project-md)/directory";

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
        return metadata[category][params["file-index"]].component;
      })}
    </div>
  );
};

export default ProjectsContent;

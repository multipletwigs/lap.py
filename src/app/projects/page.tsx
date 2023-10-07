import React from "react";
import metadata from "./(project-md)/directory";
import ListItem from "@/components/list-item";

const Projects = () => {
  return Object.keys(metadata).map((catTitle, idx) => {
    return (
      <h1 key={catTitle + idx}>
        {/* Temporary fix to reduce layout shift */}
        <div className="mb-2">{catTitle}</div>
        {/* Temporary fix to reduce layout shift */}
        {Object.keys(metadata[catTitle]).map((mdxTitle, idx) => {
          return (
            <ListItem
              key={mdxTitle + idx}
              MDXMetadata={metadata[catTitle][mdxTitle]}
              route={"projects"}
            />
          );
        })}
      </h1>
    );
  });
};

export default Projects;

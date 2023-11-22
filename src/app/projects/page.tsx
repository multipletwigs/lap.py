"use client";

import React from "react";
import metadata, { Category } from "./(project-md)/directory";
import ListItem from "@/components/list-item";
import { Separator } from "@/components/ui/separator";

const Projects = () => {
  return Object.keys(metadata).map((catTitle, idx) => {
    return (
      <h1 key={catTitle + idx}>
        {/* Temporary fix to reduce layout shift */}
        {idx !== 0 && <Separator className="my-4" />}
        <div className="mb-2">{catTitle}</div>
        {/* Temporary fix to reduce layout shift */}
        {Object.keys(metadata[catTitle as Category]).map((mdxTitle, idx) => {
          return (
            <ListItem
              key={mdxTitle + idx}
              MDXMetadata={metadata[catTitle as Category][mdxTitle]}
              route={"projects"}
            />
          );
        })}
      </h1>
    );
  });
};

export default Projects;

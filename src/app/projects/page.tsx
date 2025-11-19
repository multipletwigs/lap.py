import React from "react";
import metadata, { Category } from "./(project-md)/directory";
import ListItem from "@/components/list-item";
import { Separator } from "@/components/ui/separator";
import dayjs from "dayjs";
import { Metadata } from "next";
import { AutoBreadcrumbs } from "@/components/navigation";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Experimentations and Showcases`,
    description: `Let me show off some of the things I like to do...`,
  };
}

const Projects = () => {
  return (
    <div className="flex flex-col gap-2 lg:gap-8">
      <AutoBreadcrumbs
        customTitle="Projects"
        customDescription="Experimentations and showcases of things I like to do."
      />
      <div className="flex flex-col">
        {Object.keys(metadata).map((catTitle, idx) => {
          return (
            <div key={catTitle + idx}>
              {idx !== 0 && <Separator className="my-4" />}
              <h1 className="mb-4">{catTitle}</h1>
              <div className="flex flex-col gap-2">
                {Object.keys(metadata[catTitle as Category])
                  .sort((article1, article2) => {
                    const date1 = dayjs(
                      metadata[catTitle as Category][article1].cdate,
                    );
                    const date2 = dayjs(
                      metadata[catTitle as Category][article2].cdate,
                    );
                    return date1.isAfter(date2) ? -1 : 1;
                  })
                  .map((mdxTitle, idx) => {
                    return (
                      <ListItem
                        key={mdxTitle + idx}
                        MDXMetadata={metadata[catTitle as Category][mdxTitle]}
                        route={"projects"}
                      />
                    );
                  })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Projects;

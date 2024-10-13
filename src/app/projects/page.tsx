import React from "react";
import metadata, { Category } from "./(project-md)/directory";
import ListItem from "@/components/list-item";
import { Separator } from "@/components/ui/separator";
import dayjs from "dayjs";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  // Now fetch the correct metadata based on the found category
  return {
    title: `>ᴗ< Nightly | Experimentations and Showcases`,
    description: `Let me show off some of the things I like to do...`,
    openGraph: {
      images:
        "https://pinata.nightly.ink/api/get-og?cid=bafybeif7bnf4zu2jfg2nzwdnhlp6ky66c3wg3jm5woj3yv7cpxwvyjnzgu",
    },
  };
}
const Projects = () => {
  return Object.keys(metadata).map((catTitle, idx) => {
    return (
      <h1 key={catTitle + idx}>
        {/* Temporary fix to reduce layout shift */}
        {idx !== 0 && <Separator className="my-4" />}
        <div className="mb-4">{catTitle}</div>
        {/* Temporary fix to reduce layout shift */}
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
      </h1>
    );
  });
};

export default Projects;

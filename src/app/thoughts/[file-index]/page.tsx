import React from "react";
import fs from "fs";
import metadata from "../(thoughts)/directory";
import { Metadata } from "next";
import { ContentRailNavigation, AutoBreadcrumbs } from "@/components/navigation";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ "file-index": string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const metadataDetails = metadata[params["file-index"]];
  if (!metadataDetails) {
    return { title: "Does not exist :(" };
  }

  return {
    title: `>ᴗ< Nightly | ${metadataDetails.displayTitle}`,
    description: `${metadataDetails.description}`,
  };
}

export async function generateStaticParams() {
  const thoughts = fs
    .readdirSync("./src/app/thoughts/(thoughts)")
    .filter((thought) => {
      return thought.includes(".mdx");
    });

  return thoughts.map((thought) => ({
    "file-index": thought.replace(".mdx", ""),
  }));
}

const ThoughtsContent = async ({ params }: Props) => {
  const resolvedParams = await params;
  const slug = resolvedParams["file-index"];
  const thought = metadata[slug];

  if (!thought) {
    notFound();
  }

  return (
    <article className="flex flex-col lg:gap-4">
      <AutoBreadcrumbs
        customTitle={thought.displayTitle}
        customDescription={thought.description}
      />
      <div className="space-y-4">{thought.component}</div>
    </article>
  );
};

export default ThoughtsContent;

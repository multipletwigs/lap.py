import React from "react";
import fs from "fs";
import metadata from "../(thoughts)/directory";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { "file-index": string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // Now fetch the correct metadata based on the found category
  const metadataDetails = metadata[params["file-index"]];
  if (!metadataDetails) {
    return { title: ">ᴗ< Nightly | Does not exist :(" };
  }

  // Now fetch the correct metadata based on the found category
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

const ThoughtsContent = ({ params }: { params: { "file-index": string } }) => {
  return <div>{metadata[params["file-index"]].component}</div>;
};

export default ThoughtsContent;

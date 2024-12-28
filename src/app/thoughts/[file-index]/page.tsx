import React from "react";
import fs from "fs";
import metadata from "../(thoughts)/directory";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ "file-index": string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const params = await props.params;
  // Now fetch the correct metadata based on the found category
  const metadataDetails = metadata[params["file-index"]];
  if (!metadataDetails) {
    return { title: "Does not exist :(" };
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

const ThoughtsContent = async (props: {
  params: Promise<{ "file-index": string }>;
}) => {
  const params = await props.params;
  return <div>{metadata[params["file-index"]].component}</div>;
};

export default ThoughtsContent;

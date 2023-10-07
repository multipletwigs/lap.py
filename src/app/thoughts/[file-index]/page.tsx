import React from "react";
import fs from "fs";
import metadata from "../(thoughts)/directory";

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

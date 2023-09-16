import React from "react";
import fs from "fs";
import { metadata } from "../(thoughts)/directory";

export async function generateStaticParams() {
  const thoughts = fs
    .readdirSync("./src/app/thoughts/(thoughts)")
    .filter((thought) => {
      return thought.includes(".mdx");
    });

  return thoughts.map((thought, index) => ({
    "file-index": thought.replace(".mdx", ""),
  }));
}

const ThoughtsContent = ({ params }: { params: { "file-index": string } }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-10">
        {metadata[params["file-index"]].displayTitle}
      </h1>
      {metadata[params["file-index"]].component}
    </div>
  );
};

export default ThoughtsContent;

import React from "react";
import fs from "fs";
import { metadata } from "./(thoughts)/directory";

interface MDXMetaData {
  title: string;
  createdAt: string;
  updatedAt: string;
}

// Return a list of all files in thoughts
const getThoughts = (): MDXMetaData[] => {
  const thoughts = fs.readdirSync("./src/app/thoughts/(thoughts)");
  const allMetaData = thoughts.map((thought) => {
    const file = fs.statSync(`./src/app/thoughts/(thoughts)/${thought}`);

    return {
      title: thought.replace(".mdx", ""),
      createdAt: file.birthtime.toDateString(),
      updatedAt: file.mtime.toDateString(),
    };
  });
  return allMetaData;
};

const Thoughts = () => {
  return (
    <div>
      {getThoughts().map((thought) => {
        return (
          <a
            key={thought.title}
            className="flex flex-row justify-between text-bold"
            href={`/thoughts/${thought.title}`}
          >
            {metadata[thought.title]?.displayTitle}
          </a>
        );
      })}
    </div>
  );
};

export default Thoughts;

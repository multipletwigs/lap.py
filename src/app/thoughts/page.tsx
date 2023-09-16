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
      createdAt: file.birthtime.toISOString().split("T")[0].replace(/-/g, "/"),
      updatedAt: file.mtime.toDateString(),
    };
  });
  return allMetaData;
};

const Thoughts = () => {
  return (
    <div>
      <h1 className="text-lg font-bold mb-10">Thoughts</h1>
      {getThoughts().map((thought) => {
        if (thought.title === "directory.tsx") return null;
        return (
          <a
            key={thought.title}
            className="flex flex-row justify-between hover:text-slate-500 transition-colors duration-300 hover:cursor-pointer"
            href={`/thoughts/${thought.title}`}
          >
            <h2 className="text-md font-bold">
              {metadata[thought.title].displayTitle}
            </h2>
            <p className="text-sm">{thought.createdAt}</p>
          </a>
        );
      })}
    </div>
  );
};

export default Thoughts;

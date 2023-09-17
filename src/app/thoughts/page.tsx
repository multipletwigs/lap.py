import React from "react";
import fs from "fs";
import ThoughtItem from "./(components)/thought-item";

export interface MDXMetaData {
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
    <div className="flex flex-col gap-2">
      {getThoughts().map((thought) => {
        if (thought.title === "directory.tsx") return null;
        return <ThoughtItem key={thought.title} {...thought} />;
      })}
    </div>
  );
};

export default Thoughts;

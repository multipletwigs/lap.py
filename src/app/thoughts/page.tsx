import React from "react";
import ListItem from "../../components/list-item";
import metadata from "./(thoughts)/directory";
import { getArticle } from "../(lib)/utils";

const Thoughts = () => {
  return (
    <div className="flex flex-col gap-2">
      {getArticle("./src/app/thoughts/(thoughts)").map((thought) => {
        if (thought.title === "directory.tsx") return null;
        return (
          <ListItem
            key={thought.title}
            MDXMetadata={metadata[thought.title]}
            route={"thoughts"}
          />
        );
      })}
    </div>
  );
};

export default Thoughts;

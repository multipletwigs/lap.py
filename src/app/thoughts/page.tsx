import React from "react";
import dayjs from "dayjs";
import ListItem from "../../components/list-item";
import metadata from "./(thoughts)/directory";
import { getArticle } from "../(lib)/utils";

const Thoughts = () => {
  return (
    <div className="flex flex-col gap-2">
      {getArticle("./src/app/thoughts/(thoughts)")
        .filter((thought) => thought.title !== "directory.tsx")
        .sort((article1, article2) => {
          const date1 = dayjs(metadata[article1.title].cdate);
          const date2 = dayjs(metadata[article2.title].cdate);
          return date1.isAfter(date2) ? -1 : 1;
        })
        .map((thought) => {
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

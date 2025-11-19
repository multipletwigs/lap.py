import React from "react";
import dayjs from "dayjs";
import ListItem from "../../components/list-item";
import metadata from "./(thoughts)/directory";
import { getArticle } from "../(lib)/utils";
import { Metadata } from "next";
import { AutoBreadcrumbs } from "@/components/navigation";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Small peek into my life`,
    description: `Random thoughts and view on things.`,
  };
}

const Thoughts = () => {
  return (
    <div className="flex flex-col gap-2 lg:gap-8">
      <AutoBreadcrumbs
        customTitle="Thoughts"
        customDescription="Random thoughts and views on things."
      />
      <div className="flex flex-col gap-4">
        {getArticle("./src/app/thoughts/(thoughts)")
          .filter((thought) => thought.title !== "directory.tsx")
          .sort((article1, article2) => {
            const cdate1 = metadata[article1.title];
            const cdate2 = metadata[article2.title];

            const date1 = dayjs(cdate1.cdate);
            const date2 = dayjs(cdate2.cdate);
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
    </div>
  );
};

export default Thoughts;

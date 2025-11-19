import React from "react";
import ListItem from "@/components/list-item";
import dayjs from "dayjs";
import { getAllMDXData } from "@/lib/mdx";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Small peek into my life`,
  description: `Random thoughts and view on things.`,
};

export default function Thoughts() {
  const allThoughts = getAllMDXData("src/app/thoughts/(thoughts)");

  const sortedThoughts = allThoughts.sort((a, b) => {
    const date1 = dayjs(a.metadata.cdate);
    const date2 = dayjs(b.metadata.cdate);
    return date1.isAfter(date2) ? -1 : 1;
  });

  return (
    <div className="flex flex-col gap-4">
      {sortedThoughts.map((thought) => (
        <ListItem
          key={thought.slug}
          MDXMetadata={{
            ...thought.metadata,
            title: thought.slug,
          }}
          route={"thoughts"}
        />
      ))}
    </div>
  );
}

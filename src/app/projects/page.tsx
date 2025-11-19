import React from "react";
import { ListItem } from "@/components/list-item/list-item";
import { Separator } from "@/components/ui/separator";
import dayjs from "dayjs";
import { getAllMDXData, MDXData } from "@/lib/mdx";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Experimentations and Showcases`,
  description: `Let me show off some of the things I like to do...`,
};

export default function Projects() {
  const allProjects = getAllMDXData("src/app/projects/(project-md)");
  
  // Group by category
  const grouped = allProjects.reduce((acc, project) => {
    const category = project.metadata.category || "Other";
    if (!acc[category]) acc[category] = [];
    acc[category].push(project);
    return acc;
  }, {} as Record<string, MDXData[]>);

  // Defined categories order
  const categories = ["Design Experiments", "Hackathons", "Open Source and Projects"];
  // Add any other categories found
  Object.keys(grouped).forEach(cat => {
    if (!categories.includes(cat)) categories.push(cat);
  });

  return (
    <div>
      {categories.map((category, idx) => {
        const projects = grouped[category];
        if (!projects || projects.length === 0) return null;

        const sortedProjects = projects.sort((a, b) => {
             const date1 = dayjs(a.metadata.cdate);
             const date2 = dayjs(b.metadata.cdate);
             return date1.isAfter(date2) ? -1 : 1;
        });

        return (
          <div key={category}>
            {idx !== 0 && <Separator className="my-4" />}
            <div className="mb-4 font-bold text-lg">{category}</div>
            <div className="flex flex-col gap-2">
              {sortedProjects.map((project) => (
                <ListItem
                  key={project.slug}
                  MDXMetadata={{
                    ...project.metadata,
                    title: project.slug, 
                  }}
                  route={"projects"}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

import React from "react";
import { getMDXData, getMDXFiles } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// Components used in MDX
import ArcGradientCard from "@/app/projects/(components)/arc-gradient-card";
import {
  AnimatedIcons,
  AnimatedLayout,
} from "@/app/projects/(components)/dynamic-island";
import { AlertItem } from "@/components/alert";
import { RocketIcon } from "@radix-ui/react-icons";
import Image from "next/image";

const components = {
  ArcGradientCard,
  AnimatedIcons,
  AnimatedLayout,
  AlertItem,
  RocketIcon,
  Image,
};

type Props = {
  params: Promise<{ "file-index": string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const slug = params["file-index"];
  
  try {
    const { metadata } = getMDXData("src/app/projects/(project-md)", slug);
    return {
      title: `>ᴗ< Nightly | ${metadata.displayTitle}`,
      description: metadata.description,
    };
  } catch (e) {
    return {
      title: ">ᴗ< Nightly | Does not exist :(",
    };
  }
}

export async function generateStaticParams() {
  const files = getMDXFiles("src/app/projects/(project-md)");
  return files.map((file) => ({
    "file-index": file.replace(".mdx", ""),
  }));
}

export default async function ProjectPage(props: Props) {
  const params = await props.params;
  const slug = params["file-index"];

  try {
    const { content } = getMDXData("src/app/projects/(project-md)", slug);
    return (
      <div>
        <MDXRemote source={content} components={components} />
      </div>
    );
  } catch (e) {
    notFound();
  }
}

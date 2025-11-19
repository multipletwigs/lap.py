import React from "react";
import { getMDXData, getMDXFiles } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { Metadata } from "next";

import ImageGrid from "@/app/thoughts/(components)/photoshoot";

const components = {
  ImageGrid,
};

type Props = {
  params: Promise<{ "file-index": string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const slug = params["file-index"];
  
  try {
    const { metadata } = getMDXData("src/app/thoughts/(thoughts)", slug);
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
  const files = getMDXFiles("src/app/thoughts/(thoughts)");
  return files.map((file) => ({
    "file-index": file.replace(".mdx", ""),
  }));
}

export default async function ThoughtPage(props: Props) {
  const params = await props.params;
  const slug = params["file-index"];

  try {
    const { content } = getMDXData("src/app/thoughts/(thoughts)", slug);
    return (
      <div>
        <MDXRemote source={content} components={components} />
      </div>
    );
  } catch (e) {
    notFound();
  }
}

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const root = process.cwd();

export type MDXMetadata = {
  title: string;
  displayTitle: string;
  description: string;
  cdate: string;
  category?: string;
  [key: string]: any;
};

export type MDXData = {
  metadata: MDXMetadata;
  slug: string;
  content: string;
};

export function getMDXFiles(dir: string) {
  return fs.readdirSync(path.join(root, dir)).filter((file) => file.endsWith(".mdx"));
}

export function getMDXData(dir: string, slug: string): MDXData {
  const filePath = path.join(root, dir, `${slug}.mdx`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    metadata: data as MDXMetadata,
    slug,
    content,
  };
}

export function getAllMDXData(dir: string): MDXData[] {
  const files = getMDXFiles(dir);
  return files.map((file) => {
    const slug = file.replace(".mdx", "");
    return getMDXData(dir, slug);
  });
}

import fs from "fs";

export interface MDXMetaData {
  title: string;
}

// Return a list of all files in thoughts
export const getArticle = (fileDir: string): MDXMetaData[] => {
  const fileNames = fs.readdirSync(fileDir);
  const allMetaData = fileNames.map((fileNames) => {
    return {
      title: fileNames.replace(".mdx", ""),
    };
  });
  return allMetaData;
};

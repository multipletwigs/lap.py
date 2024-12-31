import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import CodeBlock from "./components/ui/code-block";

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }) => {
      const content = children?.toString();
      const contentArr = content?.split("~") || [];
      return (
        <div className="my-5 flex gap-2 flex-col">
          <h1 className="text-2xl font-bold">{contentArr[0]}</h1>
          <code>{contentArr[1]}</code>
        </div>
      );
    },
    h2: ({ children }) => (
      <h2 className="text-xl font-bold my-5">{children}</h2>
    ),
    li: ({ children }) => (
      <li className="prose-sm md:prose-base list-inside my-2 list-decimal">
        {children}
      </li>
    ),
    img: ({ src, alt }) => (
      <Image
        src={src ? src : ""}
        alt={alt as string}
        placeholder="blur"
        fill={false}
      />
    ),
    p: ({ children }) => (
      <p className="prose-sm md:prose-base leading-relaxed text-primary text-balance">
        {children}
      </p>
    ),
    a: ({ children, href }) => (
      <a
        className="prose-sm md:prose-base text-slate-800 dark:text-slate-100 font-medium border-b border-primary border-dashed hover:text-slate-600 transition-colors"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-slate-200 pl-4 italic font-serif text-slate-600">
        {children}
      </blockquote>
    ),
    code: ({ children }) => <CodeBlock>{children}</CodeBlock>,
    br: () => <br />,
    table: ({ children }) => (
      <div className="w-full overflow-x-auto my-4 scrollbar-hidden">
        <table className="min-w-full border-collapse">{children}</table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-slate-50 dark:bg-slate-800">{children}</thead>
    ),
    tbody: ({ children }) => (
      <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
        {children}
      </tbody>
    ),
    tr: ({ children }) => (
      <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
        {children}
      </tr>
    ),
    th: ({ children }) => (
      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-3 text-sm text-slate-500 dark:text-slate-400">
        {children}
      </td>
    ),
    ...components,
  };
}

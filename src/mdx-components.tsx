import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import CodeBlock from "./components/ui/code-block";
import { codeToHtml } from 'shiki'

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }) => (
      <h1 className="text-2xl font-semibold my-5">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-xl font-bold my-5">{children}</h2>
    ),
    li: ({ children }) => (
      <li className="prose-sm md:prose-base list-inside my-2 list-decimal">{children}</li>
    ),
    img: ({ src, alt }) => (
      <Image src={src ? src : ""}
        alt={alt as string}
        placeholder="blur"
        fill={false} />
    ),
    p: ({ children }) => <p className="prose-sm md:prose-base leading-relaxed text-primary text-balance">{children}</p>,
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
    ...components,
  };
}

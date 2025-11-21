import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import CodeBlock from "./components/ui/code-block";
import { LinkPreview } from "./components/link-preview";

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }) => (
      <h1 className="mdx-h1 font-playfair">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mdx-h2 font-playfair">{children}</h2>
    ),
    li: ({ children }) => (
      <li className="list-inside my-1.5 list-decimal font-normal text-sm lg:text-base">
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
      <p className="mdx-paragraph text-primary text-balance">
        {children}
      </p>
    ),
    a: ({ children, href }) => (
      <LinkPreview
        className="mdx-link text-foreground border-b border-primary border-dashed hover:text-muted-foreground"
        href={href}
      >
        {children}
      </LinkPreview>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mdx-blockquote border-l-4 border-border pl-4 text-muted-foreground">
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
      <thead className="bg-secondary">{children}</thead>
    ),
    tbody: ({ children }) => (
      <tbody className="divide-y divide-border">
        {children}
      </tbody>
    ),
    tr: ({ children }) => (
      <tr className="hover:bg-secondary/50">
        {children}
      </tr>
    ),
    th: ({ children }) => (
      <th className="px-2 py-2 lg:px-4 lg:py-3 text-left text-xs lg:text-sm font-semibold text-foreground">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-2 py-2 lg:px-4 lg:py-3 text-xs lg:text-sm text-muted-foreground">
        {children}
      </td>
    ),
    ...components,
  };
}

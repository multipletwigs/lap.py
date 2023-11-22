"use client";

import React, { useEffect } from "react";
import cn from "clsx";
import type { ComponentProps, ReactElement } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/esm/styles/prism";

/**
 * Not really sure how mdx-components parse MDX files but I need to add custom markers to differentiate between code blocks and inline code. And that kinda sucks
 */
export const CodeBlock = ({
  children,
  className,
  ...props
}: ComponentProps<"code">): ReactElement => {
  const code = children as string;
  const match = code[0] !== "~";

  return match ? (
    <div className="max-h-[500px] my-2 rounded-lg overflow-scroll">
      <SyntaxHighlighter
        language="typescript"
        style={nord}
        codeTagProps={{
          className: cn(className, "text-xs", {
            ...props,
          }),
        }}
        showInlineLineNumbers
        showLineNumbers
      >
        {code}
      </SyntaxHighlighter>
    </div>
  ) : (
    <code {...props}>{code.split("~")[1]}</code>
  );
};

export default CodeBlock;

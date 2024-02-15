import { Badge } from "@/components/ui/badge";
import "./globals.css";
import type { Metadata } from "next";
import {
  TabNavigation,
  DropdownNavigation,
} from "@/components/navigation/navigation";
import { ThemeProvider } from "@/components/theme-provider";
import ModeToggle from "@/components/mode-toggle";
import { Analytics } from "@vercel/analytics/react";
import dayjs from "dayjs";

export const metadata: Metadata = {
  title: "Lappy",
  description: "Minimalistic thoughts and experimentation",
};

const Footer = () => {
  const links = {
    twitter: {
      href: "https://twitter.com/multipletwigs",
      text: "Twitter",
    },
    github: {
      href: "https://github.com/multipletwigs",
      text: "GitHub",
    },
    instagram: {
      href: "https://instagram.com/its._.lapp",
      text: "Instagram",
    },
  };

  const link = (linkProps: { href: string; text: string }) => (
    <a
      className="border-b border-primary border-dashed hover:text-slate-600 transition-colors"
      href={linkProps.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {linkProps.text}
    </a>
  );

  return (
    <footer className="w-full flex flex-row justify-between mt-16 sm:text-sm text-[10px]">
      <nav className="flex gap-2">
        {Object.values(links).map((linkProps) => link(linkProps))}
      </nav>
      <p>{dayjs().year()} © Thoughts by Zach Khong</p>
    </footer>
  );
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-w-screen min-h-screen flex-col items-center px-5 py-12 sm:py-24">
            <main className="w-full max-w-[640px]">
              <header className="flex justify-between flex-row gap-4 items-center mb-10">
                <div className="flex flex-col items-start">
                  <h1 className="w-fit font-bold text-lg flex items-center justify-center">
                    邝立浩 / Zachary / Lappy
                  </h1>
                  <div className="flex flex-row gap-2 items-center mt-2">
                    <Badge variant={"secondary"} className="w-fit">
                      Design Engineer
                    </Badge>
                    <ModeToggle />
                  </div>
                </div>
                <TabNavigation />
                <DropdownNavigation />
              </header>
              {children}
              <Footer />
            </main>
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}

import "./globals.css";
import type { Metadata } from "next";
import {
  DropdownNavigation,
} from "@/components/navigation/navigation";
import { ThemeProvider } from "@/components/theme-provider";
import ModeToggle from "@/components/mode-toggle";
import { Analytics } from "@vercel/analytics/react";
import dayjs from "dayjs";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Playfair_Display } from "next/font/google";
import { Sidebar } from "./sidebar";
import { LayoutNavigation } from "./layout-navigation";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Lappy",
  description: "Minimalistic thoughts and experimentation",
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={playfair.variable}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <header className="lg:hidden fixed top-0 left-0 right-0 bg-background border-b border-border z-50 px-5 py-4">
            <div className="flex justify-between items-center">
              <h1 className="font-bold text-lg">Zachary</h1>
              <div className="flex gap-2 items-center">
                <ModeToggle />
                <DropdownNavigation />
              </div>
            </div>
          </header>

          <div className="min-h-screen flex items-center justify-center px-4 py-4 lg:py-8">
            <div className="w-full max-w-7xl flex gap-8 h-[calc(100vh-2rem)] lg:h-[calc(100vh-4rem)]">
              <aside className="hidden lg:flex lg:flex-col lg:w-72 flex-shrink-0">
                <Sidebar />
              </aside>
              <main className="flex-1 bg-secondary-bg rounded-xl overflow-hidden flex flex-col mt-16 lg:mt-0">
                <div className="flex-1 overflow-y-auto">
                  <div className="px-6 py-8 lg:px-16 lg:py-12">
                    {/* Navigation */}
                    <div className="hidden lg:block">
                      <LayoutNavigation />
                    </div>
                    {children}
                  </div>
                </div>
              </main>

            </div>
          </div>

          <SpeedInsights />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}

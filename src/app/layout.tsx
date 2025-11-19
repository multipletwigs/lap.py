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
import { ViewTransitions } from "next-view-transitions";
import { MobileSidebar } from "@/components/mobile-sidebar";
import { TimeWidget } from "@/components/widgets/user-info";

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
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body className={playfair.variable}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <MobileSidebar />
            <header className="lg:hidden fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md border-b border-border z-50 px-4 py-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <h1 className="font-playfair font-bold text-xl tracking-tight">nightly.ink</h1>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="scale-90 origin-right">
                    <TimeWidget />
                  </div>
                  <DropdownNavigation />
                  <ModeToggle />
                </div>
              </div>
            </header>

            <div className="min-h-screen flex items-center justify-center px-0 py-16 lg:px-4 lg:py-8">
              <div className="w-full max-w-6xl flex gap-8 h-[calc(100vh-6rem)] lg:h-[calc(100vh-4rem)]">
                <aside className="hidden lg:flex lg:flex-col lg:w-72 flex-shrink-0">
                  <Sidebar />
                </aside>
                <main className="flex-1 lg:bg-secondary-bg lg:grid-background lg:rounded-xl lg:overflow-hidden flex flex-col mt-0 lg:mt-0">
                  <div className="flex-1 overflow-y-auto relative z-10">
                    <div className="px-5 py-1 lg:px-12 lg:py-8 relative">
                      {/* Navigation - Visible on all screens now for content rail */}
                      <div className="hidden lg:block mb-6">
                        <LayoutNavigation />
                      </div>
                      <div className="page-content-wrapper">
                        {children}
                      </div>
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
    </ViewTransitions>
  );
}






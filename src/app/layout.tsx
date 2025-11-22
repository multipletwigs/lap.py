import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Playfair_Display } from "next/font/google";
import { Sidebar } from "./sidebar";
import { LayoutNavigation } from "./layout-navigation";
import { ViewTransitions } from "next-view-transitions";
import { MobileSidebar } from "@/components/mobile-sidebar";
import { SunlightWindow } from "@/components/widgets/sunlight-window";

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
            <SunlightWindow />

            {/* Mobile Navigation - completely separate from layout */}
            <div className="lg:hidden">
              <LayoutNavigation />
            </div>

            <div className="min-h-screen lg:flex lg:items-center lg:justify-center px-4 py-8">
              <div className="w-full max-w-6xl flex gap-8 lg:h-[calc(100vh-4rem)]">
                <aside className="hidden lg:flex lg:flex-col lg:w-72 flex-shrink-0 relative z-10">
                  <Sidebar />
                </aside>
                <main className="flex-1 lg:grid-background lg:rounded-xl lg:overflow-hidden flex flex-col mt-0 lg:mt-0">
                  <div className="flex-1 lg:overflow-y-auto relative z-10">
                    {/* Desktop Navigation only */}
                    <div className="hidden lg:block px-12 pt-8">
                      <LayoutNavigation />
                    </div>

                    <div className="page-content-wrapper px-0 py-0 lg:px-12 lg:pb-8 pb-24 lg:pb-0 lg:mt-6">
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
    </ViewTransitions>
  );
}






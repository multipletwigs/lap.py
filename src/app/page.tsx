import RootCopy from "@/app/root-copy.mdx";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  // Now fetch the correct metadata based on the found category
  return {
    title: `Welcome to my internet corner`,
    description: `I gather my thoughts about everything here... might accidentally say something smart sometimes!`,
  };
}
export default function Home() {
  return (
    <main>
      <div className="flex flex-col">
        <section>
          <RootCopy />
        </section>
      </div>
    </main>
  );
}

// "use client";
import { Badge } from "@/components/ui/badge";
import RootCopy from "@/app/root-copy.mdx";

export default function Home() {
  return (
    <main>
      <h1 className="text-lg font-bold mb-10">About</h1>
      <div className="flex flex-col">
        <section>
          <RootCopy />
        </section>
      </div>
    </main>
  );
}

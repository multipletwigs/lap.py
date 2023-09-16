// "use client";
import { Badge } from "@/components/ui/badge";
import RootCopy from "@/app/root-copy.mdx";

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

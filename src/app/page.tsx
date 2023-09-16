// "use client";
import { Badge } from "@/components/ui/badge";
import Hello from "@/root.mdx";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between p-clamp">
      <div className="flex flex-col">
        <h1 className="w-fit font-bold text-lg">邝立浩 / Zachary Khong</h1>
        <Badge variant={"secondary"} className="w-fit mt-1">
          Design Engineer
        </Badge>
        <Hello></Hello>
      </div>
    </main>
  );
}

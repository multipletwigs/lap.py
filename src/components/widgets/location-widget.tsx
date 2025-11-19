import { headers } from "next/headers";
import { MapPin } from "lucide-react";

export async function LocationWidget() {
  const headersList = await headers();
  const city = headersList.get("x-vercel-ip-city") || "";
  const region = headersList.get("x-vercel-ip-country-region") || "";
  
  if (!city && !region) return null;

  const location = city && region ? `${city}, ${region}` : city || region;

  return (
    <div className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm bg-background/60 border border-border/50 text-foreground font-medium animate-in fade-in slide-in-from-right-2 duration-500 delay-200">
      <MapPin className="w-4 h-4" />
      {location}
    </div>
  );
}

import React from "react";
import { ExternalLink } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const SpotifyExternalLink = ({ href }: { href: string }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full inline-flex items-center justify-center w-8 h-8 bg-foreground hover:bg-foreground/80 transition-colors"
          >
            <ExternalLink className="w-3 h-3 text-background" />
          </a>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Spotify!</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default SpotifyExternalLink;

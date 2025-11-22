"use client";

import { Link } from "next-view-transitions";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ReactNode } from "react";
import NavBarCopy from "./labels";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "@radix-ui/react-icons";
import { MoreHorizontal } from "lucide-react";

export interface NavigationItemProps {
  triggerName: string;
  content?: ReactNode;
  link?: {
    href: string;
    text: string;
  };
}

export const DropdownNavigation = () => {
  const pathName = `/${usePathname().split("/")[1]}`;

  return (
    <div className="block">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {Object.values(NavBarCopy).map((item) => {
            return (
              <DropdownMenuItem key={item.triggerName}>
                {item.link && (
                  <Link
                    href={item.link.href}
                    className="flex flex-row justify-between w-full align-middle items-center"
                    prefetch={true}
                  >
                    {item.triggerName}
                    {`${pathName}` === item.link.href ? <CheckIcon /> : <></>}
                  </Link>
                )}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export const TabNavigation = () => {
  const pathName = `/${usePathname().split("/")[1]}`;

  return (
    <div className="flex flex-col gap-1">
      {Object.values(NavBarCopy).map((item) => {
        if (!item.link) return null;
        const isActive = pathName === item.link.href;
        return (
          <Link
            key={item.triggerName}
            href={item.link.href}
            className={`px-3 py-2 rounded-lg transition-all duration-200 ${
              isActive
                ? "text-foreground bg-foreground/5"
                : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
            }`}
            style={{
              fontSize: 'clamp(14px, 1.3vw, 15px)',
              fontWeight: isActive ? 500 : 400,
              letterSpacing: '-0.01em'
            }}
            prefetch={true}
          >
            {item.link.text}
          </Link>
        );
      })}
    </div>
  );
};

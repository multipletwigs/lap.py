"use client";

import Link from "next/link";
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
import { CheckIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";

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
    <div className="block md:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="square-icon">
            <HamburgerMenuIcon className="h-4 w-4" />
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
    <NavigationMenu className="hidden md:block">
      <NavigationMenuList>
        {Object.values(NavBarCopy).map((item) => {
          return (
            <NavigationMenuItem key={item.triggerName}>
              {item.link && (
                <Link href={item.link.href} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle({
                      selected: pathName === item.link.href,
                    })}
                  >
                    {item.link.text}
                  </NavigationMenuLink>
                </Link>
              )}
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { ReactNode, useEffect } from "react";
import NavBarCopy from "./labels";
import { usePathname } from "next/navigation";
import ModeToggle from "../mode-toggle";

export interface NavigationItemProps {
  triggerName: string;
  content?: ReactNode;
  link?: {
    href: string;
    text: string;
  };
}

function Navigation() {
  const pathName = `/${usePathname().split("/")[1]}`;

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {Object.values(NavBarCopy).map((item, index) => {
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
}

export default Navigation;

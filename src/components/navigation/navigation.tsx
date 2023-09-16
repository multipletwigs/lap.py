"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { ReactNode, useState } from "react";
import NavBarCopy from "./labels";

export interface NavigationItemProps {
  triggerName: string;
  content?: ReactNode;
  link?: {
    href: string;
    text: string;
  };
}

function Navigation() {
  const [selected, setSelected] = useState(2);

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {Object.values(NavBarCopy).map((item, index) => {
          return (
            <NavigationMenuItem
              key={item.triggerName}
              onClick={() => {
                setSelected(index);
              }}
            >
              {item.link && (
                <Link href={item.link.href} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle({
                      className: selected === index ? "bg-accent" : "",
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

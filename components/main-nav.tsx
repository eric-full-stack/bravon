"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { NavItem } from "@/types/nav";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Logo from "./logo";
import { Button } from "./ui/button";

interface MainNavProps {
  items?: NavItem[];
}

export function MainNav({ items }: MainNavProps) {
  const pathname = usePathname();
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <Logo />
      </Link>
      {items?.length ? (
        <NavigationMenu className="hidden md:block">
          <NavigationMenuList>
            {items?.map((item) => (
              <NavigationMenuItem key={item.title}>
                <Link href={item.href || "#"} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    active={item.href === pathname || false}
                  >
                    {item.title}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      ) : null}
      <div className="flex-1" />
      {pathname === "/" ? (
        <Link href="/sign-in">
          <Button>Entrar</Button>
        </Link>
      ) : null}
    </div>
  );
}

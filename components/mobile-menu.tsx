"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { FooterLinks } from "@/components/footer-links";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { siteConfig } from "@/config/site";
import Logo from "./logo";
import { Separator } from "./ui/separator";

export function MobileMenu({ items }: { items: typeof siteConfig.mainNav }) {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  return (
    <Sheet open={open} onOpenChange={(open) => setOpen(open)}>
      <SheetTrigger asChild className="flex md:hidden">
        <Button variant="outline">
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <Logo />
        </SheetHeader>
        <NavigationMenu
          className="w-96 items-start justify-start"
          orientation="vertical"
        >
          <NavigationMenuList className="flex w-full flex-col items-start justify-start">
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:w-[600px] ">
              {items.map((item, index) => (
                <NavigationMenuItem key={item.title}>
                  <Link href={item.href || "#"} legacyBehavior passHref>
                    <SheetClose asChild>
                      <NavigationMenuLink
                        onClick={() => setOpen(false)}
                        className={`${navigationMenuTriggerStyle()}`}
                        active={item.href === pathname || false}
                      >
                        {item.title}
                      </NavigationMenuLink>
                    </SheetClose>
                  </Link>
                </NavigationMenuItem>
              ))}
            </ul>
          </NavigationMenuList>
        </NavigationMenu>
        <Separator />
        <SheetFooter className="mt-5 flex flex-col sm:flex-col sm:items-center sm:justify-center md:flex-col md:items-center md:justify-center">
          <FooterLinks />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

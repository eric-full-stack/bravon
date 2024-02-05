"use client";

import Link from "next/link";
import { Bell, Cog, HelpCircle } from "lucide-react";

import { siteConfig } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UserButton } from "@clerk/nextjs";

export function SiteToolbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0 ">
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <div
              className={`${buttonVariants({
                size: "sm",
                variant: "ghost",
              })}  hidden cursor-pointer items-center space-x-2 sm:flex`}
            >
              <HelpCircle className="h-6 w-6" />
              <span className="hidden sm:block">Ajuda</span>
            </div>

            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Link href={siteConfig.links.notifications}>
                  <div
                    className={buttonVariants({
                      size: "sm",
                      variant: "ghost",
                    })}
                  >
                    <Bell className="h-6 w-6" />
                    <span className="sr-only">Notificações</span>
                  </div>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Notificações</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Link href={siteConfig.links.config}>
                  <div
                    className={buttonVariants({
                      size: "sm",
                      variant: "ghost",
                    })}
                  >
                    <Cog className="h-6 w-6" />
                    <span className="sr-only">Configurações</span>
                  </div>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Configurações</p>
              </TooltipContent>
            </Tooltip>

            <div className="flex w-12 items-center justify-center">
              <UserButton afterSignOutUrl="/sign-in" />
              <span className="sr-only">Perfil</span>
            </div>
          </nav>
        </div>
        <div className="flex flex-row gap-5"></div>
      </div>
    </header>
  );
}

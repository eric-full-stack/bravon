import { siteConfig } from "@/config/site";
import { MainNav } from "@/components/main-nav";
import { MobileMenu } from "@/components/mobile-menu";
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 w-full border-b bg-background">
      <div className="flex h-16 items-center space-x-4 px-4 sm:justify-between sm:space-x-0 md:px-9">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <MobileMenu items={siteConfig.mainNav} />
        </div>
      </div>
    </header>
  );
}

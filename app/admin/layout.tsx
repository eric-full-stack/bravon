import { SiteHeader } from "@/components/site-header";
import { SiteToolbar } from "@/components/site-toolbar";
import { Toaster } from "@/components/toaster";
import Providers from "@/config/providers";

interface LayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function AdminLayout({ children, modal }: LayoutProps) {
  return (
    <Providers>
      <div className="relative mx-auto flex min-h-screen w-full max-w-[1440px] flex-col overflow-x-hidden pb-12 md:px-4">
        <SiteToolbar />
        <SiteHeader />
        <div className="mt-5 flex-1 px-4 md:px-9">{children}</div>
        {modal}
      </div>
      <Toaster />
    </Providers>
  );
}

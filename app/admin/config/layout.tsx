import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "@/components/sidebar-nav";

const sidebarNavItems = [
  {
    title: "Financeiro",
    href: "/finance",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="space-y-6 pb-16 md:block">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Configurações</h2>
        <p className="text-muted-foreground">
          Configure suas notificações, conta e financeiro
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-0 lg:w-1/5">
          <SidebarNav items={sidebarNavItems} rootPath={`/admin/config/`} />
        </aside>
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </div>
  );
}

import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "@/components/sidebar-nav";
import { getPlanById } from "@/lib/api";

const sidebarNavItems = [
  {
    title: "Gerenciar",
    href: "/edit",
  },
  {
    title: "Alunos",
    href: "/students",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
  params: {
    id: number;
  };
}

export default async function SettingsLayout({
  children,
  params,
}: SettingsLayoutProps) {
  const plan = await getPlanById(params.id);

  return (
    <div className="space-y-6 pb-16 md:block">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">
          Plano: {plan?.name}
        </h2>
        <p className="text-muted-foreground">
          Gerencie seu plano e veja suas informações
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav
            items={sidebarNavItems}
            rootPath={`/admin/plans/${params.id}`}
          />
        </aside>
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </div>
  );
}

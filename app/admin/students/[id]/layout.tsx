import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "@/components/sidebar-nav";
import { getStudentById } from "@/lib/api";

const sidebarNavItems = [
  {
    title: "Gerenciar",
    href: "/edit",
  },
  {
    title: "Aulas",
    href: "/lessons",
  },
  {
    title: "Financeiro",
    href: "/finance",
  },
  {
    title: "Notificações",
    href: "/notifications",
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
  const student = await getStudentById(params.id);
  return (
    <div className="space-y-6 pb-16 md:block">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">
          Aluno: {student?.user.fullName}
        </h2>
        <p className="text-muted-foreground">
          Gerencie seu aluno, veja suas notificações, aulas e finanças
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-0 lg:w-1/5">
          <SidebarNav
            items={sidebarNavItems}
            rootPath={`/admin/students/${params.id}`}
          />
        </aside>
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </div>
  );
}

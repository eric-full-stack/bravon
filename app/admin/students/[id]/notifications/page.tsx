import NotificationTable from "@/components/notifications/notification-table";
import { Separator } from "@/components/ui/separator";
interface PageProps {
  params: {
    id: number;
  };
}

export default function Page({ params: { id } }: PageProps) {
  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-row items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-medium">Notificações</h3>
            <p className="text-sm text-muted-foreground">
              Lista das notificações enviadas para o aluno
            </p>
          </div>
        </div>
        <Separator />
        <NotificationTable studentId={id} />
      </div>
    </>
  );
}

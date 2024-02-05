import { Separator } from "@/components/ui/separator";

export default function Page() {
  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-row items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-medium">Financeiro</h3>
            <p className="text-sm text-muted-foreground">
              Lista das cobranças enviadas/recebidas pelo o aluno
            </p>
          </div>
        </div>
        <Separator />
        <h5>Em construção</h5>
      </div>
    </>
  );
}

import FinanceTeacherForm from "@/components/finance/finance-teacher-form";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Configurar métodos de pagamento</h3>
        <p className="text-sm text-muted-foreground">
          Defina os métodos de pagamento que você aceita
        </p>
      </div>
      <Separator />
      <FinanceTeacherForm />
    </div>
  );
}

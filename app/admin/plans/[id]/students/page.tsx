import StudentsTable from "@/components/students/student-table";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: {
    id: number;
  };
}

export default function Page({ params }: PageProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-row items-center justify-between gap-2">
        <div>
          <h3 className="text-lg font-medium">Alunos que possuem o plano</h3>
          <p className="text-sm text-muted-foreground">
            Lista dos alunos assinantes do plano
          </p>
        </div>
        <Link href="/admin/students/create">
          <Button size="sm">
            <Plus className="h-5 w-5 sm:mr-2" />
            <p className="hidden sm:block">Adicionar aluno</p>
          </Button>
        </Link>
      </div>
      <Separator />

      <StudentsTable planId={params.id} />
    </div>
  );
}

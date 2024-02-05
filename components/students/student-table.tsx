"use client";
import { EmptyTable } from "@/components/empty-table";
import { getStudentsFromTeacher } from "@/lib/api";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "react-query";
import { DataTable } from "../data-table";
import { columns } from "./columns";

interface StudentTableProps {
  planId?: number;
}

export default function StudentTable({ planId }: StudentTableProps) {
  const user = useAuth();
  const { data } = useQuery(
    ["students-from-teacher", user.userId, planId],
    () => getStudentsFromTeacher(planId)
  );

  return (
    <div className="mt-8 pb-12">
      {(!data || data?.length === 0) && (
        <EmptyTable
          title="Adicione seu primeiro aluno"
          description="Os alunos que você adicionar aqui poderão receberão as notificações sobre agendamentos e valores dos planos, além de feedbacks sobre aulas e planejamento. "
          href="/admin/students/create"
        />
      )}

      {data && data?.length > 0 && (
        <DataTable data={data} columns={columns} columnSearch={"fullName"} />
      )}
    </div>
  );
}

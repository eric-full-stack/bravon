"use client";
import { EmptyTable } from "@/components/empty-table";
import { getPlansFromTeacher } from "@/lib/api";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { useQuery } from "react-query";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";

export default function PlanTable() {
  const user = useAuth();
  const { data } = useQuery(
    ["plans-from-teacher", user.userId],
    getPlansFromTeacher
  );

  return (
    <div className="mt-8 pb-12">
      {(!data || data?.length === 0) && (
        <EmptyTable
          title="Adicione seu primeiro plano"
          description="Os planos são o que você vende aos alunos. Eles podem ser qualquer plano de assinatura. Configure dias da semana, esporte e preço."
          href="/admin/plans/create"
        />
      )}

      {data && data?.length > 0 && (
        <DataTable data={data} columns={columns} columnSearch={"name"} />
      )}
    </div>
  );
}

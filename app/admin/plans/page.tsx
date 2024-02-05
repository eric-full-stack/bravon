import { Plus } from "lucide-react";
import Link from "next/link";

import Loading from "@/components/loading";
import { PageHeader } from "@/components/page-header";
import PlanTable from "@/components/plans/plan-table";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="flex-1 space-y-4 pb-12 pt-6">
      <PageHeader
        title="Planos"
        subComponent={
          <div className="flex flex-row items-center gap-2">
            <Link href="/admin/plans/create">
              <Button size="sm">
                <Plus className="h-5 w-5 sm:mr-2" />
                <p className="hidden sm:block">Adicionar plano</p>
              </Button>
            </Link>
          </div>
        }
      />
      <Suspense fallback={<Loading />}>
        <PlanTable />
      </Suspense>
    </div>
  );
}

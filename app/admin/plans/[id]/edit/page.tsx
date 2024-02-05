"use client";

import Loading from "@/components/loading";
import PlanForm from "@/components/plans/plan-form";
import { Separator } from "@/components/ui/separator";
import { getPlanById, getSports } from "@/lib/api";
import { useQuery } from "react-query";

interface PageProps {
  params: {
    id: number;
  };
}

export default function Page({ params }: PageProps) {
  const sports = useQuery("sports", getSports);
  const plans = useQuery(["plans", params.id], () => getPlanById(params.id));

  if (
    sports.isLoading ||
    plans.isLoading ||
    sports.isFetching ||
    plans.isFetching
  )
    return <Loading />;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Editar plano</h3>
        <p className="text-sm text-muted-foreground">Mude os dados do plano</p>
      </div>
      <Separator />

      <PlanForm sports={sports.data || []} data={plans.data} />
    </div>
  );
}

import { PageHeader } from "@/components/page-header";
import PlanForm from "@/components/plans/plan-form";
import { getSports } from "@/lib/api";

export default async function Create() {
  const sports = await getSports();
  return (
    <div className="max-w-xl">
      <PageHeader title="Adicione um plano" backTo="/admin/plans" />
      <PlanForm sports={sports} />
    </div>
  );
}

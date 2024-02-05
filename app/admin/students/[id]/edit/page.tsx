"use client";

import Loading from "@/components/loading";
import StudentForm from "@/components/students/student-form";
import { Separator } from "@/components/ui/separator";
import { getPlansFromTeacher, getStudentById } from "@/lib/api";
import { useQuery } from "react-query";

interface PageProps {
  params: {
    id: number;
  };
}

export default function Page({ params }: PageProps) {
  const plans = useQuery("plans-from-teacher", getPlansFromTeacher);
  const student = useQuery(["student", params.id], () =>
    getStudentById(params.id)
  );

  if (
    plans.isLoading ||
    student.isLoading ||
    plans.isFetching ||
    student.isFetching
  )
    return <Loading />;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Editar aluno</h3>
        <p className="text-sm text-muted-foreground">
          Atualize os dados do seu aluno
        </p>
      </div>
      <Separator />

      <StudentForm plans={plans.data || []} data={student.data} />
    </div>
  );
}

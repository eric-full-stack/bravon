import { PageHeader } from "@/components/page-header";
import StudentForm from "@/components/students/student-form";
import { getPlansFromTeacher } from "@/lib/api";

export default async function Create() {
  const data = await getPlansFromTeacher();
  return (
    <div className="max-w-xl">
      <PageHeader title="Adicione um aluno" backTo="/admin/students" />
      <StudentForm plans={data || []} />
    </div>
  );
}

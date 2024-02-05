import BookingForm from "@/components/bookings/booking-form";
import { PageHeader } from "@/components/page-header";
import { getStudentsFromTeacher } from "@/lib/api";

export default async function Create() {
  const students = await getStudentsFromTeacher(undefined);
  return (
    <div className="max-w-4xl pb-12">
      <PageHeader title="Novo agendamento de aula" backTo="/admin/bookings" />
      <BookingForm students={students || []} />
    </div>
  );
}

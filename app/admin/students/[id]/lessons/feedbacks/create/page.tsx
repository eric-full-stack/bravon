import { PageHeader } from "@/components/page-header";
import FeedbackForm from "@/components/feedbacks/feedback-form";
import { getBookingsFromStudent } from "@/lib/api";

export default async function Create({
  params: { id },
}: {
  params: { id: number };
}) {
  const data = await getBookingsFromStudent(id);
  return (
    <div className="max-w-xl">
      <PageHeader
        title="Novo feedback"
        backTo={`/admin/students/${id}/lessons`}
      />
      <FeedbackForm bookings={data} studentId={id} />
    </div>
  );
}

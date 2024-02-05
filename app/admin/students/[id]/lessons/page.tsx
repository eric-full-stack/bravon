import { EmptyTable } from "@/components/empty-table";
import { FeedbackLessonCard } from "@/components/feedbacks/feedback-lesson-card";
import { Separator } from "@/components/ui/separator";
import { getLessonsFeedbacksFromStudent } from "@/lib/api";

interface Props {
  params: {
    id: number;
  };
}

export default async function Page({ params: { id } }: Props) {
  const lessonsFeedbacks = await getLessonsFeedbacksFromStudent(id);
  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-row items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-medium">Aulas</h3>
            <p className="text-sm text-muted-foreground">
              Veja e crie anotações sobre as aulas e seja avaliado pelo aluno!
            </p>
          </div>
        </div>
        <Separator />
        {lessonsFeedbacks.length === 0 && (
          <EmptyTable
            title="Nenhum feedback encontrado."
            description="Deixe um feedback para o aluno! Feedbacks são importantes para o aluno saber como está o seu desempenho."
            href={`/admin/students/${id}/lessons/feedbacks/create`}
          />
        )}
        {lessonsFeedbacks.map((feedback) => (
          <FeedbackLessonCard feedback={feedback} key={feedback.id} />
        ))}
      </div>
    </>
  );
}

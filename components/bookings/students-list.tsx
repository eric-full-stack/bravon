import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormData } from "./booking-form";

type Props = {
  formData: FormData;
  setFormData: (data: any) => void;
};

export default function StudentsList({ formData, setFormData }: Props) {
  return (
    <>
      {formData?.students?.map((student) => (
        <div className="flex flex-col" key={student.userId + "-" + student.id}>
          <div className="flex flex-row items-center justify-between gap-4">
            <div className="text-md flex-1 font-medium">
              {student.user.fullName}
            </div>
            <div className="text-md mr-1 font-light">{student.user.phone}</div>
            <div className="text-md mr-1 font-light">
              <Button
                size="icon"
                variant="outline"
                onClick={() => {
                  setFormData({
                    ...formData,
                    students: formData?.students?.filter(
                      (s) => s.id !== student.id,
                    ),
                  });
                }}
              >
                <Trash2 size={14} />
              </Button>
            </div>
          </div>
          <div>
            <span className="text-sm text-gray-500">{student.plan.name}</span>
          </div>
        </div>
      ))}
      {formData?.students?.length === 0 ? (
        <div className="text-sm text-gray-500">Nenhum aluno selecionado</div>
      ) : null}
    </>
  );
}

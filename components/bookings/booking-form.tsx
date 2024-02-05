"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Bookings, Plans, Students, Users } from "@/db/schema";
import { toast } from "@/hooks/use-toast";
import { StudentsFromTeacher, getBookingsFromTeacher } from "@/lib/api";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { addDays, addMinutes, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Loader, Plus, PlusCircle, Terminal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { CalendarDatePicker } from "../calendar-date-picker";
import { Trash2 } from "lucide-react";
import { Separator } from "../ui/separator";
import StudentsList from "./students-list";
import AppointmentsList from "./appointments-list";

type BookingFormProps = {
  students: StudentsFromTeacher;
  data?:
    | (Bookings & { students: (Students & { user: Users; plan: Plans })[] })
    | null;
};

export type FormData = {
  dates: {
    date: Date;
    startTime: string;
    endTime: string;
  }[];
  isAutoBooking: boolean;
  students: (Students & { user: Users; plan: Plans })[];
};

export default function BookingForm({ students, data }: BookingFormProps) {
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    dates: [
      {
        date: data?.date ?? new Date(),
        startTime: data?.startTime ?? "08:00",
        endTime: data?.endTime ?? "09:00",
      },
    ],
    isAutoBooking: data?.isAutoBooking || true,
    students: data?.students || [],
  });

  const user = useAuth();
  const { refetch } = useQuery(
    ["bookings-from-teacher", user.userId],
    getBookingsFromTeacher,
  );

  async function onSubmit() {
    setIsSaving(true);
    const URL = data && data.id ? `/api/bookings/${data.id}` : `/api/bookings/`;
    const response = await fetch(URL, {
      method: data && data.id ? "PATCH" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        students: formData.students.map((student) => student.id),
      }),
    });

    setIsSaving(false);

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your post was not saved. Please try again.",
        variant: "destructive",
      });
    }
    toast({
      description: "Agendamento cadastrado.",
    });

    await refetch();
    router.back();
  }

  return (
    <form onSubmit={onSubmit} className="mt-5 max-w-4xl">
      <div className="grid grid-cols-1 gap-4">
        <div className="my-5 flex flex-col items-center gap-4 md:flex-row md:items-start">
          <div className="flex w-full min-w-[300px] flex-col gap-4">
            <div>
              <Label htmlFor="students">Selecione o(s) aluno(s)</Label>
              <Combobox
                onChange={(value) => {
                  setFormData({
                    ...(formData || {}),
                    students: [
                      ...(formData?.students || []),
                      students.find((student) => String(student.id) === value)!,
                    ],
                  });
                }}
                items={students
                  .map((student) => ({
                    label: student.user.fullName,
                    value: String(student.id),
                  }))
                  .filter((student) => {
                    return !formData?.students?.find(
                      (s) => s.id === Number(student.value),
                    );
                  })}
              />
            </div>
            <div className="flex flex-col gap-4">
              <StudentsList formData={formData} setFormData={setFormData} />
            </div>
          </div>
          <Separator orientation="vertical" className="hidden md:block" />
          <div className="flex w-full min-w-[300px] flex-col gap-4">
            <Separator className="block md:hidden" />
            <AppointmentsList formData={formData} setFormData={setFormData} />
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-end">
        <AlertDialog>
          <AlertDialogTrigger
            className={cn(
              "mt-12 w-full md:w-fit",
              buttonVariants({ variant: "default" }),
            )}
            disabled={isSaving || formData.students.length === 0}
          >
            {isSaving ? <Loader className="mr-1 h-6 w-6" /> : null}
            Salvar aula
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Detalhes do agendamento</AlertDialogTitle>
            </AlertDialogHeader>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex flex-row items-center gap-2">
                <Label>Alunos:</Label>
                {formData?.students?.map((student) => (
                  <span key={student.userId + "-" + student.id}>
                    {student.user.fullName} |
                  </span>
                ))}
              </div>
              <div className="flex flex-col gap-4">
                {formData?.dates?.map((date, index) => (
                  <div
                    key={date.date + "-" + date.startTime + "-" + date.endTime}
                    className="flex flex-col gap-4"
                  >
                    <Separator />
                    <div className="flex flex-row items-center gap-2">
                      <Label>Data:</Label>
                      <span>
                        {format(date.date, "dd 'de' MMMM 'de' yyyy", {
                          locale: ptBR,
                        })}
                      </span>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                      <Label>Horário:</Label>
                      <span>
                        {date.startTime} - {date.endTime}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div></div>
            </div>
            <Alert>
              <Terminal className="h-4 w-4" />
              <AlertTitle>Atenção!</AlertTitle>
              <AlertDescription>
                Os alunos receberão uma notificação sobre o agendamento e
                poderão confirmar ou cancelar a aula.
              </AlertDescription>
            </Alert>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction disabled={isSaving} onClick={onSubmit}>
                {isSaving ? <Loader className="mr-1 h-6 w-6" /> : null}
                Continuar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </form>
  );
}

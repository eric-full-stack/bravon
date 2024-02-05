"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import {
  Bookings,
  LessonFeedbacks,
  insertLessonFeedbacksSchema,
} from "@/db/schema";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";
import { getLessonsFeedbacksFromStudent } from "@/lib/api";
import { Textarea } from "@/components/ui/textarea";

type FormProps = {
  bookings: Bookings[];
  studentId: number;
};

export default function FeedbackForm({ bookings, studentId }: FormProps) {
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<LessonFeedbacks>({
    resolver: zodResolver(insertLessonFeedbacksSchema),
    defaultValues: {
      studentId,
    },
  });
  const { refetch } = useQuery(["feedbacks-from-student", studentId], () =>
    getLessonsFeedbacksFromStudent(studentId),
  );

  async function onSubmit(values: LessonFeedbacks) {
    setIsSaving(true);

    const response = await fetch(
      `/api/bookings/students/${studentId}/feedbacks`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      },
    );

    setIsSaving(false);

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your post was not saved. Please try again.",
        variant: "destructive",
      });
    }
    toast({
      description: "Seu aluno foi salvo.",
    });

    await refetch();
    router.back();
  }
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 max-w-4xl">
        <div className=" grid grid-cols-1 gap-4">
          <div className="space-y-8">
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex justify-between ">
                    Comentário
                  </FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bookingId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex gap-2">Aula</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      defaultValue={String(field.value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {bookings.map((booking) => (
                          <SelectItem
                            value={String(booking.id)}
                            key={booking.id}
                          >
                            {booking.date.toLocaleString()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex flex-row justify-end">
          <Button
            type="submit"
            className="mt-5 w-full md:w-fit"
            disabled={isSaving}
          >
            {isSaving ? <Loader className="mr-1 h-6 w-6" /> : null}
            Enviar feedback
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

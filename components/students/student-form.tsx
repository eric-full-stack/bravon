"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import InputMask from "react-input-mask";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import {
  Plans,
  Students,
  Users,
  insertStudentsSchema,
  insertUsersSchema,
} from "@/db/schema";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";
import { useAuth } from "@clerk/nextjs";
import { getStudentById, getStudentsFromTeacher } from "@/lib/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FormProps = {
  plans: Plans[];
  data?: (Students & { user: Users }) | null;
};

export default function StudentForm({ plans, data }: FormProps) {
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<Students & Users>({
    resolver: zodResolver(
      z.object({ ...insertStudentsSchema.shape, ...insertUsersSchema.shape }),
    ),
    defaultValues: {
      fullName: data?.user.fullName,
      email: data?.user.email,
      phone: data?.user.phone,
      id: data?.id,
      planId: data?.planId,
      userId: data?.userId,
      externalId: null,
      rating: 5,
    },
  });
  const user = useAuth();
  const { refetch } = useQuery(
    ["students-from-teacher", user.userId, data?.planId],
    () => getStudentsFromTeacher(data?.planId),
  );
  const { refetch: refetchStudent } = useQuery(["students", data?.id], () =>
    getStudentById(data?.id),
  );

  async function onSubmit(values: Students & Users) {
    setIsSaving(true);
    const URL = data && data.id ? `/api/students/${data.id}` : `/api/students/`;
    const response = await fetch(URL, {
      method: data && data.id ? "PATCH" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...values,
        phone: values.phone.replace(/\D/g, ""),
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
      description: "Seu aluno foi salvo.",
    });

    await refetch();
    await refetchStudent();
    router.back();
  }
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 max-w-4xl">
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-3">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex justify-between ">
                    Nome completo
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-0 grid grid-cols-1 gap-3 md:grid-cols-2">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-2">Telefone</FormLabel>
                    <FormControl>
                      <InputMask mask="(99) 99999-9999" type="tel" {...field}>
                        {/* @ts-ignore */}
                        {(inputProps) => <Input {...inputProps} />}
                      </InputMask>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="planId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-2">Plano</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        defaultValue={String(field.value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          {plans.map((plan) => (
                            <SelectItem value={String(plan.id)} key={plan.id}>
                              {plan.name}
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
        </div>
        <div className="flex flex-row justify-end">
          <Button
            type="submit"
            className="mt-5 w-full md:w-fit"
            disabled={isSaving}
          >
            {isSaving ? <Loader className="mr-1 h-6 w-6" /> : null}
            Salvar aluno
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

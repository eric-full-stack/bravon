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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Plans, Sports, insertPlansSchema } from "@/db/schema";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";
import { useAuth } from "@clerk/nextjs";
import { getPlanById, getPlansFromTeacher } from "@/lib/api";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import IntlCurrencyInput from "react-intl-currency-input";

const currencyConfig = {
  locale: "pt-BR",
  formats: {
    number: {
      BRL: {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
    },
  },
};

type PlanFormProps = {
  sports: Sports[];
  data?: Plans | null;
};

export default function PlanForm({ sports, data }: PlanFormProps) {
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<Plans>({
    resolver: zodResolver(insertPlansSchema),
    defaultValues: {
      name: data?.name,
      description: data?.description,
      price: data?.price,
      sportId: data?.sportId,
      duration: data?.duration || 60,
      lessonsPerWeek: data?.lessonsPerWeek || 1,
      numberOfLessons: data?.numberOfLessons || 4,
      id: data?.id,
      teacherId: data?.teacherId,
    },
  });

  const user = useAuth();
  const { refetch } = useQuery(
    ["plans-from-teacher", user.userId],
    getPlansFromTeacher,
  );
  const { refetch: refetchPlan } = useQuery(["plans", data?.id], () =>
    getPlanById(data?.id),
  );

  async function onSubmit(values: Plans) {
    setIsSaving(true);
    const URL = data && data.id ? `/api/plans/${data.id}` : `/api/plans/`;
    const response = await fetch(URL, {
      method: data && data.id ? "PATCH" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...values,
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
      description: "Seu plano foi salvo.",
    });

    await refetch();
    await refetchPlan();
    router.back();
  }
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 max-w-4xl">
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex justify-between ">Nome</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex gap-2">Descrição</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-2">Preço (R$)</FormLabel>
                    <FormControl>
                      <IntlCurrencyInput
                        {...field}
                        component={Input}
                        currency="BRL"
                        defaultValue={field.value}
                        max={99999}
                        config={{
                          ...currencyConfig,
                          locale: "pt-BR",
                        }}
                        onChange={(event, value, maskedValue) => {
                          if (value) {
                            field.onChange(value);
                          }
                        }}
                      ></IntlCurrencyInput>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sportId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-2">Esporte</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        defaultValue={String(field.value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          {sports.map((sport) => (
                            <SelectItem value={String(sport.id)} key={sport.id}>
                              {sport.name}
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
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-2">
                      Duração (minutos)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="1"
                        min={1}
                        {...field}
                        onChange={(e) => {
                          field.onChange(e.currentTarget.valueAsNumber);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="numberOfLessons"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-2">
                      Quantidade de aulas
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="1"
                        min={1}
                        {...field}
                        onChange={(e) => {
                          field.onChange(e.currentTarget.valueAsNumber);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lessonsPerWeek"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-2">Aulas / semana</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="1"
                        min={1}
                        {...field}
                        onChange={(e) => {
                          field.onChange(e.currentTarget.valueAsNumber);
                        }}
                      />
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
            Salvar plano
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

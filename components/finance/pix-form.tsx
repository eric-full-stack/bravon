"use client";

import { FormProvider, useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { updateTeacherPaymentMethod } from "@/lib/api";
import { TeacherPaymentMethods } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

export default function PixForm({ data }: { data?: TeacherPaymentMethods }) {
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const form = useForm<TeacherPaymentMethods>({
    defaultValues: {
      paymentMethod: data?.paymentMethod || "PIX",
      paymentType: data?.paymentType || "",
      paymentDetails: data?.paymentDetails || "",
      active: data?.active || false,
    },
  });

  async function onSubmit(values: TeacherPaymentMethods) {
    setIsSaving(true);

    const response = await updateTeacherPaymentMethod(
      values.paymentMethod,
      values.paymentType || "",
      values.paymentDetails || "",
      values.active
    );

    setIsSaving(false);

    if (!response) {
      return toast({
        title: "Something went wrong.",
        description: "Your post was not saved. Please try again.",
        variant: "destructive",
      });
    }
    toast({
      description: "Atualizado com sucesso",
    });
  }
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FormProvider {...form}>
        <Input type="hidden" {...form.register("paymentMethod")} value="PIX" />
        <div className="flex flex-col items-center justify-between rounded-lg border p-4">
          <div className="flex flex-row w-full justify-between items-center">
            <div className="space-y-0.5">
              <FormLabel className="text-base">PIX</FormLabel>
              <FormDescription>
                Determine qual será a sua chave PIX
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                checked={form.getValues("active")}
                onCheckedChange={(checked) => {
                  form.setValue("active", checked);
                  onSubmit({ ...form.getValues(), active: checked });
                }}
              />
            </FormControl>
          </div>
          {form.getValues("active") ? (
            <>
              <div className="flex flex-row w-full mt-5 gap-2 items-center">
                <FormField
                  control={form.control}
                  name="paymentType"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value || undefined}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="CPF">CPF</SelectItem>
                            <SelectItem value="E-mail">E-mail</SelectItem>
                            <SelectItem value="Telefone">Telefone</SelectItem>
                            <SelectItem value="Aleatória">Aleatória</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="paymentDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Digite a chave"
                          value={field.value || undefined}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-start mt-5 w-full">
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? <Loader className="mr-1 h-6 w-6" /> : null}Salvar
                </Button>
              </div>
            </>
          ) : null}
        </div>
      </FormProvider>
    </form>
  );
}

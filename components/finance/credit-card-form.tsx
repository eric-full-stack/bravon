"use client";

import { FormProvider, useForm } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { updateTeacherPaymentMethod } from "@/lib/api";
import { TeacherPaymentMethods } from "@/db/schema";
import { Input } from "@/components/ui/input";

export default function CreditCardForm({
  data,
}: {
  data?: TeacherPaymentMethods;
}) {
  const [, setIsSaving] = useState<boolean>(false);

  const form = useForm<TeacherPaymentMethods>({
    defaultValues: {
      paymentMethod: data?.paymentMethod || "creditCard",
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
    <form>
      <FormProvider {...form}>
        <Input
          type="hidden"
          {...form.register("paymentMethod")}
          value="creditCard"
        />
        <FormField
          control={form.control}
          name="active"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center justify-between rounded-lg border p-4">
              <div className="flex flex-row w-full justify-between items-center">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Cartão de Crédito</FormLabel>
                  <FormDescription>
                    Aceitar pagamentos com Cartão de Crédito
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      field.onChange(checked);
                      onSubmit({ ...form.getValues(), active: checked });
                    }}
                  />
                </FormControl>
              </div>
            </FormItem>
          )}
        />
      </FormProvider>
    </form>
  );
}

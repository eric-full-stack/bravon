import PixForm from "./pix-form";
import CreditCardForm from "./credit-card-form";
import { getTeacherPaymentMethod } from "@/lib/api";

export default async function FinanceTeacherForm() {
  const paymentMethods = await getTeacherPaymentMethod();

  return (
    <div className="space-y-4">
      <PixForm
        data={paymentMethods?.find((method) => method.paymentMethod === "PIX")}
      />
      <CreditCardForm
        data={paymentMethods?.find(
          (method) => method.paymentMethod === "creditCard"
        )}
      />
    </div>
  );
}

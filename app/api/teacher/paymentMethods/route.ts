import { insertTeacherPaymentMethodsSchema } from "@/db/schema";
import { getTeacherPaymentMethod, updateTeacherPaymentMethod } from "@/lib/api";
import { auth } from "@clerk/nextjs";

export async function GET() {
  try {
    const session = auth();
    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }
    const paymentMethods = await getTeacherPaymentMethod();
    return new Response(JSON.stringify(paymentMethods));
  } catch (error) {
    console.log(error);
    return new Response(null, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const session = auth();
    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }
    const data = await request.json();
    const values = insertTeacherPaymentMethodsSchema.parse(data);
    const { paymentMethod, paymentType, paymentDetails, active } = values;
    const paymentMethodData = await updateTeacherPaymentMethod(
      paymentMethod || "PIX",
      paymentType || "",
      paymentDetails || "",
      active || false
    );
    return new Response(JSON.stringify(paymentMethodData));
  } catch (error) {
    console.log(error);
    return new Response(null, { status: 500 });
  }
}

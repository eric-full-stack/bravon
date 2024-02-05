import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2022-11-15",
});

async function handler(data: any) {
  return new Response(null, { status: 200 });
}

export async function POST(request: Request) {
  const data = await request.text();
  const sig = request.headers.get("stripe-signature")!;
  const event = stripe.webhooks.constructEvent(
    data,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET || "",
  );
  console.log(event);

  return await handler(data);
}

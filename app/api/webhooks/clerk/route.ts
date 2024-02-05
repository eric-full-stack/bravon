import { db } from "@/db";
import { teachers, users } from "@/db/schema";
import { WebhookEvent } from "@clerk/nextjs/dist/types/server";
import { eq } from "drizzle-orm";

const handler = async (data: WebhookEvent) => {
  const evt = data;
  switch (evt.type) {
    case "user.created": {
      const first_name = evt.data.first_name;
      const last_name = evt.data.last_name || "";
      const email = evt.data.email_addresses[0]?.email_address;
      const phone = evt.data.phone_numbers[0]?.phone_number ?? "";
      const externalId = evt.data.id;
      const user = await db.insert(users).values({
        fullName: `${first_name} ${last_name}`,
        email,
        phone,
        externalId,
      });
      const teacher = await db.insert(teachers).values({
        userId: Number(user.insertId),
        rating: 5,
        sportId: 1,
      });
      return new Response(JSON.stringify(teacher));
    }
    case "user.updated": {
      const first_name = evt.data.first_name;
      const last_name = evt.data.last_name || "";
      const phone =
        evt.data.phone_numbers.filter(
          (phone) => phone.verification?.status === "verified",
        )[0]?.phone_number ?? "";
      const externalId = evt.data.id;
      const user = await db.query.users.findFirst({
        where: eq(users.externalId, externalId),
      });
      if (!user) return new Response(null, { status: 404 });
      await db
        .update(users)
        .set({
          fullName: `${first_name} ${last_name}`,
          phone,
        })
        .where(eq(users.id, user.id));

      return new Response(null, { status: 200 });
    }
    default:
      return new Response(null, { status: 200 });
  }
};

export async function POST(request: Request) {
  const data = await request.json();

  if (
    request.headers.get("CLERK_TOKEN_AUTH") !== process.env.CLERK_TOKEN_AUTH
  ) {
    return new Response(null, { status: 403 });
  }

  return await handler(data);
}

import { db } from "@/db";
import { insertPlansSchema, plans, users } from "@/db/schema";
import { getPlanById } from "@/lib/api";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  try {
    const session = auth();
    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }
    const plansData = await getPlanById(params.id);
    return new Response(JSON.stringify(plansData));
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: number } }
) {
  try {
    const session = auth();
    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const data = await request.json();
    const values = insertPlansSchema.parse(data);

    const user = await db.query.users.findFirst({
      where: eq(users.externalId, session.userId!),
      with: {
        teacher: true,
      },
    });
    if (!user) return null;

    const sport = await db
      .update(plans)
      .set({
        ...values,
        teacherId: user.teacher.id,
      })
      .where(eq(plans.id, params.id));

    return new Response(JSON.stringify(sport));
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}

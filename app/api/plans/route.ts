import { auth } from "@clerk/nextjs";
import { getPlansFromTeacher } from "@/lib/api";
import { insertPlansSchema, plans, users } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const session = auth();
    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }
    const plansData = await getPlansFromTeacher();
    return new Response(JSON.stringify(plansData));
  } catch (error) {
    console.log(error);
    return new Response(null, { status: 500 });
  }
}

export async function POST(request: Request) {
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
    if (!user) return new Response("Unauthorized", { status: 403 });

    const plan = await db.insert(plans).values({
      ...values,
      teacherId: user.teacher.id,
    });
    return new Response(JSON.stringify(plan));
  } catch (error) {
    console.log(error);
    return new Response(null, { status: 500 });
  }
}

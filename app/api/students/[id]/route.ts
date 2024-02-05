import { db } from "@/db";
import {
  insertStudentsSchema,
  insertUsersSchema,
  students,
  users,
} from "@/db/schema";
import { getStudentById } from "@/lib/api";
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
    const plansData = await getStudentById(params.id);
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
    const studentValues = insertStudentsSchema.parse(data);
    const userValues = insertUsersSchema.parse(data);

    const student = await db.query.students.findFirst({
      where: eq(students.id, params.id),
      with: {
        user: true,
      },
    });
    if (!student) return null;

    await db
      .update(users)
      .set({
        ...userValues,
        id: student.userId,
      })
      .where(eq(users.id, student.userId));

    await db
      .update(students)
      .set({
        ...studentValues,
        userId: Number(student.userId),
      })
      .where(eq(students.id, params.id));

    return new Response(JSON.stringify(student));
  } catch (error) {
    console.log(error);
    return new Response(null, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = auth();
    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const id = Number(request.url.split("/").pop()!);

    const student = await db.query.students.findFirst({
      where: eq(students.id, id),
      with: {
        user: true,
      },
    });
    if (!student) return null;

    await db.delete(users).where(eq(users.id, student.userId));
    await db.delete(students).where(eq(students.id, id));

    return new Response(JSON.stringify(student));
  } catch (error) {
    console.log(error);
    return new Response(null, { status: 500 });
  }
}

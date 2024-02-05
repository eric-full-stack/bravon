import { inngest } from "@/app/inngest/client";
import { db } from "@/db";
import { bookings, bookingsStudents, users } from "@/db/schema";
import { getBookingsFromTeacher, sendWhatsAppNotification } from "@/lib/api";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import * as z from "zod";

export async function GET() {
  try {
    const session = auth();
    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }
    const bookings = await getBookingsFromTeacher();
    return new Response(JSON.stringify(bookings));
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
    //add students array to schema
    const values = z
      .object({
        students: z.array(z.number()),
        dates: z.array(
          z.object({
            date: z.string(),
            startTime: z.string(),
            endTime: z.string(),
          }),
        ),
        teacherId: z.number().nullish(),
      })
      .parse(data);

    const user = await db.query.users.findFirst({
      where: eq(users.externalId, session.userId!),
      with: {
        teacher: true,
      },
    });
    if (!user) return new Response("Not found", { status: 404 });

    for await (const date of values.dates) {
      const booking = await db.insert(bookings).values({
        endTime: date.endTime,
        startTime: date.startTime,
        isAutoBooking: false,
        status: "pending",
        date: new Date(date.date),
        teacherId: user.teacher.id,
      });
      for await (const studentId of values.students) {
        await db.insert(bookingsStudents).values({
          bookingId: Number(booking.insertId),
          studentId,
        });
      }
    }

    for await (const studentId of values.students) {
      await inngest.send({
        name: "notification/whatsapp/send",
        data: {
          teacherId: session.userId!,
          studentId,
          type: "all_bookings_from_student",
          data: {
            appointments: values.dates,
          },
        },
      });
    }

    return new Response(JSON.stringify({ success: true }));
  } catch (error) {
    console.log(error);
    return new Response(null, { status: 500 });
  }
}

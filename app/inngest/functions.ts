import { db } from "@/db";
import { bookings as bookingSchema, bookingsStudents } from "@/db/schema";
import { sendWhatsAppNotification } from "@/lib/api";
import { addDays, format } from "date-fns";
import { and, eq, inArray, isNull, or, sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { inngest } from "@/app/inngest/client";
import { MessageTypes } from "@/types/enums";

export const updateBookingStatus = inngest.createFunction(
  { name: "Update Booking Status" },
  { cron: "*/30 * * * *" },
  async () => {
    const bookingsData = await db.execute(sql`SELECT b.id, b.status, b.date
    FROM bookings b
    WHERE b.status = 'pending' AND NOT EXISTS (
        SELECT 1
        FROM bookings_students bs
        WHERE bs.booking_id = b.id AND bs.status != 'approved'
    )`);
    const rows = bookingsData.rows as {
      id: number;
      status: string;
      date: Date;
    }[];
    if (rows.length === 0) return null;

    await db
      .update(bookingSchema)
      .set({
        status: "approved",
      })
      .where(
        inArray(
          bookingSchema.id,
          rows.map((b) => b.id),
        ),
      );
  },
);

export const sendWhatsAppNotificationQueue = inngest.createFunction(
  { name: "Send WhatsApp Notification V2" },
  { event: "notification/whatsapp/send" },
  async ({ event, logger }) => {
    const eventData = event.data as {
      studentId: number;
      teacherId: string | null;
      type: MessageTypes;
      data?: any;
    };

    await sendWhatsAppNotification(
      eventData.teacherId,
      eventData.studentId,
      eventData.type,
      eventData.data,
    );

    logger.info(
      `WhatsApp notification sent: ${eventData.type} to ${
        eventData.studentId
      } at ${new Date().toISOString()}`,
    );
  },
);

export const cronBookingNotification = inngest.createFunction(
  { name: "Cron Booking Notification V2" },
  { cron: "0 0 * * *" },
  async () => {
    const bookings = await db.query.bookings.findMany({
      where: or(
        and(
          eq(bookingSchema.status, "pending"),
          //@ts-ignore
          eq(bookingSchema.date, format(addDays(new Date(), 1), "yyyy-MM-dd")),
        ),
        and(
          eq(bookingSchema.status, "pending"),
          //@ts-ignore
          eq(bookingSchema.date, format(new Date(), "yyyy-MM-dd")),
        ),
      ),
      with: {
        teacher: {
          with: {
            user: true,
          },
        },
        students: {
          where: and(
            eq(bookingsStudents.status, "pending"),
            isNull(bookingsStudents.notificationSentAt),
          ),
        },
      },
    });

    for await (const booking of bookings) {
      for await (const bookingStudent of booking.students) {
        await inngest.send({
          name: "notification/whatsapp/send",
          data: {
            teacherId: booking.teacher.user.externalId,
            studentId: bookingStudent.studentId,
            type: "booking_appointment",
            data: booking,
          },
        });
        await db
          .update(bookingsStudents)
          .set({
            notificationSentAt: new Date(),
          })
          .where(
            and(
              eq(bookingsStudents.id, bookingStudent.id),
              eq(bookingsStudents.bookingId, booking.id),
            ),
          );
      }
    }

    return NextResponse.json({ ok: true, data: bookings });
  },
);

export const welcomeMessage = inngest.createFunction(
  { name: "Welcome Message" },
  { event: "student/created" },
  async ({ event }) => {
    const eventData = event.data as {
      studentId: number;
      teacherId: string | null;
      data?: any;
    };
    await sendWhatsAppNotification(
      eventData.teacherId,
      eventData.studentId,
      "payment_plan_remainder",
      eventData.data,
    );
  },
);

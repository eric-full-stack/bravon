import { inngest } from "@/app/inngest/client";
import { db } from "@/db";
import {
  bookings,
  bookingsStudents,
  students,
  whatsAppReplies,
  whatsappNotifications,
  whatsappNotificationsStudents,
} from "@/db/schema";
import { sendWhatsAppResponse } from "@/lib/api";
import { eq, and, not } from "drizzle-orm";

type TwilioEvent = {
  SmsSid: string;
  SmsStatus:
    | "accepted"
    | "queued"
    | "sending"
    | "sent"
    | "failed"
    | "delivered"
    | "undelivered"
    | "receiving"
    | "received"
    | "read";
  MessageStatus:
    | "accepted"
    | "queued"
    | "sending"
    | "sent"
    | "failed"
    | "delivered"
    | "undelivered"
    | "receiving"
    | "received"
    | "read";
  ChannelToAddress: string;
  To: string;
  MessageSid: string;
  AccountSid: string;
  ErrorCode?: string;
  ErrorMessage?: string;
  StrucuredMessage: string;
  From: string;
  ApiVersion: string;
  ChannelInstallSid: string;
  OriginalRepliedMessageSid?: string;
  Body: string;
};

type BookingStatus = "pending" | "approved" | "rejected";
type StudentStatus = "pending" | "active" | "inactive";

const confirmTexts = [
  "confirmar",
  "confirmado",
  "confirmar reserva",
  "confirme",
  "confirmo",
];

const cancelTexts = [
  "cancelar",
  "cancelado",
  "cancelar reserva",
  "cancelar plano",
  "cancele",
];

const handler = async (data: TwilioEvent) => {
  const whatsappNotificationStudent =
    await db.query.whatsappNotificationsStudents.findFirst({
      where: eq(
        whatsappNotificationsStudents.twilioId,
        data.OriginalRepliedMessageSid!,
      ),
    });

  const whatsAppNotification = await db.query.whatsappNotifications.findFirst({
    where: eq(
      whatsappNotifications.id,
      whatsappNotificationStudent?.whatsappNotificationId!,
    ),
  });

  if (whatsAppNotification?.type === "booking_appointment") {
    let status: BookingStatus = "pending";
    if (confirmTexts.includes(data.Body.toLocaleLowerCase())) {
      status = "approved";
    } else if (cancelTexts.includes(data.Body.toLocaleLowerCase())) {
      status = "rejected";
    }
    await db
      .update(bookingsStudents)
      .set({
        status,
      })
      .where(
        and(
          eq(
            bookingsStudents.studentId,
            whatsappNotificationStudent?.studentId!,
          ),
          eq(
            bookingsStudents.bookingId,
            whatsappNotificationStudent?.bookingId!,
          ),
        ),
      );

    const allStudentsApproved = await db.query.bookingsStudents.findMany({
      where: and(
        eq(bookingsStudents.bookingId, whatsappNotificationStudent?.bookingId!),
        not(eq(bookingsStudents.status, "approved")),
      ),
    });

    if (allStudentsApproved.length === 0) {
      const booking = await db.query.bookings.findFirst({
        with: {
          teacher: true,
          students: {
            with: {
              student: {
                with: {
                  user: true,
                },
              },
            },
          },
        },
        where: eq(bookings.id, whatsappNotificationStudent?.bookingId!),
      });
      await inngest.send({
        name: "notification/whatsapp/send",
        data: {
          teacherId: booking?.teacherId!,
          studentId: whatsappNotificationStudent?.studentId!,
          type: "lesson_confirmed_teacher",
          data: {
            bookingDate: booking?.date,
            bookingStartTime: booking?.startTime,
            bookingEndTime: booking?.endTime,
            students: booking?.students.map((bookingStudent) => ({
              name: bookingStudent.student.user.fullName,
            })),
          },
        },
      });
    }
  } else if (whatsAppNotification?.type === "payment_plan_remainder") {
    let status: StudentStatus = "pending";
    if (confirmTexts.includes(data.Body.toLocaleLowerCase())) {
      status = "active";
    } else if (cancelTexts.includes(data.Body.toLocaleLowerCase())) {
      status = "inactive";
    }
    await db
      .update(students)
      .set({
        status,
      })
      .where(eq(students.id, whatsappNotificationStudent?.studentId!));
  }
};

export async function POST(request: Request) {
  const data = await request.formData();
  console.log(data);
  const twilioEventData: TwilioEvent = {
    SmsSid: data.get("SmsSid") as string,
    SmsStatus: data.get("SmsStatus") as TwilioEvent["SmsStatus"],
    MessageStatus: data.get("MessageStatus") as TwilioEvent["MessageStatus"],
    ChannelToAddress: data.get("ChannelToAddress") as string,
    To: data.get("To") as string,
    MessageSid: data.get("MessageSid") as string,
    AccountSid: data.get("AccountSid") as string,
    ErrorCode: data.get("ErrorCode") as string | undefined,
    ErrorMessage: data.get("ErrorMessage") as string | undefined,
    StrucuredMessage: data.get("StrucuredMessage") as string,
    From: data.get("From") as string,
    ApiVersion: data.get("ApiVersion") as string,
    ChannelInstallSid: data.get("ChannelInstallSid") as string,
    Body: data.get("Body") as string,
    OriginalRepliedMessageSid: data.get("OriginalRepliedMessageSid") as string,
  };

  await db.insert(whatsAppReplies).values({
    twilioId: twilioEventData.MessageSid,
    body: twilioEventData.Body,
    from: twilioEventData.From,
    originalRepliedMessageId: twilioEventData.OriginalRepliedMessageSid,
  });

  if (twilioEventData.OriginalRepliedMessageSid) {
    await handler(twilioEventData);
    await thankYou(twilioEventData);
  }
  return new Response(null, { status: 200 });
}

const thankYou = async (data: TwilioEvent) => {
  await sendWhatsAppResponse(
    data.From,
    "Ótimo! Obrigado por responder. Caso seja necessário, entrarei em contato com mais informações.\n\nAté mais.",
  );
};

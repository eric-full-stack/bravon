import { db } from "@/db";
import { whatsappNotificationsStudents } from "@/db/schema";
import { eq } from "drizzle-orm";

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
  ChannelPrefix: string;
  MessageSid: string;
  AccountSid: string;
  ErrorCode?: string;
  ErrorMessage?: string;
  StrucuredMessage: string;
  From: string;
  ApiVersion: string;
  ChannelInstallSid: string;
  Body: string;
};

const handler = async (data: TwilioEvent) => {
  const whatsappNotificationStudent =
    await db.query.whatsappNotificationsStudents.findFirst({
      where: eq(whatsappNotificationsStudents.twilioId, data.MessageSid),
    });

  if (!whatsappNotificationStudent) {
    await db.insert(whatsappNotificationsStudents).values({
      studentId: 0,
      whatsappNotificationId: 0,
      twilioId: data.MessageSid,
      payload: JSON.stringify(data),
    });
    return new Response(null, { status: 200 });
  }

  await db
    .update(whatsappNotificationsStudents)
    .set({
      status: data.MessageStatus,
      payload: JSON.stringify(data),
    })
    .where(eq(whatsappNotificationsStudents.twilioId, data.MessageSid));
  return new Response(null, { status: 200 });
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
    ChannelPrefix: data.get("ChannelPrefix") as string,
    MessageSid: data.get("MessageSid") as string,
    AccountSid: data.get("AccountSid") as string,
    ErrorCode: data.get("ErrorCode") as string | undefined,
    ErrorMessage: data.get("ErrorMessage") as string | undefined,
    StrucuredMessage: data.get("StrucuredMessage") as string,
    From: data.get("From") as string,
    ApiVersion: data.get("ApiVersion") as string,
    ChannelInstallSid: data.get("ChannelInstallSid") as string,
    Body: data.get("Body") as string,
  };

  if (twilioEventData.ChannelPrefix !== "whatsapp")
    return new Response(null, { status: 200 });

  return await handler(twilioEventData);
}

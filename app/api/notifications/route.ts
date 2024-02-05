import { insertWhatsappNotificationsSchema } from "@/db/schema";
import {
  getNotificationsFromTeacher,
  updateTeacherNotification,
} from "@/lib/api";
import { auth } from "@clerk/nextjs";

export async function GET() {
  try {
    const session = auth();
    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }
    const notifications = await getNotificationsFromTeacher();
    return new Response(JSON.stringify(notifications));
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
    const values = insertWhatsappNotificationsSchema.parse(data);

    const { description, type } = values;

    const notification = await updateTeacherNotification(description, type);

    return new Response(JSON.stringify(notification));
  } catch (error) {
    console.log(error);
    return new Response(null, { status: 500 });
  }
}

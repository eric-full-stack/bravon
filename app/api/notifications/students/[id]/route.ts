import { getNotificationsFromStudent } from "@/lib/api";
import { auth } from "@clerk/nextjs";

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  try {
    const session = auth();
    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }
    const studentId = params.id;
    const notifications = await getNotificationsFromStudent(Number(studentId));
    return new Response(JSON.stringify(notifications));
  } catch (error) {
    console.log(error);
    return new Response(null, { status: 500 });
  }
}

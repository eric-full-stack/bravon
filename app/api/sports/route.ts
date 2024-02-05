import { db } from "@/db";
import { auth } from "@clerk/nextjs";

export async function GET() {
  try {
    const session = auth();
    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const sports = await db.query.sports.findMany();
    return new Response(JSON.stringify(sports));
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}

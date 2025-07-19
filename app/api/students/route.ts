// import { inngest } from "@/app/inngest/client";
// import { db } from "@/db";
// import {
//   insertStudentsSchema,
//   insertUsersSchema,
//   plans,
//   students,
//   users,
// } from "@/db/schema";
// import { getStudentsFromTeacher, sendWhatsAppNotification } from "@/lib/api";
// import { auth } from "@clerk/nextjs";
// import { eq } from "drizzle-orm";

// export async function GET(request: Request) {
//   try {
//     const session = auth();
//     if (!session) {
//       return new Response("Unauthorized", { status: 403 });
//     }
//     const planId = new URL(request.url).searchParams.get("planId");
//     const students = await getStudentsFromTeacher(Number(planId));
//     return new Response(JSON.stringify(students));
//   } catch (error) {
//     console.log(error);
//     return new Response(null, { status: 500 });
//   }
// }

// export async function POST(request: Request) {
//   try {
//     const session = auth();
//     if (!session) {
//       return new Response("Unauthorized", { status: 403 });
//     }

//     const data = await request.json();
//     const studentValues = insertStudentsSchema.parse(data);
//     const userValues = insertUsersSchema.parse(data);

//     const newUser = await db.insert(users).values(userValues);

//     const student = await db.insert(students).values({
//       ...studentValues,
//       userId: Number(newUser.insertId),
//     });

//     const plan = await db.query.plans.findFirst({
//       where: eq(plans.id, studentValues.planId),
//       with: {
//         sport: true,
//       },
//     });

//     await inngest.send({
//       name: "student/created",
//       data: {
//         teacherId: session.userId!,
//         studentId: Number(student.insertId),
//         data: plan,
//       },
//     });

//     return new Response(JSON.stringify(student));
//   } catch (error) {
//     console.log(error);
//     return new Response(null, { status: 500 });
//   }
// }

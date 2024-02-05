import { db } from "@/db";
import {
  Bookings,
  BookingsStudents,
  LessonFeedbacks,
  Plans,
  Sports,
  Students,
  TeacherPaymentMethods,
  Teachers,
  Users,
  WhatsappNotifications,
  WhatsappNotificationsStudents,
  bookings,
  bookingsStudents,
  lessonFeedbacks,
  plans,
  students,
  teacherPaymentMethods,
  users,
  whatsappNotifications,
  whatsappNotificationsStudents,
} from "@/db/schema";
import { MessageTypes } from "@/types/enums";
import { auth } from "@clerk/nextjs";
import { and, eq, inArray } from "drizzle-orm";
import { formatMessageWhatsapp } from "./utils";

export const getStudentById = async (id?: number) => {
  if (!id) return null;
  if (typeof window !== "undefined") {
    type Data = Students & {
      user: Users;
      bookings: (BookingsStudents & { booking: Bookings })[];
    };
    const student: Data = await fetch(`/api/students/${id}`).then((res) =>
      res.json(),
    );
    return student;
  } else {
    const session = auth();
    const teacherId = session.userId;
    const user = await db.query.users.findFirst({
      where: eq(users.externalId, teacherId!),
      with: {
        teacher: true,
      },
    });
    if (!user) return null;

    const studentData = await db.query.students.findFirst({
      where: eq(students.id, id),
      with: {
        user: true,
        bookings: {
          with: {
            booking: true,
          },
        },
      },
    });

    return studentData;
  }
};

export type StudentsFromTeacher = (Students & {
  plan: Plans & {
    sport: Sports;
  };
  user: Users;
  bookings: (BookingsStudents & { booking: Bookings })[];
})[];

export const getStudentsFromTeacher = async (planId: number | undefined) => {
  if (typeof window !== "undefined") {
    const students: StudentsFromTeacher = await fetch(
      `/api/students?planId=${planId}`,
    ).then((res) => res.json());
    return students;
  } else {
    const session = auth();
    const teacherId = session.userId;
    const user = await db.query.users.findFirst({
      where: eq(users.externalId, teacherId!),
      with: {
        teacher: true,
      },
    });
    if (!user) return null;

    const teacherPlans = await db.query.plans.findMany({
      where: eq(plans.teacherId, user.teacher.id),
    });
    if (!teacherPlans) return [];

    const studentsData = await db.query.students.findMany({
      where: inArray(
        students.planId,
        planId ? [planId] : teacherPlans.map((p) => p.id),
      ),
      with: {
        plan: {
          with: {
            sport: true,
          },
        },
        user: true,
        bookings: {
          with: {
            booking: true,
          },
        },
      },
    });

    return studentsData;
  }
};

export const getPlans = async () => {
  const plans = await db.query.plans.findMany();
  return plans;
};

export type PlansFromTeacher = (Plans & {
  sport: Sports;
  students: Students[];
})[];
export const getPlansFromTeacher = async () => {
  if (typeof window !== "undefined") {
    const plans: PlansFromTeacher = await fetch("/api/plans").then((res) =>
      res.json(),
    );
    return plans;
  } else {
    const session = auth();
    const teacherId = session.userId;
    const user = await db.query.users.findFirst({
      where: eq(users.externalId, teacherId!),
      with: {
        teacher: true,
      },
    });
    if (!user) return null;
    const plansData = await db.query.plans.findMany({
      where: eq(plans.teacherId, user.teacher.id),
      with: {
        sport: true,
        students: true,
      },
    });
    return plansData;
  }
};

export const getPlanById = async (id?: number) => {
  if (!id) return null;

  if (typeof window !== "undefined") {
    type Data = Plans & { sport: Sports };
    const plan: Data = await fetch(`/api/plans/${id}`).then((res) =>
      res.json(),
    );
    return plan;
  } else {
    const plan = await db.query.plans.findFirst({
      where: eq(plans.id, id),
      with: {
        sport: true,
      },
    });
    if (!plan) return null;
    return plan;
  }
};

export const getSports = async () => {
  if (typeof window !== "undefined") {
    type Data = Sports[];
    const sports: Data = await fetch("/api/sports").then((res) => res.json());
    return sports;
  } else {
    const sports = await db.query.sports.findMany();
    return sports;
  }
};

export async function updateTeacherNotification(
  description: string,
  type: MessageTypes,
) {
  // if (typeof window !== "undefined") {
  //   const notification = await fetch("/api/notifications", {
  //     method: "PATCH",
  //     body: JSON.stringify({
  //       description,
  //       type,
  //     }),
  //   }).then((res) => res.json());
  //   return notification;
  // } else {
  //   const session = auth();
  //   const teacherId = session.userId;
  //   const user = await db.query.users.findFirst({
  //     where: eq(users.externalId, teacherId!),
  //     with: {
  //       teacher: true,
  //     },
  //   });
  //   if (!user) return null;
  //   const oldNotification = await db.query.whatsappNotifications.findFirst({
  //     where: and(
  //       eq(whatsappNotifications.teacherId, user.teacher.id),
  //       eq(whatsappNotifications.type, type),
  //     ),
  //   });
  //   let notification;
  //   if (oldNotification) {
  //     notification = await db
  //       .update(whatsappNotifications)
  //       .set({
  //         description,
  //         type,
  //         teacherId: user.teacher.id,
  //       })
  //       .where(eq(whatsappNotifications.id, oldNotification.id));
  //   } else {
  //     notification = await db.insert(whatsappNotifications).values({
  //       description,
  //       type,
  //       teacherId: user.teacher.id,
  //     });
  //   }
  //   return notification;
  // }
}

export async function getNotificationsFromTeacher() {
  if (typeof window !== "undefined") {
    const notifications = await fetch("/api/notifications").then((res) =>
      res.json(),
    );
    return notifications;
  } else {
    const session = auth();
    const teacherId = session.userId;
    const user = await db.query.users.findFirst({
      where: eq(users.externalId, teacherId!),
      with: {
        teacher: true,
      },
    });
    if (!user) return null;
    const notifications = await db.query.whatsappNotifications.findMany();
    return notifications;
  }
}

export async function sendWhatsAppResponse(to: string, body: string) {
  if (typeof window === "undefined") {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require("twilio")(accountSid, authToken);
    const response = await client.messages.create({
      body,
      from: `whatsapp:${process.env.TWILIO_SENDER_NUMBER || ""}`,
      to: `${to}`,
    });
    return response;
  }
}

export async function sendWhatsAppNotification(
  teacherId: string | null,
  studentId: number,
  type: MessageTypes,
  data?: any,
) {
  if (typeof window === "undefined") {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require("twilio")(accountSid, authToken);

    try {
      let user;
      if (!teacherId) {
        user = await db.query.users.findFirst({
          with: {
            teacher: {
              with: {
                paymentMethods: true,
                plans: {
                  with: {
                    students: {
                      where: eq(students.id, studentId),
                    },
                  },
                },
              },
            },
          },
        });
      } else {
        user = await db.query.users.findFirst({
          where: eq(users.externalId, teacherId),
          with: {
            teacher: {
              with: {
                paymentMethods: true,
              },
            },
          },
        });
      }
      if (!user) return null;

      const student = await db.query.students.findFirst({
        where: eq(students.id, studentId),
        with: {
          user: true,
          plan: {
            with: {
              sport: true,
            },
          },
        },
      });

      if (!student) return null;

      const whatsapp_notification =
        await db.query.whatsappNotifications.findFirst({
          where: eq(whatsappNotifications.type, type),
        });

      if (
        whatsapp_notification &&
        student.user.phone &&
        student.user.phone.length > 10
      ) {
        const twilioMessage = await client.messages.create({
          body: formatMessageWhatsapp(
            whatsapp_notification.description,
            user,
            student,
            data,
          ),
          from: `whatsapp:${process.env.TWILIO_SENDER_NUMBER || ""}`,
          to: `whatsapp:+55${student.user.phone.replace(/\D/g, "")}`,
          // to: `whatsapp:+554891902906`,
        });

        await db.insert(whatsappNotificationsStudents).values({
          studentId: student.id,
          bookingId: type === "booking_appointment" ? data?.id : null,
          whatsappNotificationId: whatsapp_notification.id,
          twilioId: twilioMessage.sid,
          payload: JSON.stringify(twilioMessage),
        });
      }

      return whatsapp_notification;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
export type NotificationsFromStudent = (WhatsappNotificationsStudents & {
  notification: WhatsappNotifications;
})[];
export async function getNotificationsFromStudent(studentId: number) {
  if (typeof window !== "undefined") {
    const notifications: NotificationsFromStudent = await fetch(
      `/api/notifications/students/${studentId}`,
    ).then((res) => res.json());
    return notifications;
  } else {
    const notifications = await db.query.whatsappNotificationsStudents.findMany(
      {
        where: eq(whatsappNotificationsStudents.studentId, studentId),
        with: {
          notification: true,
        },
      },
    );
    return notifications;
  }
}

export async function updateTeacherPaymentMethod(
  paymentMethod: string,
  paymentType: string,
  paymentDetails: string,
  active: boolean,
) {
  if (typeof window !== "undefined") {
    const method = await fetch("/api/teacher/paymentMethods", {
      method: "PATCH",
      body: JSON.stringify({
        paymentMethod,
        paymentType,
        paymentDetails,
        active,
      }),
    }).then((res) => res.json());
    return method;
  } else {
    const session = auth();
    const teacherId = session.userId;
    const user = await db.query.users.findFirst({
      where: eq(users.externalId, teacherId!),
      with: {
        teacher: true,
      },
    });
    if (!user) return null;
    const oldMethod = await db.query.teacherPaymentMethods.findFirst({
      where: and(
        eq(teacherPaymentMethods.teacherId, user.teacher.id),
        eq(teacherPaymentMethods.paymentMethod, paymentMethod),
      ),
    });
    let method;
    if (oldMethod) {
      method = await db
        .update(teacherPaymentMethods)
        .set({
          paymentMethod,
          paymentType,
          paymentDetails,
          active,
          teacherId: user.teacher.id,
        })
        .where(eq(teacherPaymentMethods.id, oldMethod.id));
    } else {
      method = await db.insert(teacherPaymentMethods).values({
        paymentMethod,
        paymentType,
        paymentDetails,
        active,
        teacherId: user.teacher.id,
      });
    }
    return method;
  }
}

export async function getTeacherPaymentMethod() {
  if (typeof window !== "undefined") {
    const paymentMethods: TeacherPaymentMethods[] = await fetch(
      "/api/teacher/paymentMethods",
    ).then((res) => res.json());
    return paymentMethods;
  } else {
    const session = auth();
    const teacherId = session.userId;
    const user = await db.query.users.findFirst({
      where: eq(users.externalId, teacherId!),
      with: {
        teacher: true,
      },
    });
    if (!user) return null;
    const paymentMethod = await db.query.teacherPaymentMethods.findMany({
      where: eq(teacherPaymentMethods.teacherId, user.teacher.id),
    });
    return paymentMethod;
  }
}

export async function getLessonsFeedbacksFromStudent(studentId: number) {
  if (typeof window !== "undefined") {
    const lessons: (LessonFeedbacks & { booking: Bookings })[] = await fetch(
      `/api/bookings/students/${studentId}/feedbacks`,
    ).then((res) => res.json());
    return lessons;
  } else {
    const lessons = await db.query.lessonFeedbacks.findMany({
      where: eq(lessonFeedbacks.studentId, studentId),
      with: {
        booking: true,
      },
    });
    return lessons;
  }
}

export async function getBookingsFromStudent(studentId: number) {
  if (typeof window !== "undefined") {
    const bookings: Bookings[] = await fetch(
      `/api/bookings/students/${studentId}`,
    ).then((res) => res.json());
    return bookings;
  } else {
    const bookingsData = await db.query.bookingsStudents.findMany({
      where: eq(bookingsStudents.studentId, studentId),
      with: {
        booking: true,
      },
    });
    return bookingsData.map((b) => b.booking);
  }
}

export type BookingsFromTeacher = (Bookings & {
  teacher: Teachers & {
    sport: Sports;
  };
  students: (BookingsStudents & {
    student: Students & {
      user: Users;
      plan: Plans & {
        sport: Sports;
      };
    };
  })[];
})[];
export async function getBookingsFromTeacher() {
  if (typeof window !== "undefined") {
    const bookings: BookingsFromTeacher = await fetch(`/api/bookings`).then(
      (res) => res.json(),
    );
    return bookings;
  } else {
    const session = auth();
    const teacherId = session.userId;
    const user = await db.query.users.findFirst({
      where: eq(users.externalId, teacherId!),
      with: {
        teacher: true,
      },
    });
    if (!user) return null;
    const bookingsData = await db.query.bookings.findMany({
      where: eq(bookings.teacherId, user.teacher.id),
      with: {
        teacher: {
          with: {
            sport: true,
          },
        },
        students: {
          with: {
            student: {
              with: {
                plan: {
                  with: {
                    sport: true,
                  },
                },
                user: true,
              },
            },
          },
        },
      },
    });
    return bookingsData;
  }
}

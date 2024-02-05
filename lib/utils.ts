import {
  Plans,
  Sports,
  Students,
  TeacherPaymentMethods,
  Teachers,
  Users,
} from "@/db/schema";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMessageWhatsapp(
  message: string,
  teacher: Users & {
    teacher: Teachers & { paymentMethods: TeacherPaymentMethods[] };
  },
  student: Students & { user: Users; plan: Plans & { sport: Sports } },
  data?: any,
) {
  // search for params in message and replace them with the correct value
  // params are like: {{name}}
  const params = message.match(/{{\w+}}/g);
  if (params) {
    params.forEach((param) => {
      const paramName = param.replace(/{{|}}/g, "");
      switch (paramName) {
        case "bookingAppointments":
          message = message.replace(
            param,
            data?.appointments
              .map(
                (appointment: {
                  date: string;
                  startTime: string;
                  endTime: string;
                }) =>
                  `${new Date(appointment.date).toLocaleDateString("pt-BR")} ${
                    appointment.startTime
                  } - ${appointment.endTime}`,
              )
              .join("\n"),
          );
        case "bookingDate":
          message = message.replace(
            param,
            new Date(data?.date).toLocaleDateString("pt-BR"),
          );
          break;
        case "bookingStudents":
          message = message.replace(
            param,
            data?.students.map((s: { name: string }) => s.name).join(","),
          );
          break;
        case "bookingStartTime":
          message = message.replace(param, data?.startTime);
          break;
        case "bookingEndTime":
          message = message.replace(param, data?.endTime);
          break;
        case "studentName":
          message = message.replace(param, student.user.fullName);
          break;
        case "teacherName":
          message = message.replace(param, teacher.fullName);
          break;
        case "teacherPhone":
          message = message.replace(param, teacher.phone);
          break;
        case "planName":
          message = message.replace(param, student?.plan.name || "");
          break;
        case "planPrice":
          message = message.replace(
            param,
            student?.plan.price.toString() || "",
          );
          break;
        case "planDuration":
          message = message.replace(
            param,
            student?.plan.duration.toString() + " min" || "",
          );
          break;
        case "planSport":
          message = message.replace(param, student?.plan.sport.name || "");
          break;
        case "planDescription":
          message = message.replace(param, student?.plan.description || "");
          break;
        case "planLessonsPerWeek":
          message = message.replace(
            param,
            student?.plan.lessonsPerWeek.toString() || "",
          );
          break;
        case "planNumberOfLessons":
          message = message.replace(
            param,
            student?.plan.numberOfLessons.toString() || "",
          );
          break;
        case "paymentMethod":
          message = message.replace(
            param,
            teacher.teacher.paymentMethods.find(
              (p) => p.active && p.paymentMethod === "PIX",
            )?.paymentMethod || "",
          );
          break;
        case "paymentType":
          message = message.replace(
            param,
            teacher.teacher.paymentMethods.find(
              (p) => p.active && p.paymentMethod === "PIX",
            )?.paymentType || "",
          );
          break;
        case "paymentDetails":
          message = message.replace(
            param,
            `PIX: ${
              teacher.teacher.paymentMethods.find(
                (p) => p.active && p.paymentMethod === "PIX",
              )?.paymentDetails || ""
            } - Valor: R$ ${student.plan.price.toFixed(2)}`,
          );
          break;
        default:
          break;
      }
    });
  }
  message = message.split("\\n").join("\n");
  return message;
}

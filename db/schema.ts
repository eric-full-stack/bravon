import { InferModel } from "drizzle-orm";
import {
  boolean,
  date,
  float,
  int,
  mysqlEnum,
  mysqlTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  externalId: varchar("external_id", { length: 256 }),
  fullName: text("full_name").notNull(),
  phone: varchar("phone", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const userRoles = mysqlTable("user_roles", {
  id: serial("id").primaryKey(),
  userId: int("user_id").notNull(),
  role: mysqlEnum("role", ["admin", "teacher", "student"]),
});

export const sports = mysqlTable("sports", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  color: varchar("color", { length: 256 }).notNull().default("#000000"),
});

export const plans = mysqlTable("plans", {
  id: serial("id").primaryKey(),
  teacherId: int("teacher_id").notNull(),
  sportId: int("sport_id").notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  description: text("description").notNull(),
  price: float("price").notNull(),
  duration: int("duration").notNull(),
  numberOfLessons: int("number_of_lessons").notNull(),
  lessonsPerWeek: int("lessons_per_week").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const teachers = mysqlTable("teachers", {
  id: serial("id").primaryKey(),
  userId: int("user_id").notNull(),
  sportId: int("sport_id").notNull(),
  rating: float("rating").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const students = mysqlTable("students", {
  id: serial("id").primaryKey(),
  userId: int("user_id").notNull(),
  planId: int("plan_id").notNull(),
  status: mysqlEnum("status", ["active", "inactive", "pending"])
    .notNull()
    .default("pending"),
  rating: float("rating").notNull().default(5),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const bookings = mysqlTable("bookings", {
  id: serial("id").primaryKey(),
  date: date("date").notNull(),
  teacherId: int("teacher_id").notNull(),
  startTime: varchar("start_time", { length: 256 }).notNull(),
  endTime: varchar("end_time", { length: 256 }).notNull(),
  isAutoBooking: boolean("is_auto_booking").notNull().default(false),
  status: mysqlEnum("status", ["pending", "approved", "rejected"]),
});

export const bookingsStudents = mysqlTable("bookings_students", {
  id: serial("id").primaryKey(),
  bookingId: int("booking_id").notNull(),
  studentId: int("student_id").notNull(),
  status: mysqlEnum("status", ["pending", "approved", "rejected"]).default(
    "pending",
  ),
  notificationSentAt: timestamp("notification_sent_at"),
});

export const whatsappNotifications = mysqlTable("whatsapp_notifications", {
  id: serial("id").primaryKey(),
  description: text("description").notNull(),
  type: mysqlEnum("type", [
    "all_bookings_from_student",
    "booking_appointment",
    "payment_plan_remainder",
    "welcome_message",
    "booking_appointment_deleted",
    "new_feedback",
    "lesson_confirmed_teacher",
  ]).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const whatsappNotificationsStudents = mysqlTable(
  "whatsapp_notifications_students",
  {
    id: serial("id").primaryKey(),
    whatsappNotificationId: int("whatsapp_notification_id").notNull(),
    studentId: int("student_id").notNull(),
    bookingId: int("booking_id"),
    status: mysqlEnum("status", [
      "accepted",
      "queued",
      "sending",
      "sent",
      "failed",
      "delivered",
      "undelivered",
      "receiving",
      "received",
      "read",
    ]).default("queued"),
    twilioId: varchar("twilio_id", { length: 256 }),
    payload: text("payload"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
);

export const whatsAppReplies = mysqlTable("whatsapp_replies", {
  id: serial("id").primaryKey(),
  twilioId: varchar("twilio_id", { length: 256 }).notNull(),
  body: text("body").notNull(),
  from: varchar("from", { length: 256 }).notNull(),
  originalRepliedMessageId: varchar("original_replied_message_id", {
    length: 256,
  }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const teacherPaymentMethods = mysqlTable("teacher_payment_methods", {
  id: serial("id").primaryKey(),
  paymentMethod: varchar("payment_method", { length: 256 })
    .notNull()
    .default("PIX"),
  paymentType: varchar("payment_type", { length: 256 }),
  paymentDetails: varchar("payment_details", { length: 256 }),
  active: boolean("active").notNull().default(true),
  teacherId: int("teacher_id").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const lessonFeedbacks = mysqlTable("lesson_feedbacks", {
  id: serial("id").primaryKey(),
  studentId: int("student_id").notNull(),
  teacherId: int("teacher_id").notNull(),
  bookingId: int("booking_id").notNull(),
  rating: float("rating").notNull(),
  comment: text("comment").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type Users = InferModel<typeof users>;
export type UserRoles = InferModel<typeof userRoles>;
export type Sports = InferModel<typeof sports>;
export type Plans = InferModel<typeof plans>;
export type Teachers = InferModel<typeof teachers>;
export type Students = InferModel<typeof students>;
export type Bookings = InferModel<typeof bookings>;
export type BookingsStudents = InferModel<typeof bookingsStudents>;
export type WhatsappNotifications = InferModel<typeof whatsappNotifications>;
export type WhatsappNotificationsStudents = InferModel<
  typeof whatsappNotificationsStudents
>;
export type TeacherPaymentMethods = InferModel<typeof teacherPaymentMethods>;
export type LessonFeedbacks = InferModel<typeof lessonFeedbacks>;
export type WhatsAppReplies = InferModel<typeof whatsAppReplies>;

export const insertUsersSchema = createInsertSchema(users, {
  email: z.string().email().nullish(),
});
export const selectUsersSchema = createSelectSchema(users);

export const insertUserRolesSchema = createInsertSchema(userRoles);
export const selectUserRolesSchema = createSelectSchema(userRoles);

export const insertSportsSchema = createInsertSchema(sports);
export const selectSportsSchema = createSelectSchema(sports);

export const insertPlansSchema = createInsertSchema(plans, {
  teacherId: z.number().nullish(),
});
export const selectPlansSchema = createSelectSchema(plans);

export const insertTeachersSchema = createInsertSchema(teachers);
export const selectTeachersSchema = createSelectSchema(teachers);

export const insertStudentsSchema = createInsertSchema(students, {
  userId: z.number().nullish(),
});
export const selectStudentsSchema = createSelectSchema(students);

export const insertBookingsSchema = createInsertSchema(bookings);
export const selectBookingsSchema = createSelectSchema(bookings);

export const insertBookingsStudentsSchema =
  createInsertSchema(bookingsStudents);
export const selectBookingsStudentsSchema =
  createSelectSchema(bookingsStudents);

export const insertWhatsappNotificationsSchema = createInsertSchema(
  whatsappNotifications,
  {
    createdAt: z.date().nullish(),
    updatedAt: z.date().nullish(),
  },
);
export const selectWhatsappNotificationsSchema = createSelectSchema(
  whatsappNotifications,
);

export const insertWhatsappNotificationsStudentsSchema = createInsertSchema(
  whatsappNotificationsStudents,
);
export const selectWhatsappNotificationsStudentsSchema = createSelectSchema(
  whatsappNotificationsStudents,
);

export const insertTeacherPaymentMethodsSchema = createInsertSchema(
  teacherPaymentMethods,
  {
    teacherId: z.number().nullish(),
  },
);
export const selectTeacherPaymentMethodsSchema = createSelectSchema(
  teacherPaymentMethods,
);

export const insertLessonFeedbacksSchema = createInsertSchema(lessonFeedbacks, {
  teacherId: z.number().nullish(),
});
export const selectLessonFeedbacksSchema = createSelectSchema(lessonFeedbacks);

import { relations } from "drizzle-orm";
import {
  teachers,
  users,
  sports,
  bookings,
  students,
  plans,
  bookingsStudents,
  userRoles,
  whatsappNotificationsStudents,
  whatsappNotifications,
  teacherPaymentMethods,
  lessonFeedbacks,
} from "./schema";

export const teachersRelations = relations(teachers, ({ one, many }) => ({
  user: one(users, {
    fields: [teachers.userId],
    references: [users.id],
  }),
  sport: one(sports, {
    fields: [teachers.sportId],
    references: [sports.id],
  }),
  bookings: many(bookings),
  plans: many(plans),
  notifications: many(whatsappNotifications),
  paymentMethods: many(teacherPaymentMethods),
  feedbacks: many(lessonFeedbacks),
}));

export const lessonFeedbacksRelations = relations(
  lessonFeedbacks,
  ({ one }) => ({
    teacher: one(teachers, {
      fields: [lessonFeedbacks.teacherId],
      references: [teachers.id],
    }),
    student: one(students, {
      fields: [lessonFeedbacks.studentId],
      references: [students.id],
    }),
    booking: one(bookings, {
      fields: [lessonFeedbacks.bookingId],
      references: [bookings.id],
    }),
  }),
);

export const teacherPaymentMethodsRelations = relations(
  teacherPaymentMethods,
  ({ one }) => ({
    teacher: one(teachers, {
      fields: [teacherPaymentMethods.teacherId],
      references: [teachers.id],
    }),
  }),
);

export const studentsRelations = relations(students, ({ one, many }) => ({
  user: one(users, {
    fields: [students.userId],
    references: [users.id],
  }),
  plan: one(plans, {
    fields: [students.planId],
    references: [plans.id],
  }),
  bookings: many(bookingsStudents),
  notifications: many(whatsappNotificationsStudents),
  feedbacks: many(lessonFeedbacks),
}));

export const usersRelations = relations(users, ({ one, many }) => ({
  roles: one(userRoles, {
    fields: [users.id],
    references: [userRoles.userId],
  }),
  student: one(students, {
    fields: [users.id],
    references: [students.userId],
  }),
  teacher: one(teachers, {
    fields: [users.id],
    references: [teachers.userId],
  }),
}));

export const bookingsRelations = relations(bookings, ({ one, many }) => ({
  students: many(bookingsStudents),
  teacher: one(teachers, {
    fields: [bookings.teacherId],
    references: [teachers.id],
  }),
  feedbacks: many(lessonFeedbacks),
}));

export const bookingsStudentsRelations = relations(
  bookingsStudents,
  ({ one }) => ({
    booking: one(bookings, {
      fields: [bookingsStudents.bookingId],
      references: [bookings.id],
    }),
    student: one(students, {
      fields: [bookingsStudents.studentId],
      references: [students.id],
    }),
  }),
);

export const sportsRelations = relations(sports, ({ many }) => ({
  plans: many(plans),
  teachers: many(teachers),
}));

export const plansRelations = relations(plans, ({ one, many }) => ({
  students: many(students),
  sport: one(sports, {
    fields: [plans.sportId],
    references: [sports.id],
  }),
  teacher: one(teachers, {
    fields: [plans.teacherId],
    references: [teachers.id],
  }),
}));

export const whatsappNotificationsStudentsRelations = relations(
  whatsappNotificationsStudents,
  ({ one }) => ({
    student: one(students, {
      fields: [whatsappNotificationsStudents.studentId],
      references: [students.id],
    }),
    notification: one(whatsappNotifications, {
      fields: [whatsappNotificationsStudents.whatsappNotificationId],
      references: [whatsappNotifications.id],
    }),
  }),
);

export const whatsappNotificationsRelations = relations(
  whatsappNotifications,
  ({ many }) => ({
    students: many(whatsappNotificationsStudents),
  }),
);

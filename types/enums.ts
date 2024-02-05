export const MessageTypes: {
  all_bookings_from_student: "all_bookings_from_student";
  booking_appointment: "booking_appointment";
  payment_plan_remainder: "payment_plan_remainder";
  welcome_message: "welcome_message";
  booking_appointment_deleted: "booking_appointment_deleted";
  new_feedback: "new_feedback";
  lesson_confirmed_teacher: "lesson_confirmed_teacher";
} = {
  all_bookings_from_student: "all_bookings_from_student",
  booking_appointment: "booking_appointment",
  payment_plan_remainder: "payment_plan_remainder",
  welcome_message: "welcome_message",
  booking_appointment_deleted: "booking_appointment_deleted",
  new_feedback: "new_feedback",
  lesson_confirmed_teacher: "lesson_confirmed_teacher",
};
export type MessageTypes = (typeof MessageTypes)[keyof typeof MessageTypes];

export const VariableMessageTypes: {
  feedback: "feedback";
  bookingDate: "bookingDate";
  bookingStartTime: "bookingStartTime";
  bookingEndTime: "bookingEndTime";
  studentName: "studentName";
  planName: "planName";
  planPrice: "planPrice";
  planDuration: "planDuration";
  planSport: "planSport";
  planDescription: "planDescription";
  planLessonsPerWeek: "planLessonsPerWeek";
  teacherName: "teacherName";
  paymentMethod: "paymentMethod";
  paymentType: "paymentType";
  paymentDetails: "paymentDetails";
  bookingStudents: "bookingStudents";
} = {
  feedback: "feedback",
  bookingDate: "bookingDate",
  bookingStartTime: "bookingStartTime",
  bookingEndTime: "bookingEndTime",
  studentName: "studentName",
  planName: "planName",
  planPrice: "planPrice",
  planDuration: "planDuration",
  planSport: "planSport",
  planDescription: "planDescription",
  planLessonsPerWeek: "planLessonsPerWeek",
  teacherName: "teacherName",
  paymentMethod: "paymentMethod",
  paymentType: "paymentType",
  paymentDetails: "paymentDetails",
  bookingStudents: "bookingStudents",
};
export type VariableMessageTypes =
  (typeof VariableMessageTypes)[keyof typeof VariableMessageTypes];

export const TypesTitleMap: {
  feedback: "Feedback";
  bookingDate: "Data da aula";
  bookingStartTime: "Horário de início";
  bookingEndTime: "Horário de término";
  studentName: "Nome do aluno";
  planName: "Nome do plano";
  planPrice: "Preço do plano";
  planDuration: "Duração do plano";
  planSport: "Esporte do plano";
  planDescription: "Descrição do plano";
  planLessonsPerWeek: "Aulas por semana";
  teacherName: "Nome do professor";
  paymentMethod: "Método de pagamento";
  paymentType: "Tipo de pagamento";
  paymentDetails: "Detalhes do pagamento";
} = {
  feedback: "Feedback",
  bookingDate: "Data da aula",
  bookingStartTime: "Horário de início",
  bookingEndTime: "Horário de término",
  studentName: "Nome do aluno",
  planName: "Nome do plano",
  planPrice: "Preço do plano",
  planDuration: "Duração do plano",
  planSport: "Esporte do plano",
  planDescription: "Descrição do plano",
  planLessonsPerWeek: "Aulas por semana",
  teacherName: "Nome do professor",
  paymentMethod: "Método de pagamento",
  paymentType: "Tipo de pagamento",
  paymentDetails: "Detalhes do pagamento",
};
export type TypesTitleMap = (typeof TypesTitleMap)[keyof typeof TypesTitleMap];

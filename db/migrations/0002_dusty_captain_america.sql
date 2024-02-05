ALTER TABLE `bookings_students` DROP FOREIGN KEY `bookings_students_booking_id_bookings_id_fk`;
--> statement-breakpoint
ALTER TABLE `bookings_students` DROP FOREIGN KEY `bookings_students_student_id_students_id_fk`;
--> statement-breakpoint
ALTER TABLE `plans` DROP FOREIGN KEY `plans_user_id_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `plans` DROP FOREIGN KEY `plans_sport_id_sports_id_fk`;
--> statement-breakpoint
ALTER TABLE `students` DROP FOREIGN KEY `students_user_id_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `students` DROP FOREIGN KEY `students_plan_id_plans_id_fk`;
--> statement-breakpoint
ALTER TABLE `teachers` DROP FOREIGN KEY `teachers_user_id_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `teachers` DROP FOREIGN KEY `teachers_sport_id_sports_id_fk`;
--> statement-breakpoint
ALTER TABLE `user_roles` DROP FOREIGN KEY `user_roles_user_id_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `bookings` ADD `teacher_id` int;
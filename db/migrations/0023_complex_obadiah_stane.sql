CREATE TABLE `lesson_feedbacks` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`student_id` int NOT NULL,
	`teacher_id` int NOT NULL,
	`booking_id` int NOT NULL,
	`rating` float NOT NULL,
	`comment` text NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()));

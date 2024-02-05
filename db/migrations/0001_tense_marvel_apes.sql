CREATE TABLE `bookings` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`date` varchar(256),
	`start_time` varchar(256),
	`end_time` varchar(256),
	`status` enum('pending','approved','rejected'));
--> statement-breakpoint
CREATE TABLE `bookings_students` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`booking_id` int,
	`student_id` int);
--> statement-breakpoint
CREATE TABLE `plans` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`user_id` int,
	`sport_id` int,
	`name` varchar(256),
	`description` text,
	`price` float,
	`duration` int);
--> statement-breakpoint
CREATE TABLE `sports` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name` varchar(256));
--> statement-breakpoint
CREATE TABLE `students` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`user_id` int,
	`plan_id` int,
	`rating` float);
--> statement-breakpoint
CREATE TABLE `teachers` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`user_id` int,
	`sport_id` int,
	`rating` float);
--> statement-breakpoint
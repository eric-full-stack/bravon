CREATE TABLE `user_roles` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`user_id` int,
	`role` enum('admin','teacher','student'));
--> statement-breakpoint
CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`full_name` text,
	`phone` varchar(256),
	`email` varchar(256));
--> statement-breakpoint
 
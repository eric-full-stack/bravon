CREATE TABLE `whatsapp_replies` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`twilio_id` varchar(256) NOT NULL,
	`body` text NOT NULL,
	`from` varchar(256) NOT NULL,
	`original_replied_message_id` varchar(256),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()));
--> statement-breakpoint
ALTER TABLE `bookings_students` ADD `status` enum('pending','approved','rejected') DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE `students` ADD `status` enum('active','inactive','pending') DEFAULT 'pending' NOT NULL;
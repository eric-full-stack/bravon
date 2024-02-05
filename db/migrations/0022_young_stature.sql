CREATE TABLE `teacher_payment_methods` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`payment_method` varchar(256) NOT NULL DEFAULT 'PIX',
	`payment_type` varchar(256),
	`payment_details` varchar(256),
	`active` boolean NOT NULL DEFAULT true,
	`teacher_id` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP);
--> statement-breakpoint
ALTER TABLE `whatsapp_notifications_students` MODIFY COLUMN `status` enum('accepted','queued','sending','sent','failed','delivered','undelivered','receiving','received','read') DEFAULT 'queued';--> statement-breakpoint
ALTER TABLE `whatsapp_notifications_students` ADD `twilio_id` varchar(256);--> statement-breakpoint
ALTER TABLE `whatsapp_notifications_students` ADD `payload` text;
ALTER TABLE `whatsapp_notifications_students` ADD `status` enum('pending','approved') DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE `whatsapp_notifications` DROP COLUMN `status`;
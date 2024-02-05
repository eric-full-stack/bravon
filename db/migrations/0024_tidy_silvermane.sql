ALTER TABLE `bookings` MODIFY COLUMN `date` date NOT NULL;--> statement-breakpoint
ALTER TABLE `bookings` ADD `is_auto_booking` boolean DEFAULT false NOT NULL;
CREATE TABLE `whatsapp_notifications` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`teacher_id` int NOT NULL,
	`title` varchar(256) NOT NULL,
	`description` text NOT NULL,
	`type` enum('newUser','newBooking','bookingUpdated','newPlan','planUpdated','newPayment','lessonReminder','newFeedback') NOT NULL,
	`status` enum('pending','approved') DEFAULT 'pending');
--> statement-breakpoint
CREATE TABLE `whatsapp_notifications_students` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`whatsapp_notification_id` int NOT NULL,
	`student_id` int NOT NULL);

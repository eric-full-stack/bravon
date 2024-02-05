import { CircleIcon, StarIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LessonFeedbacks, Bookings } from "@/db/schema";

export function FeedbackLessonCard({
  feedback,
}: {
  feedback: LessonFeedbacks & { booking: Bookings };
}) {
  return (
    <Card>
      <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
        <div className="space-y-1">
          <CardTitle>{feedback.createdAt.toLocaleString()}</CardTitle>
          <CardDescription>{feedback.comment}</CardDescription>
        </div>
        <div className="flex items-center space-x-1 rounded-md bg-secondary text-secondary-foreground">
          <Button variant="secondary" className="px-3 shadow-none">
            <StarIcon className="mr-2 h-4 w-4" />
            {feedback.rating}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <CircleIcon className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
            {feedback.booking.status}
          </div>
          <div>{feedback.booking.date.toLocaleString()}</div>
        </div>
      </CardContent>
    </Card>
  );
}

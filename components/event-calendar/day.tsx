import { BookingsFromTeacher } from "@/lib/api";
import { cn } from "@/lib/utils";
import { format, isToday } from "date-fns";
import { Button } from "../ui/button";

interface Props {
  day: Date;
  className?: string;
  events?: BookingsFromTeacher;
  setSelectedDate?: (date: Date) => void;
}

export default function Day({
  day,
  className,
  events,
  setSelectedDate,
}: Props) {
  return (
    <div
      className={cn(
        "h-32 border p-2",
        isToday(day) ? "border-2 border-black bg-gray-50" : "",
      )}
    >
      <div className="flex flex-row items-center justify-between">
        <div className={cn("text-sm font-medium", className)}>
          {format(day, "d")}
        </div>
        {events && events.length > 0 && setSelectedDate ? (
          <Button
            className="h-3 px-1 text-xs font-light underline"
            variant="ghost"
            onClick={() => setSelectedDate(day)}
          >
            Mostrar tudo
          </Button>
        ) : null}
      </div>
      <div className="flex flex-col gap-1 space-y-0">
        {events?.map((event) => (
          <div key={event.id} className="flex flex-row items-center ">
            <div className="flex flex-1 items-center gap-1 text-xs font-medium">
              <div
                className={`h-4 w-4 bg-${
                  event.students[0]?.student?.plan?.sport.color || "gray-500"
                }`}
              ></div>
              {event.students[0]?.student?.user?.fullName.split(" ")[0] ||
                "Aluno deletado"}
              {event.students.length > 1
                ? ` +${event.students.length - 1}`
                : ""}
              <div
                className={`h-3 w-3 bg-${
                  event.status === "pending" ? "yellow-500" : "green-500"
                } animate-pulse rounded-full`}
              ></div>
            </div>
            <div className="mr-1 text-xs font-light">{event.startTime}</div>
          </div>
        ))}
        {events && events.length > 4 ? (
          <div className="">
            <div className="text-xs font-medium">{events?.length - 4} mais</div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

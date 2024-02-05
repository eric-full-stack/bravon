import { ArrowRight } from "lucide-react";
import CalendarToolbar from "./toolbar";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { BookingsFromTeacher } from "@/lib/api";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

interface Props {
  events: BookingsFromTeacher;
}

const statusMap = {
  approved: "Confirmado",
  rejected: "Cancelado",
  pending: "Pendente",
};

const statusColorMap = {
  approved: "green-500",
  rejected: "red-500",
  pending: "yellow-500",
};

export default function CalendarDayView({ events }: Props) {
  return (
    <div className="flex w-full flex-col gap-4">
      <CalendarToolbar />

      <div className="w-full">
        <div className="flex w-full flex-row">
          <div className="flex w-full flex-row gap-4">
            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {events
                .sort((a, b) => (a.startTime > b.startTime ? 1 : -1))
                .map((event) => (
                  <div
                    key={event.id}
                    className={cn(
                      "min-h-24 flex max-h-32 w-full flex-col border p-2",
                    )}
                  >
                    <div className="flex flex-row items-center justify-between">
                      <div className="flex flex-row items-center gap-2">
                        <Badge
                          className={`bg-${
                            statusColorMap[event.status || "pending"]
                          }`}
                        >
                          {statusMap[event.status || "pending"]}
                        </Badge>
                      </div>
                      <div className="flex flex-row items-center ">
                        <div className="text-md flex items-center font-medium ">
                          {event.startTime}
                          <ArrowRight size={16} />
                        </div>
                        <div className="text-md font-medium">
                          {event.endTime}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-between gap-2">
                      <div className="flex flex-row items-center gap-2">
                        {event.students.map((user, id) => (
                          <React.Fragment key={user.id}>
                            <div
                              className={`text-sm font-semibold text-${
                                statusColorMap[user.status || "pending"]
                              }`}
                            >
                              {user.student.user.fullName}
                            </div>
                            {id === event.students.length - 1 ? null : (
                              <Separator orientation="vertical" />
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                      <div className="">
                        <div className="flex flex-row items-center gap-2 text-sm font-light">
                          <div
                            className={`h-4 w-4 bg-${event.teacher.sport.color}`}
                          ></div>
                          {event.teacher.sport.name}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

              {!events.length && (
                <div className="flex h-full w-full flex-col items-center justify-center">
                  <div className="text-xl font-medium">Nenhum evento</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

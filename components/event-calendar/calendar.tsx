"use client";

import { BookingsFromTeacher, getBookingsFromTeacher } from "@/lib/api";
import {
  addDays,
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isSameDay,
  lastDayOfMonth,
  parseISO,
  startOfMonth,
  subDays,
  subMonths,
} from "date-fns";
import React, { useCallback } from "react";
import Day from "./day";
import CalendarToolbar from "./toolbar";
import CalendarDayView from "./day-view";
import { useCalendar } from "./context";
import { useQuery } from "react-query";
import { useAuth } from "@clerk/nextjs";
import Loading from "../loading";
import { zonedTimeToUtc } from "date-fns-tz";

const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

function Calendar() {
  const user = useAuth();
  const {
    data: events,
    isFetching,
    isLoading,
  } = useQuery(["bookings-from-teacher", user.userId], getBookingsFromTeacher);

  const { view, setView, selectedDate, setSelectedDate } = useCalendar();
  const start = startOfMonth(selectedDate);
  const end = endOfMonth(selectedDate);
  const days = eachDayOfInterval({ start, end });
  const firstDayOfWeek = getDay(start);
  const lastDayOfWeek = getDay(end);

  const lastDayOfPreviousMonth = lastDayOfMonth(subMonths(selectedDate, 1));
  const daysOfPreviousMonth = eachDayOfInterval({
    start: subDays(
      lastDayOfPreviousMonth,
      firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1,
    ),
    end: lastDayOfPreviousMonth,
  });

  const firstDayOfNextMonth = startOfMonth(addMonths(selectedDate, 1));
  const daysOfNextMonth = eachDayOfInterval({
    start: firstDayOfNextMonth,
    end: addDays(
      firstDayOfNextMonth,
      5 - (lastDayOfWeek === 6 ? -1 : lastDayOfWeek),
    ),
  });

  const getEvents = useCallback(
    (day: Date) => {
      return events?.filter((event) => {
        const dateTimezone = zonedTimeToUtc(
          parseISO(event.date.toString().split("T")[0]),
          "America/Sao_Paulo",
        );
        return isSameDay(day, dateTimezone);
      });
    },
    [events],
  );

  if (selectedDate && view === "day") {
    return <CalendarDayView events={getEvents(selectedDate) || []} />;
  }

  if (isLoading || isFetching) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-4">
      <CalendarToolbar />
      <div className="overflow-x-auto">
        <div className="grid min-w-[1000px] grid-cols-7">
          {daysOfWeek.map((day) => (
            <div key={day.toLocaleString()} className="font-bold">
              {day}
            </div>
          ))}
          {daysOfPreviousMonth.map((day) => (
            <Day
              key={day.toLocaleString()}
              day={day}
              className="font-light text-gray-300"
            />
          ))}
          {days.map((day) => (
            <Day
              key={day.toLocaleString()}
              day={day}
              events={getEvents(day)}
              setSelectedDate={(date) => {
                setSelectedDate(date);
                setView("day");
              }}
            />
          ))}
          {daysOfNextMonth.map((day) => (
            <Day
              key={day.toLocaleString()}
              day={day}
              className="font-light text-gray-300"
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 sm:flex-row">
        <span className="">Legenda de cores:</span>
        <div className="flex flex-row items-center gap-2">
          <div className="h-4 w-4 bg-red-500"></div>
          <span>Tênis</span>
          <div className="h-4 w-4 bg-sky-500"></div>
          <span>Padel</span>
          <div className="h-4 w-4 bg-amber-500"></div>
          <span>Beach Tênis</span>
        </div>
      </div>
    </div>
  );
}

export default Calendar;

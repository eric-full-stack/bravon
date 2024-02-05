"use client";

import useScreenSize from "@/hooks/use-screen-size";
import React, { createContext, useState, ReactNode } from "react";

type CalendarContextValue = {
  selectedDate: Date;
  setSelectedDate: (day: Date) => void;
  view: "month" | "week" | "day";
  setView: (view: "month" | "week" | "day") => void;
};

export const CalendarContext = createContext<CalendarContextValue | undefined>(
  undefined,
);

type CalendarProviderProps = {
  children: ReactNode;
};

export function CalendarProvider({ children }: CalendarProviderProps) {
  const { isMobile } = useScreenSize();
  const [view, setView] = useState<"month" | "week" | "day">(
    isMobile ? "day" : "month",
  );
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const value = {
    selectedDate,
    setSelectedDate,
    view,
    setView,
  };

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendar() {
  const context = React.useContext(CalendarContext);
  if (context === undefined) {
    throw new Error("useCalendar must be used within a CalendarProvider");
  }
  return context;
}

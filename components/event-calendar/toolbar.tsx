import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  addDays,
  addMonths,
  addWeeks,
  subDays,
  subMonths,
  subWeeks,
} from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useCalendar } from "./context";
import { CalendarDatePicker } from "../calendar-date-picker";

export default function CalendarToolbar() {
  const { selectedDate, setSelectedDate, view, setView } = useCalendar();

  function handleChangeDate(type: "add" | "sub") {
    if (view === "month") {
      if (type === "add") setSelectedDate(addMonths(selectedDate, 1));
      else setSelectedDate(subMonths(selectedDate, 1));
    } else if (view === "week") {
      if (type === "add") setSelectedDate(addWeeks(selectedDate, 1));
      else setSelectedDate(subWeeks(selectedDate, 1));
    } else {
      if (type === "add") setSelectedDate(addDays(selectedDate, 1));
      else setSelectedDate(subDays(selectedDate, 1));
    }
  }
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex w-full flex-row items-center justify-between">
        <div className="flex flex-row">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleChangeDate("sub")}
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleChangeDate("add")}
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
        <div className=" hidden flex-row items-center gap-1 md:flex">
          <Button
            variant={view === "month" ? "outline" : "ghost"}
            onClick={() => setView("month")}
          >
            Mês
          </Button>
          <Button
            variant={view === "day" ? "outline" : "ghost"}
            onClick={() => setView("day")}
          >
            Dia
          </Button>
        </div>
        <div className="flex flex-row items-center gap-1 md:hidden">
          <Select
            value={view}
            onValueChange={(value: "month" | "week" | "day") => setView(value)}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Mês" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Mês</SelectItem>
              <SelectItem value="day">Dia</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="p-2">
        <p className="text-md font-semibold hover:cursor-pointer hover:underline sm:text-lg">
          <CalendarDatePicker
            setSelectedDate={setSelectedDate}
            selectedDate={selectedDate}
          />
        </p>
      </div>
    </div>
  );
}

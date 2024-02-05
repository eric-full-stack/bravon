import { format, addMinutes, addDays } from "date-fns";
import { Trash2, Plus } from "lucide-react";
import React from "react";
import { CalendarDatePicker } from "../calendar-date-picker";
import { FormData } from "./booking-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type Props = {
  formData: FormData;
  setFormData: (formData: FormData) => void;
};

export default function AppointmentsList({ formData, setFormData }: Props) {
  return (
    <>
      {formData?.dates.map((appointment, key) => (
        <div
          key={appointment.date.toLocaleDateString()}
          className="flex flex-col gap-2"
        >
          <div className="flex flex-row items-center gap-4">
            <div className="w-full">
              <Label htmlFor="startTime">Hora início</Label>
              <Input
                id="startTime"
                type="time"
                name="startTime"
                defaultValue={appointment?.startTime || "15:00"}
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    dates: formData.dates.map((date, index) => {
                      if (index === key) {
                        return {
                          ...date,
                          startTime: event.target.value,
                          endTime: String(
                            format(
                              addMinutes(
                                new Date(
                                  new Date().toDateString() +
                                    " " +
                                    event.target.value,
                                ),
                                formData.students?.length > 0
                                  ? formData.students[0].plan.duration
                                  : 60,
                              ).getTime(),
                              "HH:mm",
                            ),
                          ),
                        };
                      }
                      return date;
                    }),
                  });
                }}
              />
            </div>
            <div className="w-full">
              <Label htmlFor="endTime">Hora fim</Label>
              <Input
                id="endTime"
                type="time"
                name="endTime"
                defaultValue={appointment?.endTime || "16:00"}
                value={appointment?.endTime || "16:00"}
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    dates: formData.dates.map((date, index) => {
                      if (index === key) {
                        return {
                          ...date,
                          endTime: event.target.value,
                        };
                      }
                      return date;
                    }),
                  });
                }}
              />
            </div>
          </div>
          <div className="flex w-full flex-row items-center justify-between gap-2">
            <React.Fragment>
              <CalendarDatePicker
                selectedDate={appointment.date || new Date()}
                setSelectedDate={(day) => {
                  if (day === undefined) return;
                  setFormData({
                    ...formData,
                    dates: formData?.dates.map((d, index) => {
                      if (index === key) {
                        return {
                          ...d,
                          date: day,
                        };
                      }
                      return d;
                    }),
                  });
                }}
              />
              <div className="flex gap-1">
                {formData?.isAutoBooking && key >= 0 && (
                  <Button
                    variant="outline"
                    size="icon"
                    type="button"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        dates: formData?.dates.filter((d, index) => {
                          return index !== key;
                        }),
                      });
                    }}
                  >
                    <Trash2 size={15} />
                  </Button>
                )}
                {formData?.isAutoBooking &&
                  key === formData?.dates.length - 1 && (
                    <Button
                      variant="outline"
                      size="icon"
                      type="button"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          dates: [
                            ...formData?.dates,
                            {
                              date: addDays(
                                formData?.dates[formData?.dates.length - 1]
                                  .date,
                                7,
                              ),
                              startTime:
                                formData?.dates[formData?.dates.length - 1]
                                  .startTime,
                              endTime:
                                formData?.dates[formData?.dates.length - 1]
                                  .endTime,
                            },
                          ],
                        });
                      }}
                    >
                      <Plus size={15} />
                    </Button>
                  )}
              </div>
            </React.Fragment>
          </div>
        </div>
      ))}
    </>
  );
}

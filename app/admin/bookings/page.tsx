import Calendar from "@/components/event-calendar/calendar";
import { CalendarProvider } from "@/components/event-calendar/context";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  return (
    <div className="flex-1 space-y-4 pb-12 pt-6">
      <PageHeader
        title="Minha agenda"
        subComponent={
          <div className="flex flex-row items-center gap-2">
            <Link href="/admin/bookings/create">
              <Button size="sm">
                <Plus className="h-5 w-5 sm:mr-2" />
                <p className="hidden sm:block">Nova aula</p>
              </Button>
            </Link>
          </div>
        }
      />
      <div className="py-4" />
      <CalendarProvider>
        <Calendar />
      </CalendarProvider>
    </div>
  );
}

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function RecentLessons() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col  sm:flex-row">
        <div className="flex flex-row">
          <Avatar className="h-9 w-9">
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">Olivia Martin</p>
            <p className="text-sm text-muted-foreground">24/07/2023 18:00</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col  sm:flex-row">
        <div className="flex flex-row">
          <Avatar className="h-9 w-9">
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">Lucas Pedro</p>
            <p className="text-sm text-muted-foreground">24/07/2023 18:00</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col  sm:flex-row">
        <div className="flex flex-row">
          <Avatar className="h-9 w-9">
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">Brendon Souza</p>
            <p className="text-sm text-muted-foreground">24/07/2023 18:00</p>
          </div>
        </div>
      </div>
    </div>
  );
}

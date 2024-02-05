import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface PageHeaderProps {
  title: React.ReactNode;
  subComponent?: React.ReactNode;
  backTo?: string;
}
export function PageHeader({ title, subComponent, backTo }: PageHeaderProps) {
  return (
    <div className="flex flex-col items-start gap-2">
      {backTo && (
        <Link
          href={backTo}
          className="mb-5 flex cursor-pointer flex-row items-center text-primary hover:text-zinc-600"
        >
          <ChevronLeft className="h-4 w-4" /> Voltar
        </Link>
      )}
      <div className="flex w-full flex-row items-center justify-between">
        <h1 className="text-3xl font-bold leading-tight tracking-tighter ">
          {title}
        </h1>
        {subComponent}
      </div>
    </div>
  );
}

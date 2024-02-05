import Link from "next/link";
import { Box, Plus } from "lucide-react";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "./ui/button";

interface EmptyTableProps {
  title: string;
  description: string;
  href: string;
}

export function EmptyTable({ title, description, href }: EmptyTableProps) {
  return (
    <Card className="m-24 mx-auto max-w-xl">
      <CardHeader>
        <CardTitle>
          <Box className="mb-5 rounded bg-slate-200 p-2" size={44} />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardFooter>
        <Link href={href}>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Adicionar
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

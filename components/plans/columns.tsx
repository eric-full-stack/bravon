"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { DataTableRowActions } from "@/components/data-table-row-actions";
import { PlansFromTeacher } from "@/lib/api";

export const columns: ColumnDef<PlansFromTeacher[number]>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="#" />,
    cell: ({ row }) => <div className="w-[40px]">{row.getValue("id")}</div>,
  },
  {
    id: "name",
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Plano" />
    ),
    cell: ({ row }) => {
      return <div className="w-[120px]">{row.original.name}</div>;
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Preço" />
    ),
    cell: ({ row }) => (
      <div className="w-[120px] text-right">
        R$ {row.original.price.toFixed(2)}
      </div>
    ),
  },
  {
    accessorKey: "sport.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Esporte" />
    ),
    cell: ({ row }) => (
      <div className="w-[120px]">{row.original.sport.name}</div>
    ),
  },
  {
    accessorKey: "duration",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Duração" />
    ),
    cell: ({ row }) => {
      return (
        <div className="w-[60px] text-right">
          {row.original.duration.toFixed(2)} min
        </div>
      );
    },
  },
  {
    accessorKey: "lessonsPerWeek",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Aulas / semana" />
    ),
    cell: ({ row }) => {
      return (
        <div className="w-[60px] text-right">{row.original.lessonsPerWeek}</div>
      );
    },
  },
  {
    accessorKey: "numberOfLessons",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Qtd. Aulas" />
    ),
    cell: ({ row }) => {
      return (
        <div className="w-[60px] text-right">
          {row.original.numberOfLessons}
        </div>
      );
    },
  },
  {
    accessorKey: "students",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Alunos" />
    ),
    cell: ({ row }) => {
      return (
        <div className="w-[60px] text-right">
          {row.original.students.length}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} route="plans" />,
  },
];

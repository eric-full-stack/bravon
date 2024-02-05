"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { NotificationsFromStudent } from "@/lib/api";
import { format, parseISO } from "date-fns";

export const columns: ColumnDef<NotificationsFromStudent[number]>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="#" />,
    cell: ({ row }) => <div className="w-[20px]">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Criado em" />
    ),
    cell: ({ row }) => (
      <div className="w-[140px] text-right">
        {format(
          parseISO(row.original.createdAt.toString()),
          "dd/MM/yyyy HH:mm",
        )}
      </div>
    ),
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tipo" />
    ),
    cell: ({ row }) => (
      <div className="w-[120px] ">{row.original.notification.type}</div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      return <div className="w-[60px]">{row.original.status}</div>;
    },
  },
];

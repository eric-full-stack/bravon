"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { DataTableRowActions } from "@/components/data-table-row-actions";
import { StudentsFromTeacher } from "@/lib/api";
import { format, parseISO } from "date-fns";

const statusMap = {
  active: "Ativo",
  inactive: "Inativo",
  pending: "Pendente",
};

const statusColorMap = {
  active: "green-500",
  inactive: "gray-500",
  pending: "yellow-500",
};

export const columns: ColumnDef<StudentsFromTeacher[number]>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="#" />,
    cell: ({ row }) => <div className="w-[40px]">{row.getValue("id")}</div>,
  },
  {
    id: "fullName",
    accessorKey: "user.fullName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Aluno" />
    ),
    cell: ({ row }) => {
      return <div className="w-[120px]">{row.original.user.fullName}</div>;
    },
  },
  {
    id: "sport",
    accessorKey: "plan.sport.name",
    accessorFn: (row) => row.plan.sport.name,
    filterFn: (rows, id, filterValue) => {
      const value = rows.original.plan.sport.name;
      return filterValue.includes(value);
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Esporte" />
    ),
    cell: ({ row }) => (
      <div className="flex w-[120px] items-center gap-2">
        <div className={`h-4 w-4 bg-${row.original.plan.sport.color}`}></div>
        {row.original.plan.sport.name}
      </div>
    ),
  },
  {
    accessorKey: "plan.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Plano" />
    ),
    cell: ({ row }) => (
      <div className="w-[220px]">{row.original.plan.name}</div>
    ),
  },
  {
    accessorKey: "plan.status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <div className={`w-[110px] text-${statusColorMap[row.original.status]}`}>
        {statusMap[row.original.status]}
      </div>
    ),
  },
  {
    accessorKey: "user.phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Celular" />
    ),
    cell: ({ row }) => (
      <div className="w-[120px]">{row.original.user.phone}</div>
    ),
  },
  {
    accessorKey: "lessons",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Qtd. Aulas" />
    ),
    cell: ({ row }) => {
      const bookings = row.original.bookings;
      const approvedBookings = bookings.filter(
        (b) => b.booking.status === "approved",
      );
      return (
        <div className="w-[30px] text-right">
          {approvedBookings.length || 0}
        </div>
      );
    },
  },
  {
    accessorKey: "lastLesson",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Última aula" />
    ),
    cell: ({ row }) => {
      const bookings = row.original.bookings;
      const approvedBookings = bookings.filter(
        (b) => b.booking.status === "approved",
      );
      const lastBooking = approvedBookings.pop();
      return (
        <div className="w-[100px] text-right">
          {lastBooking?.booking.date
            ? format(
                new Date(parseISO(lastBooking.booking.date.toString())) as Date,
                "dd/MM/yyyy",
              )
            : "-"}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} route="students" />,
  },
];

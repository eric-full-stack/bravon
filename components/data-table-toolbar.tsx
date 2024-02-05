"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/data-table-view-options";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { useQuery } from "react-query";
import { getSports } from "@/lib/api";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  columnSearch: string;
}

export function DataTableToolbar<TData>({
  table,
  columnSearch,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const sports = useQuery("sports", getSports);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Pesquisar..."
          value={
            (table.getColumn(columnSearch)?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn(columnSearch)?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("sport") && (
          <DataTableFacetedFilter
            column={table.getColumn("sport")}
            title="Esporte"
            options={
              sports.data?.map((sport) => ({
                label: sport.name,
                value: sport.name,
              })) ?? []
            }
          />
        )}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Limpar
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}

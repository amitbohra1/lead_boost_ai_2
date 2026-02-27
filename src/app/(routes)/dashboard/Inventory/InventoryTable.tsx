"use client";

import { useState, useMemo } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  SortingState,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Search,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

interface ApiInventoryItem {
  stock: string;
  vehicle: string;
  age: number;
  total_leads: number;
  avg_leads_per_day: number;
  VIN: string;
  current_price: string;
  purchase_price: string;
  trend: string;
  demand: string;
  ai_suggestion: string;
  final_demand_prediction: string;
}

interface InventoryTableProps {
  data: any;
}

type Inventory = {
  carName: string;
  purchasePrice: number;
  currentPrice: number;
  daysUnsold: number;
  avgLeadsPerDay: number;
  totalLeads: number;
  trend: string;
  demand: string;
  aiSuggestion: string;
};

export function InventoryTable({ data }: InventoryTableProps) {
  const inventoryData: Inventory[] = useMemo(() => {
    const apiData: ApiInventoryItem[] =
      data?.response?.overall_stock_data_combined || [];

    return apiData.map((item) => ({
      carName: item.vehicle,
      purchasePrice: Number(item.purchase_price || 0),
      currentPrice: Number(item.current_price || 0),
      daysUnsold: item.age,
      avgLeadsPerDay: item.avg_leads_per_day,
      totalLeads: item.total_leads,
      trend: item.trend?.toLowerCase() === "up" ? "Up" : "Down",
      demand:
        item.final_demand_prediction === "High Demand" ? "High" : "Medium",
      aiSuggestion: item.ai_suggestion,
    }));
  }, [data]);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 50,
  });

  const columns = useMemo<ColumnDef<Inventory>[]>(
    () => [
      {
        accessorKey: "carName",
        header: "Car Name",
      },
      {
        accessorKey: "purchasePrice",
        header: "Purchase Price",
      },
      {
        accessorKey: "currentPrice",
        header: "Current Price",
      },
      {
        accessorKey: "daysUnsold",
        header: "Days Unsold",
      },
      {
        accessorKey: "avgLeadsPerDay",
        header: "Avg Leads/Day",
      },
      {
        accessorKey: "totalLeads",
        header: "Total Leads",
      },
      {
        accessorKey: "trend",
        header: "Trend",
      },
      {
        accessorKey: "demand",
        header: "Demand",
      },
      {
        accessorKey: "aiSuggestion",
        header: "AI Suggestion",
      },
    ],
    [],
  );

  const table = useReactTable({
    data: inventoryData,
    columns,
    state: { sorting, globalFilter, pagination },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    globalFilterFn: (row, _, filterValue) =>
      Object.values(row.original)
        .join(" ")
        .toLowerCase()
        .includes(filterValue.toLowerCase()),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  return (
    <div className="w-full">
      {/* SEARCH */}
      <div className="border-b border-border bg-muted/20 p-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search vehicles..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="px-3 py-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Vehicle Inventory Details</h2>
          <p className="text-sm text-muted-foreground">
            {table.getFilteredRowModel().rows.length} vehicles
          </p>
        </div>

        {/* TABLE */}
        <div className="w-full max-h-[70vh] overflow-auto border rounded-md">
          <table className="min-w-max border-collapse w-full">
            <thead className="bg-muted">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const isSorted = header.column.getIsSorted();

                    return (
                      <th
                        key={header.id}
                        onClick={header.column.getToggleSortingHandler()}
                        className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground cursor-pointer select-none whitespace-nowrap"
                      >
                        <div className="flex items-center gap-2">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}

                          {isSorted === "asc" && (
                            <ArrowUp className="h-3 w-3" />
                          )}
                          {isSorted === "desc" && (
                            <ArrowDown className="h-3 w-3" />
                          )}
                          {!isSorted && (
                            <ArrowUpDown className="h-3 w-3 opacity-50" />
                          )}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>

            <tbody className="divide-y divide-border">
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-muted/30">
                    {row.getVisibleCells().map((cell) => {
                      const value = cell.getValue();

                      return (
                        <td
                          key={cell.id}
                          className="px-4 py-2 whitespace-nowrap"
                        >
                          {cell.column.id === "purchasePrice" ||
                          cell.column.id === "currentPrice"
                            ? `$${Number(value).toLocaleString()}`
                            : flexRender(
                                cell.column.columnDef.cell ??
                                  (() => value as string),
                                cell.getContext(),
                              )}
                        </td>
                      );
                    })}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="py-12 text-center text-muted-foreground"
                  >
                    No vehicles found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="rounded-md border px-3 py-1 text-sm disabled:opacity-50"
            >
              Previous
            </button>

            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="rounded-md border px-3 py-1 text-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

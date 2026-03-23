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
import { ApiInventoryItem } from "@/interface/interface";

interface InventoryTableProps {
  data: any;
}

export function InventoryTable({ data }: InventoryTableProps) {
  const safeValue = (value: any) => {
    if (value === undefined || value === null || Number.isNaN(value)) {
      return "";
    }
    return value;
  };
  const inventoryData: Inventory[] = useMemo(() => {
    const apiData: ApiInventoryItem[] =
      data?.response?.overall_stock_data_combined || [];
    return apiData.map((item) => ({
      vehicleName: item.vehicle ?? "",
      vin: item.VIN ?? "",
      purchasePrice: safeValue(item.purchase_price),
      currentPrice: safeValue(item.current_price),
      daysUnsold: safeValue(item.age),
      avgLeadsPerDay: safeValue(item.avg_leads_per_day),
      totalLeads: safeValue(item.total_leads),
      trend: item.trend ?? "",
      demand: item.final_demand_prediction ?? "",
      aiSuggestion: item.ai_suggestion ?? "",
    }));
  }, [data]);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 50,
  });
  const formatCurrency = (value: any) => {
    if (value === null || value === undefined) return "";

    const num = Number(value);

    if (isNaN(num)) return value;

    return `$${num.toLocaleString()}`;
  };

  const columns = useMemo<ColumnDef<Inventory>[]>(
    () => [
      {
        accessorKey: "vehicleName",
        header: "Vehicle Name",
      },
      {
        accessorKey: "vin",
        header: "VIN",
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
    <div className="w-full h-screen">
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
        <div className="w-full overflow-x-auto">
          <div className="max-h-[70vh] h-screen overflow-y-auto border rounded-md">
            <table className="min-w-max border-collapse w-full">
              <thead className="bg-muted sticky top-0 z-10">
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

              <tbody className="divide-y divide-border overflow-auto max-h-[450px]">
                {table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className="hover:bg-muted/30">
                      {row.getVisibleCells().map((cell) => {
                        const value = cell.getValue() as string | number | null;

                        return (
                          <td
                            key={cell.id}
                            className="px-4 py-2 whitespace-nowrap"
                          >
                            {cell.column.id === "purchasePrice" ||
                            cell.column.id === "currentPrice" ? (
                              formatCurrency(value ?? "")
                            ) : cell.column.id === "trend" ? (
                              String(value).toLowerCase() === "up" ? (
                                <Badge className="bg-success/10 text-success border-success/20">
                                  <TrendingUp className="mr-1 h-3 w-3" />
                                  {value}
                                </Badge>
                              ) : (
                                <Badge className="bg-destructive/10 text-destructive border-destructive/20">
                                  <TrendingDown className="mr-1 h-3 w-3" />
                                  {value}
                                </Badge>
                              )
                            ) : cell.column.id === "demand" ? (
                              <Badge
                                className={
                                  String(value).toLowerCase().includes("high")
                                    ? "bg-success/10 text-success border-success/20"
                                    : "bg-warning/10 text-warning border-warning/20"
                                }
                              >
                              {String(value).replace(" Demand", "")}
                              </Badge>
                            ) : (
                              <span className="whitespace-nowrap">
                                {flexRender(
                                  cell.column.columnDef.cell ??
                                    (() => value as string),
                                  cell.getContext(),
                                )}
                              </span>
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

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
import { ArrowUpDown, Search, TrendingUp, TrendingDown } from "lucide-react";

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
    pageSize: 25,
  });

  const columns = useMemo<ColumnDef<Inventory>[]>(
    () => [
      {
        accessorKey: "carName",
        header: ({ column }) => (
          <div
            className="flex cursor-pointer items-center gap-2"
            onClick={() => column.toggleSorting()}
          >
            Car Name
            <ArrowUpDown className="size-3" />
          </div>
        ),
        cell: ({ row }) => (
          <span className="font-medium">{row.getValue("carName")}</span>
        ),
      },
      {
        accessorKey: "purchasePrice",
        header: "Purchase Price",
        cell: ({ row }) => (
          <div className="text-right">
            ${Number(row.getValue("purchasePrice")).toLocaleString()}
          </div>
        ),
      },
      {
        accessorKey: "currentPrice",
        header: "Current Price",
        cell: ({ row }) => (
          <div className="text-right">
            ${Number(row.getValue("currentPrice")).toLocaleString()}
          </div>
        ),
      },
      {
        accessorKey: "daysUnsold",
        header: "Days Unsold",
        cell: ({ row }) => (
          <div className="text-right">{row.getValue("daysUnsold")} days</div>
        ),
      },
      {
        accessorKey: "avgLeadsPerDay",
        header: "Avg Leads/Day",
        cell: ({ row }) => (
          <div className="text-right">{row.getValue("avgLeadsPerDay")}</div>
        ),
      },
      {
        accessorKey: "totalLeads",
        header: "Total Leads",
        cell: ({ row }) => (
          <div className="text-right">{row.getValue("totalLeads")}</div>
        ),
      },
      {
        accessorKey: "trend",
        header: "Trend",
        cell: ({ row }) => {
          const trend = row.getValue("trend") as string;

          return (
            <div className="text-center">
              {trend === "Up" ? (
                <Badge className="bg-success/10 text-success border-success/20">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  Up
                </Badge>
              ) : (
                <Badge className="bg-destructive/10 text-destructive border-destructive/20">
                  <TrendingDown className="mr-1 h-3 w-3" />
                  Down
                </Badge>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "demand",
        header: "Demand",
        cell: ({ row }) => {
          const demand = row.getValue("demand") as string;

          return (
            <Badge
              className={
                demand === "High"
                  ? "bg-success/10 text-success border-success/20"
                  : "bg-warning/10 text-warning border-warning/20"
              }
            >
              {demand}
            </Badge>
          );
        },
      },
      {
        accessorKey: "aiSuggestion",
        header: "AI Suggestion",
        cell: ({ row }) => (
          <div className="max-w-xs text-sm text-muted-foreground">
            {row.getValue("aiSuggestion")}
          </div>
        ),
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
    <div className="h-screen">
      <div className="border-b border-border bg-muted/20 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search vehicles..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="px-3 py-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Vehicle Inventory Details</h2>
          <p className="text-sm text-muted-foreground">
            {table.getRowModel().rows.length} vehicles
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            {/* HEADER */}
            <thead className="bg-muted/50 table w-full table-fixed">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            {/* SCROLLABLE BODY */}
            <tbody className="block max-h-[450px] overflow-y-auto w-full divide-y divide-border">
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="table w-full table-fixed hover:bg-muted/30"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-2">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr className="table w-full">
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

          {/* PAGINATION (outside scroll) */}
          <div className="my-3 px-3 flex items-center justify-between">
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
    </div>
  );
}

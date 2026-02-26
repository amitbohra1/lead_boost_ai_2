"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleTheme, selectTheme } from "@/store/slices/themeSlice";
import { resetFilters } from "@/store/slices/filterSlice";
import { refreshData } from "@/store/slices/leadPerformanceSlice";
import { refreshInventory } from "@/store/slices/inventorySlice";
import { Button } from "@/components/ui/button";
import {
  RefreshCw,
  Download,
  Sun,
  Moon,
  BarChart3,
  Users,
  LogOut,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { exportToCSV } from "@/lib/exportUtils";
import { selectLeadPerformanceData } from "@/store/slices/leadPerformanceSlice";
import { selectInventoryData } from "@/store/slices/inventorySlice";
import { getFilteredLeadData } from "@/data/lead-performance";
import { selectFilters } from "@/store/slices/filterSlice";
import { selectActiveTab } from "@/store/slices/uiSlice";
import { useRouter } from "next/navigation";
import { clearSession } from "@/utils/storage";

export function Header() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);
  const activeTab = useAppSelector(selectActiveTab);
  const leadData = useAppSelector(selectLeadPerformanceData);
  const inventoryData = useAppSelector(selectInventoryData);
  const filters = useAppSelector(selectFilters);
  const router = useRouter();

  // 👇 Replace this with real user name from store / session
  const userName = "Amit Bohra";
  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const handleRefresh = () => {
    dispatch(resetFilters());
    if (activeTab === "lead-performance") {
      dispatch(refreshData());
    } else {
      dispatch(refreshInventory());
    }
  };

  const handleExport = () => {
    if (activeTab === "lead-performance") {
      const filteredData = getFilteredLeadData(filters);
      exportToCSV(filteredData, "lead-performance");
    } else {
      exportToCSV(inventoryData, "inventory-overview");
    }
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const logOut = () => {
    clearSession();
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-gradient-to-r from-primary/10 via-accent/10 to-info/10 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-md">
              <BarChart3 className="size-5" />
            </div>
            <h1 className="text-xl font-semibold text-foreground">
              Analytics Dashboard
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
           <Button
            variant="default"
            size="icon"
            title="User management"
            className="border border-border rounded-lg"
            onClick={() => router.push("/user-management")}
          >
            <Users className="size-5" />
          </Button>
          <Button
            variant="default"
            size="icon"
            onClick={handleThemeToggle}
            title="Toggle theme"
            className="border border-border rounded-lg"
          >
            {theme === "light" ? (
              <Moon className="size-5" />
            ) : (
              <Sun className="size-5" />
            )}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="default"
                className="h-9 w-9 rounded-lg font-semibold"
              >
                {userInitials}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={handleRefresh}>
                <RefreshCw className="mr-2 size-4" />
                Refresh
              </DropdownMenuItem>

              <DropdownMenuItem onClick={handleExport}>
                <Download className="mr-2 size-4" />
                Download
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={logOut}
                className="text-red-500 focus:text-red-500"
              >
                <LogOut className="mr-2 size-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
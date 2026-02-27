"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleTheme, selectTheme } from "@/store/slices/themeSlice";
import { Button } from "@/components/ui/button";
import {
  RefreshCw,
  Download,
  Sun,
  Moon,
  BarChart3,
  Users,
  LogOut,
  Home,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { selectFilters } from "@/store/slices/filterSlice";
import { useRouter } from "next/navigation";
import { clearSession } from "@/utils/storage";
import { useEffect, useState } from "react";

export function Header() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);
  const router = useRouter();
  const [userInitials, setUserInitials] = useState("U");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);

      const initials = `${parsedUser.firstname?.[0] ?? ""}${
        parsedUser.lastname?.[0] ?? ""
      }`.toUpperCase();

      setUserInitials(initials);
    }
  }, []);

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
              LeadBoostAI
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="custom"
            size="icon"
            title="Dashboard"
            className="border border-border bg-primary/50 text-muted dark:text-foreground rounded-lg"
            onClick={() => router.push("/dashboard")}
          >
            <Home className="size-5" />
          </Button>
          <Button
            variant="custom"
            size="icon"
            title="User management"
            className="border border-border bg-primary/50 text-muted dark:text-foreground rounded-lg"
            onClick={() => router.push("/user-management")}
          >
            <Users className="size-5" />
          </Button>
          <Button
            variant="custom"
            size="icon"
            onClick={handleThemeToggle}
            title="Toggle theme"
            className="border border-border bg-primary/50 text-muted dark:text-foreground rounded-lg"
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
                variant="custom"
                className="h-9 w-9 rounded-lg bg-primary/50 text-muted dark:text-foreground font-semibold"
              >
                {userInitials}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-48">
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

import { useTheme } from "next-themes"
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getProfileFromLocalStorage, getStationNameFromLocalStorage } from "@/utils/auth";
import type { User } from "@/types/user.type";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useLogoutMutation } from "@/queries/auth.query";
export const Header = () => {
  const { theme, setTheme } = useTheme();
  const user: User | null = getProfileFromLocalStorage();
  const stationName = getStationNameFromLocalStorage();
  const logoutMutation = useLogoutMutation();

  const handleLogout = () => {
    logoutMutation.mutate();
  }

  return (
    <header className="
        fixed top-0 left-64 right-0 z-50
        h-14
        bg-sidebar
        text-sidebar-foreground
        border-b border-sidebar-border
        px-4
        flex items-center justify-between"
    >
      {/* Logo / title */}
      <div className="font-semibold tracking-tight px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50 rounded-full text-sm inline-flex items-center justify-center shadow-sm">
        Trạm {stationName}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        {/* Theme switch */}
        <Button
          variant="ghost"
          size="icon"
          className="relative text-sidebar-foreground hover:bg-sidebar-accent"
          onClick={() =>
            setTheme(theme === "dark" ? "light" : "dark")
          }
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>

        {/* Avatar*/}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-8 w-8 cursor-pointer">
              <AvatarImage src={user?.avatarUrl} alt={user?.fullName} />
              <AvatarFallback>{user?.fullName?.slice(0, 2).toUpperCase() ?? "EV"}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="font-medium">{user?.fullName}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Hồ sơ</DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout} className="text-destructive hover:text-foreground hover:bg-destructive/50">
              Đăng xuất
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex flex-col">
          <p>{user?.fullName}</p>
          <p>{user?.email}</p>
        </div>
      </div>
    </header>
  )
}
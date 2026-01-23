import { useTheme } from "next-themes"
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getProfileFromLocalStorage } from "@/utils/auth";
import type { User } from "@/types/user.type";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useLogoutMutation } from "@/queries/auth.query";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const { theme, setTheme } = useTheme();
  const user: User | null = getProfileFromLocalStorage();
  const logoutMutation = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutMutation.mutate();
    navigate('/login');
  }

  return (
    <header className="h-14 border-b px-4 flex items-center justify-between">
      {/* Logo / title */}
      <div className="font-semibold">
        EVCodrive
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {/* Theme switch */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() =>
            setTheme(theme === "dark" ? "light" : "dark")
          }
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
        </Button>
        s
        {/* Avatar (tạm) */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.avatarUrl} alt={user?.fullName} />
              <AvatarFallback>EV</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{user?.fullName}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
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
import { useTheme } from "next-themes"
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const Header = () => {
    const {theme, setTheme} = useTheme();

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
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>EV</AvatarFallback>
        </Avatar>
      </div>
    </header>
    )
}
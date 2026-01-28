"use client";

import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { Moon, Sun, LogIn } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

export const LandingHeader = () => {
    const { theme, setTheme } = useTheme();
    const navigate = useNavigate();

    return (
        <header className="fixed top-0 left-0 right-0 z-[100] h-16 border-b border-border/40 bg-background/60 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto h-full px-4 flex items-center justify-between">

                {/* Left: Logo màu mè */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-chart-2 to-primary flex items-center justify-center shadow-lg shadow-chart-2/20 group-hover:scale-110 transition-transform">
                        <span className="text-white font-black text-xl">E</span>
                    </div>
                    <span className="text-xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-chart-2 to-primary">
                        EVCodrive
                    </span>
                </Link>

                {/* Right: Actions */}
                <div className="flex items-center gap-3">
                    {/* Theme switch - Giữ nguyên logic của bạn */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full hover:bg-muted"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    >
                        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>

                    {/* Nút sang Login Page */}
                    <Button
                        variant="default"
                        size="sm"
                        onClick={() => navigate("/login")}
                        className="hidden sm:flex bg-gradient-to-r from-chart-2 to-primary text-white font-semibold shadow-md hover:opacity-90 transition-opacity"
                    >
                        <LogIn className="mr-2 h-4 w-4" />
                        Đăng nhập
                    </Button>

                    {/* Mobile login icon only */}
                    <Button
                        variant="default"
                        size="icon"
                        onClick={() => navigate("/login")}
                        className="sm:hidden bg-primary text-white"
                    >
                        <LogIn className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </header>
    );
};
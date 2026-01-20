import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // TODO: Xử lý đăng nhập
        console.log("Đăng nhập với:", { email, password });
        setTimeout(() => setIsLoading(false), 1000);
        navigate('/');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="flex justify-center mb-8">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-7 h-7 text-primary-foreground"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                        </svg>
                    </div>
                </div>

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-semibold text-foreground mb-2">
                        Chào mừng trở lại
                    </h1>
                    <p className="text-muted-foreground">
                        Đăng nhập vào tài khoản để tiếp tục
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                            <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0" />
                            <p className="text-sm text-destructive">{error}</p>
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-foreground">
                            Địa chỉ Email
                            <span className="text-destructive ml-0.5">*</span>
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Nhập email của bạn"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isLoading}
                            className="h-13 bg-background border border-border rounded-lg"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-medium text-foreground">
                            Mật khẩu
                            <span className="text-destructive ml-0.5">*</span>
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Nhập mật khẩu của bạn"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                            className="h-13 bg-background border border-border rounded-lg"
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-10 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg mt-6"
                    >
                        {isLoading ? (
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Đang xử lý...
                            </div>
                        ) : (
                            'Đăng nhập'
                        )}
                    </Button>
                </form>

                {/* Footer */}
                <p className="text-center text-sm text-muted-foreground mt-8">
                    Trang đăng nhập dành cho nhân viên nội bộ EVCoDrive
                </p>
            </div>
        </div>
    );
}
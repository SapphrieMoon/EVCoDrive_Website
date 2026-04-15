import { Button } from "@/components/ui/button";
import path from "@/constants/path";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-4">
            <div className="text-center space-y-6 max-w-md">
                <h1 className="text-9xl font-bold tracking-tighter text-primary/80">
                    404
                </h1>

                <div className="space-y-2">
                    <h2 className="text-2xl font-semibold tracking-tight">
                        Không tìm thấy trang
                    </h2>
                    <p className="text-muted-foreground">
                        Xin lỗi, trang bạn đang tìm kiếm không tồn tại, đã bị gỡ bỏ hoặc tạm thời không thể truy cập.
                    </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                    <Button asChild className="w-full sm:w-auto h-11 px-8">
                        <Link to={path.home}>
                            Về trang chủ
                        </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full sm:w-auto h-11 px-8">
                        <button onClick={() => window.history.back()}>
                            Quay lại
                        </button>
                    </Button>
                </div>
            </div>

            <div className="absolute bottom-8 text-sm text-muted-foreground/60">
                &copy; {new Date().getFullYear()} EVCoDrive Admin. All rights reserved.
            </div>
        </div>
    );
}
import { Card, CardContent } from "@/components/ui/card";
import type { Overview } from "@/types/dashboard.type";
import { CalendarCheck, TrendingDown, TrendingUp } from "lucide-react";

export function BookingCard({ data }: { data?: Overview }) {
    if (!data) return null

    const isPositive = data.growth.bookingsPercent >= 0

    return (
        <Card className="relative overflow-hidden">
            {/* Accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-purple-400" />

            <CardContent className="p-5 pt-6 space-y-4">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Đặt xe</p>
                        <p className="text-3xl font-bold mt-1">{data.totalBookings.toLocaleString()}</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-violet-500/10 border border-violet-500/20">
                        <CalendarCheck className="w-5 h-5 text-violet-500" />
                    </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-2 gap-2">
                    <div className="p-2.5 rounded-lg bg-muted/50 text-center">
                        <p className="text-xs text-muted-foreground">Tổng đặt xe</p>
                        <p className="text-base font-semibold mt-0.5">{data.totalBookings.toLocaleString()}</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-violet-500/8 border border-violet-500/15 text-center">
                        <p className="text-xs text-muted-foreground">Tăng trưởng</p>
                        <p className={`text-base font-semibold mt-0.5 ${isPositive ? "text-emerald-500" : "text-red-500"}`}>
                            {isPositive ? "+" : ""}{data.growth.bookingsPercent}%
                        </p>
                    </div>
                </div>

                {/* Growth */}
                <div className="flex items-center gap-1.5 text-xs">
                    {isPositive
                        ? <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                        : <TrendingDown className="w-3.5 h-3.5 text-red-500" />
                    }
                    <span className={isPositive ? "text-emerald-500 font-medium" : "text-red-500 font-medium"}>
                        {isPositive ? "+" : ""}{data.growth.bookingsPercent}%
                    </span>
                    <span className="text-muted-foreground">so với kỳ trước</span>
                </div>
            </CardContent>
        </Card>
    )
}
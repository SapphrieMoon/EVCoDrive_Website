import { Card, CardContent } from "@/components/ui/card";
import type { Overview } from "@/types/dashboard.type";
import { TrendingDown, TrendingUp, Users } from "lucide-react";

export function UserCard({ data }: { data?: Overview }) {
    if (!data) return null

    const isPositive = data.growth.usersPercent >= 0
    const activePercent = data.totalUsers > 0
        ? Math.round((data.activeUsers / data.totalUsers) * 100)
        : 0

    return (
        <Card className="relative overflow-hidden">
            {/* Accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-400" />

            <CardContent className="p-5 pt-6 space-y-4">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Người dùng</p>
                        <p className="text-3xl font-bold mt-1">{data.totalUsers.toLocaleString()}</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20">
                        <Users className="w-5 h-5 text-blue-500" />
                    </div>
                </div>

                {/* Active users progress */}
                <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Đang hoạt động</span>
                        <span className="font-medium text-foreground">{data.activeUsers} ({activePercent}%)</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                        <div
                            className="h-full rounded-full bg-blue-500 transition-all duration-500"
                            style={{ width: `${activePercent}%` }}
                        />
                    </div>
                </div>

                {/* Growth */}
                <div className="flex items-center gap-1.5 text-xs">
                    {isPositive
                        ? <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                        : <TrendingDown className="w-3.5 h-3.5 text-red-500" />
                    }
                    <span className={isPositive ? "text-emerald-500 font-medium" : "text-red-500 font-medium"}>
                        {isPositive ? "+" : ""}{data.growth.usersPercent}%
                    </span>
                    <span className="text-muted-foreground">so với kỳ trước</span>
                </div>
            </CardContent>
        </Card>
    )
}
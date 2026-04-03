import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/utils/number";
import { TrendingDown, TrendingUp, Wallet } from "lucide-react";
import type { Overview } from "@/types/dashboard.type";

export function RevenueCard({ data }: { data?: Overview }) {
    if (!data) return null

    const isPositive = data.growth.revenuePercent >= 0

    return (
        <Card className="relative overflow-hidden">
            {/* Accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-green-400" />

            <CardContent className="p-5 pt-6 space-y-4">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Doanh thu</p>
                        <p className="text-3xl font-bold mt-1">{formatCurrency(data.totalRevenue)}</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                        <Wallet className="w-5 h-5 text-emerald-500" />
                    </div>
                </div>

                {/* Transactions */}
                <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                    <div className="flex-1">
                        <p className="text-xs text-muted-foreground">Tổng giao dịch</p>
                        <p className="text-lg font-semibold">{data.totalTransactions.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-muted-foreground">TB / giao dịch</p>
                        <p className="text-sm font-medium">
                            {data.totalTransactions > 0
                                ? formatCurrency(Math.round(data.totalRevenue / data.totalTransactions))
                                : "---"}
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
                        {isPositive ? "+" : ""}{data.growth.revenuePercent}%
                    </span>
                    <span className="text-muted-foreground">so với kỳ trước</span>
                </div>
            </CardContent>
        </Card>
    )
}
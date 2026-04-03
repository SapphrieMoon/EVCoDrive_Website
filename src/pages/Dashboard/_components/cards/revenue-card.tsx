import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/utils/number";
import { DollarSign, TrendingUp } from "lucide-react";
import type { Overview } from "@/types/dashboard.type";

export function RevenueCard({ data }: { data?: Overview }) {
    if (!data) return null
    return (
        <Card>
            <CardContent className="p-4 space-y-2">
                <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">Doanh thu</p>
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                </div>

                <div className="text-2xl font-bold">
                    {formatCurrency(data.totalRevenue)}
                </div>

                <div className="text-sm text-muted-foreground">
                    {data.totalTransactions} giao dịch
                </div>

                <div className="flex items-center gap-1 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-green-500">
                        +{data.growth.revenuePercent}%
                    </span>
                    <span className="text-muted-foreground">
                        so với kỳ trước
                    </span>
                </div>
            </CardContent>
        </Card>
    )
}
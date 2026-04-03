import { Card, CardContent } from "@/components/ui/card";
import type { Overview } from "@/types/dashboard.type";
import { Zap } from "lucide-react";

export function VehicleCard({ data }: { data?: Overview }) {
    if (!data) return null

    const activePercent = data.totalVehicles > 0
        ? Math.round((data.activeVehicles / data.totalVehicles) * 100)
        : 0

    return (
        <Card className="relative overflow-hidden">
            {/* Accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-400" />

            <CardContent className="p-5 pt-6 space-y-4">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Phương tiện</p>
                        <p className="text-3xl font-bold mt-1">{data.totalVehicles.toLocaleString()}</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/20">
                        <Zap className="w-5 h-5 text-orange-500" />
                    </div>
                </div>

                {/* Active vehicles progress */}
                <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Đang hoạt động</span>
                        <span className="font-medium text-foreground">{data.activeVehicles} ({activePercent}%)</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                        <div
                            className="h-full rounded-full bg-orange-500 transition-all duration-500"
                            style={{ width: `${activePercent}%` }}
                        />
                    </div>
                </div>

                {/* Inactive */}
                <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Không hoạt động</span>
                    <span className="font-medium">{data.totalVehicles - data.activeVehicles} xe</span>
                </div>
            </CardContent>
        </Card>
    )
}
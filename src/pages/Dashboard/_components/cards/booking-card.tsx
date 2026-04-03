import { Card, CardContent } from "@/components/ui/card";
import type { Overview } from "@/types/dashboard.type";
import { Calendar, TrendingUp } from "lucide-react";

export function BookingCard({ data }: { data: Overview }) {
    return (
        <Card>
            <CardContent className="p-4 space-y-2">
                <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">Đặt xe</p>
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                </div>

                <div className="text-2xl font-bold">
                    {data.totalBookings}
                </div>

                <div className="flex items-center gap-1 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-green-500">
                        +{data.growth.bookingsPercent}%
                    </span>
                    <span className="text-muted-foreground">
                        so với kỳ trước
                    </span>
                </div>
            </CardContent>
        </Card>
    )
}
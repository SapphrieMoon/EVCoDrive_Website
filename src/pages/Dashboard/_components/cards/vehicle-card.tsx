import { Card, CardContent } from "@/components/ui/card";
import type { Overview } from "@/types/dashboard.type";
import { Car } from "lucide-react";

export function VehicleCard({ data }: { data: Overview }) {
    return (
        <Card>
            <CardContent className="p-4 space-y-2">
                <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">Xe</p>
                    <Car className="w-4 h-4 text-muted-foreground" />
                </div>

                <div className="text-2xl font-bold">
                    {data.activeVehicles} / {data.totalVehicles}
                </div>

                <div className="text-sm text-muted-foreground">
                    Xe đang hoạt động
                </div>
            </CardContent>
        </Card>
    )
}
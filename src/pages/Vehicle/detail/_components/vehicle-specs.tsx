import type { VehicleDetail } from "@/types/vehicle.type"
import { Gauge, Battery, Calendar, Palette, Sparkles } from "lucide-react"

export const VehicleSpecs = ({ vehicle }: { vehicle: VehicleDetail }) => {
    const specs = [
        { label: "Odometer", value: `${vehicle.odometer.toLocaleString()} km`, icon: <Gauge className="h-4 w-4" /> },
        { label: "Sức khỏe Pin", value: `${vehicle.batteryHealth}%`, icon: <Battery className="h-4 w-4" />, color: vehicle.batteryHealth < 80 ? "text-red-500" : "text-emerald-500" },
        { label: "Năm sản xuất", value: vehicle.year, icon: <Calendar className="h-4 w-4" /> },
        { label: "Màu sắc", value: vehicle.color, icon: <Palette className="h-4 w-4" /> },
        { label: "Tình trạng", value: vehicle.isBrandNew === "True" ? "Mới  100%" : "Đã qua sử dụng", icon: <Sparkles className="h-4 w-4" /> },
    ]

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {specs.map((spec, i) => (
                <div key={i} className="p-4 rounded-2xl border bg-card/50 flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase font-bold tracking-wider">
                        {spec.icon} {spec.label}
                    </div>
                    <div className={`text-xl font-black italic tracking-tighter ${spec.color || ""}`}>
                        {spec.value}
                    </div>
                </div>
            ))}
        </div>
    )
}
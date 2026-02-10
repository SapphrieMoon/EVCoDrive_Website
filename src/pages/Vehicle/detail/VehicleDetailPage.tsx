import { useParams } from "react-router-dom"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { VEHICLE_STATUS_MAPPING } from "@/constants/status/vehicle/vehicle-status"
import { VEHICLE_STATUS_ACTIONS } from "@/constants/status/vehicle/vehicle-status-action"
import { cn } from "@/lib/utils"
import { VehicleSpecs } from "./_components/vehicle-specs"
import vehicleQueries from "@/queries/vehicle.query"
import { StationCard } from "./_components/station-card"
import { CoOwnerCard } from "./_components/co-owner-card"
import { DetailSkeleton } from "@/common/skeletons/detail-skeleton"
import type { VehicleImage } from "@/types/commons/media.type"
import type { VehicleStatusAction } from "@/types/vehicle.type"

export default function VehicleDetailPage() {
    const { id } = useParams<{ id: string }>()

    const { data, isLoading } = vehicleQueries.useDetail(id!)
    const vehicle = data?.data.data

    if (isLoading) return <div className="p-10 text-center font-bold italic"><DetailSkeleton /></div>
    if (!vehicle) return <div className="p-10 text-center">Không tìm thấy xe</div>

    const statusConfig = VEHICLE_STATUS_MAPPING[vehicle.vehicleStatus]
    const actions = VEHICLE_STATUS_ACTIONS[vehicle.vehicleStatus] ?? []

    return (
        <ScrollArea className="h-full bg-slate-50/50 dark:bg-transparent">
            <div className="max-w-7xl mx-auto p-6 space-y-8">

                {/* 1. Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-3">
                            <h1 className="text-4xl font-black italic tracking-tighter uppercase text-primary">
                                {vehicle.vehicleModel.name}
                            </h1>
                            <Badge variant="outline" className={cn("text-xs font-bold uppercase", statusConfig?.color)}>
                                {statusConfig?.label || vehicle.vehicleStatus}
                            </Badge>
                        </div>
                        <p className="text-muted-foreground font-medium">Biển số: <span className="text-foreground">{vehicle.licensePlate}</span> • Hãng: {vehicle.vehicleModel.brandName}</p>
                    </div>

                    {/* Quick Actions (Duyệt/Từ chối) */}
                    <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-2 rounded-xl shadow-sm border">
                        {actions.map((action: VehicleStatusAction) => (
                            <Button key={action.type} variant={action.variant || "outline"} size="sm" className="font-bold uppercase text-[10px]">
                                <action.icon className="mr-2 h-3.5 w-3.5" /> {action.label}
                            </Button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* CỘT TRÁI - 8 Cột */}
                    <div className="lg:col-span-8 space-y-8">

                        {/* 2. Gallery Section */}
                        <div className="grid grid-cols-4 gap-3 h-[450px]">
                            <div className="col-span-3 rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-muted">
                                <img src={vehicle.images[0]?.secureUrl} className="w-full h-full object-cover" alt="Main" />
                            </div>
                            <div className="col-span-1 grid grid-rows-3 gap-3">
                                {vehicle.images.slice(1, 4).map((img: VehicleImage, i: number) => (
                                    <div key={i} className="rounded-2xl overflow-hidden border-2 border-white shadow-md bg-muted">
                                        <img src={img.secureUrl} className="w-full h-full object-cover" alt="Sub" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 3. Thông số xe */}
                        <div className="space-y-4">
                            <h3 className="font-black italic uppercase tracking-widest text-sm text-primary/70">Thông số kỹ thuật</h3>
                            <VehicleSpecs vehicle={vehicle} />
                        </div>

                        {/* 4. Thông tin Model (Card ngang) */}
                        <div className="bg-primary/5 border border-primary/10 rounded-3xl p-6 flex flex-wrap justify-between gap-8">
                            <div>
                                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Hộp số</p>
                                <p className="font-bold">{vehicle.vehicleModel.gearShiftType}</p>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Quãng đường</p>
                                <p className="font-bold">{vehicle.vehicleModel.range} km</p>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Dung lượng Pin</p>
                                <p className="font-bold">{vehicle.vehicleModel.batteryCapacity} kWh</p>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Chỗ ngồi</p>
                                <p className="font-bold">{vehicle.vehicleModel.seatingCapacity} chỗ</p>
                            </div>
                        </div>
                    </div>

                    {/* CỘT PHẢI - 4 Cột */}
                    <div className="lg:col-span-4 space-y-6">
                        <StationCard station={vehicle.currentStation} />
                        <CoOwnerCard group={vehicle.coOwnerGroup} />
                    </div>
                </div>
            </div>
        </ScrollArea>
    )
}
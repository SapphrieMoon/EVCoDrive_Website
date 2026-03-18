import { CardSkeleton } from "@/common/skeletons/card-skeleton"
import { Card } from "@/components/ui/card"
import vehicleQueries from "@/queries/vehicle.query"
import { Car, Gauge } from "lucide-react"

export default function VehicleCard({ id }: { id: string }) {
    const { data, isPending } = vehicleQueries.useDetail(id as string)
    const vehicle = data?.data.data

    if (isPending) return <CardSkeleton />
    if (!vehicle) return <div>Không tìm thấy dữ liệu</div>
    return (
        <Card className="p-5 items-start gap-4 shadow-sm flex flex-row">
            <div className="flex-none h-14 w-14 bg-slate-100 dark:bg-slate-800/60 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-400">
                <Car size={28} className="fill-current" />
            </div>
            <div className="flex flex-col gap-2">
                <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                    Thông tin phương tiện
                </div>
                <div className="text-lg font-semibold leading-tight text-foreground">
                    {vehicle?.vehicleModel.brandName} {vehicle?.vehicleModel.name}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                    Biển sổ xe: {vehicle?.licensePlate}
                </div>
                <div className="text-sm font-semibold flex items-center gap-1.5 mt-2 text-green-700">
                    <Gauge className="w-4 h-4" />
                    <span>Odometer: {vehicle?.odometer} km</span>
                </div>
            </div>
        </Card>
    )
}
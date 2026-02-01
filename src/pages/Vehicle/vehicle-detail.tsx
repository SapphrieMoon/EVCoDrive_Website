import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import {
    Hash,
    Car,
    Battery,
    Milestone,
    Palette,
    Calendar,
    Clock,
    Trash2,
    Edit,
    type LucideIcon,
    Users
} from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { formatDate } from "@/utils/date"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import vehicleQueries from "@/queries/vehicle.query"
import { VEHICLE_STATUS_MAPPING } from "@/constants/status/vehicle/vehicle-status"

interface VehicleDetailProps {
    id: string | null
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function VehicleDetail({ id, open, onOpenChange }: VehicleDetailProps) {
    // Giả sử dùng query lấy dữ liệu xe
    const { data, isLoading } = vehicleQueries.useGetDetail(id as string)
    const vehicleData = data?.data.data;
    console.log("dwqeqwe: ", vehicleData);

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="sm:max-w-md flex flex-col h-full">
                <SheetHeader className="border-b pb-4">
                    <SheetTitle className="flex items-center gap-2">
                        <Car className="h-5 w-5 text-primary" />
                        Chi tiết phương tiện
                    </SheetTitle>
                    <SheetDescription>
                        Xem thông tin chi tiết và trạng thái vận hành của xe
                    </SheetDescription>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto pr-2">
                    <div className="space-y-6 py-6">
                        {/* Thumbnail Section */}
                        <div className="flex flex-col items-center justify-center space-y-4">
                            <div className="relative group h-48 w-full overflow-hidden rounded-xl border bg-muted/30 shadow-inner">
                                <img
                                    src={vehicleData?.thumbnailUrl}
                                    alt={vehicleData?.modelName}
                                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                                />
                                <div className="absolute top-2 right-2">
                                    {/* Dùng Badge mapping trạng thái xe */}
                                    {vehicleData && (
                                        <Badge className={VEHICLE_STATUS_MAPPING[vehicleData.vehicleStatus].label}>
                                            {VEHICLE_STATUS_MAPPING[vehicleData.vehicleStatus].label}
                                        </Badge>
                                    )}
                                </div>
                            </div>
                            <div className="text-center">
                                <h3 className="text-xl font-bold">{vehicleData?.modelName}</h3>
                                <p className="text-muted-foreground font-medium">{vehicleData?.brandName}</p>
                            </div>
                        </div>

                        <Separator />

                        {/* Info Grid */}
                        <div className="grid grid-cols-1 gap-4">
                            {isLoading ? (
                                Array(6).fill(0).map((_, i) => <Skeleton key={i} className="h-16 w-full rounded-lg" />)
                            ) : (
                                <>
                                    <InfoItem
                                        icon={Hash}
                                        label="Biển số xe"
                                        value={vehicleData?.licensePlate}
                                        className="bg-primary/5 border-primary/20"
                                    />

                                    <div className="grid grid-cols-2 gap-4">
                                        <InfoItem icon={Palette} label="Màu sắc" value={vehicleData?.color} />
                                        {/* <InfoItem icon={Calendar} label="Năm sản xuất" value={vehicleData?.year.toString()} /> */}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <InfoItem
                                            icon={Battery}
                                            label="Sức khỏe Pin"
                                            value={`${vehicleData?.batteryHealth}%`}
                                            valueClassName={vehicleData?.batteryHealth && vehicleData.batteryHealth < 70 ? "text-destructive" : "text-chart-2"}
                                        />
                                        {/* <InfoItem icon={Milestone} label="Odometer" value={`${vehicleData?.odometer.toLocaleString()} km`} /> */}
                                    </div>

                                    <Separator className="my-2" />

                                    <InfoItem icon={Users} label="Nhóm sở hữu" value={vehicleData?.groupName || "Chưa tham gia nhóm"} />
                                    <InfoItem icon={Clock} label="Ngày tạo hệ thống" value={formatDate(vehicleData?.createdDate)} />

                                    <div className="flex items-start gap-3 rounded-lg border p-3 bg-muted/20">
                                        <Hash className="mt-0.5 h-4 w-4 text-muted-foreground" />
                                        <div className="space-y-1 overflow-hidden">
                                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Mã định danh (UUID)</p>
                                            <p className="text-xs font-mono truncate">{vehicleData?.vehicleId}</p>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Action Buttons Footer */}
                <SheetFooter className="border-t pt-4 sm:flex-col gap-2">
                    <div className="flex w-full gap-2">
                        <Button className="flex-1" variant="outline" onClick={() => {/* handle edit */ }}>
                            <Edit className="mr-2 h-4 w-4" />
                            Chỉnh sửa
                        </Button>
                        <Button className="flex-1" variant="destructive" onClick={() => {/* handle delete */ }}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Xóa xe
                        </Button>
                    </div>
                    <Button variant="ghost" className="w-full" onClick={() => onOpenChange(false)}>
                        Đóng
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

// Component phụ để render từng dòng thông tin cho gọn
function InfoItem({
    icon: Icon,
    label,
    value,
    className,
    valueClassName
}: {
    icon: LucideIcon,
    label: string,
    value?: string,
    className?: string,
    valueClassName?: string
}) {
    return (
        <div className={cn("flex items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50", className)}>
            <Icon className="mt-0.5 h-4 w-4 text-muted-foreground" />
            <div className="space-y-1">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{label}</p>
                <p className={cn("text-sm font-semibold", valueClassName)}>{value || "---"}</p>
            </div>
        </div>
    )
}
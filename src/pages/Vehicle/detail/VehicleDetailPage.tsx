import { useParams } from "react-router-dom"
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
import { VehicleAction, VehicleStatus, type VehicleStatusAction } from "@/types/vehicle.type"
import { getGearShiftLabel } from "@/constants/vehicle-model/gear-shift"
import { useState } from "react"
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { RejectDialog } from "./_components/reject-dialog"

export default function VehicleDetailPage() {
    const [index, setIndex] = useState(-1); //index cho ảnh gallery
    const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);

    const { id } = useParams<{ id: string }>()

    const { data, isLoading } = vehicleQueries.useDetail(id!)
    const vehicle = data?.data.data

    const slides = vehicle?.images.map((img: VehicleImage) => ({ src: img.secureUrl }));

    if (isLoading) return <div className="p-10 text-center font-bold italic"><DetailSkeleton /></div>
    if (!vehicle) return <div className="p-10 text-center">Không tìm thấy xe</div>

    const statusConfig = VEHICLE_STATUS_MAPPING[vehicle.vehicleStatus]
    const actions = VEHICLE_STATUS_ACTIONS[vehicle.vehicleStatus] ?? []

    //========================== Update Status ==========================

    const updateStatusMutation = vehicleQueries.useUpdateStatus()


    const handleAction = (
        id: string,
        currentStatus: VehicleStatus,
        action: VehicleAction
    ) => {
        const actionConfig =
            VEHICLE_STATUS_ACTIONS[vehicle.vehicleStatus]?.find(
                a => a.type === action
            )

        if (!actionConfig) return

        // Nếu là hành động REJECT, thì mở Dialog thay vì gọi mutate ngay
        if (action === VehicleAction.REJECT) {
            setIsRejectDialogOpen(true);
            return;
        }

        // Các hành động khác (Approve, v.v.) thì gọi luôn
        updateStatusMutation.mutate({ id, status: actionConfig.nextStatus });
    }

    const confirmReject = (reason: string) => {
        const rejectAction = actions.find(a => a.type === VehicleAction.REJECT);
        if (rejectAction) {
            updateStatusMutation.mutate({
                id: vehicle.vehicleId,
                status: rejectAction.nextStatus,
                rejectionReason: reason
            }, {
                onSuccess: () => setIsRejectDialogOpen(false) // Đóng dialog khi xong
            });
        }
    };

    return (
        <div className="h-full bg-slate-50/50 dark:bg-transparent">
            <div className="max-w-7xl mx-auto p-6 space-y-8">

                {/* 1. Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-10">
                            <h1 className="text-4xl font-black italic tracking-tighter uppercase text-primary">
                                {vehicle.vehicleModel.name}
                            </h1>
                            <Badge variant="outline" className={cn("text-xs font-bold uppercase", statusConfig?.color)}>
                                {statusConfig?.label || vehicle.vehicleStatus}
                            </Badge>
                        </div>
                        <p className="text-muted-foreground font-medium">Biển số: <span className="text-foreground">{vehicle.licensePlate}</span> • Hãng: {vehicle.vehicleModel.brandName}</p>
                        <p className="text-foreground text-sm">Mã định danh xe: <span className="text-muted-foreground">{vehicle.vehicleId}</span></p>
                    </div>

                    {/* Quick Actions (Duyệt/Từ chối) */}
                    <div className="flex items-center gap-4 p-2 ">
                        {actions.map((action: VehicleStatusAction) => (
                            <Button key={action.type} variant={action.variant || "outline"} size="lg"
                                className="font-bold uppercase text-[10px]"
                                onClick={() => handleAction(vehicle.vehicleId, vehicle.vehicleStatus, action.type)}
                            >
                                <action.icon className="mr-2 h-3.5 w-3.5" /> {action.label}
                            </Button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* CỘT TRÁI - 8 Cột */}
                    <div className="lg:col-span-8 space-y-8">

                        {/* 2. Gallery Section */}
                        <div className="grid grid-cols-4 gap-3 h-[360px] ">
                            {/* Ảnh chính - Luôn chiếm 3 cột hoặc 4 cột nếu không có ảnh phụ */}
                            <div
                                className={cn("rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-muted relative group cursor-pointer",
                                    vehicle.images.length > 1 ? "col-span-3 aspect-square lg:aspect-auto lg:h-full" : "col-span-4")}
                                onClick={() => setIndex(0)}
                            >
                                <img
                                    src={vehicle.images[0]?.secureUrl}
                                    className="absolute inset-0 w-full h-full object-cover"
                                    alt="Main"
                                />
                            </div>

                            {/* Cột ảnh phụ - Chỉ hiện nếu có nhiều hơn 1 ảnh */}
                            {vehicle.images.length > 1 && (
                                <div className="col-span-1 grid grid-rows-3 gap-3 h-full">
                                    {vehicle.images.slice(1, 4).map((img, i) => {
                                        const isLastItem = i === 2 || i === vehicle.images.slice(1, 4).length - 1;
                                        const remainingCount = vehicle.images.length - 4;

                                        return (
                                            <div
                                                key={img.mediaId}
                                                className="relative h-full rounded-2xl overflow-hidden border-2 border-white shadow-md bg-muted group cursor-pointer"
                                                onClick={() => setIndex(i + 1)}
                                            >
                                                <img
                                                    src={img.secureUrl}
                                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                    alt={`Sub ${i}`}
                                                />
                                                {isLastItem && remainingCount > 0 && (
                                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-[2px]">
                                                        <p className="text-white text-xl font-black italic">+{remainingCount}</p>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* 3. Thông số xe */}
                        <div className="space-y-4">
                            <h3 className="font-black italic uppercase tracking-widest text-sm text-primary/70">Thông số kỹ thuật</h3>
                            <VehicleSpecs vehicle={vehicle} />
                        </div>

                        {/* 4. Thông tin Model (Card ngang) */}
                        <div className="bg-card/50 border border-primary/10 rounded-3xl p-6 flex flex-wrap justify-between gap-8">
                            <div>
                                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Hộp số</p>
                                <p className="font-bold">{getGearShiftLabel(vehicle.vehicleModel.gearShiftType)}</p>
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
            {/* Lightobx để xem preview ảnh */}
            <Lightbox
                open={index >= 0}
                index={index}
                close={() => setIndex(-1)}
                slides={slides ?? []}
                portal={{ root: document.body }}
                render={{
                    buttonPrev: slides && slides.length <= 1 ? () => null : undefined,
                    buttonNext: slides && slides.length <= 1 ? () => null : undefined,
                }}
            />
            <RejectDialog
                open={isRejectDialogOpen}
                onOpenChange={setIsRejectDialogOpen}
                onConfirm={confirmReject}
                isLoading={updateStatusMutation.isPending}
            />
        </div >
    )
}
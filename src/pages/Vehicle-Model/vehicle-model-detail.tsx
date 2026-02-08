import { DetailSkeleton } from "@/common/skeletons/detail-skeleton"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { getGearShiftLabel } from "@/constants/vehicle-model/gear-shift"
import vehicleModelQueries from "@/queries/vehicle-model.query"
import type { BaseDetailProps } from "@/types/commons/dialog.type"
import { formatDate } from "@/utils/date"
import { Battery, CalendarDays, Car, Hash, Info, Settings2, ShieldCheck, Users, Zap } from "lucide-react"

export function VehicleModelDetail({ id, open, onOpenChange }: BaseDetailProps) {
    const { data, isLoading } = vehicleModelQueries.useDetail(id as string)
    const model = data?.data.data

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="sm:max-w-md overflow-y-auto">
                <SheetHeader className="border-b pb-4">
                    <SheetTitle className="flex items-center gap-2 text-xl">
                        <Car className="h-6 w-6 text-primary" />
                        Chi tiết dòng xe
                    </SheetTitle>
                    <SheetDescription>
                        Thông số kỹ thuật chi tiết của dòng xe điện
                    </SheetDescription>
                </SheetHeader>

                {isLoading ? (
                    <DetailSkeleton />
                ) : (
                    <div className="space-y-8 py-6 ml-4">
                        {/* Brand & Model Header */}
                        <div className="flex flex-col items-center justify-center space-y-4 bg-gradient-to-b from-muted/50 to-background p-8 rounded-2xl border border-dashed relative">
                            <div className="bg-white p-3 rounded-xl shadow-sm border">
                                <img
                                    src={model?.vehicleBrand.logoUrl}
                                    alt={model?.vehicleBrand.name}
                                    className="h-10 w-auto object-contain"
                                />
                            </div>
                            <div className="text-center">
                                <h3 className="text-2xl font-black uppercase italic tracking-tighter">
                                    {model?.name}
                                </h3>
                                <p className="text-sm text-muted-foreground font-medium">
                                    Thương hiệu: {model?.vehicleBrand.name}
                                </p>
                            </div>
                        </div>

                        {/* Specs Grid - Hiển thị dạng Card cho "xịn" */}
                        <div className="grid grid-cols-2 gap-3">
                            <SpecCard
                                icon={<Zap className="h-4 w-4 text-amber-500" />}
                                label="Quãng đường"
                                value={`${model?.range} km`}
                                subValue="Chuẩn tối đa"
                            />
                            <SpecCard
                                icon={<Battery className="h-4 w-4 text-emerald-500" />}
                                label="Dung lượng Pin"
                                value={`${model?.batteryCapacity} kWh`}
                                subValue="Lithium-ion"
                            />
                            <SpecCard
                                icon={<Users className="h-4 w-4 text-blue-500" />}
                                label="Sức chứa"
                                value={`${model?.seatingCapacity} ghế`}
                                subValue="Người lớn"
                            />
                            <SpecCard
                                icon={<Settings2 className="h-4 w-4 text-purple-500" />}
                                label="Loại hộp số"
                                value={getGearShiftLabel(model?.gearShiftType)}
                                subValue="Truyền động"
                            />
                        </div>

                        {/* Additional Info */}
                        <div className="space-y-4 pt-2">
                            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                <Info className="h-4 w-4" /> Thông tin hệ thống
                            </h4>
                            <div className="rounded-xl border bg-card p-4 space-y-3">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground flex items-center gap-2">
                                        <CalendarDays className="h-4 w-4" /> Ngày ra mắt
                                    </span>
                                    <span className="font-medium">{model ? formatDate(model.createdAt) : "---"}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground flex items-center gap-2">
                                        <ShieldCheck className="h-4 w-4" /> Cập nhật cuối
                                    </span>
                                    <span className="font-medium">{model ? formatDate(model.updatedAt) : "---"}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 rounded-lg border p-3 bg-card">
                            <Hash className="mt-0.5 h-4 w-4 text-muted-foreground" />
                            <div className="space-y-1 ">
                                <p className="text-xs font-medium text-muted-foreground uppercase">Mã định danh</p>
                                <p className="text-sm font-mono break-all leading-relaxed">{data?.data.data.vehicleModelId}</p>
                            </div>
                        </div>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    )
}

function SpecCard({ icon, label, value, subValue }: { icon: React.ReactNode, label: string, value: string, subValue: string }) {
    return (
        <div className="p-4 rounded-xl border bg-card hover:border-primary/50 transition-colors space-y-1">
            <div className="flex items-center gap-2 text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                {icon} {label}
            </div>
            <div className="text-lg font-bold tracking-tight text-foreground">{value}</div>
            <div className="text-[10px] text-muted-foreground italic">{subValue}</div>
        </div>
    )
}
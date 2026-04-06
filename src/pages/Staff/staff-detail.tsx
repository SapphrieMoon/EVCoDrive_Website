import { DetailSkeleton } from "@/common/skeletons/detail-skeleton"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import staffQueries from "@/queries/staff.query"
import type { BaseDetailProps } from "@/types/commons/dialog.type"
import { CalendarDays, MapPin, Phone, Building2, Hash, Activity } from "lucide-react"
import { format } from "date-fns"

export function StaffDetail({ id, open, onOpenChange }: BaseDetailProps) {
    const { data, isLoading } = staffQueries.useGetById(id as string)
    const staff = data?.data.data

    const formatDate = (dateString?: string) => {
        if (!dateString) return "---"
        return format(new Date(dateString), "dd/MM/yyyy HH:mm")
    }

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="sm:max-w-md overflow-y-auto">
                <SheetHeader className="border-b pb-4">
                    <SheetTitle className="flex items-center gap-2">
                        <Building2 className="h-5 w-5 text-primary" />
                        Chi tiết nhân viên
                    </SheetTitle>
                    <SheetDescription>
                        Quản lý thông tin cá nhân và trạm làm việc của nhân viên
                    </SheetDescription>
                </SheetHeader>

                {isLoading ? (
                    <DetailSkeleton />
                ) : (
                    <div className="space-y-6 py-6 ml-4">
                        {/* Profile Header */}
                        <div className="flex flex-col items-center justify-center space-y-3 bg-muted/30 py-6 rounded-xl border border-dashed">
                            <Avatar className="h-24 w-24 border-4 border-background shadow-sm">
                                <AvatarImage src={staff?.avatar} alt={staff?.name} />
                                <AvatarFallback className="text-2xl">
                                    {staff?.name?.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="text-center space-y-1">
                                <h3 className="font-bold text-xl leading-tight">{staff?.name}</h3>
                                <p className="text-sm text-foreground flex items-center justify-center gap-1.5 mt-1 font-mono bg-card px-2 py-0.5 rounded-full border shadow-sm">
                                    <Phone className="h-3 w-3" />
                                    {staff?.phoneNumber}
                                </p>
                            </div>
                        </div>

                        {/* Working Info */}
                        <div className="grid grid-cols-1 gap-4">
                            <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                <Building2 className="h-4 w-4" /> Nơi làm việc
                            </h4>
                            <div className="rounded-lg border p-4 bg-card space-y-4">
                                <div className="space-y-2">
                                    <span className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Tên trạm</span>
                                    <div className="font-medium text-foreground text-sm">
                                        {staff?.stationName || "Chưa có"}
                                    </div>
                                </div>
                                <div className="space-y-2 border-t pt-3">
                                    <span className="text-xs text-muted-foreground uppercase font-bold tracking-widest">ID Trạm</span>
                                    <div className="font-mono text-xs text-muted-foreground bg-muted p-2 rounded-md">
                                        {staff?.stationId || "---"}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="grid grid-cols-1 gap-4">
                            <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                <MapPin className="h-4 w-4" /> Địa chỉ liên hệ
                            </h4>
                            <div className="rounded-lg border p-4 bg-card space-y-2">
                                <div className="flex items-start gap-2 text-sm">
                                    <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                    <span className="text-foreground leading-relaxed">
                                        {staff?.address || "Chưa cập nhật"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* System Info */}
                        <div className="grid grid-cols-1 gap-4 pt-4 border-t">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                Thông tin hệ thống
                            </h4>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-sm">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Hash className="h-4 w-4" /> ID Nhân viên
                                    </div>
                                    <span className="font-mono text-xs max-w-[150px] truncate" title={staff?.staffId}>
                                        {staff?.staffId}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <CalendarDays className="h-4 w-4" /> Ngày tạo
                                    </div>
                                    <span className="font-mono text-xs">
                                        {formatDate(staff?.createdDate)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Activity className="h-4 w-4" /> Lần cập nhật cuối
                                    </div>
                                    <span className="font-mono text-xs">
                                        {formatDate(staff?.updatedDate)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    )
}

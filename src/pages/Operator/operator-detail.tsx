import { DetailSkeleton } from "@/common/skeletons/detail-skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import operatorQueries from "@/queries/operator.query"
import type { BaseDetailProps } from "@/types/commons/dialog.type"
import { formatDate } from "@/utils/date"
import { Briefcase, Building2, CalendarDays, Fingerprint, Phone, ShieldCheck, User, User2 } from "lucide-react"

export function OperatorDetail({ id, open, onOpenChange }: BaseDetailProps) {
    const { data, isLoading } = operatorQueries.useDetail(id as string)
    const operator = data?.data.data

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="sm:max-w-md overflow-y-auto">
                <SheetHeader className="border-b pb-4">
                    <SheetTitle className="flex items-center gap-2">
                        <User className="h-5 w-5 text-primary" />
                        Thông tin nhân viên
                    </SheetTitle>
                    <SheetDescription>
                        Chi tiết hồ sơ và phân quyền vận hành tại hệ thống
                    </SheetDescription>
                </SheetHeader>

                {isLoading ? (
                    <DetailSkeleton />
                ) : (
                    <div className="space-y-6 py-6 ml-4">
                        {/* Profile Header Card */}
                        <div className="flex flex-col items-center justify-center space-y-4 bg-muted/30 py-8 rounded-xl border border-dashed">
                            <Avatar className="h-20 w-20 border-2 border-background shadow-sm">
                                <AvatarImage src={undefined} alt={operator?.fullName} />
                                <AvatarFallback className="text-xl bg-primary text-primary-foreground">
                                    {operator?.fullName?.slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>

                            <div className="text-center space-y-1">
                                <h3 className="font-bold text-xl leading-tight">{operator?.fullName}</h3>
                                <p className="text-sm text-muted-foreground">{operator?.email}</p>
                            </div>

                            <Badge
                                variant={operator?.isActive ? "default" : "destructive"}
                                className={cn("rounded-full px-4", operator?.isActive && "bg-green-500/10 text-green-500 border-green-500/20")}
                            >
                                <div className={cn("mr-2 h-1.5 w-1.5 rounded-full", operator?.isActive && "animate-pulse", operator?.isActive ? "bg-emerald-500" : "bg-red-500")} />
                                {operator?.isActive ? "Đang hoạt động" : "Đã khóa"}
                            </Badge>
                        </div>

                        {/* Work Assignment Info */}
                        <div className="space-y-4">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                <Briefcase className="h-4 w-4" /> Công việc & Trạm sạc
                            </h4>
                            <div className="rounded-lg border p-4 bg-card space-y-4">
                                <div className="flex items-start gap-3">
                                    <Fingerprint className="h-4 w-4 text-muted-foreground mt-0.5" />
                                    <div className="space-y-1">
                                        <p className="text-xs text-muted-foreground">Mã định danh nhân viên</p>
                                        <p className="text-sm font-mono break-all">{operator?.operatorId}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Building2 className="h-4 w-4 text-muted-foreground mt-0.5" />
                                    <div className="space-y-1">
                                        <p className="text-xs text-muted-foreground">Trạm quản lý</p>
                                        <p className="text-sm font-semibold text-primary italic">
                                            {operator?.stationName || "Chưa phân trạm"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact & Personal Info */}
                        <div className="space-y-4">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                <ShieldCheck className="h-4 w-4" /> Liên hệ & Hệ thống
                            </h4>
                            <div className="rounded-lg border p-4 bg-card space-y-4">
                                <div className="space-y-1 text-sm">
                                    <span className="flex items-center gap-2 text-muted-foreground">
                                        <User2 className="h-4 w-4" /> Mã định danh tài khoản
                                    </span>
                                    <span className="font-mono text-sm  italic">
                                        {operator?.accountId}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-sm border-t pt-4">
                                    <span className="flex items-center gap-2 text-muted-foreground">
                                        <CalendarDays className="h-4 w-4" /> Ngày tham gia
                                    </span>
                                    <span className="font-medium">
                                        {operator ? formatDate(operator.createdDate) : "---"}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="flex items-center gap-2 text-muted-foreground">
                                        <Phone className="h-4 w-4" /> Số điện thoại
                                    </span>
                                    <span className="font-medium">{operator?.phone || "Chưa cập nhật"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    )
}
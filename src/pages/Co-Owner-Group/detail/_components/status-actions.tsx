import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { CO_OWNER_GROUP_STATUS_MAPPING } from "@/constants/status/co-owner-group/co-owner-group-status"
import { cn } from "@/lib/utils"
import bookingQueries from "@/queries/booking.query"
import coOwnerGroupQueries from "@/queries/co-owner-group.query"
import { CoOwnerGroupStatus } from "@/types/co-owner-group.type"
import { ChevronDown } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export function GroupStatusActions({ id }: { id: string }) {
    const { data } = coOwnerGroupQueries.useDetail(id)
    const group = data?.data.data
    const updateStatusMutation = coOwnerGroupQueries.useUpdateStatus()
    const postUsageQuotasMutation = bookingQueries.usePostUsageQuotas()
    const [nextStatus, setNextStatus] = useState<CoOwnerGroupStatus | null>(null)

    if (!group) return null

    const statusConfig = CO_OWNER_GROUP_STATUS_MAPPING[group.status]

    const handleConfirmUpdate = () => {
        if (nextStatus) {
            console.log("data: ", nextStatus, CoOwnerGroupStatus.ReadyToActive)
            if (group.status === CoOwnerGroupStatus.ReadyToActive) {
                postUsageQuotasMutation.mutate(
                    {
                        coOwnerGroupId: id,
                    },
                    {
                        onSuccess: () => {
                            updateStatusMutation.mutate(
                                { id, status: nextStatus },
                                {
                                    onSuccess: () => {
                                        setNextStatus(null)
                                        toast.success("Khởi tạo định mức sử dụng và kích hoạt nhóm thành công")
                                    }
                                }
                            );
                        }
                    },

                );
                return;
            }

            updateStatusMutation.mutate(
                { id, status: nextStatus },
                {
                    onSuccess: () => {
                        setNextStatus(null)
                        toast.success("Cập nhật trạng thái nhóm thành công!")
                    }
                }
            )
        }
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild disabled={!statusConfig.nextStatus}>
                    <Badge
                        variant={statusConfig.color}
                        className="cursor-pointer uppercase tracking-widest px-3 py-1.5 font-bold p-4"
                    >
                        {statusConfig.label}
                        {statusConfig.nextStatus && <ChevronDown className="ml-1.5 w-3 h-3 opacity-50" />}
                    </Badge>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-52">
                    <DropdownMenuLabel>Chuyển trạng thái của nhóm sang: </DropdownMenuLabel>
                    {statusConfig.nextStatus === CoOwnerGroupStatus.Disbaned ? (
                        <DropdownMenuItem variant="destructive" className="cursor-pointer"
                            onClick={() => setNextStatus(statusConfig.nextStatus)}
                        >
                            {statusConfig.actionLabel}
                        </DropdownMenuItem>
                    ) : (
                        <DropdownMenuItem className="cursor-pointer" onClick={() => setNextStatus(statusConfig.nextStatus)}>
                            {statusConfig.actionLabel}
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialog open={!!nextStatus} onOpenChange={() => setNextStatus(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Xác nhận thay đổi</AlertDialogTitle>
                        <AlertDialogDescription>
                            Bạn có chắc chắn muốn chuyển trạng thái sang <span className="font-bold text-primary">
                                {nextStatus && CO_OWNER_GROUP_STATUS_MAPPING[nextStatus].label}</span>?
                            Hành động này <span className="text-destructive font-semibold text-xs">KHÔNG THỂ HOÀN TÁC</span>.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Hủy</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleConfirmUpdate}
                            className={cn(nextStatus === CoOwnerGroupStatus.Disbaned && "bg-destructive text-destructive-foreground hover:bg-destructive/90")}
                        >
                            {updateStatusMutation.isPending ? "Đang xử lý..." : "Xác nhận"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
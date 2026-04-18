import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CO_OWNER_GROUP_STATUS_MAPPING } from "@/constants/status/co-owner-group/co-owner-group-status"
import { cn } from "@/lib/utils"
import bookingQueries from "@/queries/booking.query"
import coOwnerGroupQueries from "@/queries/co-owner-group.query"
import groupWalletQueries from "@/queries/group-wallet.query"
import vehicleQueries from "@/queries/vehicle.query"
import { CoOwnerGroupStatus } from "@/types/co-owner-group.type"
import { VehicleStatus } from "@/types/vehicle.type"
import { ChevronDown, Loader2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export function GroupStatusActions({ id }: { id: string }) {
    const { data } = coOwnerGroupQueries.useDetail(id)
    const group = data?.data.data
    const updateStatusMutation = coOwnerGroupQueries.useUpdateStatus()
    const rejectStatusMutation = coOwnerGroupQueries.useRejectStatus()
    const approveStatusMutation = coOwnerGroupQueries.useApproveStatus()
    const postUsageQuotasMutation = bookingQueries.usePostUsageQuotas()
    const createGroupWalletMutation = groupWalletQueries.useCreate()
    const updateVehicleStatusMutation = vehicleQueries.useUpdateStatus()

    // Dialog state for normal status change (Active, Disbanded, etc.)
    const [nextStatus, setNextStatus] = useState<CoOwnerGroupStatus | null>(null)

    // Dialog state for Rejected — separate to show reason input
    const [showRejectDialog, setShowRejectDialog] = useState(false)
    const [rejectReason, setRejectReason] = useState("")

    if (!group) return null

    const statusConfig = CO_OWNER_GROUP_STATUS_MAPPING[group.status]
    const hasActions = statusConfig.nextActions && statusConfig.nextActions.length > 0

    const handleActionClick = (status: CoOwnerGroupStatus) => {
        if (status === CoOwnerGroupStatus.Rejected) {
            setRejectReason("")
            setShowRejectDialog(true)
        } else {
            setNextStatus(status)
        }
    }

    /** Flow: Active — create wallet + quota first, then update status */
    const handleConfirmActivate = async () => {
        try {
            await Promise.all([
                createGroupWalletMutation.mutateAsync(id),
                postUsageQuotasMutation.mutateAsync({ coOwnerGroupId: id }),
            ])

            toast.success("Khởi tạo định mức và ví nhóm thành công")

            await approveStatusMutation.mutateAsync(id,
                {
                    onSuccess: () => {
                        setNextStatus(null)
                        toast.success("Kích hoạt nhóm thành công!")
                    }
                }
            )
        } catch (error) {
            console.error("Lỗi quy trình kích hoạt:", error)
        }
    }

    /** Flow: Other (e.g. Disbanded) — just update status */
    const handleConfirmUpdate = async () => {
        if (!nextStatus) return

        try {
            if (nextStatus === CoOwnerGroupStatus.Disbaned && group?.vehicleId) {
                await updateVehicleStatusMutation.mutateAsync({
                    id: group.vehicleId,
                    status: VehicleStatus.Decommissioned
                })
            }

            await updateStatusMutation.mutateAsync(
                { id, status: nextStatus },
                {
                    onSuccess: () => {
                        setNextStatus(null)
                        toast.success("Cập nhật trạng thái nhóm thành công!")
                    }
                }
            )
        } catch (error) {
            console.error("Lỗi cập nhật trạng thái:", error)
        }
    }

    const handleConfirmReject = () => {
        if (!rejectReason.trim()) {
            toast.error("Vui lòng nhập lý do từ chối")
            return
        }
        rejectStatusMutation.mutate(
            { id, reason: rejectReason.trim() },
            {
                onSuccess: () => {
                    setShowRejectDialog(false)
                    setRejectReason("")
                    toast.success("Đã từ chối nhóm thành công!")
                }
            }
        )
    }

    const isActivating =
        updateStatusMutation.isPending ||
        approveStatusMutation.isPending ||
        postUsageQuotasMutation.isPending ||
        createGroupWalletMutation.isPending ||
        updateVehicleStatusMutation.isPending

    return (
        <>
            {/* ── Dropdown trigger ── */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild disabled={!hasActions}>
                    <Badge
                        variant={statusConfig.color}
                        className="cursor-pointer uppercase tracking-widest px-3 py-1.5 font-bold p-4"
                    >
                        {statusConfig.label}
                        {hasActions && <ChevronDown className="ml-1.5 w-3 h-3 opacity-50" />}
                    </Badge>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-52">
                    <DropdownMenuLabel>Chuyển trạng thái của nhóm sang: </DropdownMenuLabel>
                    {statusConfig.nextActions?.map((action) => (
                        <DropdownMenuItem
                            key={action.status}
                            variant={action.variant}
                            className="cursor-pointer"
                            onClick={() => handleActionClick(action.status)}
                        >
                            {action.actionLabel}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

            {/* ── AlertDialog: Active / Disbanded (generic confirm) ── */}
            <AlertDialog open={!!nextStatus} onOpenChange={() => setNextStatus(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Xác nhận thay đổi</AlertDialogTitle>
                        <AlertDialogDescription>
                            Bạn có chắc chắn muốn chuyển trạng thái sang{" "}
                            <span className="font-bold text-primary">
                                {nextStatus && CO_OWNER_GROUP_STATUS_MAPPING[nextStatus].label}
                            </span>?
                            Hành động này{" "}
                            <span className="text-destructive font-semibold text-xs">KHÔNG THỂ HOÀN TÁC</span>.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Hủy</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={nextStatus === CoOwnerGroupStatus.Active ? handleConfirmActivate : handleConfirmUpdate}
                            className={cn(
                                nextStatus === CoOwnerGroupStatus.Disbaned &&
                                "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            )}
                        >
                            {isActivating
                                ? <Loader2 className="animate-spin mr-2" />
                                : "Xác nhận"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* ── AlertDialog: Rejected — nhập lý do ── */}
            <AlertDialog open={showRejectDialog} onOpenChange={(open) => {
                if (!open) {
                    setShowRejectDialog(false)
                    setRejectReason("")
                }
            }}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Từ chối nhóm đồng sở hữu</AlertDialogTitle>
                        <AlertDialogDescription>
                            Vui lòng nhập lý do từ chối để thông báo đến các thành viên trong nhóm.
                            Hành động này{" "}
                            <span className="text-destructive font-semibold text-xs">KHÔNG THỂ HOÀN TÁC</span>.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <div className="flex flex-col gap-2 py-1">
                        <Label htmlFor="reject-reason" className="text-sm font-medium">
                            Lý do từ chối <span className="text-destructive">*</span>
                        </Label>
                        <Input
                            id="reject-reason"
                            placeholder="Nhập lý do từ chối..."
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                        />
                    </div>

                    <AlertDialogFooter>
                        <AlertDialogCancel>Hủy</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleConfirmReject}
                            disabled={!rejectReason.trim() || rejectStatusMutation.isPending}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {rejectStatusMutation.isPending
                                ? <Loader2 className="animate-spin mr-2" />
                                : "Xác nhận từ chối"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
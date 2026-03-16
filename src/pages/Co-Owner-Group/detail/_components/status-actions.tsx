import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { CO_OWNER_GROUP_STATUS_MAPPING } from "@/constants/status/co-owner-group/co-owner-group-status"
import { cn } from "@/lib/utils"
import bookingQueries from "@/queries/booking.query"
import coOwnerGroupQueries from "@/queries/co-owner-group.query"
import groupWalletQueries from "@/queries/group-wallet.query"
import { CoOwnerGroupStatus } from "@/types/co-owner-group.type"
import { ChevronDown, Loader2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export function GroupStatusActions({ id }: { id: string }) {
    const { data } = coOwnerGroupQueries.useDetail(id)
    const group = data?.data.data
    const updateStatusMutation = coOwnerGroupQueries.useUpdateStatus()
    const postUsageQuotasMutation = bookingQueries.usePostUsageQuotas()
    const createGroupWalletMutation = groupWalletQueries.useCreate()
    const [nextStatus, setNextStatus] = useState<CoOwnerGroupStatus | null>(null)

    if (!group) return null

    const statusConfig = CO_OWNER_GROUP_STATUS_MAPPING[group.status]

    const handleConfirmUpdate = async () => {
        if (nextStatus) {
            if (group.status === CoOwnerGroupStatus.ReadyToActive) {
                try {
                    // 1. Chạy song song 2 API tiền đề bằng Promise.all
                    // dùng .mutateAsync để có thể dùng await và bắt lỗi bằng try-catch
                    await Promise.all([
                        createGroupWalletMutation.mutateAsync(id),
                        postUsageQuotasMutation.mutateAsync({ coOwnerGroupId: id }),

                    ]);

                    // 2. Nếu đến được đây nghĩa là 2 API trên đều thành công
                    toast.success("Khởi tạo định mức và ví nhóm thành công");

                    // 3. Cuối cùng mới update status
                    await updateStatusMutation.mutateAsync(
                        { id, status: nextStatus },
                        {
                            onSuccess: () => {
                                setNextStatus(null);
                                toast.success("Kích hoạt nhóm thành công!");
                            }
                        }
                    );
                } catch (error) {
                    // 4. Nếu bất kỳ cái nào ở trên lỗi, logic sẽ rơi vào đây
                    // updateStatusMutation sẽ KHÔNG bao giờ được chạy.
                    console.error("Lỗi quy trình kích hoạt:", error);
                    // Lưu ý: toast lỗi đã được xử lý tự động ở file http.ts của bạn rồi.
                }
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
                            {(updateStatusMutation.isPending || postUsageQuotasMutation.isPending || createGroupWalletMutation.isPending)
                                ? <Loader2 className="animate-spin mr-2" />
                                : "Xác nhận"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
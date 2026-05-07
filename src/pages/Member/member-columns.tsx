import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Member } from "@/types/user.type"
import { formatDate } from "@/utils/date"
import type { ColumnDef, Row } from "@tanstack/react-table"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"
import { memberKey } from "@/constants/query-keys/user.key"
import { memberQueries } from "@/queries/user.query"

const BlockUserCell = ({ row }: { row: Row<Member> }) => {
    const { accountId, isBlocked } = row.original;

    const [open, setOpen] = useState(false); `   `
    const [reason, setReason] = useState("");
    const [pendingAction, setPendingAction] = useState<boolean | null>(null);

    const blockMutation = memberQueries.useBlockUser();
    const queryClient = useQueryClient();

    const handleSwitchChange = (checked: boolean) => {
        setPendingAction(checked);
        setReason("");
        setOpen(true);
    };

    const handleConfirm = () => {
        if (pendingAction === true && !reason.trim()) {
            toast.error("Vui lòng nhập lý do khóa tài khoản!");
            return;
        }

        blockMutation.mutate(
            { userId: accountId, isBlocked: pendingAction as boolean, blockReason: reason },
            {
                onSuccess: () => {
                    toast.success(pendingAction ? "Đã khóa tài khoản thành công!" : "Đã mở khóa tài khoản thành công!");
                    setOpen(false);
                    queryClient.invalidateQueries({ queryKey: memberKey.lists() });
                },
                onError: (error: any) => {
                    toast.error(error?.response?.data?.message || "Đã có lỗi xảy ra!");
                }
            }
        );
    };

    return (
        <div className="flex items-center gap-2">
            <Switch
                checked={isBlocked}
                onCheckedChange={handleSwitchChange}
                disabled={blockMutation.isPending}
            />

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{pendingAction ? "Khóa tài khoản" : "Mở khóa tài khoản"}</DialogTitle>
                        <DialogDescription>
                            {pendingAction
                                ? "Bạn có chắc chắn muốn khóa tài khoản này không? Vui lòng nhập lý do."
                                : "Bạn có chắc chắn muốn mở khóa tài khoản này không?"}
                        </DialogDescription>
                    </DialogHeader>

                    {pendingAction && (
                        <div className="grid gap-2 py-4">
                            <Textarea
                                placeholder="Nhập lý do khóa tài khoản..."
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                            />
                        </div>
                    )}

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setOpen(false)} disabled={blockMutation.isPending}>
                            Hủy
                        </Button>
                        <Button variant={pendingAction ? "destructive" : "default"} onClick={handleConfirm} disabled={blockMutation.isPending}>
                            {blockMutation.isPending ? "Đang xử lý..." : "Xác nhận"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export const memberColumns: ColumnDef<Member>[] = [
    {
        accessorKey: "fullName",
        header: "Người dùng",
        enableSorting: false,
        cell: ({ row }) => {
            const { fullName, email } = row.original

            return (
                <div className="flex flex-col">
                    <span className="font-semibold text-sm">{fullName}</span>
                    <span className="text-xs text-muted-foreground">{email}</span>
                </div>
            )
        }
    },
    {
        accessorKey: "phone",
        header: "Số điện thoại",
        enableSorting: false,
        cell: ({ row }) => {
            const phone = row.original.phone
            return (
                <span className="text-sm">
                    {phone || "—"}
                </span>
            )
        }
    },
    {
        accessorKey: "isBlocked",
        header: "Trạng thái",
        enableSorting: false,
        cell: ({ row }) => {
            const { isBlocked, blockReason } = row.original;

            return (
                <div className="flex flex-col gap-1.5 items-start">
                    <Badge
                        variant="outline"
                        className={cn(
                            "font-medium",
                            !isBlocked ? "text-green-600" : "text-red-600"
                        )}
                    >
                        {!isBlocked ? "Hoạt động" : "Bị khóa"}
                    </Badge>
                    {isBlocked && blockReason && (
                        <span className="text-[11px] text-muted-foreground line-clamp-2 max-w-[200px] italic" title={blockReason}>
                            Lý do: {blockReason}
                        </span>
                    )}
                </div>
            )
        }
    },
    {
        accessorKey: "createdDate",
        header: "Ngày tạo",
        enableSorting: false,
        cell: ({ row }) => {
            return (
                <span className="text-sm">
                    {formatDate(row.original.createdDate, false)}
                </span>
            )
        }
    },
    {
        id: "actions",
        header: "Khóa tài khoản",
        enableSorting: false,
        cell: ({ row }) => <BlockUserCell row={row} />
    }
]
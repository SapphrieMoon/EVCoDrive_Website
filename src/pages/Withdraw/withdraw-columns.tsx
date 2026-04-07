import type { ColumnDef } from "@tanstack/react-table"
import type { WalletWithdraw } from "@/types/withdraw.type"
import { WITHDRAW_STATUS } from "@/types/withdraw.type"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock } from "lucide-react"
import withdrawQueries from "@/queries/withdraw.query"
import { formatDate } from "@/utils/date"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

const ActionCell = ({ row }: { row: { original: WalletWithdraw } }) => {
    const putStatusMutation = withdrawQueries.usePutStatus()
    const record = row.original

    const handleApprove = () => {
        putStatusMutation.mutate({
            walletWithdrawId: record.walletWithdrawId,
            status: WITHDRAW_STATUS.Completed
        }, {
            onSuccess: () => {
                toast.success("Phê duyệt thành công")
            }
        })
    }

    if (record.status !== WITHDRAW_STATUS.Pending) return null;

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={handleApprove}
            disabled={putStatusMutation.isPending}
            className="text-green-600 border-green-600 hover:text-green-700 hover:bg-green-50"
        >
            <CheckCircle className="mr-2 h-4 w-4" />
            Phê duyệt
        </Button>
    )
}

export const withdrawColumns: ColumnDef<WalletWithdraw>[] = [
    {
        accessorKey: "walletWithdrawId",
        header: "Mã GD",
        enableSorting: false,
        cell: ({ row }) => <span className="font-mono text-xs">{row.original.walletWithdrawId.substring(0, 8)}...</span>
    },
    {
        accessorKey: "amount",
        header: "Số tiền",
        enableSorting: false,
        cell: ({ row }) => {
            const amount = row.original.amount
            const formatted = new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: row.original.currency || 'VND'
            }).format(amount)
            return <span className="font-semibold text-primary">{formatted}</span>
        }
    },
    {
        accessorKey: "bankName",
        header: "Ngân hàng",
        enableSorting: false,
        cell: ({ row }) => <span className="font-bold">{row.original.bankName}</span>
    },
    {
        accessorKey: "bankAccount",
        header: "Số tài khoản",
        enableSorting: false,
    },
    {
        accessorKey: "requestDate",
        header: "Ngày yêu cầu",
        enableSorting: false,
        cell: ({ row }) => {
            return <span>{row.original.requestDate ? formatDate(row.original.requestDate) : "—"}</span>
        }
    },
    {
        accessorKey: "processedDate",
        header: "Ngày xử lý",
        enableSorting: false,
        cell: ({ row }) => {
            return <span>{row.original.processedDate ? formatDate(row.original.processedDate) : "—"}</span>
        }
    },
    {
        accessorKey: "status",
        header: "Trạng thái",
        enableSorting: false,
        cell: ({ row }) => {
            const status = row.original.status
            if (status === WITHDRAW_STATUS.Pending) {
                return (
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80">
                        <Clock className="mr-1 h-3 w-3" /> Đang chờ
                    </Badge>
                )
            }
            if (status === WITHDRAW_STATUS.Completed) {
                return (
                    <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100/80">
                        <CheckCircle className="mr-1 h-3 w-3" /> Hoàn thành
                    </Badge>
                )
            }
            return <Badge>{status}</Badge>
        }
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ActionCell
    }
]

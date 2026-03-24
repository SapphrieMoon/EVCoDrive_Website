import { TableActionCell } from "@/common/table-action-cell";
import { Badge } from "@/components/ui/badge";
import path from "@/constants/path";
import { EXPENSE_FEE_STATUS_MAPPING } from "@/constants/status/expense-fee/expense-fee-status";
import { cn } from "@/lib/utils";
import { expenseFeeQueries } from "@/queries/expense-fee.query";
import type { ExpenseFee } from "@/types/expense-fee.type";
import { formatDate } from "@/utils/date";
import type { ColumnDef } from "@tanstack/react-table";
import { Banknote, Calendar, ReceiptText } from "lucide-react";
import { generatePath } from "react-router-dom";

export const expenseColumns: ColumnDef<ExpenseFee>[] = [
    {
        accessorKey: "name",
        header: "Tên chi phí & Mô tả",
        enableSorting: false,
        cell: ({ row }) => {
            const expense = row.original
            return (
                <div className="flex flex-col gap-1 py-1">
                    <span className="font-bold text-sm text-primary leading-none">
                        {expense.name}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground group">
                        <ReceiptText className="h-3 w-3 shrink-0" />
                        <span className="truncate max-w-[250px]" title={expense.description}>
                            {expense.description}
                        </span>
                    </div>
                </div>
            )
        }
    },
    {
        accessorKey: "amount",
        header: "Số tiền",
        enableSorting: false,
        cell: ({ row }) => {
            const { amount, currency } = row.original
            // Format tiền Việt Nam cho "pro"
            const formatted = new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: currency || "VND",
            }).format(amount)

            return (
                <div className="flex items-center gap-2">
                    <Banknote className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm font-bold tabular-nums text-emerald-700">
                        {formatted}
                    </span>
                </div>
            )
        }
    },
    {
        accessorKey: "expenseDate",
        header: "Ngày chi phí",
        enableSorting: false,
        cell: ({ row }) => {
            const date = row.original.expenseDate
            return (
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm font-medium">
                        {formatDate(date, false)}
                    </span>
                </div>
            )
        }
    },
    {
        accessorKey: "status",
        header: "Trạng thái",
        enableSorting: false,
        cell: ({ row }) => {
            const status = row.original.status
            const config = EXPENSE_FEE_STATUS_MAPPING[status]

            return (
                <Badge variant={config?.color} className={cn("font-medium")}>
                    {config?.label || status}
                </Badge>
            )
        }
    },
    {
        id: "actions",
        header: "Thao tác",
        enableSorting: false,
        cell: ({ row }) => {
            const id = row.original.expenseFeeId
            const detailPath = generatePath(path.expenseFeeDetail, { id })
            const prefetch = expenseFeeQueries.usePrefetchDetail()

            return (
                <TableActionCell
                    detailUrl={detailPath}
                    onDetailMouseEnter={() => prefetch(id)}
                >
                </TableActionCell>
            )
        }
    }
]
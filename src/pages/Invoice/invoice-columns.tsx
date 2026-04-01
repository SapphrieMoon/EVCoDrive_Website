import { TableActionCell } from "@/common/table-action-cell";
import { Badge } from "@/components/ui/badge";
import INVOICE_STATUS_MAPPING from "@/constants/status/invoice/invoice-status";
import { cn } from "@/lib/utils";
import type { Invoice } from "@/types/invoice.type";
import { formatCurrency } from "@/utils/number";
import type { ColumnDef } from "@tanstack/react-table";
import { Calendar, FileText } from "lucide-react";

export const invoiceColumns: ColumnDef<Invoice>[] = [
    {
        accessorKey: "invoiceNumber",
        header: "Hóa đơn",
        enableSorting: false,
        cell: ({ row }) => {
            const invoice = row.original;

            return (
                <div className="flex flex-col gap-1 py-1">
                    <span className="font-bold text-sm text-primary leading-none flex items-center gap-1">
                        <FileText className="h-3.5 w-3.5" />
                        {invoice.invoiceNumber}
                    </span>
                    <span className="text-xs text-muted-foreground line-clamp-1">
                        {invoice.description}
                    </span>
                </div>
            );
        }
    },

    {
        accessorKey: "totalAmount",
        header: "Số tiền",
        enableSorting: false,
        cell: ({ row }) => {
            const { totalAmount } = row.original;

            return (
                <span className="font-medium text-sm">
                    {formatCurrency(totalAmount)}
                </span>
            );
        }
    },

    {
        accessorKey: "invoiceStatus",
        header: "Trạng thái",
        enableSorting: false,
        cell: ({ row }) => {
            const status = row.original.invoiceStatus;
            const config = INVOICE_STATUS_MAPPING[status];

            return (
                <Badge
                    variant={config.color}
                    className={cn("font-medium")}
                >
                    {config?.label || status}
                </Badge>
            );
        }
    },

    {
        accessorKey: "dueDate",
        header: "Hạn thanh toán",
        enableSorting: false,
        cell: ({ row }) => {
            const { dueDate } = row.original;

            return (
                <div className="flex items-center gap-1 text-sm">
                    <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                    {new Date(dueDate).toLocaleDateString("vi-VN")}
                </div>
            );
        }
    },

    {
        accessorKey: "paidDate",
        header: "Ngày thanh toán",
        enableSorting: false,
        cell: ({ row }) => {
            const { paidDate } = row.original;

            if (!paidDate) {
                return <span className="text-xs text-muted-foreground">--</span>;
            }

            return (
                <div className="flex items-center gap-1 text-sm">
                    <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                    {new Date(paidDate).toLocaleDateString("vi-VN")}
                </div>
            );
        }
    },

    // {
    //     header: "Chi tiết",
    //     enableSorting: false,
    //     cell: ({ row }) => {
    //         const count = row.original.details?.length || 0;

    //         return (
    //             <span className="text-sm font-medium">
    //                 {count} dòng
    //             </span>
    //         );
    //     }
    // },

    {
        id: "actions",
        header: "Thao tác",
        enableSorting: false,
        cell: ({ row, table }) => {
            const id = row.original.invoiceId;

            return (
                <TableActionCell
                    onDetailClick={() => table.options.meta?.onViewDetail?.(id)}
                >
                </TableActionCell>
            );
        }
    }
];
import { TableActionCell } from "@/common/table-action-cell";
import { Badge } from "@/components/ui/badge";
import { CONTRACT_STATUSES, CONTRACT_TYPES, type Contract } from "@/types/contract.type";
import { formatDate } from "@/utils/date";
import type { ColumnDef } from "@tanstack/react-table";
import { CheckCircle2, XCircle } from "lucide-react";

export const contractColumns: ColumnDef<Contract>[] = [
    {
        accessorKey: "contractNumber",
        header: "Số hợp đồng",
        cell: ({ row }) => <span className="font-mono font-medium">{row.getValue("contractNumber")}</span>
    },
    {
        accessorKey: "title",
        header: "Tiêu đề",
    },
    {
        accessorKey: "contractType",
        header: "Loại",
        cell: ({ row }) => {
            const type = row.original.contractType as keyof typeof CONTRACT_TYPES;
            const config = CONTRACT_TYPES[type] || { label: "N/A", variant: "outline" };
            return <Badge variant={config.variant}>{config.label}</Badge>;
        }
    },
    {
        accessorKey: "contractStatuses",
        header: "Trạng thái",
        cell: ({ row }) => {
            const status = row.original.contractStatuses as keyof typeof CONTRACT_STATUSES;
            const config = CONTRACT_STATUSES[status] || { label: "N/A", variant: "secondary" };
            return <Badge variant={config.variant as any}>{config.label}</Badge>;
        }
    },
    {
        accessorKey: "isFullyVerified",
        header: "Xác thực",
        cell: ({ row }) => (
            <div className="">
                {row.original.isFullyVerified ? (
                    <CheckCircle2 className="text-green-500 h-5 w-5" />
                ) : (
                    <XCircle className="text-muted-foreground h-5 w-5" />
                )}
            </div>
        )
    },
    {
        accessorKey: "createdDate",
        header: "Ngày tạo",
        cell: ({ row }) => formatDate(row.original.createdDate, false)
    },
    {
        id: "actions",
        header: "Thao tác",
        cell: ({ row, table }) => {
            const id = row.original.contractId
            return (
                <TableActionCell
                    onDetailClick={() => table.options.meta?.onViewDetail?.(id)}
                >
                    {/* Nút xóa hoặc các nút đặc thù của hợp đồng */}
                </TableActionCell>
            )
        }
    }
]
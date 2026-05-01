import { TableActionCell } from "@/common/table-action-cell";
import { DeleteAction } from "@/common/table-delete-action";
import { format } from "date-fns";
import type { ColumnDef } from "@tanstack/react-table";
import { CalendarDays } from "lucide-react";
import type { ExpenseFeeType } from "@/types/expense-fee.type";
import { expenseFeeTypeQueries } from "@/queries/expense-fee.query";

export const expenseFeeTypeColumns: ColumnDef<ExpenseFeeType>[] = [
    {
        accessorKey: "expenseFeeTypeName",
        header: "Tên loại phí",
        enableSorting: false,
        cell: ({ row }) => {
            const item = row.original;
            return (
                <div className="flex flex-col gap-1 py-1">
                    <span className="font-bold text-sm text-primary leading-none">
                        {item.expenseFeeTypeName}
                    </span>
                </div>
            );
        }
    },
    {
        id: "description",
        header: "Mô tả",
        enableSorting: false,
        cell: ({ row }) => {
            const item = row.original;
            return (
                <div className="text-sm text-muted-foreground whitespace-pre-wrap min-w-[300px]">
                    {item.expenseFeeTypeDescription || "Chưa có mô tả"}
                </div>
            );
        }
    },
    {
        header: "Ngày tạo",
        enableSorting: false,
        cell: ({ row }) => {
            const { createdDate } = row.original;

            return (
                <div className="flex items-center gap-2 text-sm">
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    <span>
                        {format(new Date(createdDate), "dd/MM/yyyy HH:mm")}
                    </span>
                </div>
            );
        }
    },
    {
        header: "Cập nhật lần cuối",
        enableSorting: false,
        cell: ({ row }) => {
            const { updatedDate } = row.original;

            return (
                <div className="flex items-center gap-2 text-sm">
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    <span>
                        {format(new Date(updatedDate), "dd/MM/yyyy HH:mm")}
                    </span>
                </div>
            );
        }
    },
    {
        id: "actions",
        header: "Thao tác",
        enableSorting: false,
        cell: ({ row, table }) => {
            const id = row.original.expenseFeeTypeId;
            const { mutate, isPending } = expenseFeeTypeQueries.useDelete();

            return (
                <TableActionCell
                    onDetailClick={() => table.options.meta?.onViewDetail?.(id)}
                    onEditClick={() => table.options.meta?.onEdit?.(id)}
                >
                    <DeleteAction
                        onConfirm={() => mutate(id)}
                        isLoading={isPending}
                    />
                </TableActionCell>
            );
        }
    }
];
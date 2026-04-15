import { TableActionCell } from "@/common/table-action-cell";
import { DeleteAction } from "@/common/table-delete-action";
import { format } from "date-fns";
import type { ColumnDef } from "@tanstack/react-table";
import { CalendarDays } from "lucide-react";
import type { ExtraFeeType } from "@/types/extra-fee.type";
import { extraFeeTypeQueries } from "@/queries/extra-fee.query";

export const extraFeeTypeColumns: ColumnDef<ExtraFeeType>[] = [
    {
        accessorKey: "extraFeeTypeName",
        header: "Tên loại phụ phí",
        enableSorting: false,
        cell: ({ row }) => {
            const item = row.original;
            const description = (item as any).extraFeeTypeDescription || item.exptraFeeTypeDescription

            return (
                <div className="flex flex-col gap-1 py-1">
                    <span className="font-bold text-sm text-primary leading-none">
                        {item.extraFeeTypeName}
                    </span>
                    <span
                        className="text-xs text-muted-foreground truncate max-w-[250px]"
                        title={description}
                    >
                        {description}
                    </span>
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
            const id = row.original.extraFeeTypeId;
            const { mutate, isPending } = extraFeeTypeQueries.useDelete();

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

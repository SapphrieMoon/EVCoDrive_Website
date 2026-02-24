import { TableActionCell } from "@/common/table-action-cell";
import { Badge } from "@/components/ui/badge";
import path from "@/constants/path";
import coOwnerGroupQueries from "@/queries/co-owner-group.query";
import type { CoOwnerGroup } from "@/types/co-owner-group.type";
import { formatDate } from "@/utils/date";
import type { ColumnDef } from "@tanstack/react-table";
import { Users2, Wallet } from "lucide-react";
import { generatePath } from "react-router-dom";

export const coOwnerGroupColumns: ColumnDef<CoOwnerGroup>[] = [
    {
        accessorKey: "name",
        header: "Tên nhóm",
        enableSorting: false,
        cell: ({ row }) => (
            <div className="flex flex-col space-y-0.5">
                <span className="font-bold text-sm tracking-tight">{row.getValue("name")}</span>
                <span className="text-[10px] text-muted-foreground font-mono truncate max-w-[150px]">
                    ID: {row.original.coOwnerGroupId}
                </span>
            </div>
        )
    },
    {
        accessorKey: "totalShare",
        header: "Tổng suất",
        enableSorting: false,
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <Users2 className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{row.getValue("totalShare")} suất</span>
            </div>
        )
    },
    {
        accessorKey: "sharePrice",
        header: "Giá mỗi suất",
        enableSorting: false,
        cell: ({ row }) => {
            const price = row.getValue("sharePrice") as number;
            return (
                <div className="flex items-center gap-2">
                    <Wallet className="h-4 w-4 text-emerald-500" />
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                        {price.toLocaleString('vi-VN')} đ
                    </span>
                </div>
            );
        }
    },
    {
        accessorKey: "coOwnerGroupStatus",
        header: "Trạng thái",
        enableSorting: false,
        cell: ({ row }) => {
            const status = row.original.coOwnerGroupStatus;
            const isActive = status === "Active";

            return (
                <Badge
                    variant={isActive ? "green" : "red"}
                >
                    {isActive ? "Đang hoạt động" : "Ngừng kích hoạt"}
                </Badge>
            );
        }
    },
    {
        accessorKey: "createdDate",
        header: "Ngày tạo",
        enableSorting: false,
        cell: ({ row }) => (
            <div className="text-muted-foreground">
                {formatDate(row.original.createdDate, false)}
            </div>
        )
    },
    {
        id: "actions",
        header: "",
        enableSorting: false,
        cell: ({ row }) => {
            const id = row.original.coOwnerGroupId;
            // const { mutate, isPending } = coOwnerGroupQueries.useDelete();
            const prefetch = coOwnerGroupQueries.usePrefetchDetail();
            const detailPath = generatePath(path.coOwnerGroupDetail, { id });

            return (
                <TableActionCell
                    detailUrl={detailPath}
                    onDetailMouseEnter={() => prefetch(id)}
                // onEditClick={() => table.options.meta?.onEdit?.(id)}
                >
                    {/* <DeleteAction
                        onConfirm={() => mutate(id)}
                        isLoading={isPending}
                    /> */}
                </TableActionCell>
            );
        }
    }
];
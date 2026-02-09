import { TableActionCell } from "@/common/table-action-cell"
import { DeleteAction } from "@/common/table-delete-action"
import { Badge } from "@/components/ui/badge"
import staffQueries from "@/queries/staff.query"
import type { Staff } from "@/types/staff.type"
import { formatDate } from "@/utils/date"
import type { ColumnDef } from "@tanstack/react-table"

export const staffColumns: ColumnDef<Staff>[] = [
    {
        accessorKey: "fullName",
        header: "Họ và tên",
        cell: ({ row }) => <div className="font-medium">{row.getValue("fullName")}</div>,
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "stationName",
        header: "Trạm quản lý",
        cell: ({ row }) => (
            <Badge variant="outline" className="bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
                {row.getValue("stationName")}
            </Badge>
        ),
    },
    {
        accessorKey: "isActive",
        header: "Trạng thái",
        cell: ({ row }) => {
            const isActive = row.getValue("isActive") as boolean
            return (
                <Badge variant={isActive ? "green" : "red"}>
                    {isActive ? "Đang hoạt động" : "Ngừng kích hoạt"}
                </Badge>
            )
        },
    },
    {
        accessorKey: "createdDate",
        header: "Ngày tạo",
        cell: ({ row }) => {
            const createdDate = row.original.createdDate
            return <div>{formatDate(createdDate)}</div>
        },
    },
    {
        id: "actions",
        cell: ({ row, table }) => {
            const id = row.original.staffId
            const { mutate, isPending } = staffQueries.useDelete()

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
            )
        }
    },
]
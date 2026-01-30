import type { ColumnDef } from "@tanstack/react-table"
import type { VehicleBrand } from "@/types/vehicle-brand.type"
import { TableActionCell } from "@/common/table-action-cell"
import { DeleteAction } from "@/common/table-delete-action"
import vehicleBrandQueries from "@/queries/vehicle-brand.query"
import { formatDate } from "@/utils/date"


export const vehicleBrandColumns: ColumnDef<VehicleBrand>[] = [
    //------------------ Sorting----------------
    // {
    //     accessorKey: "name",
    //     header: ({ column }) => {
    //         return (
    //             <Button
    //                 variant="ghost"
    //                 onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //             >
    //                 Brand Name
    //                 <ArrowUpDown className="ml-2 h-4 w-4" />
    //             </Button>
    //         )
    //     }
    // },
    {
        accessorKey: "name",
        header: "Tên hãng xe"
    },
    {
        accessorKey: "logoUrl",
        header: "Logo",
        cell: ({ row }) => {
            const brand = row.original

            return (
                <img
                    src={brand.logoUrl}
                    alt={brand.name}
                    className="h-8 object-contain flex items-center"
                />
            )
        }
    },
    {
        accessorKey: "createdDate",
        header: "Ngày tạo",
        cell: ({ row }) => formatDate(row.original.createdDate, false)
    },
    {
        accessorKey: "updatedDate",
        header: "Ngày cập nhật",
        cell: ({ row }) => formatDate(row.original.updatedDate, false)
    },
    {
        id: "actions",
        header: "Thao tác",
        cell: ({ row, table }) => {
            const id = row.original.vehicleBrandId
            const { mutate, isPending } = vehicleBrandQueries.useDelete()
            return (
                <TableActionCell onDetailClick={() => table.options.meta?.onViewDetail?.(id)}
                    onEditClick={() => table.options.meta?.onEdit?.(id)}
                >
                    <DeleteAction
                        onConfirm={() => mutate(id)}
                        isLoading={isPending}
                    />
                </TableActionCell>
            )
        }
    }
]

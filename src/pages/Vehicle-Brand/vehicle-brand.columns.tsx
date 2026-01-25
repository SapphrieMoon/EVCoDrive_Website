import type { ColumnDef } from "@tanstack/react-table"
import type { VehicleBrand } from "@/types/vehicle-brand.type"
import { TableActionCell } from "@/common/table-action-cell"


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
        header: "Brand name"
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
        header: "Created Date"
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const id = row.original.vehicleBrandId
            return (
                <TableActionCell detailUrl={`/vehicle-brands/${id}`} editUrl={`/vehicle-brands/${id}/edit`}>
                    {/* <DeleteAction
                        onConfirm={() => mutate(id)}
                        isLoading={isPending}
                    /> */}
                </TableActionCell>
            )
        }
    }
]

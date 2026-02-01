import { TableActionCell } from "@/common/table-action-cell"
import { Badge } from "@/components/ui/badge"
import type { VehicleModel } from "@/types/vehicle-model.type"
import { formatDate } from "@/utils/date"
import type { ColumnDef } from "@tanstack/react-table"
import { Battery, Milestone } from "lucide-react"

export const vehicleModelColumns: ColumnDef<VehicleModel>[] = [
    {
        accessorKey: "name",
        header: "Dòng xe & Hãng",
        cell: ({ row }) => {
            const model = row.original
            return (
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-md border bg-muted/30 p-1 flex items-center justify-center">
                        <img
                            src={model.vehicleBrand.logoUrl}
                            alt={model.vehicleBrand.name}
                            className="max-h-full max-w-full object-contain"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-sm leading-none">{model.name}</span>
                        <span className="text-xs text-muted-foreground">{model.vehicleBrand.name}</span>
                    </div>
                </div>
            )
        }
    },
    {
        accessorKey: "range",
        header: "Quãng đường",
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <Milestone className="h-3 w-3 text-muted-foreground" />
                <span className="font-medium text-emerald-600">{row.original.range} km</span>
            </div>
        )
    },
    {
        accessorKey: "batteryCapacity",
        header: "Dung lượng Pin",
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <Battery className="h-3 w-3 text-muted-foreground" />
                <span>{row.original.batteryCapacity} kWh</span>
            </div>
        )
    },
    {
        accessorKey: "seatingCapacity",
        header: "Số chỗ",
        cell: ({ row }) => (
            <Badge variant="secondary" className="font-normal">
                {row.original.seatingCapacity} chỗ
            </Badge>
        )
    },
    {
        accessorKey: "updatedAt",
        header: "Cập nhật",
        cell: ({ row }) => <span className="text-xs text-muted-foreground">{formatDate(row.original.updatedAt, false)}</span>
    },
    {
        id: "actions",
        header: "Thao tác",
        cell: ({ row, table }) => {
            const id = row.original.vehicleModelId
            // const { mutate, isPending } = vehicleModelQueries.useDelete()

            return (
                <TableActionCell
                    onDetailClick={() => table.options.meta?.onViewDetail?.(id)}
                    onEditClick={() => table.options.meta?.onEdit?.(id)}
                >
                    {/* <DeleteAction
              onConfirm={() => mutate(id)}
              isLoading={isPending}
            /> */}
                </TableActionCell>
            )
        }
    }
]
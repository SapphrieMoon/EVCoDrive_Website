import { TableActionCell } from "@/common/table-action-cell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VEHICLE_STATUS_MAPPING } from "@/constants/status/vehicle/vehicle-status";
import { VEHICLE_STATUS_ACTIONS } from "@/constants/status/vehicle/vehicle-status-action";
import { cn } from "@/lib/utils";
import { VehicleStatus, type Vehicle } from "@/types/vehicle.type";
import { formatDate } from "@/utils/date";
import type { ColumnDef } from "@tanstack/react-table";

export const vehicleColumns: ColumnDef<Vehicle>[] = [
    {
        accessorKey: "thumbnailUrl",
        header: "Ảnh",
        cell: ({ row }) => (
            <img
                src={row.original.thumbnailUrl}
                alt="vehicle"
                className="h-10 w-10 rounded object-cover"
            />
        ),
    },

    {
        accessorKey: "licensePlate",
        header: "Biển số",
    },

    {
        accessorKey: "brandName",
        header: "Hãng",
    },

    {
        accessorKey: "modelName",
        header: "Model",
    },

    {
        accessorKey: "year",
        header: "Năm sản xuất",
    },

    {
        accessorKey: "batteryHealth",
        header: "% Pin còn lại",
        cell: ({ getValue }) => {
            const value = getValue<number>();
            return <span>{value}%</span>;
        },
    },

    {
        accessorKey: "odometer",
        header: "Odo (km)",
        cell: ({ getValue }) => {
            const value = getValue<number>();
            return value.toLocaleString();
        },
    },

    {
        accessorKey: "vehicleStatus",
        header: "Trạng thái",
        cell: ({ getValue }) => {
            const status = getValue<VehicleStatus>();
            const config = VEHICLE_STATUS_MAPPING[status];

            if (!config) return <Badge variant="outline">{status}</Badge>;

            return (
                <Badge
                    variant="outline"
                    className={cn("font-medium", config.color)}
                >
                    {config.label}
                </Badge>
            );
        },
    },

    {
        accessorKey: "createdDate",
        header: "Ngày tạo",
        cell: ({ row }) => formatDate(row.original.createdDate, false)
    },

    {
        id: "actions",
        header: "",
        cell: ({ row, table }) => {
            const id = row.original.vehicleId
            const status = row.original.vehicleStatus
            const actions = VEHICLE_STATUS_ACTIONS[status] ?? []

            return (
                <div className="flex items-center gap-2">
                    {actions.map(action => (
                        <Button
                            key={action.type}
                            size="icon"
                            variant={action.variant ?? "outline"}
                            title={action.label}
                            onClick={() =>
                                table.options.meta?.onAction?.(
                                    id,
                                    status,
                                    action.type
                                )
                            }
                        >
                            <action.icon className="h-4 w-4" />
                        </Button>
                    ))}

                    <TableActionCell onDetailClick={() => table.options.meta?.onViewDetail?.(id)}
                        onEditClick={() => table.options.meta?.onEdit?.(id)}
                    >
                        {/* <DeleteAction
                        onConfirm={() => mutate(id)}
                        isLoading={isPending}
                    /> */}

                    </TableActionCell>

                </div>
            )
        }
    },
]
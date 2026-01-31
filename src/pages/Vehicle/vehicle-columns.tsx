import { TableActionCell } from "@/common/table-action-cell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VEHICLE_STATUS_MAPPING } from "@/constants/status/vehicle/vehicle-status";
import { cn } from "@/lib/utils";
import { VehicleAction, VehicleStatus, type Vehicle } from "@/types/vehicle.type";
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

            const canApproveReject =
                status === VehicleStatus.Pending || status === VehicleStatus.Inspecting
            // const { mutate, isPending } = vehicleQueries.useDelete()
            return (
                <div className="flex items-center gap-2">
                    {canApproveReject && (
                        <>
                            {/* APPROVE */}
                            <Button
                                size="icon"
                                variant="outline"
                                className="text-green-600 hover:bg-green-500/10"
                                onClick={() =>
                                    table.options.meta?.onApprove?.(id, VehicleAction.APPROVE)
                                }
                            >
                                ✓
                            </Button>

                            {/* REJECT */}
                            <Button
                                size="icon"
                                variant="outline"
                                className="text-red-600 hover:bg-red-500/10"
                                onClick={() =>
                                    table.options.meta?.onReject?.(id, VehicleAction.REJECT)
                                }
                            >
                                ✕
                            </Button>
                        </>
                    )}

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
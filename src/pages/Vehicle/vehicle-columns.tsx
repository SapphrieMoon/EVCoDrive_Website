import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Vehicle } from "@/types/vehicle.type";
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
            const status = getValue<string>();

            const variant =
                status === "Approved"
                    ? "default"
                    : status === "PendingApproval"
                        ? "secondary"
                        : "destructive";

            return <Badge variant={variant}>{status}</Badge>;
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
        cell: ({ row }) => (
            <Button
                size="sm"
                variant="outline"
                onClick={() => {
                    console.log("View vehicle", row.original.vehicleId);
                }}
            >
                Chi tiết
            </Button>
        ),
    },
]
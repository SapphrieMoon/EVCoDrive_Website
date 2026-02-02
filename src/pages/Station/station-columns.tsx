import { TableActionCell } from "@/common/table-action-cell";
import { DeleteAction } from "@/common/table-delete-action";
import stationQueries from "@/queries/station.query";
import type { Station } from "@/types/station.type";
import type { ColumnDef } from "@tanstack/react-table";
import { Clock, ExternalLink, MapPin } from "lucide-react";

export const stationColumns: ColumnDef<Station>[] = [
    {
        accessorKey: "name",
        header: "Trạm & Địa chỉ",
        cell: ({ row }) => {
            const station = row.original
            return (
                <div className="flex flex-col gap-1 py-1">
                    <span className="font-bold text-sm text-primary leading-none">
                        {station.name}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground group">
                        <MapPin className="h-3 w-3 shrink-0" />
                        <span className="truncate max-w-[250px]" title={station.address}>
                            {station.address}
                        </span>
                    </div>
                </div>
            )
        }
    },
    {
        header: "Giờ hoạt động",
        cell: ({ row }) => {
            const { openTime, closeTime } = row.original
            // Format chỉ lấy HH:mm
            const formatTime = (isoString: string) =>
                new Date(isoString).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit", hour12: false });

            return (
                <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium tabular-nums">
                        {formatTime(openTime)} - {formatTime(closeTime)}
                    </span>
                </div>
            )
        }
    },
    {
        header: "Vị trí",
        cell: ({ row }) => {
            const { latitude, longitude } = row.original
            const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`

            return (
                <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:underline underline-offset-4"
                >
                    Xem bản đồ
                    <ExternalLink className="h-3 w-3" />
                </a>
            )
        }
    },
    // {
    //   accessorKey: "status",
    //   header: "Trạng thái",
    //   cell: ({ row }) => {
    //     const status = row.original.status
    //     const config = STATION_STATUS_MAPPING[status]

    //     return (
    //       <Badge variant="outline" className={cn("font-medium", config?.className)}>
    //         {config?.label || status}
    //       </Badge>
    //     )
    //   }
    // },
    {
        id: "actions",
        header: "Thao tác",
        cell: ({ row, table }) => {
            const id = row.original.stationId
            const { mutate, isPending } = stationQueries.useDelete()

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
    }
]
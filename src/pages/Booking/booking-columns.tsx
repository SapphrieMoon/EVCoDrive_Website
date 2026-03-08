import { TableActionCell } from "@/common/table-action-cell";
import { Badge } from "@/components/ui/badge";
import { BOOKING_STATUS_MAPPING } from "@/constants/status/booking/booking-status";
import type { Booking, BookingStatus } from "@/types/booking.type";
import { formatDate } from "@/utils/date";
import type { ColumnDef } from "@tanstack/react-table";
import { CalendarDays, Car, Hash } from "lucide-react";

export const bookingColumns: ColumnDef<Booking>[] = [
    {
        accessorKey: "bookingCode",
        header: "Mã đặt xe",
        enableSorting: false,
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <Hash className="h-3 w-3 text-muted-foreground" />
                <span className="font-bold text-sm text-primary tracking-wider">
                    {row.getValue("bookingCode")}
                </span>
            </div>
        )
    },
    {
        accessorKey: "vehicleId",
        header: "Phương tiện",
        enableSorting: false,
        cell: ({ row }) => (
            <div className="flex flex-col">
                <div className="flex items-center gap-1.5 font-medium text-sm">
                    <Car className="h-4 w-4 text-muted-foreground" />
                    <span>ID: {row.original.vehicleId.slice(0, 8)}...</span>
                </div>
                <span className="text-[10px] text-muted-foreground italic truncate max-w-[120px]">
                    Ghi chú: {row.original.purpose}
                </span>
            </div>
        )
    },
    {
        accessorKey: "bookedDates",
        header: "Thời gian",
        enableSorting: false,
        cell: ({ row }) => {
            const totalDays = row.original.totalDays;
            return (
                <div className="flex flex-col space-y-1">
                    <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-blue-500" />
                        <span className="font-semibold">{totalDays} ngày</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground font-mono">
                        {formatDate(row.original.bookedDates[0], false)} - {formatDate(row.original.bookedDates[totalDays - 1], false)}
                    </span>
                </div>
            );
        }
    },
    {
        accessorKey: "bookingStatus",
        header: "Trạng thái",
        enableSorting: false,
        cell: ({ row }) => {
            const status = row.original.bookingStatus as BookingStatus;
            const statusConfig = BOOKING_STATUS_MAPPING[status] || { label: status, color: "secondary" };

            return (
                <Badge
                    variant={statusConfig.color}
                    className="uppercase text-[10px] tracking-widest font-bold"
                >
                    {statusConfig.label}
                </Badge>
            );
        }
    },
    {
        accessorKey: "createdDate",
        header: "Ngày đặt",
        enableSorting: false,
        cell: ({ row }) => (
            <div className="flex flex-col">
                <span className="text-sm">{formatDate(row.original.createdDate, false)}</span>
                <span className="text-[10px] text-muted-foreground italic">
                    By ID: {row.original.memberId.slice(0, 5)}...
                </span>
            </div>
        )
    },
    {
        id: "actions",
        header: "",
        enableSorting: false,
        cell: ({ row, table }) => {
            const id = row.original.bookingId;

            return (
                <TableActionCell
                    onDetailClick={() => table.options.meta?.onViewDetail?.(id)}
                >
                    {/* SapphireMoon có thể thêm nút Hủy booking nhanh ở đây nếu cần */}
                </TableActionCell>
            );
        }
    }
];
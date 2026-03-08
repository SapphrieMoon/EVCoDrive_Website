import type { BadgeVariant } from "@/components/ui/badge";
import { BookingStatus } from "@/types/booking.type";

export const BOOKING_STATUS_MAPPING: Record<BookingStatus, { label: string; color: BadgeVariant }> = {
    // [BookingStatus.Pending]: {
    //     label: "Chờ xử lý",
    //     color: "yellow"
    // },

    // [BookingStatus.Confirmed]: {
    //     label: "Đã xác nhận",
    //     color: "green"
    // },
    [BookingStatus.InUsed]: {
        label: "Đang sử dụng",
        color: "green"
    },
    [BookingStatus.Cancelled]: {
        label: "Đã hủy",
        color: "destructive"
    },
    [BookingStatus.Completed]: {
        label: "Đã hoàn thành",
        color: "teal"
    },
    [BookingStatus.Booked]: {
        label: "Đã đặt",
        color: "blue"
    },
}
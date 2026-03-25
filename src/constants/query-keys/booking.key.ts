import type { AvaliableBookingParams, BookingPaginationParams } from "@/types/booking.type";

export const bookingKey = {
    all: () => ["booking"],
    lists: () => ["booking", "list"],
    listPagination: (params: BookingPaginationParams) => [
        "booking",
        "list",
        "pagination",
        params,
    ],
    details: () => ["booking", "detail"],
    detail: (id: string) => ["booking", "detail", id],
    handoverLogs: (id: string) => ["booking", "handover-logs", id],
    avaliableBooking: (params: AvaliableBookingParams) => [
        "booking",
        "avaliable",
        params,
    ]
}
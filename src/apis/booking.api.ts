import type { BookingDetailResponse, BookingPaginationParams, BookingPaginationResponse, UsageQuotasRequest } from "@/types/booking.type"
import http from "@/utils/http"

export const BOOKING_URL = {
    BASE: "/bookings",
    PAGINATION: "/bookings/pagination",
    USAGE_QUOTAS: "/usage-quotas"
}

const bookingApi = {
    postUsageQuotas: async (params: UsageQuotasRequest) =>
        await http.post(BOOKING_URL.USAGE_QUOTAS, params),
    getAllPagination: async (params: BookingPaginationParams) =>
        await http.get<BookingPaginationResponse>(BOOKING_URL.BASE, { params }),
    getDetail: async (id: string) =>
        await http.get<BookingDetailResponse>(`${BOOKING_URL.BASE}/${id}`),
    patchCheckIn: async (id: string, startOdometer: number) =>
        await http.patch(`${BOOKING_URL.BASE}/${id}/check-in`, null, {
            params: { startOdometer }
        }),
    patchCheckOut: async (id: string, endOdometer: number) =>
        await http.patch(`${BOOKING_URL.BASE}/${id}/check-out`, null, {
            params: { endOdometer }
        }),
}

export default bookingApi
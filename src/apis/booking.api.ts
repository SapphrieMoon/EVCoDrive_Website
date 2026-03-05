import type { UsageQuotasRequest } from "@/types/booking.type"
import http from "@/utils/http"

export const BOOKING_URL = {
    BASE: "/bookings",
    PAGINATION: "/bookings/pagination",
    USAGE_QUOTAS: "/usage-quotas"
}

const bookingApi = {
    postUsageQuotas: async (params: UsageQuotasRequest) =>
        await http.post(BOOKING_URL.USAGE_QUOTAS, params),
}

export default bookingApi
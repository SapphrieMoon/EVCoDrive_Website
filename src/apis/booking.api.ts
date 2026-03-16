import type { BookingDetailResponse, BookingPaginationParams, BookingPaginationResponse, BookingSegmentDetailResponse, CheckInRequest, CheckOutRequest, UsageQuotasRequest } from "@/types/booking.type"
import http from "@/utils/http"

export const BOOKING_URL = {
    BASE: "/bookings",
    PAGINATION: "/bookings/pagination",
    USAGE_QUOTAS: "/usage-quotas",
    HANDOVER_LOGS: "/handover-logs"
}

const bookingApi = {
    postUsageQuotas: async (params: UsageQuotasRequest) =>
        await http.post(BOOKING_URL.USAGE_QUOTAS, params),
    getAllPagination: async (params: BookingPaginationParams) =>
        await http.get<BookingPaginationResponse>(BOOKING_URL.BASE, { params }),
    getDetail: async (id: string) =>
        await http.get<BookingDetailResponse>(`${BOOKING_URL.BASE}/${id}`),
    patchCheckIn: async (bookingId: string, handoverLogId: string, body: CheckInRequest) => {
        const formData = new FormData();
        formData.append("startOdo", body.startOdometer.toString());
        body.images.forEach((file) => formData.append("images", file));

        return await http.patch(
            `${BOOKING_URL.BASE}/${bookingId}/${BOOKING_URL.HANDOVER_LOGS}/${handoverLogId}/check-in`,
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } }
        );
    },
    patchCheckOut: async (bookingId: string, handoverLogId: string, body: CheckOutRequest) => {
        const formData = new FormData();
        formData.append("endOdo", body.endOdometer.toString());
        body.images.forEach((file) => formData.append("images", file));

        return await http.patch(
            `${BOOKING_URL.BASE}/${bookingId}/${BOOKING_URL.HANDOVER_LOGS}/${handoverLogId}/check-out`,
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } }
        );
    },
    getHandoverLogs: async (id: string) =>
        await http.get<BookingSegmentDetailResponse>(`${BOOKING_URL.HANDOVER_LOGS}/${id}`),
}

export default bookingApi
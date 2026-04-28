import type { AvaliableBookingPaginationResponse, AvaliableBookingParams, BookingDetailResponse, BookingPaginationParams, BookingPaginationResponse, BookingSegmentDetailResponse, CheckInRequest, CheckOutRequest, FaceSearchBookingResponse, UsageQuotasRequest } from "@/types/booking.type"
import http from "@/utils/http"

export const BOOKING_URL = {
    BASE: "/bookings",
    PAGINATION: "/bookings/pagination",
    USAGE_QUOTAS: "/usage-quotas",
    HANDOVER_LOGS: "/handover-logs",
    DETECT_DAMAGE: "/detect-damage",
    FACE_SEARCH_BOOKING: "/face/search-booking"
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
        formData.append("startOdometer", body.startOdometer.toString());
        formData.append("startBatteryLevel", body.startBatteryLevel.toString());
        formData.append("checkInNote", body.checkInNote);
        body.images.forEach((file) => formData.append("images", file));

        return await http.patch(
            `${BOOKING_URL.BASE}/${bookingId}${BOOKING_URL.HANDOVER_LOGS}/${handoverLogId}/check-in`,
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } }
        );
    },
    patchCheckOut: async (bookingId: string, handoverLogId: string, body: CheckOutRequest) => {
        const formData = new FormData();
        formData.append("endOdometer", body.endOdometer.toString());
        formData.append("endBatteryLevel", body.endBatteryLevel.toString());
        formData.append("checkOutNote", body.checkOutNote);
        body.images.forEach((file) => formData.append("images", file));

        return await http.patch(
            `${BOOKING_URL.BASE}/${bookingId}${BOOKING_URL.HANDOVER_LOGS}/${handoverLogId}/check-out`,
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } }
        );
    },
    getHandoverLogs: async (id: string) =>
        await http.get<BookingSegmentDetailResponse>(`${BOOKING_URL.HANDOVER_LOGS}/${id}`),
    postDetectDamage: async (images: File[]) => {
        const formData = new FormData();
        images.forEach((file) => formData.append("images", file));
        return await http.post(BOOKING_URL.DETECT_DAMAGE, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    },
    postFaceSearchBooking: async (image: File) => {
        const formData = new FormData();
        formData.append("faceImage", image);
        return await http.post<FaceSearchBookingResponse>(BOOKING_URL.FACE_SEARCH_BOOKING, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    },
    getAvaliableBooking: async ({ vehicleId, ...params }: AvaliableBookingParams) =>
        await http.get<AvaliableBookingPaginationResponse>(`${BOOKING_URL.BASE}/vehicle/${vehicleId}`, { params }),
    deleteBooking: async (bookingId: string, cancellationReason: string, handoverLogId?: string) => {
        const params: Record<string, string> = { cancellationReason }
        if (handoverLogId) {
            params.handoverLogId = handoverLogId
        }
        return await http.delete(`${BOOKING_URL.BASE}/${bookingId}`, { params })
    },
}

export default bookingApi
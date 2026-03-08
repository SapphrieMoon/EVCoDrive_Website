import type { PaginationParams, PaginationResponse } from "./commons/pagination.type";
import type { SuccessResponse } from "./commons/utils.type";

export type UsageQuotasRequest = {
    coOwnerGroupId: string;
}

export const BookingStatus = {
    Booked: "Booked",
    InUsed: "InUsed",
    // Pending: "Pending",
    // Confirmed: "Confirmed",
    Cancelled: "Cancelled",
    Completed: "Completed",
} as const

export type BookingStatus = typeof BookingStatus[keyof typeof BookingStatus]

export const SegmentStatus = {
    Pending: "Pending",
    CheckedIn: "CheckedIn",
    CheckedOut: "CheckedOut",
    // HandedOver: "HandedOver",
    // Returned: "Returned",
} as const

export type SegmentStatus = typeof SegmentStatus[keyof typeof SegmentStatus]

export interface BookingSegment {
    handoverLogId: string;
    checkInDate: string;        // ISO Date string
    checkOutDate: string;       // ISO Date string
    actualCheckInDate: string | null;
    actualCheckOutDate: string | null;
    startOdometer: number;
    endOdometer: number;
    status: SegmentStatus;
}

export interface Booking {
    bookingId: string;
    memberId: string;
    vehicleId: string;
    purpose: string;
    bookingStatus: BookingStatus;
    bookingCode: string;
    bookingDate: string;        // ISO Date string
    bookedDates: string[];      // Array of date strings: ["2026-03-17", ...]
    totalDays: number;
    segments: BookingSegment[];
    note: string;
    createdDate: string;
    updatedDate: string;
}

export type BookingPaginationParams = PaginationParams & {
    bookingCode?: string,
}

export type BookingPaginationResponse = SuccessResponse<PaginationResponse<Booking>>

export type BookingDetailResponse = SuccessResponse<Booking>
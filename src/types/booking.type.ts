import type { PaginationParams, PaginationResponse } from "./commons/pagination.type";
import type { SuccessResponse } from "./commons/utils.type";

export type UsageQuotasRequest = {
    coOwnerGroupId: string;
}

export interface CheckInRequest {
    startOdometer: number;
    images: File[];
    startBatteryLevel: number;
    checkInNote: string;
    actualCheckInDate: string;
}

export interface CheckOutRequest {
    endOdometer: number;
    images: File[];
    endBatteryLevel: number;
    checkOutNote: string;
    actualCheckOutDate: string;
}

export interface DamageResult {
    isDamaged: boolean;
    summary: string;
    damagePercentage: number;
    detailsByImage: Record<string, string>;
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
    Cancelled: "Cancelled",
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
    licensePlate: string;
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

export type FaceSearchBookingResponse = SuccessResponse<{
    memberId: string;
    memberName: string;
    confidence: number;
    bookings: Booking[];
}>;

export interface BookingSegmentDetail {
    handoverLogId: string;
    bookingId: string;
    operatorId: string | null;
    checkInDate: string;
    checkOutDate: string;
    actualCheckInDate: string | null;
    actualCheckOutDate: string | null;
    status: SegmentStatus;
    startOdo: number;
    endOdo: number;
    handoverType: string;
    odometerReading: number;
    startBatteryLevel: number;
    endBatteryLevel: number;
    fuelLevel: string;
    exteriorCondition: string;
    interiorCondition: string;
    checkInNote: string;
    checkOutNote: string;
    signatureUrl: string;
    checkInImages: string[];
    checkOutImages: string[];
    handoverDate: string; // ISO 8601 Date string
    createdDate: string;  // ISO 8601 Date string
    updatedDate: string;  // ISO 8601 Date string
}

export interface AvaliableBooking {
    bookingId: string
    memberId: string
    vehicleId: string
    purpose: string
    bookingStatus: BookingStatus
    bookingCode: string
    bookingDate: string // ISO date string
    bookedDates: string[] // dạng YYYY-MM-DD
    totalDays: number
    segments: BookingSegment[]
    note: string
    createdDate: string // ISO date string
    updatedDate: string // ISO date string
}

export type AvaliableBookingResponse = SuccessResponse<PaginationResponse<AvaliableBooking>>

export type AvaliableBookingParams = {
    vehicleId: string;
    month: number;
    year: number;
}

export type BookingPaginationParams = PaginationParams & {
    bookingCode?: string,
    bookedDate?: string,
}

export type BookingPaginationResponse = SuccessResponse<PaginationResponse<Booking>>

export type BookingDetailResponse = SuccessResponse<Booking>

export type BookingSegmentDetailResponse = SuccessResponse<BookingSegmentDetail>

export type AvaliableBookingPaginationResponse = SuccessResponse<PaginationResponse<AvaliableBooking>>
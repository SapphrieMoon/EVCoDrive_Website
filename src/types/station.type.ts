import type { BaseCrudFormProps } from "./commons/crud-form.type"
import type { PaginationParams, PaginationResponse } from "./commons/pagination.type"
import type { SuccessResponse } from "./commons/utils.type"

export const StationStatus = {
    Active: "Active",
    Inactive: "Inactive",
} as const

export type StationStatus = typeof StationStatus[keyof typeof StationStatus]

export const OpenStatus = {
    Open: "open",
    Closed: "closed",
} as const

export type OpenStatus = typeof OpenStatus[keyof typeof OpenStatus]

export interface Station {
    stationId: string
    name: string
    address: string
    openTime: string    // ISO string
    closeTime: string   // ISO string
    latitude: number
    longitude: number
    isOpen: OpenStatus
    status: StationStatus
    createdDate: string
    updatedDate: string
}

export interface CurrentStation {
    stationId: string;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
}

export type StationPaginationParams = PaginationParams & {
    searchTerm?: string,
    status?: StationStatus,
}

export type StationPaginationResponse = SuccessResponse<PaginationResponse<Station>>

export type StationDetailResponse = SuccessResponse<Station>

export type StationListResponse = SuccessResponse<Station[]>

export type StationFormProps = BaseCrudFormProps & {}

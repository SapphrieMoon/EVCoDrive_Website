import type { BaseCrudFormProps } from "./commons/crud-form.type"
import type { PaginationParams, PaginationResponse } from "./commons/pagination.type"
import type { SuccessResponse } from "./commons/utils.type"

export enum StationStatus {
    Active = "Active",
    Inactive = "Inactive",
    Maintenance = "Maintenance",
    Closed = "Closed"
}

export interface Station {
    stationId: string
    name: string
    address: string
    openTime: string    // ISO string
    closeTime: string   // ISO string
    latitude: number
    longitude: number
    status: StationStatus
    createdDate: string
    updatedDate: string
}

export type StationPaginationParams = PaginationParams & {
    searchTerm?: string,
    status?: StationStatus,
}

export type StationPaginationResponse = SuccessResponse<PaginationResponse<Station>>

export type StationDetailResponse = SuccessResponse<Station>

export type StationFormProps = BaseCrudFormProps & {}
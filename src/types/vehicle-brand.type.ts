import type { BaseCrudFormProps } from "./crud-form.type"
import type { PaginationParams, PaginationResponse } from "./pagination.type"
import type { SuccessResponse } from "./utils.type"

export interface VehicleBrand {
    vehicleBrandId: string
    name: string
    logoUrl: string
    createdDate: string
    updatedDate: string
}

export interface VehicleBrandRequest {
    name: string
    logoUrl: string
}

export interface VehicleBrandSummary {
    vehicleBrandId: string
    name: string
    logoUrl: string
}

export type VehicleBrandPaginationParams = PaginationParams & {
    searchTermByName?: string
}

export type VehicleBrandPaginationResponse =
    SuccessResponse<PaginationResponse<VehicleBrand>>

export type VehicleBrandDetailResponse =
    SuccessResponse<VehicleBrand>

export type VehicleBrandFormProps = BaseCrudFormProps & {}
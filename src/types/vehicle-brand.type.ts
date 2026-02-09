import type { BaseCrudFormProps } from "./commons/crud-form.type"
import type { PaginationParams, PaginationResponse } from "./commons/pagination.type"
import type { SuccessResponse } from "./commons/utils.type"

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

export type VehicleBrandListResponse = SuccessResponse<VehicleBrand[]>
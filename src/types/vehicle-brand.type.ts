import type { PaginationParams, PaginationResponse } from "./pagination.type"
import type { SuccessResponse } from "./utils.type"

export interface VehicleBrand {
    vehicleBrandId: string
    name: string
    logoUrl: string
    createdDate: string
    updatedDate: string
}

export interface VehicleBrandPaginationParams extends PaginationParams {
    searchTermByName?: string
}

export type VehicleBrandPaginationResponse =
    SuccessResponse<PaginationResponse<VehicleBrand>>
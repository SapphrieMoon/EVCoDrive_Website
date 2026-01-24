import type { PaginationParams, PaginationResponse } from "./pagination.type"

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
    PaginationResponse<VehicleBrand>
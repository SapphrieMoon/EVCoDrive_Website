import type { PaginationParams, PaginationResponse } from "./commons/pagination.type"
import type { SuccessResponse } from "./commons/utils.type"
import type { VehicleBrandSummary } from "./vehicle-brand.type"

export interface VehicleModel {
    vehicleModelId: string
    name: string
    vehicleBrand: VehicleBrandSummary
    gearShiftType: string
    range: number
    batteryCapacity: number
    seatingCapacity: number
    createdAt: string
    updatedAt: string
}

export type VehicleModelPaginationParams = PaginationParams & {
    searchTermByName?: string
}

export type VehicleModelPaginationResponse = SuccessResponse<PaginationResponse<VehicleModel>>

export type VehicleModelDetailResponse = SuccessResponse<VehicleModel>
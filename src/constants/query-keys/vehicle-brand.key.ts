import type { VehicleBrandPaginationParams } from "@/types/vehicle-brand.type";

export const vehicleBrandKey = {
    getAllPagination: (params: VehicleBrandPaginationParams) => ['vehicle-brand', params],
}
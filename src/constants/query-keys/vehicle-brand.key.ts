import type { VehicleBrandPaginationParams } from "@/types/vehicle-brand.type";

export const vehicleBrandKey = {
    getAll: () => ['vehicle-brand'],
    getAllPagination: (params: VehicleBrandPaginationParams) => ['vehicle-brand', params],
}
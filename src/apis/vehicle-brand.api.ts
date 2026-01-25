import type { VehicleBrandPaginationParams, VehicleBrandPaginationResponse } from "@/types/vehicle-brand.type";
import http from "@/utils/http"

export const URL_VEHICLE_BRAND = {
    GET_ALL_PAGINATION: "/vehiclebrands/pagination"
}

const vehicleBrandApi = {
    getAllPagination: async (params: VehicleBrandPaginationParams) =>
        await http.get<VehicleBrandPaginationResponse>(URL_VEHICLE_BRAND.GET_ALL_PAGINATION, { params })
}

export default vehicleBrandApi;
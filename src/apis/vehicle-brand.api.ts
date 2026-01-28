import type { VehicleBrandDetailResponse, VehicleBrandPaginationParams, VehicleBrandPaginationResponse } from "@/types/vehicle-brand.type";
import http from "@/utils/http"

export const URL_VEHICLE_BRAND = {
    GET_ALL: "/vehiclebrands",
    GET_ALL_PAGINATION: "/vehiclebrands/pagination"
}

const vehicleBrandApi = {
    getAll: async () =>
        await http.get<VehicleBrandPaginationResponse>(URL_VEHICLE_BRAND.GET_ALL),
    getAllPagination: async (params: VehicleBrandPaginationParams) =>
        await http.get<VehicleBrandPaginationResponse>(URL_VEHICLE_BRAND.GET_ALL_PAGINATION, { params }),
    delete: async (id: string) =>
        await http.delete<VehicleBrandPaginationResponse>(`/vehiclebrands/${id}`),
    detail: async (id: string) =>
        await http.get<VehicleBrandDetailResponse>(`/vehiclebrands/${id}`)
}

export default vehicleBrandApi;
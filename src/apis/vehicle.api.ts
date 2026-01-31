import type { VehicleDetailResponse, VehiclePaginationParams, VehiclePaginationResponse } from "@/types/vehicle.type"
import http from "@/utils/http"

export const URL_VEHICLE = {
    GET_ALL: "/vehicles",
    GET_ALL_PAGINATION: "/vehicles/pagination",
}

export const vehicleApi = {
    getAll: async () =>
        await http.get<VehiclePaginationResponse>(URL_VEHICLE.GET_ALL),
    getAllPagination: async (params: VehiclePaginationParams) =>
        await http.get<VehiclePaginationResponse>(URL_VEHICLE.GET_ALL_PAGINATION, { params }),
    getDetail: async (id: string) =>
        await http.get<VehicleDetailResponse>(URL_VEHICLE.GET_ALL, { params: { id } }),
    // create: async (data: VehicleFormValues) =>
    //     await http.post<VehicleDetailResponse>(URL_VEHICLE.CREATE, data),
    // update: async (id: string, data: VehicleFormValues) =>
    //     await http.put<VehicleDetailResponse>(URL_VEHICLE.UPDATE, { params: { id }, data }),
    delete: async (id: string) =>
        await http.delete<VehicleDetailResponse>(URL_VEHICLE.GET_ALL, { params: { id } }),
}
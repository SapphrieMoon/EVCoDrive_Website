import type { VehicleModelDetailResponse, VehicleModelPaginationParams, VehicleModelPaginationResponse } from "@/types/vehicle-model.type"
import http from "@/utils/http"

export const VEHICLE_MODEL_API = {
    GET_ALL: "/vehiclemodels",
    PAGINATION: "/vehiclemodels/pagination",
}

export const vehicleModelApi = {
    getAll: async () =>
        await http.get<VehicleModelDetailResponse[]>(VEHICLE_MODEL_API.GET_ALL),
    getPagination: async (params: VehicleModelPaginationParams) =>
        await http.get<VehicleModelPaginationResponse>(VEHICLE_MODEL_API.PAGINATION, { params }),
    getDetail: async (id: string) =>
        await http.get<VehicleModelDetailResponse>(`/vehiclemodels/${id}`),
}
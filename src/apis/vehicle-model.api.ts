import type { VehicleModelFormValues } from "@/schema/vehicle-model.schema";
import type { VehicleModelDetailResponse, VehicleModelListResponse, VehicleModelPaginationParams, VehicleModelPaginationResponse } from "@/types/vehicle-model.type"
import http from "@/utils/http"

export const VEHICLE_MODEL_URL = {
    BASE: "/vehiclemodels",
    PAGINATION: "/vehiclemodels/pagination",
}

export const vehicleModelApi = {
    getAll: async () =>
        await http.get<VehicleModelListResponse>(VEHICLE_MODEL_URL.BASE),
    getPagination: async (params: VehicleModelPaginationParams) =>
        await http.get<VehicleModelPaginationResponse>(VEHICLE_MODEL_URL.PAGINATION, { params }),
    getDetail: async (id: string) =>
        await http.get<VehicleModelDetailResponse>(`${VEHICLE_MODEL_URL.BASE}/${id}`),
    create: async (data: VehicleModelFormValues) =>
        await http.post<VehicleModelDetailResponse>(VEHICLE_MODEL_URL.BASE, data),
    update: async ({ id, data }: { id: string, data: VehicleModelFormValues }) =>
        await http.put<VehicleModelDetailResponse>(`${VEHICLE_MODEL_URL.BASE}/${id}`, data),
    delete: async (id: string) =>
        await http.delete(`${VEHICLE_MODEL_URL.BASE}/${id}`),
}

export default vehicleModelApi;
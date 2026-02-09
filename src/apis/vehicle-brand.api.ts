import type { VehicleBrandFormValues } from "@/schema/vehicle-brand.schema";
import type { VehicleBrandDetailResponse, VehicleBrandListResponse, VehicleBrandPaginationParams, VehicleBrandPaginationResponse } from "@/types/vehicle-brand.type";
import http from "@/utils/http"

export const VEHICLE_BRAND_URL = {
    BASE: "/vehiclebrands",
    PAGINATION: "/vehiclebrands/pagination"
}

const vehicleBrandApi = {
    getAll: async () =>
        await http.get<VehicleBrandListResponse>(VEHICLE_BRAND_URL.BASE),
    getAllPagination: async (params: VehicleBrandPaginationParams) =>
        await http.get<VehicleBrandPaginationResponse>(VEHICLE_BRAND_URL.PAGINATION, { params }),
    detail: async (id: string) =>
        await http.get<VehicleBrandDetailResponse>(`${VEHICLE_BRAND_URL.BASE}/${id}`),
    create: async (data: VehicleBrandFormValues) =>
        await http.post<VehicleBrandDetailResponse>(VEHICLE_BRAND_URL.BASE, data),
    update: async (id: string, data: VehicleBrandFormValues) =>
        await http.put<VehicleBrandDetailResponse>(`${VEHICLE_BRAND_URL.BASE}/${id}`, data),
    delete: async (id: string) =>
        await http.delete<VehicleBrandPaginationResponse>(`${VEHICLE_BRAND_URL.BASE}/${id}`),
}

export default vehicleBrandApi;
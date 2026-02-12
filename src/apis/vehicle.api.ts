import type { VehicleDetailResponse, VehiclePaginationParams, VehiclePaginationResponse, VehicleStatus } from "@/types/vehicle.type"
import http from "@/utils/http"

export const VEHICLE_URL = {
    BASE: "/vehicles",
    PAGINATION: "/vehicles/pagination",
}

export const vehicleApi = {
    getAll: async () =>
        await http.get<VehiclePaginationResponse>(VEHICLE_URL.BASE),
    getAllPagination: async (params: VehiclePaginationParams) =>
        await http.get<VehiclePaginationResponse>(VEHICLE_URL.PAGINATION, { params }),
    getDetail: async (id: string) =>
        await http.get<VehicleDetailResponse>(`${VEHICLE_URL.BASE}/${id}`),
    // create: async (data: VehicleFormValues) =>
    //     await http.post<VehicleDetailResponse>(VEHICLE_URL.CREATE, data),
    // update: async (id: string, data: VehicleFormValues) =>
    //     await http.put<VehicleDetailResponse>(VEHICLE_URL.UPDATE, { params: { id }, data }),
    updateStatus: (id: string, status: VehicleStatus, rejectionReason?: string) =>
        http.patch(`${VEHICLE_URL.BASE}/${id}/status`, null, { params: { status, rejectionReason } }),
    delete: async (id: string) =>
        await http.delete<VehicleDetailResponse>(VEHICLE_URL.BASE, { params: { id } }),
}

export default vehicleApi;
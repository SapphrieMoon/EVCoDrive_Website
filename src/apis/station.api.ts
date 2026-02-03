import type { StationFormValues } from "@/schema/station.schema"
import type { StationDetailResponse, StationPaginationParams, StationPaginationResponse } from "@/types/station.type"
import http from "@/utils/http"

export const STATION_URL = {
    BASE: "/stations",
    PAGINATION: "/stations/pagination"
}

export const stationApi = {
    getAll: async () =>
        await http.get<StationDetailResponse>(STATION_URL.BASE),
    getAllPagination: async (params: StationPaginationParams) =>
        await http.get<StationPaginationResponse>(STATION_URL.PAGINATION, { params }),
    getDetail: async (id: string) =>
        await http.get<StationDetailResponse>(`${STATION_URL.BASE}/${id}`),
    create: async (data: StationFormValues) =>
        await http.post<StationDetailResponse>(STATION_URL.BASE, data),
    update: async (id: string, data: StationFormValues) =>
        await http.put<StationDetailResponse>(`${STATION_URL.BASE}/${id}`, data),
    delete: async (id: string) =>
        await http.delete<StationPaginationResponse>(`${STATION_URL.BASE}/${id}`),
}
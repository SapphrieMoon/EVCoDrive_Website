import type { StaffFormValues } from "@/schema/staff.schema"
import type { StaffDetailResponse, StaffPaginationParams, StaffPaginationResponse } from "@/types/staff.type"
import http from "@/utils/http"

export const STAFF_URL = {
    BASE: "/staffs",
    PAGINATION: "/staffs/pagination"
}

export const staffApi = {
    getAll: async () =>
        await http.get<StaffDetailResponse>(STAFF_URL.BASE),
    getAllPagination: async (params: StaffPaginationParams) =>
        await http.get<StaffPaginationResponse>(STAFF_URL.PAGINATION, { params }),
    getDetail: async (id: string) =>
        await http.get<StaffDetailResponse>(`${STAFF_URL.BASE}/${id}`),
    create: async (data: StaffFormValues) =>
        await http.post<StaffDetailResponse>(STAFF_URL.BASE, data),
    update: async (id: string, data: StaffFormValues) =>
        await http.put<StaffDetailResponse>(`${STAFF_URL.BASE}/${id}`, data),
    delete: async (id: string) =>
        await http.delete<StaffPaginationResponse>(`${STAFF_URL.BASE}/${id}`),
}
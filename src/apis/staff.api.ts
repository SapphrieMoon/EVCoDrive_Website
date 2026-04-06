import type { StaffPaginationParams, StaffPaginationResponse, StaffResponse } from "@/types/staff.type"
import type { StaffFormValues } from "@/schema/staff.schema"
import http from "@/utils/http"

export const STAFF_URL = {
    STAFF: "/staffs",
}

export const staffApi = {
    getAllPagination: async (params: StaffPaginationParams) =>
        await http.get<StaffPaginationResponse>(STAFF_URL.STAFF, { params }),
    delete: async (id: string) =>
        await http.delete<void>(`${STAFF_URL.STAFF}/${id}`),
    getById: async (id: string) =>
        await http.get<StaffResponse>(`${STAFF_URL.STAFF}/${id}`),
    create: async (body: StaffFormValues) =>
        await http.post<StaffResponse>(STAFF_URL.STAFF, body),
    update: async (id: string, body: StaffFormValues) =>
        await http.put<StaffResponse>(`${STAFF_URL.STAFF}/${id}`, body),
}
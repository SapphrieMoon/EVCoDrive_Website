import { CoOwnerGroupStatus, type CoOwnerGroupDetailResponse, type CoOwnerGroupListResponse, type CoOwnerGroupPaginationParams, type CoOwnerGroupPaginationResponse } from "@/types/co-owner-group.type"
import http from "@/utils/http"

const COOWNERGROUP_API = {
    BASE: "/coownergroups",
    PAGINATION: "/coownergroups/pagination",
}

export const coOwnerGroupApi = {
    getAll: async () =>
        await http.get<CoOwnerGroupListResponse>(COOWNERGROUP_API.BASE),
    getAllPagination: async (params: CoOwnerGroupPaginationParams) =>
        await http.get<CoOwnerGroupPaginationResponse>(COOWNERGROUP_API.PAGINATION, { params }),
    getDetail: async (id: string) =>
        await http.get<CoOwnerGroupDetailResponse>(`${COOWNERGROUP_API.BASE}/${id}/details`),
    // create: async (data: CoOwnerGroupFormValues) =>
    //     await http.post<CoOwnerGroupDetailResponse>(COOWNERGROUP_API.BASE, data),
    // update: async (id: string, data: CoOwnerGroupFormValues) =>
    //     await http.put<CoOwnerGroupDetailResponse>(`${COOWNERGROUP_API.BASE}/${id}`, data),
    delete: async (id: string) =>
        await http.delete<CoOwnerGroupPaginationResponse>(`${COOWNERGROUP_API.BASE}/${id}`),
    updateStatus: async (id: string, status: CoOwnerGroupStatus) =>
        await http.patch<CoOwnerGroupDetailResponse>(`${COOWNERGROUP_API.BASE}/${id}/status`, null,
            { params: { status } }),
    rejectStatus: async (id: string, reason: string) =>
        await http.patch<CoOwnerGroupDetailResponse>(`${COOWNERGROUP_API.BASE}/${id}/reject`, null,
            { params: { reason } }),
    approveStatus: async (id: string) =>
        await http.patch<CoOwnerGroupDetailResponse>(`${COOWNERGROUP_API.BASE}/${id}/approve`, null),
}
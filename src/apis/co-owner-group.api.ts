import type { CoOwnerGroupDetailResponse, CoOwnerGroupListResponse, CoOwnerGroupPaginationParams, CoOwnerGroupPaginationResponse } from "@/types/co-owner-group.type"
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
        await http.get<CoOwnerGroupDetailResponse>(`${COOWNERGROUP_API.BASE}/${id}`),
    // create: async (data: CoOwnerGroupFormValues) =>
    //     await http.post<CoOwnerGroupDetailResponse>(COOWNERGROUP_API.BASE, data),
    // update: async (id: string, data: CoOwnerGroupFormValues) =>
    //     await http.put<CoOwnerGroupDetailResponse>(`${COOWNERGROUP_API.BASE}/${id}`, data),
    delete: async (id: string) =>
        await http.delete<CoOwnerGroupPaginationResponse>(`${COOWNERGROUP_API.BASE}/${id}`),
}
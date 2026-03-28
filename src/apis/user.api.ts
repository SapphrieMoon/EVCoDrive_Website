import type { MemberPaginationParams, MemberPaginationResponse, MemberProfileResponse } from "@/types/user.type"
import http from "@/utils/http"

export const USER_API = {
    MEMBER: "members",
    MEMBER_PAGINATION: "/members/pagination"
}

export const userApi = {
    getMemberProfile: async (id: string) =>
        await http.get<MemberProfileResponse>(`${USER_API.MEMBER}/${id}/profile`),
    getMemberPagination: async (params: MemberPaginationParams) =>
        await http.get<MemberPaginationResponse>(USER_API.MEMBER_PAGINATION, { params }),
}
import type { MemberPaginationParams, MemberPaginationResponse, MemberProfileResponse, UserProfileResponse } from "@/types/user.type"
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
    getUserProfile: async () =>
        await http.get<UserProfileResponse>(`/auth/profile`),
    putBlockUser: async (userId: string, isBlocked: boolean, blockReason: string) =>
        await http.put(`/user/block`, { userId, isBlocked, blockReason }),
}
import type { MemberProfileResponse } from "@/types/user.type"
import http from "@/utils/http"

export const USER_API = {
    MEMBER: "members"
}

export const userApi = {
    getMemberProfile: async (id: string) =>
        await http.get<MemberProfileResponse>(`${USER_API.MEMBER}/${id}/profile`),
}
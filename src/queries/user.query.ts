import { userApi } from "@/apis/user.api"
import { memberKey } from "@/constants/query-keys/user.key"
import type { MemberPaginationParams } from "@/types/user.type"
import { useMutation, useQuery } from "@tanstack/react-query"

const memberQueries = {
    usePagination: (params: MemberPaginationParams) => {
        return useQuery({
            queryKey: memberKey.listPagination(params),
            queryFn: () => userApi.getMemberPagination(params),
        })
    },

    useGetMemberProfile: (id: string) => {
        return useQuery({
            queryKey: memberKey.profile(id),
            queryFn: () => userApi.getMemberProfile(id),
            enabled: !!id,
        })
    },

    useGetUserProfile: () => {
        return useQuery({
            queryKey: memberKey.profile('profile'),
            queryFn: () => userApi.getUserProfile(),
        })
    },

    useBlockUser: () => {
        return useMutation({
            mutationFn: (params: { userId: string, isBlocked: boolean, blockReason: string }) =>
                userApi.putBlockUser(params.userId, params.isBlocked, params.blockReason),
        })
    }
}

export { memberQueries }
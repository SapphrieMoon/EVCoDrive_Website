import { userApi } from "@/apis/user.api"
import { memberKey } from "@/constants/query-keys/user.key"
import type { MemberPaginationParams } from "@/types/user.type"
import { useQuery } from "@tanstack/react-query"

const userQueries = {
    useGetMemberProfile: (id: string) => {
        return useQuery({
            queryKey: memberKey.profile(id),
            queryFn: () => userApi.getMemberProfile(id),
            enabled: !!id,
        })
    }
}

const memberQueries = {
    usePagination: (params: MemberPaginationParams) => {
        return useQuery({
            queryKey: memberKey.listPagination(params),
            queryFn: () => userApi.getMemberPagination(params),
        })
    }
}

export { userQueries, memberQueries }
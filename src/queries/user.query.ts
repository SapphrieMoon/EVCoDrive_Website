import { userApi } from "@/apis/user.api"
import { userKey } from "@/constants/query-keys/user.key"
import { useQuery } from "@tanstack/react-query"

const userQueries = {
    useGetMemberProfile: (id: string) => {
        return useQuery({
            queryKey: userKey.profile(id),
            queryFn: () => userApi.getMemberProfile(id),
            enabled: !!id,
        })
    }
}

export default userQueries
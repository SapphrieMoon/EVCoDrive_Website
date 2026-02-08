import { staffApi } from "@/apis/staff.api"
import { staffKey } from "@/constants/query-keys/staff.key"
import type { StaffPaginationParams } from "@/types/staff.type"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const staffQueries = {
    useAll: () => {
        return useQuery({
            queryKey: staffKey.all(),
            queryFn: staffApi.getAll
        })
    },

    usePagination: (params: StaffPaginationParams) => {
        return useQuery({
            queryKey: staffKey.listPagination(params),
            queryFn: () => staffApi.getAllPagination(params),
            placeholderData: (previousData) => previousData,
        })
    },

    useDetail: (id: string) => {
        return useQuery({
            queryKey: staffKey.detail(id),
            queryFn: () => staffApi.getDetail(id),
            enabled: !!id
        })
    },

    useDelete: () => {
        const queryClient = useQueryClient()

        return useMutation({
            mutationFn: (id: string) => staffApi.detele(id),
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: staffKey.lists()
                })
            }
        })
    }
}

export default staffQueries
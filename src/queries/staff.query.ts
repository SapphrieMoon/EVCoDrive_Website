import { staffApi } from "@/apis/staff.api"
import { staffKey } from "@/constants/query-keys/staff.key"
import type { StaffPaginationParams } from "@/types/staff.type"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const staffQueries = {
    usePagination: (params: StaffPaginationParams) => {
        return useQuery({
            queryKey: staffKey.listPagination(params),
            queryFn: () => staffApi.getAllPagination(params),
            placeholderData: (previousData) => previousData,
        })
    },
    useDelete: () => {
        const queryClient = useQueryClient()
        return useMutation({
            mutationFn: (id: string) => staffApi.delete(id),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: staffKey.lists() })
            },
        })
    },
    useGetById: (id: string) => {
        return useQuery({
            queryKey: staffKey.detail(id),
            queryFn: () => staffApi.getById(id),
        })
    },
}

export default staffQueries
import contractApi from "@/apis/contract.api"
import { contractKey } from "@/constants/query-keys/contract.key"
import type { ContractPaginationParams } from "@/types/contract.type"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

const contractQueries = {
    useGetAll: () => {
        return useQuery({
            queryKey: contractKey.getAll(),
            queryFn: () => contractApi.getAll(),
            placeholderData: (previousData) => previousData,
        })
    },

    usePagination: (params: ContractPaginationParams) => {
        return useQuery({
            queryKey: contractKey.getAllPagination(params),
            queryFn: () => contractApi.getAllPagination(params),
            placeholderData: (previousData) => previousData,
        })
    },

    useDelete: () => {
        const queryClient = useQueryClient()

        return useMutation({
            mutationFn: (id: string) => contractApi.delete(id),
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: contractKey.getAll()
                })
                toast.success("Xóa thành công")
            }
        })
    },

    useGetDetail: (id: string) => {
        return useQuery({
            queryKey: contractKey.getDetail(id),
            queryFn: () => contractApi.getDetail(id),
            placeholderData: (previousData) => previousData,
            enabled: !!id
        })
    }
}

export default contractQueries
import { operatorApi } from "@/apis/operator.api"
import { operatorKey } from "@/constants/query-keys/operator.key"
import type { OperatorFormValues } from "@/schema/operator.schema"
import type { OperatorPaginationParams } from "@/types/operator"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

const operatorQueries = {
    useAll: () => {
        return useQuery({
            queryKey: operatorKey.all(),
            queryFn: operatorApi.getAll
        })
    },

    usePagination: (params: OperatorPaginationParams) => {
        return useQuery({
            queryKey: operatorKey.listPagination(params),
            queryFn: () => operatorApi.getAllPagination(params),
            placeholderData: (previousData) => previousData,
        })
    },

    useDetail: (id: string) => {
        return useQuery({
            queryKey: operatorKey.detail(id),
            queryFn: () => operatorApi.getDetail(id),
            enabled: !!id
        })
    },

    useCreate: () => {
        const queryClient = useQueryClient()

        return useMutation({
            mutationFn: (data: OperatorFormValues) => operatorApi.create(data),
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: operatorKey.lists()
                })
            }
        })
    },

    useUpdate: () => {
        const queryClient = useQueryClient()

        return useMutation({
            mutationFn: ({ id, data }: { id: string, data: OperatorFormValues }) => operatorApi.update(id, data),
            onSuccess: (_, variables) => {
                queryClient.invalidateQueries({
                    queryKey: operatorKey.lists()
                })
                queryClient.invalidateQueries({ queryKey: operatorKey.detail(variables.id) })
                toast.success("Cập nhật nhân viên thành công")
            }
        })
    },

    useDelete: () => {
        const queryClient = useQueryClient()

        return useMutation({
            mutationFn: (id: string) => operatorApi.delete(id),
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: operatorKey.lists()
                })
            }
        })
    }
}

export default operatorQueries
import { extraFeeApi, extraFeeTypeApi } from "@/apis/extra-free.api"
import { extraFeeKey, extraFeeTypeKey } from "@/constants/query-keys/extra-fee"
import type { CreateExtraFeePayload, ExtraFeeTypePaginationParams } from "@/types/extra-fee.type"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const extraFeeQueries = {
    useDetail: (id: string) => {
        return useQuery({
            queryKey: extraFeeKey.detail(id),
            queryFn: () => extraFeeApi.getDetail(id),
            enabled: !!id
        })
    },
    useCreate: () => {
        const queryClient = useQueryClient()

        return useMutation({
            mutationFn: (data: CreateExtraFeePayload) => extraFeeApi.create(data),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: extraFeeKey.all() })
            }
        })
    },
}

const extraFeeTypeQueries = {
    useAll: () => {
        return useQuery({
            queryKey: extraFeeTypeKey.all(),
            queryFn: extraFeeTypeApi.getAll
        })
    },

    usePagination: (params: ExtraFeeTypePaginationParams) => {
        return useQuery({
            queryKey: extraFeeTypeKey.listPagination(params),
            queryFn: () => extraFeeTypeApi.getPagination(params),
            placeholderData: (previousData) => previousData,
        })
    },

    useDetail: (id: string) => {
        return useQuery({
            queryKey: extraFeeTypeKey.detail(id),
            queryFn: () => extraFeeTypeApi.getDetail(id),
            enabled: !!id
        })
    },

    useCreate: () => {
        const queryClient = useQueryClient()

        return useMutation({
            mutationFn: (data: { name: string, description: string }) => extraFeeTypeApi.create(data.name, data.description),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: extraFeeTypeKey.all() })
            }
        })
    },

    useUpdate: () => {
        const queryClient = useQueryClient()

        return useMutation({
            mutationFn: (data: { id: string, name: string, description: string }) => extraFeeTypeApi.update(data.id, data.name, data.description),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: extraFeeTypeKey.all() })
            }
        })
    },

    useDelete: () => {
        const queryClient = useQueryClient()

        return useMutation({
            mutationFn: (id: string) => extraFeeTypeApi.delete(id),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: extraFeeTypeKey.all() })
            }
        })
    }
}

export { extraFeeQueries, extraFeeTypeQueries }
import { extraFeeApi, extraFeeTypeApi } from "@/apis/extra-free.api"
import { extraFeeKey, extraFeeTypeKey } from "@/constants/query-keys/extra-fee"
import type { CreateExtraFeePayload } from "@/types/extra-fee.type"
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
}

export { extraFeeQueries, extraFeeTypeQueries }
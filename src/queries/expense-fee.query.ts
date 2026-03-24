import { expenseFeeApi, expenseFeeTypeApi } from "@/apis/expense-fee.api";
import { expenseFeeKey, expenseFeeTypeKey } from "@/constants/query-keys/expense-fee.key";
import type { ExpenseFeePaginationParams, ExpenseFeeQuoteRequest } from "@/types/expense-fee.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const expenseFeeQueries = {
    usePagination: (params: ExpenseFeePaginationParams) => {
        return useQuery({
            queryKey: expenseFeeKey.listPagination(params),
            queryFn: () => expenseFeeApi.getAllPagination(params),
            placeholderData: (previousData) => previousData,
        })
    },

    useDetail: (id: string) => {
        return useQuery({
            queryKey: expenseFeeKey.detail(id),
            queryFn: () => expenseFeeApi.getDetail(id),
            enabled: !!id
        })
    },

    usePrefetchDetail: () => {
        const queryClient = useQueryClient()

        return (id: string) => {
            if (!id) return;
            queryClient.prefetchQuery({
                queryKey: expenseFeeKey.detail(id),
                queryFn: () => expenseFeeApi.getDetail(id),
                staleTime: 5 * 60 * 1000
            })
        }
    },

    useQuote: () => {
        const queryClient = useQueryClient()

        return useMutation({
            mutationFn: (params: ExpenseFeeQuoteRequest) => expenseFeeApi.putQuote(params),
            onSuccess: (_, params) => {
                queryClient.invalidateQueries({ queryKey: expenseFeeKey.detail(params.expenseFeeId) })
                queryClient.invalidateQueries({ queryKey: expenseFeeKey.listPagination({ pageNumber: 1, pageSize: 10 }) })
            }
        })
    }
}

const expenseFeeTypeQueries = {
    useAll: () => {
        return useQuery({
            queryKey: expenseFeeTypeKey.all(),
            queryFn: expenseFeeTypeApi.getAll,
        })
    },

    useDetail: (id: string) => {
        return useQuery({
            queryKey: expenseFeeTypeKey.detail(id),
            queryFn: () => expenseFeeTypeApi.getDetail(id),
            enabled: !!id
        })
    },
}

export { expenseFeeQueries, expenseFeeTypeQueries }

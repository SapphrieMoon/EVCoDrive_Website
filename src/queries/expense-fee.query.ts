import { expenseFeeApi, expenseFeeTypeApi } from "@/apis/expense-fee.api";
import { expenseFeeKey, expenseFeeTypeKey } from "@/constants/query-keys/expense-fee.key";
import type { ExpenseFeePaginationParams, ExpenseFeeQuoteRequest, ExpenseFeeTypePaginationParams } from "@/types/expense-fee.type";
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
    },

    useScheduleService: () => {
        const queryClient = useQueryClient()

        return useMutation({
            mutationFn: (params: { id: string, body: string[] }) => expenseFeeApi.postScheduleService(params.id, params.body),
            onSuccess: (_, params) => {
                queryClient.invalidateQueries({ queryKey: expenseFeeKey.detail(params.id) })
                queryClient.invalidateQueries({ queryKey: expenseFeeKey.listPagination({ pageNumber: 1, pageSize: 10 }) })
            }
        })
    },

    useComplete: () => {
        const queryClient = useQueryClient()

        return useMutation({
            mutationFn: (id: string) => expenseFeeApi.postComplete(id),
            onSuccess: (_, id) => {
                queryClient.invalidateQueries({ queryKey: expenseFeeKey.detail(id) })
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

    useCreate: () => {
        const queryClient = useQueryClient()

        return useMutation({
            mutationFn: (data: { name: string, description: string }) => expenseFeeTypeApi.create(data.name, data.description),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: expenseFeeTypeKey.all() })
            }
        })
    },

    useUpdate: () => {
        const queryClient = useQueryClient()

        return useMutation({
            mutationFn: (data: { id: string, name: string, description: string }) => expenseFeeTypeApi.update(data.id, data.name, data.description),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: expenseFeeTypeKey.all() })
            }
        })
    },

    useDelete: () => {
        const queryClient = useQueryClient()

        return useMutation({
            mutationFn: (id: string) => expenseFeeTypeApi.delete(id),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: expenseFeeTypeKey.all() })
            }
        })
    },

    usePagination: (params: ExpenseFeeTypePaginationParams) => {
        return useQuery({
            queryKey: expenseFeeTypeKey.listPagination(params),
            queryFn: () => expenseFeeTypeApi.getPagination(params),
            placeholderData: (previousData) => previousData,
        })
    }
}

export { expenseFeeQueries, expenseFeeTypeQueries }

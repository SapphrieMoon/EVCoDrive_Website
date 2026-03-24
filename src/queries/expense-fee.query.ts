import { expenseFeeApi, expenseFeeTypeApi } from "@/apis/expense-fee.api";
import { expenseFeeKey, expenseFeeTypeKey } from "@/constants/query-keys/expense-fee.type";
import type { ExpenseFeePaginationParams } from "@/types/expense-fee.type";
import { useQuery } from "@tanstack/react-query";

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
}

const expenseFeeTypeQueries = {
    useAll: () => {
        return useQuery({
            queryKey: expenseFeeTypeKey.all(),
            queryFn: expenseFeeTypeApi.getAll,
        })
    },
}

export default { expenseFeeQueries, expenseFeeTypeQueries }

import type { ExpenseFeeDetailResponse, ExpenseFeePaginationParams, ExpenseFeePaginationResponse, ExpenseFeeTypeDetailResponse, ExpenseFeeTypeResponse } from "@/types/expense-fee.type";
import http from "@/utils/http";

export const EXPENSE_FEE_API = {
    EXPENSE_FEE_TYPE: "/expense-fee-types",
    EXPENSE_FEE: "/expenses",
}

export const expenseFeeApi = {
    getAllPagination: async (params: ExpenseFeePaginationParams) => {
        return await http.get<ExpenseFeePaginationResponse>(EXPENSE_FEE_API.EXPENSE_FEE, { params });
    },
    getDetail: async (id: string) => {
        return await http.get<ExpenseFeeDetailResponse>(`${EXPENSE_FEE_API.EXPENSE_FEE}/${id}`);
    },
}

export const expenseFeeTypeApi = {
    getAll: async () => {
        return await http.get<ExpenseFeeTypeResponse>(EXPENSE_FEE_API.EXPENSE_FEE_TYPE);
    },
    getDetail: async (id: string) => {
        return await http.get<ExpenseFeeTypeDetailResponse>(`${EXPENSE_FEE_API.EXPENSE_FEE_TYPE}/${id}`);
    },
}
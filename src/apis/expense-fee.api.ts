import type { ExpenseFeeDetailResponse, ExpenseFeePaginationParams, ExpenseFeePaginationResponse, ExpenseFeeQuoteRequest, ExpenseFeeTypeDetailResponse, ExpenseFeeTypeResponse } from "@/types/expense-fee.type";
import http from "@/utils/http";

export const EXPENSE_FEE_API = {
    EXPENSE_FEE_TYPE: "/expense-fee-types",
    EXPENSE_FEE: "/expenses",
    SCHEDULE_SERVICE: "/schedule-service",
}

export const expenseFeeApi = {
    getAllPagination: async (params: ExpenseFeePaginationParams) => {
        return await http.get<ExpenseFeePaginationResponse>(EXPENSE_FEE_API.EXPENSE_FEE, { params });
    },
    getDetail: async (id: string) => {
        return await http.get<ExpenseFeeDetailResponse>(`${EXPENSE_FEE_API.EXPENSE_FEE}/${id}`);
    },
    putQuote: async (params: ExpenseFeeQuoteRequest) => {
        return http.put<ExpenseFeeDetailResponse>(
            `${EXPENSE_FEE_API.EXPENSE_FEE}/${params.expenseFeeId}/quote`,
            params
        );
    },
    postScheduleService: async (id: string, body: string[]) => {
        return http.post(`${EXPENSE_FEE_API.EXPENSE_FEE}/${id}${EXPENSE_FEE_API.SCHEDULE_SERVICE}`, body);
    },
    postComplete: async (id: string) => {
        return http.post(`${EXPENSE_FEE_API.EXPENSE_FEE}/${id}/complete`);
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
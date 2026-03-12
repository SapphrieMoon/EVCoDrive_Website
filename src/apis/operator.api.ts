import type { OperatorFormValues } from "@/schema/operator.schema"
import type { OperatorDetailResponse, OperatorPaginationParams, OperatorPaginationResponse } from "@/types/operator"
import http from "@/utils/http"

export const OPERATOR_URL = {
    BASE: "/operators",
    PAGINATION: "/operators/pagination"
}

export const operatorApi = {
    getAll: async () =>
        await http.get<OperatorDetailResponse>(OPERATOR_URL.BASE),
    getAllPagination: async (params: OperatorPaginationParams) =>
        await http.get<OperatorPaginationResponse>(OPERATOR_URL.PAGINATION, { params }),
    getDetail: async (id: string) =>
        await http.get<OperatorDetailResponse>(`${OPERATOR_URL.BASE}/${id}`),
    create: async (data: OperatorFormValues) =>
        await http.post<OperatorDetailResponse>(OPERATOR_URL.BASE, data),
    update: async (id: string, data: OperatorFormValues) =>
        await http.put<OperatorDetailResponse>(`${OPERATOR_URL.BASE}/${id}`, data),
    delete: async (id: string) =>
        await http.delete<OperatorPaginationResponse>(`${OPERATOR_URL.BASE}/${id}`),
}
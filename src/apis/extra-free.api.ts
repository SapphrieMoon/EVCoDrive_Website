import type { CreateExtraFeePayload, ExtraFeeResponse, ExtraFeeTypePaginationParams, ExtraFeeTypePaginationResponse, ExtraFeeTypeResponse } from "@/types/extra-fee.type"
import http from "@/utils/http"

export const EXTRA_FEE_URL = {
    BASE: "extra-fees"
}

export const EXTRA_FEE_TYPE_URL = {
    BASE: "extra-fee-types"
}

export const extraFeeTypeApi = {
    getAll: async () =>
        await http.get<ExtraFeeTypeResponse>(`${EXTRA_FEE_TYPE_URL.BASE}/all`),
    create: async (name: string, description: string) =>
        await http.post<ExtraFeeTypeResponse>(EXTRA_FEE_TYPE_URL.BASE, { name, description }),
    update: async (id: string, name: string, description: string) =>
        await http.put<ExtraFeeTypeResponse>(`${EXTRA_FEE_TYPE_URL.BASE}/${id}`, { name, description }),
    delete: async (id: string) =>
        await http.delete<ExtraFeeTypeResponse>(`${EXTRA_FEE_TYPE_URL.BASE}/${id}`),
    getDetail: async (id: string) =>
        await http.get<ExtraFeeTypeResponse>(`${EXTRA_FEE_TYPE_URL.BASE}/${id}`),
    getPagination: async (params: ExtraFeeTypePaginationParams) =>
        await http.get<ExtraFeeTypePaginationResponse>(EXTRA_FEE_TYPE_URL.BASE, { params }),
}

export const extraFeeApi = {
    getDetail: async (id: string) =>
        await http.get<ExtraFeeResponse>(`bookings/${id}/${EXTRA_FEE_URL.BASE}`),
    create: async (data: CreateExtraFeePayload) =>
        await http.post<ExtraFeeResponse>(EXTRA_FEE_URL.BASE, data),
}

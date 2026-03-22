import type { CreateExtraFeePayload, ExtraFeeResponse, ExtraFeeTypeResponse } from "@/types/extra-fee.type"
import http from "@/utils/http"

export const EXTRA_FEE_URL = {
    BASE: "extra-fees"
}

export const EXTRA_FEE_TYPE_URL = {
    BASE: "extra-fee-types"
}

export const extraFeeTypeApi = {
    getAll: async () =>
        await http.get<ExtraFeeTypeResponse>(EXTRA_FEE_TYPE_URL.BASE),
}

export const extraFeeApi = {
    getDetail: async (id: string) =>
        await http.get<ExtraFeeResponse>(`bookings/${id}/${EXTRA_FEE_URL.BASE}`),
    create: async (data: CreateExtraFeePayload) =>
        await http.post<ExtraFeeResponse>(EXTRA_FEE_URL.BASE, data),
}

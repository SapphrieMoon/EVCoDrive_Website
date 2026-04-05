import type { ContractDetailResponse, ContractPaginationParams, ContractPaginationResponse } from "@/types/contract.type"
import http from "@/utils/http"

export const CONTRACT_URL = {
    BASE: "/contracts",
    PAGINATION: "/contracts/pagination"
}

const contractApi = {
    getAll: async () =>
        await http.get<ContractPaginationResponse>(CONTRACT_URL.BASE),
    getAllPagination: async (params: ContractPaginationParams) =>
        await http.get<ContractPaginationResponse>(CONTRACT_URL.PAGINATION, { params }),
    delete: async (id: string) =>
        await http.delete(`${CONTRACT_URL.BASE}/${id}`),
    getDetail: async (id: string) =>
        await http.get<ContractDetailResponse>(`${CONTRACT_URL.BASE}/${id}`),
    getPDF: async (id: string) =>
        await http.get(`${CONTRACT_URL.BASE}/${id}/pdf`, { responseType: "blob" })
}

export default contractApi
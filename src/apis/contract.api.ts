import type { ContractDetailResponse, ContractPaginationParams, ContractPaginationResponse } from "@/types/contract.type"
import http from "@/utils/http"

export const URL_CONTRACT = {
    GET_ALL: "/contracts",
    GET_ALL_PAGINATION: "/contracts/pagination"
}

const contractApi = {
    getAll: async () =>
        await http.get<ContractPaginationResponse>(URL_CONTRACT.GET_ALL),
    getAllPagination: async (params: ContractPaginationParams) =>
        await http.get<ContractPaginationResponse>(URL_CONTRACT.GET_ALL_PAGINATION, { params }),
    delete: async (id: string) =>
        await http.delete(`${URL_CONTRACT.GET_ALL}/${id}`),
    getDetail: async (id: string) =>
        await http.get<ContractDetailResponse>(`${URL_CONTRACT.GET_ALL}/${id}`)
}

export default contractApi
import type { ContractPaginationParams } from "@/types/contract.type";

export const contractKey = {
    getAll: () => ["contract"],
    getAllPagination: (params: ContractPaginationParams) => ["contract", params],
    getDetail: (id: string) => ["contract", id]
}
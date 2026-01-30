import type { ContractPaginationParams } from "@/types/contract.type";

export const contractKey = {
    all: () => ["contract"],
    lists: () => ["contract", "list"],
    listPagination: (params: ContractPaginationParams) => [
        "contract",
        "list",
        "pagination",
        params,
    ],
    details: () => ["contract", "detail"],
    detail: (id: string) => ["contract", "detail", id],
}
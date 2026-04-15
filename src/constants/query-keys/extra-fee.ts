import type { ExtraFeeTypePaginationParams } from "@/types/extra-fee.type"

export const extraFeeKey = {
    all: () => ["extraFee"],
    lists: () => ["extraFee", "list"],
    // listPagination: (params: StationPaginationParams) => [
    //     "extraFee",
    //     "list",
    //     "pagination",
    //     params,
    // ],
    details: () => ["extraFee", "detail"],
    detail: (id: string) => ["extraFee", "detail", id],
}

export const extraFeeTypeKey = {
    all: () => ["extraFeeType"],
    lists: () => ["extraFeeType", "list"],
    listPagination: (params: ExtraFeeTypePaginationParams) => [
        "extraFeeType",
        "list",
        "pagination",
        params,
    ],
    details: () => ["extraFeeType", "detail"],
    detail: (id: string) => ["extraFeeType", "detail", id],
}
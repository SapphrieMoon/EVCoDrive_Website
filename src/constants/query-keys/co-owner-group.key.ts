import type { CoOwnerGroupPaginationParams } from "@/types/co-owner-group.type";

export const coOwnerGroupKey = {
    all: () => ["co-owner-group"],
    lists: () => ["co-owner-group", "list"],
    listPagination: (params: CoOwnerGroupPaginationParams) => [
        "co-owner-group",
        "list",
        "pagination",
        params,
    ],
    details: () => ["co-owner-group", "detail"],
    detail: (id: string) => ["co-owner-group", "detail", id],
}
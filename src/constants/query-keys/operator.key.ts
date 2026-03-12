import type { OperatorPaginationParams } from "@/types/operator";

export const operatorKey = {
    all: () => ["operator"],
    lists: () => ["operator", "list"],
    listPagination: (params: OperatorPaginationParams) => [
        "operator",
        "list",
        "pagination",
        params,
    ],
    details: () => ["operator", "detail"],
    detail: (id: string) => ["operator", "detail", id],
}
import type { ExpenseFeePaginationParams, ExpenseFeeTypePaginationParams } from "@/types/expense-fee.type";

export const expenseFeeKey = {
    all: () => ["expense-fee"],
    lists: () => ["expense-fee", "list"],
    listPagination: (params: ExpenseFeePaginationParams) => [
        "expense-fee",
        "list",
        "pagination",
        params,
    ],
    details: () => ["expense-fee", "detail"],
    detail: (id: string) => ["expense-fee", "detail", id],
    schedules: () => ["expense-fee", "schedule"],
    scheduleByGroup: (groupId: string) => ["expense-fee", "schedule", "group", groupId],
}

export const expenseFeeTypeKey = {
    all: () => ["expense-fee-type"],
    lists: () => ["expense-fee-type", "list"],
    listPagination: (params: ExpenseFeeTypePaginationParams) => [
        "expense-fee-type",
        "list",
        "pagination",
        params,
    ],
    details: () => ["expense-fee-type", "detail"],
    detail: (id: string) => ["expense-fee-type", "detail", id],
}
import type { StaffPaginationParams } from "@/types/staff.type";

export const staffKey = {
    all: () => ["staff"],
    lists: () => ["staff", "list"],
    listPagination: (params: StaffPaginationParams) => [
        "staff",
        "list",
        "pagination",
        params,
    ],
    details: () => ["staff", "detail"],
    detail: (id: string) => ["staff", "detail", id],
}
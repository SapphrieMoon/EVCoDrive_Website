import type { MemberPaginationParams } from "@/types/user.type"

export const memberKey = {
    all: () => ["member"],
    lists: () => ["member", "list"],
    listPagination: (params: MemberPaginationParams) => [
        "member",
        "list",
        "pagination",
        params,
    ],
    details: () => ["member", "detail"],
    detail: (id: string) => ["member", "detail", id],
    profile: (id: string) => ["member", "profile", id],
}
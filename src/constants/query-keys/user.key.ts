export const userKey = {
    all: () => ["user"],
    lists: () => ["user", "list"],
    // listPagination: (params: UserPaginationParams) => [
    //     "user",
    //     "list",
    //     "pagination",
    //     params,
    // ],
    details: () => ["user", "detail"],
    detail: (id: string) => ["user", "detail", id],
    profile: (id: string) => ["user", "profile", id],
}
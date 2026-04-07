import type { WalletWithdrawParams } from "@/types/withdraw.type"

export const withdrawKey = {
    all: () => ["withdraw"],
    lists: () => ["withdraw", "list"],
    listPagination: (params: WalletWithdrawParams) => [
        "withdraw",
        "list",
        "pagination",
        params,
    ],
    details: () => ["withdraw", "detail"],
    detail: (id: string) => ["withdraw", "detail", id],
}
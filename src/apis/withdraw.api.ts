import type { WalletWithdrawPaginationResponse, WalletWithdrawParams, WithdrawStatus } from "@/types/withdraw.type"
import http from "@/utils/http"

const WITHDRAW_URL = {
    WALLET_WITHDRAW: "/wallets/withdrawals",
} as const

export const withdrawApi = {
    getWalletWithdraws: async (params: WalletWithdrawParams) =>
        await http.get<WalletWithdrawPaginationResponse>(WITHDRAW_URL.WALLET_WITHDRAW, { params }),
    putWalletWithdrawStatus: async (walletWithdrawId: string, status: WithdrawStatus) =>
        await http.put<WalletWithdrawPaginationResponse>(`${WITHDRAW_URL.WALLET_WITHDRAW}/${walletWithdrawId}/status`, { status }),
} as const

export default withdrawApi
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { withdrawApi } from "@/apis/withdraw.api"
import { withdrawKey } from "@/constants/query-keys/withdraw.key"
import type { WalletWithdrawParams, WithdrawStatus } from "@/types/withdraw.type"

const withdrawQueries = {
    usePagination: (params: WalletWithdrawParams) => {
        return useQuery({
            queryKey: withdrawKey.listPagination(params),
            queryFn: () => withdrawApi.getWalletWithdraws(params),
            placeholderData: (previousData) => previousData,
        })
    },
    usePutStatus: () => {
        const queryClient = useQueryClient()
        return useMutation({
            mutationFn: ({ walletWithdrawId, status }: { walletWithdrawId: string, status: WithdrawStatus }) =>
                withdrawApi.putWalletWithdrawStatus(walletWithdrawId, status),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: withdrawKey.lists() })
            }
        })
    },
} as const

export default withdrawQueries
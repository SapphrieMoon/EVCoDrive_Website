import { groupWalletApi } from "@/apis/group-wallet.api"
import { useMutation } from "@tanstack/react-query"

const groupWalletQueries = {
    useCreate: () => {
        return useMutation({
            mutationFn: (id: string) => groupWalletApi.create(id),
        })
    }
}

export default groupWalletQueries

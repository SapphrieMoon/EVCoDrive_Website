import http from "@/utils/http"

export const GROUP_WALLET_API = {
    BASE: "/group-wallets",
}

export const groupWalletApi = {
    create: async (id: string) =>
        await http.post(`${GROUP_WALLET_API.BASE}/${id}`),
}
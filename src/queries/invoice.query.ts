import { invoiceApi } from "@/apis/invoice.api"
import { invoiceKey } from "@/constants/query-keys/invoice.key"
import type { InvoiceParams } from "@/types/invoice.type"
import { useQuery } from "@tanstack/react-query"

const invoiceQueries = {
    usePagination: (params: InvoiceParams) => {
        return useQuery({
            queryKey: invoiceKey.listPagination(params),
            queryFn: () => invoiceApi.getAll(params),
            placeholderData: (previousData) => previousData,
        })
    },
    useDetail: (id: string) => {
        return useQuery({
            queryKey: invoiceKey.detail(id),
            queryFn: () => invoiceApi.getDetail(id),
            enabled: !!id
        })
    }
}

export default invoiceQueries
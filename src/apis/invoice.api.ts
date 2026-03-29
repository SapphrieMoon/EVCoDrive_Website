
import type { InvoicePaginationResponse, InvoiceParams } from "@/types/invoice.type"
import http from "@/utils/http"

const INVOICE_URL = {
    GET_ALL: "/invoices",
    GET_BY_ID: "/invoices/:id",
} as const

export const invoiceApi = {
    getAll: async (params: InvoiceParams) =>
        await http.get<InvoicePaginationResponse>(INVOICE_URL.GET_ALL, { params }),
    getDetail: async (id: string) =>
        await http.get<InvoicePaginationResponse>(INVOICE_URL.GET_BY_ID.replace(":id", id)),
}

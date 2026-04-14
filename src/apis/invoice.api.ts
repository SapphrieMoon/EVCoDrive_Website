
import type { GenerateMonthlyInvoiceRequest, InvoiceDetailResponse, InvoicePaginationResponse, InvoiceParams } from "@/types/invoice.type"
import http from "@/utils/http"

const INVOICE_URL = {
    GET_ALL: "/invoices",
    GET_BY_ID: "/invoices/:id",
    GENERATE_MONTHLY_INVOICE: "/invoices/generate-monthly-operation",
} as const

export const invoiceApi = {
    getAll: async (params: InvoiceParams) =>
        await http.get<InvoicePaginationResponse>(INVOICE_URL.GET_ALL, { params }),
    getDetail: async (id: string) =>
        await http.get<InvoiceDetailResponse>(INVOICE_URL.GET_BY_ID.replace(":id", id)),
    postGenerateMonthlyInvoice: async (params: GenerateMonthlyInvoiceRequest) =>
        await http.post(INVOICE_URL.GENERATE_MONTHLY_INVOICE, params),
}

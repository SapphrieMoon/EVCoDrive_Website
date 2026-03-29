import type { InvoiceParams } from "@/types/invoice.type";

export const invoiceKey = {
    all: () => ["invoice"],
    lists: () => ["invoice", "list"],
    listPagination: (params: InvoiceParams) => [
        "invoice",
        "list",
        "pagination",
        params,
    ],
    details: () => ["invoice", "detail"],
    detail: (id: string) => ["invoice", "detail", id],
}
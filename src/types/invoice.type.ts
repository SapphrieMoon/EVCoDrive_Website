import type { PaginationParams, PaginationResponse } from "./commons/pagination.type";
import type { SuccessResponse } from "./commons/utils.type";

export const InvoiceStatus = {
    Unpaid: "Unpaid",
    Paid: "Paid",
    Cancelled: "Cancelled",
} as const

export type InvoiceStatus = typeof InvoiceStatus[keyof typeof InvoiceStatus]

export interface Invoice {
    invoiceId: string;
    extraFeeId: string;
    extraFeeTypeId: string | null;
    extraFeeTypeName: string | null;
    coOwnerGroupId: string | null;
    memberId: string;
    invoiceNumber: string;
    description: string;
    totalAmount: number;
    currency: string;
    invoiceStatus: InvoiceStatus;
    dueDate: string;      // ISO string
    paidDate: string;     // ISO string
    createdDate: string;  // ISO string
    updatedDate: string;  // ISO string
    details: InvoiceDetail[];
}

export interface InvoiceDetail {
    invoiceDetailId: string;
    invoiceId: string;
    description: string;
    quantity: number;
    unitPrice: number;
    amount: number;
    createdDate: string;
    updatedDate: string;
}

export type InvoiceParams = PaginationParams & {
    status?: InvoiceStatus;
    search?: string;

}

export interface GenerateMonthlyInvoiceRequest {
    month: number;
    year: number;
    monthlyAmountPerGroup: number;
    currency: string;
    dueInDays: number;
}

export type InvoicePaginationResponse = SuccessResponse<PaginationResponse<Invoice>>

export type InvoiceDetailResponse = SuccessResponse<Invoice>

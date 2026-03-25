import type { BaseCrudFormProps } from "./commons/crud-form.type";
import type { PaginationParams, PaginationResponse } from "./commons/pagination.type";
import type { SuccessResponse } from "./commons/utils.type";

export const ExpenseFeeStatus = {
    SubmittedToSystem: "SubmittedToSystem",
    PendingPayment: "PendingPayment",
    Processing: "Processing",
    Paid: "Paid",
    Cancelled: "Cancelled",
} as const

export type ExpenseFeeStatus = typeof ExpenseFeeStatus[keyof typeof ExpenseFeeStatus]

export interface ExpenseFee {
    expenseFeeId: string;
    coOwnerGroupId: string;
    vehicleId: string;
    invoiceId: string | null;
    votingId: string | null;
    expenseFeeTypeId: string;
    name: string;
    amount: number;
    currency: string;
    description: string;
    expenseDate: string; // ISO string
    status: ExpenseFeeStatus;
    serviceDates: string[];
    createdDate: string; // ISO string
    updatedDate: string; // ISO string
}

export interface ExpenseFeeDetail {
    expenseFeeId: string;
    coOwnerGroupId: string;
    vehicleId: string;
    invoiceId: string | null;
    votingId: string | null;
    expenseFeeTypeId: string;
    name: string;
    amount: number;
    currency: string;
    description: string;
    expenseDate: string; // ISO date
    status: ExpenseFeeStatus;
    serviceDates: string[];

    createdDate: string;
    updatedDate: string;
}

export interface ExpenseFeeType {
    expenseFeeTypeId: string;
    expenseFeeTypeName: string;
    expenseFeeTypeDescription: string;
    createdDate: string; // ISO string
    updatedDate: string; // ISO string
}

export type ExpenseFeeQuoteRequest = {
    expenseFeeId: string;
    amount: number;
    operatorNote?: string;
}

export type ExpenseFeePaginationParams = PaginationParams & {}

export type ExpenseFeePaginationResponse = SuccessResponse<PaginationResponse<ExpenseFee>>

export type ExpenseFeeDetailResponse = SuccessResponse<ExpenseFeeDetail>

export type ExpenseFeeTypeResponse = SuccessResponse<ExpenseFeeType[]>

export type ExpenseFeeTypeDetailResponse = SuccessResponse<ExpenseFeeType>

export type ExpenseFeeFormProps = BaseCrudFormProps & {}
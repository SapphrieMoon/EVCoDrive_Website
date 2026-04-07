import type { PaginationParams, PaginationResponse } from "./commons/pagination.type";
import type { SuccessResponse } from "./commons/utils.type";

export const WITHDRAW_STATUS = {
    Pending: "Pending",
    Completed: "Completed",
} as const

export type WithdrawStatus = (typeof WITHDRAW_STATUS)[keyof typeof WITHDRAW_STATUS]

export interface WalletWithdraw {
    walletWithdrawId: string;
    amount: number;
    currency: string;
    bankAccount: string;
    bankName: string;
    status: WithdrawStatus;
    requestDate: string; // ISO string
    processedDate: string | null;
}

export type WalletWithdrawParams = PaginationParams & {
    status?: WithdrawStatus;
}

export type WalletWithdrawPaginationResponse = SuccessResponse<PaginationResponse<WalletWithdraw>>
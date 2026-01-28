import type { PaginationParams, PaginationResponse } from "./pagination.type"
import type { SuccessResponse } from "./utils.type"

export const CONTRACT_TYPES = {
    0: { label: "Mua bán", variant: "default" },
    1: { label: "Đăng ký xe", variant: "outline" },
} as const;

export const CONTRACT_STATUSES = {
    0: { label: "Bản nháp", variant: "secondary", color: "text-gray-500" },
    1: { label: "Hoàn thành", variant: "success", color: "text-green-600" },
    2: { label: "Đã hủy", variant: "destructive", color: "text-red-600" },
} as const;

export interface Contract {
    contractId: string
    contractType: number
    buyRequestId: string | null
    partyAId: string
    partyBId: string | null
    contractNumber: string
    title: string
    description: string
    fileUrl: string
    signedDate: string
    contractStatuses: number
    partyAVerifiedAt: string | null
    partyAVerifiedEmail: string | null
    partyBVerifiedAt: string | null
    partyBVerifiedEmail: string | null
    isFullyVerified: boolean
    createdDate: string
    updatedDate: string
}

export interface ContractPaginationParams extends PaginationParams {
    searchTerm?: string
}

export type ContractPaginationResponse = SuccessResponse<PaginationResponse<Contract>>

export type ContractDetailResponse = SuccessResponse<Contract>
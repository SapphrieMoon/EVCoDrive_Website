import type { PaginationParams, PaginationResponse } from "./commons/pagination.type"
import type { SuccessResponse } from "./commons/utils.type"


export const CONTRACT_STATUSES = {
    Completed: "Completed",
    Draft: "Draft",
} as const;

export type ContractStatus = typeof CONTRACT_STATUSES[keyof typeof CONTRACT_STATUSES]

export interface Contract {
    contractId: string
    contractTypeId: string
    contractTypeName: string
    contractTypeCode: string
    vehicleId: string | null
    vehicleModelName: string | null
    partyAEmail: string | null
    partyBEmail: string | null
    buyRequestId: string | null
    partyAId: string
    partyAName: string
    partyBId: string | null
    partyBName: string | null
    contractNumber: string
    title: string
    description: string
    fileUrl: string
    signedDate: string
    contractStatuses: ContractStatus
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
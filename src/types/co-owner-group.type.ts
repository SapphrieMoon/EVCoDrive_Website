import type { BaseCrudFormProps } from "./commons/crud-form.type"
import type { PaginationParams, PaginationResponse } from "./commons/pagination.type"
import type { SuccessResponse } from "./commons/utils.type"
import type { ShareHolder } from "./share-holder"
import type { ShareUnit } from "./share-unit"
import type { Contract } from "./contract.type"

export const CoOwnerGroupStatus = {
    Active: "Active",
    Inactive: "Inactive",
    Disbaned: "Disbaned",
    PendingApproval: "PendingApproval",
    Rejected: "Rejected",
} as const

export type CoOwnerGroupStatus = typeof CoOwnerGroupStatus[keyof typeof CoOwnerGroupStatus]

export interface CoOwnerGroup {
    coOwnerGroupId: string
    name: string
    description: string
    totalShare: number
    sharePrice: number
    coOwnerGroupStatus: CoOwnerGroupStatus | string
    createdDate: string
    updatedDate: string
}

export interface CoOwnerGroupDetail {
    coOwnerGroupId: string;
    groupName: string;
    description: string;
    vehicleId: string;
    vehicleLicensePlate: string;
    totalShares: number;
    sharePrice: number;
    status: CoOwnerGroupStatus;
    coOwnershipContractUrl: string;
    vehicleRegistrationCertificateUrl: string;
    shareHolders: ShareHolder[];
    shareUnits: ShareUnit[];
    contracts: Contract[];
}

export interface CoOwnerGroupSummary {
    coOwnerGroupId: string;
    name: string;
    description: string;
    totalShare: number;
    sharePrice: number;
    status: CoOwnerGroupStatus;
}

export interface MemberProfileGroup {
    coOwnerGroupId: string;
    groupName: string;
    groupDescription: string;
    vehicleLicensePlate: string;
    ownedShares: number;
    status: CoOwnerGroupStatus;
    joinedDate: string;
}

export type CoOwnerGroupPaginationParams = PaginationParams & {
    searchTerm?: string
}

export type CoOwnerGroupPaginationResponse = SuccessResponse<PaginationResponse<CoOwnerGroup>>

export type CoOwnerGroupDetailResponse = SuccessResponse<CoOwnerGroupDetail>

export type CoOwnerGroupListResponse = SuccessResponse<CoOwnerGroup[]>

export type CoOwnerGroupFormProps = BaseCrudFormProps & {}
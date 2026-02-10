import type { BaseCrudFormProps } from "./commons/crud-form.type"
import type { PaginationParams, PaginationResponse } from "./commons/pagination.type"
import type { SuccessResponse } from "./commons/utils.type"
import type { ShareHolder } from "./share-holder"
import type { ShareUnit } from "./share-unit"

export enum CoOwnerGroupStatus {
    Active = "Active",
    Inactive = "Inactive",
}

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
    status: "Active" | "Inactive" | string;
    shareHolders: ShareHolder[];
    shareUnits: ShareUnit[];
}

export type CoOwnerGroupPaginationParams = PaginationParams & {
    searchTerm?: string
}

export type CoOwnerGroupPaginationResponse = SuccessResponse<PaginationResponse<CoOwnerGroup>>

export type CoOwnerGroupDetailResponse = SuccessResponse<CoOwnerGroupDetail>

export type CoOwnerGroupListResponse = SuccessResponse<CoOwnerGroup[]>

export type CoOwnerGroupFormProps = BaseCrudFormProps & {}
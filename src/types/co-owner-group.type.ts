import type { BaseCrudFormProps } from "./commons/crud-form.type"
import type { PaginationParams, PaginationResponse } from "./commons/pagination.type"
import type { SuccessResponse } from "./commons/utils.type"

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

export type CoOwnerGroupPaginationParams = PaginationParams & {
    searchTerm?: string
}

export type CoOwnerGroupPaginationResponse = SuccessResponse<PaginationResponse<CoOwnerGroup>>

export type CoOwnerGroupDetailResponse = SuccessResponse<CoOwnerGroup>

export type CoOwnerGroupListResponse = SuccessResponse<CoOwnerGroup[]>

export type CoOwnerGroupFormProps = BaseCrudFormProps & {}
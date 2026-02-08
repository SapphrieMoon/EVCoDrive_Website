import type { BaseCrudFormProps } from "./commons/crud-form.type"
import type { PaginationParams, PaginationResponse } from "./commons/pagination.type"
import type { SuccessResponse } from "./commons/utils.type"

export interface Staff {
    staffId: string
    accountId: string
    email: string
    fullName: string
    phone: string
    stationId: string
    stationName: string
    isActive: boolean
    createdDate: string
    updatedDate: string
}

export type StaffPaginationParams = PaginationParams & {
    searchTermByNameOrEmail?: string
}

export type StaffPaginationResponse = SuccessResponse<PaginationResponse<Staff>>

export type StaffDetailResponse = SuccessResponse<Staff>

export type StaffFormProps = BaseCrudFormProps & {}


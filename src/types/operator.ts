import type { BaseCrudFormProps } from "./commons/crud-form.type"
import type { PaginationParams, PaginationResponse } from "./commons/pagination.type"
import type { SuccessResponse } from "./commons/utils.type"

export interface Operator {
    operatorId: string
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

export type OperatorPaginationParams = PaginationParams & {
    searchTermByNameOrEmail?: string
}

export type OperatorPaginationResponse = SuccessResponse<PaginationResponse<Operator>>

export type OperatorDetailResponse = SuccessResponse<Operator>

export type OperatorFormProps = BaseCrudFormProps & {}


import type { BaseCrudFormProps } from "./commons/crud-form.type";
import type { PaginationParams, PaginationResponse } from "./commons/pagination.type";
import type { SuccessResponse } from "./commons/utils.type";

export enum ExtraFeeStatus {
    Paid = 'Paid',
    Unpaid = 'Unpaid',
}

export interface ExtraFee {
    extraFeeId: string;
    bookingId: string;
    handoverLogId: string;
    extraFeeTypeId: string;
    title: string;
    amount: number;
    currency: string;
    description: string;
    status: ExtraFeeStatus;
    createdDate: string;
    updatedDate: string;
}

export interface ExtraFeeType {
    extraFeeTypeId: string;
    extraFeeTypeName: string;
    exptraFeeTypeDescription: string;
    createdDate: string;
    updatedDate: string;
}

export type CreateExtraFeePayload = {
    bookingId: string
    handoverLogId: string
    extraFeeTypeId: string
    title: string
    amount: number
    description?: string
}

export type ExtraFeeTypePaginationParams = PaginationParams & {}

export type ExtraFeeTypePaginationResponse = SuccessResponse<PaginationResponse<ExtraFeeType>>

export type ExtraFeeTypeResponse = SuccessResponse<ExtraFeeType[]>

export type ExtraFeeResponse = SuccessResponse<ExtraFee[]>

export type ExtraFeeFormProps = BaseCrudFormProps & {}
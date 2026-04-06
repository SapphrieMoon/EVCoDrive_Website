import type { BaseCrudFormProps } from "./commons/crud-form.type";
import type { PaginationParams, PaginationResponse } from "./commons/pagination.type";
import type { SuccessResponse } from "./commons/utils.type";

export interface Staff {
    staffId: string;
    avatar: string;
    name: string;
    phoneNumber: string;
    address: string;
    stationId: string;
    stationName: string;
    createdDate: string; // ISO datetime
    updatedDate: string; // ISO datetime
}

export type StaffPaginationParams = PaginationParams & {
    search?: string,
    stationId?: string,
}

export type StaffPaginationResponse = SuccessResponse<PaginationResponse<Staff>>

export type StaffResponse = SuccessResponse<Staff>


export type StaffFormProps = BaseCrudFormProps & {}
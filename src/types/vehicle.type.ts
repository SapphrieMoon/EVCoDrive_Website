import type { PaginationParams, PaginationResponse } from "./pagination.type";
import type { SuccessResponse } from "./utils.type";

export enum VehicleStatus {
    ReadyForInspection = "ReadyForInspection",
    Signing = "Approved",
    SaleEligible = "SaleEligible",
    Active = "Active",
    Maintenance = "Maintenance",
    Rejected = "Rejected",
    Decommissioned = "Decommissioned",
}

export interface Vehicle {
    vehicleId: string;           // UUID
    licensePlate: string;
    color: string;
    year: number;
    vehicleStatus: VehicleStatus;
    batteryHealth: number;       // %
    odometer: number;            // km
    modelName: string;
    brandName: string;
    groupName: string;
    thumbnailUrl: string;
    createdDate: string;         // ISO string
};

export interface VehiclePaginationParams extends PaginationParams {
    searchTerm?: string;
    status?: VehicleStatus;
    vehicleModelId?: string;
    coOwnerGroupId?: string;
    currentStationId?: string;
    yearFrom?: number;
    yearTo?: number;
}

export type VehiclePaginationResponse = SuccessResponse<PaginationResponse<Vehicle>>

export type VehicleDetailResponse = SuccessResponse<Vehicle>


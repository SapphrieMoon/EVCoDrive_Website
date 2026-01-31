import type { PaginationParams, PaginationResponse } from "./pagination.type";
import type { SuccessResponse } from "./utils.type";

export enum VehicleStatus {
    Pending = "Pending",
    ReadyForInspection = "ReadyForInspection",
    Inspecting = "Inspecting",
    SigningContract = "SigningContract",
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


//============================== Vehicle Status Action=======================
export enum VehicleAction {
    APPROVE = "APPROVE",               // Duyệt
    REJECT = "REJECT",                 // Từ chối

    MARK_INSPECTING = "MARK_INSPECTING", // Chuyển sang đang kiểm tra
    COMPLETE_INSPECTION = "COMPLETE_INSPECTION", // Hoàn tất kiểm tra

    ACTIVATE = "ACTIVATE",             // Kích hoạt xe
    MOVE_TO_MAINTENANCE = "MOVE_TO_MAINTENANCE", // Chuyển bảo trì
    DECOMMISSION = "DECOMMISSION",     // Ngưng sử dụng
}

export interface VehicleStatusAction {
    type: VehicleAction
    label: string
    nextStatus: VehicleStatus
    variant?: "default" | "destructive"
}

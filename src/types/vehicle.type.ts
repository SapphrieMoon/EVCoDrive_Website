import type { LucideIcon } from "lucide-react";
import type { PaginationParams, PaginationResponse } from "./commons/pagination.type";
import type { SuccessResponse } from "./commons/utils.type";
import type { VehicleModelSummary } from "./vehicle-model.type";
import type { CoOwnerGroupSummary } from "./co-owner-group.type";
import type { CurrentStation } from "./station.type";
import type { VehicleImage } from "./commons/media.type";

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
    UnderService = "UnderService"
}

export interface Vehicle {
    vehicleId: string;           // UUID
    licensePlate: string;
    chassisNumber: string;
    engineNumber: string;
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

export interface VehicleDetail {
    vehicleId: string;
    memberId: string | null;
    licensePlate: string;
    chassisNumber: string;
    engineNumber: string;
    color: string;
    year: number;
    odometer: number;
    batteryHealth: number;
    isBrandNew: string; // Lưu ý: BE trả về string "True"/"False"
    vehicleStatus: VehicleStatus;
    lastMaintenanceDate: string | null;
    createdDate: string;
    updatedDate: string;
    vehicleModel: VehicleModelSummary;
    coOwnerGroup: CoOwnerGroupSummary | null;
    currentStation: CurrentStation | null;
    images: VehicleImage[];
}

export interface VehiclePaginationParams extends PaginationParams {
    searchTerm?: string;
    status?: VehicleStatus;
    vehicleModelId?: string;
    coOwnerGroupId?: string;
    currentStationId?: string;
    yearFrom?: number;
    yearTo?: number;
    sortBy?: string;
    sortOrder?: string;
}

export type VehiclePaginationResponse = SuccessResponse<PaginationResponse<Vehicle>>

export type VehicleDetailResponse = SuccessResponse<VehicleDetail>


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
    icon: LucideIcon
}

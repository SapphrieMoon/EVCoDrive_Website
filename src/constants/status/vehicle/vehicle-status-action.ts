import { VehicleAction, VehicleStatus } from "@/types/vehicle.type";
import type { VehicleStatusAction } from "@/types/vehicle.type";

export const VEHICLE_STATUS_ACTIONS: Record<
    VehicleStatus,
    VehicleStatusAction[]
> = {
    [VehicleStatus.Pending]: [
        {
            type: VehicleAction.APPROVE,
            label: "Duyệt",
            nextStatus: VehicleStatus.ReadyForInspection,
        },
        {
            type: VehicleAction.REJECT,
            label: "Từ chối",
            nextStatus: VehicleStatus.Rejected,
            variant: "destructive",
        },
    ],

    [VehicleStatus.ReadyForInspection]: [
        {
            type: VehicleAction.MARK_INSPECTING,
            label: "Bắt đầu kiểm tra",
            nextStatus: VehicleStatus.Inspecting,
        },
        {
            type: VehicleAction.REJECT,
            label: "Từ chối",
            nextStatus: VehicleStatus.Rejected,
            variant: "destructive",
        },
    ],

    [VehicleStatus.Inspecting]: [
        {
            type: VehicleAction.APPROVE,
            label: "Ký hợp đồng",
            nextStatus: VehicleStatus.SigningContract,
        },
        {
            type: VehicleAction.REJECT,
            label: "Từ chối",
            nextStatus: VehicleStatus.Rejected,
            variant: "destructive",
        },
    ],

    [VehicleStatus.SaleEligible]: [
        {
            type: VehicleAction.ACTIVATE,
            label: "Kích hoạt",
            nextStatus: VehicleStatus.Active,
        },
        {
            type: VehicleAction.REJECT,
            label: "Từ chối",
            nextStatus: VehicleStatus.Rejected,
            variant: "destructive",
        },
    ],

    [VehicleStatus.Active]: [
        {
            type: VehicleAction.MOVE_TO_MAINTENANCE,
            label: "Bảo trì",
            nextStatus: VehicleStatus.Maintenance,
        },
        {
            type: VehicleAction.DECOMMISSION,
            label: "Ngừng sử dụng",
            nextStatus: VehicleStatus.Decommissioned,
            variant: "destructive",
        },
    ],

    [VehicleStatus.Maintenance]: [
        {
            type: VehicleAction.ACTIVATE,
            label: "Hoạt động lại",
            nextStatus: VehicleStatus.Active,
        },
        {
            type: VehicleAction.DECOMMISSION,
            label: "Ngừng sử dụng",
            nextStatus: VehicleStatus.Decommissioned,
            variant: "destructive",
        },
    ],

    [VehicleStatus.SigningContract]: [],
    [VehicleStatus.Rejected]: [],
    [VehicleStatus.Decommissioned]: [],
}
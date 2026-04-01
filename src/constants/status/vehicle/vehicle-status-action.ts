import { VehicleAction, VehicleStatus } from "@/types/vehicle.type";
import type { VehicleStatusAction } from "@/types/vehicle.type";
import { Check, FileSignature, Play, PowerOff, Wrench, X } from "lucide-react";

export const VEHICLE_STATUS_ACTIONS: Record<
    VehicleStatus,
    VehicleStatusAction[]
> = {
    [VehicleStatus.Pending]: [
        {
            type: VehicleAction.APPROVE,
            label: "Duyệt",
            nextStatus: VehicleStatus.ReadyForInspection,
            icon: Check,
        },
        {
            type: VehicleAction.REJECT,
            label: "Từ chối",
            nextStatus: VehicleStatus.Rejected,
            variant: "destructive",
            icon: X,
        },
    ],

    [VehicleStatus.ReadyForInspection]: [
        {
            type: VehicleAction.MARK_INSPECTING,
            label: "Bắt đầu kiểm tra",
            nextStatus: VehicleStatus.Inspecting,
            icon: Play,
        },
        {
            type: VehicleAction.REJECT,
            label: "Từ chối",
            nextStatus: VehicleStatus.Rejected,
            variant: "destructive",
            icon: X,
        },
    ],

    [VehicleStatus.Inspecting]: [
        {
            type: VehicleAction.APPROVE,
            label: "Ký hợp đồng",
            nextStatus: VehicleStatus.SigningContract,
            icon: FileSignature,
        },
        {
            type: VehicleAction.REJECT,
            label: "Từ chối",
            nextStatus: VehicleStatus.Rejected,
            variant: "destructive",
            icon: X,
        },
    ],

    // [VehicleStatus.SaleEligible]: [
    //     {
    //         type: VehicleAction.ACTIVATE,
    //         label: "Kích hoạt",
    //         nextStatus: VehicleStatus.Active,
    //         icon: Check,
    //     },
    //     {
    //         type: VehicleAction.REJECT,
    //         label: "Từ chối",
    //         nextStatus: VehicleStatus.Rejected,
    //         variant: "destructive",
    //         icon: X,
    //     },
    // ],

    [VehicleStatus.Active]: [
        {
            type: VehicleAction.MOVE_TO_MAINTENANCE,
            label: "Bảo trì",
            nextStatus: VehicleStatus.Maintenance,
            icon: Wrench,
        },
        {
            type: VehicleAction.DECOMMISSION,
            label: "Ngừng sử dụng",
            nextStatus: VehicleStatus.Decommissioned,
            variant: "destructive",
            icon: PowerOff,
        },
    ],

    [VehicleStatus.Maintenance]: [
        {
            type: VehicleAction.ACTIVATE,
            label: "Hoạt động lại",
            nextStatus: VehicleStatus.Active,
            icon: Check,
        },
        {
            type: VehicleAction.DECOMMISSION,
            label: "Ngừng sử dụng",
            nextStatus: VehicleStatus.Decommissioned,
            variant: "destructive",
            icon: PowerOff,
        },
    ],

    [VehicleStatus.UnderService]: [],

    [VehicleStatus.SaleEligible]: [],
    [VehicleStatus.SigningContract]: [],
    [VehicleStatus.Rejected]: [],
    [VehicleStatus.Decommissioned]: [],
}
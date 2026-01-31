import type { VehicleAction } from "@/types/vehicle.type";

export const VEHICLE_ACTION_LABEL: Record<VehicleAction, string> = {
    APPROVE: "Duyệt",
    REJECT: "Từ chối",

    MARK_INSPECTING: "Bắt đầu kiểm tra",
    COMPLETE_INSPECTION: "Hoàn tất kiểm tra",

    ACTIVATE: "Kích hoạt",
    MOVE_TO_MAINTENANCE: "Chuyển bảo trì",
    DECOMMISSION: "Ngưng sử dụng",
}
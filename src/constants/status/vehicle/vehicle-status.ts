import { VehicleStatus } from "@/types/vehicle.type";



export const VEHICLE_STATUS_MAPPING: Record<VehicleStatus, { label: string; color: string }> = {
    [VehicleStatus.Pending]: {
        label: "Chờ xác nhận",
        color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
    },
    [VehicleStatus.ReadyForInspection]: {
        label: "Cần đem ra trạm",
        color: "bg-blue-500/10 text-blue-500 border-blue-500/20"
    },
    [VehicleStatus.Inspecting]: {
        label: "Đang kiểm tra",
        color: "bg-purple-500/10 text-purple-500 border-purple-500/20"
    },
    [VehicleStatus.SigningContract]: {
        label: "Đang ký hợp đồng",
        color: "bg-orange-500/10 text-orange-500 border-orange-500/20"
    },
    [VehicleStatus.SaleEligible]: {
        label: "Sẵn sàng mở bán",
        color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
    },
    [VehicleStatus.Active]: {
        label: "Đang hoạt động",
        color: "bg-green-500/10 text-green-500 border-green-500/20"
    },
    [VehicleStatus.Maintenance]: {
        label: "Đang bảo trì",
        color: "bg-red-500/10 text-red-500 border-red-500/20"
    },
    [VehicleStatus.Rejected]: {
        label: "Bị từ chối",
        color: "bg-destructive/10 text-destructive border-destructive/20"
    },
    [VehicleStatus.Decommissioned]: {
        label: "Ngừng sử dụng",
        color: "bg-gray-500/10 text-gray-500 border-gray-500/20"
    },
};
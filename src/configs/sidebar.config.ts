import path from "@/constants/path";
import type { SidebarItem } from "@/types/sidebar.type";

export const adminSidebar: SidebarItem[] = [
    {
        label: "Quản lý chung",
        children: [
            { label: "Tài khoản", path: "/accounts" },
            { label: "Nhóm", path: "/groups" },
            { label: "Hợp đồng", path: path.contract },
        ],
    },
    {
        label: "Quản lý xe",
        children: [
            { label: "Xe đăng ký", path: path.vehicle },    // Vehicle
            { label: "Hãng xe", path: path.vehicleBrand },   // VehicleBrand
            { label: "Dòng xe", path: "/vehicle-models" },   // VehicleModel
        ],
    },
]

export const staffSidebar: SidebarItem[] = [
    { label: "Tài khoản", path: "/accounts" },
    { label: "Đơn hàng", path: "/orders" },
]

export const operatorSidebar: SidebarItem[] = [
    { label: "Tài khoản", path: "/accounts" },
    { label: "Đơn hàng", path: "/orders" },
]

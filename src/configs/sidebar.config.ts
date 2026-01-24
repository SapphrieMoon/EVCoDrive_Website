import type { SidebarItem } from "@/types/sidebar.type";

export const adminSidebar: SidebarItem[] = [
    {
        label: "Quản lý chung",
        children: [
            { label: "Tài khoản", path: "/accounts" },
            { label: "Nhóm", path: "/groups" },
            { label: "Hợp đồng", path: "/contracts" },
        ],
    },
    {
        label: "Quản lý xe",
        children: [
            { label: "Hãng xe", path: "/vehicle-brands" },   // VehicleBrand
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
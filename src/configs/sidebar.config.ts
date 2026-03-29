import path from "@/constants/path";
import type { SidebarItem } from "@/types/commons/sidebar.type";

export const adminSidebar: SidebarItem[] = [
    {
        label: "Quản lý chung",
        children: [
            { label: "Tài khoản", path: path.member },
            { label: "Nhóm đồng sở hữu", path: path.coOwnerGroup },
            { label: "Hợp đồng", path: path.contract },
            { label: "Trạm kiểm tra", path: path.station },
            { label: "Nhân viên điều hành trạm", path: path.operator },
        ],
    },
    {
        label: "Quản lý xe",
        children: [
            { label: "Xe đăng ký", path: path.vehicle },    // Vehicle
            { label: "Hãng xe", path: path.vehicleBrand },   // VehicleBrand
            { label: "Dòng xe", path: path.vehicleModel },   // VehicleModel
        ],
    },
    {
        label: "Quản lý vận hành",
        children: [
            { label: "Quản lý đặt xe", path: path.booking },
            { label: "Quản lý biểu quyết", path: path.expenseFee },
            { label: "Quản lý hóa đơn", path: path.invoice },
        ],
    },
]

export const staffSidebar: SidebarItem[] = [
    { label: "Tài khoản", path: "/accounts" },
    { label: "Đơn hàng", path: "/orders" },

]

export const operatorSidebar: SidebarItem[] = [
    {
        label: "Quản lý xe",
        children: [
            { label: "Nhóm đồng sở hữu", path: path.coOwnerGroup },
            { label: "Xe đăng ký", path: path.vehicle },
            // { label: "Hợp đồng", path: path.contract },
        ]
    },
    {
        label: "Vận hành",
        children: [
            { label: "Quản lý đặt xe", path: path.booking },
            { label: "Chi phí", path: path.expenseFee },
        ]
    },
]
